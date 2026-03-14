import type { Metadata } from 'next';
import Link from 'next/link';
import { coreProductFeatures, financingPlan, productCatalog, productComparison } from '@/lib/product-catalog';
import { PRODUCT_GUIDES } from '@/lib/sales';
import { BASE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: '产品中心 — 微算-B/P/E 微型算力中心全产品线',
  description:
    '微算科技产品矩阵总览：微算-B基础版(9.8万元/2000元月)、微算-P专业版(200-500万元)、微算-E企业版(500万+)。覆盖1P到50+ PFLOPS，从教学实训到大规模模型训练全场景。',
  alternates: { canonical: `${BASE_URL}/products` },
  openGraph: {
    title: '产品中心 — 微算科技全产品线',
    description: '从1P入门算力到50+ PFLOPS旗舰级定制方案，微算-B/P/E覆盖全场景需求',
    url: `${BASE_URL}/products`,
  },
};

export default function ProductsPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="section-container text-center">
          <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">PRODUCTS</p>
          <h1 className="section-title text-gray-900 mb-4">产品中心</h1>
          <p className="section-subtitle">
            从 1P 入门算力到企业级异构集群
            <br className="hidden sm:block" />
            微算为不同规模的本地 AI 需求提供统一架构、分级交付的产品方案
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/selection" className="btn-primary">
              帮我选型
            </Link>
            <Link href="/contact?intent=tco" className="btn-secondary">
              申请专属测算
            </Link>
          </div>
        </div>
      </section>

      {productCatalog.map((product, index) => {
        const guide = PRODUCT_GUIDES[product.slug];

        return (
        <section key={product.id} id={product.id} className={`section-padding ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6
                  ${product.featured ? 'bg-brand-100 text-brand-700' : 'bg-gray-100 text-gray-600'}`}>
                  {product.highlight}
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{product.fullName}</h2>
                <p className="text-xl text-brand-600 font-medium mb-4">{product.tagline}</p>
                <p className="text-gray-500 leading-relaxed mb-8">{product.longDescription}</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {product.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-2xl border border-gray-100 bg-gradient-to-b from-gray-50 to-white p-5">
                      <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                      <div className="text-sm text-gray-500">{metric.label}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4 mb-8">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-900">{spec.label}：</span>
                        <span className="text-gray-600">{spec.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mb-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-gray-100 bg-white p-5">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">适合客户类型</h3>
                    <ul className="space-y-2">
                      {guide.customerTypes.slice(0, 3).map((item) => (
                        <li key={item} className="text-sm text-gray-500">{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-white p-5">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">推荐行业</h3>
                    <div className="flex flex-wrap gap-2">
                      {guide.recommendedIndustries.map((item) => (
                        <span key={item} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Link href={product.href} className="btn-primary">查看详情</Link>
                  <Link href="/contact?intent=proposal&product=${product.slug}" className="btn-secondary">获取方案</Link>
                  {product.slug === 'wecalc-b' ? (
                    <Link href="/contact?intent=leasing&product=wecalc-b" className="btn-outline">我要融资租赁</Link>
                  ) : null}
                  <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                </div>
                <p className="text-sm text-gray-500 mt-4">{product.priceNote}</p>
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img src={product.image} alt={`${product.name} ${product.subtitle}`} className="w-full" loading="lazy" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {product.scenes.map((scene) => (
                    <span key={scene} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{scene}</span>
                  ))}
                </div>
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-gray-100 bg-white p-5">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">核心价值</h3>
                    <ul className="space-y-2">
                      {product.benefits.slice(0, 2).map((benefit) => (
                        <li key={benefit} className="text-sm text-gray-500 leading-relaxed">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-white p-5">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">交付方式</h3>
                    <ul className="space-y-2">
                      {product.delivery.slice(0, 2).map((item) => (
                        <li key={item} className="text-sm text-gray-500 leading-relaxed">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )})}

      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">FEATURES</p>
            <h2 className="section-title text-gray-900">新版宣传册核心特性</h2>
            <p className="section-subtitle">
              从开箱即用到模块化扩展，微算把算力中心的交付复杂度压缩到更适合企业落地的范围内
            </p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {coreProductFeatures.map((feature) => (
              <div key={feature.title} className="rounded-2xl bg-white border border-gray-100 p-6 card-hover">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-white" id="compare">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">COMPARISON</p>
            <h2 className="section-title text-gray-900">产品规格对比</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">规格参数</th>
                  <th className="text-center py-4 px-6">
                    <div className="text-lg font-bold text-gray-900">微算-B</div>
                    <div className="text-sm text-gray-500">基础版</div>
                  </th>
                  <th className="text-center py-4 px-6 bg-brand-50 rounded-t-2xl">
                    <div className="text-lg font-bold text-brand-600">微算-P</div>
                    <div className="text-sm text-brand-500">专业版</div>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-brand-600 text-white text-xs rounded-full">推荐</span>
                  </th>
                  <th className="text-center py-4 px-6">
                    <div className="text-lg font-bold text-gray-900">微算-E</div>
                    <div className="text-sm text-gray-500">企业版</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {productComparison.map((item, i) => (
                  <tr key={item.label} className={i % 2 === 0 ? 'bg-gray-50/50' : ''}>
                    <td className="py-4 px-6 text-sm font-medium text-gray-700">{item.label}</td>
                    <td className="py-4 px-6 text-center text-sm text-gray-600">{item.basic}</td>
                    <td className="py-4 px-6 text-center text-sm text-gray-900 font-medium bg-brand-50">{item.pro}</td>
                    <td className="py-4 px-6 text-center text-sm text-gray-600">{item.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="rounded-[2rem] bg-brand-950 text-white p-10 lg:p-12 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-900 to-indigo-950 opacity-90" />
            <div className="relative z-10 max-w-3xl">
              <p className="text-sm font-semibold text-brand-300 tracking-widest uppercase mb-3">{financingPlan.badge}</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{financingPlan.title}</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">{financingPlan.description}</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products/wecalc-b" className="btn-primary">查看微算-B详情</Link>
                <Link href="/contact" className="btn-secondary">咨询融资租赁方案</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-950 text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">找到适合您的微算产品</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            我们的专家团队将根据您的实际需求，为您推荐最佳方案
          </p>
          <Link href="/contact" className="btn-primary text-base px-10 py-4">免费咨询</Link>
        </div>
      </section>
    </>
  );
}
