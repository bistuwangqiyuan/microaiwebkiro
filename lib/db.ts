/**
 * Database Connection Configuration
 * 
 * This module provides a singleton Prisma Client instance with optimized
 * connection pooling for serverless environments (Netlify Functions).
 * 
 * Key Features:
 * - Singleton pattern to prevent connection exhaustion
 * - Optimized for serverless/edge functions
 * - Connection pooling configuration
 * - Environment-specific logging
 * 
 * Usage:
 * ```typescript
 * import { prisma } from '@/lib/db';
 * 
 * const users = await prisma.user.findMany();
 * ```
 */

import { PrismaClient } from '@prisma/client';

// Extend global type to include prisma
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

/**
 * Prisma Client Singleton
 * 
 * In development, we use a global variable to prevent creating multiple
 * instances during hot reloading. In production, we create a new instance.
 */
export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

// Store prisma instance in global for development
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

/**
 * Connection Pool Configuration
 * 
 * These settings optimize database connections for serverless environments:
 * - max: Maximum connections in pool (keep low for serverless)
 * - min: Minimum connections (0 for serverless to allow scaling to zero)
 * - idleTimeoutMillis: Release idle connections after 30 seconds
 * - connectionTimeoutMillis: Fail fast if connection takes too long
 */
export const connectionConfig = {
  max: 10, // Maximum connections in pool
  min: 2, // Minimum connections in pool
  idleTimeoutMillis: 30000, // 30 seconds
  connectionTimeoutMillis: 2000, // 2 seconds
};

/**
 * Database Connection Health Check
 * 
 * Verifies that the database connection is working properly.
 * Useful for health check endpoints and debugging.
 * 
 * @returns Promise<boolean> - True if connection is healthy
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
}

/**
 * Graceful Shutdown
 * 
 * Properly closes database connections when the application shuts down.
 * Call this in your shutdown handlers.
 */
export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect();
}

/**
 * Database Connection Info
 * 
 * Returns information about the current database connection.
 * Useful for debugging and monitoring.
 */
export function getDatabaseInfo() {
  const url = process.env.DATABASE_URL || '';
  const isPooled = url.includes('pgbouncer=true');
  const hasSSL = url.includes('sslmode=require');

  // Extract host without exposing credentials
  const hostMatch = url.match(/@([^/]+)/);
  const host = hostMatch ? hostMatch[1] : 'unknown';

  return {
    isPooled,
    hasSSL,
    host,
    environment: process.env.NODE_ENV || 'development',
  };
}

/**
 * Transaction Helper
 * 
 * Provides a convenient way to run multiple operations in a transaction.
 * 
 * @example
 * ```typescript
 * await runTransaction(async (tx) => {
 *   await tx.user.create({ data: { email: 'test@example.com' } });
 *   await tx.feedback.create({ data: { title: 'Test', userId: 1 } });
 * });
 * ```
 */
export async function runTransaction<T>(
  fn: (tx: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>) => Promise<T>
): Promise<T> {
  return await prisma.$transaction(fn);
}

// Export Prisma types for convenience
export type { PrismaClient } from '@prisma/client';
