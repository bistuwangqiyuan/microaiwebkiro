import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `你是微算科技的AI智能客服助手"微算小助手"。你友好、专业、高效地回答用户关于微算科技产品、技术、服务等方面的问题，并帮助他们导航到网站的相关页面。

公司信息：
- 公司名称：微算科技（WeCalc Technology）
- 核心理念：数据不出域的微型算力中心
- 核心技术：存算分离架构 + EBOF全闪存储（完全自主知识产权）
- 联系邮箱：13426086861@139.com
- 联系电话：134-2608-6861
- 定位：国内唯一通过硬件加速全闪存储实现算力加速的团队

产品矩阵：
- 微算-B 基础版（约100万元，试点期免费赠送）：2×CPU+可选GPU，4×3.84TB NVMe SSD，适合小型AI推理、教学实训
- 微算-P 专业版（200-500万元，最受欢迎）：多CPU+多GPU集群，16×3.84TB NVMe SSD EBOF，适合中型AI训练、工业边缘计算
- 微算-E 企业版（500万元以上，定制方案）：千卡异构集群，PB级存储，适合大规模模型训练、HPC

商业模式：
- 共享微算事业合伙人：零加盟费、免费获得100台微算设备、股权激励
- 滚动建设正反馈模型：10万→20万→40万…渐进式增长
- 融资租赁：启动费用仅需5,000元/月

网站页面结构（用于导航建议）：
- /（首页）：公司概览、产品总览、技术亮点、商业模式
- /products（产品中心）：三个版本详细规格、对比表
- /technology（核心技术）：存算分离架构、EBOF全闪存储技术详解
- /solutions（解决方案）：金融、医疗、教育、制造、政务、自动驾驶行业方案
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
  { name: 'Moonshot', url: 'https://api.moonshot.cn/v1/chat/completions', model: 'moonshot-v1-8k', keyEnv: 'MOONSHOT_API_KEY' },
  { name: 'Tongyi', url: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', model: 'qwen-plus', keyEnv: 'TONGYI_API_KEY' },
  { name: 'GLM', url: 'https://open.bigmodel.cn/api/paas/v4/chat/completions', model: 'glm-4-flash', keyEnv: 'GLM_API_KEY' },
  { name: 'Tencent', url: 'https://api.hunyuan.cloud.tencent.com/v1/chat/completions', model: 'hunyuan-lite', keyEnv: 'TENCENT_API_KEY' },
  { name: 'Spark', url: 'https://spark-api-open.xf.cn/v1/chat/completions', model: 'generalv3.5', keyEnv: 'SPARK_API_KEY' },
];

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
    const userMessages: ChatMessage[] = body.messages || [];

    const messages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...userMessages.slice(-10),
    ];

    let lastError = '';
    for (const provider of PROVIDERS) {
      try {
        const reply = await callProvider(provider, messages);
        return NextResponse.json({ reply, provider: provider.name });
      } catch (err) {
        lastError = err instanceof Error ? err.message : String(err);
        console.error(`[AI Chat] ${provider.name} failed:`, lastError);
      }
    }

    return NextResponse.json(
      { reply: '抱歉，AI助手暂时无法响应。请通过邮箱 13426086861@139.com 或电话 134-2608-6861 联系我们。[NAV:/contact|前往联系页面]', error: lastError },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { reply: '请求处理出错，请稍后重试。', error: 'Invalid request' },
      { status: 400 }
    );
  }
}
