/**
 * Standard API response helpers for Netlify Functions
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Create a success response
 */
export function successResponse<T>(
  data: T,
  message?: string,
  statusCode: number = 200
) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      success: true,
      data,
      ...(message && { message }),
    } as ApiResponse<T>),
  };
}

/**
 * Create a paginated success response
 */
export function paginatedResponse<T>(
  data: T[],
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  },
  statusCode: number = 200
) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      success: true,
      data,
      pagination,
    } as ApiResponse<T[]>),
  };
}

/**
 * Create an error response
 */
export function errorResponse(
  error: string,
  statusCode: number = 400,
  code?: string
) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      success: false,
      error,
      ...(code && { code }),
    } as ApiResponse),
  };
}

/**
 * Handle CORS preflight requests
 */
export function corsResponse() {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    body: '',
  };
}
