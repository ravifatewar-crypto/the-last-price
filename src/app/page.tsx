import Link from 'next/link';
import { db } from '@/lib/db';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { ArrowRight, ShieldCheck, BarChart3, Building2, Compass } from 'lucide-react';
import { OpportunityItem } from '@/types';

// Force dynamic rendering to ensure fresh db data
export const revalidate = 0;

export default async function HomePage() {
  // Fetch featured opportunities for Hero Carousel
  const rawFeatured = await db.opportunity.findMany({
    where: { status: 'PUBLISHED', featured: true },
    include: { builder: true, area: true },
    orderBy: { createdAt: 'desc' },
  });

  const featuredSlides: OpportunityItem[] = rawFeatured.map((op) => ({
    ...op,
    category: op.category as any,
    propertyType: op.propertyType as any,
    status: op.status as any,
    images: typeof op.images === 'string' ? JSON.parse(op.images || '[]') : op.images,
    area: op.area ? {
      ...op.area,
      infraHighlights: typeof op.area.infraHighlights === 'string' ? JSON.parse(op.area.infraHighlights || '[]') : [],
    } : null,
    builder: op.builder ? {
      ...op.builder,
      pastProjects: typeof op.builder.pastProjects === 'string' ? JSON.parse(op.builder.pastProjects || '[]') : [],
    } : null,
  }));

  // Fetch current opportunities for homepage grid
  const rawAll = await db.opportunity.findMany({
    where: { status: 'PUBLISHED' },
    include: { builder: true, area: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
  });

  const currentOpportunities: OpportunityItem[] = rawAll.map((op) => ({
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
  }));

  // Fetch areas for micro-market section
  const rawAreas = await db.area.findMany({ take: 4 });
  const areas = rawAreas.map((a) => ({
    ...a,
    infraHighlights: typeof a.infraHighlights === 'string' ? JSON.parse(a.infraHighlights || '[]') : [],
  }));

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* Hero Section Carousel */}
      <HeroCarousel slides={featuredSlides} />

      {/* Trust & Methodology Section: "how we research" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-[#E5E5E5] bg-[#F9F9F9] p-8 lg:p-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E5E5] pb-6 gap-4">
            <div>
              <span className="text-xs text-[#6B6B6B] uppercase tracking-widest font-mono block mb-1">
                our diligence framework
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight lowercase">
                how we research
              </h2>
            </div>
            <p className="text-sm text-[#6B6B6B] max-w-lg leading-relaxed">
              We operate strictly as an independent research team. We do not accept broker listings or developer marketing packages. Every opportunity undergoes a 4-tier diligence audit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#0A0A0A] text-white flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-[#0A0A0A]">Transit Node Mapping</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                Evaluating physical infrastructure catalysts — RRTS stations, expressway links, and airport connectivity before market pricing adjusts.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#0A0A0A] text-white flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-[#0A0A0A]">Yield Underwriting</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                Stressed financial modeling comparing local rental rates against prevailing inflation and interest rate curves.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#0A0A0A] text-white flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-[#0A0A0A]">Developer Delivery Audit</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                Historical forensic analysis of builder completion records, litigation registry checks, and encumbrance verification.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#0A0A0A] text-white flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h3 className="text-base font-bold text-[#0A0A0A]">Exit Liquidity Check</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                Evaluating secondary market resale depth and institutional buyer interest prior to issuing an investment note.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Opportunities Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-[#E5E5E5] gap-4">
          <div>
            <span className="text-xs text-[#6B6B6B] uppercase tracking-widest font-mono block mb-1">
              active research notes
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight lowercase">
              current opportunities
            </h2>
          </div>
          <Link
            href="/opportunities"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#0A0A0A] hover:underline"
          >
            view all research notes ({currentOpportunities.length})
            <ArrowRight className="ml-1.5 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentOpportunities.map((op) => (
            <OpportunityCard key={op.id} opportunity={op} />
          ))}
        </div>
      </section>

      {/* Micro-Market Area Highlights Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-[#E5E5E5] gap-4">
          <div>
            <span className="text-xs text-[#6B6B6B] uppercase tracking-widest font-mono block mb-1">
              micro-market coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight lowercase">
              key growth corridors
            </h2>
          </div>
          <Link
            href="/areas"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#0A0A0A] hover:underline"
          >
            explore all micro-markets
            <ArrowRight className="ml-1.5 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area) => (
            <div key={area.id} className="border border-[#E5E5E5] p-6 space-y-4 hover:border-[#0A0A0A] transition-colors">
              <span className="text-[10px] font-mono text-[#6B6B6B] uppercase tracking-wider block">
                market profile
              </span>
              <h3 className="text-lg font-bold text-[#0A0A0A] lowercase">
                <Link href={`/areas/${area.slug}`} className="hover:underline">
                  {area.name}
                </Link>
              </h3>
              <p className="text-xs text-[#6B6B6B] line-clamp-3 leading-relaxed">
                {area.overview}
              </p>
              <div className="pt-2 border-t border-[#E5E5E5]">
                <Link
                  href={`/areas/${area.slug}`}
                  className="text-xs font-semibold uppercase text-[#0A0A0A] hover:underline inline-flex items-center"
                >
                  view corridor notes
                  <ArrowRight className="ml-1 w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Market Intelligence Teaser Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A0A0A] text-white p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs text-[#A3A3A3] uppercase tracking-widest font-mono">
              institutional intelligence
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white lowercase">
              quarterly ncr & international yield reports
            </h2>
            <p className="text-sm text-[#D4D4D4] leading-relaxed">
              Read our macro intelligence memos covering rental yield trends across Noida Expressway, Ghaziabad transit corridors, North Goa luxury villas, and Dubai waterfront towers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link
              href="/market-intelligence"
              className="inline-flex items-center justify-center text-xs font-semibold uppercase tracking-wider bg-white text-[#0A0A0A] px-6 py-3 hover:bg-[#E5E5E5] transition-colors"
            >
              read intelligence hub
            </Link>
            <Link
              href="/calculators"
              className="inline-flex items-center justify-center text-xs font-semibold uppercase tracking-wider bg-transparent border border-white text-white px-6 py-3 hover:bg-white hover:text-[#0A0A0A] transition-colors"
            >
              run yield calculator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
