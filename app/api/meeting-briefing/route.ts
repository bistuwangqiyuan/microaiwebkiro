import { NextRequest, NextResponse } from 'next/server';
import { isDatabaseConfigured } from '@/lib/db';
import { getOpportunityBriefing } from '@/lib/sales-repository';
import { sanitizeOptionalString } from '@/lib/sales';

export async function POST(request: NextRequest) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'DATABASE_URL 未配置，暂时无法生成会前摘要。' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const opportunityId = sanitizeOptionalString(body.opportunityId);

    if (!opportunityId) {
      return NextResponse.json(
        { ok: false, error: 'opportunityId 为必填项。' },
        { status: 400 }
      );
    }

    const briefing = await getOpportunityBriefing(opportunityId);

    if (!briefing) {
      return NextResponse.json(
        { ok: false, error: '未找到对应商机或商机信息不完整。' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      briefing,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : '生成 briefing 失败。' },
      { status: 500 }
    );
  }
}
