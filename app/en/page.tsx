import type { Metadata } from 'next';
import Link from 'next/link';
import { productCatalog } from '@/lib/product-catalog';
import { HOME_SALES_SHORTCUTS } from '@/lib/sales';
import { BASE_URL, generateBreadcrumbJsonLd, generateFAQJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title:
    'WeCalc Technology — On-Premise Micro Computing Centers | Disaggregated Storage-Compute · EBOF All-Flash',
  description:
    'WeCalc provides on-premise micro computing center solutions including Basic (from ¥98K), Professional, and Enterprise editions. Built on disaggregated storage-compute architecture and EBOF all-flash storage. Financing lease from ¥2,000/month. 48–72 hour turnkey delivery. Huawei Ascend + Kunpeng dual-certified.',
  alternates: {
    canonical: `${BASE_URL}/en`,
  },
  openGraph: {
    title: 'WeCalc Technology — On-Premise Micro Computing Centers',
    description:
      'Built on disaggregated storage-compute architecture and EBOF all-flash storage. Financing lease from ¥2,000/month. Huawei Ascend + Kunpeng dual-certified.',
    url: `${BASE_URL}/en`,
    images: [
      {
        url: '/image/微算产品架构图40829.png',
        width: 1200,
        height: 630,
        alt: 'WeCalc micro computing center product architecture',
      },
    ],
  },
};

const stats = [
  { value: '≥60%', label: 'System Response Efficiency Boost' },
  { value: '≥40%', label: 'Total Cost of Ownership Reduction' },
  { value: '90%', label: 'Resource Scaling Cycle Shortened' },
  { value: '99.9999%', label: 'Data Reliability' },
];

const enProducts = productCatalog.map((p) => {
  const overrides: Record<
    string,
    {
      name: string;
      subtitle: string;
      description: string;
      highlight: string;
      quickSpecs: string[];
      price: string;
      priceNote: string;
    }
  > = {
    'wecalc-b': {
      name: 'WeCalc-B',
      subtitle: 'Basic',
      description:
        'Designed for small-scale AI inference, data analytics, and training labs. A single unit delivers complete computing capability.',
      highlight: 'Best 1P Starter',
      quickSpecs: [
        '1× General CPU + Optional GPU',
        '4TB NVMe SSD',
        'Up to 1 PFLOPS',
        '25G/100G Ethernet',
      ],
      price: '¥98,000',
      priceNote: 'Lease from ¥2,000/month',
    },
    'wecalc-p': {
      name: 'WeCalc-P',
      subtitle: 'Professional',
      description:
        'For mid-scale AI training & inference and industrial edge computing. The go-to production-grade model.',
      highlight: 'Production Workhorse',
      quickSpecs: [
        'Multi-CPU + Multi-GPU Cluster',
        '16×3.84TB NVMe SSD',
        'Up to 12 PFLOPS',
        '100G RDMA Interconnect',
      ],
      price: '¥2–5M',
      priceNote: 'Most popular production solution',
    },
    'wecalc-e': {
      name: 'WeCalc-E',
      subtitle: 'Enterprise',
      description:
        'Built for large-scale model training and HPC with PB-level storage and 200G/400G high-speed interconnect.',
      highlight: 'Flagship Custom Solution',
      quickSpecs: [
        'Multi-Node Heterogeneous Cluster',
        'PB-level Distributed Storage',
        '50+ PFLOPS',
        '200G/400G Interconnect',
      ],
      price: '¥5M+',
      priceNote: 'Custom delivery by scale',
    },
  };
  const o = overrides[p.slug];
  return { ...p, ...o, href: `/en/products/${p.slug}` };
});

