import { getSqlClient } from '@/lib/db';
import { sendSalesNotification } from '@/lib/sales-notifications';

function toNum(v: unknown): number {
  return typeof v === 'number' ? v : Number(v) || 0;
}

export interface OpsReport {
  period: string;
  strategy: string;
  leads: {
    total: number;
    aCount: number;
    bCount: number;
    cCount: number;
  };
  opportunities: {
    won: number;
    pilot: number;
    lost: number;
    open: number;
  };
  cashflow: {
    inflow: number;
    bSales: number;
    bRentals: number;
  };
  tasks: {
    total: number;
    success: number;
    failed: number;
  };
  inefficiencies: string[];
}

export async function generateOpsReport(
  runId: string,
  strategy: string,
  primaryGoal: string
): Promise<OpsReport> {
  const sql = getSqlClient();
  const emptyReport: OpsReport = {
    period: '8小时',
    strategy,
    leads: { total: 0, aCount: 0, bCount: 0, cCount: 0 },
    opportunities: { won: 0, pilot: 0, lost: 0, open: 0 },
    cashflow: { inflow: 0, bSales: 0, bRentals: 0 },
    tasks: { total: 0, success: 0, failed: 0 },
    inefficiencies: [],
  };

  if (!sql) return emptyReport;

  try {
    const [leadRow, oppRow, cashRow, taskRow] = await Promise.all([
      sql`
        select
          count(*)::int as total,
          count(*) filter (where lead_level = 'A')::int as a_count,
          count(*) filter (where lead_level = 'B')::int as b_count,
          count(*) filter (where lead_level = 'C')::int as c_count
        from lead_raw
        where created_at >= now() - interval '8 hours'
      `.then((r) => r[0]),
      sql`
        select
          count(*) filter (where stage = 'won')::int as won,
          count(*) filter (where stage = 'pilot')::int as pilot,
          count(*) filter (where stage = 'lost')::int as lost,
          count(*) filter (where stage not in ('won','lost'))::int as open
        from opportunities
        where updated_at >= now() - interval '8 hours'
      `.then((r) => r[0]),
      sql`
        select
          coalesce(sum(inflow_amount),0) as inflow,
          coalesce(sum(b_sales_count),0)::int as b_sales,
          coalesce(sum(b_rental_count),0)::int as b_rentals
        from cashflow_snapshots
        where snapshot_at >= now() - interval '8 hours'
      `.then((r) => r[0]),
      sql`
        select
          count(*)::int as total,
          count(*) filter (where status = 'success')::int as success,
          count(*) filter (where status = 'failed')::int as failed
        from agent_tasks
        where run_id = ${runId}
      `.then((r) => r[0]),
    ]);

    const leads = {
      total: toNum(leadRow?.total),
      aCount: toNum(leadRow?.a_count),
      bCount: toNum(leadRow?.b_count),
      cCount: toNum(leadRow?.c_count),
    };

    const opportunities = {
      won: toNum(oppRow?.won),
      pilot: toNum(oppRow?.pilot),
      lost: toNum(oppRow?.lost),
      open: toNum(oppRow?.open),
    };

    const cashflow = {
      inflow: toNum(cashRow?.inflow),
      bSales: toNum(cashRow?.b_sales),
      bRentals: toNum(cashRow?.b_rentals),
    };

    const tasks = {
      total: toNum(taskRow?.total),
      success: toNum(taskRow?.success),
      failed: toNum(taskRow?.failed),
    };

    const inefficiencies: string[] = [];
    if (leads.total > 0 && leads.aCount === 0) {
      inefficiencies.push('本轮无A类线索产生，建议优化官网CTA');
    }
    if (cashflow.inflow === 0) {
      inefficiencies.push('本轮无现金流入，需要评估当前策略有效性');
    }
    if (tasks.failed > 0) {
      inefficiencies.push(`${tasks.failed}个任务执行失败，需检查执行链路`);
    }
    if (opportunities.lost > opportunities.won) {
      inefficiencies.push('丢单数超过成交数，需分析丢单原因');
    }

    const report: OpsReport = {
      period: '8小时',
      strategy,
      leads,
      opportunities,
      cashflow,
      tasks,
      inefficiencies,
    };

    await sendSalesNotification({
      title: '📈 经营复盘报告',
      summary: `策略：${strategy} | 目标：${primaryGoal}`,
      fields: [
        { label: '新线索', value: leads.total },
        { label: 'A类线索', value: leads.aCount },
        { label: '成交', value: opportunities.won },
        { label: '试点', value: opportunities.pilot },
        { label: '现金流入', value: `${cashflow.inflow}元` },
        { label: '问题', value: inefficiencies.join('；') || '无' },
      ],
    });

    return report;
  } catch {
    return emptyReport;
  }
}
