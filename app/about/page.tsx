import type { Metadata } from 'next';
import Link from 'next/link';
import { BASE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: '关于微算科技 — 国内唯一硬件加速全闪存储算力团队',
  description:
    '微算科技——数据不出域的微型算力中心领导者。国内唯一通过硬件加速全闪存储实现算力加速的团队，华为昇腾+鲲鹏双认证。核心团队来自北京信息科技大学，央视专题报道企业。',
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: {
    title: '关于微算科技 — 数据不出域的微型算力中心领导者',
    description: '国内唯一通过硬件加速全闪存储实现算力加速的团队，华为昇腾+鲲鹏双认证',
    url: `${BASE_URL}/about`,
  },
};

const milestones = [
  { year: '2024', title: '技术研发启动', desc: '存算分离架构与EBOF全闪存储技术研发' },
  { year: '2025', title: '产品验证', desc: '完成华为对标测试，获得昇腾+鲲鹏双认证' },
  { year: '2025', title: '商用落地', desc: '北京信息科技大学、华为算力中心成功部署' },
  { year: '2026', title: '规模化推广', desc: '启动共享微算事业合伙人计划，全国推广' },
];

const values = [
  { title: '数据主权', description: '坚守数据不出域的核心理念，确保企业数据主权与商业机密安全' },
  { title: '技术创新', description: '完全自主知识产权，持续推进存算分离与全闪存储技术的前沿发展' },
  { title: '普惠算力', description: '让AI算力惠及每一家企业，降低数字化转型的技术门槛和资金门槛' },
  { title: '共赢生态', description: '通过事业合伙人体系，与合作伙伴共同构建算力普惠生态' },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="section-container text-center">
          <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">ABOUT US</p>
          <h1 className="section-title text-gray-900 mb-4">关于微算科技</h1>
          <p className="section-subtitle">
            国内唯一通过硬件加速全闪存储实现算力加速的团队
          </p>
        </div>
      </section>

      {/* Company Intro with Team Photo */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">我们的使命</h2>
                <p className="text-gray-500 leading-relaxed mb-4">
                  微算科技致力于为企业提供数据不出域的微型算力中心解决方案。我们相信，数据安全是企业数字化转型的基石。
                  通过完全自主知识产权的存算分离架构与EBOF全闪存储技术，为每一家企业构建安全、高效、可扩展的本地AI算力平台。
                </p>
                <p className="text-gray-500 leading-relaxed">
                  微算技术做支撑、亿元算力免费送。我们以共享经济的创新范式，让AI算力惠及每一家企业，
                  让数据始终掌握在企业自己手中。
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src="/image/团队照片.jpg" alt="微算科技团队合影" className="w-full" loading="lazy" />
              </div>
            </div>

            {/* Core Values */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">核心价值观</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {values.map((value) => (
                  <div key={value.title} className="p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-500 border border-transparent hover:border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Team */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">核心团队</h2>
              <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
                由学术界与产业界资深专家组成的技术团队
              </p>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="rounded-2xl border border-gray-100 overflow-hidden">
                  <img src="/image/孟坤讲座.jpg" alt="孟坤在学术活动中发表讲座" className="w-full h-56 object-cover" loading="lazy" />
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-bold text-gray-900">孟坤</h3>
                    <p className="text-sm text-brand-600 mb-2">项目负责人</p>
                    <p className="text-sm text-gray-500">北京信息科技大学副教授，存储系统方向资深研究者，华为开发者大会特邀嘉宾</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-gray-100 overflow-hidden">
                  <img src="/image/华为开发者大会讲座19.jpg" alt="团队在华为开发者大会" className="w-full h-56 object-cover" loading="lazy" />
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-bold text-gray-900">王启源</h3>
                    <p className="text-sm text-brand-600 mb-2">专家顾问</p>
                    <p className="text-sm text-gray-500">教授，算力系统与存储架构领域专家，为微算提供深度技术指导</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Dynamics */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">团队动态</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-xl overflow-hidden aspect-square">
                  <img src="/image/团队动态1.png" alt="团队活动" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="rounded-xl overflow-hidden aspect-square">
                  <img src="/image/团队动态2.png" alt="团队研讨" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="rounded-xl overflow-hidden aspect-square">
                  <img src="/image/团队动态3.jpeg" alt="技术交流" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="rounded-xl overflow-hidden aspect-square">
                  <img src="/image/团队动态4.jpg" alt="团队建设" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
              </div>
            </div>

            {/* Awards */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">荣誉奖项</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-500">
                  <img src="/image/获奖174838213.jpg" alt="微算科技获奖" className="w-full aspect-[4/3] object-cover" loading="lazy" />
                  <div className="p-4 text-center">
                    <p className="font-semibold text-gray-900 text-sm">行业创新奖</p>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-500">
                  <img src="/image/获奖图片19.png" alt="技术突破奖" className="w-full aspect-[4/3] object-cover" loading="lazy" />
                  <div className="p-4 text-center">
                    <p className="font-semibold text-gray-900 text-sm">技术突破奖</p>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-500">
                  <img src="/image/图获奖图1.png" alt="优秀科创奖" className="w-full aspect-[4/3] object-cover" loading="lazy" />
                  <div className="p-4 text-center">
                    <p className="font-semibold text-gray-900 text-sm">优秀科创奖</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Events */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">重要活动</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="rounded-2xl overflow-hidden border border-gray-100">
                  <img src="/image/华为开发者大会作报告.png" alt="华为开发者大会作报告" className="w-full aspect-video object-cover" loading="lazy" />
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2">华为开发者大会</h3>
                    <p className="text-sm text-gray-500">微算科技团队受邀在华为开发者大会上作技术报告，展示存算分离架构的创新成果</p>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-100">
                  <img src="/image/中央电视台报道.png" alt="中央电视台报道" className="w-full aspect-video object-cover" loading="lazy" />
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2">央视专题报道</h3>
                    <p className="text-sm text-gray-500">中央电视台对微算科技进行专题报道，关注数据不出域的微型算力中心创新理念</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">发展历程</h2>
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {milestone.year.slice(2)}
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-0.5 flex-1 bg-gray-200 mt-2" />
                      )}
                    </div>
                    <div className="pb-8">
                      <div className="text-sm text-brand-600 font-medium">{milestone.year}年</div>
                      <h3 className="text-lg font-bold text-gray-900 mt-1">{milestone.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{milestone.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-gray-50">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">资质认证</h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { title: '华为昇腾认证', desc: 'AI处理器兼容认证', logo: '/image/华为logo.png' },
              { title: '华为鲲鹏认证', desc: '通用计算平台兼容认证', logo: '/image/华为鲲鹏logo.png' },
              { title: 'GPU全兼容', desc: '国内90%以上GPU适配', logo: null },
            ].map((cert) => (
              <div key={cert.title} className="p-6 bg-white rounded-2xl border border-gray-100">
                <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  {cert.logo ? (
                    <img src={cert.logo} alt={cert.title} className="w-10 h-10 object-contain" loading="lazy" />
                  ) : (
                    <svg className="w-7 h-7 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  )}
                </div>
                <h3 className="font-bold text-gray-900">{cert.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-950 text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">加入微算，共创未来</h2>
          <p className="text-lg text-gray-400 mb-8">与我们一起推动AI算力普惠化</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary text-base px-10 py-4">联系我们</Link>
            <Link href="/partnership" className="inline-flex items-center px-10 py-4 text-base font-semibold text-white border-2 border-white/20 rounded-full hover:bg-white/10 transition-all">
              成为合伙人
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
