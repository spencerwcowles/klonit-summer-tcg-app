import { marketplaceClient } from '../lib/api';
import type { APICategoriesResponse, APIListingDetailResponse, APIListingsResponse, ListingsQueryParams } from '../types/api';

// Marketplace API service functions with AbortController support

export const marketplaceApi = {
  /**
   * Fetch paginated marketplace listings
   */
  async getListings(params: ListingsQueryParams = {}, signal?: AbortSignal): Promise<APIListingsResponse> {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append('page', params.page.toString());
    if (params.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params.category && params.category !== 'all') queryParams.append('category', params.category);
    if (params.search) queryParams.append('search', params.search);

    const url = `/marketplace/listings${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    return marketplaceClient.get<APIListingsResponse>(url, { signal });
  },

  /**
   * Fetch details for a specific listing
   */
  async getListingDetails(listingId: number, signal?: AbortSignal): Promise<APIListingDetailResponse> {
    return marketplaceClient.get<APIListingDetailResponse>(`/marketplace/listings/${listingId}`, { signal });
  },

  /**
   * Fetch all available categories
   */
  async getCategories(signal?: AbortSignal): Promise<APICategoriesResponse> {
    return marketplaceClient.get<APICategoriesResponse>('/marketplace/categories', { signal });
  },
};

// Helper function to create AbortController for cancellable requests
export const createAbortController = () => new AbortController();

// Helper function to check if error is due to request cancellation
export const isAbortError = (error: any): boolean => {
  return error?.name === 'AbortError' || error?.code === 'ERR_CANCELED';
};
