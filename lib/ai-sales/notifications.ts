import { sendSalesNotification } from '@/lib/sales-notifications';
import type { CashflowStrategy } from '@/types/sales';
import { CASHFLOW_STRATEGY_LABELS } from '@/types/sales';
import type { GmDecisionOutput } from '@/types/gm';

export async function notifyGmDecision(decision: GmDecisionOutput, runId: string) {
  await sendSalesNotification({
    title: '🤖 总经理智能体经营决策',
    level: 'info',
    summary: decision.primaryGoal,
    fields: [
      { label: '运行ID', value: runId },
      { label: '选择策略', value: CASHFLOW_STRATEGY_LABELS[decision.chosenStrategy] },
      { label: '预期现金流入', value: `${decision.expectedCashIn}元` },
      { label: '决策原因', value: decision.why.join('；') },
      { label: '下轮计划', value: decision.nextPlan },
    ],
  });
}

export async function notifyRunComplete(params: {
  runId: string;
  status: string;
  tasksCreated: number;
  tasksSucceeded: number;
  tasksFailed: number;
  openclawFallbackCount: number;
  strategy: CashflowStrategy;
}) {
  await sendSalesNotification({
    title: '📊 经营周期完成',
    level: params.tasksFailed > 0 ? 'warning' : 'info',
    summary: `本轮经营周期已完成，策略：${CASHFLOW_STRATEGY_LABELS[params.strategy]}`,
    fields: [
      { label: '运行ID', value: params.runId },
      { label: '总状态', value: params.status },
      { label: '创建任务数', value: params.tasksCreated },
      { label: '成功任务数', value: params.tasksSucceeded },
      { label: '失败任务数', value: params.tasksFailed },
      { label: 'OpenClaw兜底次数', value: params.openclawFallbackCount },
    ],
  });
}

export async function notifyHighPriorityLead(params: {
  leadId: string;
  name: string | null;
  industry: string | null;
  level: string;
  recommendedProduct: string;
  cashflowPriority: string;
}) {
  await sendSalesNotification({
    title: '🔥 高优先级线索',
    level: 'urgent',
    summary: `新增${params.level}类线索，现金流优先级：${params.cashflowPriority}`,
    fields: [
      { label: '线索ID', value: params.leadId },
      { label: '客户名称', value: params.name },
      { label: '行业', value: params.industry },
      { label: '推荐产品', value: params.recommendedProduct },
    ],
  });
}

export async function notifyStrategySwitch(params: {
  fromStrategy: string;
  toStrategy: CashflowStrategy;
  reason: string;
  consecutiveFailures: number;
}) {
  await sendSalesNotification({
    title: '🔄 策略切换',
    level: 'warning',
    summary: `总经理智能体主动切换策略`,
    fields: [
      { label: '原策略', value: params.fromStrategy },
      { label: '新策略', value: CASHFLOW_STRATEGY_LABELS[params.toStrategy] },
      { label: '切换原因', value: params.reason },
      { label: '连续失败轮数', value: params.consecutiveFailures },
    ],
  });
}
