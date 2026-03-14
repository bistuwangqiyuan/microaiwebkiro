import { NextRequest, NextResponse } from 'next/server';
import { isDatabaseConfigured } from '@/lib/db';
import { sendSalesNotification } from '@/lib/sales-notifications';
import { createSalesLead } from '@/lib/sales-repository';
import {
  buildLeadSummary,
  sanitizeBoolean,
  sanitizeOptionalString,
  scoreLead,
  type ChatHistoryItem,
  type LeadInput,
} from '@/lib/sales';

export async function POST(request: NextRequest) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'DATABASE_URL 未配置，暂时无法保存 AI 对话线索。' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();

    const input: LeadInput = {
      sourceType: 'ai_chat',
      sourcePage: sanitizeOptionalString(body.sourcePage) ?? '/',
      visitorId: sanitizeOptionalString(body.visitorId),
      conversationId: sanitizeOptionalString(body.conversationId),
      name: sanitizeOptionalString(body.name),
      phone: sanitizeOptionalString(body.phone),
      wechat: sanitizeOptionalString(body.wechat),
      email: sanitizeOptionalString(body.email),
      companyName: sanitizeOptionalString(body.companyName),
      industry: sanitizeOptionalString(body.industry),
      city: sanitizeOptionalString(body.city),
      position: sanitizeOptionalString(body.position),
      inquiryType: sanitizeOptionalString(body.inquiryType) ?? 'sales',
      needsDataLocal: sanitizeBoolean(body.needsDataLocal) ?? false,
      acceptsLeasing: sanitizeBoolean(body.acceptsLeasing) ?? false,
      budgetRange: sanitizeOptionalString(body.budgetRange),
      launchTimeline: sanitizeOptionalString(body.launchTimeline),
      scenario: sanitizeOptionalString(body.scenario),
      message: sanitizeOptionalString(body.summary) ?? sanitizeOptionalString(body.message),
    };

    const messages: ChatHistoryItem[] = Array.isArray(body.messages)
      ? body.messages
          .filter(
            (item: Record<string, unknown>): item is { role: 'user' | 'assistant'; content: string } =>
              Boolean(item) &&
              (item.role === 'user' || item.role === 'assistant') &&
              typeof item.content === 'string' &&
              (item.content as string).trim().length > 0
          )
          .map((item: { role: 'user' | 'assistant'; content: string }) => ({
            role: item.role,
            content: item.content.trim(),
          }))
      : [];

    if (!input.message && !input.scenario && messages.length === 0) {
      return NextResponse.json(
        { ok: false, error: '缺少可用于沉淀线索的对话摘要或场景信息。' },
        { status: 400 }
      );
    }

    const result = scoreLead(input);
    const aiSummary = buildLeadSummary(input, result);
    const created = await createSalesLead({
      input,
      result,
      aiSummary,
      chatMessages: messages,
    });

    if (result.level !== 'C' || input.phone || input.wechat || input.email) {
      await sendSalesNotification({
        title: 'AI 对话转化新线索',
        level: `${result.level} 类`,
        summary: aiSummary,
        fields: [
          { label: '联系人', value: input.name },
          { label: '电话', value: input.phone },
          { label: '公司', value: input.companyName },
          { label: '行业', value: input.industry },
          { label: '推荐产品', value: result.recommendedProduct },
        ],
      });
    }

    return NextResponse.json({
      ok: true,
      leadId: created.leadId,
      leadScore: created.leadScore,
      leadLevel: created.leadLevel,
      recommendedProduct: created.recommendedProduct,
    });
  } catch (error) {
    console.error('[Lead Capture API]', error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : '保存线索失败，请稍后重试。' },
      { status: 500 }
    );
  }
}
