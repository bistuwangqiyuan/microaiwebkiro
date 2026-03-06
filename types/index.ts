// Global type definitions for WeCalc Official Website

export type Locale = 'zh' | 'en';

export interface LocalizedContent {
  zh: string;
  en: string;
}

// Feedback types
export interface Feedback {
  id: string;
  title: string;
  content: string;
  contact: string;
  status: 'pending' | 'processing' | 'resolved';
  user_id: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateFeedbackDTO {
  title: string;
  content: string;
  contact: string;
}

// News types
export interface News {
  id: string;
  title_zh: string;
  title_en: string;
  content_zh: string;
  content_en: string;
  summary_zh: string;
  summary_en: string;
  cover_image: string;
  category: 'company' | 'industry' | 'tech';
  published_at: Date;
  created_at: Date;
}

export interface LocalizedNews {
  id: string;
  title: string;
  content: string;
  summary: string;
  cover_image: string;
  category: string;
  published_at: Date;
  created_at: Date;
}

// Product types
export interface Product {
  id: string;
  name_zh: string;
  name_en: string;
  version: 'B' | 'P' | 'E';
  price: number;
  specs: Record<string, any>;
  features: string[];
  description_zh: string;
  description_en: string;
  images: string[];
  created_at: Date;
}

export interface LocalizedProduct {
  id: string;
  name: string;
  version: 'B' | 'P' | 'E';
  price: number;
  specs: Record<string, any>;
  features: string[];
  description: string;
  images: string[];
  created_at: Date;
}

// Contact types
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  inquiry_type: string;
  message: string;
  status: 'new' | 'processing' | 'resolved';
  created_at: Date;
}

export interface CreateContactDTO {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  inquiry_type: string;
  message: string;
}

// Partnership types
export interface PartnershipApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  region: string;
  experience?: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  created_at: Date;
}

export interface CreatePartnershipDTO {
  name: string;
  email: string;
  phone: string;
  company?: string;
  region: string;
  experience?: string;
}

// AI Chat types
export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  links?: Array<{ text: string; url: string }>;
}

export interface AIChatRequest {
  message: string;
  locale: Locale;
  history?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

export interface AIChatResponse {
  success: boolean;
  data: {
    message: string;
    links?: Array<{ text: string; url: string }>;
    api_used: string;
  };
}

// API Response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// Filter and Sort types
export interface FilterParams {
  keyword?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  status?: string;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

// User types (Netlify Identity)
export interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
  };
  created_at: string;
}
