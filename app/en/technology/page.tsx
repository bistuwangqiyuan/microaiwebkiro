import type { Metadata } from 'next';
import Link from 'next/link';
import { BASE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Core Technology — Disaggregated Storage-Compute Architecture & EBOF All-Flash Storage',
  description:
    'WeCalc dual core technologies: Disaggregated storage-compute architecture (NVMe-oF protocol, RoCEv2 interconnect, latency ≤100μs, bandwidth ≥100Gbps) and EBOF all-flash storage (PCIe Gen5, IOPS ≥1M, bandwidth ≥56GB/s). 72% faster data loading, 64% higher throughput.',
  alternates: { canonical: `${BASE_URL}/en/technology` },
  openGraph: {
    title: 'Core Technology — Disaggregated Storage-Compute & EBOF All-Flash | WeCalc',
    description: 'NVMe-oF protocol, RoCEv2 interconnect, PCIe Gen5 gateway-free distributed storage pool',
    url: `${BASE_URL}/en/technology`,
  },
};

export default function TechnologyPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="section-container text-center">
          <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">TECHNOLOGY</p>
          <h1 className="section-title text-gray-900 mb-4">Core Technology</h1>
          <p className="section-subtitle">
            Proprietary disaggregated storage-compute architecture and EBOF all-flash storage
            <br className="hidden sm:block" />
            Two core technologies deeply integrated into a unified platform
          </p>
        </div>
      </section>

      {/* Architecture Overview Image */}
      <section className="pb-12 bg-white">
        <div className="section-container">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            <img src="/image/微算产品架构图40829.png" alt="WeCalc product architecture overview" className="w-full object-contain" />
          </div>
        </div>
      </section>

      {/* Disaggregated Storage-Compute Architecture */}
      <section className="section-padding bg-white" id="separation">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full mb-6">CORE TECH I</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Disaggregated Storage-Compute Architecture</h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Physical decoupling of compute and storage resources via the NVMe-oF protocol. RoCEv2 high-speed interconnect
                eliminates TCP/IP congestion bottlenecks. IPv6 dynamic addressing binds node identity to network address.
                SDN intelligent scheduling enables elastic cluster-wide resource orchestration.
              </p>
              <div className="space-y-6 mb-8">
                {[
                  { title: 'NVMe-oF Protocol', desc: 'Complete physical decoupling of compute and storage — scale and maintain each independently' },
                  { title: 'RoCEv2 Interconnect', desc: 'Eliminates TCP/IP congestion bottlenecks for ultra-low-latency data transfer' },
                  { title: 'IPv6 Dynamic Addressing', desc: 'Unified node identity and address binding simplifies cluster management' },
                  { title: 'SDN Intelligent Scheduling', desc: 'Elastic cluster-wide resource orchestration with on-demand compute and storage allocation' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '≤100μs', label: 'Latency' },
                  { value: '≥100Gbps', label: 'Cluster Bandwidth' },
                  { value: '≤4h', label: 'Expansion Cycle' },
                ].map((m) => (
                  <div key={m.label} className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-xl font-bold text-blue-600">{m.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <img src="/image/微算技术架构图1.png" alt="Disaggregated storage-compute architecture diagram" className="rounded-2xl shadow-lg w-full" loading="lazy" />
              <div className="grid grid-cols-2 gap-4">
                <img src="/image/微算技术架构图6.png" alt="Network architecture" className="rounded-xl shadow-md w-full" loading="lazy" />
                <img src="/image/微算技术架构图7.png" alt="Storage architecture" className="rounded-xl shadow-md w-full" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EBOF All-Flash Storage */}
      <section className="section-padding bg-gray-50" id="ebof">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="lg:order-2">
              <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full mb-6">CORE TECH II</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">EBOF All-Flash Storage</h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Gateway-free distributed storage pool built on PCIe Gen5, eliminating performance bottlenecks at the hardware level.
                8+2 EC erasure coding achieves enterprise-grade data protection with only 20% redundancy overhead.
                Smart data migration with wear-leveling algorithms extends SSD lifespan by over 20%.
              </p>
              <div className="space-y-6 mb-8">
                {[
                  { title: 'PCIe Gen5 Interface', desc: 'Gateway-free direct-attach design eliminates I/O performance bottlenecks at the lowest level' },
                  { title: '8+2 EC Erasure Coding', desc: 'Enterprise-grade data protection with only 20% redundancy — 40% storage cost reduction' },
                  { title: 'Smart Data Migration', desc: 'Wear-leveling algorithms extend SSD lifespan by ≥20%' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { value: '≥1M', label: 'IOPS' },
                  { value: '≥56GB/s', label: 'Bandwidth' },
                  { value: '99.9999%', label: 'Reliability' },
                  { value: '≥40%', label: 'Cost Reduction' },
                ].map((m) => (
                  <div key={m.label} className="text-center p-4 bg-white rounded-xl border border-gray-100">
                    <div className="text-lg font-bold text-indigo-600">{m.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:order-1 space-y-4">
              <img src="/image/微算技术架构图5.png" alt="EBOF all-flash storage architecture" className="rounded-2xl shadow-lg w-full" loading="lazy" />
              <div className="grid grid-cols-2 gap-4">
                <img src="/image/内部pcb图.jpg" alt="Storage PCB board" className="rounded-xl shadow-md w-full" loading="lazy" />
                <img src="/image/微算技术架构图8.jpg" alt="Technical details" className="rounded-xl shadow-md w-full" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Gallery */}
      <section className="section-padding bg-white" id="gallery">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">ARCHITECTURE</p>
            <h2 className="section-title text-gray-900">Architecture Deep Dive</h2>
            <p className="section-subtitle">Explore WeCalc system architecture and technical details</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: '/image/微算技术架构图9.jpg', title: 'Cluster Network Topology' },
              { src: '/image/微算技术架构图11.jpg', title: 'Data Flow Architecture' },
              { src: '/image/微算技术架构图12.png', title: 'Storage Layer Design' },
              { src: '/image/微算技术架构图13.png', title: 'Compute Scheduling System' },
              { src: '/image/微算技术架构图14.png', title: 'Security Framework' },
              { src: '/image/微算技术架构图15.png', title: 'Operations Management Platform' },
            ].map((item) => (
              <div key={item.src} className="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden border border-gray-100">
              <img src="/image/胃酸架构图9.png" alt="System architecture panorama" className="w-full" loading="lazy" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm">System Architecture Panorama</h3>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-gray-100">
              <img src="/image/微算技术架构图15.png" alt="Deployment architecture" className="w-full" loading="lazy" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm">Deployment Architecture</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fusion Benefits */}
      <section className="section-padding bg-gray-50" id="advantages">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">ADVANTAGES</p>
            <h2 className="section-title text-gray-900">Fusion Benefits</h2>
            <p className="section-subtitle">Deep native integration of both core technologies delivers breakthrough performance across the board</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '≥60%', label: 'System Response Improvement', desc: 'Dramatically faster overall system response under high-concurrency workloads', color: 'bg-blue-50 text-blue-600' },
              { value: '≥40%', label: 'Total TCO Reduction', desc: 'Significantly lower total cost of ownership with higher return on investment', color: 'bg-green-50 text-green-600' },
              { value: '90%', label: 'Expansion Cycle Reduction', desc: 'From months to hours — scale without service interruption', color: 'bg-purple-50 text-purple-600' },
              { value: '0', label: 'Data Breach Risk', desc: 'Data never leaves your premises — breach risk eliminated at the architecture level', color: 'bg-red-50 text-red-600' },
            ].map((item) => (
              <div key={item.label} className="p-8 rounded-2xl border border-gray-100 bg-white hover:shadow-xl transition-shadow duration-500">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${item.color} mb-6`}>
                  <span className="text-lg font-bold">{item.value}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.label}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-950 text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Want to learn more about WeCalc technology?</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Our technical experts will walk you through the principles and use cases of our disaggregated storage-compute architecture and EBOF all-flash storage
          </p>
          <Link href="/en/contact" className="btn-primary text-base px-10 py-4">Talk to a Technical Advisor</Link>
        </div>
      </section>
    </>
  );
}
