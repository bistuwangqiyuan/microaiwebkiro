import { getProductBySlug } from '@/lib/product-catalog';

export type LeadLevel = 'A' | 'B' | 'C';
export type LeadStatus = 'new' | 'qualified' | 'nurturing' | 'converted' | 'closed_lost';
export type OpportunityStage = 'new' | 'discovery' | 'proposal' | 'pilot' | 'negotiation' | 'won' | 'lost';
export type SourceType = 'form' | 'ai_chat' | 'manual' | 'wechat' | 'phone' | 'email';
export type TaskStatus = 'pending' | 'done' | 'cancelled';
export type ProductSlug = 'wecalc-b' | 'wecalc-p' | 'wecalc-e';

export interface LeadInput {
  sourceType?: SourceType;
  sourcePage?: string;
  visitorId?: string;
  conversationId?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  name?: string;
  phone?: string;
  wechat?: string;
  email?: string;
  companyName?: string;
  industry?: string;
  city?: string;
  position?: string;
  inquiryType?: string;
  needsDataLocal?: boolean;
  acceptsLeasing?: boolean;
  budgetRange?: string;
  launchTimeline?: string;
  scenario?: string;
  message?: string;
}

export interface PartnershipLeadInput {
  name: string;
  phone?: string;
  wechat?: string;
  email?: string;
  city: string;
  industryResources: string;
  hasTeam: boolean;
  expectedCustomerCount: number;
  experience?: string;
  message?: string;
}

export interface ChatHistoryItem {
  role: 'user' | 'assistant';
  content: string;
}

export interface LeadScoreResult {
  score: number;
  level: LeadLevel;
  reasons: string[];
  recommendedProduct: ProductSlug;
  recommendedCasePath: string;
  nextAction: string;
  estimatedValue: number;
}

export interface PartnerScoreResult {
  score: number;
  level: LeadLevel;
  reasons: string[];
  status: 'new' | 'reviewing';
}

export interface DashboardMetricRow {
  label: string;
  value: number;
}

export interface DashboardSeriesRow {
  label: string;
  value: number;
}

export interface DashboardData {
  summary: {
    newLeadsToday: number;
    aLeadsToday: number;
    openOpportunities: number;
    pendingFollowups: number;
  };
  leadSources: DashboardSeriesRow[];
  topPages: DashboardSeriesRow[];
  stageDistribution: DashboardSeriesRow[];
  industryDistribution: DashboardSeriesRow[];
}

export interface MeetingBriefing {
  customerSummary: string;
  recommendedProduct: ProductSlug;
  recommendedCase: string;
  talkingPoints: string[];
  risks: string[];
}

export interface ProductGuide {
  customerTypes: string[];
  recommendedIndustries: string[];
  recommendation: string;
  purchasePaths: Array<{
    title: string;
    description: string;
    href: string;
    ctaLabel: string;
  }>;
}

export const SALES_ENDPOINTS = {
  aiChat: '/api/ai-chat',
  contact: '/api/contact',
  partnership: '/api/partnership',
  leadScore: '/api/lead-score',
  leadCapture: '/api/lead-capture',
  events: '/api/events',
  meetingBriefing: '/api/meeting-briefing',
  dashboard: '/api/admin/dashboard',
} as const;

export const SALES_INDUSTRIES = [
  '制造',
  '高校',
  '教育',
  '医疗',
  '金融',
  '政务',
  '科研',
  '自动驾驶',
  '企业服务',
  '其他',
] as const;

export const BUDGET_RANGE_OPTIONS = [
  '30万以下',
  '30-50万',
  '50-200万',
  '200-500万',
  '500万以上',
  '暂未确定',
] as const;

export const LAUNCH_TIMELINE_OPTIONS = [
  '30天内',
  '90天内',
  '半年内',
  '一年内',
  '暂未确定',
] as const;

export const SALES_CHAT_QUICK_ACTIONS = [
  '帮我选型',
  '我想做降本测算',
  '我想申请试点',
  '我想做合伙人',
  '融资租赁怎么开始？',
] as const;

