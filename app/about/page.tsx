import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '关于我们',
  description: '微算科技——数据不出域的微型算力中心领导者。国内唯一通过硬件加速全闪存储实现算力加速的团队，华为昇腾+鲲鹏双认证。',
};

const milestones = [
  { year: '2024', title: '技术研发启动', desc: '存算分离架构与EBOF全闪存储技术研发' },
  { year: '2025', title: '产品验证', desc: '完成华为对标测试，获得昇腾+鲲鹏双认证' },
  { year: '2025', title: '商用落地', desc: '北京信息科技大学、华为算力中心成功部署' },
  { year: '2026', title: '规模化推广', desc: '启动共享微算事业合伙人计划，全国推广' },
];

const values = [
  {
    title: '数据主权',
    description: '坚守数据不出域的核心理念，确保企业数据主权与商业机密安全',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: '技术创新',
    description: '完全自主知识产权，持续推进存算分离与全闪存储技术的前沿发展',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    title: '普惠算力',
    description: '让AI算力惠及每一家企业，降低数字化转型的技术门槛和资金门槛',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: '共赢生态',
    description: '通过事业合伙人体系，与合作伙伴共同构建算力普惠生态',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
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

      {/* Company Intro */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
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
              <div className="bg-gradient-to-br from-brand-600 to-indigo-600 rounded-3xl p-8 text-white">
                <blockquote className="text-lg font-medium leading-relaxed italic">
                  &ldquo;数据全部存放在您自己的设备中，更安全、更放心。无需上传云端，信息始终掌握在您手里。&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-sm font-bold">W</span>
                  </div>
                  <div>
                    <div className="font-semibold">微算科技</div>
                    <div className="text-sm text-white/70">核心理念</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">核心价值观</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {values.map((value) => (
                  <div key={value.title} className="p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-500 border border-transparent hover:border-gray-100">
                    <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 mb-4">
                      {value.icon}
                    </div>
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
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl border border-gray-100 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-100 to-indigo-100 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-brand-600">孟</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">孟坤</h3>
                  <p className="text-sm text-brand-600 mb-2">项目负责人</p>
                  <p className="text-sm text-gray-500">北京信息科技大学副教授，存储系统方向资深研究者</p>
                </div>
                <div className="p-6 rounded-2xl border border-gray-100 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-100 to-indigo-100 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-brand-600">王</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">王启源</h3>
                  <p className="text-sm text-brand-600 mb-2">专家顾问</p>
                  <p className="text-sm text-gray-500">教授，算力系统与存储架构领域专家</p>
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
              { title: '华为昇腾认证', desc: 'AI处理器兼容认证' },
              { title: '华为鲲鹏认证', desc: '通用计算平台兼容认证' },
              { title: 'GPU全兼容', desc: '国内90%以上GPU适配' },
            ].map((cert) => (
              <div key={cert.title} className="p-6 bg-white rounded-2xl border border-gray-100">
                <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
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
