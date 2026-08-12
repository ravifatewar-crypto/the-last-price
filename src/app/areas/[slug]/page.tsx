import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { ChevronRight, CheckCircle2, TrendingUp } from 'lucide-react';
import { OpportunityItem } from '@/types';

export const revalidate = 0;

interface AreaDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function AreaDetailPage({ params }: AreaDetailPageProps) {
  const rawArea = await db.area.findUnique({
    where: { slug: params.slug },
    include: {
      opportunities: {
        where: { status: 'PUBLISHED' },
        include: { area: true, builder: true },
      },
    },
  });

  if (!rawArea) {
    notFound();
  }

  const infraHighlights: string[] = typeof rawArea.infraHighlights === 'string'
    ? JSON.parse(rawArea.infraHighlights || '[]')
    : rawArea.infraHighlights;

  const opportunities: OpportunityItem[] = rawArea.opportunities.map((op) => ({
    ...op,
    category: op.category as any,
    propertyType: op.propertyType as any,
    status: op.status as any,
    images: typeof op.images === 'string' ? JSON.parse(op.images || '[]') : op.images,
    area: rawArea ? {
      ...rawArea,
      infraHighlights: typeof rawArea.infraHighlights === 'string' ? JSON.parse(rawArea.infraHighlights || '[]') : rawArea.infraHighlights,
    } : null,
    builder: op.builder ? {
      ...op.builder,
      pastProjects: typeof op.builder.pastProjects === 'string' ? JSON.parse(op.builder.pastProjects || '[]') : op.builder.pastProjects,
    } : null,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb Header */}
      <nav className="flex items-center text-xs text-[#6B6B6B] space-x-2 font-mono uppercase tracking-wider">
        <Link href="/" className="hover:text-[#0A0A0A]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/areas" className="hover:text-[#0A0A0A]">Areas</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#0A0A0A]">{rawArea.name}</span>
      </nav>

      {/* Header Info */}
      <div className="border-b border-[#E5E5E5] pb-8 space-y-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B]">
          micro-market corridor profile
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0A0A0A] tracking-tight lowercase">
          {rawArea.name}
        </h1>
        <p className="text-base text-[#262626] max-w-3xl leading-relaxed">
          {rawArea.overview}
        </p>

        {/* Price Trend & Appreciation Note */}
        <div className="p-6 bg-[#0A0A0A] text-white space-y-2 border border-[#0A0A0A]">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#A3A3A3]">
            <TrendingUp className="w-4 h-4 text-white" />
            <span>Price Trend & Appreciation Outlook</span>
          </div>
          <p className="text-base font-medium leading-relaxed">
            {rawArea.priceTrendNotes}
          </p>
        </div>
      </div>

      {/* Infrastructure Highlights */}
      {infraHighlights && infraHighlights.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#0A0A0A] lowercase">
            key infrastructure catalysts & transit nodes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {infraHighlights.map((highlight, idx) => (
              <div key={idx} className="p-4 border border-[#E5E5E5] bg-[#F9F9F9] text-xs font-medium text-[#0A0A0A] flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-3 text-[#1F5C3D] flex-shrink-0" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Researched Opportunities Grid */}
      <div className="space-y-6 pt-4 border-t border-[#E5E5E5]">
        <h2 className="text-2xl font-bold text-[#0A0A0A] lowercase">
          researched opportunities in {rawArea.name} ({opportunities.length})
        </h2>

        {opportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {opportunities.map((op) => (
              <OpportunityCard key={op.id} opportunity={op} />
            ))}
          </div>
        ) : (
          <div className="p-8 border border-[#E5E5E5] text-xs text-[#6B6B6B]">
            No active published research notes currently listed for this corridor.
          </div>
        )}
      </div>
    </div>
  );
}
