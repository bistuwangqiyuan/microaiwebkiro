import { NextRequest, NextResponse } from 'next/server';
import { isDatabaseConfigured } from '@/lib/db';
import { recordPageEvent } from '@/lib/sales-repository';
import { sanitizeOptionalString } from '@/lib/sales';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const path = sanitizeOptionalString(body.path);
    const eventName = sanitizeOptionalString(body.eventName);

    if (!path || !eventName) {
      return NextResponse.json({ ok: false, error: 'path 和 eventName 为必填项。' }, { status: 400 });
    }

    if (isDatabaseConfigured()) {
      await recordPageEvent({
        visitorId: sanitizeOptionalString(body.visitorId),
        path,
        eventName,
        eventPayload: typeof body.eventPayload === 'object' && body.eventPayload ? body.eventPayload : {},
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : '埋点记录失败。' },
      { status: 400 }
    );
  }
}
