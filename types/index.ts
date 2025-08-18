export interface AIAssistant {
  id: string;
  name: string;
  description: string;
  rating: number;
  totalUsers: number;
  category: string;
  provider: string;
  logoUrl?: string;
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

export const MOCK_ASSISTANTS: AIAssistant[] = [
  {
    id: '1',
    name: 'Midwest',
    description: 'We specialize in diagnosing and treating sleep disorders while offering personalized wellness solutions to help you...',
    rating: 3.6,
    totalUsers: 1000,
    category: 'medical',
    provider: 'Midwest Wellness',
  },
  {
    id: '2',
    name: 'Midwest',
    description: 'We specialize in diagnosing and treating sleep disorders while offering personalized wellness solutions to help you...',
    rating: 3.6,
    totalUsers: 1000,
    category: 'medical',
    provider: 'Midwest Wellness',
  },
  {
    id: '3',
    name: 'Midwest',
    description: 'We specialize in diagnosing and treating sleep disorders while offering personalized wellness solutions to help you...',
    rating: 3.6,
    totalUsers: 1000,
    category: 'medical',
    provider: 'Midwest Wellness',
  },
  {
    id: '4',
    name: 'Midwest',
    description: 'We specialize in diagnosing and treating sleep disorders while offering personalized wellness solutions to help you...',
    rating: 3.6,
    totalUsers: 1000,
    category: 'medical',
    provider: 'Midwest Wellness',
  },
  {
    id: '5',
    name: 'Midwest',
    description: 'We specialize in diagnosing and treating sleep disorders while offering personalized wellness solutions to help you...',
    rating: 3.6,
    totalUsers: 1000,
    category: 'medical',
    provider: 'Midwest Wellness',
  },
];
