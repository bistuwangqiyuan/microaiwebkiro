import type { Metadata } from 'next';
import Link from 'next/link';
import { BASE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: '客户案例 — 6+行业验证·TCO降低40-62%',
  description:
    '微算科技在教育、制造、医疗、金融、自动驾驶等6+行业的真实落地案例。48-72小时快速部署，TCO综合降低40-62%，资源利用率达85%。华为120万元同成本对标测试全面超越。',
  alternates: { canonical: `${BASE_URL}/case-study` },
  openGraph: {
    title: '客户案例 | 微算科技',
    description: '6+行业验证，TCO降低40-62%，48-72小时部署上线',
    url: `${BASE_URL}/case-study`,
  },
};

const heroMetrics = [
  { value: '6+', label: '行业场景已验证' },
  { value: '48–72h', label: '平均部署上线' },
  { value: '40–62%', label: 'TCO 综合降幅' },
  { value: '85%', label: '典型资源利用率' },
] as const;

interface CaseStudy {
  id: string;
  tag: string;
  product: string;
  industry: string;
  customer: string;
  location: string;
  headline: string;
  challenge: string;
  solution: string;
  quote: string;
  quoteAuthor: string;
  metrics: Array<{ value: string; label: string }>;
  highlights: string[];
  image: string;
  accent: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'education',
    tag: 'CASE 01',
    product: '微算-B',
    industry: '教育科研',
    customer: '北京信息科技大学',
    location: '北京',
    headline: '72 小时建成百人并发 AI 教学实训平台',
    challenge:
      '学校需要为人工智能专业搭建本地化教学实训平台，要求支持百人同时在线训练模型，且学生实验数据不得离开校园网络。传统方案报价超过 80 万元，建设周期至少 3 个月，预算和时间均不允许。',
    solution:
      '部署 1 台微算-B 基础版，72 小时内完成从到货、上架、联网到平台就绪的全流程交付。通过存算分离架构实现多用户资源弹性隔离，配合一键启动的管控面板，教师无需专职运维即可管理算力资源分配。',
    quote:
      '以前我们的学生只能用云端免费额度跑 Demo，现在每个人都能在校内独立训练自己的模型，数据安全也不用担心。上线一个学期后，学生参加 AI 竞赛的获奖率提升了 30%。',
    quoteAuthor: '计算机学院实验中心负责人',
    metrics: [
      { value: '72h', label: '部署上线' },
      { value: '100+', label: '并发用户数' },
      { value: '85%', label: '资源利用率' },
      { value: '30%↑', label: '学生获奖率提升' },
    ],
    highlights: [
      '数据全部留在校园内网，满足高校数据安全管理要求',
      '资源利用率达 85%，远超传统方案 40% 的行业均值',
      '支持 PyTorch / TensorFlow 等主流框架，开箱即用',
      '学期末通过热插拔方式扩容 1 个 GPU 节点，零停机',
    ],
    image: '/image/算力中心图17.png',
    accent: 'from-blue-500 to-cyan-400',
  },
  {
    id: 'manufacturing',
    tag: 'CASE 02',
    product: '微算-B',
    industry: '智能制造',
    customer: '某汽车零部件企业',
    location: '长三角',
    headline: 'AI 视觉质检上线，漏检率从 2.3% 降至 0.15%',
    challenge:
      '该企业年产 800 万件精密零部件，人工质检漏检率约 2.3%，每年因不良品流出导致的退货和索赔损失超过 200 万元。此前尝试将质检图片上传云端分析，但生产数据涉及客户图纸和工艺参数，安全合规部门坚决反对。',
    solution:
      '在产线边缘部署 1 台微算-B，加载定制化视觉质检模型，通过工业相机实时采集和本地推理，实现全量在线检测。数据从采集到判定全部在车间内完成，不出工厂网络。部署周期 48 小时，模型迭代通过本地增量训练持续优化。',
    quote:
      '上线两个月后，我们的客户退货率下降了八成，质检工位从 12 人减到 3 人做复核就够了。最关键的是生产数据一张图都没出过工厂的门。',
    quoteAuthor: '质量总监',
    metrics: [
      { value: '0.15%', label: '漏检率（原 2.3%）' },
      { value: '48h', label: '部署上线' },
      { value: '≤50ms', label: '单件检测时间' },
      { value: '200万+', label: '年损失减少' },
    ],
    highlights: [
      '每秒可处理 20+ 张高分辨率工业图片，满足产线节拍',
      '质检模型在本地完成增量训练，持续适应新产品型号',
      '数据不出工厂，满足客户及行业供应链安全审查要求',
      '投资回收期不到 3 个月，后续零额外算力费用',
    ],
    image: '/image/算力中心图42.png',
    accent: 'from-orange-500 to-amber-400',
  },
  {
    id: 'medical',
    tag: 'CASE 03',
    product: '微算-B',
    industry: '医疗健康',
    customer: '某省会城市三甲医院',
    location: '华中地区',
    headline: '影像 AI 辅助读片，平均报告时间缩短 65%',
    challenge:
      '该医院放射科日均处理 CT/MRI 影像超过 400 例，医生人均每日阅片 80+ 例，工作负荷极大。医院曾考虑接入云端 AI 辅诊平台，但影像数据涉及大量患者隐私信息，卫健委和信息安全部门明确要求数据不得离开医院内网。',
    solution:
      '在医院信息中心机房部署 1 台微算-B，搭载经过 NMPA 备案的肺结节筛查和骨折辅助检测模型。通过 PACS 系统对接，影像自动推送至微算进行本地推理，AI 标注结果 30 秒内返回诊断工作站，全程数据不出院。',
    quote:
      '自从上了微算的本地 AI 辅诊，我们科室的平均出报告时间从 45 分钟降到了 16 分钟，医生可以把更多精力放在疑难病例上。最重要的是，患者数据一个字节都没离开过医院。',
    quoteAuthor: '放射科主任',
    metrics: [
      { value: '65%', label: '报告时间缩短' },
      { value: '400+', label: '日均处理影像数' },
      { value: '30s', label: 'AI 标注返回' },
      { value: '0', label: '数据出院事件' },
    ],
    highlights: [
      '对接 PACS / HIS 系统，影像自动流转，无需人工操作',
      'AI 辅助将肺结节检出灵敏度提升至 96%，辅助医生降低漏诊',
      '满足三级等保及卫健委数据安全管理规定，患者数据全程本地',
      '7×24 小时无人值守运行，稳定性达 99.9%',
    ],
    image: '/image/算力中心图4.png',
    accent: 'from-emerald-500 to-teal-400',
  },
  {
    id: 'finance',
    tag: 'CASE 04',
    product: '微算-P',
    industry: '金融科技',
    customer: '某华东城市商业银行',
    location: '华东地区',
    headline: '本地化智能风控部署，实时反欺诈响应 ≤80ms',
    challenge:
      '该城商行日均信用卡交易超过 50 万笔，原有规则引擎误报率高达 5%，大量正常交易被拦截导致客户投诉。银监局要求核心交易数据和客户信息不得上云，且风控模型推理响应必须在 100ms 以内。',
    solution:
      '部署 1 套微算-P 专业版集群，承载实时风控推理、反欺诈检测和客户画像分析三套 AI 模型。通过 100G RDMA 低延迟网络保障交易数据的实时流入和模型推理的高吞吐，全部数据和模型均在行内网络闭环运行。',
    quote:
      '微算部署后，我们的风控误报率从 5% 降到了 1.2%，客户投诉量直接腰斩。监管检查时，信息科技部能很自信地说——所有客户数据都在行内，一条都没出去。',
    quoteAuthor: '信息科技部总经理',
    metrics: [
      { value: '≤80ms', label: '推理响应时间' },
      { value: '1.2%', label: '误报率（原 5%）' },
      { value: '50万+', label: '日均交易处理' },
      { value: '50%↓', label: '客户投诉降幅' },
    ],
    highlights: [
      '交易数据全程在行内网络闭环，满足银监会数据安全要求',
      '风控模型每周自动增量更新，持续适应新型欺诈模式',
      '单集群支撑日均 50 万+ 笔交易的实时推理，峰值无延迟',
      '相比同等能力的自建方案，TCO 降低约 45%',
    ],
    image: '/image/算力中心图2.png',
    accent: 'from-violet-500 to-purple-400',
  },
  {
    id: 'auto-driving',
    tag: 'CASE 05',
    product: '微算-P',
    industry: '自动驾驶',
    customer: '某 L4 自动驾驶科技公司',
    location: '北京',
    headline: '路测数据本地闭环处理，模型迭代周期缩短 40%',
    challenge:
      '该公司每天产生超过 2TB 的路测采集数据（视频、点云、IMU），此前将数据上传至公有云训练模型，上传耗时长、带宽成本高，且路测数据涉及城市道路信息和行人隐私，合规风险日益增大。',
    solution:
      '在研发中心部署 2 套微算-P 专业版，构建本地化的数据标注、模型训练和仿真验证一体化平台。路测数据通过专用链路回传后直接在本地完成清洗、标注和训练，无需上云。EBOF 全闪存储保障 2TB/天数据的高速写入和随机读取。',
    quote:
      '以前数据上传就要半天，现在数据到了就能直接训练，模型迭代的节奏比以前快了将近一半。数据安全也不用再和法务反复掰扯了。',
    quoteAuthor: '算法平台负责人',
    metrics: [
      { value: '40%', label: '迭代周期缩短' },
      { value: '2TB/天', label: '数据处理吞吐' },
      { value: '12P', label: '本地训练算力' },
      { value: '0', label: '数据上云事件' },
    ],
    highlights: [
      '路测视频、点云、IMU 数据全链路本地闭环，零上云',
      'EBOF 全闪存储保障高速随机 I/O，训练数据加载提速 70%',
      '本地仿真验证环境与训练环境共享算力资源，利用率 78%',
      '满足自动驾驶数据安全管理规定和城市道路信息保护要求',
    ],
    image: '/image/算力中心图44.png',
    accent: 'from-rose-500 to-pink-400',
  },
  {
    id: 'smart-park',
    tag: 'CASE 06',
    product: '微算-B',
    industry: '智慧园区',
    customer: '某国家级高新区管委会',
    location: '中部地区',
    headline: '为园区 30+ 中小企业提供共享 AI 算力服务',
    challenge:
      '高新区内聚集了 200+ 家科技型中小企业，其中 30 余家有明确的 AI 应用需求（视觉质检、智能客服、数据分析等），但单独采购算力设备投资门槛太高。管委会希望以公共算力服务的方式降低企业 AI 应用门槛，但要求数据在园区内闭环。',
    solution:
      '管委会在园区数据中心部署 3 台微算-B，通过微算管控平台实现多租户资源隔离和按需分配。30+ 家企业通过园区内网接入共享算力，各自的数据和模型完全隔离，按实际用量计费。管委会将算力服务作为园区公共服务的一部分，大幅降低了企业的 AI 启动成本。',
    quote:
      '以前园区企业想用 AI 要么上云要么自己买设备，现在有了共享算力服务，一家企业每月花几百块就能跑自己的模型。这是真正的算力普惠。',
    quoteAuthor: '高新区数字经济发展中心主任',
    metrics: [
      { value: '30+', label: '服务企业数' },
      { value: '3 台', label: '微算-B 部署' },
      { value: '90%↓', label: '企业启动成本降幅' },
      { value: '数据不出园区', label: '安全保障' },
    ],
    highlights: [
      '多租户隔离，30+ 家企业数据互不可见，独立安全域',
      '按需弹性分配算力，高峰期自动调度，利用率达 82%',
      '管委会以算力服务吸引高科技企业入驻，园区招商竞争力提升',
      '为园区沉淀本地产业数据资产，支撑未来产业大脑建设',
    ],
    image: '/image/算力中心图43.png',
    accent: 'from-sky-500 to-indigo-400',
  },
];

