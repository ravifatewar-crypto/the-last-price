import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import { ArrowUpRight } from 'lucide-react';

export const revalidate = 0;

export default async function BuildersPage() {
  let rawBuilders: any[] = [];
  try {
    rawBuilders = await db.builder.findMany({
      include: { opportunities: true },
      orderBy: { name: 'asc' },
    });
  } catch (err) {
    console.error('Error fetching builders on page:', err);
  }

  const builders = rawBuilders.map((b) => ({
    ...b,
    pastProjects: typeof b.pastProjects === 'string' ? JSON.parse(b.pastProjects || '[]') : b.pastProjects,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="border-b border-[#E5E5E5] pb-8 space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B]">
          developer directory
        </span>
        <h1 className="text-4xl font-extrabold text-[#0A0A0A] tracking-tight lowercase">
          vetted builders & developers
        </h1>
        <p className="text-sm text-[#6B6B6B] max-w-2xl leading-relaxed">
          Forensic delivery audits, historical execution track records, and covered investment opportunities for top real estate developers across India and Dubai.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {builders.map((builder) => (
          <div key={builder.id} className="border border-[#E5E5E5] p-8 space-y-6 bg-white flex flex-col justify-between hover:border-[#0A0A0A] transition-colors">
            <div className="space-y-4">
              {builder.logo && (
                <div className="relative h-12 w-36 bg-[#F9F9F9] border border-[#E5E5E5] p-2">
                  <Image src={builder.logo} alt={builder.name} fill className="object-contain p-1" />
                </div>
              )}
              <h3 className="text-2xl font-bold text-[#0A0A0A]">
                <Link href={`/builders/${builder.slug}`} className="hover:underline">
                  {builder.name}
                </Link>
              </h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed line-clamp-3">
                {builder.history}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5E5E5] space-y-3">
              <div className="text-xs text-[#0A0A0A] font-medium">
                <span className="text-[#6B6B6B] block text-[10px] uppercase font-mono">Verified Delivery Record</span>
                {builder.trackRecord}
              </div>
              <div className="flex items-center justify-between text-xs pt-2">
                <span className="text-[#6B6B6B] font-mono">
                  {builder.opportunities.length} Covered Opportunities
                </span>
                <Link
                  href={`/builders/${builder.slug}`}
                  className="font-semibold uppercase text-[#0A0A0A] hover:underline flex items-center"
                >
                  view profile
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
