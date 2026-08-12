import Link from 'next/link';
import { db } from '@/lib/db';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

export default async function AreasPage() {
  let rawAreas: any[] = [];
  try {
    rawAreas = await db.area.findMany({
      include: { opportunities: true },
      orderBy: { name: 'asc' },
    });
  } catch (err) {
    console.error('Error fetching areas on page:', err);
  }

  const areas = rawAreas.map((a) => ({
    ...a,
    infraHighlights: typeof a.infraHighlights === 'string' ? JSON.parse(a.infraHighlights || '[]') : a.infraHighlights,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="border-b border-[#E5E5E5] pb-8 space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B]">
          micro-market hub
        </span>
        <h1 className="text-4xl font-extrabold text-[#0A0A0A] tracking-tight lowercase">
          key growth corridors & regions
        </h1>
        <p className="text-sm text-[#6B6B6B] max-w-2xl leading-relaxed">
          Detailed infrastructure audits, price trend analysis, and transit node mapping for strategic real estate investment zones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {areas.map((area) => (
          <div key={area.id} className="border border-[#E5E5E5] p-8 space-y-6 bg-white flex flex-col justify-between hover:border-[#0A0A0A] transition-colors">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-[#6B6B6B] uppercase tracking-wider block">
                corridor audit note
              </span>
              <h3 className="text-2xl font-bold text-[#0A0A0A] lowercase">
                <Link href={`/areas/${area.slug}`} className="hover:underline">
                  {area.name}
                </Link>
              </h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed line-clamp-3">
                {area.overview}
              </p>

              {area.infraHighlights && area.infraHighlights.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono uppercase text-[#6B6B6B] block">Infrastructure Drivers:</span>
                  <div className="space-y-1">
                    {area.infraHighlights.slice(0, 3).map((item: string, idx: number) => (
                      <div key={idx} className="text-xs text-[#0A0A0A] flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-[#1F5C3D] flex-shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#E5E5E5] space-y-3">
              <div className="text-xs text-[#0A0A0A] font-medium bg-[#F9F9F9] p-3 border border-[#E5E5E5]">
                <span className="text-[#6B6B6B] block text-[10px] uppercase font-mono">Price Trend Analysis</span>
                {area.priceTrendNotes}
              </div>
              <div className="flex items-center justify-between text-xs pt-2">
                <span className="text-[#6B6B6B] font-mono">
                  {area.opportunities.length} Researched Projects
                </span>
                <Link
                  href={`/areas/${area.slug}`}
                  className="font-semibold uppercase text-[#0A0A0A] hover:underline flex items-center"
                >
                  explore corridor
                  <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
