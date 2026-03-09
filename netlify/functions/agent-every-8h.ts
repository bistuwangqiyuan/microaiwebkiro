import type { Config, Context } from '@netlify/functions';

export default async function handler(req: Request, context: Context) {
  const siteUrl = process.env.URL || process.env.DEPLOY_PRIME_URL || 'http://localhost:3000';
  const secret = process.env.AGENT_RUN_SECRET || '';

  try {
    const response = await fetch(`${siteUrl}/api/agent/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        triggerType: 'scheduled',
        scheduledAt: new Date().toISOString(),
        secret,
      }),
    });

    const result = await response.json();

    console.log('[agent-every-8h] Result:', JSON.stringify(result));

    return new Response(JSON.stringify(result), {
      status: response.ok ? 200 : 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[agent-every-8h] Error:', error);
    return new Response(
      JSON.stringify({
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export const config: Config = {
  schedule: '0 */8 * * *',
};
