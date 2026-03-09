import { NextRequest, NextResponse } from 'next/server';
import { isDatabaseConfigured } from '@/lib/db';
import { sendSalesNotification } from '@/lib/sales-notifications';
import { createPartnerLead } from '@/lib/sales-repository';
import {
  buildPartnerLeadSummary,
  sanitizeBoolean,
  sanitizeNumber,
  sanitizeOptionalString,
  scorePartnerLead,
  type PartnershipLeadInput,
} from '@/lib/sales';

export async function POST(request: NextRequest) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'DATABASE_URL 未配置，暂时无法接收合伙人申请。' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();

    const input: PartnershipLeadInput = {
      name: sanitizeOptionalString(body.name) ?? '',
      phone: sanitizeOptionalString(body.phone),
      wechat: sanitizeOptionalString(body.wechat),
      email: sanitizeOptionalString(body.email),
      city: sanitizeOptionalString(body.city) ?? '',
      industryResources: sanitizeOptionalString(body.industryResources) ?? '',
      hasTeam: sanitizeBoolean(body.hasTeam) ?? false,
      expectedCustomerCount: sanitizeNumber(body.expectedCustomerCount) ?? 0,
      experience: sanitizeOptionalString(body.experience),
      message: sanitizeOptionalString(body.message),
    };

    if (!input.name || !input.city || !input.industryResources || !input.phone) {
      return NextResponse.json(
        { ok: false, error: '姓名、电话、意向区域和区域资源说明为必填项。' },
        { status: 400 }
      );
    }

    const result = scorePartnerLead(input);
    const aiSummary = buildPartnerLeadSummary(input, result);
    const created = await createPartnerLead({
      input,
      result,
      aiSummary,
    });

    await sendSalesNotification({
      title: '新的区域合作申请',
      level: `${result.level} 类`,
      summary: aiSummary,
      fields: [
        { label: '申请人', value: input.name },
        { label: '区域', value: input.city },
        { label: '客户覆盖', value: input.expectedCustomerCount },
        { label: '有无团队', value: input.hasTeam ? '有' : '无' },
      ],
    });

    return NextResponse.json({
      ok: true,
      partnerLeadId: created.partnerLeadId,
      aiScore: created.aiScore,
      leadLevel: created.leadLevel,
      status: created.status,
      aiSummary,
    });
  } catch (error) {
    console.error('[Partnership API]', error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : '提交失败，请稍后重试。' },
      { status: 500 }
    );
  }
}
