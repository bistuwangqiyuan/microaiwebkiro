import { NextResponse } from 'next/server';
import { isDatabaseConfigured } from '@/lib/db';
import { getRecentGmDecisions } from '@/lib/ai-sales/general-manager-agent';

export async function GET() {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json(
        { ok: false, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const decisions = await getRecentGmDecisions(10);

    return NextResponse.json({
      ok: true,
      decisions: decisions.map((d) => ({
        decisionId: d.id,
        runId: d.run_id,
        primaryGoal: d.primary_goal,
        chosenStrategy: d.chosen_strategy,
        why: d.why,
        expectedCashIn: d.expected_cash_in,
        actualCashIn: d.actual_cash_in,
        expectedSignCount: d.expected_sign_count,
        actualSignCount: d.actual_sign_count,
        nextPlan: d.next_plan,
        createdAt: d.created_at,
      })),
    });
  } catch (error) {
    console.error('[/api/admin/gm-decisions] Error:', error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
