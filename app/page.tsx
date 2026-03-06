import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '微算科技 WeCalc — 数据不出域的微型算力中心',
  description:
    '微算科技提供数据不出域的微型算力中心解决方案，包含基础版、专业版、企业版三种产品。基于存算分离架构与EBOF全闪存储核心技术。',
};

const stats = [
  { value: '≥60%', label: '系统响应效率提升' },
  { value: '≥40%', label: '综合TCO降低' },
  { value: '90%', label: '资源扩容周期缩短' },
  { value: '99.9999%', label: '数据可靠性' },
];

const products = [
  {
    name: '微算-B',
    subtitle: '基础版',
    description: '小型AI推理、数据分析、教学实训的理想选择',
    specs: ['2×通用CPU + 可选GPU', '4×3.84TB NVMe SSD', '可达8 PFLOPS', '25G/100G以太网'],
    price: '约100万元',
    highlight: '试点期免费赠送',
    color: 'from-blue-500 to-cyan-400',
    href: '/products#basic',
  },
  {
    name: '微算-P',
    subtitle: '专业版',
    description: '中型AI训练与推理、工业边缘计算的专业之选',
    specs: ['多CPU+多GPU节点集群', '16×3.84TB NVMe SSD', '可达12 PFLOPS', '100G RDMA智能网卡'],
    price: '200-500万元',
    highlight: '最受欢迎',
    color: 'from-brand-600 to-indigo-500',
    href: '/products#professional',
    featured: true,
  },
  {
    name: '微算-E',
    subtitle: '企业版',
    description: '大规模模型训练、高性能计算的旗舰方案',
    specs: ['多节点异构集群', 'PB级分布式存储池', '可达50+ PFLOPS', '200G/400G高速互联'],
    price: '500万元以上',
    highlight: '定制方案',
    color: 'from-purple-600 to-pink-500',
    href: '/products#enterprise',
  },
];

