import { NextResponse } from 'next/server';
import { isDatabaseConfigured, getSqlClient } from '@/lib/db';
import { getDashboardData } from '@/lib/sales-repository';

function toNum(v: unknown): number {
  return typeof v === 'number' ? v : Number(v) || 0;
}

export async function GET() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'DATABASE_URL 未配置，暂时无法读取销售看板。' },
      { status: 503 }
    );
  }

  try {
    const data = await getDashboardData();

    const sql = getSqlClient();
    let agentRuns = { todayTotal: 0, successRate: 0, openclawFallbackCount: 0 };
    let cashflow = { inflowToday: 0, netCashflowToday: 0, bDealsToday: 0 };

    if (sql) {
      const [runStats, cashStats] = await Promise.all([
        sql`
          select
            count(*)::int as total,
            count(*) filter (where status = 'success')::int as success_count,
            (select count(*)::int from agent_tasks
             where executor = 'openclaw'
               and created_at >= current_date) as openclaw_count
          from agent_runs
          where started_at >= current_date
        `.catch(() => []),
        sql`
          select
            coalesce(sum(inflow_amount), 0) as inflow,
            coalesce(sum(inflow_amount - outflow_amount), 0) as net,
            coalesce(sum(b_sales_count), 0)::int as b_deals
          from cashflow_snapshots
          where snapshot_at >= current_date
        `.catch(() => []),
      ]);

      const runRow = runStats[0];
      if (runRow) {
        const total = toNum(runRow.total);
        const successCount = toNum(runRow.success_count);
        agentRuns = {
          todayTotal: total,
          successRate: total > 0 ? Math.round((successCount / total) * 100) / 100 : 0,
          openclawFallbackCount: toNum(runRow.openclaw_count),
        };
      }

      const cashRow = cashStats[0];
      if (cashRow) {
        cashflow = {
          inflowToday: toNum(cashRow.inflow),
          netCashflowToday: toNum(cashRow.net),
          bDealsToday: toNum(cashRow.b_deals),
        };
      }
    }

    return NextResponse.json({
      ...data,
      agentRuns,
      cashflow,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : '读取看板失败。' },
      { status: 500 }
    );
  }
}
