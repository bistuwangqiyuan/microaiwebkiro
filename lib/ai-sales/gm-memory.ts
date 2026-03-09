import { getSqlClient } from '@/lib/db';

const GM_NAMESPACE = 'general_manager';

export async function readMemory<T = unknown>(key: string): Promise<T | null> {
  const sql = getSqlClient();
  if (!sql) return null;

  try {
    const rows = await sql<{ memory_value: T }>`
      select memory_value from agent_memory
      where namespace = ${GM_NAMESPACE} and memory_key = ${key}
      limit 1
    `;
    return rows[0]?.memory_value ?? null;
  } catch {
    return null;
  }
}

export async function writeMemory(key: string, value: unknown): Promise<void> {
  const sql = getSqlClient();
  if (!sql) return;

  try {
    await sql`
      insert into agent_memory (namespace, memory_key, memory_value, updated_at)
      values (${GM_NAMESPACE}, ${key}, ${JSON.stringify(value)}::jsonb, now())
      on conflict (namespace, memory_key)
      do update set memory_value = ${JSON.stringify(value)}::jsonb, updated_at = now()
    `;
  } catch (error) {
    console.error('[GM Memory] write failed:', error);
  }
}

export async function getConsecutiveFailures(): Promise<number> {
  const value = await readMemory<{ count: number }>('consecutive_failures');
  return value?.count ?? 0;
}

export async function incrementConsecutiveFailures(): Promise<number> {
  const current = await getConsecutiveFailures();
  const next = current + 1;
  await writeMemory('consecutive_failures', { count: next });
  return next;
}

export async function resetConsecutiveFailures(): Promise<void> {
  await writeMemory('consecutive_failures', { count: 0 });
}

export async function getLastStrategy(): Promise<string | null> {
  const value = await readMemory<{ strategy: string }>('last_strategy');
  return value?.strategy ?? null;
}

export async function setLastStrategy(strategy: string): Promise<void> {
  await writeMemory('last_strategy', { strategy, updatedAt: new Date().toISOString() });
}

export async function getRecentStrategies(limit = 5): Promise<string[]> {
  const sql = getSqlClient();
  if (!sql) return [];

  try {
    const rows = await sql<{ chosen_strategy: string }>`
      select chosen_strategy from gm_decisions
      order by created_at desc
      limit ${limit}
    `;
    return rows.map((r) => r.chosen_strategy);
  } catch {
    return [];
  }
}
