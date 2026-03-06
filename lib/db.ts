/**
 * Database connection placeholder.
 * Will be configured when Neon PostgreSQL is set up via Netlify.
 */

export async function checkDatabaseConnection(): Promise<boolean> {
  if (!process.env.DATABASE_URL) {
    return false;
  }
  return true;
}

export function getDatabaseInfo() {
  const url = process.env.DATABASE_URL || '';
  const hostMatch = url.match(/@([^/]+)/);
  const host = hostMatch ? hostMatch[1] : 'unknown';

  return {
    host,
    environment: process.env.NODE_ENV || 'development',
    configured: !!process.env.DATABASE_URL,
  };
}
