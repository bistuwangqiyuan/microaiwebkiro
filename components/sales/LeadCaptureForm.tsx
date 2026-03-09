'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getUtmParams, getVisitorId, trackSalesEvent } from '@/lib/sales-client';
import {
  BUDGET_RANGE_OPTIONS,
  LAUNCH_TIMELINE_OPTIONS,
  SALES_ENDPOINTS,
  SALES_INDUSTRIES,
  getProductDisplayName,
} from '@/lib/sales';

type InquiryType = 'product' | 'sales' | 'technical' | 'partnership' | 'other';

interface LeadCaptureFormProps {
  sourcePage: string;
  title?: string;
  description?: string;
  submitLabel?: string;
  compact?: boolean;
  inquiryTypeDefault?: InquiryType;
}

interface SubmissionResult {
  leadId: string;
  leadScore: number;
  leadLevel: string;
  recommendedProduct: string;
  recommendedCasePath: string;
  nextAction: string;
  aiSummary: string;
}

const inquiryTypeOptions: Array<{ value: InquiryType; label: string }> = [
  { value: 'product', label: '产品咨询' },
  { value: 'sales', label: '商务合作' },
  { value: 'technical', label: '技术支持' },
  { value: 'partnership', label: '合伙人咨询' },
  { value: 'other', label: '其他' },
];

const defaultForm = {
  name: '',
  email: '',
  phone: '',
  wechat: '',
  companyName: '',
  industry: '',
  city: '',
  position: '',
  inquiryType: 'sales' as InquiryType,
  scenario: '',
  budgetRange: '',
  launchTimeline: '',
  acceptsLeasing: false,
  needsDataLocal: false,
  message: '',
};

function getActionLabel(nextAction: string) {
  if (nextAction === 'founder_followup') return '建议尽快预约沟通';
  if (nextAction === 'ai_nurture_and_book_meeting') return '建议先接收方案摘要并安排沟通';
  return '系统将进入自动培育流程';
}

