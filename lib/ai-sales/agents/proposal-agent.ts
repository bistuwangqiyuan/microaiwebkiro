import { getSqlClient } from '@/lib/db';
import { generateBProposal, getRecommendedPaths } from '../recommendation';
import type { CashflowStrategy } from '@/types/sales';

export async function generateProposals(
  runId: string,
  strategy: CashflowStrategy
): Promise<{ generated: number }> {
  const sql = getSqlClient();
  if (!sql) return { generated: 0 };

  const leads = await sql<{
    id: string;
    industry: string | null;
    scenario: string | null;
    accepts_leasing: boolean;
    recommended_product: string | null;
  }>`
    select l.id, l.industry, l.scenario, l.accepts_leasing, l.recommended_product
    from lead_raw l
    join opportunities o on o.lead_id = l.id
    where l.status = 'qualified'
      and o.stage in ('new', 'discovery')
      and l.recommended_product = 'wecalc-b'
    order by l.lead_score desc
    limit 5
  `;

  const paths = getRecommendedPaths(strategy);
  let generated = 0;

  for (const lead of leads) {
    const primaryPath = lead.accepts_leasing ? 'leasing' : paths[0];

    const proposal = generateBProposal({
      industry: lead.industry ?? '通用',
      scenario: lead.scenario ?? 'AI推理',
      path: primaryPath,
    });

    await sql`
      insert into activities (
        opportunity_id, activity_type, summary, content, created_by
      )
      select o.id,
             ${'proposal_generated'},
             ${proposal.headline},
             ${JSON.stringify({
               proposal,
               strategy,
               generatedAt: new Date().toISOString(),
             })},
             ${'proposal_agent'}
      from opportunities o
      where o.lead_id = ${lead.id}
      limit 1
    `;

    generated += 1;
  }

  return { generated };
}
