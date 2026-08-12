'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Search } from 'lucide-react';

interface FilterBarProps {
  currentCategory: string;
  currentCity: string;
  currentType: string;
  currentSearch: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  currentCategory,
  currentCity,
  currentType,
  currentSearch,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(currentSearch);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'ALL') {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam('search', search);
  };

  const categories = [
    { label: 'All Opportunities', value: 'ALL' },
    { label: 'New Investment Opportunity', value: 'NEW' },
    { label: 'Re-Investment', value: 'RE_INVESTMENT' },
    { label: 'Missed Opportunity', value: 'MISSED' },
  ];

  const cities = [
    { label: 'All Cities', value: 'ALL' },
    { label: 'Ghaziabad', value: 'Ghaziabad' },
    { label: 'Noida', value: 'Noida' },
    { label: 'Goa', value: 'Goa' },
    { label: 'Dubai', value: 'Dubai' },
  ];

  const types = [
    { label: 'All Types', value: 'ALL' },
    { label: 'Residential', value: 'RESIDENTIAL' },
    { label: 'Commercial', value: 'COMMERCIAL' },
  ];

  return (
    <div className="bg-[#F9F9F9] border border-[#E5E5E5] p-6 space-y-6">
      {/* Category Pills Bar */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-[#E5E5E5]">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => updateParam('category', cat.value)}
            className={`text-xs uppercase font-medium tracking-wider px-4 py-2 border transition-all ${
              currentCategory === cat.value
                ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                : 'bg-white text-[#6B6B6B] border-[#E5E5E5] hover:border-[#0A0A0A] hover:text-[#0A0A0A]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* City, Type & Search Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* City Filter */}
        <div className="md:col-span-3">
          <label className="block text-[10px] uppercase tracking-widest text-[#6B6B6B] mb-1 font-mono">
            City / Region
          </label>
          <select
            value={currentCity}
            onChange={(e) => updateParam('city', e.target.value)}
            className="w-full text-xs font-medium text-[#0A0A0A] bg-white border border-[#E5E5E5] px-3 py-2 focus:border-[#0A0A0A] focus:outline-none"
          >
            {cities.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type Filter */}
        <div className="md:col-span-3">
          <label className="block text-[10px] uppercase tracking-widest text-[#6B6B6B] mb-1 font-mono">
            Asset Type
          </label>
          <select
            value={currentType}
            onChange={(e) => updateParam('propertyType', e.target.value)}
            className="w-full text-xs font-medium text-[#0A0A0A] bg-white border border-[#E5E5E5] px-3 py-2 focus:border-[#0A0A0A] focus:outline-none"
          >
            {types.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Keyword Search Input */}
        <div className="md:col-span-6">
          <label className="block text-[10px] uppercase tracking-widest text-[#6B6B6B] mb-1 font-mono">
            Search Research Notes
          </label>
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search by project, area, thesis keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs text-[#0A0A0A] bg-white border border-[#E5E5E5] pl-3 pr-10 py-2 focus:border-[#0A0A0A] focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#6B6B6B] hover:text-[#0A0A0A]"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
