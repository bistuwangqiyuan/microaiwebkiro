import type { CashflowStrategy } from '@/types/sales';
import { CASHFLOW_STRATEGY_LABELS } from '@/types/sales';

export interface ProposalSummary {
  productName: string;
  path: string;
  pathLabel: string;
  headline: string;
  body: string;
  cta: string;
  estimatedValue: number;
}

const PATH_DETAILS: Record<string, { label: string; cta: string }> = {
  sale: { label: '直接采购', cta: '获取采购方案' },
  leasing: { label: '融资租赁', cta: '申请融资租赁' },
  pilot: { label: '付费试点', cta: '申请试点' },
};

export function generateBProposal(params: {
  industry: string;
  scenario: string;
  path: 'sale' | 'leasing' | 'pilot';
}): ProposalSummary {
  const details = PATH_DETAILS[params.path];
  const industryLine = params.industry ? `针对${params.industry}行业` : '';
  const scenarioLine = params.scenario ? `的${params.scenario}场景` : '';

  const headlines: Record<string, string> = {
    sale: `微算-B ${industryLine}${scenarioLine}采购方案`,
    leasing: `微算-B 融资租赁方案 — 2,000元/月起步`,
    pilot: `微算-B 付费试点方案 — 30天验证业务闭环`,
  };

  const bodies: Record<string, string> = {
    sale: [
      `${industryLine}${scenarioLine}，微算-B 可在 48-72 小时内完成本地交付部署。`,
      '核心价值：数据不出域、TCO 降低 40-60%、一站式 AI 推理平台。',
      '建议下一步：确认预算与部署时间，安排正式方案评估。',
    ].join('\n'),
    leasing: [
      `${industryLine}${scenarioLine}，微算-B 融资租赁方案可将一次性采购成本降低为月租模式。`,
      '核心价值：2,000 元/月起步，降低资金压力，快速启动本地 AI 试点。',
      '适合预算有限但需要快速上线的客户。',
      '建议下一步：确认租赁周期和规模，提交融资租赁申请。',
    ].join('\n'),
    pilot: [
      `${industryLine}${scenarioLine}，微算-B 付费试点方案帮助您用最小配置验证业务闭环。`,
      '核心价值：先跑通一个真实 AI 场景，再决定是否扩容。',
      '试点周期通常为 30 天，试点费用可抵扣正式采购款。',
      '建议下一步：确认试点场景和交付要求，安排试点启动。',
    ].join('\n'),
  };

  const valueMap: Record<string, number> = {
    sale: 98000,
    leasing: 2000,
    pilot: 5000,
  };

  return {
    productName: '微算-B',
    path: params.path,
    pathLabel: details.label,
    headline: headlines[params.path],
    body: bodies[params.path],
    cta: details.cta,
    estimatedValue: valueMap[params.path],
  };
}

export function getRecommendedPaths(strategy: CashflowStrategy): Array<'sale' | 'leasing' | 'pilot'> {
  switch (strategy) {
    case 'B_LEASING_PUSH': return ['leasing', 'pilot', 'sale'];
    case 'B_SALE_PUSH': return ['sale', 'leasing', 'pilot'];
    case 'B_POC_PUSH': return ['pilot', 'leasing', 'sale'];
    default: return ['leasing', 'pilot', 'sale'];
  }
}

export function getStrategyDisplayName(strategy: CashflowStrategy): string {
  return CASHFLOW_STRATEGY_LABELS[strategy] ?? strategy;
}

export interface AlternativeCashflowProduct {
  name: string;
  description: string;
  estimatedRevenue: number;
  targetCustomer: string;
}

export const ALTERNATIVE_CASHFLOW_PRODUCTS: AlternativeCashflowProduct[] = [
  {
    name: '部署服务费',
    description: '微算-B 现场部署与环境调优服务',
    estimatedRevenue: 5000,
    targetCustomer: '已确认采购意向但需要部署支持的客户',
  },
  {
    name: '培训服务费',
    description: 'AI 推理平台使用培训与最佳实践',
    estimatedRevenue: 3000,
    targetCustomer: '高校、企业信息化团队',
  },
  {
    name: '售前评估费',
    description: '行业场景适配性评估与 TCO 测算',
    estimatedRevenue: 2000,
    targetCustomer: '大型项目的前期论证阶段',
  },
  {
    name: '联合 Demo 费',
    description: '定制化行业 Demo 搭建与演示',
    estimatedRevenue: 5000,
    targetCustomer: '渠道合伙人、行业展会',
  },
  {
    name: '短租算力包',
    description: '按月租用微算-B 算力资源',
    estimatedRevenue: 3000,
    targetCustomer: '短期项目或验证需求的客户',
  },
];
