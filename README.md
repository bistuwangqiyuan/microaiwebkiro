# WeCalc Official Website (微算官方网站)

A high-end commercial website for WeCalc (微算), showcasing micro computing centers with data localization capabilities.

## 🚀 Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4+
- **Deployment**: Netlify
- **Database**: Neon PostgreSQL
- **Authentication**: Netlify Identity
- **ORM**: Prisma
- **Internationalization**: next-intl (Chinese/English)

## 📁 Project Structure

```
.
├── app/                    # Next.js App Router pages
├── components/
│   ├── ui/                # Reusable UI components (Button, Input, Modal, etc.)
│   ├── layout/            # Layout components (Header, Footer, etc.)
│   └── features/          # Feature-specific components (AIChat, FeedbackForm, etc.)
├── lib/                   # Utility functions and shared logic
├── types/                 # TypeScript type definitions
├── styles/                # Global styles and Tailwind configuration
├── public/                # Static assets (images, fonts, etc.)
├── netlify/
│   └── functions/         # Netlify Functions (API endpoints)
└── prisma/                # Database schema and migrations

```

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Netlify CLI (optional, for local Functions testing)

### Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in the required environment variables.

3. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Run linting**
   ```bash
   npm run lint
   ```

## 🌐 Features

- ✅ Bilingual support (Chinese/English)
- ✅ AI chatbot with multi-API fallback
- ✅ User authentication (Netlify Identity)
- ✅ Product catalog and comparison
- ✅ News and blog system
- ✅ User feedback system
- ✅ Contact and partnership forms
- ✅ SEO optimized (SSR/SSG)
- ✅ Responsive design (desktop-first)
- ✅ Accessibility compliant (WCAG AA)
- ✅ Performance optimized (Lighthouse >90)

## 📝 Key Pages

- **Home** (`/`): Hero section, product overview, core technology
- **Products** (`/products`): Product catalog and comparison
- **Technology** (`/technology`): Technical architecture and innovations
- **Solutions** (`/solutions`): Industry-specific solutions
- **About** (`/about`): Company information and team
- **Partnership** (`/partnership`): Partnership program and application
- **News** (`/news`): Company news and industry insights
- **Contact** (`/contact`): Contact form and information
- **Feedback** (`/feedback`): User feedback system

## 🔧 Configuration

### TypeScript

TypeScript is configured with strict mode enabled. See `tsconfig.json` for details.

### Tailwind CSS

Tailwind CSS v4 is configured with custom theme. See `styles/globals.css` for theme configuration.

### ESLint & Prettier

Code quality is enforced with ESLint and Prettier. Configuration files:
- `.eslintrc.json`
- `.prettierrc`

## 🚢 Deployment

The project is configured for automatic deployment on Netlify:

1. Push to the `main` branch
2. Netlify automatically builds and deploys
3. Preview deployments are created for pull requests

### Environment Variables

Required environment variables for production:
- `DATABASE_URL`: Neon PostgreSQL connection string
- `NETLIFY_IDENTITY_URL`: Netlify Identity URL
- AI API keys (DeepSeek, GLM, Moonshot, etc.)

## 📚 Documentation

- [Requirements Document](.kiro/specs/wecalc-official-website/requirements.md)
- [Design Document](.kiro/specs/wecalc-official-website/design.md)
- [Implementation Tasks](.kiro/specs/wecalc-official-website/tasks.md)

## 🤝 Contributing

This is a private commercial project. For internal development only.

## 📄 License

Proprietary - All rights reserved by WeCalc (微算)

---

**Version**: 0.1.0  
**Status**: In Development
