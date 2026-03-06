# Neon PostgreSQL Quick Start Guide

## 🚀 5-Minute Setup

### 1. Create Neon Account
Visit [https://neon.tech](https://neon.tech) → Sign up with GitHub/Google

### 2. Create Project
- Project Name: `wecalc-official-website`
- Region: Choose closest to your users
  - 🇨🇳 China: Singapore or Tokyo
  - 🌍 Global: US East or Europe
- PostgreSQL Version: 15+

### 3. Get Connection Strings

You'll receive TWO connection strings:

#### Pooled (for Production/Netlify)
```
postgresql://user:pass@host/db?sslmode=require&pgbouncer=true
```
✅ Use this in Netlify environment variables

#### Direct (for Development/Migrations)
```
postgresql://user:pass@host/db?sslmode=require
```
✅ Use this in local `.env` file

### 4. Configure Locally

```bash
# Copy example file
cp .env.example .env

# Edit .env and add your DIRECT connection string
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
```

### 5. Configure Netlify

1. Netlify Dashboard → Site Settings → Environment Variables
2. Add variable:
   - **Key**: `DATABASE_URL`
   - **Value**: Your **POOLED** connection string (with `pgbouncer=true`)

### 6. Test Connection

```bash
# Test with Prisma
npx prisma db pull

# Should see: "Datasource 'db': PostgreSQL database..."
```

## ✅ Checklist

- [ ] Neon account created
- [ ] Project created with appropriate region
- [ ] Connection strings copied and saved securely
- [ ] `.env` file updated with DIRECT connection string
- [ ] Netlify environment variable set with POOLED connection string
- [ ] Connection tested successfully

## 🔑 Key Points

| Environment | Connection Type | Parameter |
|-------------|----------------|-----------|
| **Local Dev** | Direct | No `pgbouncer` |
| **Netlify Production** | Pooled | `pgbouncer=true` |
| **Migrations** | Direct | No `pgbouncer` |

## 🆘 Common Issues

### "Connection timeout"
- Check internet connection
- Verify connection string is correct
- Ensure `sslmode=require` is included

### "Too many connections"
- Use POOLED connection string in production
- Add `pgbouncer=true` parameter

### "SSL error"
- Ensure `sslmode=require` is in connection string
- Update PostgreSQL client libraries

## 📚 Full Documentation

For detailed setup, troubleshooting, and advanced configuration, see:
- [DATABASE_SETUP.md](../DATABASE_SETUP.md) - Complete setup guide
- [Neon Documentation](https://neon.tech/docs/introduction)

## 🎯 Next Steps

After database setup:
1. Install Prisma: `npm install -D prisma @prisma/client`
2. Initialize Prisma: `npx prisma init`
3. Create database schema (Task 3.3)
4. Run migrations (Task 3.4)

---

**Quick Reference** | [Full Guide](../DATABASE_SETUP.md) | [Neon Docs](https://neon.tech/docs)
