import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] text-white pt-16 pb-12 border-t border-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#262626]">
          {/* Brand Stacked 3-Line Logo & Mission */}
          <div className="md:col-span-5 space-y-6">
            <div className="leading-none text-3xl font-extrabold tracking-tighter text-white lowercase">
              <div>the</div>
              <div>last</div>
              <div>price.</div>
            </div>
            <p className="text-sm text-[#A3A3A3] leading-relaxed max-w-md font-sans">
              India&apos;s first real estate investment research platform. We publish independent research notes, financial underwriting models, and infrastructure analysis for institutional and individual real estate investors.
            </p>
            <div className="text-xs text-[#737373] tracking-wide uppercase pt-2">
              Ghaziabad • Noida • Goa • Dubai • Pan-India
            </div>
          </div>

          {/* Navigation Column 1: Opportunities & Research */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3]">
              research catalog
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/opportunities" className="hover:text-[#E5E5E5] text-[#D4D4D4] transition-colors">
                  All Investment Opportunities
                </Link>
              </li>
              <li>
                <Link href="/opportunities?category=NEW" className="hover:text-[#E5E5E5] text-[#D4D4D4] transition-colors">
                  New Investment Opportunities
                </Link>
              </li>
              <li>
                <Link href="/opportunities?category=RE_INVESTMENT" className="hover:text-[#E5E5E5] text-[#D4D4D4] transition-colors">
                  Re-Investment Corridors
                </Link>
              </li>
              <li>
                <Link href="/opportunities?category=MISSED" className="hover:text-[#E5E5E5] text-[#D4D4D4] transition-colors">
                  Past Proof Points
                </Link>
              </li>
              <li>
                <Link href="/market-intelligence" className="hover:text-[#E5E5E5] text-[#D4D4D4] transition-colors">
                  Market Intelligence Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2: Markets & Tools */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3]">
              markets & tools
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/areas" className="hover:text-[#E5E5E5] text-[#D4D4D4] transition-colors">
                  Micro-Market Hub
                </Link>
              </li>
              <li>
                <Link href="/builders" className="hover:text-[#E5E5E5] text-[#D4D4D4] transition-colors">
                  Developer Profiles
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="hover:text-[#E5E5E5] text-[#D4D4D4] transition-colors">
                  Investment Calculators
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#E5E5E5] text-[#D4D4D4] transition-colors">
                  Editorial Articles
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Disclaimer Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#737373] gap-4">
          <p>© {new Date().getFullYear()} the last price. All rights reserved. Editorial research platform.</p>
          <p className="text-center md:text-right max-w-xl">
            Disclaimer: Research notes published on the last price are for informational and diligence analysis only. Not financial or investment advice.
          </p>
        </div>
      </div>
    </footer>
  );
};
