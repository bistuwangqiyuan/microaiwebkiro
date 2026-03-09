import { NextRequest, NextResponse } from 'next/server';
import { isDatabaseConfigured } from '@/lib/db';
import { sendSalesNotification } from '@/lib/sales-notifications';
import { createSalesLead } from '@/lib/sales-repository';
import {
  buildLeadSummary,
  sanitizeBoolean,
  sanitizeOptionalString,
  scoreLead,
  type LeadInput,
} from '@/lib/sales';

export async function POST(request: NextRequest) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'DATABASE_URL 未配置，暂时无法接收线索。' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();

    const input: LeadInput = {
      sourceType: 'form',
      sourcePage: sanitizeOptionalString(body.sourcePage) ?? '/contact',
      visitorId: sanitizeOptionalString(body.visitorId),
      utmSource: sanitizeOptionalString(body.utmSource),
      utmMedium: sanitizeOptionalString(body.utmMedium),
      utmCampaign: sanitizeOptionalString(body.utmCampaign),
      name: sanitizeOptionalString(body.name),
      phone: sanitizeOptionalString(body.phone),
      wechat: sanitizeOptionalString(body.wechat),
      email: sanitizeOptionalString(body.email),
      companyName: sanitizeOptionalString(body.companyName),
      industry: sanitizeOptionalString(body.industry),
      city: sanitizeOptionalString(body.city),
      position: sanitizeOptionalString(body.position),
      inquiryType: sanitizeOptionalString(body.inquiryType),
      needsDataLocal: sanitizeBoolean(body.needsDataLocal) ?? false,
      acceptsLeasing: sanitizeBoolean(body.acceptsLeasing) ?? false,
      budgetRange: sanitizeOptionalString(body.budgetRange),
      launchTimeline: sanitizeOptionalString(body.launchTimeline),
      scenario: sanitizeOptionalString(body.scenario),
      message: sanitizeOptionalString(body.message),
    };

    if (!input.name || !input.email || !input.message) {
      return NextResponse.json(
        { ok: false, error: '姓名、邮箱和补充说明为必填项。' },
        { status: 400 }
      );
    }

    const result = scoreLead(input);
    const aiSummary = buildLeadSummary(input, result);
    const created = await createSalesLead({
      input,
      result,
      aiSummary,
    });

    await sendSalesNotification({
      title: '官网新销售线索',
      level: `${result.level} 类`,
      summary: aiSummary,
      fields: [
        { label: '姓名', value: input.name },
        { label: '公司', value: input.companyName },
        { label: '行业', value: input.industry },
        { label: '场景', value: input.scenario },
        { label: '电话', value: input.phone },
        { label: '推荐产品', value: result.recommendedProduct },
        { label: '来源页面', value: input.sourcePage },
      ],
    });

    return NextResponse.json({
      ok: true,
      leadId: created.leadId,
      leadScore: created.leadScore,
      leadLevel: created.leadLevel,
      recommendedProduct: created.recommendedProduct,
      recommendedCasePath: created.recommendedCasePath,
      nextAction: created.nextAction,
      aiSummary,
    });
  } catch (error) {
    console.error('[Contact API]', error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : '提交失败，请稍后重试。' },
      { status: 500 }
    );
  }
}
