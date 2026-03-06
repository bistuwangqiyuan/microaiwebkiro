# WeCalc Website Deployment Guide

This guide explains how to deploy the WeCalc official website to Netlify.

## Prerequisites

1. A Netlify account (sign up at https://netlify.com)
2. A Neon PostgreSQL database (sign up at https://neon.tech)
3. API keys for AI providers (optional, but recommended for full functionality)

## Environment Variables

Before deploying, you need to set up the following environment variables in the Netlify UI:

### Required Variables

1. **DATABASE_URL**
   - Your Neon PostgreSQL connection string
   - Format: `postgresql://user:password@host:5432/database?sslmode=require`
   - Get this from your Neon dashboard

2. **NETLIFY_IDENTITY_URL**
   - Your Netlify site URL with identity path
   - Format: `https://your-site.netlify.app/.netlify/identity`
   - This will be available after your first deployment

3. **NEXT_PUBLIC_SITE_URL**
   - Your production site URL
   - Format: `https://your-site.netlify.app` or your custom domain

4. **NEXT_PUBLIC_DEFAULT_LOCALE**
   - Default language for the site
   - Value: `zh` (Chinese) or `en` (English)

### AI API Keys (按优先级排序)

Configure at least one AI API key for the chatbot to work. The system will automatically fall back to the next available API if one fails.

1. **DEEPSEEK_API_KEY** (Priority 1)
2. **GLM_API_KEY** (Priority 2)
3. **MOONSHOT_API_KEY** (Priority 3)
4. **TONGYI_API_KEY** (Priority 4)
5. **TENCENT_API_KEY** (Priority 5)
6. **SPARK_API_KEY** (Priority 6)
7. **DOUBAO_API_KEY** (Priority 7)
8. **ANTHROPIC_API_KEY** (Priority 8)
9. **GEMINI_API_KEY** (Priority 9)
10. **DEEPAI_API_KEY** (Priority 10)

### Optional Variables

- **API_TIMEOUT**: Timeout for API requests in milliseconds (default: 3000)
- **API_RATE_LIMIT**: Rate limit for API requests per minute (default: 100)
- **NEXT_PUBLIC_GA_ID**: Google Analytics tracking ID
- **SENTRY_DSN**: Sentry error tracking DSN
- **SENTRY_AUTH_TOKEN**: Sentry authentication token

## Deployment Steps

### 1. Connect Repository to Netlify

1. Log in to your Netlify account
2. Click "Add new site" → "Import an existing project"
3. Choose your Git provider (GitHub, GitLab, or Bitbucket)
4. Select the WeCalc repository
5. Netlify will automatically detect the build settings from `netlify.toml`

### 2. Configure Environment Variables

1. Go to Site settings → Environment variables
2. Add all required environment variables listed above
3. Click "Save"

### 3. Enable Netlify Identity

1. Go to Site settings → Identity
2. Click "Enable Identity"
3. Configure registration settings:
   - Enable "Open registration" if you want users to self-register
   - Or use "Invite only" for controlled access
4. Configure email templates (optional)
5. Copy the Identity URL and update your `NETLIFY_IDENTITY_URL` environment variable

### 4. Set Up Database

1. Run database migrations:
   ```bash
   npm run prisma:migrate:deploy
   ```
2. Seed the database with initial data:
   ```bash
   npm run prisma:seed
   ```

### 5. Deploy

1. Netlify will automatically deploy when you push to your main branch
2. Or click "Trigger deploy" in the Netlify UI
3. Wait for the build to complete (usually 2-5 minutes)
4. Your site will be live at `https://your-site.netlify.app`

### 6. Configure Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the instructions to configure DNS
4. Netlify will automatically provision an SSL certificate

## Build Configuration

The build configuration is defined in `netlify.toml`:

```toml
[build]
  publish = ".next"
  command = "npm run build"
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "20"
```

## Functions

Serverless functions are located in `netlify/functions/` and are automatically deployed with your site. They are accessible at:

- `https://your-site.netlify.app/.netlify/functions/[function-name]`
- Or via the `/api/*` redirect: `https://your-site.netlify.app/api/[function-name]`

## Security Headers

Security headers are configured in `netlify.toml` and include:

- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy

## Caching

Static assets are cached with the following strategy:

- Images: 1 year cache (immutable)
- Next.js static files: 1 year cache (immutable)
- HTML pages: No cache (always fresh)

## Monitoring

### Build Logs

View build logs in the Netlify UI:
1. Go to Deploys
2. Click on a deploy
3. View the build log

### Function Logs

View function logs in the Netlify UI:
1. Go to Functions
2. Click on a function
3. View the function log

### Error Tracking (Optional)

If you configured Sentry:
1. Errors will be automatically sent to Sentry
2. View errors in your Sentry dashboard

## Troubleshooting

### Build Fails

1. Check the build log for errors
2. Ensure all environment variables are set correctly
3. Verify that `package.json` dependencies are correct
4. Try building locally: `npm run build`

### Functions Not Working

1. Check function logs in Netlify UI
2. Verify environment variables are set
3. Test functions locally: `netlify dev`
4. Check that database connection is working

### Database Connection Issues

1. Verify `DATABASE_URL` is correct
2. Check that Neon database is running
3. Ensure database migrations have been run
4. Check Neon dashboard for connection limits

### Identity Issues

1. Verify `NETLIFY_IDENTITY_URL` is correct
2. Check that Identity is enabled in Netlify settings
3. Ensure email templates are configured
4. Check spam folder for verification emails

## Local Development

To test the deployment configuration locally:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Link to your site
netlify link

# Start local development server with functions
netlify dev
```

This will start a local server at `http://localhost:8888` with functions available at `http://localhost:8888/.netlify/functions/[function-name]`.

## Rollback

If you need to rollback to a previous deployment:

1. Go to Deploys in Netlify UI
2. Find the previous successful deploy
3. Click "Publish deploy"
4. The site will instantly rollback

## Performance Optimization

- Enable Netlify's Asset Optimization in Site settings
- Use Netlify's CDN for global distribution
- Enable Brotli compression
- Monitor Core Web Vitals in Netlify Analytics

## Support

For deployment issues:
- Netlify Support: https://www.netlify.com/support/
- Neon Support: https://neon.tech/docs/introduction
- Project Documentation: See README.md and SETUP.md
