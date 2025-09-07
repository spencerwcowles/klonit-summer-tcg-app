import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { isAbortError, marketplaceApi } from '../../services/marketplaceApi';
import type { Category } from '../../types';

export const useCategories = (enabled = true) => {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: async ({ signal }) => {
      const response = await marketplaceApi.getCategories(signal);
      return response;
    },
    enabled,
    staleTime: 15 * 60 * 1000, // 15 minutes - categories don't change often
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: (failureCount, error) => {
      if (isAbortError(error)) return false;
      return failureCount < 3;
    },
  });

  // Transform API categories to UI Category format
  const categories = useMemo<Category[]>(() => {
    if (!query.data?.data) return [];

    return [
      { id: 'all', name: 'All Categories' },
      ...query.data.data.map((categoryKey: string) => ({
        id: categoryKey,
        name: formatCategoryName(categoryKey),
      })),
    ];
  }, [query.data?.data]);

  return {
    // Data
    categories,
    rawCategories: query.data?.data || [],

    // Loading states
    isLoading: query.isLoading,
    isFetching: query.isFetching,

    // Error state
    error: query.error,
    isError: query.isError,

    // Utility actions
    refetch: query.refetch,

    // Raw query object for advanced usage
    query,
  };
};

// Helper function to format category keys into display names
const formatCategoryName = (categoryKey: string): string => {
  const formattedNames: Record<string, string> = {
    'it-software': 'IT & Software',
    'medical': 'Medical Professionals',
    'legal': 'Legal Professionals',
    'financial': 'Financial Professionals',
    'educational': 'Educational Professionals',
    'consulting': 'Consulting Professionals',
    'healthcare': 'Healthcare',
    'finance': 'Finance',
    'education': 'Education',
  };

  return (
    formattedNames[categoryKey] ||
    categoryKey
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  );
};
