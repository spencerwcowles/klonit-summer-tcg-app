import type { AIAssistant } from '../types';
import type { APIListingItem } from '../types/api';

/**
 * Maps API listing data to UI AIAssistant format
 * Clean, single function that handles the actual API structure
 */
// Helper function to strip HTML tags from text
const stripHtmlTags = (html: string): string => {
  return html.replace(/<[^>]*>/g, '').trim();
};

export const mapAPIListingToAIAssistant = (apiListing: APIListingItem): AIAssistant => {
  // Safely handle potentially undefined title
  const title = apiListing.title || 'Untitled';

  // Generate brand name from title (first two words)
  const words = title.split(' ');
  const brandName = words.length >= 2 ? `${words[0].toUpperCase()} ${words[1].toUpperCase()}` : title.toUpperCase();

  // Generate brand subtitle from remaining words
  const brandSubtitle = words.length > 2 ? words.slice(2).join(' ').toUpperCase() : '';

  return {
    id: apiListing.id?.toString() || '0',
    name: title,
    description: stripHtmlTags(apiListing.short_description || ''),
    rating: apiListing.rating,
    totalUsers: apiListing.subscriberCount,
    category: apiListing.category_key,
    provider: apiListing.authorName,
    logoUrl: apiListing.thumbnail_url || undefined,
    brandName,
    brandSubtitle,
  };
};

/**
 * Maps an array of API listings to UI AIAssistant array
 */
export const mapAPIListingsToAIAssistants = (apiListings: APIListingItem[]): AIAssistant[] => {
  return apiListings.map(mapAPIListingToAIAssistant);
};
