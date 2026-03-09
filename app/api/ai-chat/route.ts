import { NextRequest, NextResponse } from 'next/server';
import { COMPANY_INFO } from '@/lib/constants';
import { financingPlan, productCatalog } from '@/lib/product-catalog';
import { SALES_CHAT_QUICK_ACTIONS, scoreLead, type LeadInput } from '@/lib/sales';

const productPrompt = productCatalog
  .map(
    (product) =>
      `- ${product.fullName}（${product.price}，${product.priceNote}）：${product.quickSpecs.join('，')}，适合${product.scenes.slice(0, 2).join('、')}`
  )
  .join('\n');

const detailPrompt = productCatalog
  .map((product) => `- ${product.href}：${product.fullName}详情、规格、适用场景与交付方式`)
  .join('\n');

const SYSTEM_PROMPT = `你是微算科技的 AI 销售助理“微算小助手”，你的职责不是泛泛而谈，而是帮助用户更快完成产品选型、降本测算、试点启动和合伙人申请。

公司信息：
- 公司名称：微算科技（WeCalc Technology）
- 核心理念：数据不出域的微型算力中心
- 核心技术：存算分离架构 + EBOF 全闪存储（完全自主知识产权）
- 联系邮箱：${COMPANY_INFO.email}
- 联系电话：${COMPANY_INFO.phone}
- 定位：国内唯一通过硬件加速全闪存储实现算力加速的团队

产品矩阵：
${productPrompt}

商业模式：
- 共享微算事业合伙人：零加盟费、共享区域业务增长机会
- 融资租赁：${financingPlan.title}
- 交付模式：48-72 小时交钥匙部署，支持从单台到集群的线性扩展

网站页面结构（用于导航建议）：
- /selection（智能选型）：快速判断推荐产品和启动路径
- /（首页）：公司概览、产品总览、技术亮点、融资租赁模式
- /products（产品中心）：产品矩阵总览、核心特性、产品对比表
${detailPrompt}
- /technology（核心技术）：存算分离架构、EBOF 全闪存储技术详解
- /solutions（解决方案）：金融、医疗、教育、制造、政务、自动驾驶行业方案
- /case-study（降本案例）：1E 与 1P 场景下的成本对比、三年 TCO 与部署周期分析
- /partnership（事业合伙人）：合伙人权益、收益模式、加盟流程
- /contact（联系我们）：提交需求、生成建议摘要与销售跟进

回复规则：
1. 始终用中文回复，语气专业、直接、友好。
2. 回答优先突出：数据不出域、更快上线、更低综合 TCO、融资租赁低门槛启动。
3. 如果用户信息不足，请最多追问 1 个最关键的问题，优先追问行业、场景、预算或上线时间。
4. 给出建议时，尽量明确推荐微算-B、微算-P 或微算-E 的理由。
5. 当用户适合下一步动作时，主动建议：智能选型、查看降本案例、申请试点、提交需求、申请合伙人。
6. 导航建议格式：[NAV:/路径|显示文本]，例如 [NAV:/selection|去做智能选型]
7. 不知道的信息不要编造，必要时引导去联系页。
8. 每次回复控制在 220 字以内。`;

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface APIProvider {
  name: string;
  url: string;
  model: string;
  keyEnv: string;
}

interface LeadSignal {
  score: number;
  level: 'A' | 'B' | 'C';
  recommendedProduct: 'wecalc-b' | 'wecalc-p' | 'wecalc-e';
  recommendedCasePath: string;
  nextAction: string;
  shouldCapture: boolean;
  needsContact: boolean;
  extracted: Partial<LeadInput>;
}

const PROVIDERS: APIProvider[] = [
  { name: 'DeepSeek', url: 'https://api.deepseek.com/chat/completions', model: 'deepseek-chat', keyEnv: 'DEEPSEEK_API_KEY' },
  { name: 'GLM', url: 'https://open.bigmodel.cn/api/paas/v4/chat/completions', model: 'glm-4-flash', keyEnv: 'GLM_API_KEY' },
  { name: 'Moonshot', url: 'https://api.moonshot.cn/v1/chat/completions', model: 'moonshot-v1-8k', keyEnv: 'MOONSHOT_API_KEY' },
  { name: 'Tongyi', url: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', model: 'qwen-plus', keyEnv: 'TONGYI_API_KEY' },
  { name: 'Tencent', url: 'https://api.hunyuan.cloud.tencent.com/v1/chat/completions', model: 'hunyuan-lite', keyEnv: 'TENCENT_API_KEY' },
  { name: 'Spark', url: 'https://spark-api-open.xf.cn/v1/chat/completions', model: 'generalv3.5', keyEnv: 'SPARK_API_KEY' },
];

function normalizeText(text: string) {
  return text.toLowerCase().replace(/\s+/g, '');
}

function containsAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(normalizeText(keyword)));
}

