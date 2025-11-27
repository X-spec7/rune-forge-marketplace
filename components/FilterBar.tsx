'use client';

import { FilterType } from '@/types';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All Products' },
  { value: 'models', label: 'Models' },
  { value: 'plugins', label: 'Plugins' },
  { value: 'tools', label: 'Tools' }
];

export default function FilterBar({ currentFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex justify-center gap-4 mb-8 flex-wrap">
      {filters.map(filter => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
            currentFilter === filter.value
              ? 'bg-gradient-to-r from-gold to-bronze text-bg shadow-[0_5px_15px_rgba(212,175,55,0.4)]'
              : 'bg-black/80 border border-gold/30 text-text hover:border-gold'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
