import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { CategoryBadge } from '@/components/ui/Badge';
import { OpportunityItem } from '@/types';

interface OpportunityCardProps {
  opportunity: OpportunityItem;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  return (
    <article className="group bg-white border border-[#E5E5E5] flex flex-col justify-between hover:border-[#0A0A0A] transition-all duration-300">
      <div>
        {/* Card Header Image */}
        <div className="relative h-56 w-full overflow-hidden bg-[#F9F9F9] border-b border-[#E5E5E5]">
          {opportunity.images && opportunity.images[0] ? (
            <Image
              src={opportunity.images[0]}
              alt={opportunity.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#8E8E93] text-xs uppercase font-mono">
              Research Note
            </div>
          )}

          {/* Floating Category Badge */}
          <div className="absolute top-3 left-3 z-10">
            <CategoryBadge category={opportunity.category} size="sm" />
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-center text-xs text-[#6B6B6B] space-x-1 uppercase tracking-wider font-mono">
            <MapPin className="w-3.5 h-3.5" />
            <span>
              {opportunity.city}
              {opportunity.country !== 'India' ? `, ${opportunity.country}` : ''}
            </span>
          </div>

          <h3 className="text-xl font-bold text-[#0A0A0A] tracking-tight group-hover:underline lowercase leading-snug">
            <Link href={`/opportunities/${opportunity.slug}`}>
              {opportunity.title}
            </Link>
          </h3>

          <p className="text-sm text-[#6B6B6B] leading-relaxed line-clamp-2">
            {opportunity.thesis}
          </p>
        </div>
      </div>

      {/* Card Footer Key Stats */}
      <div className="p-6 pt-0 mt-4">
        <div className="pt-4 border-t border-[#E5E5E5] flex items-center justify-between">
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-[#6B6B6B]">Price Band</span>
            <span className="text-sm font-semibold text-[#0A0A0A] font-data">{opportunity.priceBand}</span>
          </div>

          <Link
            href={`/opportunities/${opportunity.slug}`}
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#0A0A0A] group-hover:text-black transition-colors"
          >
            view note
            <ArrowUpRight className="ml-1 w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};
