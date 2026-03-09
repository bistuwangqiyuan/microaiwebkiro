import { getSqlClient } from '@/lib/db';
import type { CashflowSnapshot } from '@/types/gm';

function toNumber(value: unknown): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

export async function createCashflowSnapshot(params: {
  inflowAmount?: number;
  outflowAmount?: number;
  bSalesCount?: number;
  bRentalCount?: number;
  bPocCount?: number;
  notes?: Record<string, unknown>;
}): Promise<string | null> {
  const sql = getSqlClient();
  if (!sql) return null;

  try {
    const rows = await sql<{ id: string }>`
      insert into cashflow_snapshots (
        inflow_amount, outflow_amount,
        b_sales_count, b_rental_count, b_poc_count,
        notes
      ) values (
        ${params.inflowAmount ?? 0},
        ${params.outflowAmount ?? 0},
        ${params.bSalesCount ?? 0},
        ${params.bRentalCount ?? 0},
        ${params.bPocCount ?? 0},
        ${JSON.stringify(params.notes ?? {})}::jsonb
      )
      returning id
    `;
    return rows[0]?.id ?? null;
  } catch (error) {
    console.error('[CashflowEngine] createSnapshot failed:', error);
    return null;
  }
}

export async function getLatestCashflowSnapshot(): Promise<CashflowSnapshot | null> {
  const sql = getSqlClient();
  if (!sql) return null;

  try {
    const rows = await sql<{
      id: string;
      snapshot_at: string;
      inflow_amount: number | string;
      outflow_amount: number | string;
      net_cashflow: number | string;
      b_sales_count: number | string;
      b_rental_count: number | string;
      b_poc_count: number | string;
      notes: Record<string, unknown>;
    }>`
      select * from cashflow_snapshots
      order by snapshot_at desc
      limit 1
    `;

    if (!rows[0]) return null;

    const row = rows[0];
    return {
      id: row.id,
      snapshot_at: row.snapshot_at,
      inflow_amount: toNumber(row.inflow_amount),
      outflow_amount: toNumber(row.outflow_amount),
      net_cashflow: toNumber(row.net_cashflow),
      b_sales_count: toNumber(row.b_sales_count),
      b_rental_count: toNumber(row.b_rental_count),
      b_poc_count: toNumber(row.b_poc_count),
      notes: row.notes ?? {},
    };
  } catch {
    return null;
  }
}

export async function getCashflowTrend(days = 7) {
  const sql = getSqlClient();
  if (!sql) return [];

  try {
    return await sql`
      select
        date_trunc('day', snapshot_at) as day,
        sum(inflow_amount) as total_inflow,
        sum(outflow_amount) as total_outflow,
        sum(inflow_amount - outflow_amount) as net,
        sum(b_sales_count) as b_sales,
        sum(b_rental_count) as b_rentals,
        sum(b_poc_count) as b_pocs
      from cashflow_snapshots
      where snapshot_at >= now() - interval '${days} days'
      group by 1
      order by 1 desc
    `;
  } catch {
    return [];
  }
}

export async function computeCurrentPeriodCashflow() {
  const sql = getSqlClient();
  if (!sql) return { inflow: 0, outflow: 0, bSales: 0, bRentals: 0, bPocs: 0 };

  try {
    const rows = await sql<{
      won_count: number | string;
      pilot_count: number | string;
      won_value: number | string;
    }>`
      select
        count(*) filter (where stage = 'won') as won_count,
        count(*) filter (where stage = 'pilot') as pilot_count,
        coalesce(sum(estimated_value) filter (where stage = 'won'), 0) as won_value
      from opportunities
      where updated_at >= now() - interval '8 hours'
    `;

    const row = rows[0];
    return {
      inflow: toNumber(row?.won_value),
      outflow: 0,
      bSales: toNumber(row?.won_count),
      bRentals: 0,
      bPocs: toNumber(row?.pilot_count),
    };
  } catch {
    return { inflow: 0, outflow: 0, bSales: 0, bRentals: 0, bPocs: 0 };
  }
}
