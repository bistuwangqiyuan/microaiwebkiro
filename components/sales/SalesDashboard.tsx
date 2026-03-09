import type { DashboardData } from '@/lib/sales';

interface AgentRunsSummary {
  todayTotal: number;
  successRate: number;
  openclawFallbackCount: number;
}

interface CashflowSummary {
  inflowToday: number;
  netCashflowToday: number;
  bDealsToday: number;
}

interface GmDecisionRow {
  decisionId: string;
  primaryGoal: string;
  chosenStrategy: string;
  expectedCashIn: number;
  actualCashIn: number;
  nextPlan: string | null;
  createdAt: string;
}

interface ExtendedDashboardData extends DashboardData {
  agentRuns?: AgentRunsSummary;
  cashflow?: CashflowSummary;
  gmDecisions?: GmDecisionRow[];
}

export default function SalesDashboard({ data }: { data: ExtendedDashboardData }) {
  return (
    <div className="space-y-10">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: '今日新增线索', value: data.summary.newLeadsToday },
          { label: '今日 A 类线索', value: data.summary.aLeadsToday },
          { label: '进行中商机', value: data.summary.openOpportunities },
          { label: '待跟进任务', value: data.summary.pendingFollowups },
        ].map((item) => (
          <div key={item.label} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="text-sm text-gray-500">{item.label}</div>
            <div className="mt-3 text-4xl font-bold text-gray-900">{item.value}</div>
          </div>
        ))}
      </section>

      {(data.agentRuns || data.cashflow) && (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.agentRuns && (
            <>
              <MetricCard label="今日智能体运行次数" value={data.agentRuns.todayTotal} />
              <MetricCard
                label="运行成功率"
                value={`${Math.round(data.agentRuns.successRate * 100)}%`}
              />
              <MetricCard label="OpenClaw 兜底次数" value={data.agentRuns.openclawFallbackCount} />
            </>
          )}
          {data.cashflow && (
            <>
              <MetricCard label="今日现金流入" value={`¥${data.cashflow.inflowToday.toLocaleString()}`} />
              <MetricCard label="今日净现金流" value={`¥${data.cashflow.netCashflowToday.toLocaleString()}`} />
              <MetricCard label="今日微算-B成交" value={data.cashflow.bDealsToday} />
            </>
          )}
        </section>
      )}

      {data.gmDecisions && data.gmDecisions.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">总经理智能体决策记录</h2>
          <div className="space-y-4">
            {data.gmDecisions.map((d) => (
              <div
                key={d.decisionId}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold text-gray-900">{d.primaryGoal}</div>
                    <div className="mt-1 text-sm text-gray-500">
                      策略：{d.chosenStrategy} · 预期回款：¥{d.expectedCashIn.toLocaleString()} · 实际回款：¥{d.actualCashIn.toLocaleString()}
                    </div>
                    {d.nextPlan && (
                      <div className="mt-2 text-sm text-gray-600">下轮计划：{d.nextPlan}</div>
                    )}
                  </div>
                  <div className="shrink-0 text-xs text-gray-400">
                    {new Date(d.createdAt).toLocaleString('zh-CN')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="grid gap-6 xl:grid-cols-2">
        <DashboardPanel title="来源页面 / 渠道" rows={data.leadSources} />
        <DashboardPanel title="热度最高页面" rows={data.topPages} />
        <DashboardPanel title="商机阶段分布" rows={data.stageDistribution} />
        <DashboardPanel title="行业分布" rows={data.industryDistribution} />
      </section>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-2 text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );
}

function DashboardPanel({
  title,
  rows,
}: {
  title: string;
  rows: Array<{ label: string; value: number }>;
}) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      <div className="mt-6 space-y-4">
        {rows.length ? (
          rows.map((row) => (
            <div key={`${title}-${row.label}`} className="flex items-center gap-4">
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-gray-800">{row.label}</div>
                <div className="mt-2 h-2 rounded-full bg-gray-100">
                  <div
                    className="h-2 rounded-full bg-brand-600"
                    style={{ width: `${Math.max(12, Math.min(100, row.value * 10))}%` }}
                  />
                </div>
              </div>
              <div className="text-sm font-semibold text-gray-900">{row.value}</div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">暂无数据</p>
        )}
      </div>
    </div>
  );
}
