import { getSqlClient } from '@/lib/db';
import { buildFollowupContent } from '../lead-summary';
import type { CashflowStrategy } from '@/types/sales';

export async function nurtureBCLeads(runId: string, strategy: CashflowStrategy) {
  const sql = getSqlClient();
  if (!sql) return { nurtured: 0 };

  const leads = await sql<{
    id: string;
    lead_level: string;
    industry: string | null;
    scenario: string | null;
    recommended_product: string | null;
    updated_at: string;
  }>`
    select id, lead_level, industry, scenario, recommended_product, updated_at
    from lead_raw
    where status = 'nurturing'
      and lead_level in ('B', 'C')
      and updated_at < now() - interval '48 hours'
    order by lead_score desc
    limit 15
  `;

  let nurtured = 0;

  for (const lead of leads) {
    const content = buildFollowupContent({
      level: lead.lead_level,
      industry: lead.industry,
      scenario: lead.scenario,
      recommendedProduct: lead.recommended_product ?? 'wecalc-b',
      path: strategy,
    });

    await sql`
      insert into outbound_jobs (run_id, lead_id, channel, template_key, content_payload, status)
      values (
        ${runId},
        ${lead.id},
        ${'webhook'}::outbound_channel,
        ${'nurture_' || lead.lead_level},
        ${JSON.stringify({ content, level: lead.lead_level })}::jsonb,
        ${'queued'}::agent_task_status
      )
    `;

    await sql`
      update lead_raw set updated_at = now() where id = ${lead.id}
    `;

    nurtured += 1;
  }

  return { nurtured };
}
