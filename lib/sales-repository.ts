import { requireSqlClient } from '@/lib/db';
import {
  type ChatHistoryItem,
  type DashboardData,
  type LeadInput,
  type LeadLevel,
  type LeadScoreResult,
  type MeetingBriefing,
  type PartnerScoreResult,
  type PartnershipLeadInput,
  buildMeetingBriefing,
} from '@/lib/sales';

function toNumber(value: unknown) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function getLeadStatus(level: LeadLevel) {
  return level === 'C' ? 'nurturing' : 'qualified';
}

async function ensureAccountAndContact(input: Partial<LeadInput>) {
  const sql = requireSqlClient();
  let accountId: string | null = null;
  let contactId: string | null = null;

  if (input.companyName) {
    const accounts = await sql<{ id: string }>`
      insert into accounts (company_name, industry, city, notes)
      values (
        ${input.companyName},
        ${input.industry ?? null},
        ${input.city ?? null},
        ${input.message ?? null}
      )
      on conflict (company_name)
      do update
      set
        industry = coalesce(accounts.industry, excluded.industry),
        city = coalesce(accounts.city, excluded.city),
        notes = coalesce(accounts.notes, excluded.notes)
      returning id
    `;
    accountId = accounts[0]?.id ?? null;
  }

  if (input.name || input.phone || input.email || input.wechat) {
    const contacts = await sql<{ id: string }>`
      insert into contacts (account_id, name, phone, wechat, email, position, is_primary)
      values (
        ${accountId},
        ${input.name ?? null},
        ${input.phone ?? null},
        ${input.wechat ?? null},
        ${input.email ?? null},
        ${input.position ?? null},
        ${true}
      )
      returning id
    `;
    contactId = contacts[0]?.id ?? null;
  }

  return { accountId, contactId };
}

async function createOpportunityForLead(params: {
  leadId: string;
  input: Partial<LeadInput>;
  result: LeadScoreResult;
  accountId: string | null;
  contactId: string | null;
}) {
  if (params.result.level === 'C') {
    return null;
  }

  const sql = requireSqlClient();
  const dueAt = new Date(
    Date.now() + (params.result.level === 'A' ? 4 : 24) * 60 * 60 * 1000
  );

  const opportunityType =
    params.input.inquiryType === 'partnership' ? 'partner' : params.input.inquiryType || 'sales';

  const opportunities = await sql<{ id: string }>`
    insert into opportunities (
      lead_id,
      account_id,
      contact_id,
      opportunity_type,
      recommended_product,
      stage,
      estimated_value,
      win_probability,
      owner_type,
      owner_name,
      next_action,
      next_action_at,
      last_activity_at
    )
    values (
      ${params.leadId},
      ${params.accountId},
      ${params.contactId},
      ${opportunityType},
      ${params.result.recommendedProduct},
      ${'discovery'}::opportunity_stage,
      ${params.result.estimatedValue},
      ${params.result.level === 'A' ? 75 : 45},
      ${'ai'},
      ${params.result.level === 'A' ? 'founder' : 'ai-sdr'},
      ${params.result.nextAction},
      ${dueAt.toISOString()},
      now()
    )
    returning id
  `;

  const opportunityId = opportunities[0]?.id ?? null;

  if (!opportunityId) {
    return null;
  }

  await sql`
    insert into followup_tasks (opportunity_id, task_type, status, due_at, assigned_to, payload)
    values (
      ${opportunityId},
      ${params.result.nextAction},
      ${'pending'}::task_status,
      ${dueAt.toISOString()},
      ${params.result.level === 'A' ? 'founder' : 'ai'},
      ${JSON.stringify({
        recommendedProduct: params.result.recommendedProduct,
        sourcePage: params.input.sourcePage ?? null,
        level: params.result.level,
      })}::jsonb
    )
  `;

  return opportunityId;
}

