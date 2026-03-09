import { NextRequest, NextResponse } from 'next/server';
import {
  sanitizeBoolean,
  sanitizeOptionalString,
  scoreLead,
  type LeadInput,
} from '@/lib/sales';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const input: Partial<LeadInput> = {
      sourcePage: sanitizeOptionalString(body.sourcePage),
      industry: sanitizeOptionalString(body.industry),
      needsDataLocal: sanitizeBoolean(body.needsDataLocal) ?? false,
      acceptsLeasing: sanitizeBoolean(body.acceptsLeasing) ?? false,
      budgetRange: sanitizeOptionalString(body.budgetRange),
      launchTimeline: sanitizeOptionalString(body.launchTimeline),
      scenario: sanitizeOptionalString(body.scenario),
      message: sanitizeOptionalString(body.message),
      phone: sanitizeOptionalString(body.phone),
      wechat: sanitizeOptionalString(body.wechat),
    };

    const result = scoreLead(input);

    return NextResponse.json({
      score: result.score,
      level: result.level,
      recommendedProduct: result.recommendedProduct,
      recommendedCasePath: result.recommendedCasePath,
      reasons: result.reasons,
      nextAction: result.nextAction,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '评分失败，请稍后重试。' },
      { status: 400 }
    );
  }
}
