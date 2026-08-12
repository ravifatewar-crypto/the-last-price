import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { ChevronRight, Building, CheckCircle2 } from 'lucide-react';
import { OpportunityItem } from '@/types';

export const revalidate = 0;

interface BuilderDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function BuilderDetailPage({ params }: BuilderDetailPageProps) {
  const rawBuilder = await db.builder.findUnique({
    where: { slug: params.slug },
    include: {
      opportunities: {
        where: { status: 'PUBLISHED' },
        include: { area: true, builder: true },
      },
    },
  });

  if (!rawBuilder) {
    notFound();
  }

  const pastProjects: string[] = typeof rawBuilder.pastProjects === 'string'
    ? JSON.parse(rawBuilder.pastProjects || '[]')
    : rawBuilder.pastProjects;

  const opportunities: OpportunityItem[] = rawBuilder.opportunities.map((op) => ({
    ...op,
    category: op.category as any,
    propertyType: op.propertyType as any,
    status: op.status as any,
    images: typeof op.images === 'string' ? JSON.parse(op.images || '[]') : op.images,
    area: op.area ? {
      ...op.area,
      infraHighlights: typeof op.area.infraHighlights === 'string' ? JSON.parse(op.area.infraHighlights || '[]') : op.area.infraHighlights,
    } : null,
    builder: rawBuilder ? {
      ...rawBuilder,
      pastProjects: typeof rawBuilder.pastProjects === 'string' ? JSON.parse(rawBuilder.pastProjects || '[]') : rawBuilder.pastProjects,
    } : null,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb Header */}
      <nav className="flex items-center text-xs text-[#6B6B6B] space-x-2 font-mono uppercase tracking-wider">
        <Link href="/" className="hover:text-[#0A0A0A]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/builders" className="hover:text-[#0A0A0A]">Builders</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#0A0A0A]">{rawBuilder.name}</span>
      </nav>

      {/* Header Info */}
      <div className="border-b border-[#E5E5E5] pb-8 space-y-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B]">
          verified developer audit profile
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0A0A0A] tracking-tight">
          {rawBuilder.name}
        </h1>
        <p className="text-base text-[#262626] max-w-3xl leading-relaxed">
          {rawBuilder.history}
        </p>

        <div className="p-6 bg-[#F9F9F9] border border-[#E5E5E5] space-y-2">
          <span className="text-[10px] font-mono uppercase text-[#6B6B6B] tracking-wider block">
            Audited Delivery Record
          </span>
          <p className="text-sm font-semibold text-[#0A0A0A]">
            {rawBuilder.trackRecord}
          </p>
        </div>
      </div>

      {/* Delivered Projects Breakdown */}
      {pastProjects && pastProjects.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#0A0A0A] lowercase">
            key delivered developments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {pastProjects.map((project, idx) => (
              <div key={idx} className="p-4 border border-[#E5E5E5] bg-white text-xs font-medium text-[#0A0A0A] flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2.5 text-[#1F5C3D] flex-shrink-0" />
                <span>{project}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Covered Opportunities Grid */}
      <div className="space-y-6 pt-4 border-t border-[#E5E5E5]">
        <h2 className="text-2xl font-bold text-[#0A0A0A] lowercase">
          researched opportunities by {rawBuilder.name} ({opportunities.length})
        </h2>

        {opportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {opportunities.map((op) => (
              <OpportunityCard key={op.id} opportunity={op} />
            ))}
          </div>
        ) : (
          <div className="p-8 border border-[#E5E5E5] text-xs text-[#6B6B6B]">
            No active published research notes currently listed for this developer.
          </div>
        )}
      </div>
    </div>
  );
}
