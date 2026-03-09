import type { CashflowStrategy } from '@/types/sales';
import { CASHFLOW_STRATEGY_LABELS } from '@/types/sales';

export interface LeadActionSummary {
  leadId: string;
  level: string;
  cashflowPriority: string;
  recommendedPath: CashflowStrategy;
  nextActions: string[];
  summary: string;
}

export function buildLeadActionSummary(params: {
  leadId: string;
  name?: string | null;
  companyName?: string | null;
  industry?: string | null;
  scenario?: string | null;
  level: string;
  cashflowPriority: string;
  recommendedPath: CashflowStrategy;
  acceptsLeasing?: boolean;
  budgetRange?: string | null;
}): LeadActionSummary {
  const nextActions: string[] = [];

  if (params.level === 'A') {
    if (params.acceptsLeasing) {
      nextActions.push('发送融资租赁方案资料');
      nextActions.push('安排融资租赁流程说明');
    } else {
      nextActions.push('发送微算-B产品资料包');
    }
    nextActions.push('预约线上演示或现场沟通');
    nextActions.push('24小时内完成首轮跟进');
  } else if (params.level === 'B') {
    nextActions.push('发送行业案例和降本测算');
    nextActions.push('引导进入微算-B试点评估');
    nextActions.push('48小时内完成首轮跟进');
  } else {
    nextActions.push('加入内容培育序列');
    nextActions.push('定期发送行业动态和案例');
  }

  const fragments = [
    params.companyName ? `${params.companyName}` : params.name ? `${params.name}` : '新线索',
    params.industry ? `行业：${params.industry}` : null,
    params.scenario ? `场景：${params.scenario}` : null,
    `判定为${params.level}类线索`,
    `现金流优先级：${params.cashflowPriority}`,
    `推荐路径：${CASHFLOW_STRATEGY_LABELS[params.recommendedPath]}`,
  ].filter(Boolean);

  return {
    leadId: params.leadId,
    level: params.level,
    cashflowPriority: params.cashflowPriority,
    recommendedPath: params.recommendedPath,
    nextActions,
    summary: fragments.join('；'),
  };
}

export function buildFollowupContent(params: {
  level: string;
  industry?: string | null;
  scenario?: string | null;
  recommendedProduct: string;
  path: CashflowStrategy;
}): string {
  const pathLabel = CASHFLOW_STRATEGY_LABELS[params.path];
  const industryLine = params.industry ? `在${params.industry}行业` : '';
  const scenarioLine = params.scenario ? `的${params.scenario}场景中` : '';

  if (params.level === 'A') {
    return `您好，感谢您对微算的关注。${industryLine}${scenarioLine}，我们建议优先通过"${pathLabel}"方式快速启动。我们已为您准备了详细的方案资料，方便安排一次15分钟的线上沟通吗？`;
  }

  if (params.level === 'B') {
    return `您好，${industryLine}${scenarioLine}，很多类似客户通过微算-B在30天内完成了本地AI试点。我们整理了一份降本案例供您参考，如果感兴趣可以随时申请试用。`;
  }

  return `您好，感谢关注微算。我们定期分享AI私有化部署的最新案例和行业实践，后续有适合您的方案会第一时间通知您。`;
}