const comparisonData = {
  title: '微算 TCO 降本对比总览',
  subtitle: '基于《共享微算商业计划书》附录 H 测算与实际部署数据',
  rows: [
    {
      scenario: '1E 算力建设',
      traditional: '3.55–3.8 亿元',
      wecalc: '1.4–1.85 亿元',
      saving: '58–62%',
      cycle: '6–18 个月 → 2–4 周',
    },
    {
      scenario: '1P 视频生成 AI（自建）',
      traditional: '96–144 万元',
      wecalc: '12.2 万元（购置）',
      saving: '87–92%',
      cycle: '2–4 周 → 48–72 小时',
    },
    {
      scenario: '1P 视频生成 AI（租赁）',
      traditional: '约 105 万元（云）',
      wecalc: '7.2 万元（租赁）',
      saving: '93%',
      cycle: '即时 → 48–72 小时',
    },
  ],
};

const costDrivers = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0l4.179 2.25-4.179 2.25m0 0L12 17.25l-5.571-3m11.142 0l4.179 2.25L12 21.75l-9.75-5.25 4.179-2.25" />
      </svg>
    ),
    title: '存算分离架构',
    description: '计算与存储解耦，按需独立扩展，新增节点即可获得线性增长的算力和存储能力，告别整柜堆叠。',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    title: 'EBOF 全闪存储',
    description: '硬件加速的 NVMe-oF 全闪存储，配合 EC 纠删码实现存储成本降低 40% 以上，20% 冗余开销远低于传统 RAID。',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: '80%+ 资源利用率',
    description: '传统方案平均仅 40%，微算通过弹性调度和存算解耦将利用率提升至 80% 以上，同等业务量可减少一半硬件投入。',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '融资租赁降低门槛',
    description: '微算-B 融资租赁仅 2,000 元/月，三年 TCO 约 7.2 万元，让中小企业以接近零门槛获得本地 AI 算力。',
  },
];

