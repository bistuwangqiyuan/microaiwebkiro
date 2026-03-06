export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductMetric {
  value: string;
  label: string;
}

export interface ProductCatalogItem {
  id: 'basic' | 'professional' | 'enterprise';
  slug: 'wecalc-b' | 'wecalc-p' | 'wecalc-e';
  href: string;
  name: string;
  fullName: string;
  subtitle: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: string;
  priceNote: string;
  highlight: string;
  color: string;
  image: string;
  quickSpecs: string[];
  specs: ProductSpec[];
  metrics: ProductMetric[];
  scenes: string[];
  benefits: string[];
  delivery: string[];
  featured?: boolean;
}

export const financingPlan = {
  badge: '融资租赁模式',
  title: '启动费用仅 2,000 元/月，即可享 1P 算力',
  description:
    '相当于拥有约 4 万元的 ChatGPT Token 使用额度，特别适合希望低门槛启动本地 AI 能力的企业与机构。',
};

export const coreProductFeatures = [
  { title: '开箱即用', description: '产品出厂即完成软硬件集成，无需专业人员二次配置。' },
  { title: '一机运行', description: '单台设备即可承载完整的算力服务能力，适合快速试点。' },
  { title: '一键启动', description: '通电后一键启动算力服务，降低部署和运维门槛。' },
  { title: '交钥匙交付', description: '从部署到运行全程交钥匙，48-72 小时完成交付。' },
  { title: '模块化扩展', description: '支持热插拔扩容，从单台微算平滑扩展到集群形态。' },
  { title: '多硬件支持', description: '支持 CPU、GPU、SSD 等多类型硬件灵活搭载。' },
  { title: '国产化兼容', description: '已获华为昇腾与鲲鹏兼容认证，并适配国内 90% 以上 GPU。' },
] as const;

export const validationHighlights = [
  { value: '72%', label: '数据加载时间降低' },
  { value: '64%', label: '吞吐量提升' },
  { value: '64%', label: '内存占用降低' },
  { value: '30%+', label: '三年总成本节省' },
] as const;

