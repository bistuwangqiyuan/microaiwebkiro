import type { Metadata } from 'next';
import Link from 'next/link';
import { BASE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Case Studies — 6+ Industries Validated · 40–62% TCO Reduction',
  description:
    'WeCalc real-world deployments across 6+ industries including education, manufacturing, healthcare, finance, and autonomous driving. 48–72 hour rapid deployment, 40–62% TCO reduction, 85% resource utilization. Outperforms Huawei in RMB 1.2M same-cost benchmark.',
  alternates: { canonical: `${BASE_URL}/en/case-study` },
  openGraph: {
    title: 'Case Studies | WeCalc',
    description: '6+ industries validated, 40–62% TCO reduction, 48–72h deployment',
    url: `${BASE_URL}/en/case-study`,
  },
};

const heroMetrics = [
  { value: '6+', label: 'Industries Validated' },
  { value: '48–72h', label: 'Average Deployment' },
  { value: '40–62%', label: 'TCO Reduction' },
  { value: '85%', label: 'Resource Utilization' },
] as const;

interface CaseStudy {
  id: string;
  tag: string;
  product: string;
  industry: string;
  customer: string;
  location: string;
  headline: string;
  challenge: string;
  solution: string;
  quote: string;
  quoteAuthor: string;
  metrics: Array<{ value: string; label: string }>;
  highlights: string[];
  image: string;
  accent: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'education',
    tag: 'CASE 01',
    product: 'WeCalc-B',
    industry: 'Education & Research',
    customer: 'Beijing Information Science & Technology University',
    location: 'Beijing',
    headline: 'AI Training Platform for 100+ Students — Built in 72 Hours',
    challenge:
      'The university needed an on-premises teaching and training platform for its AI program, supporting 100+ concurrent model training sessions while keeping all student data within the campus network. Traditional solutions quoted over RMB 800K with a 3-month minimum timeline — exceeding both budget and schedule constraints.',
    solution:
      'Deployed 1 WeCalc-B Basic unit, completing the full process from delivery, racking, networking, to platform readiness within 72 hours. The disaggregated storage-compute architecture enables elastic multi-user resource isolation. A one-click management console lets instructors manage compute allocation without dedicated IT staff.',
    quote:
      'Previously, our students could only run demos on free cloud credits. Now every student can independently train their own models on campus with full data security. One semester in, competition award rates increased by 30%.',
    quoteAuthor: 'Director, Computer Science Lab Center',
    metrics: [
      { value: '72h', label: 'Deployment Time' },
      { value: '100+', label: 'Concurrent Users' },
      { value: '85%', label: 'Resource Utilization' },
      { value: '30%↑', label: 'Student Award Rate Increase' },
    ],
    highlights: [
      'All data stays within the campus intranet, meeting university data security requirements',
      '85% resource utilization, far exceeding the 40% industry average for traditional solutions',
      'Supports PyTorch / TensorFlow and other mainstream frameworks, ready out of the box',
      'Hot-swap expansion of 1 GPU node at semester end with zero downtime',
    ],
    image: '/image/算力中心图17.png',
    accent: 'from-blue-500 to-cyan-400',
  },
  {
    id: 'manufacturing',
    tag: 'CASE 02',
    product: 'WeCalc-B',
    industry: 'Smart Manufacturing',
    customer: 'Auto Parts Manufacturer',
    location: 'Yangtze River Delta',
    headline: 'AI Visual Inspection: Defect Miss Rate from 2.3% to 0.15%',
    challenge:
      'The company produces 8 million precision parts annually. Manual inspection had a 2.3% miss rate, causing over RMB 2M in annual return and claim losses. An attempt to upload inspection images to the cloud was blocked by the security compliance team, as production data contains customer drawings and process parameters.',
    solution:
      'Deployed 1 WeCalc-B at the production edge, running a custom visual inspection model. Industrial cameras capture and infer in real-time on-site — data from capture to verdict never leaves the factory floor. Deployed in 48 hours; model iteration continues through local incremental training.',
    quote:
      'Two months after going live, our customer return rate dropped by 80%, and the inspection team went from 12 people to just 3 for verification. Most critically, not a single production image ever left the factory.',
    quoteAuthor: 'Director of Quality',
    metrics: [
      { value: '0.15%', label: 'Miss Rate (from 2.3%)' },
      { value: '48h', label: 'Deployment Time' },
      { value: '≤50ms', label: 'Per-Part Inspection' },
      { value: 'RMB 2M+', label: 'Annual Loss Reduction' },
    ],
    highlights: [
      'Processes 20+ high-resolution industrial images per second, matching production line takt time',
      'Inspection model undergoes local incremental training, continuously adapting to new product variants',
      'Data never leaves the factory, meeting customer and supply chain security audit requirements',
      'ROI payback in under 3 months with zero ongoing compute fees',
    ],
    image: '/image/算力中心图42.png',
    accent: 'from-orange-500 to-amber-400',
  },
  {
    id: 'medical',
    tag: 'CASE 03',
    product: 'WeCalc-B',
    industry: 'Healthcare',
    customer: 'Provincial Capital Tier-3A Hospital',
    location: 'Central China',
    headline: 'AI-Assisted Imaging: Average Report Time Reduced by 65%',
    challenge:
      'The radiology department processes 400+ CT/MRI scans daily, with each physician reading 80+ cases per day under extreme workload. The hospital explored cloud-based AI diagnostic platforms, but the imaging data contains extensive patient privacy information. The health commission and IT security department explicitly required all data to remain within the hospital network.',
    solution:
      'Deployed 1 WeCalc-B in the hospital data center running NMPA-registered lung nodule screening and fracture detection models. Integrated with the PACS system, images are automatically pushed for local inference, with AI annotations returned to the diagnostic workstation within 30 seconds — all data stays within the hospital.',
    quote:
      'Since deploying WeCalc\'s local AI diagnostics, our average report turnaround dropped from 45 minutes to 16 minutes. Physicians can now focus more energy on complex cases. Most importantly, not a single byte of patient data has ever left the hospital.',
    quoteAuthor: 'Chief of Radiology',
    metrics: [
      { value: '65%', label: 'Report Time Reduction' },
      { value: '400+', label: 'Daily Scans Processed' },
      { value: '30s', label: 'AI Annotation Return' },
      { value: '0', label: 'Data Breach Incidents' },
    ],
    highlights: [
      'Integrated with PACS/HIS systems — images flow automatically with no manual intervention',
      'AI assistance raised lung nodule detection sensitivity to 96%, reducing missed diagnoses',
      'Meets Level-3 security classification and health commission data security regulations — patient data stays on-premises',
      '24/7 unattended operation with 99.9% uptime',
    ],
    image: '/image/算力中心图4.png',
    accent: 'from-emerald-500 to-teal-400',
  },
  {
    id: 'finance',
    tag: 'CASE 04',
    product: 'WeCalc-P',
    industry: 'Financial Technology',
    customer: 'East China City Commercial Bank',
    location: 'East China',
    headline: 'On-Premises Intelligent Risk Control: Real-Time Anti-Fraud ≤80ms',
    challenge:
      'The bank processes 500K+ daily credit card transactions. Its legacy rule engine had a 5% false positive rate, blocking legitimate transactions and generating customer complaints. The banking regulator requires core transaction data and customer information to remain off-cloud, with risk control inference responding within 100ms.',
    solution:
      'Deployed 1 WeCalc-P Professional cluster hosting three AI models: real-time risk control inference, anti-fraud detection, and customer profiling. A 100G RDMA low-latency network ensures high-throughput real-time data ingestion and model inference — all data and models operate within the bank\'s closed network.',
    quote:
      'After deploying WeCalc, our risk control false positive rate dropped from 5% to 1.2%, and customer complaints were cut in half. During regulatory audits, our IT department can confidently say — all customer data stays in-house, not a single record has left.',
    quoteAuthor: 'GM, Information Technology Department',
    metrics: [
      { value: '≤80ms', label: 'Inference Response' },
      { value: '1.2%', label: 'False Positive Rate (from 5%)' },
      { value: '500K+', label: 'Daily Transactions' },
      { value: '50%↓', label: 'Customer Complaint Reduction' },
    ],
    highlights: [
      'All transaction data circulates within the bank\'s closed network, meeting banking regulator data security requirements',
      'Risk control model auto-updates incrementally each week, continuously adapting to new fraud patterns',
      'Single cluster supports 500K+ daily transaction inference with zero peak-time delays',
      'Approximately 45% TCO reduction compared to equivalent self-built solutions',
    ],
    image: '/image/算力中心图2.png',
    accent: 'from-violet-500 to-purple-400',
  },
  {
    id: 'auto-driving',
    tag: 'CASE 05',
    product: 'WeCalc-P',
    industry: 'Autonomous Driving',
    customer: 'L4 Autonomous Driving Technology Company',
    location: 'Beijing',
    headline: 'Local Closed-Loop Data Processing: Model Iteration Cycle Cut by 40%',
    challenge:
      'The company generates over 2TB of daily road-test data (video, point clouds, IMU). Previously, uploading data to public cloud for training was slow, bandwidth-expensive, and involved city road information and pedestrian privacy — creating growing compliance risks.',
    solution:
      'Deployed 2 WeCalc-P Professional units at the R&D center, building an integrated local platform for data annotation, model training, and simulation validation. Road-test data is transmitted via a dedicated link and processed locally — cleaning, annotation, and training happen without cloud upload. EBOF all-flash storage ensures high-speed write and random read for 2TB/day throughput.',
    quote:
      'Data upload alone used to take half a day. Now data starts training the moment it arrives — our model iteration pace is nearly twice as fast. And we no longer need to go back and forth with legal over data security.',
    quoteAuthor: 'Head of Algorithm Platform',
    metrics: [
      { value: '40%', label: 'Iteration Cycle Reduction' },
      { value: '2TB/day', label: 'Data Throughput' },
      { value: '12P', label: 'Local Training Compute' },
      { value: '0', label: 'Cloud Upload Incidents' },
    ],
    highlights: [
      'Full closed-loop for road-test video, point clouds, and IMU data — zero cloud uploads',
      'EBOF all-flash storage delivers high-speed random I/O, accelerating training data loading by 70%',
      'Local simulation and training environments share compute resources, achieving 78% utilization',
      'Meets autonomous driving data security regulations and city road information protection requirements',
    ],
    image: '/image/算力中心图44.png',
    accent: 'from-rose-500 to-pink-400',
  },
  {
    id: 'smart-park',
    tag: 'CASE 06',
    product: 'WeCalc-B',
    industry: 'Smart Park',
    customer: 'National Hi-Tech Zone Management Committee',
    location: 'Central China',
    headline: 'Shared AI Compute for 30+ SMEs in the Park',
    challenge:
      'The hi-tech zone hosts 200+ tech SMEs, with 30+ having clear AI needs (visual inspection, intelligent customer service, data analytics), but individual hardware investment was prohibitively expensive. The management committee aimed to provide public compute services to lower the AI adoption barrier while keeping data within the park.',
    solution:
      'The committee deployed 3 WeCalc-B units in the park data center, using WeCalc\'s management platform for multi-tenant resource isolation and on-demand allocation. 30+ enterprises access shared compute via the park intranet — each company\'s data and models are fully isolated, billed by actual usage. The committee offers compute as a public service, dramatically lowering AI adoption costs.',
    quote:
      'Previously, park enterprises had to either use the cloud or buy their own hardware for AI. Now with shared compute services, a company can run its own models for just a few hundred RMB per month. This is truly universal computing.',
    quoteAuthor: 'Director, Digital Economy Development Center',
    metrics: [
      { value: '30+', label: 'Enterprises Served' },
      { value: '3 Units', label: 'WeCalc-B Deployed' },
      { value: '90%↓', label: 'Enterprise Startup Cost' },
      { value: 'In-Park', label: 'Data Sovereignty' },
    ],
    highlights: [
      'Multi-tenant isolation — data from 30+ enterprises is mutually invisible with independent security domains',
      'On-demand elastic compute allocation with auto-scheduling during peak hours, 82% utilization',
      'Compute services attract hi-tech companies, enhancing the park\'s competitive advantage for business attraction',
      'Builds local industrial data assets within the park, supporting future industry brain initiatives',
    ],
    image: '/image/算力中心图43.png',
    accent: 'from-sky-500 to-indigo-400',
  },
];

