'use client';

import { SortType } from '@/types';

interface SortDropdownProps {
  currentSort: SortType;
  onSortChange: (sort: SortType) => void;
}

const sortOptions: { value: SortType; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' }
];

export default function SortDropdown({ currentSort, onSortChange }: SortDropdownProps) {
  return (
    <div className="text-right mb-10">
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as SortType)}
        className="px-5 py-2.5 bg-black/90 border border-gold text-text rounded-lg cursor-pointer focus:outline-none focus:border-gold-light transition-colors"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