function buildProductReply(slug: 'wecalc-b' | 'wecalc-p' | 'wecalc-e') {
  const product = productCatalog.find((item) => item.slug === slug);

  if (!product) {
    return `欢迎通过邮箱 ${COMPANY_INFO.email} 或电话 ${COMPANY_INFO.phone} 联系我们。[NAV:/contact|前往联系页面]`;
  }

  return `${product.fullName}适合${product.scenes.slice(0, 2).join('、')}，核心配置为${product.quickSpecs.slice(0, 3).join('，')}。参考价格${product.price}，${product.priceNote}。[NAV:${product.href}|查看${product.name}详情]`;
}

function detectIndustry(text: string) {
  const entries = [
    { keyword: '制造', value: '制造' },
    { keyword: '工厂', value: '制造' },
    { keyword: '医疗', value: '医疗' },
    { keyword: '医院', value: '医疗' },
    { keyword: '金融', value: '金融' },
    { keyword: '银行', value: '金融' },
    { keyword: '高校', value: '高校' },
    { keyword: '教育', value: '教育' },
    { keyword: '学校', value: '教育' },
    { keyword: '科研', value: '科研' },
    { keyword: '政务', value: '政务' },
    { keyword: '自动驾驶', value: '自动驾驶' },
  ];

  return entries.find((item) => text.includes(item.keyword.toLowerCase()))?.value;
}

function detectBudgetRange(text: string) {
  if (text.includes('500万') || text.includes('千万') || text.includes('上百万') || text.includes('数百万')) {
    return '500万以上';
  }
  if (text.includes('200万') || text.includes('300万') || text.includes('400万')) {
    return '200-500万';
  }
  if (text.includes('50万') || text.includes('100万') || text.includes('150万')) {
    return '50-200万';
  }
  if (text.includes('30万') || text.includes('40万')) {
    return '30-50万';
  }
  if (text.includes('预算有限') || text.includes('试点')) {
    return '30万以下';
  }
  return undefined;
}

function detectLaunchTimeline(text: string) {
  if (text.includes('一周') || text.includes('两周') || text.includes('一个月') || text.includes('30天')) {
    return '30天内';
  }
  if (text.includes('90天') || text.includes('三个月')) {
    return '90天内';
  }
  if (text.includes('半年')) {
    return '半年内';
  }
  if (text.includes('一年')) {
    return '一年内';
  }
  return undefined;
}

function extractName(text: string) {
  const match = text.match(/我叫([\u4e00-\u9fa5A-Za-z0-9_-]{2,12})/);
  return match?.[1];
}

function extractCompany(text: string) {
  const match = text.match(/(?:我们是|来自|公司是)([\u4e00-\u9fa5A-Za-z0-9（）()\-]{2,30})/);
  return match?.[1];
}

function extractPhone(text: string) {
  return text.match(/1[3-9]\d{9}/)?.[0];
}

function extractWechat(text: string) {
  return text.match(/(?:微信|wechat)[:：]?\s*([A-Za-z0-9_-]{4,30})/i)?.[1];
}

function buildQualificationQuestion(signal: LeadSignal) {
  const extracted = signal.extracted;

  if (!extracted.industry) {
    return '您属于制造、高校、医疗、金融还是其他行业？';
  }

  if (!extracted.scenario) {
    return '您最想先落地的 AI 场景是什么？';
  }

  if (!extracted.budgetRange && !extracted.acceptsLeasing) {
    return '您更倾向先试点、融资租赁，还是直接正式采购？';
  }

  if (signal.needsContact) {
    return '如果方便，您也可以直接留下电话或微信，我先帮您沉淀方案摘要。';
  }

  return '';
}

