import { getSqlClient } from '@/lib/db';
import type { CashflowStrategy } from '@/types/sales';

export interface PartnerTag {
  id: string;
  tag: string;
  recommendedAction: string;
}

export async function reviewPartnerApplications(
  runId: string,
  strategy: CashflowStrategy
): Promise<{ reviewed: number; tags: PartnerTag[] }> {
  const sql = getSqlClient();
  if (!sql) return { reviewed: 0, tags: [] };

  const partners = await sql<{
    id: string;
    name: string;
    city: string | null;
    ai_score: number | string;
    has_team: boolean;
    expected_customer_count: number | string;
    industry_resources: string | null;
  }>`
    select id, name, city, ai_score, has_team, expected_customer_count, industry_resources
    from partner_leads
    where status in ('new', 'reviewing')
    order by ai_score desc
    limit 10
  `;

  const tags: PartnerTag[] = [];

  for (const partner of partners) {
    const score = Number(partner.ai_score);
    const custCount = Number(partner.expected_customer_count);
    let tag: string;
    let action: string;
    let newStatus: string;

    if (score >= 70 && partner.has_team && custCount >= 10) {
      tag = '能卖B';
      action = '推送渠道starter package，安排样机沟通';
      newStatus = 'qualified';
    } else if (score >= 50 && custCount >= 5) {
      tag = '能带试点';
      action = '推送联合试点方案，安排合作洽谈';
      newStatus = 'reviewing';
    } else if (score >= 30) {
      tag = '适合联合方案';
      action = '发送合作资料包，加入培育序列';
      newStatus = 'reviewing';
    } else {
      tag = '仅观察';
      action = '加入资料培育池，暂不主动跟进';
      newStatus = 'observing';
    }

    await sql`
      update partner_leads
      set status = ${newStatus}, updated_at = now()
      where id = ${partner.id}
    `;

    if (tag !== '仅观察') {
      await sql`
        insert into outbound_jobs (run_id, channel, template_key, content_payload, status)
        values (
          ${runId},
          ${'webhook'}::outbound_channel,
          ${'partner_' || tag},
          ${JSON.stringify({
            partnerId: partner.id,
            name: partner.name,
            city: partner.city,
            tag,
            action,
          })}::jsonb,
          ${'queued'}::agent_task_status
        )
      `;
    }

    tags.push({ id: partner.id, tag, recommendedAction: action });
  }

  return { reviewed: partners.length, tags };
}
