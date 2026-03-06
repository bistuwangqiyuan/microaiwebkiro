# Netlify Configuration Checklist

Use this checklist to ensure your Netlify deployment is properly configured.

## ✅ Pre-Deployment Checklist

### Repository Setup
- [ ] Code is pushed to Git repository (GitHub, GitLab, or Bitbucket)
- [ ] `netlify.toml` is present in repository root
- [ ] `.env.example` is present (but `.env` is in `.gitignore`)
- [ ] All dependencies are listed in `package.json`

### Database Setup
- [ ] Neon PostgreSQL database created
- [ ] Database connection string obtained
- [ ] Prisma schema is up to date
- [ ] Database migrations are ready

### API Keys
- [ ] At least one AI API key obtained
- [ ] All API keys are valid and active
- [ ] API key rate limits are understood

## ✅ Netlify Site Configuration

### Basic Settings
- [ ] Site connected to Git repository
- [ ] Build command: `npm run build`
- [ ] Publish directory: `.next`
- [ ] Functions directory: `netlify/functions`
- [ ] Node version: 20

### Environment Variables
- [ ] `DATABASE_URL` set
- [ ] `NETLIFY_IDENTITY_URL` set (after first deploy)
- [ ] `NEXT_PUBLIC_SITE_URL` set
- [ ] `NEXT_PUBLIC_DEFAULT_LOCALE` set
- [ ] At least one AI API key set
- [ ] `API_TIMEOUT` set (optional)
- [ ] `API_RATE_LIMIT` set (optional)

### Identity Configuration
- [ ] Netlify Identity enabled
- [ ] Registration settings configured
- [ ] Email templates configured
- [ ] Identity URL copied to environment variables

### Domain Configuration
- [ ] Custom domain added (if applicable)
- [ ] DNS configured correctly
- [ ] SSL certificate provisioned
- [ ] HTTPS redirect enabled

## ✅ Security Configuration

### Headers
- [ ] Content Security Policy configured
- [ ] X-Frame-Options set to DENY
- [ ] X-Content-Type-Options set to nosniff
- [ ] X-XSS-Protection enabled
- [ ] Referrer-Policy configured
- [ ] Permissions-Policy configured

### HTTPS
- [ ] SSL certificate active
- [ ] HTTP to HTTPS redirect enabled
- [ ] HSTS header configured (optional)

### CORS
- [ ] CORS headers configured for API endpoints
- [ ] Allowed origins specified
- [ ] Allowed methods specified

## ✅ Performance Configuration

### Caching
- [ ] Static asset caching configured (1 year)
- [ ] Next.js static files caching configured
- [ ] HTML caching strategy set

### Optimization
- [ ] Asset optimization enabled in Netlify
- [ ] Image optimization configured
- [ ] Brotli compression enabled
- [ ] Minification enabled

### CDN
- [ ] Netlify CDN enabled (automatic)
- [ ] Edge functions configured (if needed)

## ✅ Functions Configuration

### Directory Structure
- [ ] `netlify/functions/` directory exists
- [ ] Shared utilities created (`shared/response.ts`, `shared/validation.ts`, `shared/db.ts`)
- [ ] Function subdirectories created (feedback, news, products, contact, partnership, ai-chat)

### Function Settings
- [ ] Node bundler set to esbuild
- [ ] Function timeout configured (default: 10s)
- [ ] Function memory configured (default: 1024MB)

## ✅ Database Configuration

### Migrations
- [ ] Prisma migrations created
- [ ] Migrations tested locally
- [ ] Migrations run on production database

### Seeding
- [ ] Seed data prepared
- [ ] Seed script tested locally
- [ ] Production database seeded

### Indexes
- [ ] All required indexes created
- [ ] Index performance verified

## ✅ Monitoring & Analytics

### Logging
- [ ] Build logs accessible
- [ ] Function logs accessible
- [ ] Error logging configured (optional: Sentry)

### Analytics
- [ ] Google Analytics configured (optional)
- [ ] Netlify Analytics enabled (optional)
- [ ] Core Web Vitals monitoring set up

### Alerts
- [ ] Deploy notifications configured
- [ ] Error alerts configured (if using Sentry)
- [ ] Uptime monitoring configured (optional)

## ✅ Testing

### Local Testing
- [ ] Site builds successfully locally (`npm run build`)
- [ ] Site runs locally (`npm run dev`)
- [ ] Functions work locally (`netlify dev`)
- [ ] Database connection works locally

### Staging Testing
- [ ] Deploy to staging/preview environment
- [ ] Test all pages load correctly
- [ ] Test all forms submit successfully
- [ ] Test AI chatbot works
- [ ] Test user authentication works
- [ ] Test bilingual switching works

### Production Testing
- [ ] All pages accessible
- [ ] All API endpoints working
- [ ] Forms submitting correctly
- [ ] Database operations working
- [ ] Authentication flow working
- [ ] Performance metrics acceptable (Lighthouse > 90)

## ✅ Post-Deployment

### Verification
- [ ] Site is live and accessible
- [ ] Custom domain working (if configured)
- [ ] SSL certificate active
- [ ] All environment variables working
- [ ] Database connected and working
- [ ] Functions responding correctly

### Documentation
- [ ] Deployment documented
- [ ] Environment variables documented
- [ ] API endpoints documented
- [ ] Troubleshooting guide available

### Backup
- [ ] Database backup strategy in place
- [ ] Environment variables backed up securely
- [ ] Code repository backed up

## 🚨 Common Issues

### Build Failures
- **Issue**: Build fails with dependency errors
- **Solution**: Check `package.json` and run `npm install` locally

### Function Errors
- **Issue**: Functions return 500 errors
- **Solution**: Check function logs and environment variables

### Database Connection
- **Issue**: Cannot connect to database
- **Solution**: Verify `DATABASE_URL` and check Neon dashboard

### Identity Issues
- **Issue**: Users cannot sign up/login
- **Solution**: Check Identity is enabled and `NETLIFY_IDENTITY_URL` is correct

### CORS Errors
- **Issue**: API requests blocked by CORS
- **Solution**: Verify CORS headers in `netlify.toml`

## 📝 Notes

- Keep this checklist updated as configuration changes
- Review checklist before each major deployment
- Share checklist with team members
- Document any custom configuration not covered here

## 🔗 Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Neon Documentation](https://neon.tech/docs/introduction)
- [Prisma Documentation](https://www.prisma.io/docs/)
