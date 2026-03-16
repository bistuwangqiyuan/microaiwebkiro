import type { Metadata } from 'next';
import Link from 'next/link';
import { BASE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About WeCalc Technology — The Only Hardware-Accelerated All-Flash Storage Compute Team in China',
  description:
    'WeCalc Technology — the leader in on-premises micro compute centers with data sovereignty. The only team in China achieving compute acceleration through hardware-accelerated all-flash storage. Dual-certified by Huawei Ascend and Kunpeng. Featured on CCTV.',
  alternates: { canonical: `${BASE_URL}/en/about` },
  openGraph: {
    title: 'About WeCalc — Leader in On-Premises Micro Compute Centers',
    description: 'The only team in China achieving compute acceleration through hardware-accelerated all-flash storage. Huawei Ascend + Kunpeng dual-certified.',
    url: `${BASE_URL}/en/about`,
  },
};

const milestones = [
  { year: '2024', title: 'R&D Launch', desc: 'Initiated development of disaggregated storage-compute architecture and EBOF all-flash storage technology' },
  { year: '2025', title: 'Product Validation', desc: 'Completed Huawei benchmark testing; obtained Ascend + Kunpeng dual certification' },
  { year: '2025', title: 'Commercial Deployment', desc: 'Successful deployments at BISTU and Huawei compute centers' },
  { year: '2026', title: 'Nationwide Expansion', desc: 'Launched the WeCalc Business Partnership Program for nationwide rollout' },
];

