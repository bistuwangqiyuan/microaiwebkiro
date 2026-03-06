# Database Troubleshooting Guide

This guide helps you diagnose and fix common database connection issues with Neon PostgreSQL.

## Quick Diagnostics

Run the connection test script to diagnose issues:

```bash
npm run db:test
```

Or manually:

```bash
npx tsx scripts/test-db-connection.ts
```

## Common Issues and Solutions

### 1. Connection Timeout

**Symptoms:**
- Error: "Connection timeout"
- Error: "connect ETIMEDOUT"
- Connection takes more than 5 seconds

**Causes:**
- Network connectivity issues
- Incorrect host in connection string
- Firewall blocking connection
- Neon service outage

**Solutions:**

1. **Check Internet Connection**
   ```bash
   ping neon.tech
   ```

2. **Verify Connection String**
   - Check that host is correct
   - Ensure no typos in the connection string
   - Verify format: `postgresql://user:pass@host/db?sslmode=require`

3. **Check Neon Service Status**
   - Visit: [https://neon.tech/status](https://neon.tech/status)
   - Check for ongoing incidents

4. **Try Direct Connection**
   - Remove `pgbouncer=true` temporarily
   - Test with direct connection string

5. **Check Firewall/VPN**
   - Disable VPN temporarily
   - Check corporate firewall settings
   - Ensure port 5432 is not blocked

### 2. Authentication Failed

**Symptoms:**
- Error: "password authentication failed"
- Error: "role does not exist"
- Error: "FATAL: password authentication failed for user"

**Causes:**
- Incorrect username or password
- Connection string not properly formatted
- Password contains special characters not properly encoded

**Solutions:**

1. **Verify Credentials**
   - Go to Neon dashboard
   - Check connection details
   - Copy connection string again

2. **URL Encode Special Characters**
   
   If your password contains special characters, encode them:
   
   | Character | Encoded |
   |-----------|---------|
   | `@` | `%40` |
   | `:` | `%3A` |
   | `/` | `%2F` |
   | `?` | `%3F` |
   | `#` | `%23` |
   | `&` | `%26` |
   | `=` | `%3D` |
   
   Example:
   ```
   Password: my@pass:word
   Encoded: my%40pass%3Aword
   ```

3. **Reset Password**
   - Go to Neon dashboard
   - Reset database password
   - Update connection string

4. **Check User Permissions**
   ```sql
   -- Connect to database and check user
   SELECT current_user;
   SELECT * FROM pg_roles WHERE rolname = 'your_username';
   ```

### 3. SSL/TLS Errors

**Symptoms:**
- Error: "SSL connection required"
- Error: "no pg_hba.conf entry for host"
- Error: "SSL error: certificate verify failed"

**Causes:**
- Missing `sslmode=require` parameter
- Outdated PostgreSQL client libraries
- System time incorrect (affects SSL validation)

**Solutions:**

1. **Add SSL Mode to Connection String**
   ```
   postgresql://user:pass@host/db?sslmode=require
   ```

2. **Update PostgreSQL Client**
   ```bash
   npm update @prisma/client
   npm update prisma
   ```

3. **Check System Time**
   - Ensure system clock is correct
   - SSL certificates are time-sensitive

4. **Try Different SSL Modes**
   
   If `sslmode=require` doesn't work, try:
   ```
   ?sslmode=prefer
   ```
   
   Or for debugging only (NOT for production):
   ```
   ?sslmode=disable
   ```

### 4. Too Many Connections

**Symptoms:**
- Error: "sorry, too many clients already"
- Error: "remaining connection slots are reserved"
- Intermittent connection failures

**Causes:**
- Not using connection pooling
- Connection leaks (not closing connections)
- Too many concurrent requests
- Compute size too small

**Solutions:**

1. **Use Pooled Connection**
   ```
   postgresql://user:pass@host/db?sslmode=require&pgbouncer=true
   ```

2. **Reduce Connection Pool Size**
   
   In `lib/db.ts`:
   ```typescript
   export const connectionConfig = {
     max: 5, // Reduce from 10
     min: 1, // Reduce from 2
     idleTimeoutMillis: 10000, // Release faster
   };
   ```

3. **Ensure Connections Are Closed**
   ```typescript
   // Always disconnect after use
   try {
     const result = await prisma.user.findMany();
     return result;
   } finally {
     await prisma.$disconnect();
   }
   ```

4. **Upgrade Compute Size**
   - Go to Neon dashboard → Settings → Compute
   - Upgrade to larger compute size
   - More connections available with larger compute

### 5. Database Does Not Exist

**Symptoms:**
- Error: "database does not exist"
- Error: "FATAL: database 'xxx' does not exist"

**Causes:**
- Incorrect database name in connection string
- Database was deleted
- Wrong project selected

**Solutions:**

1. **Verify Database Name**
   - Check Neon dashboard
   - Verify database name in connection string
   - Ensure no typos

2. **Check Project**
   - Ensure you're in the correct Neon project
   - Check if database exists in project

3. **Create Database**
   
   If database was deleted, create it:
   ```sql
   CREATE DATABASE wecalc_db;
   ```

### 6. Slow Query Performance

**Symptoms:**
- Queries take more than 1 second
- Timeout errors on complex queries
- High database CPU usage

**Causes:**
- Missing indexes
- Inefficient queries
- Large result sets without pagination
- Compute size too small

**Solutions:**

1. **Add Indexes**
   
   Check slow queries in Neon dashboard, then add indexes:
   ```sql
   -- Example: Add index on frequently queried column
   CREATE INDEX idx_feedbacks_created_at ON feedbacks(created_at DESC);
   ```

2. **Optimize Queries**
   ```typescript
   // Bad: Select all columns
   const users = await prisma.user.findMany();
   
   // Good: Select only needed columns
   const users = await prisma.user.findMany({
     select: { id: true, email: true }
   });
   ```

3. **Use Pagination**
   ```typescript
   // Always paginate large result sets
   const feedbacks = await prisma.feedback.findMany({
     take: 20,
     skip: (page - 1) * 20,
   });
   ```

4. **Monitor Performance**
   - Go to Neon dashboard → Monitoring
   - Check query performance
   - Identify slow queries

5. **Upgrade Compute**
   - Larger compute = better performance
   - Consider upgrading if consistently slow

### 7. Prisma Client Errors

**Symptoms:**
- Error: "PrismaClient is unable to be run in the browser"
- Error: "Cannot find module '@prisma/client'"
- Type errors with Prisma

**Causes:**
- Prisma Client not generated
- Outdated Prisma Client
- Importing Prisma in client-side code

**Solutions:**

1. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

2. **Update Prisma**
   ```bash
   npm update prisma @prisma/client
   npx prisma generate
   ```

3. **Don't Use Prisma Client-Side**
   
   Prisma should only be used in:
   - Server components
   - API routes
   - Netlify Functions
   
   Never in:
   - Client components
   - Browser code

4. **Rebuild Project**
   ```bash
   rm -rf .next
   npm run build
   ```

### 8. Migration Errors

**Symptoms:**
- Error: "Migration failed"
- Error: "Table already exists"
- Error: "Column does not exist"

**Causes:**
- Schema out of sync with database
- Failed migration not rolled back
- Manual database changes

**Solutions:**

1. **Check Migration Status**
   ```bash
   npx prisma migrate status
   ```

2. **Reset Database (Development Only)**
   ```bash
   npx prisma migrate reset
   ```
   
   ⚠️ **Warning**: This deletes all data!

3. **Create New Migration**
   ```bash
   npx prisma migrate dev --name fix_schema
   ```

4. **Resolve Conflicts**
   
   If migration conflicts:
   ```bash
   # Mark migration as applied (if already applied manually)
   npx prisma migrate resolve --applied "migration_name"
   
   # Or mark as rolled back
   npx prisma migrate resolve --rolled-back "migration_name"
   ```

### 9. Environment Variable Issues

**Symptoms:**
- Error: "DATABASE_URL is not defined"
- Connection works locally but not in Netlify
- Different behavior in different environments

**Causes:**
- `.env` file not loaded
- Environment variables not set in Netlify
- Wrong environment variable name

**Solutions:**

1. **Check Local .env File**
   ```bash
   # Verify .env exists
   ls -la .env
   
   # Check contents (be careful not to expose secrets)
   cat .env | grep DATABASE_URL
   ```

2. **Verify Netlify Environment Variables**
   - Go to Netlify dashboard
   - Site Settings → Environment Variables
   - Ensure `DATABASE_URL` is set
   - Check for typos

3. **Check Variable Scope**
   - Ensure variable is available in all deploy contexts
   - Set for: Production, Deploy Previews, Branch Deploys

4. **Restart Development Server**
   ```bash
   # Stop server (Ctrl+C)
   # Restart
   npm run dev
   ```

### 10. Connection String Format Issues

**Symptoms:**
- Error: "Invalid connection string"
- Error: "Malformed database URL"
- Unexpected connection behavior

**Causes:**
- Incorrect format
- Missing required parameters
- Extra spaces or characters

**Solutions:**

1. **Verify Format**
   
   Correct format:
   ```
   postgresql://username:password@host:port/database?param=value
   ```
   
   Example:
   ```
   postgresql://user:pass@ep-cool-cloud-123456.us-east-2.aws.neon.tech/wecalc_db?sslmode=require&pgbouncer=true
   ```

2. **Check Components**
   - Protocol: `postgresql://` (not `postgres://`)
   - Username: No special characters or spaces
   - Password: URL-encoded if contains special characters
   - Host: Full Neon host with region
   - Port: Usually omitted (defaults to 5432)
   - Database: Exact database name
   - Parameters: `?sslmode=require` (required)

3. **Remove Extra Spaces**
   ```bash
   # Bad (has spaces)
   DATABASE_URL=" postgresql://user:pass@host/db "
   
   # Good (no spaces)
   DATABASE_URL="postgresql://user:pass@host/db"
   ```

4. **Use Quotes in .env**
   ```bash
   # Always use quotes
   DATABASE_URL="postgresql://..."
   ```

## Testing Checklist

Use this checklist to systematically diagnose issues:

- [ ] Run connection test script: `npm run db:test`
- [ ] Verify DATABASE_URL is set in .env
- [ ] Check connection string format
- [ ] Verify credentials in Neon dashboard
- [ ] Test internet connectivity
- [ ] Check Neon service status
- [ ] Verify SSL mode is set (`sslmode=require`)
- [ ] Try direct connection (remove `pgbouncer=true`)
- [ ] Check Prisma Client is generated
- [ ] Verify Prisma version is up to date
- [ ] Check for firewall/VPN issues
- [ ] Review Neon dashboard for errors
- [ ] Check database exists in correct project
- [ ] Verify compute is running (not suspended)

## Getting Help

If you're still experiencing issues:

1. **Check Logs**
   - Netlify function logs
   - Browser console
   - Terminal output

2. **Enable Debug Logging**
   ```typescript
   // In lib/db.ts
   const prisma = new PrismaClient({
     log: ['query', 'info', 'warn', 'error'],
   });
   ```

3. **Consult Documentation**
   - [DATABASE_SETUP.md](../DATABASE_SETUP.md)
   - [Neon Documentation](https://neon.tech/docs)
   - [Prisma Documentation](https://www.prisma.io/docs)

4. **Community Support**
   - Neon Discord: [https://discord.gg/neon](https://discord.gg/neon)
   - Prisma Discord: [https://discord.gg/prisma](https://discord.gg/prisma)
   - Stack Overflow: Tag with `neon` and `prisma`

5. **Contact Support**
   - Neon Support: [https://neon.tech/docs/introduction/support](https://neon.tech/docs/introduction/support)
   - Include: Error message, connection test output, Neon project ID

## Prevention Tips

Avoid common issues:

1. **Always Use SSL**
   - Include `sslmode=require` in all connection strings

2. **Use Connection Pooling in Production**
   - Add `pgbouncer=true` for Netlify deployments

3. **Keep Credentials Secure**
   - Never commit .env to Git
   - Rotate passwords regularly
   - Use environment variables

4. **Monitor Database Health**
   - Check Neon dashboard regularly
   - Set up alerts for high usage
   - Monitor query performance

5. **Keep Dependencies Updated**
   ```bash
   npm update prisma @prisma/client
   ```

6. **Test Before Deploying**
   - Run connection test locally
   - Test migrations in development branch
   - Verify environment variables in Netlify

---

**Need More Help?** See [DATABASE_SETUP.md](../DATABASE_SETUP.md) for complete setup instructions.