export async function createSalesLead(params: {
  input: LeadInput;
  result: LeadScoreResult;
  aiSummary: string;
  chatMessages?: ChatHistoryItem[];
}) {
  const sql = requireSqlClient();
  const { accountId, contactId } = await ensureAccountAndContact(params.input);

  const leadRows = await sql<{
    id: string;
    lead_score: number;
    lead_level: LeadLevel;
    recommended_product: string;
  }>`
    insert into lead_raw (
      source_type,
      source_page,
      visitor_id,
      conversation_id,
      utm_source,
      utm_medium,
      utm_campaign,
      name,
      phone,
      wechat,
      email,
      company_name,
      industry,
      city,
      position,
      inquiry_type,
      needs_data_local,
      accepts_leasing,
      budget_range,
      launch_timeline,
      scenario,
      message,
      ai_summary,
      recommended_product,
      recommended_case_path,
      lead_score,
      lead_level,
      status
    )
    values (
      ${params.input.sourceType ?? 'form'}::source_type,
      ${params.input.sourcePage ?? null},
      ${params.input.visitorId ?? null},
      ${params.input.conversationId ?? null},
      ${params.input.utmSource ?? null},
      ${params.input.utmMedium ?? null},
      ${params.input.utmCampaign ?? null},
      ${params.input.name ?? null},
      ${params.input.phone ?? null},
      ${params.input.wechat ?? null},
      ${params.input.email ?? null},
      ${params.input.companyName ?? null},
      ${params.input.industry ?? null},
      ${params.input.city ?? null},
      ${params.input.position ?? null},
      ${params.input.inquiryType ?? 'sales'},
      ${params.input.needsDataLocal ?? false},
      ${params.input.acceptsLeasing ?? false},
      ${params.input.budgetRange ?? null},
      ${params.input.launchTimeline ?? null},
      ${params.input.scenario ?? null},
      ${params.input.message ?? null},
      ${params.aiSummary},
      ${params.result.recommendedProduct},
      ${params.result.recommendedCasePath},
      ${params.result.score},
      ${params.result.level}::lead_level,
      ${getLeadStatus(params.result.level)}::lead_status
    )
    returning id, lead_score, lead_level, recommended_product
  `;

  const leadId = leadRows[0]?.id;
  const opportunityId = leadId
    ? await createOpportunityForLead({
        leadId,
        input: params.input,
        result: params.result,
        accountId,
        contactId,
      })
    : null;

  if (leadId) {
    await sql`
      insert into activities (opportunity_id, activity_type, summary, content, created_by)
      values (
        ${opportunityId},
        ${params.input.sourceType === 'ai_chat' ? 'ai_chat_capture' : 'lead_captured'},
        ${params.aiSummary},
        ${JSON.stringify({
          message: params.input.message ?? null,
          chatMessages: params.chatMessages ?? [],
        })},
        ${'ai'}
      )
    `;
  }

  return {
    leadId,
    opportunityId,
    leadScore: params.result.score,
    leadLevel: params.result.level,
    recommendedProduct: params.result.recommendedProduct,
    nextAction: params.result.nextAction,
    recommendedCasePath: params.result.recommendedCasePath,
  };
}

export async function createPartnerLead(params: {
  input: PartnershipLeadInput;
  result: PartnerScoreResult;
  aiSummary: string;
}) {
  const sql = requireSqlClient();
  const rows = await sql<{ id: string; status: string }>`
    insert into partner_leads (
      name,
      phone,
      wechat,
      email,
      city,
      industry_resources,
      has_team,
      expected_customer_count,
      experience,
      message,
      ai_summary,
      ai_score,
      status
    )
    values (
      ${params.input.name},
      ${params.input.phone ?? null},
      ${params.input.wechat ?? null},
      ${params.input.email ?? null},
      ${params.input.city},
      ${params.input.industryResources},
      ${params.input.hasTeam},
      ${params.input.expectedCustomerCount},
      ${params.input.experience ?? null},
      ${params.input.message ?? null},
      ${params.aiSummary},
      ${params.result.score},
      ${params.result.status}
    )
    returning id, status
  `;

  return {
    partnerLeadId: rows[0]?.id,
    status: rows[0]?.status ?? params.result.status,
    aiScore: params.result.score,
    leadLevel: params.result.level,
  };
}

export async function recordPageEvent(params: {
  visitorId?: string;
  path: string;
  eventName: string;
  eventPayload?: Record<string, unknown>;
}) {
  const sql = requireSqlClient();
  await sql`
    insert into page_events (visitor_id, path, event_name, event_payload)
    values (
      ${params.visitorId ?? null},
      ${params.path},
      ${params.eventName},
      ${JSON.stringify(params.eventPayload ?? {})}::jsonb
    )
  `;
}