export const productCatalog: ProductCatalogItem[] = [
  {
    id: 'basic',
    slug: 'wecalc-b',
    href: '/products/wecalc-b',
    name: '微算-B',
    fullName: '微算-B 基础版',
    subtitle: '基础版',
    tagline: '1P 入门算力，快速构建本地 AI 试点',
    description: '面向小型 AI 推理、数据分析和教学实训，单台设备即可提供完整算力服务能力。',
    longDescription:
      '微算-B 以“最小可用”为设计目标，将计算、存储、管控能力集成在一台设备中，帮助企业和院校在 48-72 小时内建立起安全、本地、可扩展的 AI 算力底座。',
    price: '约 5 万元',
    priceNote: '试点期免费赠送或融资租赁 2,000 元/月',
    highlight: '1P 入门首选',
    color: 'from-blue-500 to-cyan-400',
    image: '/image/微算产品图1.jpg',
    quickSpecs: ['1×通用 CPU + 可选 GPU', '4TB NVMe SSD', '可达 1 PFLOPS', '25G/100G 以太网'],
    specs: [
      { label: '计算能力', value: '1×通用 CPU + 可选 GPU 加速卡' },
      { label: '存储容量', value: '4TB NVMe SSD' },
      { label: '网络', value: '25G/100G 以太网接口' },
      { label: '算力输出', value: '可达 1 PFLOPS（配置 GPU 加速卡时）' },
      { label: '适用场景', value: '小型 AI 推理、数据分析、教学实训' },
      { label: '部署周期', value: '48-72 小时交钥匙交付' },
    ],
    metrics: [
      { value: '1 PFLOPS', label: '最高算力输出' },
      { value: '4TB', label: '本地 NVMe 存储' },
      { value: '48-72h', label: '部署交付周期' },
      { value: '2,000 元/月', label: '融资租赁起步' },
    ],
    scenes: ['小型 AI 推理', '数据分析处理', '高校教学实训', '开发测试环境'],
    benefits: [
      '单台设备即可启动完整算力服务，适合试点验证与轻量化落地。',
      '数据全部保存在自有设备中，满足教学、政企、研发等数据不出域要求。',
      '支持试点期免费赠送或融资租赁模式，以更低资金门槛获得 1P 算力。',
    ],
    delivery: [
      '出厂完成软硬件集成，到货后可直接部署上线。',
      '支持一键启动与远程运维，降低现场实施复杂度。',
      '后续可通过增加节点平滑扩展至更高算力规模。',
    ],
  },
  {
    id: 'professional',
    slug: 'wecalc-p',
    href: '/products/wecalc-p',
    name: '微算-P',
    fullName: '微算-P 专业版',
    subtitle: '专业版',
    tagline: '面向训练与推理的中型算力集群',
    description: '适用于中型 AI 训练与推理、工业边缘计算等场景，是企业迈向生产级算力的主力机型。',
    longDescription:
      '微算-P 基于多 CPU、多 GPU 节点集群与 EBOF 全闪存储架构，为训练、推理、边缘分析等业务提供更高吞吐、更低延迟和更强扩展能力。',
    price: '200-500 万元',
    priceNote: '最受欢迎的生产级方案',
    highlight: '生产级主力机型',
    color: 'from-brand-600 to-indigo-500',
    image: '/image/微算产品图2.jpg',
    featured: true,
    quickSpecs: ['多 CPU + 多 GPU 节点集群', '16×3.84TB NVMe SSD', '可达 12 PFLOPS', '100G RDMA 互联'],
    specs: [
      { label: '计算能力', value: '多 CPU + 多 GPU 节点集群' },
      { label: '存储容量', value: '16×3.84TB NVMe SSD，EBOF 全闪存储' },
      { label: '网络', value: '100G RDMA 智能网卡，RoCEv2 互联' },
      { label: '算力输出', value: '可达 12 PFLOPS' },
      { label: '适用场景', value: '中型 AI 训练与推理、工业边缘计算' },
      { label: '部署周期', value: '48-72 小时快速交付，支持后续扩容' },
    ],
    metrics: [
      { value: '12 PFLOPS', label: '最高算力输出' },
      { value: '16×3.84TB', label: 'EBOF 全闪存储' },
      { value: '100G RDMA', label: '低时延高速互联' },
      { value: '48-72h', label: '典型部署周期' },
    ],
    scenes: ['中型 AI 训练与推理', '工业边缘计算', '医疗影像分析', '智慧城市'],
    benefits: [
      '通过存算分离与全闪存储组合，显著提升数据加载效率和业务吞吐能力。',
      '适合从单点试点走向生产级应用，兼顾性能、成本与扩展弹性。',
      '支持国产化软硬件兼容与模块化扩展，便于企业持续演进算力体系。',
    ],
    delivery: [
      '按场景完成集群预配置，降低现场集成时间。',
      '提供算力、存储、网络一体化交付与运维支持。',
      '可无缝扩展至百节点规模，支撑业务增长。',
    ],
  },
  {
    id: 'enterprise',
    slug: 'wecalc-e',
    href: '/products/wecalc-e',
    name: '微算-E',
    fullName: '微算-E 企业版',
    subtitle: '企业版',
    tagline: '千卡级异构集群，面向高性能与超大规模训练',
    description: '为大规模模型训练和高性能计算场景打造，提供 PB 级存储与 200G/400G 高速互联能力。',
    longDescription:
      '微算-E 面向高密度、高吞吐和高可靠性场景，支持多节点异构集群与 PB 级分布式存储池，是企业与科研机构建设本地算力底座的旗舰方案。',
    price: '500 万元以上',
    priceNote: '按业务规模定制交付',
    highlight: '旗舰级定制方案',
    color: 'from-purple-600 to-pink-500',
    image: '/image/微算产品图3.png',
    quickSpecs: ['多节点异构集群', 'PB 级分布式存储池', '50+ PFLOPS', '200G/400G 高速互联'],
    specs: [
      { label: '计算能力', value: '多节点异构集群，支持千卡规模' },
      { label: '存储容量', value: 'PB 级分布式存储池' },
      { label: '网络', value: '200G/400G 高速互联' },
      { label: '算力输出', value: '可达 50 PFLOPS 及以上' },
      { label: '适用场景', value: '大规模模型训练、高性能计算' },
      { label: '部署周期', value: '根据规模和行业场景定制交付' },
    ],
    metrics: [
      { value: '50+ PFLOPS', label: '旗舰级算力输出' },
      { value: 'PB 级', label: '分布式存储池' },
      { value: '200G/400G', label: '高速互联能力' },
      { value: '千卡规模', label: '异构集群扩展' },
    ],
    scenes: ['大规模模型训练', '高性能计算 HPC', '自动驾驶仿真', '科研计算平台'],
    benefits: [
      '支撑超大规模训练与高性能计算任务，满足高并发、海量数据与复杂模型需求。',
      '通过高速互联和分布式存储，保障大规模任务的数据吞吐与集群稳定性。',
      '可按行业与业务形态定制部署架构，兼顾长期演进能力。',
    ],
    delivery: [
      '根据业务目标完成算力、网络、存储的整体方案设计。',
      '支持从机房条件评估到集群上线的全流程交付。',
      '提供长期扩容规划和运维支持，保障持续稳定运行。',
    ],
  },
];

export const productComparison = [
  { label: '计算能力', basic: '1×CPU + 可选 GPU', pro: '多 CPU + 多 GPU 集群', enterprise: '千卡异构集群' },
  { label: '存储容量', basic: '4TB NVMe SSD', pro: '16×3.84TB EBOF', enterprise: 'PB 级分布式存储' },
  { label: '算力输出', basic: '≤1 PFLOPS', pro: '≤12 PFLOPS', enterprise: '≥50 PFLOPS' },
  { label: '网络', basic: '25G/100G 以太网', pro: '100G RDMA', enterprise: '200G/400G 互联' },
  { label: '部署周期', basic: '48-72 小时', pro: '48-72 小时', enterprise: '按规模定制' },
  { label: '可扩展性', basic: '单台起步，线性扩展', pro: '百节点扩展', enterprise: '万台级集群演进' },
  { label: '国产化兼容', basic: '✓', pro: '✓', enterprise: '✓' },
  { label: '数据不出域', basic: '✓', pro: '✓', enterprise: '✓' },
  { label: '参考价格', basic: '约 5 万元 / 2,000 元/月', pro: '200-500 万元', enterprise: '500 万元以上' },
] as const;

export function getProductBySlug(slug: string) {
  return productCatalog.find((product) => product.slug === slug);
}