const techFeatures = [
  {
    title: '存算分离架构',
    description: 'NVMe-oF协议实现计算与存储物理彻底解耦，RoCEv2高速互联消除TCP/IP拥塞瓶颈',
    metrics: '交互延迟 ≤100μs | 集群带宽 ≥100Gbps',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
      </svg>
    ),
  },
  {
    title: 'EBOF全闪存储',
    description: 'PCIe Gen5无网关分布式存储池，8+2 EC纠删码仅需20%冗余实现高等级数据防护',
    metrics: 'IOPS ≥100万 | 带宽 ≥56GB/s',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
  },
  {
    title: '数据不出域',
    description: '系统部署在客户单位内部，数据全部存放在自有设备中，无需上传云端，从根本上保障数据主权',
    metrics: '零泄露风险 | 合规无忧',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

const partners = [
  '北京信息科技大学',
  '华为',
  '中国移动',
  '亚信科技',
  '寒武纪',
  '英伟达',
];

const news = [
  {
    title: '微算与华为算力中心完成48小时快速部署',
    summary: '微算设备在华为算力中心完成部署验证，数据互通提升30%，模型加载时间缩短72%。',
    date: '2026-02-15',
    category: '公司动态',
  },
  {
    title: '微算基础版试点期免费赠送计划正式启动',
    summary: '微算科技宣布通过共享微算事业合伙人体系，向企业免费赠送价值超亿元的微型算力中心设备。',
    date: '2026-01-20',
    category: '公司动态',
  },
  {
    title: '2026年边缘算力市场迎来爆发式增长',
    summary: '全球微型数据中心市场规模预计2037年将达1850亿美元，年复合增长率28.8%。',
    date: '2026-01-10',
    category: '行业资讯',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-400/5 rounded-full blur-3xl" />
        </div>

        <div className="section-container relative z-10 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              国内唯一通过硬件加速全闪存储实现算力加速的团队
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
              数据不出域的
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300">
                微型算力中心
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              数据全部存放在您自己的设备中，无需上传云端。
              <br className="hidden sm:block" />
              基于存算分离架构与EBOF全闪存储技术，
              <br className="hidden sm:block" />
              为企业构建安全、高效、可扩展的本地AI算力平台。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/products" className="btn-primary text-base px-10 py-4">
                探索产品
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/contact" className="inline-flex items-center px-10 py-4 text-base font-semibold text-white border-2 border-white/20 rounded-full hover:bg-white/10 transition-all duration-300">
                联系我们
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-white/50">{stat.label}</div>
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

      {/* Products Section */}
      <section className="section-padding bg-white" id="products">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">PRODUCTS</p>
            <h2 className="section-title text-gray-900">产品矩阵</h2>
            <p className="section-subtitle">
              从单台微算到万台规模集群，覆盖从教学实训到大规模模型训练的全场景需求
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product) => (
              <Link
                key={product.name}
                href={product.href}
                className={`relative group rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 
                  ${product.featured
                    ? 'bg-gradient-to-b from-brand-950 to-gray-900 text-white shadow-2xl shadow-brand-900/20 ring-1 ring-brand-500/20'
                    : 'bg-gray-50 hover:bg-white hover:shadow-xl border border-gray-100'
                  }`}
              >
                {product.highlight && (
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6
                    ${product.featured ? 'bg-brand-500 text-white' : 'bg-brand-50 text-brand-600'}`}>
                    {product.highlight}
                  </span>
                )}

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <span className="text-white font-bold text-lg">{product.name.split('-')[1]}</span>
                </div>

                <h3 className={`text-2xl font-bold mb-1 ${product.featured ? 'text-white' : 'text-gray-900'}`}>
                  {product.name}
                </h3>
                <p className={`text-sm mb-4 ${product.featured ? 'text-brand-300' : 'text-brand-600'}`}>
                  {product.subtitle}
                </p>
                <p className={`text-sm mb-6 leading-relaxed ${product.featured ? 'text-gray-300' : 'text-gray-500'}`}>
                  {product.description}
                </p>

                <ul className="space-y-2.5 mb-8">
                  {product.specs.map((spec) => (
                    <li key={spec} className={`flex items-center gap-2.5 text-sm ${product.featured ? 'text-gray-300' : 'text-gray-600'}`}>
                      <svg className={`w-4 h-4 flex-shrink-0 ${product.featured ? 'text-brand-400' : 'text-brand-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {spec}
                    </li>
                  ))}
                </ul>

                <div className="flex items-end justify-between">
                  <div>
                    <p className={`text-xs ${product.featured ? 'text-gray-400' : 'text-gray-400'}`}>参考价格</p>
                    <p className={`text-lg font-bold ${product.featured ? 'text-white' : 'text-gray-900'}`}>{product.price}</p>
                  </div>
                  <span className={`inline-flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform
                    ${product.featured ? 'text-brand-300' : 'text-brand-600'}`}>
                    了解详情
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
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
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">TECHNOLOGY</p>
            <h2 className="section-title text-gray-900">两大核心技术</h2>
            <p className="section-subtitle">
              国内目前已知唯一通过硬件加速全闪存储实现算力加速的团队
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {techFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-8 border border-gray-100 card-hover group"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-50 group-hover:bg-brand-100 flex items-center justify-center text-brand-600 mb-6 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{feature.description}</p>
                <div className="px-3 py-2 bg-gray-50 rounded-lg">
                  <p className="text-xs font-medium text-brand-600">{feature.metrics}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/technology" className="btn-secondary">
              深入了解技术架构
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Validation Section */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">VERIFIED</p>
            <h2 className="section-title text-gray-900">经过验证的卓越性能</h2>
            <p className="section-subtitle">
              华为120万元同成本对标测试，全面超越传统方案
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { metric: '72%', label: '数据加载时间降低', icon: '⚡' },
              { metric: '64%', label: '吞吐量提升', icon: '📈' },
              { metric: '64%', label: '内存占用降低', icon: '💾' },
              { metric: '30%+', label: '三年总成本节省', icon: '💰' },
            ].map((item) => (
              <div key={item.label} className="text-center p-8 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-100">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{item.metric}</div>
                <div className="text-sm text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Model Section */}
      <section className="section-padding bg-brand-950 text-white overflow-hidden relative">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
        </div>

        <div className="section-container relative z-10">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-400 tracking-widest uppercase mb-3">BUSINESS MODEL</p>
            <h2 className="section-title">
              共享微算
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 ml-2">
                商业模式
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-4">
              借鉴共享经济范式，将算力从"重资产购买"转变为"轻量化共享"
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: '免费试点',
                description: '企业零成本获得微算设备，验证本地AI算力价值',
              },
              {
                step: '02',
                title: '滚动建设',
                description: '试点成功后按需扩展，从单台到万台线性增长',
              },
              {
                step: '03',
                title: '增值服务',
                description: '提供算力券、技术支持等增值服务，持续创造价值',
              },
              {
                step: '04',
                title: '生态共建',
                description: '事业合伙人体系，零加盟费共享AI产业发展红利',
              },
            ].map((item) => (
              <div key={item.step} className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <span className="text-5xl font-black text-white/5 absolute top-4 right-4">{item.step}</span>
                <div className="relative">
                  <div className="text-sm font-bold text-brand-400 mb-3">Step {item.step}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/partnership" className="btn-primary">
              成为事业合伙人
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="section-container">
          <p className="text-center text-sm font-medium text-gray-400 uppercase tracking-widest mb-10">
            合作伙伴与客户
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {partners.map((partner) => (
              <div key={partner} className="text-lg font-semibold text-gray-300 hover:text-gray-500 transition-colors cursor-default">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">NEWS</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">新闻资讯</h2>
            </div>
            <Link href="/news" className="hidden sm:inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
              查看全部
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {news.map((item) => (
              <article
                key={item.title}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover group"
              >
                <div className="h-48 bg-gradient-to-br from-brand-100 to-indigo-100 flex items-center justify-center">
                  <span className="text-4xl">📰</span>
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
                  <p className="text-sm text-gray-500 line-clamp-2">{item.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white mesh-gradient">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title text-gray-900 mb-6">
              开启您的AI算力之旅
            </h2>
            <p className="text-lg text-gray-500 mb-10 leading-relaxed">
              微算科技为您提供数据不出域的微型算力中心解决方案。
              <br />
              启动费用仅需5,000元/月，无需一次性大额投入。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary text-base px-10 py-4">
                免费咨询
              </Link>
              <Link href="/partnership" className="btn-outline text-base px-10 py-4">
                成为合伙人
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
