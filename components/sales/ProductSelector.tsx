'use client';

import { useState } from 'react';
import Link from 'next/link';
import { trackSalesEvent } from '@/lib/sales-client';
import {
  BUDGET_RANGE_OPTIONS,
  LAUNCH_TIMELINE_OPTIONS,
  SALES_ENDPOINTS,
  SALES_INDUSTRIES,
  getProductDisplayName,
} from '@/lib/sales';

interface SelectorResult {
  score: number;
  level: string;
  recommendedProduct: string;
  recommendedCasePath: string;
  reasons: string[];
  nextAction: string;
}

const inputClassName =
  'w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100';

export default function ProductSelector() {
  const [form, setForm] = useState({
    industry: '',
    scenario: '',
    budgetRange: '',
    launchTimeline: '',
    acceptsLeasing: true,
    needsDataLocal: true,
    sourcePage: '/selection',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<SelectorResult | null>(null);

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(SALES_ENDPOINTS.leadScore, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '选型失败，请稍后重试');
      }

      setResult({
        score: data.score,
        level: data.level,
        recommendedProduct: data.recommendedProduct,
        recommendedCasePath: data.recommendedCasePath,
        reasons: data.reasons,
        nextAction: data.nextAction,
      });

      await trackSalesEvent({
        path: '/selection',
        eventName: 'selection_complete',
        eventPayload: {
          recommendedProduct: data.recommendedProduct,
          level: data.level,
        },
      });
    } catch (selectionError) {
      setError(selectionError instanceof Error ? selectionError.message : '选型失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr,1.05fr]">
      <form onSubmit={handleSubmit} className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">Smart Selection</p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900">3 个问题，1 分钟判断适合哪款微算</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">
            先告诉系统行业、场景和预算约束，再判断更适合从试点、融资租赁还是正式部署开始。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Field label="行业" required>
            <select
              value={form.industry}
              onChange={(event) => updateField('industry', event.target.value)}
              className={inputClassName}
              required
            >
              <option value="">请选择行业</option>
              {SALES_INDUSTRIES.map((item) => (
                <option key={item} value={item}>
                  {item}
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
          <Field label="数据要求">
            <div className="grid gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="flex items-start gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.needsDataLocal}
                  onChange={(event) => updateField('needsDataLocal', event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                />
                <span>必须数据不出域，在本地部署处理</span>
              </label>
              <label className="flex items-start gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.acceptsLeasing}
                  onChange={(event) => updateField('acceptsLeasing', event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                />
                <span>接受融资租赁或分阶段启动</span>
              </label>
            </div>
          </Field>
        </div>

        <div className="mt-6">
          <Field label="具体场景" required>
            <textarea
              rows={4}
              required
              value={form.scenario}
              onChange={(event) => updateField('scenario', event.target.value)}
              className={`${inputClassName} resize-none`}
              placeholder="例如 AI 质检、医学影像推理、教学实训、本地大模型训练"
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
            {loading ? '分析中...' : '开始智能选型'}
          </button>
          <Link href="/contact?intent=selection" className="btn-secondary">
            直接提交需求
          </Link>
        </div>
      </form>

      <div className="rounded-[2rem] bg-brand-950 p-8 text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-300">Recommendation</p>
        {result ? (
          <>
            <h3 className="mt-4 text-3xl font-bold">{getProductDisplayName(result.recommendedProduct)}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              评分 {result.score} 分，当前判定为 {result.level} 类线索。
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {result.reasons.map((reason) => (
                <div key={reason} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/85">
                  {reason}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm text-white/70">建议动作</div>
              <div className="mt-2 text-xl font-bold text-white">
                {result.nextAction === 'founder_followup' ? '尽快安排负责人沟通' : '先输出方案摘要并引导预约'}
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/contact?intent=selection&product=${result.recommendedProduct}`}
                className="btn-primary"
              >
                获取专属方案
              </Link>
              <Link href={result.recommendedCasePath} className="btn-secondary">
                查看推荐内容
              </Link>
            </div>
          </>
        ) : (
          <div className="mt-8 space-y-4">
            {[
              '预算有限也能从微算-B 融资租赁先跑通一个 AI 场景',
              '生产级项目通常更适合微算-P，兼顾性能、成本与部署速度',
              '区域级训练和科研计算平台更适合微算-E 定制化路线',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/75">
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
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
