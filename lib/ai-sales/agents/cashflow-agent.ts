import { getSqlClient } from '@/lib/db';
import { ALTERNATIVE_CASHFLOW_PRODUCTS } from '../recommendation';
import type { CashflowStrategy } from '@/types/sales';

export async function pushCashflowActions(
  runId: string,
  strategy: CashflowStrategy
): Promise<{ actioned: number }> {
  const sql = getSqlClient();
  if (!sql) return { actioned: 0 };

  let actioned = 0;

  const dueFollowups = await sql<{
    id: string;
    opportunity_id: string;
    task_type: string;
    payload: Record<string, unknown>;
  }>`
    select ft.id, ft.opportunity_id, ft.task_type, ft.payload
    from followup_tasks ft
    join opportunities o on o.id = ft.opportunity_id
    where ft.status = 'pending'
      and ft.due_at <= now()
      and o.recommended_product = 'wecalc-b'
    order by ft.due_at asc
    limit 15
  `;

  for (const task of dueFollowups) {
    const templates: Record<string, string> = {
      founder_followup: '发送微算-B方案资料并安排沟通',
      ai_nurture_and_book_meeting: '发送行业案例并引导预约演示',
      content_nurture: '发送内容培育资料',
    };

    await sql`
      insert into outbound_jobs (
        run_id, opportunity_id, channel, template_key, content_payload, status
      ) values (
        ${runId},
        ${task.opportunity_id},
        ${'webhook'}::outbound_channel,
        ${task.task_type},
        ${JSON.stringify({
          ...task.payload,
          action: templates[task.task_type] ?? task.task_type,
          strategy,
        })}::jsonb,
        ${'queued'}::agent_task_status
      )
    `;

    await sql`
      update followup_tasks
      set status = ${'done'}::task_status, updated_at = now()
      where id = ${task.id}
    `;

    const nextDue = new Date(Date.now() + 48 * 60 * 60 * 1000);
    await sql`
      update opportunities
      set next_action = ${'cashflow_followup'},
          next_action_at = ${nextDue.toISOString()},
          last_activity_at = now(),
          updated_at = now()
      where id = ${task.opportunity_id}
    `;

    actioned += 1;
  }

  if (strategy === 'ALT_CASHFLOW_PUSH') {
    const altProducts = ALTERNATIVE_CASHFLOW_PRODUCTS.slice(0, 3);
    for (const product of altProducts) {
      await sql`
        insert into outbound_jobs (
          run_id, channel, template_key, content_payload, status
        ) values (
          ${runId},
          ${'webhook'}::outbound_channel,
          ${'alt_cashflow_push'},
          ${JSON.stringify({
            productName: product.name,
            description: product.description,
            estimatedRevenue: product.estimatedRevenue,
            targetCustomer: product.targetCustomer,
          })}::jsonb,
          ${'queued'}::agent_task_status
        )
      `;
    }
  }

  return { actioned };
}
