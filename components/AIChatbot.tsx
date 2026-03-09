'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import type { FormEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getVisitorId, trackSalesEvent } from '@/lib/sales-client';
import { SALES_CHAT_QUICK_ACTIONS, SALES_ENDPOINTS, getProductDisplayName } from '@/lib/sales';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface LeadSignal {
  score: number;
  level: 'A' | 'B' | 'C';
  recommendedProduct: string;
  recommendedCasePath: string;
  nextAction: string;
  shouldCapture: boolean;
  needsContact: boolean;
  extracted?: {
    name?: string;
    phone?: string;
    wechat?: string;
    email?: string;
    companyName?: string;
    industry?: string;
    budgetRange?: string;
    launchTimeline?: string;
    scenario?: string;
    message?: string;
    acceptsLeasing?: boolean;
    needsDataLocal?: boolean;
    inquiryType?: string;
  };
}

function parseNavLinks(text: string) {
  const parts: Array<{ type: 'text'; value: string } | { type: 'nav'; path: string; label: string }> = [];
  const regex = /\[NAV:(\/[^\]|]*)\|([^\]]*)\]/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: text.slice(lastIndex, match.index) });
    }
    parts.push({ type: 'nav', path: match[1], label: match[2] });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', value: text.slice(lastIndex) });
  }

  return parts;
}

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadSignal, setLeadSignal] = useState<LeadSignal | null>(null);
  const [quickActions, setQuickActions] = useState<string[]>([...SALES_CHAT_QUICK_ACTIONS]);
  const [captureOpen, setCaptureOpen] = useState(false);
  const [captureLoading, setCaptureLoading] = useState(false);
  const [captureMessage, setCaptureMessage] = useState('');
  const [captureForm, setCaptureForm] = useState({
    name: '',
    phone: '',
    wechat: '',
    email: '',
    companyName: '',
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const conversationIdRef = useRef(`chat-${crypto.randomUUID()}`);
  const router = useRouter();
  const pathname = usePathname();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!leadSignal?.extracted) {
      return;
    }

    setCaptureForm((prev) => ({
      name: leadSignal.extracted?.name ?? prev.name,
      phone: leadSignal.extracted?.phone ?? prev.phone,
      wechat: leadSignal.extracted?.wechat ?? prev.wechat,
      email: leadSignal.extracted?.email ?? prev.email,
      companyName: leadSignal.extracted?.companyName ?? prev.companyName,
    }));
  }, [leadSignal]);

  async function handleSend(directText?: string) {
    const trimmed = (directText || input).trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: 'user', content: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(SALES_ENDPOINTS.aiChat ?? '/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          sourcePage: pathname,
          visitorId: getVisitorId(),
          conversationId: conversationIdRef.current,
        }),
      });

      if (!res.ok) {
        throw new Error(`AI chat request failed with ${res.status}`);
      }

      const data = await res.json();
      const reply = typeof data.reply === 'string' && data.reply.trim()
        ? data.reply
        : '暂时没有获取到有效答复，您可以继续提问或前往联系页面咨询。[NAV:/contact|前往联系页面]';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      setLeadSignal(data.leadSignal ?? null);
      setQuickActions(Array.isArray(data.quickActions) && data.quickActions.length ? data.quickActions : [...SALES_CHAT_QUICK_ACTIONS]);

      if (data.leadSignal?.needsContact) {
        setCaptureOpen(true);
      }

      await trackSalesEvent({
        path: pathname || '/',
        eventName: 'ai_chat_message',
        eventPayload: {
          level: data.leadSignal?.level,
          recommendedProduct: data.leadSignal?.recommendedProduct,
        },
      });
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '网络连接出错，请稍后重试。您也可以通过邮箱 13426086861@139.com 联系我们。[NAV:/contact|前往联系页面]',
      }]);
    } finally {
      setLoading(false);
    }
  }

  async function handleLeadCapture(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!leadSignal || captureLoading) return;

    setCaptureLoading(true);
    setCaptureMessage('');

    try {
      const response = await fetch(SALES_ENDPOINTS.leadCapture, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceType: 'ai_chat',
          sourcePage: pathname,
          conversationId: conversationIdRef.current,
          visitorId: getVisitorId(),
          ...leadSignal.extracted,
          ...captureForm,
          summary: leadSignal.extracted?.message ?? messages.at(-1)?.content,
          messages: messages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || '留资失败，请稍后重试');
      }

      const productName = getProductDisplayName(leadSignal.recommendedProduct);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `已收到您的联系方式，我已为您沉淀销售线索并建议优先关注 ${productName}。如需继续，可直接查看推荐页面。[NAV:${leadSignal.recommendedCasePath}|查看推荐内容]`,
        },
      ]);
      setCaptureMessage('已成功留资，我们会根据线索优先级安排后续跟进。');
      setCaptureOpen(false);

      await trackSalesEvent({
        path: pathname || '/',
        eventName: 'ai_chat_capture',
        eventPayload: {
          leadLevel: data.leadLevel,
          recommendedProduct: data.recommendedProduct,
        },
      });
    } catch (error) {
      setCaptureMessage(error instanceof Error ? error.message : '留资失败，请稍后重试');
    } finally {
      setCaptureLoading(false);
    }
  }

  function handleNavClick(path: string) {
    setOpen(false);
    router.push(path);
  }

  function renderMessage(content: string) {
    const parts = parseNavLinks(content);
    return parts.map((part, i) => {
      if (part.type === 'nav') {
        return (
          <button
            key={i}
            onClick={() => handleNavClick(part.path)}
            className="inline-flex items-center gap-1 px-2.5 py-1 mt-1.5 text-xs font-medium text-brand-600 bg-brand-50 rounded-lg hover:bg-brand-100 transition-colors"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            {part.label}
          </button>
        );
      }
      return <span key={i}>{part.value}</span>;
    });
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center
          ${open
            ? 'bg-gray-800 hover:bg-gray-700 rotate-0'
            : 'bg-brand-600 hover:bg-brand-700 hover:scale-110 shadow-brand-600/40'
          }`}
        aria-label={open ? '关闭AI助手' : '打开AI助手'}
      >
        {open ? (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        )}
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4"
          style={{ height: 'min(560px, calc(100vh - 8rem))' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-600 to-indigo-600 px-5 py-4 flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">微算智能助手</h3>
              <p className="text-white/70 text-xs">可做选型、测算、试点建议和线索留资</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-900 mb-1">您好！我是微算智能助手</p>
                <p className="text-xs text-gray-500 mb-4">告诉我行业、场景和预算，我可以先帮您判断更适合哪款微算。</p>
                <div className="space-y-2">
                  {quickActions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="block w-full text-left px-3 py-2 text-xs text-gray-600 bg-gray-50 rounded-lg hover:bg-brand-50 hover:text-brand-600 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
                  ${msg.role === 'user'
                    ? 'bg-brand-600 text-white rounded-br-md'
                    : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  }`}
                >
                  {msg.role === 'assistant' ? renderMessage(msg.content) : msg.content}
                </div>
              </div>
            ))}

            {leadSignal?.shouldCapture && (
              <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">AI Sales Signal</p>
                    <h4 className="mt-2 text-sm font-semibold text-gray-900">
                      当前建议优先关注 {getProductDisplayName(leadSignal.recommendedProduct)}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-gray-600">
                      线索评分 {leadSignal.score} 分，当前为 {leadSignal.level} 类。
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCaptureOpen((prev) => !prev)}
                    className="rounded-full border border-brand-200 px-3 py-1.5 text-xs font-semibold text-brand-600 transition hover:bg-white"
                  >
                    {captureOpen ? '收起留资' : '留下联系方式'}
                  </button>
                </div>

                {captureOpen && (
                  <form onSubmit={handleLeadCapture} className="mt-4 grid gap-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        value={captureForm.name}
                        onChange={(event) => setCaptureForm((prev) => ({ ...prev, name: event.target.value }))}
                        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                        placeholder="姓名"
                      />
                      <input
                        value={captureForm.companyName}
                        onChange={(event) => setCaptureForm((prev) => ({ ...prev, companyName: event.target.value }))}
                        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                        placeholder="公司 / 机构"
                      />
                      <input
                        value={captureForm.phone}
                        onChange={(event) => setCaptureForm((prev) => ({ ...prev, phone: event.target.value }))}
                        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                        placeholder="电话"
                      />
                      <input
                        value={captureForm.wechat}
                        onChange={(event) => setCaptureForm((prev) => ({ ...prev, wechat: event.target.value }))}
                        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                        placeholder="微信"
                      />
                    </div>
                    <input
                      value={captureForm.email}
                      onChange={(event) => setCaptureForm((prev) => ({ ...prev, email: event.target.value }))}
                      className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                      placeholder="邮箱"
                    />
                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        disabled={captureLoading}
                        className="rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
                      >
                        {captureLoading ? '提交中...' : '提交并安排跟进'}
                      </button>
                      {captureMessage ? (
                        <p className="text-xs text-gray-600">{captureMessage}</p>
                      ) : (
                        <p className="text-xs text-gray-500">留下任意一种联系方式即可。</p>
                      )}
                    </div>
                  </form>
                )}
              </div>
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
                placeholder="输入您的问题..."
                className="flex-1 px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                disabled={loading}
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 text-white flex items-center justify-center transition-colors flex-shrink-0"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
