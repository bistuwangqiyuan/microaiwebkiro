import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, productCatalog } from '@/lib/product-catalog';
import { PRODUCT_GUIDES } from '@/lib/sales';
import { BASE_URL, generateBreadcrumbJsonLd, generateProductJsonLd } from '@/lib/seo';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

const enProductOverrides: Record<
  string,
  {
    name: string;
    fullName: string;
    subtitle: string;
    tagline: string;
    description: string;
    longDescription: string;
    price: string;
    priceNote: string;
    highlight: string;
    quickSpecs: string[];
    scenes: string[];
    benefits: string[];
    delivery: string[];
  }
> = {
  'wecalc-b': {
    name: 'WeCalc-B',
    fullName: 'WeCalc-B Basic',
    subtitle: 'Basic',
    tagline: '1P entry-level computing — launch your local AI pilot fast',
    description:
      'Designed for small-scale AI inference, data analytics, and training labs. A single unit delivers complete computing capability.',
    longDescription:
      'WeCalc-B is built on a "minimum viable" philosophy, integrating compute, storage, and management into one device so enterprises and universities can establish a secure, local, and scalable AI computing base within 48–72 hours.',
    price: '¥98,000',
    priceNote: 'Lease from ¥2,000/month',
    highlight: 'Best 1P Starter',
    quickSpecs: [
      '1× General CPU + Optional GPU',
      '4TB NVMe SSD',
      'Up to 1 PFLOPS',
      '25G/100G Ethernet',
    ],
    scenes: [
      'Small-scale AI Inference',
      'Data Analytics',
      'University Teaching & Training',
      'Dev/Test Environments',
    ],
    benefits: [
      'A single unit can launch full computing services — ideal for pilot validation and lightweight deployment.',
      'All data stays on your own devices, meeting data-sovereignty requirements for education, government, and R&D.',
      'Available via free pilot or financing lease, lowering the barrier to 1P of local computing power.',
    ],
    delivery: [
      'Ships with integrated hardware and software — ready to deploy on arrival.',
      'Supports one-click startup and remote O&M, reducing on-site implementation complexity.',
      'Scale smoothly by adding nodes to reach higher computing capacity later.',
    ],
  },
  'wecalc-p': {
    name: 'WeCalc-P',
    fullName: 'WeCalc-P Professional',
    subtitle: 'Professional',
    tagline: 'Mid-scale cluster for training and inference',
    description:
      'For mid-scale AI training & inference and industrial edge computing. The go-to production-grade model.',
    longDescription:
      'WeCalc-P leverages multi-CPU, multi-GPU node clusters with EBOF all-flash storage architecture to deliver higher throughput, lower latency, and stronger scalability for training, inference, and edge analytics workloads.',
    price: '¥2–5M',
    priceNote: 'Most popular production-grade solution',
    highlight: 'Production Workhorse',
    quickSpecs: [
      'Multi-CPU + Multi-GPU Cluster',
      '16×3.84TB NVMe SSD',
      'Up to 12 PFLOPS',
      '100G RDMA Interconnect',
    ],
    scenes: [
      'Mid-scale AI Training & Inference',
      'Industrial Edge Computing',
      'Medical Imaging Analysis',
      'Smart City',
    ],
    benefits: [
      'Combines disaggregated storage-compute with all-flash storage to significantly boost data loading efficiency and throughput.',
      'Bridges the gap from pilot to production with balanced performance, cost, and scalability.',
      'Supports domestic hardware compatibility and modular expansion for evolving compute infrastructure.',
    ],
    delivery: [
      'Pre-configured per scenario to reduce on-site integration time.',
      'Provides compute, storage, and networking as an integrated turnkey delivery with O&M support.',
      'Scales seamlessly to hundreds of nodes to support business growth.',
    ],
  },
  'wecalc-e': {
    name: 'WeCalc-E',
    fullName: 'WeCalc-E Enterprise',
    subtitle: 'Enterprise',
    tagline:
      'Thousand-GPU heterogeneous cluster for HPC and large-scale training',
    description:
      'Built for large-scale model training and HPC with PB-level storage and 200G/400G high-speed interconnect.',
    longDescription:
      'WeCalc-E targets high-density, high-throughput, and high-reliability workloads. Supporting multi-node heterogeneous clusters and PB-level distributed storage pools, it is the flagship solution for enterprises and research institutions building on-premise computing infrastructure.',
    price: '¥5M+',
    priceNote: 'Custom delivery based on business scale',
    highlight: 'Flagship Custom Solution',
    quickSpecs: [
      'Multi-Node Heterogeneous Cluster',
      'PB-level Distributed Storage',
      '50+ PFLOPS',
      '200G/400G Interconnect',
    ],
    scenes: [
      'Large-scale Model Training',
      'High-Performance Computing (HPC)',
      'Autonomous Driving Simulation',
      'Research Computing Platforms',
    ],
    benefits: [
      'Handles ultra-large-scale training and HPC tasks, meeting demands for high concurrency, massive data, and complex models.',
      'High-speed interconnect and distributed storage ensure data throughput and cluster stability for large workloads.',
      'Deployment architecture can be customized by industry and business model, balancing long-term evolution capability.',
    ],
    delivery: [
      'Complete solution design for compute, networking, and storage based on business objectives.',
      'Full-lifecycle delivery from site assessment to cluster go-live.',
      'Long-term expansion planning and O&M support for sustained, stable operations.',
    ],
  },
};

