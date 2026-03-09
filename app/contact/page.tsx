import Image from 'next/image';
import LeadCaptureForm from '@/components/sales/LeadCaptureForm';

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="section-container text-center">
          <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">CONTACT</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">联系我们</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            告诉我们您的业务场景、预算和上线时间，系统会先输出一版适合的微算建议摘要。
          </p>
        </div>
      </section>

      <section className="pb-20 lg:pb-32 bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">联系方式</h2>
                <div className="space-y-6">
                  {[
                    {
                      label: '电子邮件',
                      value: '13426086861@139.com',
                      href: 'mailto:13426086861@139.com',
                      icon: (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      ),
                    },
                    {
                      label: '联系电话',
                      value: '134-2608-6861',
                      href: 'tel:13426086861',
                      icon: (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      ),
                    },
                    {
                      label: '公司地址',
                      value: '中国 北京市',
                      icon: (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                      ),
                    },
                    {
                      label: '工作时间',
                      value: '周一至周五 9:00-18:00',
                      icon: (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ),
                    },
                  ].map((info) => (
                    <div key={info.label} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{info.label}</p>
                        {'href' in info && info.href ? (
                          <a href={info.href} className="font-medium text-gray-900 hover:text-brand-600 transition-colors">{info.value}</a>
                        ) : (
                          <p className="font-medium text-gray-900">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl text-center">
                <h3 className="font-bold text-gray-900 mb-3">微信联系</h3>
                <p className="text-sm text-gray-500 mb-4">扫描二维码添加微信，获取更多信息</p>
                <Image
                  src="/image/微信联系二维码.png"
                  alt="微算科技微信联系二维码"
                  width={180}
                  height={180}
                  className="rounded-xl mx-auto"
                />
              </div>

              <div className="p-6 bg-brand-50 rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-2">融资租赁快速试点</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  融资租赁模式下，启动费用仅需 <span className="font-bold text-brand-600">2,000元/月</span>，
                  即可享 1P 算力，相当于拥有约 4 万元的 ChatGPT Token 使用额度。
                </p>
                <a
                  href="/contact?intent=leasing&product=wecalc-b"
                  className="inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                >
                  直接提交融资需求
                </a>
              </div>

              <div className="p-6 rounded-2xl border border-gray-100 bg-white">
                <h3 className="font-bold text-gray-900 mb-2">建议优先提交的信息</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>行业和具体 AI 场景，例如影像推理、教学实训、AI 质检</li>
                  <li>是否要求数据不出域，以及预计上线时间</li>
                  <li>预算范围，是否接受融资租赁或试点启动</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-3">
              <LeadCaptureForm
                sourcePage="/contact"
                submitLabel="提交咨询并生成建议"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
