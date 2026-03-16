import type { Metadata } from 'next';
import Link from 'next/link';
import { productCatalog } from '@/lib/product-catalog';
import { PRODUCT_GUIDES } from '@/lib/sales';
import { BASE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Products — WeCalc-B/P/E Micro Computing Center Full Product Line',
  description:
    'WeCalc product lineup overview: WeCalc-B Basic (¥98K / ¥2,000/mo), WeCalc-P Professional (¥2–5M), WeCalc-E Enterprise (¥5M+). Covering 1P to 50+ PFLOPS, from teaching labs to large-scale model training.',
  alternates: { canonical: `${BASE_URL}/en/products` },
  openGraph: {
    title: 'Products — WeCalc Full Product Line',
    description:
      'From 1P entry-level to 50+ PFLOPS flagship custom solutions — WeCalc-B/P/E covers every scenario',
    url: `${BASE_URL}/en/products`,
  },
};

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
    ],
    delivery: [
      'Ships with integrated hardware and software — ready to deploy on arrival.',
      'Supports one-click startup and remote O&M, reducing on-site implementation complexity.',
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
    ],
    delivery: [
      'Pre-configured per scenario to reduce on-site integration time.',
      'Provides compute, storage, and networking as an integrated turnkey delivery with O&M support.',
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
    ],
    delivery: [
      'Complete solution design for compute, networking, and storage based on business objectives.',
      'Full-lifecycle delivery from site assessment to cluster go-live.',
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
    { label: 'Compute', value: '1× General-purpose CPU + Optional GPU Accelerator' },
    { label: 'Storage', value: '4TB NVMe SSD' },
    { label: 'Network', value: '25G/100G Ethernet Interface' },
    { label: 'Computing Power', value: 'Up to 1 PFLOPS (with GPU accelerator)' },
    { label: 'Use Cases', value: 'Small-scale AI Inference, Data Analytics, Teaching & Training' },
    { label: 'Deployment', value: '48–72 hours turnkey delivery' },
  ],
  'wecalc-p': [
    { label: 'Compute', value: 'Multi-CPU + Multi-GPU Node Cluster' },
    { label: 'Storage', value: '16×3.84TB NVMe SSD, EBOF All-Flash Storage' },
    { label: 'Network', value: '100G RDMA Smart NIC, RoCEv2 Interconnect' },
    { label: 'Computing Power', value: 'Up to 12 PFLOPS' },
    { label: 'Use Cases', value: 'Mid-scale AI Training & Inference, Industrial Edge Computing' },
    { label: 'Deployment', value: '48–72 hours fast delivery, supports future expansion' },
  ],
  'wecalc-e': [
    { label: 'Compute', value: 'Multi-Node Heterogeneous Cluster, supports 1000+ GPUs' },
    { label: 'Storage', value: 'PB-level Distributed Storage Pool' },
    { label: 'Network', value: '200G/400G High-speed Interconnect' },
    { label: 'Computing Power', value: 'Up to 50 PFLOPS and beyond' },
    { label: 'Use Cases', value: 'Large-scale Model Training, High-Performance Computing' },
    { label: 'Deployment', value: 'Custom delivery based on scale and industry requirements' },
  ],
};

const enGuideOverrides: Record<
  string,
  {
    customerTypes: string[];
    recommendedIndustries: string[];
  }
> = {
  'wecalc-b': {
    customerTypes: [
      'Enterprises wanting to pilot first',
      'Budget-conscious teams',
      'University teaching & training',
    ],
    recommendedIndustries: [
      'Education',
      'Manufacturing',
      'Enterprise Services',
      'Government',
    ],
  },
  'wecalc-p': {
    customerTypes: [
      'Customers ready for production',
      'Teams with defined use cases',
      'Mid-scale training & inference projects',
    ],
    recommendedIndustries: [
      'Manufacturing',
      'Healthcare',
      'Finance',
      'Smart City',
    ],
  },
  'wecalc-e': {
    customerTypes: [
      'Regional intelligent computing centers',
      'Large-scale training platforms',
      'Research computing platforms',
    ],
    recommendedIndustries: [
      'Research',
      'Autonomous Driving',
      'Finance',
      'Government',
    ],
  },
};

