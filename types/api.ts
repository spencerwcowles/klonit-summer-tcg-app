// Raw API response types - these match exactly what the Klonit API returns
// Keep these separate from UI types to maintain clean data transformation

export interface APIListingItem {
  id: number;
  title: string;
  description: string;
  author_name?: string;
  category: string;
  created_at: string;
  updated_at: string;
  is_published: boolean;
  // Add other fields based on actual API response
  rating?: number;
  total_users?: number;
  provider?: string;
  logo_url?: string;
  brand_name?: string;
  brand_subtitle?: string;
}

export interface APIListingsResponse {
  success: boolean;
  data: APIListingItem[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
  message?: string;
}

export interface APIListingDetailResponse {
  success: boolean;
  data: APIListingItem;
  message?: string;
}

export interface APICategoriesResponse {
  success: boolean;
  data: string[];
  message?: string;
}

// Query parameters for API requests
export interface ListingsQueryParams {
  page?: number;
  per_page?: number;
  category?: string;
  search?: string;
}
