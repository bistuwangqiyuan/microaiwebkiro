import { neon } from '@neondatabase/serverless';

type SqlClient = ReturnType<typeof neon>;

let cachedClient: SqlClient | null | undefined;

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function getSqlClient(): SqlClient | null {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (!cachedClient) {
    cachedClient = neon(process.env.DATABASE_URL);
  }

  return cachedClient;
}

export function requireSqlClient(): SqlClient {
  const client = getSqlClient();
  if (!client) {
    throw new Error('DATABASE_URL is not configured');
  }

  return client;
}

export async function checkDatabaseConnection(): Promise<boolean> {
  const sql = getSqlClient();
  if (!sql) {
    return false;
  }

  try {
    await sql`select 1 as ok`;
    return true;
  } catch {
    return false;
  }
}

export function getDatabaseInfo() {
  const url = process.env.DATABASE_URL || '';
  let host = 'unknown';

  if (url) {
    try {
      host = new URL(url).host || 'unknown';
    } catch {
      host = 'unknown';
    }
  }

  return {
    host,
    environment: process.env.NODE_ENV || 'development',
    configured: isDatabaseConfigured(),
  };
}
