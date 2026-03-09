import { getSqlClient } from '@/lib/db';
import type { AgentName, AgentExecutor, AgentTaskStatus } from '@/types/agent';
import type { GmDecisionOutput } from '@/types/gm';
import type { CashflowStrategy } from '@/types/sales';

export interface TaskCard {
  agentName: AgentName;
  executor: AgentExecutor;
  inputPayload: Record<string, unknown>;
  description: string;
}

export async function createAgentTask(
  runId: string,
  card: TaskCard
): Promise<string | null> {
  const sql = getSqlClient();
  if (!sql) return null;

  try {
    const rows = await sql<{ id: string }>`
      insert into agent_tasks (run_id, agent_name, executor, status, input_payload)
      values (
        ${runId},
        ${card.agentName},
        ${card.executor}::agent_executor,
        ${'queued'}::agent_task_status,
        ${JSON.stringify(card.inputPayload)}::jsonb
      )
      returning id
    `;
    return rows[0]?.id ?? null;
  } catch (error) {
    console.error('[AgentRunner] createAgentTask failed:', error);
    return null;
  }
}

export async function updateTaskStatus(
  taskId: string,
  status: AgentTaskStatus,
  output?: Record<string, unknown>,
  errorMessage?: string
): Promise<void> {
  const sql = getSqlClient();
  if (!sql) return;

  const now = new Date().toISOString();

  try {
    await sql`
      update agent_tasks
      set
        status = ${status}::agent_task_status,
        output_payload = ${JSON.stringify(output ?? {})}::jsonb,
        error_message = ${errorMessage ?? null},
        started_at = coalesce(started_at, ${status === 'running' ? now : null}),
        finished_at = ${['success', 'failed', 'skipped'].includes(status) ? now : null}
      where id = ${taskId}
    `;
  } catch (error) {
    console.error('[AgentRunner] updateTaskStatus failed:', error);
  }
}

export function decomposeDecisionIntoTasks(decision: GmDecisionOutput): TaskCard[] {
  const tasks: TaskCard[] = [];

  tasks.push({
    agentName: 'lead_intake_agent',
    executor: 'native_llm',
    inputPayload: {
      strategy: decision.chosenStrategy,
      goal: decision.primaryGoal,
    },
    description: '处理新线索并引导进入当前策略路径',
  });

  tasks.push({
    agentName: 'proposal_agent',
    executor: 'native_llm',
    inputPayload: {
      strategy: decision.chosenStrategy,
      targetMetric: decision.targetMetric,
    },
    description: '为高意向线索生成方案摘要',
  });

  tasks.push({
    agentName: 'cashflow_agent',
    executor: 'native_llm',
    inputPayload: {
      strategy: decision.chosenStrategy,
      expectedCashIn: decision.expectedCashIn,
    },
    description: '推进离现金流最近的下一步动作',
  });

  if (
    decision.chosenStrategy === 'PARTNER_STARTER_PUSH' ||
    decision.chosenStrategy === 'ALT_CASHFLOW_PUSH'
  ) {
    tasks.push({
      agentName: 'partner_review_agent',
      executor: 'native_llm',
      inputPayload: {
        strategy: decision.chosenStrategy,
      },
      description: '审核合伙人申请并推进渠道路径',
    });
  }

  tasks.push({
    agentName: 'lead_nurture_agent',
    executor: 'native_llm',
    inputPayload: {
      strategy: decision.chosenStrategy,
    },
    description: '培育B/C类线索',
  });

  tasks.push({
    agentName: 'ops_report_agent',
    executor: 'native_llm',
    inputPayload: {
      strategy: decision.chosenStrategy,
      primaryGoal: decision.primaryGoal,
    },
    description: '生成经营复盘摘要',
  });

  return tasks;
}

export async function getTasksByRunId(runId: string) {
  const sql = getSqlClient();
  if (!sql) return [];

  try {
    return await sql`
      select * from agent_tasks
      where run_id = ${runId}
      order by created_at asc
    `;
  } catch {
    return [];
  }
}

export async function getRunTaskSummary(runId: string) {
  const sql = getSqlClient();
  if (!sql) return { total: 0, success: 0, failed: 0, openclaw: 0 };

  try {
    const rows = await sql<{
      total: number | string;
      success_count: number | string;
      failed_count: number | string;
      openclaw_count: number | string;
    }>`
      select
        count(*)::int as total,
        count(*) filter (where status = 'success')::int as success_count,
        count(*) filter (where status = 'failed')::int as failed_count,
        count(*) filter (where executor = 'openclaw')::int as openclaw_count
      from agent_tasks
      where run_id = ${runId}
    `;

    const row = rows[0];
    return {
      total: Number(row?.total ?? 0),
      success: Number(row?.success_count ?? 0),
      failed: Number(row?.failed_count ?? 0),
      openclaw: Number(row?.openclaw_count ?? 0),
    };
  } catch {
    return { total: 0, success: 0, failed: 0, openclaw: 0 };
  }
}
