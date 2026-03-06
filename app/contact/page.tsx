'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

const inquiryTypes = [
  { value: 'product', label: '产品咨询' },
  { value: 'partnership', label: '合伙人申请' },
  { value: 'technical', label: '技术支持' },
  { value: 'sales', label: '商务合作' },
  { value: 'other', label: '其他' },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="section-container text-center">
          <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">CONTACT</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">联系我们</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            无论是产品咨询、技术支持还是合作洽谈，我们随时为您服务
          </p>
        </div>
      </section>

      <section className="pb-20 lg:pb-32 bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">联系方式</h2>
                <div className="space-y-6">
                  {[
                    {
                      label: '电子邮件',
                      value: 'contact@wecalc.com',
                      icon: (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      ),
                    },
                    {
                      label: '联系电话',
                      value: '+86 400-XXX-XXXX',
                      icon: (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      ),
                    },
                    {
                      label: '公司地址',
                      value: '中国 北京市 朝阳区',
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
                        <p className="font-medium text-gray-900">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-brand-50 rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-2">融资租赁</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  启动费用仅需 <span className="font-bold text-brand-600">5,000元/月</span>，
                  无需一次性大额投入，即可享受本地化AI算力服务。
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="text-center py-20 px-8 bg-gray-50 rounded-3xl">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">提交成功！</h3>
                  <p className="text-gray-500 mb-8">我们会在1-2个工作日内与您联系</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary"
                  >
                    继续提交
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-gray-50 rounded-3xl p-8 md:p-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">在线咨询</h2>

                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        姓名 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-sm"
                        placeholder="请输入您的姓名"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        邮箱 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-sm"
                        placeholder="请输入您的邮箱"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        电话
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-sm"
                        placeholder="请输入您的联系电话"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        公司
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-sm"
                        placeholder="请输入您的公司名称"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="inquiry_type" className="block text-sm font-medium text-gray-700 mb-2">
                      咨询类型 <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="inquiry_type"
                      name="inquiry_type"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-sm"
                    >
                      <option value="">请选择咨询类型</option>
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-8">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      留言内容 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-sm resize-none"
                      placeholder="请详细描述您的需求..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        提交中...
                      </>
                    ) : (
                      '提交咨询'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
