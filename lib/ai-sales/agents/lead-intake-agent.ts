import { getSqlClient } from '@/lib/db';
import { updateTaskStatus } from '../agent-runner';
import { scoreCashflowPriority } from '../scoring';
import { buildLeadActionSummary } from '../lead-summary';
import { notifyHighPriorityLead } from '../notifications';
import type { CashflowStrategy } from '@/types/sales';

export async function executeAgentTasks(runId: string, taskIds: string[]): Promise<void> {
  const sql = getSqlClient();
  if (!sql || taskIds.length === 0) return;

  for (const taskId of taskIds) {
    try {
      const tasks = await sql<{
        agent_name: string;
        input_payload: Record<string, unknown>;
      }>`
        select agent_name, input_payload from agent_tasks where id = ${taskId}
      `;

      const task = tasks[0];
      if (!task) continue;

      await updateTaskStatus(taskId, 'running');

      switch (task.agent_name) {
        case 'lead_intake_agent':
          await runLeadIntake(runId, taskId, task.input_payload);
          break;
        case 'lead_nurture_agent':
          await runLeadNurture(runId, taskId, task.input_payload);
          break;
        case 'proposal_agent':
          await runProposalAgent(runId, taskId, task.input_payload);
          break;
        case 'cashflow_agent':
          await runCashflowAgent(runId, taskId, task.input_payload);
          break;
        case 'partner_review_agent':
          await runPartnerReview(runId, taskId, task.input_payload);
          break;
        case 'ops_report_agent':
          await runOpsReport(runId, taskId, task.input_payload);
          break;
        default:
          await updateTaskStatus(taskId, 'skipped', { reason: 'Unknown agent' });
      }
    } catch (error) {
      await updateTaskStatus(
        taskId,
        'failed',
        {},
        error instanceof Error ? error.message : String(error)
      );
    }
  }
}

async function runLeadIntake(
  runId: string,
  taskId: string,
  input: Record<string, unknown>
): Promise<void> {
  const sql = getSqlClient();
  if (!sql) return;

  const strategy = input.strategy as CashflowStrategy;

  const newLeads = await sql<{
    id: string;
    name: string | null;
    industry: string | null;
    lead_level: string;
    accepts_leasing: boolean;
    budget_range: string | null;
    launch_timeline: string | null;
    scenario: string | null;
    recommended_product: string | null;
    phone: string | null;
    wechat: string | null;
    source_page: string | null;
  }>`
    select id, name, industry, lead_level, accepts_leasing, budget_range,
           launch_timeline, scenario, recommended_product, phone, wechat, source_page
    from lead_raw
    where status = 'new' and created_at >= now() - interval '8 hours'
    order by lead_score desc
    limit 20
  `;

  const processed: string[] = [];

  for (const lead of newLeads) {
    const cashflow = scoreCashflowPriority({
      industry: lead.industry,
      acceptsLeasing: lead.accepts_leasing,
      budgetRange: lead.budget_range,
      launchTimeline: lead.launch_timeline,
      scenario: lead.scenario,
      sourcePage: lead.source_page,
      phone: lead.phone,
      wechat: lead.wechat,
    });

    const actionSummary = buildLeadActionSummary({
      leadId: lead.id,
      name: lead.name,
      industry: lead.industry,
      scenario: lead.scenario,
      level: lead.lead_level,
      cashflowPriority: cashflow.cashflowPriority,
      recommendedPath: cashflow.recommendedPath,
      acceptsLeasing: lead.accepts_leasing,
      budgetRange: lead.budget_range,
    });

    await sql`
      update lead_raw
      set status = ${lead.lead_level === 'C' ? 'nurturing' : 'qualified'}::lead_status,
          updated_at = now()
      where id = ${lead.id}
    `;

    if (lead.lead_level === 'A' || cashflow.cashflowPriority === 'urgent') {
      await notifyHighPriorityLead({
        leadId: lead.id,
        name: lead.name,
        industry: lead.industry,
        level: lead.lead_level,
        recommendedProduct: lead.recommended_product ?? 'wecalc-b',
        cashflowPriority: cashflow.cashflowPriority,
      });
    }

    processed.push(lead.id);
  }

  await updateTaskStatus(taskId, 'success', {
    processedLeads: processed.length,
    strategy,
  });
}

async function runLeadNurture(
  runId: string,
  taskId: string,
  input: Record<string, unknown>
): Promise<void> {
  const sql = getSqlClient();
  if (!sql) return;

  const nurtureLeads = await sql<{ id: string; lead_level: string }>`
    select id, lead_level from lead_raw
    where status = 'nurturing'
      and updated_at < now() - interval '48 hours'
    order by lead_score desc
    limit 10
  `;

  for (const lead of nurtureLeads) {
    await sql`
      insert into outbound_jobs (run_id, lead_id, channel, template_key, status, content_payload)
      values (
        ${runId},
        ${lead.id},
        ${'webhook'}::outbound_channel,
        ${'nurture_sequence'},
        ${'queued'}::agent_task_status,
        ${JSON.stringify({ leadLevel: lead.lead_level, type: 'nurture' })}::jsonb
      )
    `;
  }

  await updateTaskStatus(taskId, 'success', { nurtured: nurtureLeads.length });
}