const enMetrics: Record<string, { value: string; label: string }[]> = {
  'wecalc-b': [
    { value: '1 PFLOPS', label: 'Max Computing Power' },
    { value: '4TB', label: 'Local NVMe Storage' },
    { value: '48–72h', label: 'Deployment Time' },
    { value: '¥2,000/mo', label: 'Financing Lease Starting' },
  ],
  'wecalc-p': [
    { value: '12 PFLOPS', label: 'Max Computing Power' },
    { value: '16×3.84TB', label: 'EBOF All-Flash Storage' },
    { value: '100G RDMA', label: 'Low-latency Interconnect' },
    { value: '48–72h', label: 'Typical Deployment' },
  ],
  'wecalc-e': [
    { value: '50+ PFLOPS', label: 'Flagship Computing Power' },
    { value: 'PB-level', label: 'Distributed Storage Pool' },
    { value: '200G/400G', label: 'High-speed Interconnect' },
    { value: '1000+ GPUs', label: 'Heterogeneous Cluster' },
  ],
};

const enSpecs: Record<string, { label: string; value: string }[]> = {
  'wecalc-b': [
    {
      label: 'Compute',
      value: '1× General-purpose CPU + Optional GPU Accelerator',
    },
    { label: 'Storage', value: '4TB NVMe SSD' },
    { label: 'Network', value: '25G/100G Ethernet Interface' },
    {
      label: 'Computing Power',
      value: 'Up to 1 PFLOPS (with GPU accelerator)',
    },
    {
      label: 'Use Cases',
      value: 'Small-scale AI Inference, Data Analytics, Teaching & Training',
    },
    { label: 'Deployment', value: '48–72 hours turnkey delivery' },
  ],
  'wecalc-p': [
    { label: 'Compute', value: 'Multi-CPU + Multi-GPU Node Cluster' },
    {
      label: 'Storage',
      value: '16×3.84TB NVMe SSD, EBOF All-Flash Storage',
    },
    {
      label: 'Network',
      value: '100G RDMA Smart NIC, RoCEv2 Interconnect',
    },
    { label: 'Computing Power', value: 'Up to 12 PFLOPS' },
    {
      label: 'Use Cases',
      value: 'Mid-scale AI Training & Inference, Industrial Edge Computing',
    },
    {
      label: 'Deployment',
      value: '48–72 hours fast delivery, supports future expansion',
    },
  ],
  'wecalc-e': [
    {
      label: 'Compute',
      value: 'Multi-Node Heterogeneous Cluster, supports 1000+ GPUs',
    },
    { label: 'Storage', value: 'PB-level Distributed Storage Pool' },
    { label: 'Network', value: '200G/400G High-speed Interconnect' },
    { label: 'Computing Power', value: 'Up to 50 PFLOPS and beyond' },
    {
      label: 'Use Cases',
      value: 'Large-scale Model Training, High-Performance Computing',
    },
    {
      label: 'Deployment',
      value: 'Custom delivery based on scale and industry requirements',
    },
  ],
};