function extractLeadSignal(messages: ChatMessage[], sourcePage?: string): LeadSignal {
  const userMessages = messages.filter((item) => item.role === 'user');
  const latestUserMessage = userMessages.at(-1)?.content ?? '';
  const combinedText = normalizeText(userMessages.map((item) => item.content).join(' '));
  const latestText = normalizeText(latestUserMessage);

  const extracted: Partial<LeadInput> = {
    sourceType: 'ai_chat',
    sourcePage,
    name: extractName(latestUserMessage),
    phone: extractPhone(latestUserMessage),
    wechat: extractWechat(latestUserMessage),
    companyName: extractCompany(latestUserMessage),
    industry: detectIndustry(combinedText),
    budgetRange: detectBudgetRange(combinedText),
    launchTimeline: detectLaunchTimeline(combinedText),
    scenario: latestUserMessage.length >= 4 ? latestUserMessage.slice(0, 120) : undefined,
    needsDataLocal: containsAny(combinedText, ['数据不出域', '本地部署', '本地化', '合规', '安全']),
    acceptsLeasing: containsAny(combinedText, ['融资租赁', '租赁', '2000', '2,000', '试点']),
    inquiryType: containsAny(combinedText, ['合伙人', '加盟', '合作伙伴']) ? 'partnership' : 'sales',
    message: latestUserMessage,
  };

  const score = scoreLead(extracted);

  return {
    score: score.score,
    level: score.level,
    recommendedProduct: score.recommendedProduct,
    recommendedCasePath: score.recommendedCasePath,
    nextAction: score.nextAction,
    shouldCapture: score.score >= 50 || Boolean(extracted.phone || extracted.wechat || extracted.email),
    needsContact: !extracted.phone && !extracted.wechat && score.score >= 50,
    extracted: {
      ...extracted,
      scenario: containsAny(latestText, ['你好', '您好']) ? undefined : extracted.scenario,
    },
  };
}

function getFallbackReply(userMessages: ChatMessage[], signal: LeadSignal) {
  const latestUserMessage = [...userMessages].reverse().find((message) => message.role === 'user')?.content ?? '';
  const normalized = normalizeText(latestUserMessage);

  if (!latestUserMessage) {
    return `我可以帮您做产品选型、降本测算、试点建议和合伙人预筛。先告诉我行业、场景和预算，我会判断更适合微算-B、P 还是 E。[NAV:/selection|去做智能选型]`;
  }

  if (containsAny(normalized, ['帮我选型', '智能选型', '推荐型号'])) {
    return `可以，我会根据行业、场景、预算和上线时间帮您判断更适合哪款微算。${buildQualificationQuestion(signal)}[NAV:/selection|去做智能选型]`;
  }

  if (containsAny(normalized, ['微算-b', '微算b', '基础版', 'wecalc-b', 'b版'])) {
    return buildProductReply('wecalc-b');
  }

  if (containsAny(normalized, ['微算-p', '微算p', '专业版', 'wecalc-p', 'p版'])) {
    return buildProductReply('wecalc-p');
  }

  if (containsAny(normalized, ['微算-e', '微算e', '企业版', 'wecalc-e', 'e版'])) {
    return buildProductReply('wecalc-e');
  }

  if (containsAny(normalized, ['融资租赁', '租赁', '2000', '2,000', '1p', 'token'])) {
    return `微算支持融资租赁模式，启动费用仅 2,000 元/月即可享 1P 算力，适合预算有限但希望先跑通 AI 场景的客户。[NAV:/contact?intent=leasing&product=wecalc-b|咨询融资租赁方案]`;
  }

  if (containsAny(normalized, ['降本', 'tco', '成本对比', '成本案例', '案例分析'])) {
    return `微算已提供专门的降本案例页，展示 1E 建设和 1P 视频生成 AI 场景的三年 TCO、部署周期和数据不出域优势。[NAV:/case-study|查看降本案例]`;
  }

  if (containsAny(normalized, ['产品', '型号', '版本', '矩阵', '有哪些'])) {
    return `微算目前有三类产品：微算-B 面向入门试点，微算-P 面向中型训练与生产部署，微算-E 面向大规模训练与科研计算。${buildQualificationQuestion(signal)}[NAV:/products|查看产品中心]`;
  }

  if (containsAny(normalized, ['数据不出域', '本地部署', '本地化', '云端', '安全'])) {
    return `数据不出域指系统部署在客户单位内部，数据保存在自有设备中，不必上传公有云，更容易满足合规要求。[NAV:/technology|了解核心技术]`;
  }

  if (containsAny(normalized, ['技术', '存算分离', 'ebof', '全闪', 'nvme', 'rocev2'])) {
    return `微算核心是存算分离架构与 EBOF 全闪存储，能提升数据加载效率、吞吐与扩展效率，同时降低综合 TCO。[NAV:/technology|查看技术详情]`;
  }

  if (containsAny(normalized, ['部署', '交付', '上线', '多久', '周期'])) {
    return `微算支持交钥匙交付，典型项目 48-72 小时即可完成部署上线，并可从单台微算平滑扩展到多节点集群。[NAV:/products|查看产品交付方案]`;
  }

  if (containsAny(normalized, ['合伙人', '事业合伙人', '加盟', '合作'])) {
    return `微算提供共享微算事业合伙人计划，支持区域合作、生态共建与业务增长协同。${buildQualificationQuestion(signal)}[NAV:/partnership|了解合伙人计划]`;
  }

  if (containsAny(normalized, ['联系', '电话', '邮箱', '咨询', '报价'])) {
    return `欢迎通过邮箱 ${COMPANY_INFO.email} 或电话 ${COMPANY_INFO.phone} 联系我们。若您告知行业、场景和预算，我也能先帮您判断更适合的方案。[NAV:/contact|前往联系页面]`;
  }

  return `我理解您在评估本地 AI 算力方案。当前更建议您优先考虑 ${signal.recommendedProduct === 'wecalc-b' ? '微算-B' : signal.recommendedProduct === 'wecalc-p' ? '微算-P' : '微算-E'}。${buildQualificationQuestion(signal)}[NAV:/selection|去做智能选型]`;
}

