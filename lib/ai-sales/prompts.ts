import type { CashflowStrategy } from '@/types/sales';
import { CASHFLOW_STRATEGY_LABELS } from '@/types/sales';

export function buildGmDecisionPrompt(context: {
  newLeadsCount: number;
  aLeadsCount: number;
  openOpportunities: number;
  partnerLeadsCount: number;
  latestCashflowNet: number | null;
  consecutiveFailures: number;
  recentStrategies: string[];
}): string {
  return `你是微算科技的AI总经理智能体。你的唯一目标是在未来8小时内推动微算项目的正向现金流。

当前经营数据:
- 新线索: ${context.newLeadsCount} 条
- A类高意向线索: ${context.aLeadsCount} 条
- 进行中商机: ${context.openOpportunities} 个
- 合伙人申请: ${context.partnerLeadsCount} 个
- 上一轮净现金流: ${context.latestCashflowNet !== null ? `${context.latestCashflowNet}元` : '暂无数据'}
- 连续未产出轮数: ${context.consecutiveFailures}
- 最近策略: ${context.recentStrategies.join(' → ') || '无'}

现金流策略优先级（从高到低）:
1. 微算-B融资租赁 - 客户预算有限但能快速启动
2. 微算-B直接销售 - 客户预算明确、决策链短
3. 微算-B付费试点/POC - 客户可付试点费用或押金
4. 微算-B+服务包 - 客户愿意先付部署费、培训费
5. 合伙人starter package - 渠道方可先拿样机
6. 替代正现金流路径 - 方案费、评估费、短租算力包

规则:
- 如果连续2轮同一策略无产出，必须切换到下一优先级策略
- 优先推进A类线索中最接近现金流的客户
- 输出必须包含: primaryGoal, chosenStrategy, expectedCashIn, why, nextPlan

请以JSON格式输出决策。`;
}

export function buildProposalPrompt(params: {
  industry: string;
  scenario: string;
  product: string;
  path: 'sale' | 'leasing' | 'pilot';
}): string {
  const pathLabels = {
    sale: '直接采购',
    leasing: '融资租赁',
    pilot: '付费试点',
  };

  return `你是微算科技的方案智能体。请为以下客户生成${pathLabels[params.path]}方案摘要:

行业: ${params.industry}
场景: ${params.scenario}
推荐产品: ${params.product}
成交路径: ${pathLabels[params.path]}

要求:
1. 包含产品价值点（48-72小时交付、数据不出域、TCO降低40-60%）
2. 包含该行业的典型应用场景
3. 包含成交路径的具体说明和下一步动作
4. 如果是融资租赁，强调2000元/月起步
5. 如果是试点，强调最小可用配置验证业务闭环
6. 控制在300字以内`;
}

export function buildLeadNurturePrompt(params: {
  leadLevel: string;
  industry: string | null;
  scenario: string | null;
  lastContactDays: number;
}): string {
  return `你是微算科技的培育智能体。请为以下B/C类线索生成培育内容:

线索级别: ${params.leadLevel}
行业: ${params.industry ?? '未知'}
场景: ${params.scenario ?? '未知'}
距上次联系: ${params.lastContactDays}天

要求:
1. 生成一段不超过200字的跟进消息
2. 重点引导客户关注微算-B的低门槛启动方案
3. 包含一个明确的行动号召（申请试点、查看案例、预约演示）
4. 语气专业但不推销`;
}

export function buildOpenClawInstruction(params: {
  taskName: string;
  targetSystem: string;
  payload: Record<string, unknown>;
}): string {
  return `执行任务: ${params.taskName}
目标系统: ${params.targetSystem}
任务数据: ${JSON.stringify(params.payload, null, 2)}

要求:
1. 按步骤完成操作
2. 每个关键步骤截图留证
3. 操作完成后返回结果摘要
4. 如果遇到验证码或异常，标记为失败并返回错误信息`;
}

export function getStrategyLabel(strategy: CashflowStrategy): string {
  return CASHFLOW_STRATEGY_LABELS[strategy] ?? strategy;
}