async function runProposalAgent(
  runId: string,
  taskId: string,
  input: Record<string, unknown>
): Promise<void> {
  const sql = getSqlClient();
  if (!sql) return;

  const qualifiedLeads = await sql<{
    id: string;
    industry: string | null;
    scenario: string | null;
    accepts_leasing: boolean;
    recommended_product: string | null;
  }>`
    select id, industry, scenario, accepts_leasing, recommended_product
    from lead_raw
    where status = 'qualified'
      and recommended_product = 'wecalc-b'
      and created_at >= now() - interval '24 hours'
    order by lead_score desc
    limit 5
  `;

  let proposalsGenerated = 0;

  for (const lead of qualifiedLeads) {
    const path = lead.accepts_leasing ? 'leasing' : 'sale';

    await sql`
      insert into activities (opportunity_id, activity_type, summary, content, created_by)
      select o.id, 'proposal_generated',
             ${'自动生成微算-B' || path || '方案摘要'},
             ${JSON.stringify({
               product: 'wecalc-b',
               path,
               industry: lead.industry,
               scenario: lead.scenario,
             })},
             ${'proposal_agent'}
      from opportunities o
      where o.lead_id = ${lead.id}
      limit 1
    `;

    proposalsGenerated += 1;
  }

  await updateTaskStatus(taskId, 'success', { proposalsGenerated });
}

async function runCashflowAgent(
  runId: string,
  taskId: string,
  input: Record<string, unknown>
): Promise<void> {
  const sql = getSqlClient();
  if (!sql) return;

  const dueFollowups = await sql<{
    id: string;
    opportunity_id: string;
    task_type: string;
    payload: Record<string, unknown>;
  }>`
    select id, opportunity_id, task_type, payload
    from followup_tasks
    where status = 'pending' and due_at <= now()
    order by due_at asc
    limit 10
  `;

  let actioned = 0;

  for (const task of dueFollowups) {
    await sql`
      update followup_tasks
      set status = ${'done'}::task_status, updated_at = now()
      where id = ${task.id}
    `;

    await sql`
      insert into outbound_jobs (run_id, opportunity_id, channel, template_key, status, content_payload)
      values (
        ${runId},
        ${task.opportunity_id},
        ${'webhook'}::outbound_channel,
        ${task.task_type},
        ${'queued'}::agent_task_status,
        ${JSON.stringify(task.payload)}::jsonb
      )
    `;

    actioned += 1;
  }

  await updateTaskStatus(taskId, 'success', { followupsActioned: actioned });
}

async function runPartnerReview(
  runId: string,
  taskId: string,
  input: Record<string, unknown>
): Promise<void> {
  const sql = getSqlClient();
  if (!sql) return;

  const pendingPartners = await sql<{
    id: string;
    ai_score: number | string;
    has_team: boolean;
    city: string | null;
  }>`
    select id, ai_score, has_team, city
    from partner_leads
    where status = 'new'
    order by ai_score desc
    limit 10
  `;

  let reviewed = 0;

  for (const partner of pendingPartners) {
    const score = Number(partner.ai_score);
    let newStatus: string;
    let tag: string;

    if (score >= 70 && partner.has_team) {
      newStatus = 'reviewing';
      tag = '能卖B';
    } else if (score >= 50) {
      newStatus = 'reviewing';
      tag = '能带试点';
    } else if (score >= 30) {
      newStatus = 'reviewing';
      tag = '适合联合方案';
    } else {
      newStatus = 'observing';
      tag = '仅观察';
    }

    await sql`
      update partner_leads
      set status = ${newStatus}, updated_at = now()
      where id = ${partner.id}
    `;

    reviewed += 1;
  }

  await updateTaskStatus(taskId, 'success', { partnersReviewed: reviewed });
}

async function runOpsReport(
  runId: string,
  taskId: string,
  input: Record<string, unknown>
): Promise<void> {
  const sql = getSqlClient();
  if (!sql) return;

  const [leadStats, oppStats, taskStats] = await Promise.all([
    sql`
      select
        count(*)::int as total,
        count(*) filter (where lead_level = 'A')::int as a_count,
        count(*) filter (where lead_level = 'B')::int as b_count,
        count(*) filter (where lead_level = 'C')::int as c_count
      from lead_raw
      where created_at >= now() - interval '8 hours'
    `.then((rows) => rows[0] ?? {}),
    sql`
      select
        count(*) filter (where stage = 'won')::int as won,
        count(*) filter (where stage = 'pilot')::int as pilot,
        count(*) filter (where stage = 'lost')::int as lost
      from opportunities
      where updated_at >= now() - interval '8 hours'
    `.then((rows) => rows[0] ?? {}),
    sql`
      select
        count(*)::int as total,
        count(*) filter (where status = 'success')::int as success,
        count(*) filter (where status = 'failed')::int as failed
      from agent_tasks
      where run_id = ${runId}
    `.then((rows) => rows[0] ?? {}),
  ]);

  const report = {
    period: '8小时经营周期',
    strategy: input.strategy,
    primaryGoal: input.primaryGoal,
    leads: leadStats,
    opportunities: oppStats,
    tasks: taskStats,
    generatedAt: new Date().toISOString(),
  };

  await updateTaskStatus(taskId, 'success', report);
}