const enCoreFeatures = [
  {
    title: 'Plug and Play',
    description:
      'Ships with fully integrated hardware and software — no specialized setup required.',
  },
  {
    title: 'Single-Unit Operation',
    description:
      'One device delivers a complete computing service, ideal for quick pilots.',
  },
  {
    title: 'One-Click Startup',
    description:
      'Power on and launch computing services with one click, lowering deployment barriers.',
  },
  {
    title: 'Turnkey Delivery',
    description:
      'End-to-end turnkey service from deployment to operation, completed in 48–72 hours.',
  },
  {
    title: 'Modular Expansion',
    description:
      'Supports hot-swap expansion, scaling smoothly from a single unit to a cluster.',
  },
  {
    title: 'Multi-Hardware Support',
    description: 'Flexibly accommodates CPUs, GPUs, SSDs, and more.',
  },
  {
    title: 'Domestic HW Compatible',
    description:
      'Huawei Ascend & Kunpeng certified, compatible with 90%+ of domestic GPUs.',
  },
];

const enFinancingPlan = {
  badge: 'Financing Lease',
  title: 'Starting from just ¥2,000/month for 1P of computing power',
  description:
    'Equivalent to approximately ¥40,000 in ChatGPT token credits — ideal for enterprises and institutions looking to adopt local AI capabilities with minimal upfront investment.',
};

const enProductComparison = [
  {
    label: 'Compute',
    basic: '1×CPU + Optional GPU',
    pro: 'Multi-CPU + Multi-GPU Cluster',
    enterprise: 'Thousand-GPU Heterogeneous Cluster',
  },
  {
    label: 'Storage',
    basic: '4TB NVMe SSD',
    pro: '16×3.84TB EBOF',
    enterprise: 'PB-level Distributed Storage',
  },
  {
    label: 'Computing Power',
    basic: '≤1 PFLOPS',
    pro: '≤12 PFLOPS',
    enterprise: '≥50 PFLOPS',
  },
  {
    label: 'Network',
    basic: '25G/100G Ethernet',
    pro: '100G RDMA',
    enterprise: '200G/400G Interconnect',
  },
  {
    label: 'Deployment',
    basic: '48–72 hours',
    pro: '48–72 hours',
    enterprise: 'Custom schedule',
  },
  {
    label: 'Scalability',
    basic: 'Single unit, linear scaling',
    pro: 'Up to 100 nodes',
    enterprise: '10,000+ node evolution',
  },
  {
    label: 'Domestic HW Compatible',
    basic: '✓',
    pro: '✓',
    enterprise: '✓',
  },
  {
    label: 'On-Premise Data',
    basic: '✓',
    pro: '✓',
    enterprise: '✓',
  },
  {
    label: 'Reference Price',
    basic: '¥98K / ¥2,000/mo',
    pro: '¥2–5 million',
    enterprise: '¥5 million+',
  },
];

