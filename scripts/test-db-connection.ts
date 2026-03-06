/**
 * Database Connection Test Script
 * 
 * This script tests the database connection and provides diagnostic information.
 * Run with: npx tsx scripts/test-db-connection.ts
 * 
 * Or add to package.json:
 * "scripts": {
 *   "db:test": "tsx scripts/test-db-connection.ts"
 * }
 */

import { PrismaClient } from '@prisma/client';

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testConnection() {
  log('\n🔍 Testing Database Connection...\n', 'cyan');

  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    log('❌ ERROR: DATABASE_URL environment variable is not set', 'red');
    log('\nPlease set DATABASE_URL in your .env file:', 'yellow');
    log('DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"', 'yellow');
    process.exit(1);
  }

  // Parse connection string (without exposing password)
  const url = process.env.DATABASE_URL;
  const isPooled = url.includes('pgbouncer=true');
  const hasSSL = url.includes('sslmode=require');
  const hostMatch = url.match(/@([^/]+)/);
  const host = hostMatch ? hostMatch[1] : 'unknown';
  const dbMatch = url.match(/\/([^?]+)/);
  const database = dbMatch ? dbMatch[1] : 'unknown';

  log('📋 Connection Configuration:', 'blue');
  log(`   Host: ${host}`);
  log(`   Database: ${database}`);
  log(`   Pooled: ${isPooled ? '✅ Yes (pgbouncer)' : '❌ No'}`);
  log(`   SSL: ${hasSSL ? '✅ Enabled' : '⚠️  Disabled (not recommended)'}`);
  log(`   Environment: ${process.env.NODE_ENV || 'development'}\n`);

  // Create Prisma Client
  const prisma = new PrismaClient({
    log: ['error', 'warn'],
  });

  try {
    // Test 1: Basic connection
    log('Test 1: Basic Connection', 'blue');
    const startTime = Date.now();
    await prisma.$connect();
    const connectTime = Date.now() - startTime;
    log(`✅ Connected successfully (${connectTime}ms)\n`, 'green');

    // Test 2: Query execution
    log('Test 2: Query Execution', 'blue');
    const queryStart = Date.now();
    const result = await prisma.$queryRaw`SELECT version() as version, current_database() as database, current_user as user`;
    const queryTime = Date.now() - queryStart;
    log(`✅ Query executed successfully (${queryTime}ms)`, 'green');
    
    if (Array.isArray(result) && result.length > 0) {
      const info = result[0] as { version: string; database: string; user: string };
      log(`   PostgreSQL Version: ${info.version.split(' ')[0]} ${info.version.split(' ')[1]}`);
      log(`   Database: ${info.database}`);
      log(`   User: ${info.user}\n`);
    }

    // Test 3: Check tables
    log('Test 3: Database Schema', 'blue');
    const tables = await prisma.$queryRaw<Array<{ tablename: string }>>`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename
    `;
    
    if (tables.length === 0) {
      log('⚠️  No tables found (database is empty)', 'yellow');
      log('   Run migrations to create tables: npm run prisma:migrate\n', 'yellow');
    } else {
      log(`✅ Found ${tables.length} table(s):`, 'green');
      tables.forEach((table) => {
        log(`   - ${table.tablename}`);
      });
      log('');
    }

    // Test 4: Connection pool info (if available)
    log('Test 4: Connection Pool', 'blue');
    if (isPooled) {
      log('✅ Using connection pooling (pgbouncer)', 'green');
      log('   Recommended for production/serverless environments\n', 'green');
    } else {
      log('⚠️  Direct connection (no pooling)', 'yellow');
      log('   Consider using pooled connection for production:', 'yellow');
      log('   Add "pgbouncer=true" to your connection string\n', 'yellow');
    }

    // Test 5: Performance check
    log('Test 5: Performance Check', 'blue');
    const perfStart = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    const perfTime = Date.now() - perfStart;
    
    if (perfTime < 50) {
      log(`✅ Excellent performance (${perfTime}ms)\n`, 'green');
    } else if (perfTime < 200) {
      log(`✅ Good performance (${perfTime}ms)\n`, 'green');
    } else if (perfTime < 500) {
      log(`⚠️  Moderate performance (${perfTime}ms)`, 'yellow');
      log('   Consider checking network latency or database load\n', 'yellow');
    } else {
      log(`❌ Slow performance (${perfTime}ms)`, 'red');
      log('   Check network connection and database status\n', 'red');
    }

    // Summary
    log('═══════════════════════════════════════════════', 'cyan');
    log('✅ All tests passed! Database is ready to use.', 'green');
    log('═══════════════════════════════════════════════\n', 'cyan');

    // Recommendations
    if (!isPooled && process.env.NODE_ENV === 'production') {
      log('💡 Recommendation:', 'yellow');
      log('   Use pooled connection in production for better performance', 'yellow');
      log('   Add "pgbouncer=true" to your DATABASE_URL\n', 'yellow');
    }

    if (!hasSSL) {
      log('⚠️  Security Warning:', 'red');
      log('   SSL is not enabled. Add "sslmode=require" to your connection string\n', 'red');
    }

  } catch (error) {
    log('\n❌ Connection Test Failed\n', 'red');
    
    if (error instanceof Error) {
      log('Error Details:', 'red');
      log(`   ${error.message}\n`, 'red');

      // Provide helpful troubleshooting tips
      log('💡 Troubleshooting Tips:', 'yellow');
      
      if (error.message.includes('timeout')) {
        log('   • Check your internet connection', 'yellow');
        log('   • Verify the host is correct', 'yellow');
        log('   • Check if Neon service is operational: https://neon.tech/status', 'yellow');
      } else if (error.message.includes('authentication')) {
        log('   • Verify your username and password are correct', 'yellow');
        log('   • Check if the user has proper permissions', 'yellow');
        log('   • Ensure the connection string is properly formatted', 'yellow');
      } else if (error.message.includes('database')) {
        log('   • Verify the database name is correct', 'yellow');
        log('   • Check if the database exists in Neon dashboard', 'yellow');
      } else if (error.message.includes('SSL') || error.message.includes('ssl')) {
        log('   • Add "sslmode=require" to your connection string', 'yellow');
        log('   • Update PostgreSQL client libraries', 'yellow');
      } else {
        log('   • Check DATABASE_URL format in .env file', 'yellow');
        log('   • Verify all connection parameters are correct', 'yellow');
        log('   • See DATABASE_SETUP.md for detailed troubleshooting', 'yellow');
      }
    }
    
    log('\n📚 Documentation:', 'blue');
    log('   • DATABASE_SETUP.md - Complete setup guide', 'blue');
    log('   • https://neon.tech/docs - Neon documentation', 'blue');
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testConnection().catch((error) => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
