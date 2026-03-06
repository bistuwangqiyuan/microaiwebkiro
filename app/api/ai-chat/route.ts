import { NextRequest, NextResponse } from 'next/server';
import { COMPANY_INFO } from '@/lib/constants';
import { financingPlan, productCatalog } from '@/lib/product-catalog';

const productPrompt = productCatalog
  .map(
    (product) =>
      `- ${product.fullName}（${product.price}，${product.priceNote}）：${product.quickSpecs.join('，')}，适合${product.scenes.slice(0, 2).join('、')}`
  )
  .join('\n');

const detailPrompt = productCatalog
  .map((product) => `- ${product.href}：${product.fullName}详情、规格、适用场景与交付方式`)
  .join('\n');

const SYSTEM_PROMPT = `你是微算科技的AI智能客服助手"微算小助手"。你友好、专业、高效地回答用户关于微算科技产品、技术、服务等方面的问题，并帮助他们导航到网站的相关页面。

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
- /（首页）：公司概览、产品总览、技术亮点、融资租赁模式
- /products（产品中心）：产品矩阵总览、核心特性、产品对比表
${detailPrompt}
- /technology（核心技术）：存算分离架构、EBOF 全闪存储技术详解
- /solutions（解决方案）：金融、医疗、教育、制造、政务、自动驾驶行业方案
- /case-study（降本案例）：1E 与 1P 场景下的成本对比、三年 TCO 与部署周期分析
- /about（关于我们）：公司介绍、核心团队、发展历程、资质认证、荣誉奖项
- /partnership（事业合伙人）：合伙人权益、收益模式、加盟流程
- /news（新闻资讯）：公司动态、行业资讯、技术分享
- /contact（联系我们）：联系方式、微信二维码、在线咨询表单

回复规则：
1. 始终用中文回复，语气友好专业
2. 回答要简洁有力，突出微算的核心优势：数据不出域、自主知识产权、高性能低成本
3. 当用户的问题涉及特定页面内容时，在回复末尾添加导航建议
4. 导航建议格式：[NAV:/路径|显示文本]，例如 [NAV:/products|查看产品详情]
5. 不知道的信息不要编造，建议用户联系客服
6. 每次回复控制在200字以内`;

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

  return `${product.fullName}适合${product.scenes.slice(0, 3).join('、')}，核心配置为${product.quickSpecs.slice(0, 3).join('，')}。参考价格${product.price}，${product.priceNote}。[NAV:${product.href}|查看${product.name}详情]`;
}

function getFallbackReply(userMessages: ChatMessage[]) {
  const latestUserMessage = [...userMessages].reverse().find((message) => message.role === 'user')?.content ?? '';
  const normalized = normalizeText(latestUserMessage);

  if (!latestUserMessage) {
    return `微算提供数据不出域的微型算力中心，覆盖微算-B、微算-P、微算-E 三类产品，支持本地部署、线性扩展和融资租赁。[NAV:/products|查看产品中心]`;
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
    return `微算支持融资租赁模式，启动费用仅 2,000 元/月即可享 1P 算力，约等于 4 万元的 ChatGPT Token 使用额度，适合低门槛启动本地 AI 能力。[NAV:/contact|咨询融资租赁方案]`;
  }

  if (containsAny(normalized, ['降本', 'tco', '成本对比', '成本案例', '1e算力', '案例分析'])) {
    return `微算已提供专门的降本案例页，展示 1E 算力建设与 1P 视频生成 AI 场景的三年 TCO、部署周期和数据不出域优势。[NAV:/case-study|查看降本案例]`;
  }

  if (containsAny(normalized, ['产品', '型号', '版本', '矩阵', '有哪些'])) {
    return `微算目前有三类产品：微算-B 面向入门试点与教学实训，微算-P 面向中型训练与工业边缘计算，微算-E 面向大规模模型训练与 HPC。[NAV:/products|查看产品中心]`;
  }

  if (containsAny(normalized, ['数据不出域', '本地部署', '本地化', '云端', '安全'])) {
    return `数据不出域指系统部署在客户单位内部，数据保存在自有设备中，不必上传公有云，从源头降低泄露风险并更容易满足合规要求。[NAV:/technology|了解核心技术]`;
  }

  if (containsAny(normalized, ['技术', '存算分离', 'ebof', '全闪', 'nvme', 'rocev2'])) {
    return `微算核心是存算分离架构与 EBOF 全闪存储，通过 NVMe-oF、RoCEv2 等能力提升数据加载效率、吞吐与扩展效率，同时降低综合 TCO。[NAV:/technology|查看技术详情]`;
  }

  if (containsAny(normalized, ['部署', '交付', '上线', '多久', '周期'])) {
    return `微算支持交钥匙交付，典型项目 48-72 小时即可完成部署上线，并可从单台微算平滑扩展到多节点集群。[NAV:/products|查看产品交付方案]`;
  }

  if (containsAny(normalized, ['合伙人', '事业合伙人', '加盟', '合作'])) {
    return `微算提供共享微算事业合伙人计划，支持区域合作、生态共建与业务增长协同，具体可查看权益与流程说明。[NAV:/partnership|了解合伙人计划]`;
  }

  if (containsAny(normalized, ['联系', '电话', '邮箱', '咨询', '报价'])) {
    return `欢迎通过邮箱 ${COMPANY_INFO.email} 或电话 ${COMPANY_INFO.phone} 联系我们，我们也可以根据场景提供产品与融资方案建议。[NAV:/contact|前往联系页面]`;
  }

  return `微算提供数据不出域的微型算力中心，覆盖微算-B、微算-P、微算-E 三类产品，支持本地部署、线性扩展和融资租赁。您可以继续问我产品、技术、部署或合作问题。[NAV:/products|查看产品中心]`;
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
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: provider.model,
        messages,
        temperature: 0.7,
        max_tokens: 800,
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

    const messages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...userMessages.slice(-10),
    ];

    const configuredProviders = PROVIDERS.filter((provider) => Boolean(process.env[provider.keyEnv]));

    if (configuredProviders.length === 0) {
      return NextResponse.json({
        reply: getFallbackReply(userMessages),
        provider: 'Knowledge Base',
      });
    }

    let lastError = '';
    for (const provider of configuredProviders) {
      try {
        const reply = await callProvider(provider, messages);
        return NextResponse.json({ reply, provider: provider.name });
      } catch (err) {
        lastError = err instanceof Error ? err.message : String(err);
        console.error(`[AI Chat] ${provider.name} failed:`, lastError);
      }
    }

    return NextResponse.json(
      {
        reply: getFallbackReply(userMessages),
        provider: 'Knowledge Base',
        fallback: true,
        error: lastError,
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
