export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'models' | 'plugins' | 'tools';
  image: string;
  version: string;
  description: string;
  rating: number;
  reviews: number;
  downloads: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export type FilterType = 'all' | 'models' | 'plugins' | 'tools';
export type SortType = 'newest' | 'popular' | 'rating' | 'price-low' | 'price-high';
