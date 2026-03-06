# Neon PostgreSQL Database Setup Guide

## Overview

This guide provides step-by-step instructions for setting up a Neon PostgreSQL database for the WeCalc official website. Neon is a serverless PostgreSQL database that offers excellent performance, automatic scaling, and seamless integration with Netlify.

## Why Neon PostgreSQL?

- **Serverless Architecture**: Automatically scales based on demand
- **Netlify Integration**: Native support for Netlify deployments
- **Connection Pooling**: Built-in connection pooling for optimal performance
- **Branching**: Database branching for development and testing
- **Cost-Effective**: Pay only for what you use
- **High Performance**: Fast query execution with SSD storage
- **Automatic Backups**: Point-in-time recovery included

## Prerequisites

- A Neon account (free tier available)
- Basic understanding of PostgreSQL
- Access to your Netlify project

## Step 1: Create a Neon Account

1. Visit [https://neon.tech](https://neon.tech)
2. Click "Sign Up" in the top right corner
3. Choose your sign-up method:
   - GitHub (recommended for developers)
   - Google
   - Email
4. Complete the registration process
5. Verify your email if required

## Step 2: Create a New Project

1. After logging in, click "Create Project" or "New Project"
2. Configure your project:
   - **Project Name**: `wecalc-official-website` (or your preferred name)
   - **Region**: Choose the region closest to your users
     - For China-based users: `Asia Pacific (Singapore)` or `Asia Pacific (Tokyo)`
     - For global users: `US East (N. Virginia)` or `Europe (Frankfurt)`
   - **PostgreSQL Version**: Select the latest stable version (15 or higher)
   - **Compute Size**: Start with the default (can be adjusted later)

3. Click "Create Project"

## Step 3: Get Your Connection String

After project creation, you'll see the connection details:

### Connection String Format

Neon provides multiple connection string formats:

#### 1. Pooled Connection (Recommended for Netlify Functions)

```
postgresql://[user]:[password]@[host]/[database]?sslmode=require&pgbouncer=true
```

**Use this for**: Netlify Functions, serverless environments

**Benefits**:
- Connection pooling built-in
- Better performance for serverless
- Handles connection limits automatically

#### 2. Direct Connection

```
postgresql://[user]:[password]@[host]/[database]?sslmode=require
```

**Use this for**: Local development, long-running processes

**Benefits**:
- Direct database access
- Full PostgreSQL feature support
- Better for migrations and admin tasks

### Copy Your Connection Strings

1. In the Neon dashboard, go to your project
2. Click on "Connection Details" or "Dashboard"
3. You'll see both connection strings
4. Copy both strings and save them securely

**Example Connection Strings**:
```bash
# Pooled (for production)
postgresql://wecalc_user:AbCdEf123456@ep-cool-cloud-123456.us-east-2.aws.neon.tech/wecalc_db?sslmode=require&pgbouncer=true

# Direct (for development)
postgresql://wecalc_user:AbCdEf123456@ep-cool-cloud-123456.us-east-2.aws.neon.tech/wecalc_db?sslmode=require
```

## Step 4: Configure Environment Variables

### Local Development

1. Create a `.env` file in your project root (if it doesn't exist):
   ```bash
   cp .env.example .env
   ```

2. Update the `DATABASE_URL` in `.env`:
   ```bash
   # Use DIRECT connection for local development
   DATABASE_URL="postgresql://[user]:[password]@[host]/[database]?sslmode=require"
   ```

3. Add a pooled connection URL for production testing:
   ```bash
   # Optional: for testing pooled connections locally
   DATABASE_URL_POOLED="postgresql://[user]:[password]@[host]/[database]?sslmode=require&pgbouncer=true"
   ```

### Netlify Production

1. Go to your Netlify site dashboard
2. Navigate to: **Site settings** → **Environment variables**
3. Click "Add a variable"
4. Add the following:
   - **Key**: `DATABASE_URL`
   - **Value**: Your **pooled** connection string
   - **Scopes**: Select "All scopes" or specific deploy contexts

5. Click "Create variable"

## Step 5: Configure Connection Pooling

Neon's connection pooling is handled automatically when you use the pooled connection string (`pgbouncer=true`). However, you should configure your application to work efficiently with pooling:

### Prisma Configuration

Update your `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // Use direct URL for migrations
  directUrl = env("DATABASE_URL_DIRECT")
}
```

### Connection Pool Settings

For optimal performance, configure these settings in your Netlify Functions:

```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client';

// Singleton pattern for Prisma Client
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Connection pool configuration
export const connectionConfig = {
  // Maximum number of connections in the pool
  max: 10,
  // Minimum number of connections in the pool
  min: 2,
  // Maximum time (ms) a connection can be idle before being released
  idleTimeoutMillis: 30000,
  // Maximum time (ms) to wait for a connection from the pool
  connectionTimeoutMillis: 2000,
};
```

## Step 6: Test Database Connection

### Using Prisma CLI

1. Install Prisma CLI (if not already installed):
   ```bash
   npm install -D prisma
   ```

2. Test the connection:
   ```bash
   npx prisma db pull
   ```

   If successful, you'll see:
   ```
   Prisma schema loaded from prisma/schema.prisma
   Datasource "db": PostgreSQL database "wecalc_db"
   ```

### Using psql (Optional)

If you have PostgreSQL client installed:

```bash
psql "postgresql://[user]:[password]@[host]/[database]?sslmode=require"
```

Then run:
```sql
SELECT version();
```

You should see the PostgreSQL version information.

## Step 7: Database Security Best Practices

### 1. Secure Your Connection Strings

- **Never commit** connection strings to Git
- Store them in `.env` (which is in `.gitignore`)
- Use Netlify's environment variables for production
- Rotate passwords periodically

### 2. Use SSL/TLS

Always include `sslmode=require` in your connection string:
```
?sslmode=require
```

### 3. Limit Database Access

In Neon dashboard:
1. Go to **Settings** → **Security**
2. Configure IP allowlist (optional, for additional security)
3. Enable "Require SSL" (should be enabled by default)

### 4. Monitor Database Activity

1. Go to **Monitoring** in Neon dashboard
2. Review:
   - Connection count
   - Query performance
   - Storage usage
   - Error logs

## Step 8: Database Branching (Optional but Recommended)

Neon supports database branching, similar to Git branches:

### Create a Development Branch

1. In Neon dashboard, go to **Branches**
2. Click "Create Branch"
3. Configure:
   - **Branch Name**: `development`
   - **Parent Branch**: `main`
   - **Copy Data**: Yes (to copy existing data)
4. Click "Create"

### Use Branch for Development

Update your `.env` for local development:
```bash
# Development branch connection
DATABASE_URL="postgresql://[user]:[password]@[dev-host]/[database]?sslmode=require"
```

**Benefits**:
- Test migrations safely
- Experiment without affecting production
- Easy rollback if something goes wrong

## Troubleshooting

### Connection Timeout

**Problem**: Connection times out or fails

**Solutions**:
1. Check your internet connection
2. Verify the connection string is correct
3. Ensure `sslmode=require` is included
4. Check Neon service status: [https://neon.tech/status](https://neon.tech/status)
5. Try using the direct connection string instead of pooled

### Too Many Connections

**Problem**: "too many connections" error

**Solutions**:
1. Use the **pooled** connection string (`pgbouncer=true`)
2. Reduce connection pool size in your application
3. Ensure connections are properly closed after use
4. Upgrade your Neon compute size if needed

### Slow Queries

**Problem**: Database queries are slow

**Solutions**:
1. Check query performance in Neon dashboard
2. Add appropriate indexes (see next section)
3. Optimize your queries
4. Consider upgrading compute size
5. Use connection pooling

### SSL Certificate Issues

**Problem**: SSL certificate verification fails

**Solutions**:
1. Ensure `sslmode=require` is in connection string
2. Update your PostgreSQL client libraries
3. Check system time is correct (affects SSL validation)

## Performance Optimization Tips

### 1. Use Connection Pooling

Always use the pooled connection string in production:
```
?sslmode=require&pgbouncer=true
```

### 2. Optimize Queries

- Use indexes for frequently queried columns
- Avoid SELECT * (select only needed columns)
- Use LIMIT for large result sets
- Use prepared statements

### 3. Monitor Performance

In Neon dashboard:
1. Go to **Monitoring** → **Query Performance**
2. Identify slow queries
3. Optimize or add indexes as needed

### 4. Scale Compute Resources

If needed, upgrade your compute size:
1. Go to **Settings** → **Compute**
2. Select a larger compute size
3. Changes take effect immediately

## Connection String Reference

### Environment Variables to Set

```bash
# Required
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require&pgbouncer=true"

# Optional (for migrations)
DATABASE_URL_DIRECT="postgresql://user:pass@host/db?sslmode=require"

# Optional (for development branch)
DATABASE_URL_DEV="postgresql://user:pass@dev-host/db?sslmode=require"
```

### Connection String Parameters

| Parameter | Value | Purpose |
|-----------|-------|---------|
| `sslmode` | `require` | Enforce SSL/TLS encryption |
| `pgbouncer` | `true` | Enable connection pooling |
| `connect_timeout` | `10` | Connection timeout in seconds |
| `pool_timeout` | `10` | Pool checkout timeout in seconds |
| `statement_timeout` | `30000` | Query timeout in milliseconds |

### Example with All Parameters

```
postgresql://user:pass@host/db?sslmode=require&pgbouncer=true&connect_timeout=10&pool_timeout=10&statement_timeout=30000
```

## Next Steps

After completing the database setup:

1. ✅ **Task 3.2**: Install and configure Prisma ORM
2. ✅ **Task 3.3**: Create database schema for all tables
3. ✅ **Task 3.4**: Generate Prisma Client and run migrations

## Additional Resources

- [Neon Documentation](https://neon.tech/docs/introduction)
- [Neon + Netlify Integration Guide](https://neon.tech/docs/guides/netlify)
- [PostgreSQL Connection Strings](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)
- [Prisma with Neon](https://www.prisma.io/docs/guides/database/neon)
- [Connection Pooling Best Practices](https://neon.tech/docs/connect/connection-pooling)

## Support

- **Neon Support**: [https://neon.tech/docs/introduction/support](https://neon.tech/docs/introduction/support)
- **Neon Discord**: [https://discord.gg/neon](https://discord.gg/neon)
- **Project Issues**: Create an issue in the project repository

---

**Document Version**: 1.0  
**Last Updated**: 2025  
**Status**: Ready for Use
