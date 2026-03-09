import { getSqlClient } from '@/lib/db';
import type { GmOperatingContext, GmDecisionOutput, CashflowSnapshot, GmDecision } from '@/types/gm';
import type { CashflowStrategy } from '@/types/sales';
import { selectStrategy } from './revenue-strategy';
import { getLatestCashflowSnapshot } from './cashflow-engine';
import { getConsecutiveFailures, getRecentStrategies } from './gm-memory';

function toNumber(value: unknown): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

export async function gatherOperatingContext(): Promise<GmOperatingContext> {
  const sql = getSqlClient();
  const emptyContext: GmOperatingContext = {
    recentLeads: [],
    recentPartnerLeads: [],
    openOpportunities: [],
    recentPageEvents: [],
    latestCashflow: null,
    recentDecisions: [],
    consecutiveFailures: 0,
  };

  if (!sql) return emptyContext;

  try {
    const [leads, partners, opportunities, pageEvents, cashflow, decisions, failures] =
      await Promise.all([
        sql`
          select id, lead_level, industry, accepts_leasing,
                 budget_range, launch_timeline, recommended_product, created_at
          from lead_raw
          where created_at >= now() - interval '24 hours'
          order by lead_score desc
          limit 50
        `,
        sql`
          select id, city, ai_score, has_team, status
          from partner_leads
          where created_at >= now() - interval '7 days' and status != 'rejected'
          order by ai_score desc
          limit 20
        `,
        sql`
          select id, stage, recommended_product, estimated_value, next_action
          from opportunities
          where stage not in ('won', 'lost')
          order by estimated_value desc nulls last
          limit 30
        `,
        sql`
          select path, event_name, count(*)::int as count
          from page_events
          where created_at >= now() - interval '24 hours'
          group by path, event_name
          order by count desc
          limit 20
        `,
        getLatestCashflowSnapshot(),
        sql<GmDecision>`
          select * from gm_decisions
          order by created_at desc
          limit 5
        `.catch(() => [] as GmDecision[]),
        getConsecutiveFailures(),
      ]);

    return {
      recentLeads: leads.map((l) => ({
        id: l.id as string,
        lead_level: l.lead_level as string,
        industry: l.industry as string | null,
        accepts_leasing: l.accepts_leasing as boolean,
        budget_range: l.budget_range as string | null,
        launch_timeline: l.launch_timeline as string | null,
        recommended_product: l.recommended_product as string | null,
        created_at: l.created_at as string,
      })),
      recentPartnerLeads: partners.map((p) => ({
        id: p.id as string,
        city: p.city as string | null,
        ai_score: toNumber(p.ai_score),
        has_team: p.has_team as boolean,
        status: p.status as string,
      })),
      openOpportunities: opportunities.map((o) => ({
        id: o.id as string,
        stage: o.stage as string,
        recommended_product: o.recommended_product as string | null,
        estimated_value: o.estimated_value ? toNumber(o.estimated_value) : null,
        next_action: o.next_action as string | null,
      })),
      recentPageEvents: pageEvents.map((e) => ({
        path: e.path as string,
        event_name: e.event_name as string,
        count: toNumber(e.count),
      })),
      latestCashflow: cashflow,
      recentDecisions: decisions as GmDecision[],
      consecutiveFailures: failures,
    };
  } catch (error) {
    console.error('[GM Agent] gatherOperatingContext failed:', error);
    return emptyContext;
  }
}

export async function makeDecision(runId: string): Promise<GmDecisionOutput> {
  const context = await gatherOperatingContext();
  const decision = selectStrategy(context);
  await persistDecision(runId, decision);
  return decision;
}

async function persistDecision(runId: string, decision: GmDecisionOutput): Promise<void> {
  const sql = getSqlClient();
  if (!sql) return;

  try {
    await sql`
      insert into gm_decisions (
        run_id, primary_goal, chosen_strategy, why,
        expected_cash_in, actual_cash_in,
        expected_sign_count, actual_sign_count, next_plan
      ) values (
        ${runId},
        ${decision.primaryGoal},
        ${decision.chosenStrategy},
        ${JSON.stringify(decision.why)}::jsonb,
        ${decision.expectedCashIn},
        ${0},
        ${decision.expectedSignCount},
        ${0},
        ${decision.nextPlan}
      )
    `;
  } catch (error) {
    console.error('[GM Agent] persistDecision failed:', error);
  }
}

export async function getRecentGmDecisions(limit = 10): Promise<GmDecision[]> {
  const sql = getSqlClient();
  if (!sql) return [];

  try {
    const rows = await sql`
      select
        gd.*,
        ar.status as run_status,
        ar.started_at as run_started_at
      from gm_decisions gd
      left join agent_runs ar on ar.id = gd.run_id
      order by gd.created_at desc
      limit ${limit}
    `;
    return rows as unknown as GmDecision[];
  } catch {
    return [];
  }
}
