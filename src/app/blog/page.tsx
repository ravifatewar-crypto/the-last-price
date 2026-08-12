import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function BlogPage() {
  const articles = [
    {
      title: 'Why Listing Portals Fail Real Estate Investors (And How Diligence Fixes It)',
      date: 'August 10, 2026',
      readTime: '6 min read',
      excerpt: 'Traditional property listing portals profit from broker lead generation rather than capital protection. Here is how institutional investors audit real estate opportunities.',
      category: 'Editorial Philosophy',
    },
    {
      title: 'The RRTS Transit Arbitrage: Lessons from Raj Nagar Extension & Ghaziabad',
      date: 'August 02, 2026',
      readTime: '8 min read',
      excerpt: 'How regional rapid transit systems create predictable multi-stage capital growth curves before suburban residential land prices peak.',
      category: 'Infrastructure',
    },
    {
      title: 'Underwriting Vacation Rental Yields in North Goa vs Commercial Retail in Noida',
      date: 'July 24, 2026',
      readTime: '10 min read',
      excerpt: 'Comparing fixed lease commercial yields against seasonal luxury villa rental cash flows for diversified high-net-worth portfolios.',
      category: 'Asset Allocation',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="border-b border-[#E5E5E5] pb-8 space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B]">
          editorial desk
        </span>
        <h1 className="text-4xl font-extrabold text-[#0A0A0A] tracking-tight lowercase">
          editorial research & articles
        </h1>
        <p className="text-sm text-[#6B6B6B] max-w-2xl leading-relaxed">
          Deep-dive essays on real estate underwriting, infrastructure timing, and investment diligence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article, idx) => (
          <article key={idx} className="border border-[#E5E5E5] p-8 space-y-6 bg-white flex flex-col justify-between hover:border-[#0A0A0A] transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#6B6B6B] uppercase">
                <span>{article.category}</span>
                <span>{article.readTime}</span>
              </div>
              <h3 className="text-xl font-bold text-[#0A0A0A] lowercase leading-snug">
                {article.title}
              </h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5E5E5] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#737373] uppercase">{article.date}</span>
              <span className="text-xs font-semibold uppercase text-[#0A0A0A] inline-flex items-center cursor-pointer hover:underline">
                read article
                <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
