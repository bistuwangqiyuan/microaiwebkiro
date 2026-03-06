/**
 * Application constants for WeCalc Official Website
 */

// Supported locales
export const LOCALES = ['zh', 'en'] as const;
export const DEFAULT_LOCALE = 'zh';

// Pagination
export const FEEDBACK_PAGE_SIZE = 20;
export const NEWS_PAGE_SIZE = 12;

// Product versions
export const PRODUCT_VERSIONS = {
  B: 'Basic',
  P: 'Professional',
  E: 'Enterprise'
} as const;

// News categories
export const NEWS_CATEGORIES = {
  company: 'Company News',
  industry: 'Industry Insights',
  tech: 'Technology'
} as const;

// Feedback status
export const FEEDBACK_STATUS = {
  pending: 'Pending',
  processing: 'Processing',
  resolved: 'Resolved'
} as const;

// Contact inquiry types
export const INQUIRY_TYPES = [
  'product',
  'partnership',
  'technical',
  'sales',
  'other'
] as const;

// AI API providers (in priority order)
export const AI_PROVIDERS = [
  'DeepSeek',
  'GLM',
  'Moonshot',
  'TONGYI',
  'Tencent',
  'SPARK',
  'DOUBAO',
  'Anthropic',
  'Gemini',
  'Deepai'
] as const;

// API endpoints
export const API_ENDPOINTS = {
  feedback: '/api/feedback',
  news: '/api/news',
  products: '/api/products',
  contact: '/api/contact',
  partnership: '/api/partnership',
  aiChat: '/api/ai-chat'
} as const;

// Navigation links
export const NAV_LINKS = [
  { key: 'home', href: '/' },
  { key: 'products', href: '/products' },
  { key: 'technology', href: '/technology' },
  { key: 'solutions', href: '/solutions' },
  { key: 'about', href: '/about' },
  { key: 'partnership', href: '/partnership' },
  { key: 'news', href: '/news' },
  { key: 'contact', href: '/contact' }
] as const;

// Social media links
export const SOCIAL_LINKS = {
  wechat: '#',
  weibo: '#',
  linkedin: '#',
  twitter: '#'
} as const;

// Company information
export const COMPANY_INFO = {
  name: {
    zh: '微算科技',
    en: 'WeCalc Technology'
  },
  email: 'contact@wecalc.com',
  phone: '+86 400-XXX-XXXX',
  address: {
    zh: '中国 北京市 朝阳区',
    en: 'Chaoyang District, Beijing, China'
  }
} as const;

// Performance thresholds
export const PERFORMANCE = {
  firstContentfulPaint: 1500, // ms
  apiTimeout: 3000, // ms
  aiChatTimeout: 3000, // ms
  lighthouseScore: 90
} as const;

// Validation rules
export const VALIDATION = {
  titleMinLength: 1,
  titleMaxLength: 200,
  contentMinLength: 10,
  contentMaxLength: 5000,
  summaryMaxLength: 500,
  nameMaxLength: 100,
  emailMaxLength: 100,
  phoneMaxLength: 20,
  companyMaxLength: 200,
  messageMinLength: 10,
  messageMaxLength: 2000
} as const;
