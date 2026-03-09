import type { Metadata } from 'next';
import ProductSelector from '@/components/sales/ProductSelector';

export const metadata: Metadata = {
  title: '智能选型',
  description: '通过行业、场景、预算和上线时间快速判断更适合的微算产品与启动路径。',
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
