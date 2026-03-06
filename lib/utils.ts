import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to localized string
 */
export function formatDate(date: Date | string, locale: 'zh' | 'en' = 'zh'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (locale === 'zh') {
    return d.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

/**
 * Get localized content based on locale
 */
export function getLocalizedContent<T extends Record<string, any>>(
  data: T,
  locale: 'zh' | 'en',
  fields: string[]
): Partial<T> {
  const result: any = { ...data };
  
  fields.forEach(field => {
    const zhField = `${field}_zh`;
    const enField = `${field}_en`;
    
    if (zhField in data && enField in data) {
      result[field] = locale === 'zh' ? data[zhField] : data[enField];
    }
  });
  
  return result;
}

/**
 * Build URL with query parameters
 */
export function buildUrl(path: string, params: Record<string, any>): string {
  const url = new URL(path, 'http://localhost');
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });
  
  return url.pathname + url.search;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Chinese phone number
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
}

/**
 * Sleep utility for async operations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get Netlify context (dev, deploy-preview, production, branch-deploy)
 */
export function getNetlifyContext(): string | undefined {
  return process.env.CONTEXT;
}
