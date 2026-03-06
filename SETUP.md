# WeCalc Project Setup Guide

## Current Status

The project has been initialized with the following:

✅ Next.js 16+ with App Router
✅ TypeScript configuration (tsconfig.json with strict mode)
✅ Project structure (lib/, types/, components/ folders)
✅ Basic type definitions
✅ Utility functions
✅ Constants file
✅ Environment variables template (.env.example)
✅ Git repository with proper .gitignore
✅ ESLint and Prettier configuration
✅ Updated README.md

## Known Issue

There appears to be an npm installation issue in the current environment where devDependencies are not being installed properly. This needs to be resolved before the project can build successfully.

## Required Steps to Complete Setup

### 1. Fix npm Installation

Try one of the following approaches:

**Option A: Clean reinstall**
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Option B: Use a different package manager**
```bash
# Using yarn
yarn install

# Or using pnpm
pnpm install
```

**Option C: Manual installation of critical packages**
```bash
npm install --save-dev typescript @types/react @types/node
npm install --save-dev tailwindcss@^3.4 autoprefixer postcss
```

### 2. Configure Tailwind CSS

Once packages are installed, create the following files:

**tailwind.config.ts:**
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2bdcd2',
          foreground: '#171717',
        },
        secondary: {
          DEFAULT: '#016968',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
```

**postcss.config.js:**
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
};
```

**Update styles/globals.css:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-foreground antialiased;
    font-family: 'Inter', sans-serif;
  }

  h1 {
    @apply text-4xl font-bold tracking-tight sm:text-5xl;
  }

  h2 {
    @apply text-2xl font-bold sm:text-3xl;
  }

  h3 {
    @apply text-xl font-bold;
  }
}
```

### 3. Verify Build

```bash
npm run build
```

The build should complete successfully without errors.

### 4. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see the application running.

## Project Structure

```
.
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   └── features/          # Feature-specific components
├── lib/
│   ├── utils.ts           # Utility functions
│   └── constants.ts       # Application constants
├── types/
│   └── index.ts           # TypeScript type definitions
├── styles/
│   └── globals.css        # Global styles
├── public/                # Static assets
├── .env.example           # Environment variables template
├── tsconfig.json          # TypeScript configuration
├── next.config.ts         # Next.js configuration
├── .eslintrc.json         # ESLint configuration
├── .prettierrc            # Prettier configuration
└── README.md              # Project documentation
```

## Next Steps

After completing the setup:

1. **Set up Neon PostgreSQL database (Task 3.1)**
   - See [DATABASE_SETUP.md](DATABASE_SETUP.md) for complete instructions
   - Quick start: [docs/DATABASE_QUICK_START.md](docs/DATABASE_QUICK_START.md)
   - Test connection: `npm run db:test`

2. Proceed to Task 2: Configure Netlify deployment
3. Implement internationalization (Task 4)
4. Build UI components (Task 5-7)

## Troubleshooting

### TypeScript Errors

If you see TypeScript errors, ensure:
- `typescript` package is installed
- `@types/react` and `@types/node` are installed
- `tsconfig.json` exists in the project root

### Tailwind Not Working

If Tailwind classes aren't applying:
- Verify `tailwindcss`, `autoprefixer`, and `postcss` are installed
- Check that `tailwind.config.ts` and `postcss.config.js` exist
- Ensure `@tailwind` directives are in `styles/globals.css`
- Restart the development server

### Build Failures

If the build fails:
- Clear the `.next` directory: `rm -rf .next`
- Clear node_modules and reinstall
- Check for syntax errors in TypeScript files
- Verify all imports are correct

## Support

For issues or questions, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
