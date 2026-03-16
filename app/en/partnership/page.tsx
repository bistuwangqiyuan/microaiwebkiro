import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import PartnershipApplicationForm from '@/components/sales/PartnershipApplicationForm';
import { BASE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Business Partnership — Zero Franchise Fee · 100 Free Units · Shared Equity Upside',
  description:
    'WeCalc Business Partnership Program: Zero franchise fee to enter the AI compute industry. Receive 100 free WeCalc units (worth over RMB 100M), equity incentives in a pre-IPO entity, and exclusive regional operation rights. Full technical training and ongoing support.',
  alternates: { canonical: `${BASE_URL}/en/partnership` },
  openGraph: {
    title: 'Business Partnership Program | WeCalc',
    description: 'Zero franchise fee, 100 free units, shared equity upside',
    url: `${BASE_URL}/en/partnership`,
  },
};

const benefits = [
  { title: 'Zero Franchise Fee', description: 'No franchise fees whatsoever — zero-barrier entry into the AI compute industry', icon: '💰' },
  { title: 'Free Equipment', description: 'Receive 100 free WeCalc units, backed by over RMB 100M worth of compute power', icon: '🖥️' },
  { title: 'Regional Exclusivity', description: 'Exclusive rights to operate in your region, expandable to provincial or national scope', icon: '🗺️' },
  { title: 'Equity Incentives', description: 'Receive shares (options or equity) in the pre-IPO entity and share in the upside', icon: '📈' },
  { title: 'Technical Support', description: 'Comprehensive technical training and ongoing support from headquarters', icon: '🛠️' },
  { title: 'Brand Empowerment', description: 'Leverage WeCalc brand resources and market influence to accelerate your growth', icon: '🏆' },
];

const steps = [
  { step: '01', title: 'Submit Application', desc: 'Fill out the partnership application with your basic information and target region' },
  { step: '02', title: 'Qualification Review', desc: 'Our team reviews your application and confirms mutual partnership intent' },
  { step: '03', title: 'Sign Agreement', desc: 'Formalize the partnership with a clear agreement on rights and obligations' },
  { step: '04', title: 'Training & Onboarding', desc: 'Complete comprehensive product, technical, and go-to-market training' },
  { step: '05', title: 'Equipment Delivery', desc: 'Receive free WeCalc units and begin regional operations' },
  { step: '06', title: 'Revenue Generation', desc: 'Generate recurring revenue through compute services and share in growth dividends' },
];

export default function PartnershipPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 text-white overflow-hidden">
        <img src="/image/算力中心图42.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="section-container relative z-10 text-center">
          <p className="text-sm font-semibold text-blue-300 tracking-widest uppercase mb-3">PARTNERSHIP</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            WeCalc
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300">
              Business Partnership
            </span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            Enter the AI industry with zero franchise fees and 100 free WeCalc units
            <br />
            Become an AI-era entrepreneur and share in future IPO upside
          </p>
          <Link href="#partner-form" className="btn-primary text-base px-10 py-4">Submit Regional Partnership Application</Link>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">BENEFITS</p>
            <h2 className="section-title text-gray-900">Partner Benefits</h2>
            <p className="section-subtitle">Six key benefits to help partners succeed quickly</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border border-transparent hover:border-gray-100">
                <div className="text-4xl mb-5">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">REVENUE</p>
            <h2 className="section-title text-gray-900">Revenue Model</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Rolling Growth Flywheel</h3>
                  <p className="text-gray-500 leading-relaxed mb-6">
                    Invest RMB 100K to deploy initial WeCalc units, generate RMB 200K through compute services,
                    reinvest RMB 200K to expand and earn RMB 400K — creating a self-reinforcing cycle where
                    compute infrastructure drives user adoption, and user adoption funds further expansion.
                  </p>
                  <p className="text-sm font-medium text-brand-600">From RMB 100K to RMB 100M through progressive growth</p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Compute Service Revenue', desc: 'Monthly or usage-based compute fees from enterprise customers' },
                    { label: 'Value-Added Services', desc: 'Technical support, custom development, training, and consulting' },
                    { label: 'Equity Appreciation', desc: 'Share value growth following IPO' },
                    { label: 'Compute Voucher System', desc: 'Value appreciation through compute voucher circulation' },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-3">
                      <svg className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{item.label}</div>
                        <div className="text-xs text-gray-500">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="partner-form" className="section-padding bg-brand-950 text-white">
        <div className="section-container">
          <div className="grid gap-10 lg:grid-cols-[0.78fr,1.22fr]">
            <div>
              <p className="text-sm font-semibold text-brand-300 tracking-widest uppercase mb-3">PRE-SCREEN</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Start with a Regional Partnership Pre-Screen</h2>
              <p className="text-white/70 leading-relaxed">
                If you have connections in manufacturing, industrial parks, hospitals, or universities in your area, we encourage you to apply for priority review. The system will generate pre-screening results based on regional resources, team capability, and expected customer coverage.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'We prioritize regional resources and execution capability over traditional franchise credentials.',
                  'After submission, next steps are outlined automatically: document review → regional assessment → interview → signing.',
                  'High-priority applications fast-track to manual review.',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/80">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <Suspense fallback={<div className="animate-pulse bg-white/5 rounded-2xl h-96" />}>
              <PartnershipApplicationForm />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">PROCESS</p>
            <h2 className="section-title text-gray-900">Partnership Process</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {steps.map((item) => (
              <div key={item.step} className="relative p-6 rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all duration-300">
                <span className="text-5xl font-black text-gray-100 absolute top-4 right-4">{item.step}</span>
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold text-sm mb-4">{item.step}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-950 text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join WeCalc, Build the AI Future Together</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Anyone passionate about the AI industry can share in the compute economy through our partnership program — with zero barriers to entry
          </p>
          <Link href="#partner-form" className="btn-primary text-base px-10 py-4">Apply to Become a Partner</Link>
        </div>
      </section>
    </>
  );
}