export const HOME_SALES_SHORTCUTS = [
  { title: '我是制造业', description: '关注 AI 质检、预测性维护、边缘推理落地', href: '/solutions#manufacturing' },
  { title: '我是高校', description: '快速搭建 AI 教学实训和科研平台', href: '/solutions#education' },
  { title: '我是医疗', description: '关注数据不出域和影像推理场景', href: '/solutions#medical' },
  { title: '我想做合伙人', description: '提交区域合作申请，自动完成预筛评估', href: '/partnership' },
] as const;

export const PRODUCT_GUIDES: Record<ProductSlug, ProductGuide> = {
  'wecalc-b': {
    customerTypes: ['先试点的企业', '预算有限的团队', '高校教学实训', '需要 30 天内上线的项目'],
    recommendedIndustries: ['教育', '制造', '企业服务', '政务'],
    recommendation: '如果您希望 30 天内启动本地 AI 试点，这款产品通常是更稳妥的起点。',
    purchasePaths: [
      {
        title: '先试点',
        description: '用最小可用配置验证业务闭环，优先跑通一个真实 AI 场景。',
        href: '/contact?intent=pilot&product=wecalc-b',
        ctaLabel: '我要试点',
      },
      {
        title: '融资租赁',
        description: '2,000 元 / 月起步，降低一次性采购压力。',
        href: '/contact?intent=leasing&product=wecalc-b',
        ctaLabel: '我要融资租赁',
      },
      {
        title: '正式采购',
        description: '适合已明确部署目标、希望直接完成本地交付的客户。',
        href: '/contact?intent=purchase&product=wecalc-b',
        ctaLabel: '获取采购方案',
      },
    ],
  },
  'wecalc-p': {
    customerTypes: ['准备进入生产环境的客户', '已有明确业务场景的团队', '中型训练与推理项目', '工业边缘计算项目'],
    recommendedIndustries: ['制造', '医疗', '金融', '智慧城市'],
    recommendation: '如果您已具备预算和应用场景，我们可直接提供正式部署方案。',
    purchasePaths: [
      {
        title: '正式部署',
        description: '适合明确业务目标、需要较快进入生产环境的项目。',
        href: '/contact?intent=proposal&product=wecalc-p',
        ctaLabel: '获取部署方案',
      },
      {
        title: '行业方案评估',
        description: '结合行业合规、并发规模和交付周期输出更贴近业务的方案。',
        href: '/solutions',
        ctaLabel: '查看行业方案',
      },
      {
        title: '扩容规划',
        description: '已上线项目可按节点扩展到更大集群。',
        href: '/contact?intent=scale&product=wecalc-p',
        ctaLabel: '规划扩容路径',
      },
    ],
  },
  'wecalc-e': {
    customerTypes: ['区域级智算中心', '大型训练平台', '科研计算平台', '自动驾驶与 HPC 项目'],
    recommendedIndustries: ['科研', '自动驾驶', '金融', '政务'],
    recommendation: '如果您需要区域级、大型训练或科研计算平台，建议直接进入定制方案评估。',
    purchasePaths: [
      {
        title: '定制方案',
        description: '结合机房条件、目标规模和行业要求设计整体架构。',
        href: '/contact?intent=enterprise&product=wecalc-e',
        ctaLabel: '获取定制方案',
      },
      {
        title: '案例评估',
        description: '先看降本和交付路径，再确认正式立项节奏。',
        href: '/case-study',
        ctaLabel: '查看降本案例',
      },
      {
        title: '扩容路线',
        description: '从现有集群向更大规模平滑演进。',
        href: '/contact?intent=capacity-plan&product=wecalc-e',
        ctaLabel: '规划扩容路线',
      },
    ],
  },
};

const PRIORITY_INDUSTRIES = ['制造', '高校', '教育', '医疗', '金融'];
const HIGH_SCALE_KEYWORDS = ['训练', '科研', 'hpc', '高性能', '自动驾驶', '千卡', '区域级', '智算中心', 'pb'];
const PILOT_KEYWORDS = ['试点', '验证', '教学', '实训', 'demo', 'poc', '小模型'];
const PRODUCTION_KEYWORDS = ['生产', '推理', '制造', '影像', '风控', '边缘', '工业', '平台'];
const COST_KEYWORDS = ['降本', 'tco', '成本', '租赁', '融资'];

function normalizeText(value?: string | null) {
  return (value ?? '').trim().toLowerCase();
}

function includesAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword.toLowerCase()));
}

