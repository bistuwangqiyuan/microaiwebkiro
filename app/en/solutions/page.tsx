import type { Metadata } from 'next';
import Link from 'next/link';
import { BASE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Industry Solutions — Finance · Healthcare · Education · Manufacturing · Government',
  description:
    'WeCalc industry solutions: covering financial risk control, medical imaging, education & training, smart manufacturing, government security, and more. On-premises AI compute with data sovereignty. 40%+ TCO reduction, 48–72 hour rapid deployment.',
  alternates: { canonical: `${BASE_URL}/en/solutions` },
  openGraph: {
    title: 'Industry Solutions | WeCalc',
    description: 'On-premises AI compute with data sovereignty for finance, healthcare, education, manufacturing, and government',
    url: `${BASE_URL}/en/solutions`,
  },
};

const solutions = [
  {
    industry: 'Finance',
    description: 'Meet financial data localization compliance requirements while powering real-time risk control inference, anti-fraud detection, and robo-advisory AI applications.',
    benefits: ['Data sovereignty — full regulatory compliance', 'Millisecond-level risk control inference', 'Zero risk of sensitive data leakage', '40% infrastructure cost reduction'],
    cases: 'Banks, securities firms, insurance companies',
    image: '/image/算力中心图2.png',
  },
  {
    industry: 'Healthcare',
    description: 'AI-assisted diagnosis for medical imaging, pathology analysis, and pharmaceutical R&D — all patient data processed entirely on-premises.',
    benefits: ['Patient data never leaves the hospital', 'CT/MRI AI-assisted diagnosis', 'Drug molecule simulation computing', 'Edge computing for telemedicine'],
    cases: 'Tier-3A hospitals, medical imaging centers, pharmaceutical companies',
    image: '/image/算力中心图4.png',
  },
  {
    industry: 'Education & Research',
    description: 'University AI teaching and training platforms with research computing — supports 100+ concurrent users, out-of-the-box rapid deployment.',
    benefits: ['100+ concurrent training sessions', '48-hour rapid deployment', '30% improvement in student awards', '85% resource utilization'],
    cases: 'Beijing Information Science & Technology University and other universities',
    image: '/image/算力中心图17.png',
  },
  {
    industry: 'Smart Manufacturing',
    description: 'Visual quality inspection, predictive maintenance, digital twins, and more — edge-side real-time inference keeps production lines running without interruption.',
    benefits: ['Edge-side real-time inference on the production line', 'Millisecond-level inspection response', 'Predictive maintenance reduces downtime', 'Production data never leaves the factory'],
    cases: 'Automotive, electronics, precision manufacturing',
    image: '/image/算力中心图42.png',
  },
  {
    industry: 'Government Services',
    description: 'On-premises government data processing and smart city edge computing, meeting classified data protection requirements.',
    benefits: ['Meets Level-3 security classification', 'Government data stays in the government cloud', 'Smart city edge nodes', 'Secure multi-department data sharing'],
    cases: 'Government agencies, smart city projects',
    image: '/image/算力中心图43.png',
  },
  {
    industry: 'Autonomous Driving',
    description: 'Model training, road-test data processing, and V2X edge computing — high-speed local processing of massive datasets.',
    benefits: ['Rapid local processing of road-test data', 'Large-scale model training support', 'Low-latency V2X edge computing', 'Data sovereignty compliance'],
    cases: 'Autonomous driving companies, automotive R&D centers',
    image: '/image/算力中心图44.png',
  },
];

export default function SolutionsPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="section-container text-center">
          <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">SOLUTIONS</p>
          <h1 className="section-title text-gray-900 mb-4">Industry Solutions</h1>
          <p className="section-subtitle">
            WeCalc delivers on-premises AI compute with full data sovereignty across industries
            <br className="hidden sm:block" />
            Precisely matched to each scenario&apos;s computing requirements
          </p>
        </div>
      </section>

      {/* Computing Center Showcase */}
      <section className="pb-12 bg-white">
        <div className="section-container">
          <div className="relative rounded-2xl overflow-hidden">
            <img src="/image/算力中心照片3.jpg" alt="WeCalc micro compute center" className="w-full h-64 md:h-96 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950/80 to-transparent flex items-center">
              <div className="p-8 md:p-12 max-w-lg">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Micro Compute Center in Action</h2>
                <p className="text-white/80 text-sm md:text-base">Deploy in 48–72 hours and start your on-premises AI compute service immediately</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="space-y-16">
            {solutions.map((solution, index) => (
              <div key={solution.industry} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{solution.industry}</h3>
                  <p className="text-gray-500 leading-relaxed mb-6">{solution.description}</p>
                  <ul className="space-y-2.5 mb-6">
                    {solution.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400">Typical Customers</p>
                    <p className="text-sm font-medium text-gray-700 mt-1">{solution.cases}</p>
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img src={solution.image} alt={`${solution.industry} compute center`} className="w-full aspect-[4/3] object-cover" loading="lazy" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-950 text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Customize Your Industry Solution</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Every industry has unique computing requirements — our solutions team will tailor a plan specifically for you
          </p>
          <Link href="/en/contact" className="btn-primary text-base px-10 py-4">Request a Consultation</Link>
        </div>
      </section>
    </>
  );
}
