import type { CashflowStrategy } from '@/types/sales';
import { CASHFLOW_STRATEGY_PRIORITY } from '@/types/sales';
import type { GmOperatingContext, GmDecisionOutput, ObjectiveType } from '@/types/gm';

const STRATEGY_TO_OBJECTIVE: Record<CashflowStrategy, ObjectiveType> = {
  B_LEASING_PUSH: 'B_LEASING',
  B_SALE_PUSH: 'B_SALE',
  B_POC_PUSH: 'B_POC',
  B_SERVICE_PACKAGE_PUSH: 'B_SERVICE_PACKAGE',
  PARTNER_STARTER_PUSH: 'PARTNER_STARTER_PACKAGE',
  ALT_CASHFLOW_PUSH: 'ALT_CASHFLOW',
};

function hasALeadsForB(ctx: GmOperatingContext): boolean {
  return ctx.recentLeads.some(
    (l) => l.lead_level === 'A' && (l.accepts_leasing || l.recommended_product === 'wecalc-b')
  );
}

function hasPartnerLeads(ctx: GmOperatingContext): boolean {
  return ctx.recentPartnerLeads.some((p) => p.ai_score >= 50);
}

function hasOpenBOpportunities(ctx: GmOperatingContext): boolean {
  return ctx.openOpportunities.some(
    (o) => o.recommended_product === 'wecalc-b' && !['won', 'lost'].includes(o.stage)
  );
}

export function selectStrategy(ctx: GmOperatingContext): GmDecisionOutput {
  const failureCount = ctx.consecutiveFailures;
  const recentStrategies = ctx.recentDecisions.map((d) => d.chosen_strategy);
  const lastStrategy = recentStrategies[0] as CashflowStrategy | undefined;

  let chosen: CashflowStrategy;
  const why: string[] = [];

  if (failureCount >= 2 && lastStrategy) {
    const currentIdx = CASHFLOW_STRATEGY_PRIORITY.indexOf(lastStrategy);
    const nextIdx = Math.min(currentIdx + 1, CASHFLOW_STRATEGY_PRIORITY.length - 1);
    chosen = CASHFLOW_STRATEGY_PRIORITY[nextIdx];
    why.push(`上一策略"${lastStrategy}"连续${failureCount}轮无产出，切换到下一优先级`);
  } else if (hasALeadsForB(ctx)) {
    const hasLeasingLeads = ctx.recentLeads.some((l) => l.lead_level === 'A' && l.accepts_leasing);
    chosen = hasLeasingLeads ? 'B_LEASING_PUSH' : 'B_SALE_PUSH';
    why.push('当前有A类高意向微算-B线索');
    if (hasLeasingLeads) why.push('线索接受融资租赁，优先推租赁路径');
  } else if (hasOpenBOpportunities(ctx)) {
    chosen = 'B_POC_PUSH';
    why.push('有进行中的微算-B商机，优先推动付费试点/POC');
  } else if (hasPartnerLeads(ctx)) {
    chosen = 'PARTNER_STARTER_PUSH';
    why.push('有高评分合伙人申请，优先推渠道starter package');
  } else if (ctx.recentLeads.length > 0) {
    chosen = 'B_LEASING_PUSH';
    why.push('有新线索但无高意向A类，默认推微算-B融资租赁');
  } else {
    chosen = 'ALT_CASHFLOW_PUSH';
    why.push('当前无可推进线索，转推替代现金流路径');
  }

  const expectedCashIn = estimateExpectedCashIn(chosen, ctx);

  return {
    primaryGoal: buildPrimaryGoal(chosen),
    chosenStrategy: chosen,
    expectedCashIn,
    expectedSignCount: chosen === 'ALT_CASHFLOW_PUSH' ? 0 : 1,
    why,
    nextPlan: buildNextPlan(chosen, ctx),
    objectiveType: STRATEGY_TO_OBJECTIVE[chosen],
    targetMetric: getTargetMetric(chosen),
    targetValue: expectedCashIn,
  };
}

function estimateExpectedCashIn(strategy: CashflowStrategy, ctx: GmOperatingContext): number {
  switch (strategy) {
    case 'B_LEASING_PUSH': return 2000;
    case 'B_SALE_PUSH': return 50000;
    case 'B_POC_PUSH': return 5000;
    case 'B_SERVICE_PACKAGE_PUSH': return 10000;
    case 'PARTNER_STARTER_PUSH': return 15000;
    case 'ALT_CASHFLOW_PUSH': return 3000;
    default: return 0;
  }
}

function buildPrimaryGoal(strategy: CashflowStrategy): string {
  const goals: Record<CashflowStrategy, string> = {
    B_LEASING_PUSH: '本轮优先推进1个微算-B融资租赁签约',
    B_SALE_PUSH: '本轮优先推进1个微算-B直接销售成交',
    B_POC_PUSH: '本轮优先推进1个微算-B付费试点或押金锁单',
    B_SERVICE_PACKAGE_PUSH: '本轮优先推进1个微算-B+服务包付费组合',
    PARTNER_STARTER_PUSH: '本轮优先推进1个渠道合伙人starter package签约',
    ALT_CASHFLOW_PUSH: '本轮优先推进替代现金流收入（方案费/评估费/短租算力包）',
  };
  return goals[strategy];
}

function buildNextPlan(strategy: CashflowStrategy, ctx: GmOperatingContext): string {
  if (ctx.recentLeads.length === 0 && ctx.openOpportunities.length === 0) {
    return '下一轮重点提升官网流量和AI对话留资率';
  }

  const aLeads = ctx.recentLeads.filter((l) => l.lead_level === 'A');
  if (aLeads.length > 0) {
    return `下一轮继续推进${aLeads.length}个A类线索，重点跟进最接近成交的客户`;
  }

  return '下一轮根据本轮执行结果决定是否切换策略';
}

function getTargetMetric(strategy: CashflowStrategy): string {
  const metrics: Record<CashflowStrategy, string> = {
    B_LEASING_PUSH: 'b_rental_signed',
    B_SALE_PUSH: 'b_sale_signed',
    B_POC_PUSH: 'b_poc_started',
    B_SERVICE_PACKAGE_PUSH: 'service_package_sold',
    PARTNER_STARTER_PUSH: 'partner_starter_signed',
    ALT_CASHFLOW_PUSH: 'alt_revenue_collected',
  };
  return metrics[strategy];
}