export default function LeadCaptureForm({
  sourcePage,
  title = '告诉我们您的业务场景，我们会推荐更适合的微算方案',
  description = '提交后系统会先生成一版 AI 建议摘要，并根据行业、预算、上线时间判断更适合的产品路径。',
  submitLabel = '提交需求',
  compact = false,
  inquiryTypeDefault = 'sales',
}: LeadCaptureFormProps) {
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ ...defaultForm, inquiryType: inquiryTypeDefault });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<SubmissionResult | null>(null);

  useEffect(() => {
    const product = searchParams.get('product');
    const intent = searchParams.get('intent');
    const industry = searchParams.get('industry');

    setForm((prev) => ({
      ...prev,
      industry: industry ?? prev.industry,
      scenario:
        prev.scenario ||
        (product ? `希望了解 ${getProductDisplayName(product)} 的${intent ? `${intent}方案` : '落地方案'}` : prev.scenario),
    }));
  }, [searchParams]);

  const productName = useMemo(
    () => (result ? getProductDisplayName(result.recommendedProduct) : ''),
    [result]
  );

  function updateField<K extends keyof typeof defaultForm>(key: K, value: (typeof defaultForm)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(SALES_ENDPOINTS.contact, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          sourceType: 'form',
          sourcePage,
          visitorId: getVisitorId(),
          ...getUtmParams(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || '提交失败，请稍后重试');
      }

      setResult({
        leadId: data.leadId,
        leadScore: data.leadScore,
        leadLevel: data.leadLevel,
        recommendedProduct: data.recommendedProduct,
        recommendedCasePath: data.recommendedCasePath,
        nextAction: data.nextAction,
        aiSummary: data.aiSummary,
      });

      setForm({ ...defaultForm, inquiryType: inquiryTypeDefault });

      await trackSalesEvent({
        path: sourcePage,
        eventName: 'lead_submit',
        eventPayload: {
          leadLevel: data.leadLevel,
          recommendedProduct: data.recommendedProduct,
        },
      });
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : '提交失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <div className="rounded-[2rem] border border-green-100 bg-green-50/70 p-8">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">我们已收到您的需求</h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          系统已生成初步建议摘要，并将根据意向级别触发对应的跟进动作。
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">AI 建议</div>
            <div className="mt-3 text-lg font-bold text-gray-900">{productName}</div>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{result.aiSummary}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">跟进动作</div>
            <div className="mt-3 text-2xl font-bold text-gray-900">{result.leadLevel} 类线索</div>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              线索评分 {result.leadScore} 分，{getActionLabel(result.nextAction)}。
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={result.recommendedCasePath} className="btn-secondary">
            查看推荐内容
          </a>
          <button
            type="button"
            onClick={() => setResult(null)}
            className="inline-flex items-center justify-center rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-brand-200 hover:text-brand-600"
          >
            继续提交其他需求
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] bg-gray-50 p-8 md:p-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-500">{description}</p>
      </div>

      <div className={`grid gap-6 ${compact ? 'md:grid-cols-2' : 'sm:grid-cols-2'}`}>
        <Field label="姓名" required>
          <input
            type="text"
            required
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            className={inputClassName}
            placeholder="请输入您的姓名"
          />
        </Field>
        <Field label="邮箱" required>
          <input
            type="email"
            required
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            className={inputClassName}
            placeholder="请输入您的邮箱"
          />
        </Field>
        <Field label="电话">
          <input
            type="tel"
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            className={inputClassName}
            placeholder="请输入联系电话"
          />
        </Field>
        <Field label="微信">
          <input
            type="text"
            value={form.wechat}
            onChange={(event) => updateField('wechat', event.target.value)}
            className={inputClassName}
            placeholder="选填，用于快速沟通"
          />
        </Field>
        <Field label="公司">
          <input
            type="text"
            value={form.companyName}
            onChange={(event) => updateField('companyName', event.target.value)}
            className={inputClassName}
            placeholder="请输入公司或机构名称"
          />
        </Field>
        <Field label="职位">
          <input
            type="text"
            value={form.position}
            onChange={(event) => updateField('position', event.target.value)}
            className={inputClassName}
            placeholder="例如信息化负责人"
          />
        </Field>
        <Field label="行业">
          <select
            value={form.industry}
            onChange={(event) => updateField('industry', event.target.value)}
            className={inputClassName}
          >
            <option value="">请选择行业</option>
            {SALES_INDUSTRIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
        <Field label="所在城市">
          <input
            type="text"
            value={form.city}
            onChange={(event) => updateField('city', event.target.value)}
            className={inputClassName}
            placeholder="例如北京"
          />
        </Field>
        <Field label="咨询类型">
          <select
            value={form.inquiryType}
            onChange={(event) => updateField('inquiryType', event.target.value as InquiryType)}
            className={inputClassName}
          >
            {inquiryTypeOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="预算区间">
          <select
            value={form.budgetRange}
            onChange={(event) => updateField('budgetRange', event.target.value)}
            className={inputClassName}
          >
            <option value="">请选择预算区间</option>
            {BUDGET_RANGE_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
        <Field label="预计上线时间">
          <select
            value={form.launchTimeline}
            onChange={(event) => updateField('launchTimeline', event.target.value)}
            className={inputClassName}
          >
            <option value="">请选择上线时间</option>
            {LAUNCH_TIMELINE_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
        <Field label="AI 场景" required>
          <input
            type="text"
            required
            value={form.scenario}
            onChange={(event) => updateField('scenario', event.target.value)}
            className={inputClassName}
            placeholder="例如影像推理、AI 质检、教学实训"
          />
        </Field>
      </div>

      <div className="mt-6 grid gap-4 rounded-2xl border border-gray-200 bg-white p-5 md:grid-cols-2">
        <label className="flex items-start gap-3 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.needsDataLocal}
            onChange={(event) => updateField('needsDataLocal', event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
          />
          <span>我要求数据不出域，需要在本地完成部署和处理</span>
        </label>
        <label className="flex items-start gap-3 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.acceptsLeasing}
            onChange={(event) => updateField('acceptsLeasing', event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
          />
          <span>我可以接受融资租赁或分阶段启动方案</span>
        </label>
      </div>

      <div className="mt-6">
        <Field label="补充说明" required>
          <textarea
            required
            rows={compact ? 4 : 5}
            value={form.message}
            onChange={(event) => updateField('message', event.target.value)}
            className={`${inputClassName} resize-none`}
            placeholder="请补充业务规模、并发量、现有环境、机房条件或其他关键信息"
          />
        </Field>
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? '提交中...' : submitLabel}
        </button>
        <p className="text-sm text-gray-500">提交后系统会先做一轮 AI 评分和推荐，便于更快进入跟进流程。</p>
      </div>
    </form>
  );
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-700">
        {label}
        {required ? <span className="ml-1 text-red-500">*</span> : null}
      </span>
      {children}
    </label>
  );
}

const inputClassName =
  'w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100';
