import type { Metadata } from 'next';
import SalesDashboard from '@/components/sales/SalesDashboard';
import { isDatabaseConfigured } from '@/lib/db';
import { getDashboardData } from '@/lib/sales-repository';

export const metadata: Metadata = {
  title: 'AI 销售看板',
  description: '查看官网线索、来源页面、商机阶段和待跟进任务的销售中台看板。',
};

export default async function AdminSalesPage() {
  const configured = isDatabaseConfigured();
  const data = configured ? await getDashboardData().catch(() => null) : null;

  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="section-container">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">AI SALES OPS</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            AI 销售看板
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-500">
            用于查看官网线索、重点页面热度、进行中商机以及待跟进任务。
          </p>
        </div>
      </section>

      <section className="pb-24 bg-white">
        <div className="section-container">
          {configured && data ? (
            <SalesDashboard data={data} />
          ) : (
            <div className="rounded-[2rem] border border-gray-100 bg-gray-50 p-10">
              <h2 className="text-2xl font-bold text-gray-900">看板尚未启用</h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                请先配置 `DATABASE_URL` 并执行 `docs/ai-sales-schema.sql` 中的建表 SQL，
                之后此页面会自动展示线索与商机数据。
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
