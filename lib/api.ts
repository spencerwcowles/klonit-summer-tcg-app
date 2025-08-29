import axios, { type AxiosError, type AxiosInstance } from 'axios';

// Normalized error type that components will receive
export interface APIError {
  message: string;
  status?: number;
  code?: string;
  isNetworkError: boolean;
  isServerError: boolean;
  isClientError: boolean;
}

// API configuration
const API_CONFIG = {
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: Number(process.env.EXPO_PUBLIC_API_TIMEOUT) || 15000,
  headers: {
    'Content-Type': 'application/json',
  },
};

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create(API_CONFIG);

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add any auth headers here if needed in the future
        return config;
      },
      (error) => Promise.reject(this.normalizeError(error)),
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => Promise.reject(this.normalizeError(error)),
    );
  }

  // Normalize all errors to a consistent format
  private normalizeError(error: any): APIError {
    if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
      return {
        message: 'Network connection failed. Please check your internet connection.',
        code: error.code,
        isNetworkError: true,
        isServerError: false,
        isClientError: false,
      };
    }

    if (error.response) {
      const status = error.response.status;
      const isServerError = status >= 500;
      const isClientError = status >= 400 && status < 500;

      let message = 'An unexpected error occurred';

      if (isServerError) {
        message = 'Server is currently unavailable. Please try again later.';
      } else if (status === 404) {
        message = 'The requested resource was not found.';
      } else if (status === 403) {
        message = 'Access denied.';
      } else if (status === 401) {
        message = 'Authentication required.';
      } else if (isClientError) {
        message = error.response.data?.message || 'Invalid request.';
      }

      return {
        message,
        status,
        code: error.code,
        isNetworkError: false,
        isServerError,
        isClientError,
      };
    }

    return {
      message: error.message || 'An unexpected error occurred',
      code: error.code,
      isNetworkError: false,
      isServerError: false,
      isClientError: false,
    };
  }

  // Public methods that services will use
  async get<T>(url: string, config?: any): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: any): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

// Export singleton instance
export const apiClient = new APIClient();

// Export types for services to use
export type { AxiosRequestConfig } from 'axios';
