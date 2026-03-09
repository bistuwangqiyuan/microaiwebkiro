import { NextResponse } from 'next/server';
import { isDatabaseConfigured } from '@/lib/db';
import { createOpenClawSession, executeOpenClawTask } from '@/lib/ai-sales/openclaw-executor';
import type { OpenClawTaskInput } from '@/types/agent';

export async function POST(request: Request) {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json(
        { ok: false, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const body = await request.json();

    const requiredFields = ['runId', 'taskName', 'targetSystem', 'instruction'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { ok: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const input: OpenClawTaskInput = {
      runId: body.runId,
      taskName: body.taskName,
      targetSystem: body.targetSystem,
      instruction: body.instruction,
      payload: body.payload ?? {},
    };

    const sessionId = await createOpenClawSession(input);
    if (!sessionId) {
      return NextResponse.json(
        { ok: false, error: 'Failed to create OpenClaw session' },
        { status: 500 }
      );
    }

    const result = await executeOpenClawTask(sessionId);

    return NextResponse.json({
      ok: result.success,
      sessionId,
      executor: 'openclaw',
      status: result.success ? 'completed' : 'failed',
      output: result.output,
      error: result.error,
    });
  } catch (error) {
    console.error('[/api/agent/openclaw-execute] Error:', error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
