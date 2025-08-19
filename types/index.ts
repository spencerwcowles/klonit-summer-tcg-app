export interface AIAssistant {
  id: string;
  name: string;
  description: string;
  rating: number;
  totalUsers: number;
  category: string;
  provider: string;
  logoUrl?: string;
  brandName?: string;
  brandSubtitle?: string;
}

export interface Category {
  id: string;
  name: string;
  count?: number;
}

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All Categories' },
  { id: 'it-software', name: 'IT & Software', count: 10 },
  { id: 'medical', name: 'Medical Professionals', count: 10 },
  { id: 'legal', name: 'Legal Professionals' },
  { id: 'financial', name: 'Financial Professionals' },
  { id: 'educational', name: 'Educational Professionals', count: 10 },
  { id: 'consulting', name: 'Consulting Professionals' },
];
