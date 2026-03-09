import type { CashflowPriorityResult, CashflowStrategy } from '@/types/sales';

interface ScoringInput {
  industry?: string | null;
  needsDataLocal?: boolean;
  acceptsLeasing?: boolean;
  budgetRange?: string | null;
  launchTimeline?: string | null;
  scenario?: string | null;
  sourcePage?: string | null;
  phone?: string | null;
  wechat?: string | null;
}

const FAST_LAUNCH_TIMELINES = ['30天内', '90天内'];
const FAST_LANDING_INDUSTRIES = ['教育', '高校', '制造', '医疗'];

export function scoreCashflowPriority(input: ScoringInput): CashflowPriorityResult {
  let score = 0;
  const reasons: string[] = [];

  if (input.acceptsLeasing) {
    score += 20;
    reasons.push('明确接受微算-B融资租赁');
  }

  if (input.launchTimeline && FAST_LAUNCH_TIMELINES.includes(input.launchTimeline)) {
    const isImmediate = input.launchTimeline === '30天内';
    score += isImmediate ? 20 : 10;
    reasons.push(isImmediate ? '7天内可启动试点或签约' : '90天内可启动');
  }

  const budgetText = input.budgetRange ?? '';
  if (budgetText.includes('30万以下') || budgetText.includes('30-50万')) {
    score += 15;
    reasons.push('可接受押金/试点费/服务费');
  }

  if (
    input.sourcePage?.includes('wecalc-b') ||
    (input.scenario ?? '').toLowerCase().includes('试点')
  ) {
    score += 15;
    reasons.push('可以先从单台微算-B开始');
  }

  if (FAST_LANDING_INDUSTRIES.some((ind) => (input.industry ?? '').includes(ind))) {
    score += 10;
    reasons.push('更容易快速落地的行业');
  }

  if ((input.phone ?? '').trim() || (input.wechat ?? '').trim()) {
    score += 10;
    reasons.push('有渠道属性，可带来多单');
  }

  if ((input.sourcePage ?? '').includes('case-study')) {
    score += 10;
    reasons.push('可沉淀案例或样板点');
  }

  let cashflowPriority: CashflowPriorityResult['cashflowPriority'];
  if (score >= 70) cashflowPriority = 'urgent';
  else if (score >= 50) cashflowPriority = 'high';
  else if (score >= 30) cashflowPriority = 'medium';
  else cashflowPriority = 'low';

  let recommendedPath: CashflowStrategy;
  if (input.acceptsLeasing) {
    recommendedPath = 'B_LEASING_PUSH';
  } else if (budgetText.includes('50-200万') || budgetText.includes('200-500万') || budgetText.includes('500万')) {
    recommendedPath = 'B_SALE_PUSH';
  } else if ((input.scenario ?? '').includes('试点') || input.launchTimeline === '30天内') {
    recommendedPath = 'B_POC_PUSH';
  } else {
    recommendedPath = 'B_LEASING_PUSH';
  }

  return { cashflowScore: score, cashflowPriority, recommendedPath, reasons };
}