export async function getDashboardData(): Promise<DashboardData> {
  const sql = requireSqlClient();

  const summaryRows = await sql<{
    new_leads_today: number | string;
    a_leads_today: number | string;
    open_opportunities: number | string;
    pending_followups: number | string;
  }>`
    select
      (select count(*) from lead_raw where created_at >= current_date) as new_leads_today,
      (select count(*) from lead_raw where created_at >= current_date and lead_level = 'A') as a_leads_today,
      (select count(*) from opportunities where stage not in ('won', 'lost')) as open_opportunities,
      (select count(*) from followup_tasks where status = 'pending') as pending_followups
  `;

  const leadSources = await sql<{ label: string; value: number | string }>`
    select
      coalesce(source_page, source_type::text) as label,
      count(*) as value
    from lead_raw
    group by 1
    order by count(*) desc
    limit 6
  `;

  const topPages = await sql<{ label: string; value: number | string }>`
    select
      path as label,
      count(*) as value
    from page_events
    group by 1
    order by count(*) desc
    limit 6
  `;

  const stageDistribution = await sql<{ label: string; value: number | string }>`
    select
      stage::text as label,
      count(*) as value
    from opportunities
    group by 1
    order by count(*) desc
  `;

  const industryDistribution = await sql<{ label: string; value: number | string }>`
    select
      coalesce(industry, '未填写') as label,
      count(*) as value
    from lead_raw
    group by 1
    order by count(*) desc
    limit 6
  `;

  const summary = summaryRows[0];

  return {
    summary: {
      newLeadsToday: toNumber(summary?.new_leads_today),
      aLeadsToday: toNumber(summary?.a_leads_today),
      openOpportunities: toNumber(summary?.open_opportunities),
      pendingFollowups: toNumber(summary?.pending_followups),
    },
    leadSources: leadSources.map((item) => ({ label: item.label, value: toNumber(item.value) })),
    topPages: topPages.map((item) => ({ label: item.label, value: toNumber(item.value) })),
    stageDistribution: stageDistribution.map((item) => ({
      label: item.label,
      value: toNumber(item.value),
    })),
    industryDistribution: industryDistribution.map((item) => ({
      label: item.label,
      value: toNumber(item.value),
    })),
  };
}

export async function getOpportunityBriefing(opportunityId: string): Promise<MeetingBriefing | null> {
  const sql = requireSqlClient();
  const opportunities = await sql<{
    company_name: string | null;
    contact_name: string | null;
    industry: string | null;
    scenario: string | null;
    ai_summary: string | null;
    recommended_product: 'wecalc-b' | 'wecalc-p' | 'wecalc-e' | null;
    recommended_case_path: string | null;
    lead_level: LeadLevel | null;
    budget_range: string | null;
    launch_timeline: string | null;
  }>`
    select
      a.company_name,
      c.name as contact_name,
      l.industry,
      l.scenario,
      l.ai_summary,
      coalesce(o.recommended_product, l.recommended_product) as recommended_product,
      l.recommended_case_path,
      l.lead_level,
      l.budget_range,
      l.launch_timeline
    from opportunities o
    left join lead_raw l on l.id = o.lead_id
    left join accounts a on a.id = o.account_id
    left join contacts c on c.id = o.contact_id
    where o.id = ${opportunityId}
    limit 1
  `;

  const row = opportunities[0];

  if (!row?.recommended_product) {
    return null;
  }

  const activities = await sql<{ summary: string | null }>`
    select summary
    from activities
    where opportunity_id = ${opportunityId}
    order by created_at desc
    limit 5
  `;

  const customerSummary =
    row.ai_summary ??
    [
      row.company_name ? `${row.company_name}` : null,
      row.contact_name ? `联系人 ${row.contact_name}` : null,
      row.industry ? `行业 ${row.industry}` : null,
      row.scenario ? `场景 ${row.scenario}` : null,
    ]
      .filter(Boolean)
      .join('，');

  return buildMeetingBriefing({
    customerSummary: customerSummary || '商机信息已创建，建议结合历史活动快速确认客户当前诉求。',
    recommendedProduct: row.recommended_product,
    recommendedCase: row.recommended_case_path ?? '/case-study',
    reasons: activities.map((item) => item.summary).filter(Boolean) as string[],
    level: row.lead_level ?? 'B',
    budgetRange: row.budget_range,
    launchTimeline: row.launch_timeline,
  });
}
