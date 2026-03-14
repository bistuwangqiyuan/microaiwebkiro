import type { Metadata } from 'next';
import ProductSelector from '@/components/sales/ProductSelector';
import { BASE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: '智能选型 — 3个问题1分钟找到适合的微算产品',
  description:
    '通过行业、场景、预算和上线时间，3个问题1分钟快速判断更适合的微算产品(微算-B/P/E)与启动路径(试点/租赁/采购)。免费在线选型工具。',
  alternates: { canonical: `${BASE_URL}/selection` },
  openGraph: {
    title: '智能选型工具 | 微算科技',
    description: '3个问题，1分钟判断适合哪款微算产品',
    url: `${BASE_URL}/selection`,
  },
};

export default function SelectionPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="section-container text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">SMART SELECTION</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            智能选型
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-500">
            不需要先找销售，也可以先判断从微算-B、微算-P 还是微算-E 开始更合适。
          </p>
        </div>
      </section>

      <section className="pb-24 bg-white">
        <div className="section-container">
          <ProductSelector />
        </div>
      </section>
    </>
  );
}
