import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { financingPlan, getProductBySlug, productCatalog } from '@/lib/product-catalog';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return productCatalog.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: '产品详情',
    };
  }

  return {
    title: `${product.fullName} 产品详情`,
    description: `${product.fullName}${product.description} 参考价格${product.price}，${product.priceNote}。`,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = productCatalog.filter((item) => item.slug !== product.slug);

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden bg-brand-950 text-white">
        <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-20`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_42%)]" />
        <div className="section-container relative z-10">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-8">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            返回产品中心
          </Link>

          <div className="grid lg:grid-cols-[1.15fr,0.85fr] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm text-white/80 mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-300" />
                {product.highlight}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                {product.fullName}
              </h1>
              <p className="text-xl text-brand-200 font-medium mb-6">{product.tagline}</p>
              <p className="text-lg text-white/75 leading-relaxed max-w-3xl mb-8">{product.longDescription}</p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Link href="/contact" className="btn-primary">获取专属方案</Link>
                <Link href="/products" className="inline-flex items-center px-8 py-3.5 text-sm font-semibold text-white border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300">
                  查看全部产品
                </Link>
              </div>

              <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
                <div>
                  <p className="text-sm text-white/50 mb-1">参考价格</p>
                  <p className="text-3xl font-bold">{product.price}</p>
                </div>
                <p className="text-sm text-white/70 max-w-xl">{product.priceNote}</p>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/20">
                <img src={product.image} alt={product.fullName} className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {product.metrics.map((metric) => (
              <div key={metric.label} className="rounded-3xl border border-gray-100 bg-gradient-to-b from-gray-50 to-white p-6 shadow-sm">
                <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
                <div className="text-sm text-gray-500">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12 lg:gap-16">
            <div>
              <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">VALUE</p>
              <h2 className="section-title text-gray-900 mb-6">产品价值</h2>
              <div className="space-y-4">
                {product.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 rounded-2xl bg-white border border-gray-100 p-5">
                    <svg className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-gray-600 leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">DELIVERY</p>
              <h2 className="section-title text-gray-900 mb-6">交付与扩展</h2>
              <div className="space-y-4">
                {product.delivery.map((item, index) => (
                  <div key={item} className="rounded-2xl bg-white border border-gray-100 p-6">
                    <div className="text-xs font-semibold text-brand-600 mb-2">Step 0{index + 1}</div>
                    <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">SPECIFICATIONS</p>
            <h2 className="section-title text-gray-900">核心规格</h2>
            <p className="section-subtitle">
              围绕计算、存储、网络与交付方式，完整展示 {product.fullName} 的关键能力
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {product.specs.map((spec) => (
              <div key={spec.label} className="rounded-2xl border border-gray-100 p-6">
                <p className="text-sm font-semibold text-gray-900 mb-2">{spec.label}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="grid lg:grid-cols-[0.9fr,1.1fr] gap-8">
            <div className="rounded-[2rem] bg-brand-950 text-white p-8 lg:p-10">
              <p className="text-sm font-semibold text-brand-300 tracking-widest uppercase mb-3">SCENARIOS</p>
              <h2 className="text-3xl font-bold mb-6">适用场景</h2>
              <div className="flex flex-wrap gap-3">
                {product.scenes.map((scene) => (
                  <span key={scene} className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-white/85">
                    {scene}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-gray-100 bg-white p-8 lg:p-10">
              <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">{financingPlan.badge}</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{financingPlan.title}</h2>
              <p className="text-gray-500 leading-relaxed mb-8">{financingPlan.description}</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary">咨询当前产品方案</Link>
                <Link href="/products/wecalc-b" className="btn-secondary">查看微算-B租赁方案</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="flex items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">RELATED PRODUCTS</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">继续了解其他产品</h2>
            </div>
            <Link href="/products" className="hidden sm:inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
              返回产品中心
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {relatedProducts.map((item) => (
              <Link key={item.slug} href={item.href} className="group rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                <div className="relative h-56 overflow-hidden">
                  <img src={item.image} alt={item.fullName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute left-6 bottom-6">
                    <p className="text-xs font-semibold text-white/70 mb-2">{item.subtitle}</p>
                    <h3 className="text-2xl font-bold text-white">{item.fullName}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">{item.price}</span>
                    <span className="inline-flex items-center text-sm font-medium text-brand-600 group-hover:translate-x-1 transition-transform">
                      查看详情
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
