/**
 * Zod validation schemas for API request validation
 */

import { z } from 'zod';

/**
 * Feedback validation schema
 */
export const FeedbackSchema = z.object({
  title: z.string().min(1, '标题不能为空').max(200, '标题不能超过200个字符'),
  content: z.string().min(10, '内容至少需要10个字符').max(5000, '内容不能超过5000个字符'),
  contact: z.string()
    .min(1, '联系方式不能为空')
    .refine(
      (val) => {
        // Check if it's a valid email or Chinese phone number
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^1[3-9]\d{9}$/;
        return emailRegex.test(val) || phoneRegex.test(val);
      },
      '请输入有效的邮箱或手机号码'
    ),
});

export type FeedbackInput = z.infer<typeof FeedbackSchema>;

/**
 * Contact form validation schema
 */
export const ContactSchema = z.object({
  name: z.string().min(1, '姓名不能为空').max(100, '姓名不能超过100个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  phone: z.string().regex(/^1[3-9]\d{9}$/, '请输入有效的手机号码').optional(),
  company: z.string().max(200, '公司名称不能超过200个字符').optional(),
  inquiry_type: z.string().min(1, '请选择咨询类型'),
  message: z.string().min(10, '留言至少需要10个字符').max(2000, '留言不能超过2000个字符'),
});

export type ContactInput = z.infer<typeof ContactSchema>;

/**
 * Partnership application validation schema
 */
export const PartnershipSchema = z.object({
  name: z.string().min(1, '姓名不能为空').max(100, '姓名不能超过100个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  phone: z.string().regex(/^1[3-9]\d{9}$/, '请输入有效的手机号码'),
  company: z.string().max(200, '公司名称不能超过200个字符').optional(),
  region: z.string().min(1, '意向区域不能为空').max(100, '意向区域不能超过100个字符'),
  experience: z.string().max(2000, '相关经验不能超过2000个字符').optional(),
});

export type PartnershipInput = z.infer<typeof PartnershipSchema>;

/**
 * AI chat request validation schema
 */
export const AIChatSchema = z.object({
  message: z.string().min(1, '消息不能为空').max(1000, '消息不能超过1000个字符'),
  locale: z.enum(['zh', 'en']),
  history: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string(),
    })
  ).optional(),
});

export type AIChatInput = z.infer<typeof AIChatSchema>;

/**
 * Pagination query parameters validation
 */
export const PaginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type PaginationParams = z.infer<typeof PaginationSchema>;

/**
 * Feedback filter parameters validation
 */
export const FeedbackFilterSchema = PaginationSchema.extend({
  keyword: z.string().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  status: z.enum(['pending', 'processing', 'resolved']).optional(),
  sortBy: z.enum(['created_at', 'title', 'status']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type FeedbackFilterParams = z.infer<typeof FeedbackFilterSchema>;

/**
 * News filter parameters validation
 */
export const NewsFilterSchema = PaginationSchema.extend({
  category: z.enum(['company', 'industry', 'tech']).optional(),
  keyword: z.string().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  locale: z.enum(['zh', 'en']).default('zh'),
});

export type NewsFilterParams = z.infer<typeof NewsFilterSchema>;

/**
 * Helper function to validate request body
 */
export function validateBody<T>(schema: z.ZodSchema<T>, body: string): { success: true; data: T } | { success: false; error: string } {
  try {
    const parsed = JSON.parse(body);
    const validated = schema.parse(parsed);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return { success: false, error: firstError.message };
    }
    return { success: false, error: '请求数据格式错误' };
  }
}

/**
 * Helper function to validate query parameters
 */
export function validateQuery<T>(schema: z.ZodSchema<T>, params: Record<string, string | undefined>): { success: true; data: T } | { success: false; error: string } {
  try {
    const validated = schema.parse(params);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return { success: false, error: firstError.message };
    }
    return { success: false, error: '请求参数格式错误' };
  }
}