function getBudgetBand(budgetRange?: string | null) {
  const value = budgetRange ?? '';
  if (value.includes('500万')) return 'high';
  if (value.includes('200-500万')) return 'high';
  if (value.includes('50-200万')) return 'mid';
  if (value.includes('30-50万')) return 'low';
  if (value.includes('30万以下')) return 'low';
  return 'unknown';
}

export function getProductDisplayName(slug?: string | null) {
  const product = slug ? getProductBySlug(slug) : null;
  return product?.fullName ?? '微算方案';
}

export function getProductGuide(slug: ProductSlug) {
  return PRODUCT_GUIDES[slug];
}

export function recommendProduct(input: Partial<LeadInput>): ProductSlug {
  const text = normalizeText(
    [
      input.sourcePage,
      input.industry,
      input.scenario,
      input.message,
      input.budgetRange,
      input.launchTimeline,
    ].join(' ')
  );

  const budgetBand = getBudgetBand(input.budgetRange);

  if (input.sourcePage?.includes('wecalc-e') || budgetBand === 'high' || includesAny(text, HIGH_SCALE_KEYWORDS)) {
    return 'wecalc-e';
  }

  if (
    input.sourcePage?.includes('wecalc-p') ||
    budgetBand === 'mid' ||
    includesAny(text, PRODUCTION_KEYWORDS) ||
    ['制造', '医疗', '金融'].some((item) => (input.industry ?? '').includes(item))
  ) {
    return 'wecalc-p';
  }

  if (
    input.acceptsLeasing ||
    input.sourcePage?.includes('wecalc-b') ||
    budgetBand === 'low' ||
    includesAny(text, PILOT_KEYWORDS)
  ) {
    return 'wecalc-b';
  }

  return 'wecalc-b';
}

export function getRecommendedCasePath(input: Partial<LeadInput>, recommendedProduct: ProductSlug) {
  const text = normalizeText([input.message, input.scenario, input.sourcePage].join(' '));
  if (input.sourcePage?.includes('case-study') || includesAny(text, COST_KEYWORDS)) {
    return '/case-study';
  }

  if (['制造', '医疗', '金融', '教育', '高校'].some((item) => (input.industry ?? '').includes(item))) {
    return '/solutions';
  }

  return getProductBySlug(recommendedProduct)?.href ?? '/products';
}

export function estimateOpportunityValue(product: ProductSlug) {
  if (product === 'wecalc-e') return 5000000;
  if (product === 'wecalc-p') return 2000000;
  return 98000;
}

export function getLeadLevel(score: number): LeadLevel {
  if (score >= 70) return 'A';
  if (score >= 50) return 'B';
  return 'C';
}

export function getLeadNextAction(level: LeadLevel) {
  if (level === 'A') return 'founder_followup';
  if (level === 'B') return 'ai_nurture_and_book_meeting';
  return 'content_nurture';
}

export function scoreLead(input: Partial<LeadInput>): LeadScoreResult {
  let score = 0;
  const reasons: string[] = [];

  if (input.needsDataLocal) {
    score += 20;
    reasons.push('明确要求数据不出域');
  }

  if (input.launchTimeline && ['30天内', '90天内'].includes(input.launchTimeline)) {
    score += 15;
    reasons.push('上线时间较明确');
  }

  if (input.acceptsLeasing) {
    score += 10;
    reasons.push('接受融资租赁方案');
  }

  if (PRIORITY_INDUSTRIES.some((industry) => (input.industry ?? '').includes(industry))) {
    score += 10;
    reasons.push('行业优先级较高');
  }

  if ((input.sourcePage ?? '').includes('/case-study')) {
    score += 10;
    reasons.push('来自高意向案例页面');
  }

  if ((input.scenario ?? '').trim().length >= 4) {
    score += 15;
    reasons.push('提供了明确的 AI 场景');
  }

  if ((input.phone ?? '').trim() || (input.wechat ?? '').trim()) {
    score += 10;
    reasons.push('提供了可直接联系的方式');
  }

  if ((input.budgetRange ?? '').trim()) {
    score += 10;
    reasons.push('预算信息可用于方案评估');
  }

  const recommendedProduct = recommendProduct(input);
  const level = getLeadLevel(score);

  return {
    score,
    level,
    reasons,
    recommendedProduct,
    recommendedCasePath: getRecommendedCasePath(input, recommendedProduct),
    nextAction: getLeadNextAction(level),
    estimatedValue: estimateOpportunityValue(recommendedProduct),
  };
}

