import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '微算降本对比案例',
  description:
    '基于共享微算商业计划书附录 H 的测算，展示微算在 1E 级算力建设与 1P 级视频生成 AI 场景中的综合降本效果、部署效率与数据安全优势。',
};

const summaryMetrics = [
  { value: '58%–62%', label: '1E 算力三年 TCO 节省' },
  { value: '7.2 万元', label: '1P 融资租赁三年 TCO' },
  { value: '90%+', label: '大规模部署周期缩短' },
  { value: '48–72 小时', label: '1P 场景上线周期' },
] as const;

const caseOneRows = [
  {
    label: '初始建设',
    traditional: '约 2.8–2.9 亿元（125 节点×165 万/节点 + 土建配套）',
    wecalc: '约 1.15–1.5 亿元（125 台×80 万 + 模块化配套）',
    difference: '微算省约 55%–60%',
  },
  {
    label: '三年 TCO',
    traditional: '约 3.55–3.8 亿元',
    wecalc: '约 1.4–1.85 亿元',
    difference: '微算省约 58%–62%',
  },
  {
    label: '部署周期',
    traditional: '6–18 个月',
    wecalc: '2–4 周',
    difference: '微算缩短 90%+',
  },
  {
    label: '资源利用率',
    traditional: '约 40%（中国信通院）',
    wecalc: '约 80%（北信科 85%、附录 A 提升≥50%）',
    difference: '微算提升约 1 倍',
  },
  {
    label: '扩容方式',
    traditional: '停机调试、周期长',
    wecalc: '热插拔 ≤4 小时、不中断业务',
    difference: '微算扩容周期缩短约 90%',
  },
] as const;

const caseTwoRows = [
  {
    label: '初始投入',
    selfBuilt: '80–120 万元',
    cloud: '0',
    purchase: '5 万元',
    lease: '0（月付 2,000 元）',
  },
  {
    label: '三年 TCO',
    selfBuilt: '96–144 万元',
    cloud: '约 105 万元',
    purchase: '约 7.5 万元（得 1P）',
    lease: '约 7.2 万元',
  },
  {
    label: '部署 / 上线',
    selfBuilt: '2–4 周',
    cloud: '即时',
    purchase: '48–72 小时',
    lease: '48–72 小时',
  },
  {
    label: '数据与合规',
    selfBuilt: '本地可控',
    cloud: '数据在云端',
    purchase: '数据不出域',
    lease: '数据不出域',
  },
] as const;

const costDrivers = [
  {
    title: '存算分离降低硬件与扩容成本',
    description:
      '计算与存储解耦后，企业无需按传统方式整柜堆叠，新增节点即可获得线性增长的算力与存储能力。',
  },
  {
    title: 'EBOF 全闪存储降低综合存储成本',
    description:
      '商业计划书测算指出，EBOF 与 EC 纠删码组合可实现存储成本降低 ≥40%，且 20% 冗余明显优于传统 RAID 50%+。',
  },
  {
    title: '更高资源利用率带来更低 TCO',
    description:
      '传统方案资源利用率约 40%，微算方案可达约 80%，在同等业务量下可明显减少冗余资源与闲置投入。',
  },
  {
    title: '融资租赁降低 1P 场景准入门槛',
    description:
      '针对轻量应用与视频生成 AI，企业可用 2,000 元/月获得 1P 算力，避免一次性大额采购与持续公有云支出。',
  },
] as const;

const evidenceSources = [
  '《共享微算商业计划书》附录 H：微算降本对比案例',
  '华为 120 万元同成本对标测试：三年总成本节省 30%+',
  '中国信通院公开资源利用率参考数据',
  '行业公开资料与 NVMe-oF / EBOF 实践数据',
] as const;