function finalizeReply(reply: string, signal: LeadSignal) {
  let nextReply = reply.trim();

  if (signal.needsContact && !nextReply.includes('电话') && !nextReply.includes('微信')) {
    nextReply = `${nextReply} 如果方便，可直接留下电话或微信，我先帮您沉淀一版建议摘要。`;
  }

  return nextReply;
}

async function callProvider(provider: APIProvider, messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env[provider.keyEnv];
  if (!apiKey) throw new Error(`${provider.name} API key not configured`);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(provider.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: provider.model,
        messages,
        temperature: 0.5,
        max_tokens: 600,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(`${provider.name} returned ${res.status}: ${errText}`);
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content;
    if (!reply) throw new Error(`${provider.name} returned empty response`);
    return reply;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userMessages: ChatMessage[] = Array.isArray(body.messages) ? body.messages : [];
    const sourcePage = typeof body.sourcePage === 'string' ? body.sourcePage : '/';
    const leadSignal = extractLeadSignal(userMessages, sourcePage);

    const messages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...userMessages.slice(-10),
    ];

    const configuredProviders = PROVIDERS.filter((provider) => Boolean(process.env[provider.keyEnv]));

    if (configuredProviders.length === 0) {
      return NextResponse.json({
        reply: finalizeReply(getFallbackReply(userMessages, leadSignal), leadSignal),
        provider: 'Knowledge Base',
        leadSignal,
        quickActions: SALES_CHAT_QUICK_ACTIONS,
      });
    }

    let lastError = '';
    for (const provider of configuredProviders) {
      try {
        const reply = await callProvider(provider, messages);
        return NextResponse.json({
          reply: finalizeReply(reply, leadSignal),
          provider: provider.name,
          leadSignal,
          quickActions: SALES_CHAT_QUICK_ACTIONS,
        });
      } catch (err) {
        lastError = err instanceof Error ? err.message : String(err);
        console.error(`[AI Chat] ${provider.name} failed:`, lastError);
      }
    }

    return NextResponse.json(
      {
        reply: finalizeReply(getFallbackReply(userMessages, leadSignal), leadSignal),
        provider: 'Knowledge Base',
        fallback: true,
        error: lastError,
        leadSignal,
        quickActions: SALES_CHAT_QUICK_ACTIONS,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { reply: '请求处理出错，请稍后重试。', error: 'Invalid request' },
      { status: 400 }
    );
  }
}
