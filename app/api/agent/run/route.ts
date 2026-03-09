import { NextResponse } from 'next/server';
import { isDatabaseConfigured } from '@/lib/db';
import { runAgentCycle } from '@/lib/ai-sales/orchestrator';
import type { TriggerType } from '@/types/agent';

export async function POST(request: Request) {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json(
        { ok: false, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const triggerType: TriggerType = body.triggerType ?? 'manual';

    const secret = body.secret;
    const expectedSecret = process.env.AGENT_RUN_SECRET;
    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json(
        { ok: false, error: 'Invalid secret' },
        { status: 403 }
      );
    }

    const result = await runAgentCycle(triggerType);

    if (!result) {
      return NextResponse.json(
        { ok: false, error: 'Agent cycle could not start (lock conflict or DB issue)' },
        { status: 409 }
      );
    }

    return NextResponse.json({
      ok: true,
      runId: result.runId,
      status: result.status,
      generalManagerDecision: result.summary,
      tasksCreated: result.tasksCreated,
      tasksSucceeded: result.tasksSucceeded,
      tasksFailed: result.tasksFailed,
      openclawFallbackCount: result.openclawFallbackCount,
    });
  } catch (error) {
    console.error('[/api/agent/run] Error:', error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
