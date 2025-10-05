import axios, { type AxiosError, type AxiosInstance } from 'axios';

export interface APIError {
  message: string;
  status?: number;
  code?: string;
  isNetworkError: boolean;
  isServerError: boolean;
  isClientError: boolean;
}

type APIClientOptions = {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
};

const DEFAULT_TIMEOUT = Number(process.env.EXPO_PUBLIC_API_TIMEOUT) || 15000;

class APIClient {
  private client: AxiosInstance;

  constructor(opts: APIClientOptions = {}) {
    this.client = axios.create({
      baseURL: opts.baseURL ?? process.env.EXPO_PUBLIC_API_BASE_URL, // marketplace default
      timeout: opts.timeout ?? DEFAULT_TIMEOUT,
      headers: { 'Content-Type': 'application/json', ...(opts.headers ?? {}) },
    });

    this.client.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(this.normalizeError(error)),
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => Promise.reject(this.normalizeError(error)),
    );
  }

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
      if (isServerError) message = 'Server is currently unavailable. Please try again later.';
      else if (status === 404) message = 'The requested resource was not found.';
      else if (status === 403) message = 'Access denied.';
      else if (status === 401) message = 'Authentication required.';
      else if (isClientError) message = (error.response.data as any)?.message || 'Invalid request.';
      return { message, status, code: error.code, isNetworkError: false, isServerError, isClientError };
    }
    return { message: error.message || 'An unexpected error occurred', code: error.code, isNetworkError: false, isServerError: false, isClientError: false };
  }

  async get<T>(url: string, config?: any): Promise<T> {
    const res = await this.client.get<T>(url, config);
    return res.data;
  }
  async post<T>(url: string, data?: any, config?: any): Promise<T> {
    const res = await this.client.post<T>(url, data, config);
    return res.data;
  }
  async put<T>(url: string, data?: any, config?: any): Promise<T> {
    const res = await this.client.put<T>(url, data, config);
    return res.data;
  }
  async delete<T>(url: string, config?: any): Promise<T> {
    const res = await this.client.delete<T>(url, config);
    return res.data;
  }
}

// ── Export TWO clients
export const marketplaceClient = new APIClient({
  baseURL: process.env.EXPO_PUBLIC_MARKET_BASE_URL, // https://klonit-testing-backend.oielpj.easypanel.host
});

export const promptClient = new APIClient({
  baseURL: process.env.EXPO_PUBLIC_PROMPT_BASE_URL, // https://klonit-production-klonit.rduxij.easypanel.host
});

export type { AxiosRequestConfig } from 'axios';
