import type { AIAssistant } from '../types';
import type { APIListingItem } from '../types/api';

/**
 * Maps API listing data to UI AIAssistant format
 * This keeps API types separate from UI types as recommended
 */
export const mapAPIListingToAIAssistant = (apiListing: APIListingItem): AIAssistant => {
  return {
    id: apiListing.id.toString(), // Convert number to string for UI
    name: apiListing.title,
    description: apiListing.description,
    rating: apiListing.rating || 4.0, // Default rating if not provided
    totalUsers: apiListing.total_users || 0,
    category: apiListing.category,
    provider: apiListing.provider || apiListing.author_name || 'Unknown Provider',
    logoUrl: apiListing.logo_url,
    brandName: apiListing.brand_name || apiListing.title.toUpperCase(),
    brandSubtitle: apiListing.brand_subtitle,
  };
};

/**
 * Maps an array of API listings to UI AIAssistant array
 */
export const mapAPIListingsToAIAssistants = (apiListings: APIListingItem[]): AIAssistant[] => {
  return apiListings.map(mapAPIListingToAIAssistant);
};

/**
 * Generates a brand name from a title if not provided
 */
const generateBrandName = (title: string): string => {
  // Take first two words and make them uppercase
  const words = title.split(' ');
  if (words.length >= 2) {
    return `${words[0].toUpperCase()} ${words[1].toUpperCase()}`;
  }
  return title.toUpperCase();
};

/**
 * Generates a brand subtitle from remaining words if not provided
 */
const generateBrandSubtitle = (title: string): string => {
  const words = title.split(' ');
  if (words.length > 2) {
    return words.slice(2).join(' ').toUpperCase();
  }
  return '';
};

/**
 * Enhanced mapper that generates brand names/subtitles if missing
 */
export const mapAPIListingToAIAssistantEnhanced = (apiListing: APIListingItem): AIAssistant => {
  const basicMapping = mapAPIListingToAIAssistant(apiListing);

  return {
    ...basicMapping,
    brandName: apiListing.brand_name || generateBrandName(apiListing.title),
    brandSubtitle: apiListing.brand_subtitle || generateBrandSubtitle(apiListing.title),
  };
};

/**
 * Maps array of API listings with enhanced brand name generation
 */
export const mapAPIListingsToAIAssistantsEnhanced = (apiListings: APIListingItem[]): AIAssistant[] => {
  return apiListings.map(mapAPIListingToAIAssistantEnhanced);
};
