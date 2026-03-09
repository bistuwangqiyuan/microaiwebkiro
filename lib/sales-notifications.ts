const WEBHOOK_KEYS = [
  'SALES_NOTIFICATION_WEBHOOK',
  'FEISHU_WEBHOOK_URL',
  'LARK_WEBHOOK_URL',
  'WECHAT_BOT_WEBHOOK_URL',
] as const;

function getWebhookUrl() {
  for (const key of WEBHOOK_KEYS) {
    const value = process.env[key];
    if (value) {
      return value;
    }
  }

  return null;
}

export async function sendSalesNotification(params: {
  title: string;
  level?: string;
  summary: string;
  fields?: Array<{ label: string; value: string | number | boolean | null | undefined }>;
}) {
  const webhookUrl = getWebhookUrl();
  const lines = [
    params.title,
    params.level ? `优先级：${params.level}` : null,
    params.summary,
    ...(params.fields ?? [])
      .filter((item) => item.value !== undefined && item.value !== null && item.value !== '')
      .map((item) => `${item.label}：${String(item.value)}`),
  ].filter(Boolean);

  if (!webhookUrl) {
    console.info('[Sales Notification]', lines.join('\n'));
    return { delivered: false };
  }

  const payload = {
    msg_type: 'text',
    content: {
      text: lines.join('\n'),
    },
  };

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`Sales notification failed: ${response.status} ${errorText}`);
  }

  return { delivered: true };
}