const enGuideOverrides: Record<
  string,
  {
    customerTypes: string[];
    recommendedIndustries: string[];
    recommendation: string;
    purchasePaths: Array<{
      title: string;
      description: string;
      href: string;
      ctaLabel: string;
    }>;
  }
> = {
  'wecalc-b': {
    customerTypes: [
      'Enterprises wanting to pilot first',
      'Budget-conscious teams',
      'University teaching & training',
      'Projects needing to go live within 30 days',
    ],
    recommendedIndustries: [
      'Education',
      'Manufacturing',
      'Enterprise Services',
      'Government',
    ],
    recommendation:
      'If you want to launch a local AI pilot within 30 days, this product is usually the safest starting point.',
    purchasePaths: [
      {
        title: 'Pilot First',
        description:
          'Validate with minimum viable configuration — run a real AI scenario end to end.',
        href: '/contact?intent=pilot&product=wecalc-b',
        ctaLabel: 'Start a Pilot',
      },
      {
        title: 'Financing Lease',
        description:
          'Starting from ¥2,000/month, reducing upfront procurement pressure.',
        href: '/contact?intent=leasing&product=wecalc-b',
        ctaLabel: 'Apply for Lease',
      },
      {
        title: 'Direct Purchase',
        description:
          'For customers with clear deployment goals ready for immediate on-premise delivery.',
        href: '/contact?intent=purchase&product=wecalc-b',
        ctaLabel: 'Get Purchase Plan',
      },
    ],
  },
  'wecalc-p': {
    customerTypes: [
      'Customers ready for production',
      'Teams with defined use cases',
      'Mid-scale training & inference projects',
      'Industrial edge computing projects',
    ],
    recommendedIndustries: [
      'Manufacturing',
      'Healthcare',
      'Finance',
      'Smart City',
    ],
    recommendation:
      'If you already have the budget and application scenarios, we can provide a formal deployment plan directly.',
    purchasePaths: [
      {
        title: 'Formal Deployment',
        description:
          'For projects with clear goals that need to enter production quickly.',
        href: '/contact?intent=proposal&product=wecalc-p',
        ctaLabel: 'Get Deployment Plan',
      },
      {
        title: 'Industry Assessment',
        description:
          'Tailored solutions considering compliance, concurrency scale, and delivery timeline.',
        href: '/solutions',
        ctaLabel: 'View Industry Solutions',
      },
      {
        title: 'Expansion Planning',
        description:
          'Scale existing deployments to larger clusters node by node.',
        href: '/contact?intent=scale&product=wecalc-p',
        ctaLabel: 'Plan Expansion',
      },
    ],
  },
  'wecalc-e': {
    customerTypes: [
      'Regional intelligent computing centers',
      'Large-scale training platforms',
      'Research computing platforms',
      'Autonomous driving & HPC projects',
    ],
    recommendedIndustries: [
      'Research',
      'Autonomous Driving',
      'Finance',
      'Government',
    ],
    recommendation:
      'For regional-scale, large training, or research computing platforms, we recommend proceeding directly to custom solution assessment.',
    purchasePaths: [
      {
        title: 'Custom Solution',
        description:
          'Full architecture design based on site conditions, target scale, and industry requirements.',
        href: '/contact?intent=enterprise&product=wecalc-e',
        ctaLabel: 'Get Custom Solution',
      },
      {
        title: 'Case Assessment',
        description:
          'Review cost reduction and delivery paths before confirming project timeline.',
        href: '/case-study',
        ctaLabel: 'View Case Studies',
      },
      {
        title: 'Expansion Roadmap',
        description:
          'Smooth evolution from existing clusters to larger scale.',
        href: '/contact?intent=capacity-plan&product=wecalc-e',
        ctaLabel: 'Plan Expansion Roadmap',
      },
    ],
  },
};