const techFeatures = [
  {
    title: 'Disaggregated Storage-Compute',
    description:
      'NVMe-oF protocol fully decouples compute and storage at the physical level. RoCEv2 high-speed interconnect eliminates TCP/IP congestion bottlenecks.',
    metrics: 'Latency ≤100μs | Cluster Bandwidth ≥100Gbps',
    image: '/image/微算技术架构图1.png',
  },
  {
    title: 'EBOF All-Flash Storage',
    description:
      'PCIe Gen5 gateway-free distributed storage pool. 8+2 erasure coding achieves high-grade data protection with only 20% redundancy overhead.',
    metrics: 'IOPS ≥1M | Bandwidth ≥56GB/s',
    image: '/image/微算技术架构图5.png',
  },
  {
    title: 'On-Premise Data Sovereignty',
    description:
      "The system is deployed inside the customer\u2019s premises. All data stays on your own devices \u2014 never uploaded to the cloud \u2014 ensuring data sovereignty from the ground up.",
    metrics: 'Zero Leak Risk | Full Compliance',
    image: '/image/算力中心照片3.jpg',
  },
];

const enFinancingPlan = {
  badge: 'Financing Lease',
  title: 'Starting from just ¥2,000/month for 1P of computing power',
  description:
    'Equivalent to approximately ¥40,000 in ChatGPT token credits — ideal for enterprises and institutions looking to adopt local AI capabilities with minimal upfront investment.',
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

const enValidationHighlights = [
  { value: '72%', label: 'Data Loading Time Reduced' },
  { value: '64%', label: 'Throughput Increased' },
  { value: '64%', label: 'Memory Usage Reduced' },
  { value: '30%+', label: 'Three-Year TCO Saved' },
];

const enSalesShortcuts = HOME_SALES_SHORTCUTS.map((item, i) => {
  const en = [
    {
      title: "I'm in Manufacturing",
      description:
        'AI quality inspection, predictive maintenance, and edge inference deployment',
    },
    {
      title: "I'm in Education",
      description:
        'Quickly set up AI teaching, training, and research platforms',
    },
    {
      title: "I'm in Healthcare",
      description:
        'On-premise data sovereignty and medical imaging inference scenarios',
    },
    {
      title: 'I Want to Be a Partner',
      description:
        'Submit a regional partnership application with automated pre-screening',
    },
  ][i];
  return { ...item, ...en };
});

const news = [
  {
    title: 'WeCalc Team Showcases at Huawei Developer Conference',
    summary:
      'The WeCalc core team was invited to the Huawei Developer Conference to demonstrate the latest advances in disaggregated storage-compute architecture and EBOF all-flash storage technology.',
    date: '2026-02-15',
    category: 'Company News',
    image: '/image/华为开发者大会作报告.png',
  },
  {
    title: 'CCTV Reports on WeCalc Innovation',
    summary:
      "China Central Television featured WeCalc\u2019s technological breakthroughs in micro computing centers, highlighting the on-premise data sovereignty concept.",
    date: '2026-01-20',
    category: 'Media Coverage',
    image: '/image/中央电视台报道.png',
  },
  {
    title: 'WeCalc Wins Industry Innovation Award',
    summary:
      'WeCalc earned a prestigious industry innovation award for its proprietary disaggregated storage-compute technology.',
    date: '2026-01-10',
    category: 'Company News',
    image: '/image/获奖图片19.png',
  },
];

const EN_HOME_FAQS = [
  {
    question: 'What is a micro computing center?',
    answer:
      "A micro computing center is an integrated hardware-software on-premise AI computing solution by WeCalc. It combines compute, storage, and management in one system. All data stays on the user\u2019s own devices \u2014 never uploaded to the cloud \u2014 fundamentally guaranteeing data sovereignty and security.",
  },
  {
    question:
      "What are the advantages of WeCalc\u2019s disaggregated storage-compute architecture?",
    answer:
      "WeCalc\u2019s disaggregated storage-compute architecture uses the NVMe-oF protocol to fully decouple compute and storage at the physical level. RoCEv2 high-speed interconnect eliminates TCP/IP congestion bottlenecks, delivering latency \u2264100\u03BCs and cluster bandwidth \u2265100Gbps. Compared to traditional solutions, data loading time is reduced by 72% and throughput increased by 64%.",
  },
  {
    question: 'What product editions does WeCalc offer?',
    answer:
      'WeCalc offers three editions: WeCalc-B Basic (from ¥98,000, 1P entry-level), WeCalc-P Professional (¥2–5 million, 12 PFLOPS production-grade workhorse), and WeCalc-E Enterprise (¥5 million+, 50+ PFLOPS flagship custom solution). A financing lease model is available starting from ¥2,000/month.',
  },
  {
    question: 'What does "on-premise data sovereignty" mean?',
    answer:
      "On-premise data sovereignty means the system is deployed inside the customer\u2019s facility, and all data is stored on their own devices \u2014 never uploaded to public cloud or third-party servers. This fundamentally ensures data ownership with zero leak risk and full regulatory compliance.",
  },
  {
    question: 'How long does deployment take?',
    answer:
      'WeCalc products ship with integrated hardware and software, offering turnkey delivery. The Basic and Professional editions typically deploy in 48–72 hours. The Enterprise edition follows a custom delivery timeline based on scale and industry requirements.',
  },
  {
    question: 'Which hardware platforms does WeCalc support?',
    answer:
      'WeCalc is dual-certified by Huawei Ascend and Kunpeng and is compatible with over 90% of domestic GPUs. It supports flexible integration of CPUs, GPUs, SSDs, and other hardware, including NVIDIA and Cambricon computing platforms.',
  },
];

const homeBreadcrumb = generateBreadcrumbJsonLd([
  { name: 'Home', url: `${BASE_URL}/en` },
]);

const faqJsonLd = generateFAQJsonLd(EN_HOME_FAQS);

export default function EnHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/image/算力中心图44.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f172a]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>

        <div className="section-container relative z-10 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              The only team in China accelerating compute through hardware-accelerated all-flash storage
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
              On-Premise
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300">
                Micro Computing Centers
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Your data stays on YOUR devices — never uploaded to the cloud.
              <br className="hidden sm:block" />
              Built on disaggregated storage-compute architecture
              <br className="hidden sm:block" />
              and EBOF all-flash storage for secure, efficient, scalable local AI.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/selection"
                className="btn-primary text-base px-10 py-4"
              >
                3 questions, 1 minute — find your ideal WeCalc
                <svg
                  className="w-4 h-4 ml-2"
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
              <Link
                href="/contact?intent=tco"
                className="inline-flex items-center px-10 py-4 text-base font-semibold text-white border-2 border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Request a Custom TCO Analysis
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-white/50">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2.5 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
            <div>
              <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">
                AI SALES
              </p>
              <h2 className="section-title text-gray-900">
                Our Website Already Doubles as a Sales Channel
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-500">
                From intelligent product selection and financing lease pilots to
                TCO analysis and partner pre-screening — visitors can complete
                their first round of evaluation and lead capture without needing
                a sales rep.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/selection" className="btn-primary">
                  Try Product Selection
                </Link>
                <Link href="/contact?intent=pilot" className="btn-secondary">
                  Apply for a Pilot
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {enSalesShortcuts.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-3xl border border-gray-100 bg-gray-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                >
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-[1.05fr,1.2fr] gap-12 items-start">
            <div>
              <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">
                PRODUCT OVERVIEW
              </p>
              <h2 className="section-title text-gray-900">
                Integrated Hardware-Software Scalable Micro Computing Centers
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed mt-6">
                WeCalc integrates compute, storage, and management into a single
                system, following the philosophy of &ldquo;minimum viable, linear
                scaling, infinite possibilities&rdquo; — helping enterprises
                start fast with a single unit and evolve smoothly to
                production-grade clusters.
              </p>
              <div className="mt-8 rounded-3xl bg-brand-950 text-white p-8 shadow-2xl shadow-brand-900/10">
                <p className="text-sm font-semibold text-brand-300 mb-3">
                  {enFinancingPlan.badge}
                </p>
                <h3 className="text-2xl font-bold mb-3">
                  {enFinancingPlan.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {enFinancingPlan.description}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {enCoreFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-6 card-hover"
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
        </div>
      </section>

      {/* Products Section */}
      <section className="section-padding bg-white" id="products">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">
              PRODUCTS
            </p>
            <h2 className="section-title text-gray-900">Product Lineup</h2>
            <p className="section-subtitle">
              From a single unit to clusters of thousands — covering everything
              from teaching labs to large-scale model training
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {enProducts.map((product) => (
              <Link
                key={product.name}
                href={product.href}
                className={`relative group rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2
                  ${
                    product.featured
                      ? 'bg-gradient-to-b from-brand-950 to-gray-900 text-white shadow-2xl shadow-brand-900/20 ring-1 ring-brand-500/20'
                      : 'bg-gray-50 hover:bg-white hover:shadow-xl border border-gray-100'
                  }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={`${product.name} ${product.subtitle}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className={`absolute inset-0 ${product.featured ? 'bg-brand-950/60' : 'bg-gray-900/30'}`}
                  />
                  {product.highlight && (
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold
                      ${product.featured ? 'bg-brand-500 text-white' : 'bg-white text-brand-600'}`}
                    >
                      {product.highlight}
                    </span>
                  )}
                </div>

                <div className="p-8">
                  <h3
                    className={`text-2xl font-bold mb-1 ${product.featured ? 'text-white' : 'text-gray-900'}`}
                  >
                    {product.name}
                  </h3>
                  <p
                    className={`text-sm mb-4 ${product.featured ? 'text-brand-300' : 'text-brand-600'}`}
                  >
                    {product.subtitle}
                  </p>
                  <p
                    className={`text-sm mb-6 leading-relaxed ${product.featured ? 'text-gray-300' : 'text-gray-500'}`}
                  >
                    {product.description}
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    {product.quickSpecs.map((spec) => (
                      <li
                        key={spec}
                        className={`flex items-center gap-2.5 text-sm ${product.featured ? 'text-gray-300' : 'text-gray-600'}`}
                      >
                        <svg
                          className={`w-4 h-4 flex-shrink-0 ${product.featured ? 'text-brand-400' : 'text-brand-500'}`}
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
                        {spec}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Reference Price</p>
                      <p
                        className={`text-lg font-bold ${product.featured ? 'text-white' : 'text-gray-900'}`}
                      >
                        {product.price}
                      </p>
                      <p
                        className={`text-xs mt-1 ${product.featured ? 'text-brand-200' : 'text-gray-500'}`}
                      >
                        {product.priceNote}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform
                      ${product.featured ? 'text-brand-300' : 'text-brand-600'}`}
                    >
                      Learn More
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
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="section-padding bg-gray-50 dot-pattern" id="technology">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">
              TECHNOLOGY
            </p>
            <h2 className="section-title text-gray-900">
              Two Core Technologies
            </h2>
            <p className="section-subtitle">
              The only known team in China accelerating compute through
              hardware-accelerated all-flash storage
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {techFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </div>
                <div className="p-8 -mt-8 relative">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <div className="px-3 py-2 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-brand-600">
                      {feature.metrics}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/technology" className="btn-secondary">
              Explore the Technology Architecture
              <svg
                className="w-4 h-4 ml-2"
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
        </div>
      </section>

      {/* Validation Section */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">
                VERIFIED
              </p>
              <h2 className="section-title text-gray-900 mb-6">
                Verified Outstanding Performance
              </h2>
              <p className="text-gray-500 mb-8">
                Huawei benchmark at equivalent ¥1.2M cost — outperforming
                traditional solutions across the board
              </p>
              <div className="grid grid-cols-2 gap-6">
                {enValidationHighlights.map((item) => (
                  <div
                    key={item.label}
                    className="text-center p-6 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-100"
                  >
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {item.value}
                    </div>
                    <div className="text-sm text-gray-500">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/case-study" className="btn-secondary">
                  View Case Studies
                </Link>
                <Link href="/contact" className="btn-outline">
                  Get Custom Analysis
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/image/微算产品架构图40829.png"
                alt="WeCalc product architecture"
                className="rounded-2xl shadow-xl w-full"
                loading="lazy"
              />
              <img
                src="/image/图片1.png"
                alt="WeCalc technology detail"
                className="absolute -bottom-6 -left-6 w-1/3 rounded-xl shadow-lg border-4 border-white"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Business Model Section */}
      <section className="section-padding bg-brand-950 text-white overflow-hidden relative">
        <div className="absolute inset-0">
          <img
            src="/image/算力中心图43.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
        </div>

        <div className="section-container relative z-10">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-400 tracking-widest uppercase mb-3">
              BUSINESS MODEL
            </p>
            <h2 className="section-title">
              Shared WeCalc
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 ml-2">
                Business Model
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-4">
              Inspired by the sharing economy, transforming computing power from
              heavy-asset purchases into lightweight shared services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Lightweight Start',
                description:
                  'Launch quickly with a pilot deployment or a ¥2,000/month financing lease to gain 1P of on-premise computing power.',
              },
              {
                step: '02',
                title: 'On-Premise Delivery',
                description:
                  '48–72 hour turnkey deployment. Data stays on local devices — more secure, more compliant.',
              },
              {
                step: '03',
                title: 'Linear Scaling',
                description:
                  'From a single unit to multi-node clusters, compute and storage grow smoothly with business demand.',
              },
              {
                step: '04',
                title: 'Sustained Operations',
                description:
                  'Combining partner networks, O&M support, and upgrade services to build a long-term sustainable computing infrastructure.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <span className="text-5xl font-black text-white/5 absolute top-4 right-4">
                  {item.step}
                </span>
                <div className="relative">
                  <div className="text-sm font-bold text-brand-400 mb-3">
                    Step {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/partnership" className="btn-primary">
              Become a Business Partner
              <svg
                className="w-4 h-4 ml-2"
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
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="section-container">
          <p className="text-center text-sm font-medium text-gray-400 uppercase tracking-widest mb-10">
            Partners &amp; Clients
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            <img
              src="/image/华为logo.png"
              alt="Huawei"
              className="h-10 md:h-12 object-contain opacity-60 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
            <img
              src="/image/华为鲲鹏logo.png"
              alt="Huawei Kunpeng"
              className="h-10 md:h-12 object-contain opacity-60 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
            <img
              src="/image/北京大学logo.jpg"
              alt="Beijing Information Science & Technology University"
              className="h-10 md:h-12 object-contain opacity-60 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
            <div className="text-lg font-semibold text-gray-300 hover:text-gray-500 transition-colors">
              China Mobile
            </div>
            <div className="text-lg font-semibold text-gray-300 hover:text-gray-500 transition-colors">
              Cambricon
            </div>
            <div className="text-lg font-semibold text-gray-300 hover:text-gray-500 transition-colors">
              NVIDIA
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">
                NEWS
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Latest News
              </h2>
            </div>
            <Link
              href="/news"
              className="hidden sm:inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
            >
              View All
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
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {news.map((item) => (
              <article
                key={item.title}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {item.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className="section-padding bg-white"
        id="faq"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">
              FAQ
            </p>
            <h2 className="section-title text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="section-subtitle">
              Common questions about WeCalc Technology and micro computing
              centers
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {EN_HOME_FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none font-semibold text-gray-900 hover:bg-white transition-colors">
                  <span itemProp="name">{faq.question}</span>
                  <svg
                    className="w-5 h-5 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div
                  className="px-6 pb-6 text-sm text-gray-600 leading-relaxed"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p itemProp="text">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white mesh-gradient">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title text-gray-900 mb-6">
              Start Your AI Computing Journey
            </h2>
            <p className="text-lg text-gray-500 mb-10 leading-relaxed">
              WeCalc provides on-premise micro computing center solutions.
              <br />
              With financing lease, get started for just ¥2,000/month and enjoy
              1P of computing power.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="btn-primary text-base px-10 py-4"
              >
                Free Consultation
              </Link>
              <Link
                href="/partnership"
                className="btn-outline text-base px-10 py-4"
              >
                Become a Partner
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
