'use client';

import { useState } from 'react';
import { getVisitorId, trackSalesEvent } from '@/lib/sales-client';
import { SALES_ENDPOINTS } from '@/lib/sales';

interface PartnershipResult {
  partnerLeadId: string;
  aiScore: number;
  status: string;
  leadLevel: string;
  aiSummary: string;
}

const inputClassName =
  'w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100';

export default function PartnershipApplicationForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    wechat: '',
    email: '',
    city: '',
    industryResources: '',
    hasTeam: true,
    expectedCustomerCount: 10,
    experience: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<PartnershipResult | null>(null);

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(SALES_ENDPOINTS.partnership, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          visitorId: getVisitorId(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || '提交失败，请稍后再试');
      }

      setResult({
        partnerLeadId: data.partnerLeadId,
        aiScore: data.aiScore,
        status: data.status,
        leadLevel: data.leadLevel,
        aiSummary: data.aiSummary,
      });

      await trackSalesEvent({
        path: '/partnership',
        eventName: 'partner_apply',
        eventPayload: {
          leadLevel: data.leadLevel,
          score: data.aiScore,
        },
      });
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : '提交失败，请稍后再试');
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <div className="rounded-[2rem] border border-brand-100 bg-brand-50 p-8">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">区域合作申请已提交</h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">{result.aiSummary}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">AI 评分</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{result.aiScore}</div>
          </div>
          <div className="rounded-2xl bg-white p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">优先级</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{result.leadLevel} 类</div>
          </div>
          <div className="rounded-2xl bg-white p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">下一步</div>
            <div className="mt-2 text-lg font-bold text-gray-900">
              {result.status === 'reviewing' ? '资料审核 -> 区域评估 -> 面谈 -> 签约' : '系统将补充培育资料'}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setResult(null)}
          className="mt-6 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-brand-200 hover:text-brand-600"
        >
          继续提交其他区域
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
      <h2 className="text-2xl font-bold text-white">提交区域合作申请</h2>
      <p className="mt-3 text-sm leading-relaxed text-white/70">
        我们更关注区域资源与执行能力，而不是传统加盟资历。提交后系统会先做一轮自动预筛。
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Field label="姓名" required dark>
          <input
            required
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            className={darkInputClassName}
            placeholder="请输入姓名"
          />
        </Field>
        <Field label="联系电话" required dark>
          <input
            required
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            className={darkInputClassName}
            placeholder="请输入联系电话"
          />
        </Field>
        <Field label="微信" dark>
          <input
            value={form.wechat}
            onChange={(event) => updateField('wechat', event.target.value)}
            className={darkInputClassName}
            placeholder="便于后续沟通"
          />
        </Field>
        <Field label="邮箱" dark>
          <input
            type="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            className={darkInputClassName}
            placeholder="选填"
          />
        </Field>
        <Field label="意向城市 / 区域" required dark>
          <input
            required
            value={form.city}
            onChange={(event) => updateField('city', event.target.value)}
            className={darkInputClassName}
            placeholder="例如北京、天津、长三角"
          />
        </Field>
        <Field label="预计可覆盖客户数" dark>
          <input
            type="number"
            min={0}
            value={form.expectedCustomerCount}
            onChange={(event) => updateField('expectedCustomerCount', Number(event.target.value))}
            className={darkInputClassName}
          />
        </Field>
      </div>

      <div className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 md:grid-cols-2">
        <label className="flex items-start gap-3 text-sm text-white/80">
          <input
            type="radio"
            checked={form.hasTeam}
            onChange={() => updateField('hasTeam', true)}
            className="mt-1 h-4 w-4 border-white/30 bg-transparent text-brand-400 focus:ring-brand-300"
          />
          <span>已有团队，可以立即推进区域拓展</span>
        </label>
        <label className="flex items-start gap-3 text-sm text-white/80">
          <input
            type="radio"
            checked={!form.hasTeam}
            onChange={() => updateField('hasTeam', false)}
            className="mt-1 h-4 w-4 border-white/30 bg-transparent text-brand-400 focus:ring-brand-300"
          />
          <span>暂未组建团队，希望先评估合作模式</span>
        </label>
      </div>

      <div className="mt-6">
        <Field label="区域资源说明" required dark>
          <textarea
            required
            rows={4}
            value={form.industryResources}
            onChange={(event) => updateField('industryResources', event.target.value)}
            className={`${darkInputClassName} resize-none`}
            placeholder="例如制造业园区、医院资源、高校资源、协会渠道、本地服务网络"
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field label="过往经验" dark>
          <textarea
            rows={3}
            value={form.experience}
            onChange={(event) => updateField('experience', event.target.value)}
            className={`${darkInputClassName} resize-none`}
            placeholder="例如企业服务、渠道管理、产业园合作等经验"
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field label="补充说明" dark>
          <textarea
            rows={3}
            value={form.message}
            onChange={(event) => updateField('message', event.target.value)}
            className={`${darkInputClassName} resize-none`}
            placeholder="可补充希望合作的城市、时间安排、团队情况"
          />
        </Field>
      </div>

      {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? '提交中...' : '提交区域合作申请'}
        </button>
        <p className="text-sm text-white/65">提交后 AI 会自动输出一版预筛摘要并进入审核流程。</p>
      </div>
    </form>
  );
}

function Field({
  label,
  required = false,
  dark = false,
  children,
}: {
  label: string;
  required?: boolean;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className={`mb-2 block text-sm font-medium ${dark ? 'text-white/85' : 'text-gray-700'}`}>
        {label}
        {required ? <span className="ml-1 text-red-400">*</span> : null}
      </span>
      {children}
    </label>
  );
}

const darkInputClassName =
  'w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-brand-300 focus:ring-2 focus:ring-brand-400/30';
