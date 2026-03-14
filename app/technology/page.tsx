import type { Metadata } from 'next';
import Link from 'next/link';
import { BASE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: '核心技术 — 存算分离架构与EBOF全闪存储',
  description:
    '微算科技两大核心技术详解：存算分离架构(NVMe-oF协议、RoCEv2高速互联、交互延迟≤100μs、集群带宽≥100Gbps)与EBOF全闪存储(PCIe Gen5、IOPS≥100万、带宽≥56GB/s)。数据加载时间降低72%，吞吐量提升64%。',
  alternates: { canonical: `${BASE_URL}/technology` },
  openGraph: {
    title: '核心技术 — 存算分离架构与EBOF全闪存储 | 微算科技',
    description: 'NVMe-oF协议、RoCEv2高速互联、PCIe Gen5无网关分布式存储池',
    url: `${BASE_URL}/technology`,
  },
};

export default function TechnologyPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="section-container text-center">
          <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">TECHNOLOGY</p>
          <h1 className="section-title text-gray-900 mb-4">核心技术</h1>
          <p className="section-subtitle">
            完全自主知识产权的存算分离架构与EBOF全闪存储
            <br className="hidden sm:block" />
            两大技术深度融合，构建一体化技术底座
          </p>
        </div>
      </section>

      {/* Architecture Overview Image */}
      <section className="pb-12 bg-white">
        <div className="section-container">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            <img src="/image/微算产品架构图40829.png" alt="微算产品整体架构图" className="w-full object-contain" />
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="section-padding bg-white" id="separation">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full mb-6">核心技术一</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">存算分离架构</h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                基于NVMe-oF协议实现计算与存储资源物理彻底解耦，RoCEv2高速互联消除TCP/IP拥塞瓶颈，
                IPv6动态地址编码实现节点身份与地址一体化绑定，SDN智能调度实现全集群资源弹性调度。
              </p>
              <div className="space-y-6 mb-8">
                {[
                  { title: 'NVMe-oF协议', desc: '计算与存储资源物理彻底解耦，独立扩展、独立维护' },
                  { title: 'RoCEv2高速互联', desc: '消除TCP/IP拥塞瓶颈，实现超低延迟数据传输' },
                  { title: 'IPv6动态地址编码', desc: '节点身份与地址一体化绑定，简化集群管理' },
                  { title: 'SDN智能调度', desc: '全集群资源弹性调度，按需分配计算和存储资源' },
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
                  { value: '≤100μs', label: '交互延迟' },
                  { value: '≥100Gbps', label: '集群带宽' },
                  { value: '≤4小时', label: '扩容周期' },
                ].map((m) => (
                  <div key={m.label} className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-xl font-bold text-blue-600">{m.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <img src="/image/微算技术架构图1.png" alt="存算分离架构图" className="rounded-2xl shadow-lg w-full" loading="lazy" />
              <div className="grid grid-cols-2 gap-4">
                <img src="/image/微算技术架构图6.png" alt="网络架构" className="rounded-xl shadow-md w-full" loading="lazy" />
                <img src="/image/微算技术架构图7.png" alt="存储架构" className="rounded-xl shadow-md w-full" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EBOF */}
      <section className="section-padding bg-gray-50" id="ebof">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="lg:order-2">
              <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full mb-6">核心技术二</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">EBOF全闪存储</h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                基于PCIe Gen5无网关分布式存储池，从底层消除性能瓶颈。
                采用8+2 EC纠删码，仅需20%冗余即可实现高等级数据防护。
                智能数据迁移实现颗粒磨损均衡，延长SSD寿命20%以上。
              </p>
              <div className="space-y-6 mb-8">
                {[
                  { title: 'PCIe Gen5接口', desc: '无网关直连设计，从底层消除I/O性能瓶颈' },
                  { title: '8+2 EC纠删码', desc: '仅需20%冗余实现企业级数据防护，存储成本降低40%' },
                  { title: '智能数据迁移', desc: '颗粒磨损均衡算法，延长SSD使用寿命≥20%' },
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
                  { value: '≥100万', label: 'IOPS' },
                  { value: '≥56GB/s', label: '带宽' },
                  { value: '99.9999%', label: '可靠性' },
                  { value: '≥40%', label: '成本降低' },
                ].map((m) => (
                  <div key={m.label} className="text-center p-4 bg-white rounded-xl border border-gray-100">
                    <div className="text-lg font-bold text-indigo-600">{m.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:order-1 space-y-4">
              <img src="/image/微算技术架构图5.png" alt="EBOF全闪存储架构" className="rounded-2xl shadow-lg w-full" loading="lazy" />
              <div className="grid grid-cols-2 gap-4">
                <img src="/image/内部pcb图.jpg" alt="存储PCB电路板" className="rounded-xl shadow-md w-full" loading="lazy" />
                <img src="/image/微算技术架构图8.jpg" alt="技术细节" className="rounded-xl shadow-md w-full" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Architecture Gallery */}
      <section className="section-padding bg-white" id="gallery">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">ARCHITECTURE</p>
            <h2 className="section-title text-gray-900">技术架构详解</h2>
            <p className="section-subtitle">深入了解微算的系统架构与技术细节</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: '/image/微算技术架构图9.jpg', title: '集群网络拓扑' },
              { src: '/image/微算技术架构图11.jpg', title: '数据流转架构' },
              { src: '/image/微算技术架构图12.png', title: '存储层设计' },
              { src: '/image/微算技术架构图13.png', title: '计算调度系统' },
              { src: '/image/微算技术架构图14.png', title: '安全防护体系' },
              { src: '/image/微算技术架构图15.png', title: '运维管理平台' },
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
              <img src="/image/胃酸架构图9.png" alt="系统架构全景" className="w-full" loading="lazy" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm">系统架构全景</h3>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-gray-100">
              <img src="/image/微算技术架构图15.png" alt="部署架构" className="w-full" loading="lazy" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm">部署方案架构</h3>
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
            <h2 className="section-title text-gray-900">融合效益</h2>
            <p className="section-subtitle">两大技术的原生深度融合，实现全方位性能突破</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '≥60%', label: '系统响应效率提升', desc: '高并发场景下系统整体响应效率大幅提升', color: 'bg-blue-50 text-blue-600' },
              { value: '≥40%', label: '综合TCO降低', desc: '总拥有成本显著降低，投资回报率更高', color: 'bg-green-50 text-green-600' },
              { value: '90%', label: '资源扩容周期缩短', desc: '从月级缩短到小时级，业务不中断扩容', color: 'bg-purple-50 text-purple-600' },
              { value: '0', label: '数据泄露风险', desc: '数据不出域，从架构层面消除泄露风险', color: 'bg-red-50 text-red-600' },
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">想深入了解微算技术方案？</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            我们的技术专家将为您详细介绍存算分离架构与EBOF全闪存储的技术原理和应用场景
          </p>
          <Link href="/contact" className="btn-primary text-base px-10 py-4">联系技术顾问</Link>
        </div>
      </section>
    </>
  );
}