export function scorePartnerLead(input: PartnershipLeadInput): PartnerScoreResult {
  let score = 0;
  const reasons: string[] = [];

  if (input.industryResources.trim().length >= 6) {
    score += 20;
    reasons.push('具备清晰的区域资源描述');
  }

  if (input.hasTeam) {
    score += 20;
    reasons.push('已有执行团队');
  }

  if (input.expectedCustomerCount >= 20) {
    score += 20;
    reasons.push('预期客户覆盖较强');
  } else if (input.expectedCustomerCount >= 5) {
    score += 10;
    reasons.push('已有初步客户覆盖预期');
  }

  if ((input.experience ?? '').trim().length >= 8) {
    score += 15;
    reasons.push('具备企业服务或渠道经验');
  }

  if ((input.phone ?? '').trim() || (input.wechat ?? '').trim()) {
    score += 15;
    reasons.push('联系方式完整');
  }

  if (input.city.trim()) {
    score += 10;
    reasons.push('区域信息明确');
  }

  const level = getLeadLevel(score);

  return {
    score,
    level,
    reasons,
    status: score >= 50 ? 'reviewing' : 'new',
  };
}

export function buildLeadSummary(input: Partial<LeadInput>, result: LeadScoreResult) {
  const productName = getProductDisplayName(result.recommendedProduct);
  const fragments = [
    input.companyName ? `${input.companyName}客户` : input.name ? `${input.name}提交咨询` : '官网新线索',
    input.industry ? `行业：${input.industry}` : null,
    input.scenario ? `场景：${input.scenario}` : null,
    input.needsDataLocal ? '明确要求数据不出域' : null,
    input.acceptsLeasing ? '接受融资租赁' : null,
    input.launchTimeline ? `计划在${input.launchTimeline}上线` : null,
    `建议优先考虑${productName}`,
    `当前判定为 ${result.level} 类线索`,
  ].filter(Boolean);

  return fragments.join('；');
}

export function buildPartnerLeadSummary(input: PartnershipLeadInput, result: PartnerScoreResult) {
  const fragments = [
    `${input.city} 区域合伙人申请`,
    input.hasTeam ? '已有执行团队' : '暂未组建团队',
    input.expectedCustomerCount > 0 ? `预计覆盖客户数 ${input.expectedCustomerCount}` : null,
    input.experience ? `经验：${input.experience}` : null,
    `综合评估为 ${result.level} 类合作线索`,
  ].filter(Boolean);

  return fragments.join('；');
}

export function buildMeetingBriefing(params: {
  customerSummary: string;
  recommendedProduct: ProductSlug;
  recommendedCase?: string;
  reasons?: string[];
  notes?: string[];
  level?: LeadLevel;
  budgetRange?: string | null;
  launchTimeline?: string | null;
}) {
  const product = getProductDisplayName(params.recommendedProduct);
  const talkingPoints = [
    `先确认客户当前业务目标，并说明为何建议优先考虑${product}`,
    '强调 48-72 小时交付和数据不出域能力',
    '根据预算与上线时间判断先试点、融资租赁还是正式采购',
  ];

  if (params.recommendedCase === '/case-study') {
    talkingPoints.push('引导客户用降本案例对齐 TCO 和部署周期预期');
  }

  const risks = [
    params.budgetRange ? null : '预算尚未确认',
    params.launchTimeline ? null : '上线时间尚未确认',
    params.level === 'C' ? '客户意向仍需进一步培育' : null,
  ].filter(Boolean) as string[];

  return {
    customerSummary: params.customerSummary,
    recommendedProduct: params.recommendedProduct,
    recommendedCase: params.recommendedCase ?? '/case-study',
    talkingPoints: [...talkingPoints, ...(params.reasons ?? []).map((item) => `结合线索信息：${item}`)],
    risks,
  };
}

export function sanitizeOptionalString(value: unknown) {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

export function sanitizeBoolean(value: unknown) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (['true', '1', 'yes', 'on'].includes(normalized)) return true;
    if (['false', '0', 'no', 'off'].includes(normalized)) return false;
  }
  return undefined;
}

export function sanitizeNumber(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
}
