import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { isAbortError, marketplaceApi } from '../../services/marketplaceApi';
import type { APIListingItem } from '../../types/api';

interface UseListingsParams {
  category?: string;
  search?: string;
  perPage?: number;
  enabled?: boolean;
}

export const useListings = ({ category = 'all', search = '', perPage = 9, enabled = true }: UseListingsParams = {}) => {
  const query = useInfiniteQuery({
    queryKey: ['listings', { category, search, perPage }],
    queryFn: async ({ pageParam = 1, signal }) => {
      const response = await marketplaceApi.getListings(
        {
          page: pageParam,
          per_page: perPage,
          category,
          search: search || undefined,
        },
        signal,
      );
      return response;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.page < lastPage.pagination.total_pages) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.pagination.page > 1) {
        return firstPage.pagination.page - 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      // Don't retry if the request was cancelled
      if (isAbortError(error)) {
        return false;
      }
      return failureCount < 3;
    },
  });

  // Flatten all pages into a single array of listings
  const flatListings = useMemo(() => {
    if (!query.data?.pages) return [];
    const result: APIListingItem[] = [];
    for (const page of query.data.pages) {
      result.push(...page.data);
    }
    return result;
  }, [query.data?.pages]);

  // Get pagination info from the last page
  const paginationInfo = useMemo(() => {
    const lastPage = query.data?.pages[query.data.pages.length - 1];
    return lastPage?.pagination || null;
  }, [query.data?.pages]);

  // Helper function to load more data
  const loadMore = () => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  };

  return {
    // Data
    listings: flatListings,
    pagination: paginationInfo,

    // Loading states
    isLoading: query.isLoading,
    isLoadingMore: query.isFetchingNextPage,
    isFetching: query.isFetching,
    isRefreshing: query.isRefetching,

    // Error state
    error: query.error,
    isError: query.isError,

    // Pagination actions
    hasNextPage: query.hasNextPage,
    loadMore,

    // Utility actions
    refetch: query.refetch,

    // Raw query object for advanced usage
    query,
  };
};

// Hook for a single listing detail
export const useListingDetail = (listingId: number | null, enabled = true) => {
  return useQuery({
    queryKey: ['listing-detail', listingId],
    queryFn: async ({ signal }) => {
      if (!listingId) throw new Error('Listing ID is required');

      console.log('[useListingDetail] Request →', { listingId });
      const response = await marketplaceApi.getListingDetails(listingId, signal);
      console.log('[useListingDetail] Response ←', {
        success: response.success,
        hasData: Boolean(response.data),
        dataSample: response.data
          ? {
              id: response.data.id,
              title: response.data.title,
            }
          : null,
      });
      return response.data; // Return just the listing data
    },
    enabled: enabled && listingId !== null,
    staleTime: 10 * 60 * 1000, // 10 minutes for detail pages
    gcTime: 15 * 60 * 1000, // 15 minutes
    retry: (failureCount, error) => {
      if (isAbortError(error)) return false;
      return failureCount < 2;
    },
    // keep options minimal to satisfy typings; logs above are sufficient
  });
};
