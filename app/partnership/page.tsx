import type { Metadata } from 'next';
import Link from 'next/link';
import PartnershipApplicationForm from '@/components/sales/PartnershipApplicationForm';
import { BASE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: '事业合伙人 — 零加盟费·免费100台设备·共享上市收益',
  description:
    '共享微算事业合伙人计划：零加盟费进入AI算力产业，免费获得100台微算设备(价值超亿元)，获得拟上市公司股权激励，区域独家运营。技术培训+持续技术支持。',
  alternates: { canonical: `${BASE_URL}/partnership` },
  openGraph: {
    title: '事业合伙人计划 | 微算科技',
    description: '零加盟费、免费100台设备、共享上市收益',
    url: `${BASE_URL}/partnership`,
  },
};

const benefits = [
  { title: '零加盟费', description: '无需任何加盟费用，零门槛进入AI算力产业', icon: '💰' },
  { title: '免费设备', description: '免费获得100台微算设备，价值超亿元的算力支撑', icon: '🖥️' },
  { title: '区域独家', description: '负责所在区域的微算设备赠送与服务，可拓展至全省乃至全国', icon: '🗺️' },
  { title: '股权激励', description: '获得拟上市公司主体的股份（期权或股权），共享上市收益', icon: '📈' },
  { title: '技术支持', description: '总部提供全面技术培训和持续技术支持', icon: '🛠️' },
  { title: '品牌赋能', description: '使用微算品牌资源，享受品牌影响力带来的市场优势', icon: '🏆' },
];

const steps = [
  { step: '01', title: '提交申请', desc: '填写合伙人申请表，提供基本信息和意向区域' },
  { step: '02', title: '资质评审', desc: '团队评审申请资质，确认合作意向' },
  { step: '03', title: '签订协议', desc: '签订合伙人合作协议，明确权利义务' },
  { step: '04', title: '培训上岗', desc: '接受产品技术和市场推广全面培训' },
  { step: '05', title: '设备配送', desc: '获得免费微算设备，开展区域业务' },
  { step: '06', title: '运营收益', desc: '通过算力服务获得持续收益，共享发展红利' },
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
            共享微算
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300">
              事业合伙人
            </span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            零加盟费进入AI产业，免费获得百台微算设备支撑
            <br />
            成为AI时代的创业者，共享未来上市收益
          </p>
          <Link href="#partner-form" className="btn-primary text-base px-10 py-4">提交区域合作申请</Link>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">BENEFITS</p>
            <h2 className="section-title text-gray-900">合伙人权益</h2>
            <p className="section-subtitle">六大权益保障，助力合伙人快速成功</p>
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
            <h2 className="section-title text-gray-900">收益模式</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">滚动建设正反馈模型</h3>
                  <p className="text-gray-500 leading-relaxed mb-6">
                    投入10万元建设首批微算，通过提供算力服务收取20万元，再将20万元投入扩建获取40万元，
                    依此类推形成&ldquo;算力建设促进用户应用、用户应用反哺算力建设&rdquo;的正循环生态。
                  </p>
                  <p className="text-sm font-medium text-brand-600">从10万到1亿的渐进式增长</p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: '算力服务收入', desc: '按月/按量收取企业算力使用费' },
                    { label: '增值服务收入', desc: '技术支持、定制开发、培训等增值服务' },
                    { label: '股权增值收益', desc: '公司上市后的股权增值收益' },
                    { label: '算力券流通', desc: '算力券制度带来的流通增值' },
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
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">先做一轮区域合作预筛</h2>
              <p className="text-white/70 leading-relaxed">
                如果您在本地有制造业、园区、医院、高校等资源，适合优先申请评审。系统会先根据区域资源、团队能力和预期客户覆盖情况生成预筛结果。
              </p>
              <div className="mt-8 space-y-4">
                {[
                  '我们更关注区域资源与执行能力，而不是传统加盟资历。',
                  '提交后会自动说明下一步：资料审核 -> 区域评估 -> 面谈 -> 签约。',
                  '高优先级申请会更快进入人工复核流程。',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/80">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <PartnershipApplicationForm />
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">PROCESS</p>
            <h2 className="section-title text-gray-900">加盟流程</h2>
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">加入共享微算，共创AI未来</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            任何有志于AI产业的个人，均可通过合伙人机制零门槛共享AI算力事业
          </p>
          <Link href="#partner-form" className="btn-primary text-base px-10 py-4">申请成为合伙人</Link>
        </div>
      </section>
    </>
  );
}
