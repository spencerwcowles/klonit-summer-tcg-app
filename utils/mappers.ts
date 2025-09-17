import type { AIAssistant } from '../types';
import type { APIListingDetailItem, APIListingItem } from '../types/api';

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

  // Format the updated date if available
  const lastUpdated = apiListing.updated_at ? new Date(apiListing.updated_at).toLocaleDateString() : undefined;

  // Safely handle descriptions with fallbacks
  const shortDesc = stripHtmlTags(apiListing.short_description || 'No description available.');
  const longDesc = stripHtmlTags(apiListing.long_description || '');

  return {
    id: apiListing.id?.toString() || '0',
    name: title,
    description: shortDesc,
    longDescription: longDesc || undefined,
    rating: apiListing.rating ?? 0,
    totalUsers: apiListing.subscriberCount ?? 0,
    category: apiListing.category_key || 'general',
    provider: apiListing.authorName || 'Unknown Author',
    logoUrl: apiListing.thumbnail_url || undefined,
    providerImage: apiListing.authorImage || undefined,
    lastUpdated,
    brandName,
    brandSubtitle,
    chatbotId: (apiListing as any).chatbot_id || undefined,
  };
};

/**
 * Maps detailed API listing data (nested structure) to UI AIAssistant format
 * Used for individual listing detail pages with different API structure
 */
export const mapAPIListingDetailToAIAssistant = (apiListingDetail: APIListingDetailItem): AIAssistant => {
  const listing = apiListingDetail.listing;
  const author = apiListingDetail.author;
  const avatar = apiListingDetail.avatar;

  // Safely handle potentially undefined title
  const title = listing.title || 'Untitled';

  // Generate brand name from title (first two words)
  const words = title.split(' ');
  const brandName = words.length >= 2 ? `${words[0].toUpperCase()} ${words[1].toUpperCase()}` : title.toUpperCase();

  // Generate brand subtitle from remaining words
  const brandSubtitle = words.length > 2 ? words.slice(2).join(' ').toUpperCase() : '';

  // Format the updated date if available
  const lastUpdated = listing.updated_at ? new Date(listing.updated_at).toLocaleDateString() : undefined;

  // Safely handle descriptions with fallbacks
  const shortDesc = stripHtmlTags(listing.short_description || 'No description available.');
  const longDesc = stripHtmlTags(listing.long_description || '');

  return {
    id: listing.id?.toString() || '0',
    name: title,
    description: shortDesc,
    longDescription: longDesc || undefined,
    rating: listing.rating ?? 0,
    totalUsers: listing.subscriberCount ?? 0,
    category: listing.category_key || 'general',
    provider: author.name || 'Unknown Author',
    logoUrl: listing.thumbnail_url || avatar.avatar_image || undefined,
    providerImage: author.image || undefined,
    lastUpdated,
    brandName,
    brandSubtitle,
    chatbotId: (listing as any).chatbot_id || undefined,
  };
};

/**
 * Maps an array of API listings to UI AIAssistant array
 */
export const mapAPIListingsToAIAssistants = (apiListings: APIListingItem[]): AIAssistant[] => {
  return apiListings.map(mapAPIListingToAIAssistant);
};
