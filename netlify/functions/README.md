# Netlify Functions

This directory contains serverless functions that handle backend API logic for the WeCalc website.

## Directory Structure

```
netlify/functions/
├── feedback/
│   ├── create.ts          # POST /api/feedback - Create new feedback
│   └── list.ts            # GET /api/feedback - List feedback with filters
├── news/
│   ├── list.ts            # GET /api/news - List news with filters
│   └── detail.ts          # GET /api/news/[id] - Get news detail
├── products/
│   ├── list.ts            # GET /api/products - List all products
│   └── detail.ts          # GET /api/products/[id] - Get product detail
├── contact/
│   └── submit.ts          # POST /api/contact - Submit contact form
├── partnership/
│   └── apply.ts           # POST /api/partnership - Submit partnership application
├── ai-chat/
│   ├── chat.ts            # POST /api/ai-chat - AI chatbot endpoint
│   └── providers/         # AI API provider adapters
│       ├── deepseek.ts
│       ├── glm.ts
│       ├── moonshot.ts
│       ├── tongyi.ts
│       ├── tencent.ts
│       ├── spark.ts
│       ├── doubao.ts
│       ├── anthropic.ts
│       ├── gemini.ts
│       └── deepai.ts
└── shared/
    ├── db.ts              # Database connection utilities
    ├── validation.ts      # Zod validation schemas
    └── response.ts        # Standard API response helpers
```

## API Endpoints

### Feedback API
- `POST /api/feedback` - Create new feedback
- `GET /api/feedback` - List feedback with pagination, filtering, and sorting

### News API
- `GET /api/news` - List news with pagination, filtering, and sorting
- `GET /api/news/[id]` - Get news detail with related news

### Products API
- `GET /api/products` - List all products
- `GET /api/products/[id]` - Get product detail

### Contact API
- `POST /api/contact` - Submit contact form

### Partnership API
- `POST /api/partnership` - Submit partnership application

### AI Chat API
- `POST /api/ai-chat` - AI chatbot with multi-provider fallback

## Environment Variables

All functions require the following environment variables (set in Netlify UI):

- `DATABASE_URL` - Neon PostgreSQL connection string
- `NETLIFY_IDENTITY_URL` - Netlify Identity URL
- AI API Keys (按优先级):
  - `DEEPSEEK_API_KEY`
  - `GLM_API_KEY`
  - `MOONSHOT_API_KEY`
  - `TONGYI_API_KEY`
  - `TENCENT_API_KEY`
  - `SPARK_API_KEY`
  - `DOUBAO_API_KEY`
  - `ANTHROPIC_API_KEY`
  - `GEMINI_API_KEY`
  - `DEEPAI_API_KEY`

## Development

Functions are written in TypeScript and bundled with esbuild. They follow this structure:

```typescript
import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  // Function logic here
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ success: true, data: {} }),
  };
};
```

## Testing

Test functions locally using Netlify CLI:

```bash
netlify dev
```

This will start a local development server with functions available at `http://localhost:8888/.netlify/functions/[function-name]`