export default function EnProductsPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="section-container text-center">
          <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">
            PRODUCTS
          </p>
          <h1 className="section-title text-gray-900 mb-4">Products</h1>
          <p className="section-subtitle">
            From 1P entry-level computing to enterprise heterogeneous clusters
            <br className="hidden sm:block" />
            WeCalc delivers unified-architecture, tiered solutions for every
            scale of on-premise AI
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/selection" className="btn-primary">
              Help Me Choose
            </Link>
            <Link href="/contact?intent=tco" className="btn-secondary">
              Request Custom Analysis
            </Link>
          </div>
        </div>
      </section>

      {productCatalog.map((product, index) => {
        const guide = PRODUCT_GUIDES[product.slug];
        const en = enProductOverrides[product.slug];
        const metrics = enMetrics[product.slug];
        const specs = enSpecs[product.slug];
        const guideEn = enGuideOverrides[product.slug];

        return (
          <section
            key={product.id}
            id={product.id}
            className={`section-padding ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
          >
            <div className="section-container">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6
                    ${product.featured ? 'bg-brand-100 text-brand-700' : 'bg-gray-100 text-gray-600'}`}
                  >
                    {en.highlight}
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    {en.fullName}
                  </h2>
                  <p className="text-xl text-brand-600 font-medium mb-4">
                    {en.tagline}
                  </p>
                  <p className="text-gray-500 leading-relaxed mb-8">
                    {en.longDescription}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-2xl border border-gray-100 bg-gradient-to-b from-gray-50 to-white p-5"
                      >
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {metric.value}
                        </div>
                        <div className="text-sm text-gray-500">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4 mb-8">
                    {specs.map((spec) => (
                      <div key={spec.label} className="flex items-start gap-3">
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
                        <div>
                          <span className="font-medium text-gray-900">
                            {spec.label}:
                          </span>{' '}
                          <span className="text-gray-600">{spec.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mb-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        Ideal Customer Types
                      </h3>
                      <ul className="space-y-2">
                        {guideEn.customerTypes.map((item) => (
                          <li
                            key={item}
                            className="text-sm text-gray-500"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        Recommended Industries
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {guideEn.recommendedIndustries.map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      href={`/en/products/${product.slug}`}
                      className="btn-primary"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/contact?intent=proposal&product=${product.slug}`}
                      className="btn-secondary"
                    >
                      Get a Proposal
                    </Link>
                    {product.slug === 'wecalc-b' ? (
                      <Link
                        href="/contact?intent=leasing&product=wecalc-b"
                        className="btn-outline"
                      >
                        Apply for Financing Lease
                      </Link>
                    ) : null}
                    <span className="text-2xl font-bold text-gray-900">
                      {en.price}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">{en.priceNote}</p>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={product.image}
                      alt={`${en.name} ${en.subtitle}`}
                      className="w-full"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {en.scenes.map((scene) => (
                      <span
                        key={scene}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {scene}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        Core Value
                      </h3>
                      <ul className="space-y-2">
                        {en.benefits.map((benefit) => (
                          <li
                            key={benefit}
                            className="text-sm text-gray-500 leading-relaxed"
                          >
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        Delivery Model
                      </h3>
                      <ul className="space-y-2">
                        {en.delivery.map((item) => (
                          <li
                            key={item}
                            className="text-sm text-gray-500 leading-relaxed"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">
              FEATURES
            </p>
            <h2 className="section-title text-gray-900">Core Features</h2>
            <p className="section-subtitle">
              From plug-and-play to modular expansion — WeCalc reduces computing
              center delivery complexity to a range that fits real enterprise
              deployments
            </p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {enCoreFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl bg-white border border-gray-100 p-6 card-hover"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-white" id="compare">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">
              COMPARISON
            </p>
            <h2 className="section-title text-gray-900">
              Product Specification Comparison
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                    Specification
                  </th>
                  <th className="text-center py-4 px-6">
                    <div className="text-lg font-bold text-gray-900">
                      WeCalc-B
                    </div>
                    <div className="text-sm text-gray-500">Basic</div>
                  </th>
                  <th className="text-center py-4 px-6 bg-brand-50 rounded-t-2xl">
                    <div className="text-lg font-bold text-brand-600">
                      WeCalc-P
                    </div>
                    <div className="text-sm text-brand-500">Professional</div>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-brand-600 text-white text-xs rounded-full">
                      Recommended
                    </span>
                  </th>
                  <th className="text-center py-4 px-6">
                    <div className="text-lg font-bold text-gray-900">
                      WeCalc-E
                    </div>
                    <div className="text-sm text-gray-500">Enterprise</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {enProductComparison.map((item, i) => (
                  <tr
                    key={item.label}
                    className={i % 2 === 0 ? 'bg-gray-50/50' : ''}
                  >
                    <td className="py-4 px-6 text-sm font-medium text-gray-700">
                      {item.label}
                    </td>
                    <td className="py-4 px-6 text-center text-sm text-gray-600">
                      {item.basic}
                    </td>
                    <td className="py-4 px-6 text-center text-sm text-gray-900 font-medium bg-brand-50">
                      {item.pro}
                    </td>
                    <td className="py-4 px-6 text-center text-sm text-gray-600">
                      {item.enterprise}
                    </td>
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
              <p className="text-sm font-semibold text-brand-300 tracking-widest uppercase mb-3">
                {enFinancingPlan.badge}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                {enFinancingPlan.title}
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                {enFinancingPlan.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/en/products/wecalc-b" className="btn-primary">
                  View WeCalc-B Details
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Inquire About Financing Lease
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-950 text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Find the Right WeCalc Product for You
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Our expert team will recommend the best solution based on your
            actual needs
          </p>
          <Link href="/contact" className="btn-primary text-base px-10 py-4">
            Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