const comparisonData = {
  title: 'WeCalc TCO Comparison Overview',
  subtitle: 'Based on appendix H calculations from the WeCalc Business Plan and actual deployment data',
  rows: [
    {
      scenario: '1E Compute Build-Out',
      traditional: 'RMB 355–380M',
      wecalc: 'RMB 140–185M',
      saving: '58–62%',
      cycle: '6–18 months → 2–4 weeks',
    },
    {
      scenario: '1P Video Gen AI (Purchase)',
      traditional: 'RMB 960K–1.44M',
      wecalc: 'RMB 122K (purchase)',
      saving: '87–92%',
      cycle: '2–4 weeks → 48–72 hours',
    },
    {
      scenario: '1P Video Gen AI (Lease)',
      traditional: '~RMB 1.05M (cloud)',
      wecalc: 'RMB 72K (lease)',
      saving: '93%',
      cycle: 'Instant → 48–72 hours',
    },
  ],
};

const costDrivers = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0l4.179 2.25-4.179 2.25m0 0L12 17.25l-5.571-3m11.142 0l4.179 2.25L12 21.75l-9.75-5.25 4.179-2.25" />
      </svg>
    ),
    title: 'Disaggregated Architecture',
    description: 'Compute and storage scale independently on demand. Adding nodes delivers linear growth in both compute and storage — no more full-rack stacking.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    title: 'EBOF All-Flash Storage',
    description: 'Hardware-accelerated NVMe-oF all-flash storage with EC erasure coding cuts storage costs by 40%+, with 20% redundancy overhead far below traditional RAID.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: '80%+ Resource Utilization',
    description: 'Traditional solutions average only 40%. WeCalc\'s elastic scheduling and disaggregated architecture push utilization above 80%, halving hardware investment for the same workload.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Financing Lease Option',
    description: 'WeCalc-B financing lease starts at just RMB 2,000/month — 3-year TCO of approximately RMB 72K lets SMEs access local AI compute with near-zero upfront cost.',
  },
];