export default function CaseStudyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-950 text-white pt-32 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(96,165,250,0.2),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.15),transparent_50%)]" />
        <div className="section-container relative z-10">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold text-brand-300 tracking-widest uppercase mb-4">CUSTOMER STORIES</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
              数据不出域<br className="hidden sm:block" />
              算力即到位
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-3xl">
              从高校实训到工业质检，从医疗影像到金融风控——看微算如何在不同行业实现 48 小时部署、TCO 降低 40–62%、数据全程本地闭环。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact?intent=case-consult" className="btn-primary">获取同行业方案</Link>
              <Link href="/products" className="inline-flex items-center px-8 py-3.5 text-sm font-semibold text-white border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300">
                查看产品配置
              </Link>
            </div>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {heroMetrics.map((m) => (
              <div key={m.label} className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                <div className="text-3xl font-bold mb-2">{m.value}</div>
                <div className="text-sm text-white/60">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      {caseStudies.map((cs, idx) => (
        <section key={cs.id} id={cs.id} className={`section-padding ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="section-container">
            <div className="mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase">{cs.tag}</p>
                <span className="text-xs font-medium text-gray-400">·</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-50 text-xs font-semibold text-brand-700">{cs.product}</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-xs font-semibold text-gray-600">{cs.industry}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-2">
                {cs.headline}
              </h2>
              <p className="text-base text-gray-500">{cs.customer} · {cs.location}</p>
            </div>

            <div className="grid lg:grid-cols-[1fr,0.85fr] gap-10 items-start">
              {/* Left: Content */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">挑战</h3>
                  <p className="text-gray-600 leading-relaxed">{cs.challenge}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">方案</h3>
                  <p className="text-gray-600 leading-relaxed">{cs.solution}</p>
                </div>

                {/* Quote */}
                <div className="relative rounded-2xl bg-gray-50 border border-gray-100 p-6 lg:p-8">
                  <svg className="absolute top-5 left-6 w-8 h-8 text-brand-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                  </svg>
                  <p className="text-gray-700 leading-relaxed italic pl-2 pt-6">{cs.quote}</p>
                  <p className="mt-4 text-sm font-semibold text-gray-500 pl-2">— {cs.quoteAuthor}，{cs.customer}</p>
                </div>

                {/* Highlights */}
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">亮点</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {cs.highlights.map((h) => (
                      <div key={h} className="flex items-start gap-2.5">
                        <svg className="w-4 h-4 text-brand-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-600 leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Image + Metrics */}
              <div className="space-y-6">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={cs.image}
                    alt={`${cs.customer} 微算部署实景`}
                    className="w-full aspect-[4/3] object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {cs.metrics.map((m) => (
                    <div key={m.label} className="rounded-2xl border border-gray-200 bg-white p-5">
                      <div className="text-2xl font-bold text-gray-900 mb-1">{m.value}</div>
                      <div className="text-xs text-gray-500">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* TCO Comparison Table */}
      <section className="section-padding bg-brand-950 text-white">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-brand-300 tracking-widest uppercase mb-3">TCO COMPARISON</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">{comparisonData.title}</h2>
            <p className="text-white/60">{comparisonData.subtitle}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-white/80">场景</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-white/80">传统 / 公有云</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-brand-300">微算方案</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-white/80">TCO 节省</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-white/80">周期对比</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.rows.map((row, i) => (
                    <tr key={row.scenario} className={i < comparisonData.rows.length - 1 ? 'border-b border-white/5' : ''}>
                      <td className="px-6 py-4 text-sm font-medium text-white">{row.scenario}</td>
                      <td className="px-6 py-4 text-sm text-white/60">{row.traditional}</td>
                      <td className="px-6 py-4 text-sm text-brand-300 font-semibold">{row.wecalc}</td>
                      <td className="px-6 py-4 text-sm font-bold text-emerald-400">{row.saving}</td>
                      <td className="px-6 py-4 text-sm text-white/60">{row.cycle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Saves */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">WHY IT SAVES</p>
            <h2 className="section-title text-gray-900">微算为什么能实现显著降本</h2>
            <p className="section-subtitle">
              降本不是单一采购价格下降，而是来自架构、交付、利用率和运营效率的系统性优化
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {costDrivers.map((item) => (
              <div key={item.title} className="rounded-3xl bg-white border border-gray-100 p-7 card-hover group">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5 group-hover:bg-brand-100 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="rounded-[2rem] bg-brand-950 text-white p-10 sm:p-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">获取您的专属降本方案</h2>
            <p className="text-lg text-white/65 mb-8 max-w-3xl mx-auto">
              无论您是高校、制造企业、医院还是金融机构，我们都可以基于您的业务场景、数据规模和合规要求，提供一份贴近实际的降本测算和部署方案。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact?intent=case-consult" className="btn-primary text-base px-10 py-4">
                咨询同行业案例
              </Link>
              <Link href="/selection" className="inline-flex items-center px-10 py-4 text-sm font-semibold text-white border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300">
                在线选型
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
