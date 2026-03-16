import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProductSelector from '@/components/sales/ProductSelector';
import { BASE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Smart Product Selection — Find the Right WeCalc Product in 1 Minute',
  description:
    'Answer 3 quick questions about your industry, scenario, budget, and timeline to find the best-fit WeCalc product (WeCalc-B/P/E) and launch path (pilot/lease/purchase) in under 1 minute. Free online selection tool.',
  alternates: { canonical: `${BASE_URL}/en/selection` },
  openGraph: {
    title: 'Smart Product Selection | WeCalc',
    description: '3 questions, 1 minute to find the right WeCalc product for you',
    url: `${BASE_URL}/en/selection`,
  },
};

export default function SelectionPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="section-container text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">SMART SELECTION</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Smart Product Selection
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-500">
            No need to talk to sales first — find out whether WeCalc-B, WeCalc-P, or WeCalc-E is right for you.
          </p>
        </div>
      </section>

      <section className="pb-24 bg-white">
        <div className="section-container">
          <Suspense fallback={<div className="animate-pulse bg-gray-100 rounded-2xl h-96" />}>
            <ProductSelector />
          </Suspense>
        </div>
      </section>
    </>
  );
}
