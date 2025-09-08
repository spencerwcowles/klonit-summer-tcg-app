// Raw API response types - these match exactly what the Klonit API returns
// Keep these separate from UI types to maintain clean data transformation

export interface APIListingItem {
  id: number;
  title: string;
  short_description: string;
  long_description: string;
  authorName: string;
  authorImage: string;
  category_key: string;
  chatbot_id: number;
  user_id: number;
  is_published: boolean;
  rating: number;
  subscriberCount: number;
  thumbnail_url: string | null;
  updated_at: string;
}

export interface APIListingsResponse {
  success: boolean;
  data: APIListingItem[];
  pagination: {
    page: number;
    per_page: number;
    total_items: number;
    total_pages: number;
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
