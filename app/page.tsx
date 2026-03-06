import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '微算科技 WeCalc — 数据不出域的微型算力中心',
  description: '微算科技提供数据不出域的微型算力中心解决方案，包含基础版、专业版、企业版三种产品。基于存算分离架构与EBOF全闪存储核心技术。',
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
    image: '/image/微算产品图1.jpg',
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
    image: '/image/微算产品图2.jpg',
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
    image: '/image/微算产品图3.png',
  },
];

const techFeatures = [
  {
    title: '存算分离架构',
    description: 'NVMe-oF协议实现计算与存储物理彻底解耦，RoCEv2高速互联消除TCP/IP拥塞瓶颈',
    metrics: '交互延迟 ≤100μs | 集群带宽 ≥100Gbps',
    image: '/image/微算技术架构图1.png',
  },
  {
    title: 'EBOF全闪存储',
    description: 'PCIe Gen5无网关分布式存储池，8+2 EC纠删码仅需20%冗余实现高等级数据防护',
    metrics: 'IOPS ≥100万 | 带宽 ≥56GB/s',
    image: '/image/微算技术架构图5.png',
  },
  {
    title: '数据不出域',
    description: '系统部署在客户单位内部，数据全部存放在自有设备中，无需上传云端，从根本上保障数据主权',
    metrics: '零泄露风险 | 合规无忧',
    image: '/image/算力中心照片3.jpg',
  },
];

const news = [
  {
    title: '微算团队亮相华为开发者大会',
    summary: '微算科技核心团队受邀参加华为开发者大会，展示存算分离架构与EBOF全闪存储技术的最新成果。',
    date: '2026-02-15',
    category: '公司动态',
    image: '/image/华为开发者大会作报告.png',
  },
  {
    title: '中央电视台报道微算科技创新成果',
    summary: '央视专题报道微算科技在微型算力中心领域的技术突破，关注数据不出域的创新理念。',
    date: '2026-01-20',
    category: '媒体报道',
    image: '/image/中央电视台报道.png',
  },
  {
    title: '微算科技荣获行业创新大奖',
    summary: '微算科技凭借自主知识产权的存算分离技术，荣获行业权威创新奖项。',
    date: '2026-01-10',
    category: '公司动态',
    image: '/image/获奖图片19.png',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
        <div className="absolute inset-0">
          <img src="/image/算力中心图44.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f172a]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
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
                className={`relative group rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 
                  ${product.featured
                    ? 'bg-gradient-to-b from-brand-950 to-gray-900 text-white shadow-2xl shadow-brand-900/20 ring-1 ring-brand-500/20'
                    : 'bg-gray-50 hover:bg-white hover:shadow-xl border border-gray-100'
                  }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={product.image} alt={`${product.name} ${product.subtitle}`} className="w-full h-full object-cover" loading="lazy" />
                  <div className={`absolute inset-0 ${product.featured ? 'bg-brand-950/60' : 'bg-gray-900/30'}`} />
                  {product.highlight && (
                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold
                      ${product.featured ? 'bg-brand-500 text-white' : 'bg-white text-brand-600'}`}>
                      {product.highlight}
                    </span>
                  )}
                </div>

                <div className="p-8">
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
                      <p className="text-xs text-gray-400">参考价格</p>
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
              <div key={feature.title} className="bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover group">
                <div className="relative h-48 overflow-hidden">
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </div>
                <div className="p-8 -mt-8 relative">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{feature.description}</p>
                  <div className="px-3 py-2 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-brand-600">{feature.metrics}</p>
                  </div>
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
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">VERIFIED</p>
              <h2 className="section-title text-gray-900 mb-6">经过验证的卓越性能</h2>
              <p className="text-gray-500 mb-8">华为120万元同成本对标测试，全面超越传统方案</p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { metric: '72%', label: '数据加载时间降低' },
                  { metric: '64%', label: '吞吐量提升' },
                  { metric: '64%', label: '内存占用降低' },
                  { metric: '30%+', label: '三年总成本节省' },
                ].map((item) => (
                  <div key={item.label} className="text-center p-6 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-100">
                    <div className="text-3xl font-bold text-gray-900 mb-2">{item.metric}</div>
                    <div className="text-sm text-gray-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src="/image/微算产品架构图40829.png" alt="微算产品架构" className="rounded-2xl shadow-xl w-full" loading="lazy" />
              <img src="/image/图片1.png" alt="微算技术细节" className="absolute -bottom-6 -left-6 w-1/3 rounded-xl shadow-lg border-4 border-white" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Business Model Section */}
      <section className="section-padding bg-brand-950 text-white overflow-hidden relative">
        <div className="absolute inset-0">
          <img src="/image/算力中心图43.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" />
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
              { step: '01', title: '免费试点', description: '企业零成本获得微算设备，验证本地AI算力价值' },
              { step: '02', title: '滚动建设', description: '试点成功后按需扩展，从单台到万台线性增长' },
              { step: '03', title: '增值服务', description: '提供算力券、技术支持等增值服务，持续创造价值' },
              { step: '04', title: '生态共建', description: '事业合伙人体系，零加盟费共享AI产业发展红利' },
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
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            <img src="/image/华为logo.png" alt="华为" className="h-10 md:h-12 object-contain opacity-60 hover:opacity-100 transition-opacity" loading="lazy" />
            <img src="/image/华为鲲鹏logo.png" alt="华为鲲鹏" className="h-10 md:h-12 object-contain opacity-60 hover:opacity-100 transition-opacity" loading="lazy" />
            <img src="/image/北京大学logo.jpg" alt="北京信息科技大学" className="h-10 md:h-12 object-contain opacity-60 hover:opacity-100 transition-opacity" loading="lazy" />
            <div className="text-lg font-semibold text-gray-300 hover:text-gray-500 transition-colors">中国移动</div>
            <div className="text-lg font-semibold text-gray-300 hover:text-gray-500 transition-colors">寒武纪</div>
            <div className="text-lg font-semibold text-gray-300 hover:text-gray-500 transition-colors">英伟达</div>
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
              <article key={item.title} className="bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover group">
                <div className="relative h-48 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
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
