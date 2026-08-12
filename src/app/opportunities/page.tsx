import { db } from '@/lib/db';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { FilterBar } from '@/components/opportunities/FilterBar';
import { OpportunityItem } from '@/types';

export const revalidate = 0;

interface OpportunitiesPageProps {
  searchParams: {
    category?: string;
    city?: string;
    propertyType?: string;
    search?: string;
  };
}

export default async function OpportunitiesPage({ searchParams }: OpportunitiesPageProps) {
  const categoryFilter = searchParams.category || 'ALL';
  const cityFilter = searchParams.city || 'ALL';
  const typeFilter = searchParams.propertyType || 'ALL';
  const searchQuery = searchParams.search || '';

  const where: any = { status: 'PUBLISHED' };

  if (categoryFilter !== 'ALL') {
    where.category = categoryFilter;
  }

  if (cityFilter !== 'ALL') {
    where.city = { contains: cityFilter };
  }

  if (typeFilter !== 'ALL') {
    where.propertyType = typeFilter;
  }

  const rawOps = await db.opportunity.findMany({
    where,
    include: { builder: true, area: true },
    orderBy: { createdAt: 'desc' },
  });

  const opportunities: OpportunityItem[] = rawOps
    .map((op) => ({
      ...op,
      category: op.category as any,
      propertyType: op.propertyType as any,
      status: op.status as any,
      images: typeof op.images === 'string' ? JSON.parse(op.images || '[]') : op.images,
      area: op.area ? {
        ...op.area,
        infraHighlights: typeof op.area.infraHighlights === 'string' ? JSON.parse(op.area.infraHighlights || '[]') : op.area.infraHighlights,
      } : null,
      builder: op.builder ? {
        ...op.builder,
        pastProjects: typeof op.builder.pastProjects === 'string' ? JSON.parse(op.builder.pastProjects || '[]') : op.builder.pastProjects,
      } : null,
    }))
    .filter((op) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        op.title.toLowerCase().includes(q) ||
        op.thesis.toLowerCase().includes(q) ||
        op.city.toLowerCase().includes(q)
      );
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Section */}
      <div className="border-b border-[#E5E5E5] pb-8 space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B]">
          research directory
        </span>
        <h1 className="text-4xl font-extrabold text-[#0A0A0A] tracking-tight lowercase">
          investment opportunities
        </h1>
        <p className="text-sm text-[#6B6B6B] max-w-2xl leading-relaxed">
          Explore independent research notes, financial models, and infrastructure reports across NCR, Goa, and Dubai.
        </p>
      </div>

      {/* Filter Controls Component */}
      <FilterBar
        currentCategory={categoryFilter}
        currentCity={cityFilter}
        currentType={typeFilter}
        currentSearch={searchQuery}
      />

      {/* Opportunities Results Grid */}
      {opportunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((op) => (
            <OpportunityCard key={op.id} opportunity={op} />
          ))}
        </div>
      ) : (
        <div className="border border-[#E5E5E5] p-12 text-center space-y-4">
          <p className="text-base text-[#0A0A0A] font-medium">No research opportunities match your filters.</p>
          <p className="text-xs text-[#6B6B6B]">Try adjusting your search criteria or viewing all opportunities.</p>
        </div>
      )}
    </div>
  );
}