const enFinancingPlan = {
  badge: 'Financing Lease',
  title: 'Starting from just ¥2,000/month for 1P of computing power',
  description:
    'Equivalent to approximately ¥40,000 in ChatGPT token credits — ideal for enterprises and institutions looking to adopt local AI capabilities with minimal upfront investment.',
};

export function generateStaticParams() {
  return productCatalog.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: 'Product Details' };
  }

  const en = enProductOverrides[slug];
  if (!en) {
    return { title: 'Product Details' };
  }

  return {
    title: `${en.fullName} — ${en.tagline}`,
    description: `${en.fullName}: ${en.description} ${en.longDescription} Reference price ${en.price}, ${en.priceNote}.`,
    alternates: {
      canonical: `${BASE_URL}/en/products/${product.slug}`,
    },
    openGraph: {
      title: `${en.fullName} — ${en.tagline} | WeCalc Technology`,
      description: en.longDescription,
      url: `${BASE_URL}/en/products/${product.slug}`,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: en.fullName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${en.fullName} | WeCalc Technology`,
      description: en.tagline,
      images: [product.image],
    },
  };
}

export default async function EnProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const en = enProductOverrides[product.slug];
  if (!en) {
    notFound();
  }

  const metrics = enMetrics[product.slug];
  const specs = enSpecs[product.slug];
  const guideEn = enGuideOverrides[product.slug];
  const relatedProducts = productCatalog.filter(
    (item) => item.slug !== product.slug,
  );

  const productJsonLd = generateProductJsonLd(product);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: `${BASE_URL}/en` },
    { name: 'Products', url: `${BASE_URL}/en/products` },
    {
      name: en.fullName,
      url: `${BASE_URL}/en/products/${product.slug}`,
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="relative pt-32 pb-20 overflow-hidden bg-brand-950 text-white">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-20`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_42%)]" />
        <div className="section-container relative z-10">
          <Link
            href="/en/products"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-8"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-[1.15fr,0.85fr] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm text-white/80 mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-300" />
                {en.highlight}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                {en.fullName}
              </h1>
              <p className="text-xl text-brand-200 font-medium mb-6">
                {en.tagline}
              </p>
              <p className="text-lg text-white/75 leading-relaxed max-w-3xl mb-8">
                {en.longDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Link
                  href={`/contact?intent=pilot&product=${product.slug}`}
                  className="btn-primary"
                >
                  Start a Pilot
                </Link>
                <Link
                  href={`/contact?intent=${product.slug === 'wecalc-b' ? 'leasing' : 'proposal'}&product=${product.slug}`}
                  className="btn-secondary"
                >
                  {product.slug === 'wecalc-b'
                    ? 'Apply for Financing Lease'
                    : 'Get Custom Proposal'}
                </Link>
                <Link
                  href="/en/products"
                  className="inline-flex items-center px-8 py-3.5 text-sm font-semibold text-white border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  View All Products
                </Link>
              </div>

              <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
                <div>
                  <p className="text-sm text-white/50 mb-1">Reference Price</p>
                  <p className="text-3xl font-bold">{en.price}</p>
                </div>
                <p className="text-sm text-white/70 max-w-xl">
                  {en.priceNote}
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/20">
                <img
                  src={product.image}
                  alt={en.fullName}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-3xl border border-gray-100 bg-gradient-to-b from-gray-50 to-white p-6 shadow-sm"
              >
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-500">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-gray-100 bg-white p-8">
              <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">
                FIT
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ideal Customer Profile
              </h2>
              <div className="flex flex-wrap gap-3">
                {guideEn.customerTypes.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-gray-600">
                {guideEn.recommendation}
              </p>
            </div>
            <div className="rounded-[2rem] border border-gray-100 bg-white p-8">
              <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">
                INDUSTRIES
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Recommended Industries
              </h2>
              <div className="flex flex-wrap gap-3">
                {guideEn.recommendedIndustries.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-brand-50 px-4 py-2 text-sm text-brand-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link href="/solutions" className="btn-secondary">
                  View Industry Solutions
                </Link>
                <Link href="/case-study" className="btn-outline">
                  View Case Studies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12 lg:gap-16">
            <div>
              <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">
                VALUE
              </p>
              <h2 className="section-title text-gray-900 mb-6">
                Product Value
              </h2>
              <div className="space-y-4">
                {en.benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-start gap-3 rounded-2xl bg-white border border-gray-100 p-5"
                  >
                    <svg
                      className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">
                DELIVERY
              </p>
              <h2 className="section-title text-gray-900 mb-6">
                Delivery &amp; Scaling
              </h2>
              <div className="space-y-4">
                {en.delivery.map((item, index) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white border border-gray-100 p-6"
                  >
                    <div className="text-xs font-semibold text-brand-600 mb-2">
                      Step 0{index + 1}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item}
                    </p>
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
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">
              SPECIFICATIONS
            </p>
            <h2 className="section-title text-gray-900">Core Specifications</h2>
            <p className="section-subtitle">
              A complete overview of {en.fullName}&apos;s key capabilities across
              compute, storage, networking, and delivery
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="rounded-2xl border border-gray-100 p-6"
              >
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  {spec.label}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="grid lg:grid-cols-[0.9fr,1.1fr] gap-8">
            <div className="rounded-[2rem] bg-brand-950 text-white p-8 lg:p-10">
              <p className="text-sm font-semibold text-brand-300 tracking-widest uppercase mb-3">
                SCENARIOS
              </p>
              <h2 className="text-3xl font-bold mb-6">Use Cases</h2>
              <div className="flex flex-wrap gap-3">
                {en.scenes.map((scene) => (
                  <span
                    key={scene}
                    className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-white/85"
                  >
                    {scene}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-gray-100 bg-white p-8 lg:p-10">
              <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">
                {enFinancingPlan.badge}
              </p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {enFinancingPlan.title}
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                {enFinancingPlan.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary">
                  Inquire About This Product
                </Link>
                <Link href="/en/products/wecalc-b" className="btn-secondary">
                  View WeCalc-B Lease Plan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">
              BUYING PATH
            </p>
            <h2 className="section-title text-gray-900">
              Recommended Buying Paths
            </h2>
            <p className="section-subtitle">
              Depending on your project stage, choose from pilot, financing
              lease, formal procurement, or expansion planning
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {guideEn.purchasePaths.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-gray-100 bg-gray-50 p-6"
              >
                <h3 className="text-xl font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                >
                  {item.ctaLabel}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="flex items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">
                RELATED PRODUCTS
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Explore Other Products
              </h2>
            </div>
            <Link
              href="/en/products"
              className="hidden sm:inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
            >
              Back to Products
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {relatedProducts.map((item) => {
              const relEn = enProductOverrides[item.slug];
              return (
                <Link
                  key={item.slug}
                  href={`/en/products/${item.slug}`}
                  className="group rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image}
                      alt={relEn?.fullName ?? item.fullName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute left-6 bottom-6">
                      <p className="text-xs font-semibold text-white/70 mb-2">
                        {relEn?.subtitle ?? item.subtitle}
                      </p>
                      <h3 className="text-2xl font-bold text-white">
                        {relEn?.fullName ?? item.fullName}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                      {relEn?.description ?? item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900">
                        {relEn?.price ?? item.price}
                      </span>
                      <span className="inline-flex items-center text-sm font-medium text-brand-600 group-hover:translate-x-1 transition-transform">
                        View Details
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
