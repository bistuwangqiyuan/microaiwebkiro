import { Suspense } from 'react';
import Image from 'next/image';
import LeadCaptureForm from '@/components/sales/LeadCaptureForm';

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="section-container text-center">
          <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">CONTACT</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Tell us your business scenario, budget, and timeline — our system will generate a tailored WeCalc recommendation for you.
          </p>
        </div>
      </section>

      <section className="pb-20 lg:pb-32 bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {[
                    {
                      label: 'Email',
                      value: '13426086861@139.com',
                      href: 'mailto:13426086861@139.com',
                      icon: (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Phone',
                      value: '134-2608-6861',
                      href: 'tel:13426086861',
                      icon: (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Address',
                      value: 'Beijing, China',
                      icon: (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Business Hours',
                      value: 'Mon–Fri 9:00 AM – 6:00 PM (CST)',
                      icon: (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ),
                    },
                  ].map((info) => (
                    <div key={info.label} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{info.label}</p>
                        {'href' in info && info.href ? (
                          <a href={info.href} className="font-medium text-gray-900 hover:text-brand-600 transition-colors">{info.value}</a>
                        ) : (
                          <p className="font-medium text-gray-900">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl text-center">
                <h3 className="font-bold text-gray-900 mb-3">WeChat Contact</h3>
                <p className="text-sm text-gray-500 mb-4">Scan the QR code to connect on WeChat for more information</p>
                <Image
                  src="/image/微信联系二维码.png"
                  alt="WeCalc Technology WeChat QR code"
                  width={180}
                  height={180}
                  className="rounded-xl mx-auto"
                />
              </div>

              <div className="p-6 bg-brand-50 rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-2">Financing Lease Quick Start</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  With our financing lease, get started for just <span className="font-bold text-brand-600">RMB 2,000/month</span> and
                  enjoy 1P of compute power — equivalent to approximately RMB 40K in ChatGPT token credits.
                </p>
                <a
                  href="/en/contact?intent=leasing&product=wecalc-b"
                  className="inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                >
                  Submit Financing Inquiry
                </a>
              </div>

              <div className="p-6 rounded-2xl border border-gray-100 bg-white">
                <h3 className="font-bold text-gray-900 mb-2">Recommended Information to Include</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Your industry and specific AI use case (e.g., imaging inference, teaching lab, visual inspection)</li>
                  <li>Whether data sovereignty is required, and your expected go-live timeline</li>
                  <li>Budget range and openness to financing lease or pilot programs</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-3">
              <Suspense fallback={<div className="animate-pulse bg-gray-100 rounded-2xl h-96" />}>
                <LeadCaptureForm
                  sourcePage="/en/contact"
                  submitLabel="Submit Inquiry & Generate Recommendation"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
