import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { db } from '@/lib/db';
import { CategoryBadge } from '@/components/ui/Badge';
import { JsonLd } from '@/components/seo/JsonLd';
import { DiligenceForm } from '@/components/opportunities/DiligenceForm';
import { MapPin, Building, ArrowUpRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { OpportunityItem } from '@/types';

export const revalidate = 0;

interface OpportunityDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: OpportunityDetailPageProps): Promise<Metadata> {
  const op = await db.opportunity.findUnique({
    where: { slug: params.slug },
  });

  if (!op) {
    return { title: 'Opportunity Not Found — the last price.' };
  }

  return {
    title: `${op.title} (${op.city}) — Investment Research Note | the last price.`,
    description: op.thesis,
    openGraph: {
      title: `${op.title} — Real Estate Research Note`,
      description: op.thesis,
      type: 'article',
      url: `https://thelastprice.in/opportunities/${op.slug}`,
    },
  };
}

export default async function OpportunityDetailPage({ params }: OpportunityDetailPageProps) {
  const rawOp = await db.opportunity.findUnique({
    where: { slug: params.slug },
    include: { builder: true, area: true },
  });

  if (!rawOp) {
    notFound();
  }

  const opportunity: OpportunityItem = {
    ...rawOp,
    category: rawOp.category as any,
    propertyType: rawOp.propertyType as any,
    status: rawOp.status as any,
    images: typeof rawOp.images === 'string' ? JSON.parse(rawOp.images || '[]') : rawOp.images,
    area: rawOp.area ? {
      ...rawOp.area,
      infraHighlights: typeof rawOp.area.infraHighlights === 'string' ? JSON.parse(rawOp.area.infraHighlights || '[]') : [],
    } : null,
    builder: rawOp.builder ? {
      ...rawOp.builder,
      pastProjects: typeof rawOp.builder.pastProjects === 'string' ? JSON.parse(rawOp.builder.pastProjects || '[]') : [],
    } : null,
  };

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* JSON-LD Structured Data */}
      <JsonLd opportunity={opportunity} />

      {/* Breadcrumb Header */}
      <nav className="flex items-center text-xs text-[#6B6B6B] space-x-2 font-mono uppercase tracking-wider">
        <Link href="/" className="hover:text-[#0A0A0A]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/opportunities" className="hover:text-[#0A0A0A]">Opportunities</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#0A0A0A] truncate">{opportunity.title}</span>
      </nav>

      {/* Hero Header Section */}
      <div className="space-y-6 border-b border-[#E5E5E5] pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <CategoryBadge category={opportunity.category} size="lg" />
          <span className="text-xs text-[#6B6B6B] uppercase font-mono tracking-widest">
            {opportunity.city}{opportunity.country !== 'India' ? `, ${opportunity.country}` : ''}
          </span>
          <span className="text-xs text-[#8E8E93] font-mono">
            • Updated {new Date(opportunity.updatedAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A0A0A] tracking-tight lowercase leading-tight">
          {opportunity.title}
        </h1>

        {/* Key Underwriting Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-[#F9F9F9] border border-[#E5E5E5]">
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-[#6B6B6B]">Price Band</span>
            <span className="text-lg font-bold text-[#0A0A0A] font-data">{opportunity.priceBand}</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-[#6B6B6B]">Property Type</span>
            <span className="text-base font-semibold text-[#0A0A0A] uppercase">{opportunity.propertyType}</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-[#6B6B6B]">City / Country</span>
            <span className="text-base font-semibold text-[#0A0A0A]">{opportunity.city}, {opportunity.country}</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-[#6B6B6B]">Developer</span>
            <span className="text-base font-semibold text-[#0A0A0A]">{opportunity.builder?.name || 'Vetted Developer'}</span>
          </div>
        </div>
      </div>

      {/* Main Image Gallery & Thesis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left 8 Columns: Images, Thesis & Deep Research Writeup */}
        <div className="lg:col-span-8 space-y-10">
          {/* Main Research Image */}
          {opportunity.images && opportunity.images.length > 0 && (
            <div className="space-y-4">
              <div className="relative h-[380px] sm:h-[480px] w-full border border-[#E5E5E5] bg-[#F9F9F9] overflow-hidden">
                <Image
                  src={opportunity.images[0]}
                  alt={opportunity.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>

              {/* Secondary Thumbnails */}
              {opportunity.images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {opportunity.images.slice(1, 4).map((imgUrl, idx) => (
                    <div key={idx} className="relative h-28 border border-[#E5E5E5] overflow-hidden">
                      <Image src={imgUrl} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Investment Thesis Callout Box */}
          <div className="p-8 bg-[#0A0A0A] text-white space-y-4 border border-[#0A0A0A]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A3A3A3]">
              executive investment thesis
            </span>
            <p className="text-lg sm:text-xl font-medium leading-relaxed">
              &ldquo;{opportunity.thesis}&rdquo;
            </p>
          </div>

          {/* Full Markdown Research Writeup */}
          <div className="prose max-w-none text-[#0A0A0A] space-y-6 leading-relaxed">
            <h2 className="text-2xl font-bold tracking-tight border-b border-[#E5E5E5] pb-3 lowercase">
              underwriting research breakdown
            </h2>
            <div className="whitespace-pre-line text-sm sm:text-base text-[#262626] font-sans space-y-4">
              {opportunity.summary}
            </div>
          </div>

          {/* Connected Micro-Market Box */}
          {opportunity.area && (
            <div className="border border-[#E5E5E5] p-6 space-y-4 bg-[#F9F9F9]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#6B6B6B]">
                  micro-market report
                </span>
                <Link
                  href={`/areas/${opportunity.area.slug}`}
                  className="text-xs font-semibold uppercase text-[#0A0A0A] hover:underline flex items-center"
                >
                  view full area profile
                  <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
                </Link>
              </div>
              <h3 className="text-xl font-bold text-[#0A0A0A] lowercase">
                {opportunity.area.name}
              </h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                {opportunity.area.overview}
              </p>
              {opportunity.area.infraHighlights && opportunity.area.infraHighlights.length > 0 && (
                <div className="pt-2">
                  <span className="text-[10px] uppercase font-mono text-[#6B6B6B] block mb-2">Key Infra Catalysts:</span>
                  <ul className="space-y-1">
                    {opportunity.area.infraHighlights.map((highlight: string, idx: number) => (
                      <li key={idx} className="text-xs text-[#0A0A0A] flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-[#1F5C3D]" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Connected Developer Profile Box */}
          {opportunity.builder && (
            <div className="border border-[#E5E5E5] p-6 space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#6B6B6B]">
                  developer audit profile
                </span>
                <Link
                  href={`/builders/${opportunity.builder.slug}`}
                  className="text-xs font-semibold uppercase text-[#0A0A0A] hover:underline flex items-center"
                >
                  view builder track record
                  <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
                </Link>
              </div>
              <h3 className="text-xl font-bold text-[#0A0A0A]">
                {opportunity.builder.name}
              </h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                {opportunity.builder.history}
              </p>
              <div className="pt-2 text-xs text-[#0A0A0A] font-medium border-t border-[#E5E5E5]">
                <span className="text-[#6B6B6B]">Verified Delivery Track Record:</span> {opportunity.builder.trackRecord}
              </div>
            </div>
          )}
        </div>

        {/* Right 4 Columns: Diligence Request Box */}
        <div className="lg:col-span-4 space-y-8">
          <div className="sticky top-28 bg-white border border-[#0A0A0A] p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="border-b border-[#E5E5E5] pb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#6B6B6B] block mb-1">
                institutional diligence
              </span>
              <h3 className="text-xl font-bold text-[#0A0A0A] lowercase">
                request research note & financial model
              </h3>
            </div>

            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Schedule a 1-on-1 diligence briefing with our research desk. Receive the unredacted financial model, land title audit, and rental yield projections.
            </p>

            <DiligenceForm opportunityTitle={opportunity.title} />
          </div>
        </div>
      </div>
    </article>
  );
}
