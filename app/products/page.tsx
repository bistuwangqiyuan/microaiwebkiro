import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '产品中心',
  description: '微算科技产品矩阵：微算-B基础版、微算-P专业版、微算-E企业版。从小型AI推理到大规模模型训练，覆盖全场景算力需求。',
};

const products = [
  {
    id: 'basic',
    name: '微算-B',
    subtitle: '基础版',
    tagline: '轻量级算力，快速启航',
    description: '适用于小型AI推理、数据分析、教学实训等场景。单台设备即可提供完整算力服务，48-72小时快速部署。',
    price: '约100万元',
    priceNote: '试点期免费赠送',
    color: 'from-blue-500 to-cyan-400',
    specs: [
      { label: '计算能力', value: '2×通用CPU + 可选GPU加速卡' },
      { label: '存储容量', value: '4×3.84TB NVMe SSD' },
      { label: '网络接口', value: '25G/100G以太网接口' },
      { label: '算力输出', value: '可达8 PFLOPS（配置GPU加速卡时）' },
      { label: '部署周期', value: '48-72小时快速部署' },
      { label: '扩展能力', value: '支持热插拔模块化扩展' },
    ],
    scenes: ['高校教学实训', '小型AI推理', '数据分析处理', '开发测试环境'],
  },
  {
    id: 'professional',
    name: '微算-P',
    subtitle: '专业版',
    tagline: '专业算力，卓越表现',
    description: '适用于中型AI训练与推理、工业边缘计算等场景。多节点集群架构，EBOF全闪存储提供极致性能。',
    price: '200-500万元',
    priceNote: '',
    color: 'from-brand-600 to-indigo-500',
    featured: true,
    specs: [
      { label: '计算能力', value: '多CPU+多GPU节点集群' },
      { label: '存储容量', value: '16×3.84TB NVMe SSD，EBOF全闪存储' },
      { label: '网络接口', value: '100G RDMA智能网卡，RoCEv2互联' },
      { label: '算力输出', value: '可达12 PFLOPS' },
      { label: '部署周期', value: '48-72小时快速部署' },
      { label: '扩展能力', value: '无缝扩展至百节点规模' },
    ],
    scenes: ['中型AI训练与推理', '工业边缘计算', '医疗影像分析', '智慧城市'],
  },
  {
    id: 'enterprise',
    name: '微算-E',
    subtitle: '企业版',
    tagline: '旗舰算力，无限可能',
    description: '适用于大规模模型训练、高性能计算等场景。支持千卡规模异构集群，PB级分布式存储池。',
    price: '500万元以上',
    priceNote: '定制方案',
    color: 'from-purple-600 to-pink-500',
    specs: [
      { label: '计算能力', value: '多节点异构集群，支持千卡规模' },
      { label: '存储容量', value: 'PB级分布式存储池' },
      { label: '网络接口', value: '200G/400G高速互联' },
      { label: '算力输出', value: '可达50 PFLOPS及以上' },
      { label: '部署周期', value: '根据规模定制' },
      { label: '扩展能力', value: '线性扩展至万台规模' },
    ],
    scenes: ['大规模模型训练', '高性能计算HPC', '自动驾驶', '科学研究'],
  },
];

const compareItems = [
  { label: '计算能力', basic: '2×CPU + 可选GPU', pro: '多CPU+多GPU集群', enterprise: '千卡异构集群' },
  { label: '存储容量', basic: '4×3.84TB NVMe', pro: '16×3.84TB EBOF', enterprise: 'PB级分布式存储' },
  { label: '算力输出', basic: '≤8 PFLOPS', pro: '≤12 PFLOPS', enterprise: '≥50 PFLOPS' },
  { label: '网络', basic: '25G/100G以太网', pro: '100G RDMA', enterprise: '200G/400G互联' },
  { label: '部署周期', basic: '48-72小时', pro: '48-72小时', enterprise: '定制方案' },
  { label: '可扩展性', basic: '热插拔扩展', pro: '百节点扩展', enterprise: '万台集群' },
  { label: '国产化兼容', basic: '✓', pro: '✓', enterprise: '✓' },
  { label: '数据不出域', basic: '✓', pro: '✓', enterprise: '✓' },
  { label: '参考价格', basic: '约100万元', pro: '200-500万元', enterprise: '500万元以上' },
];

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="section-container text-center">
          <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">PRODUCTS</p>
          <h1 className="section-title text-gray-900 mb-4">产品中心</h1>
          <p className="section-subtitle">
            从最小可用到线性扩展，从单台设备到万台集群
            <br className="hidden sm:block" />
            微算为每一种规模的算力需求提供最优解决方案
          </p>
        </div>
      </section>

      {/* Product Cards */}
      {products.map((product, index) => (
        <section
          key={product.id}
          id={product.id}
          className={`section-padding ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6
                  ${product.featured ? 'bg-brand-100 text-brand-700' : 'bg-gray-100 text-gray-600'}`}>
                  {product.priceNote || product.subtitle}
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{product.name}</h2>
                <p className="text-xl text-brand-600 font-medium mb-4">{product.tagline}</p>
                <p className="text-gray-500 leading-relaxed mb-8">{product.description}</p>

                <div className="space-y-4 mb-8">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-900">{spec.label}：</span>
                        <span className="text-gray-600">{spec.value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <Link href="/contact" className="btn-primary">获取报价</Link>
                  <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                </div>
              </div>

              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className={`aspect-square rounded-3xl bg-gradient-to-br ${product.color} p-0.5`}>
                  <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className={`text-8xl font-black bg-clip-text text-transparent bg-gradient-to-br ${product.color} mb-4`}>
                        {product.name.split('-')[1]}
                      </div>
                      <p className="text-xl font-bold text-gray-900">{product.name}</p>
                      <p className="text-gray-500">{product.subtitle}</p>
                      <div className="mt-6 flex flex-wrap gap-2 justify-center">
                        {product.scenes.map((scene) => (
                          <span key={scene} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {scene}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Comparison Table */}
      <section className="section-padding bg-white" id="compare">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">COMPARISON</p>
            <h2 className="section-title text-gray-900">产品规格对比</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">规格参数</th>
                  <th className="text-center py-4 px-6">
                    <div className="text-lg font-bold text-gray-900">微算-B</div>
                    <div className="text-sm text-gray-500">基础版</div>
                  </th>
                  <th className="text-center py-4 px-6 bg-brand-50 rounded-t-2xl">
                    <div className="text-lg font-bold text-brand-600">微算-P</div>
                    <div className="text-sm text-brand-500">专业版</div>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-brand-600 text-white text-xs rounded-full">推荐</span>
                  </th>
                  <th className="text-center py-4 px-6">
                    <div className="text-lg font-bold text-gray-900">微算-E</div>
                    <div className="text-sm text-gray-500">企业版</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareItems.map((item, i) => (
                  <tr key={item.label} className={i % 2 === 0 ? 'bg-gray-50/50' : ''}>
                    <td className="py-4 px-6 text-sm font-medium text-gray-700">{item.label}</td>
                    <td className="py-4 px-6 text-center text-sm text-gray-600">{item.basic}</td>
                    <td className="py-4 px-6 text-center text-sm text-gray-900 font-medium bg-brand-50">{item.pro}</td>
                    <td className="py-4 px-6 text-center text-sm text-gray-600">{item.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-950 text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">找到适合您的微算产品</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            我们的专家团队将根据您的实际需求，为您推荐最佳方案
          </p>
          <Link href="/contact" className="btn-primary text-base px-10 py-4">
            免费咨询
          </Link>
        </div>
      </section>
    </>
  );
}