export default function CaseStudyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-950 text-white pt-32 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(96,165,250,0.2),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.15),transparent_50%)]" />
        <div className="section-container relative z-10">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold text-brand-300 tracking-widest uppercase mb-4">CUSTOMER STORIES</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
              Data Stays On-Premises<br className="hidden sm:block" />
              Compute Arrives Instantly
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-3xl">
              From university training to industrial inspection, from medical imaging to financial risk control — see how WeCalc delivers 48-hour deployment, 40–62% TCO reduction, and full on-premises data processing across industries.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/en/contact?intent=case-consult" className="btn-primary">Get Your Industry Solution</Link>
              <Link href="/en/products" className="inline-flex items-center px-8 py-3.5 text-sm font-semibold text-white border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300">
                View Product Specs
              </Link>
            </div>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {heroMetrics.map((m) => (
              <div key={m.label} className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                <div className="text-3xl font-bold mb-2">{m.value}</div>
                <div className="text-sm text-white/60">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      {caseStudies.map((cs, idx) => (
        <section key={cs.id} id={cs.id} className={`section-padding ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="section-container">
            <div className="mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase">{cs.tag}</p>
                <span className="text-xs font-medium text-gray-400">·</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-50 text-xs font-semibold text-brand-700">{cs.product}</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-xs font-semibold text-gray-600">{cs.industry}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-2">
                {cs.headline}
              </h2>
              <p className="text-base text-gray-500">{cs.customer} · {cs.location}</p>
            </div>

            <div className="grid lg:grid-cols-[1fr,0.85fr] gap-10 items-start">
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Challenge</h3>
                  <p className="text-gray-600 leading-relaxed">{cs.challenge}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Solution</h3>
                  <p className="text-gray-600 leading-relaxed">{cs.solution}</p>
                </div>

                <div className="relative rounded-2xl bg-gray-50 border border-gray-100 p-6 lg:p-8">
                  <svg className="absolute top-5 left-6 w-8 h-8 text-brand-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                  </svg>
                  <p className="text-gray-700 leading-relaxed italic pl-2 pt-6">{cs.quote}</p>
                  <p className="mt-4 text-sm font-semibold text-gray-500 pl-2">— {cs.quoteAuthor}, {cs.customer}</p>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Highlights</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {cs.highlights.map((h) => (
                      <div key={h} className="flex items-start gap-2.5">
                        <svg className="w-4 h-4 text-brand-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-600 leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={cs.image}
                    alt={`${cs.customer} WeCalc deployment`}
                    className="w-full aspect-[4/3] object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {cs.metrics.map((m) => (
                    <div key={m.label} className="rounded-2xl border border-gray-200 bg-white p-5">
                      <div className="text-2xl font-bold text-gray-900 mb-1">{m.value}</div>
                      <div className="text-xs text-gray-500">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* TCO Comparison Table */}
      <section className="section-padding bg-brand-950 text-white">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-brand-300 tracking-widest uppercase mb-3">TCO COMPARISON</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">{comparisonData.title}</h2>
            <p className="text-white/60">{comparisonData.subtitle}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-white/80">Scenario</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-white/80">Traditional / Public Cloud</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-brand-300">WeCalc Solution</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-white/80">TCO Savings</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-white/80">Timeline Comparison</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.rows.map((row, i) => (
                    <tr key={row.scenario} className={i < comparisonData.rows.length - 1 ? 'border-b border-white/5' : ''}>
                      <td className="px-6 py-4 text-sm font-medium text-white">{row.scenario}</td>
                      <td className="px-6 py-4 text-sm text-white/60">{row.traditional}</td>
                      <td className="px-6 py-4 text-sm text-brand-300 font-semibold">{row.wecalc}</td>
                      <td className="px-6 py-4 text-sm font-bold text-emerald-400">{row.saving}</td>
                      <td className="px-6 py-4 text-sm text-white/60">{row.cycle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Saves */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">WHY IT SAVES</p>
            <h2 className="section-title text-gray-900">Why WeCalc Delivers Significant Cost Savings</h2>
            <p className="section-subtitle">
              Cost reduction isn&apos;t just about lower purchase prices — it comes from systematic optimization across architecture, delivery, utilization, and operational efficiency
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {costDrivers.map((item) => (
              <div key={item.title} className="rounded-3xl bg-white border border-gray-100 p-7 card-hover group">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5 group-hover:bg-brand-100 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="rounded-[2rem] bg-brand-950 text-white p-10 sm:p-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get Your Custom Cost-Saving Plan</h2>
            <p className="text-lg text-white/65 mb-8 max-w-3xl mx-auto">
              Whether you&apos;re a university, manufacturer, hospital, or financial institution, we can provide a practical cost analysis and deployment plan based on your specific business scenario, data scale, and compliance requirements.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/en/contact?intent=case-consult" className="btn-primary text-base px-10 py-4">
                Consult Industry Cases
              </Link>
              <Link href="/en/selection" className="inline-flex items-center px-10 py-4 text-sm font-semibold text-white border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300">
                Online Product Selection
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
