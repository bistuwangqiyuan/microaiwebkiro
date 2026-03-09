import { getSqlClient } from '@/lib/db';
import { randomUUID } from 'crypto';

const DEFAULT_LOCK_TTL_MS = 30 * 60 * 1000; // 30 minutes

export async function acquireSchedulerLock(
  lockKey: string,
  ttlMs = DEFAULT_LOCK_TTL_MS
): Promise<string | null> {
  const sql = getSqlClient();
  if (!sql) return null;

  const ownerId = randomUUID();
  const expiresAt = new Date(Date.now() + ttlMs).toISOString();

  try {
    await sql`
      delete from scheduler_locks
      where lock_key = ${lockKey} and expires_at < now()
    `;

    const rows = await sql<{ lock_key: string }>`
      insert into scheduler_locks (lock_key, owner_id, expires_at)
      values (${lockKey}, ${ownerId}, ${expiresAt}::timestamptz)
      on conflict (lock_key) do nothing
      returning lock_key
    `;

    return rows.length > 0 ? ownerId : null;
  } catch {
    return null;
  }
}

export async function releaseSchedulerLock(lockKey: string, ownerId: string): Promise<boolean> {
  const sql = getSqlClient();
  if (!sql) return false;

  try {
    const rows = await sql<{ lock_key: string }>`
      delete from scheduler_locks
      where lock_key = ${lockKey} and owner_id = ${ownerId}
      returning lock_key
    `;
    return rows.length > 0;
  } catch {
    return false;
  }
}

export async function isLocked(lockKey: string): Promise<boolean> {
  const sql = getSqlClient();
  if (!sql) return false;

  try {
    const rows = await sql<{ lock_key: string }>`
      select lock_key from scheduler_locks
      where lock_key = ${lockKey} and expires_at > now()
      limit 1
    `;
    return rows.length > 0;
  } catch {
    return false;
  }
}
