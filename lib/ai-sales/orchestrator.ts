import { getSqlClient } from '@/lib/db';
import type { AgentRunStatus } from '@/types/agent';
import type { AgentRunResult } from '@/types/agent';
import { acquireSchedulerLock, releaseSchedulerLock } from './scheduler-lock';
import { makeDecision } from './general-manager-agent';
import { createBusinessObjective } from './goal-engine';
import { createCashflowSnapshot, computeCurrentPeriodCashflow } from './cashflow-engine';
import {
  createAgentTask,
  decomposeDecisionIntoTasks,
  getRunTaskSummary,
} from './agent-runner';
import {
  incrementConsecutiveFailures,
  resetConsecutiveFailures,
  setLastStrategy,
} from './gm-memory';
import { notifyGmDecision, notifyRunComplete } from './notifications';
import { executeAgentTasks } from './agents/lead-intake-agent';

const LOCK_KEY = 'agent_run_8h';

export async function runAgentCycle(
  triggerType: 'scheduled' | 'immediate' | 'manual'
): Promise<AgentRunResult | null> {
  const sql = getSqlClient();
  if (!sql) {
    console.warn('[Orchestrator] Database not configured, skipping agent cycle');
    return null;
  }

  const lockOwner = await acquireSchedulerLock(LOCK_KEY);
  if (!lockOwner) {
    console.warn('[Orchestrator] Could not acquire lock, another cycle may be running');
    return null;
  }

  let runId: string | null = null;

  try {
    const runRows = await sql<{ id: string }>`
      insert into agent_runs (trigger_type, status)
      values (${triggerType}, ${'running'}::agent_run_status)
      returning id
    `;
    runId = runRows[0]?.id;
    if (!runId) throw new Error('Failed to create agent_runs record');

    const decision = await makeDecision(runId);

    await createBusinessObjective({
      runId,
      objectiveType: decision.objectiveType,
      priority: 1,
      objectiveTitle: decision.primaryGoal,
      objectiveDetail: decision.why.join('；'),
      targetMetric: decision.targetMetric,
      targetValue: decision.targetValue,
    });

    await notifyGmDecision(decision, runId);
    await setLastStrategy(decision.chosenStrategy);

    const taskCards = decomposeDecisionIntoTasks(decision);
    const taskIds: string[] = [];

    for (const card of taskCards) {
      const taskId = await createAgentTask(runId, card);
      if (taskId) taskIds.push(taskId);
    }

    await executeAgentTasks(runId, taskIds);

    const summary = await getRunTaskSummary(runId);

    const period = await computeCurrentPeriodCashflow();
    await createCashflowSnapshot({
      inflowAmount: period.inflow,
      outflowAmount: period.outflow,
      bSalesCount: period.bSales,
      bRentalCount: period.bRentals,
      bPocCount: period.bPocs,
      notes: { runId, strategy: decision.chosenStrategy },
    });

    const hasProgress = summary.success > 0 || period.inflow > 0;
    if (hasProgress) {
      await resetConsecutiveFailures();
    } else {
      await incrementConsecutiveFailures();
    }

    const status: AgentRunStatus = summary.failed > 0 ? 'partial_failed' : 'success';

    await sql`
      update agent_runs
      set
        status = ${status}::agent_run_status,
        finished_at = now(),
        summary = ${JSON.stringify({
          tasksCreated: summary.total,
          tasksSucceeded: summary.success,
          tasksFailed: summary.failed,
          openclawFallbackCount: summary.openclaw,
          strategy: decision.chosenStrategy,
          primaryGoal: decision.primaryGoal,
        })}::jsonb
      where id = ${runId}
    `;

    await notifyRunComplete({
      runId,
      status,
      tasksCreated: summary.total,
      tasksSucceeded: summary.success,
      tasksFailed: summary.failed,
      openclawFallbackCount: summary.openclaw,
      strategy: decision.chosenStrategy,
    });

    return {
      runId,
      status,
      tasksCreated: summary.total,
      tasksSucceeded: summary.success,
      tasksFailed: summary.failed,
      openclawFallbackCount: summary.openclaw,
      summary: {
        strategy: decision.chosenStrategy,
        primaryGoal: decision.primaryGoal,
        expectedCashIn: decision.expectedCashIn,
      },
    };
  } catch (error) {
    console.error('[Orchestrator] Agent cycle failed:', error);

    if (runId) {
      await sql`
        update agent_runs
        set status = ${'failed'}::agent_run_status,
            finished_at = now(),
            error_message = ${error instanceof Error ? error.message : String(error)}
        where id = ${runId}
      `.catch(() => {});
    }

    return runId
      ? {
          runId,
          status: 'failed',
          tasksCreated: 0,
          tasksSucceeded: 0,
          tasksFailed: 0,
          openclawFallbackCount: 0,
          summary: { error: error instanceof Error ? error.message : String(error) },
        }
      : null;
  } finally {
    await releaseSchedulerLock(LOCK_KEY, lockOwner!);
  }
}

export async function getRecentRuns(limit = 20) {
  const sql = getSqlClient();
  if (!sql) return [];

  try {
    return await sql`
      select
        ar.*,
        (select count(*)::int from agent_tasks at2 where at2.run_id = ar.id) as task_count,
        (select count(*)::int from agent_tasks at2 where at2.run_id = ar.id and at2.status = 'failed') as failed_count,
        (select count(*)::int from agent_tasks at2 where at2.run_id = ar.id and at2.executor = 'openclaw') as openclaw_count
      from agent_runs ar
      order by ar.started_at desc
      limit ${limit}
    `;
  } catch {
    return [];
  }
}
