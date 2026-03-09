import { NextResponse } from 'next/server';
import { isDatabaseConfigured } from '@/lib/db';
import { getRecentRuns } from '@/lib/ai-sales/orchestrator';

export async function GET() {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json(
        { ok: false, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const runs = await getRecentRuns(20);

    return NextResponse.json({
      ok: true,
      runs: runs.map((run) => ({
        runId: run.id,
        triggerType: run.trigger_type,
        status: run.status,
        startedAt: run.started_at,
        finishedAt: run.finished_at,
        summary: run.summary,
        errorMessage: run.error_message,
        taskCount: Number(run.task_count ?? 0),
        failedCount: Number(run.failed_count ?? 0),
        openclawCount: Number(run.openclaw_count ?? 0),
      })),
    });
  } catch (error) {
    console.error('[/api/admin/agent-runs] Error:', error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