const values = [
  { title: 'Data Sovereignty', description: 'Unwavering commitment to keeping data on-premises, safeguarding enterprise data ownership and trade secrets' },
  { title: 'Innovation', description: 'Fully proprietary IP, continuously advancing the frontiers of disaggregated storage-compute and all-flash storage technology' },
  { title: 'Universal Computing', description: 'Making AI compute accessible to every enterprise by lowering both the technical and financial barriers to digital transformation' },
  { title: 'Win-Win Ecosystem', description: 'Building an ecosystem of universal compute through our Business Partnership Program, growing together with our partners' },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="section-container text-center">
          <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">ABOUT US</p>
          <h1 className="section-title text-gray-900 mb-4">About WeCalc Technology</h1>
          <p className="section-subtitle">
            The only team in China achieving compute acceleration through hardware-accelerated all-flash storage
          </p>
        </div>
      </section>

      {/* Company Intro with Team Photo */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-gray-500 leading-relaxed mb-4">
                  WeCalc Technology is dedicated to providing enterprises with on-premises micro compute center solutions
                  where data never leaves the premises. We believe data security is the cornerstone of enterprise digital
                  transformation. Through our proprietary disaggregated storage-compute architecture and EBOF all-flash
                  storage technology, we build secure, efficient, and scalable local AI compute platforms for every enterprise.
                </p>
                <p className="text-gray-500 leading-relaxed">
                  Powered by WeCalc technology, with computing resources worth billions provided at no cost.
                  Through an innovative sharing economy model, we make AI compute accessible to every enterprise
                  while keeping data firmly in their own hands.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src="/image/团队照片.jpg" alt="WeCalc Technology team photo" className="w-full" loading="lazy" />
              </div>
            </div>

            {/* Core Values */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Core Values</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {values.map((value) => (
                  <div key={value.title} className="p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-500 border border-transparent hover:border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Team */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Core Team</h2>
              <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
                A technology team composed of senior experts from both academia and industry
              </p>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="rounded-2xl border border-gray-100 overflow-hidden">
                  <img src="/image/孟坤讲座.jpg" alt="Meng Kun presenting at an academic event" className="w-full h-56 object-cover" loading="lazy" />
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-bold text-gray-900">Meng Kun</h3>
                    <p className="text-sm text-brand-600 mb-2">Project Lead</p>
                    <p className="text-sm text-gray-500">Associate Professor at BISTU, senior researcher in storage systems, invited speaker at Huawei Developer Conference</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-gray-100 overflow-hidden">
                  <img src="/image/华为开发者大会讲座19.jpg" alt="Team at Huawei Developer Conference" className="w-full h-56 object-cover" loading="lazy" />
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-bold text-gray-900">Wang Qiyuan</h3>
                    <p className="text-sm text-brand-600 mb-2">Expert Advisor</p>
                    <p className="text-sm text-gray-500">Professor, expert in compute systems and storage architecture, providing in-depth technical guidance for WeCalc</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Dynamics */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Team in Action</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-xl overflow-hidden aspect-square">
                  <img src="/image/团队动态1.png" alt="Team activity" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="rounded-xl overflow-hidden aspect-square">
                  <img src="/image/团队动态2.png" alt="Team discussion" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="rounded-xl overflow-hidden aspect-square">
                  <img src="/image/团队动态3.jpeg" alt="Technical exchange" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="rounded-xl overflow-hidden aspect-square">
                  <img src="/image/团队动态4.jpg" alt="Team building" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
              </div>
            </div>

            {/* Awards */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Awards & Honors</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-500">
                  <img src="/image/获奖174838213.jpg" alt="WeCalc industry innovation award" className="w-full aspect-[4/3] object-cover" loading="lazy" />
                  <div className="p-4 text-center">
                    <p className="font-semibold text-gray-900 text-sm">Industry Innovation Award</p>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-500">
                  <img src="/image/获奖图片19.png" alt="Technology breakthrough award" className="w-full aspect-[4/3] object-cover" loading="lazy" />
                  <div className="p-4 text-center">
                    <p className="font-semibold text-gray-900 text-sm">Technology Breakthrough Award</p>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-500">
                  <img src="/image/图获奖图1.png" alt="Outstanding innovation award" className="w-full aspect-[4/3] object-cover" loading="lazy" />
                  <div className="p-4 text-center">
                    <p className="font-semibold text-gray-900 text-sm">Outstanding Innovation Award</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Events */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Key Events</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="rounded-2xl overflow-hidden border border-gray-100">
                  <img src="/image/华为开发者大会作报告.png" alt="Presenting at Huawei Developer Conference" className="w-full aspect-video object-cover" loading="lazy" />
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2">Huawei Developer Conference</h3>
                    <p className="text-sm text-gray-500">The WeCalc team was invited to present a technical report at the Huawei Developer Conference, showcasing innovations in disaggregated storage-compute architecture</p>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-100">
                  <img src="/image/中央电视台报道.png" alt="CCTV feature report" className="w-full aspect-video object-cover" loading="lazy" />
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2">CCTV Feature Report</h3>
                    <p className="text-sm text-gray-500">China Central Television featured WeCalc Technology, highlighting the innovative concept of on-premises micro compute centers with data sovereignty</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Journey</h2>
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {milestone.year.slice(2)}
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-0.5 flex-1 bg-gray-200 mt-2" />
                      )}
                    </div>
                    <div className="pb-8">
                      <div className="text-sm text-brand-600 font-medium">{milestone.year}</div>
                      <h3 className="text-lg font-bold text-gray-900 mt-1">{milestone.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{milestone.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-gray-50">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Certifications</h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { title: 'Huawei Ascend Certified', desc: 'AI processor compatibility certification', logo: '/image/华为logo.png' },
              { title: 'Huawei Kunpeng Certified', desc: 'General computing platform compatibility certification', logo: '/image/华为鲲鹏logo.png' },
              { title: 'Full GPU Compatibility', desc: 'Compatible with 90%+ of domestic GPUs', logo: null },
            ].map((cert) => (
              <div key={cert.title} className="p-6 bg-white rounded-2xl border border-gray-100">
                <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  {cert.logo ? (
                    <img src={cert.logo} alt={cert.title} className="w-10 h-10 object-contain" loading="lazy" />
                  ) : (
                    <svg className="w-7 h-7 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  )}
                </div>
                <h3 className="font-bold text-gray-900">{cert.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-950 text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join WeCalc, Shape the Future</h2>
          <p className="text-lg text-gray-400 mb-8">Join us in making AI compute universally accessible</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/en/contact" className="btn-primary text-base px-10 py-4">Contact Us</Link>
            <Link href="/en/partnership" className="inline-flex items-center px-10 py-4 text-base font-semibold text-white border-2 border-white/20 rounded-full hover:bg-white/10 transition-all">
              Become a Partner
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