export default function CaseStudyPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-950 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.25),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.18),transparent_36%)]" />
        <div className="section-container relative z-10">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold text-brand-300 tracking-widest uppercase mb-4">CASE STUDY</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              微算降本对比案例
            </h1>
            <p className="text-lg text-white/75 leading-relaxed max-w-3xl">
              基于《共享微算商业计划书》附录 H 的测算结果，本页面集中展示微算在 1E 级算力建设与
              1P 级视频生成 AI 场景中的综合降本能力、部署效率与数据不出域优势。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">咨询降本方案</Link>
              <Link href="/products" className="inline-flex items-center px-8 py-3.5 text-sm font-semibold text-white border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300">
                查看产品中心
              </Link>
            </div>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {summaryMetrics.map((metric) => (
              <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                <div className="text-3xl font-bold mb-2">{metric.value}</div>
                <div className="text-sm text-white/65">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-[1.05fr,0.95fr] gap-10 items-start">
            <div>
              <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">METHOD</p>
              <h2 className="section-title text-gray-900 mb-6">测算口径与适用说明</h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                本案例页采用商业计划书附录 H 的数据口径，并结合华为同成本对标测试、中国信通院公开数据与行业实践资料，
                对传统方案、公有云方案和微算方案在建设成本、三年 TCO、部署周期与资源利用率上的差异进行对比。
              </p>
              <p className="text-gray-500 leading-relaxed">
                结果更适合用来做方向性判断与方案比选，实际项目仍需结合算力规模、场地条件、业务并发、合规要求与交付范围做定制测算。
              </p>
            </div>

            <div className="rounded-[2rem] border border-gray-100 bg-gray-50 p-8">
              <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-4">EVIDENCE</p>
              <div className="space-y-4">
                {evidenceSources.map((source) => (
                  <div key={source} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-gray-600 leading-relaxed">{source}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="mb-12">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">CASE 01</p>
            <h2 className="section-title text-gray-900 mb-4">1E 算力建设成本对比</h2>
            <p className="text-lg text-gray-500 max-w-4xl">
              场景为 1E 算力，即 1,000 PFLOPS，适用于省级 / 区域级智算中心与大规模 AI 训练推理平台。
              商业计划书显示，微算在初始建设、三年 TCO、部署周期和扩容效率上均显著优于传统方案。
            </p>
          </div>

          <div className="grid lg:grid-cols-[0.82fr,1.18fr] gap-8 items-start">
            <div className="rounded-[2rem] bg-brand-950 text-white p-8 lg:p-10">
              <p className="text-sm font-semibold text-brand-300 tracking-widest uppercase mb-3">KEY RESULT</p>
              <h3 className="text-3xl font-bold mb-4">三年 TCO 约 1.4–1.85 亿元</h3>
              <p className="text-white/75 leading-relaxed mb-8">
                相比传统 1E 方案约 3.55–3.8 亿元的三年 TCO，微算可节省约 58%–62%，同时将部署周期从
                6–18 个月压缩至 2–4 周。
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-2xl font-bold mb-1">58%–62%</div>
                  <div className="text-sm text-white/65">三年 TCO 节省</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-2xl font-bold mb-1">2–4 周</div>
                  <div className="text-sm text-white/65">微算部署周期</div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-gray-100 bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px]">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">对比项</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">传统方案</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-brand-700">微算方案</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">差异</th>
                    </tr>
                  </thead>
                  <tbody>
                    {caseOneRows.map((row, index) => (
                      <tr key={row.label} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.label}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 leading-relaxed">{row.traditional}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 leading-relaxed">{row.wecalc}</td>
                        <td className="px-6 py-4 text-sm font-medium text-brand-600">{row.difference}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="mb-12">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">CASE 02</p>
            <h2 className="section-title text-gray-900 mb-4">1P 视频生成 AI 成本对比</h2>
            <p className="text-lg text-gray-500 max-w-4xl">
              场景为 1P 算力，即 1 PFLOPS，适用于企业级短视频、广告与营销视频生成 AI，覆盖轻量推理和小模型微调。
              该场景下，融资租赁模式的三年 TCO 仅约 7.2 万元。
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.18fr,0.82fr] gap-8 items-start">
            <div className="rounded-[2rem] border border-gray-100 bg-white overflow-hidden order-2 lg:order-1">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">对比项</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">传统自建（1P）</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">传统公有云（1P）</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">微算购置（1P 微算-B）</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-brand-700">微算融资租赁（1P）</th>
                    </tr>
                  </thead>
                  <tbody>
                    {caseTwoRows.map((row, index) => (
                      <tr key={row.label} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.label}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 leading-relaxed">{row.selfBuilt}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 leading-relaxed">{row.cloud}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 leading-relaxed">{row.purchase}</td>
                        <td className="px-6 py-4 text-sm font-medium text-brand-600 leading-relaxed">{row.lease}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-[2rem] bg-gray-50 p-8 lg:p-10 order-1 lg:order-2">
              <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">KEY RESULT</p>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">2,000 元 / 月即可获得 1P 算力</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                对于只需要 1P 级算力的企业，微算融资租赁模式可用 48–72 小时完成上线，三年 TCO 约 7.2 万元，
                显著低于传统自建与公有云，并同时保留数据不出域能力。
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-5">
                  <div className="text-2xl font-bold text-gray-900 mb-1">7.2 万元</div>
                  <div className="text-sm text-gray-500">三年 TCO</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-5">
                  <div className="text-2xl font-bold text-gray-900 mb-1">数据不出域</div>
                  <div className="text-sm text-gray-500">合规与数据主权优势</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">WHY IT SAVES</p>
            <h2 className="section-title text-gray-900">微算为什么能实现显著降本</h2>
            <p className="section-subtitle">
              降本不是单一采购价格下降，而是来自架构、交付、扩容和运营效率的系统性优化
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {costDrivers.map((item) => (
              <div key={item.title} className="rounded-3xl bg-white border border-gray-100 p-6 card-hover">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-950 text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">获取您的专属降本测算</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
            如果您希望基于业务规模、并发量、机房条件或行业合规要求进行定制测算，我们可以提供更贴近实际项目的方案建议。
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary text-base px-10 py-4">咨询案例与报价</Link>
            <Link href="/products" className="btn-secondary text-base px-10 py-4">查看产品配置</Link>
          </div>
        </div>
      </section>
    </>
  );
}
