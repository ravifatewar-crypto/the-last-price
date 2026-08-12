import Link from 'next/link';
import { ArrowUpRight, BarChart3, FileText, Download } from 'lucide-react';

export default function MarketIntelligencePage() {
  const reports = [
    {
      title: 'Delhi NCR Infrastructure Arbitrage Memo (Q3 2026)',
      date: 'August 2026',
      summary: 'Evaluating price dislocation across RRTS corridors, Hindon Elevated Road extensions, and Jewar Airport transit catchment zones.',
      type: 'Macro Memo',
    },
    {
      title: 'North Goa Vacation Rental Yield Audit',
      date: 'July 2026',
      summary: 'Comparative analysis of Morjim vs Assagao villa occupancy rates post-MOPA International Airport expansion.',
      type: 'Yield Audit',
    },
    {
      title: 'Dubai Business Bay vs Maritime City Capital Growth Comparison',
      date: 'June 2026',
      summary: 'Underwriting USD-pegged rental yields and 10-year Golden Visa capital allocation models for Indian HNIs.',
      type: 'International Memo',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="border-b border-[#E5E5E5] pb-8 space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B]">
          research & data hub
        </span>
        <h1 className="text-4xl font-extrabold text-[#0A0A0A] tracking-tight lowercase">
          market intelligence & macro notes
        </h1>
        <p className="text-sm text-[#6B6B6B] max-w-2xl leading-relaxed">
          Institutional research memos, yield benchmarks, and quarterly corridor audits published by the last price research desk.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reports.map((report, idx) => (
          <div key={idx} className="border border-[#E5E5E5] p-8 space-y-6 bg-white flex flex-col justify-between hover:border-[#0A0A0A] transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#6B6B6B] uppercase">
                <span>{report.type}</span>
                <span>{report.date}</span>
              </div>
              <h3 className="text-xl font-bold text-[#0A0A0A] lowercase leading-snug">
                {report.title}
              </h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                {report.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5E5E5] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#1F5C3D] uppercase font-bold">Verified Research Memo</span>
              <button className="text-xs font-semibold uppercase text-[#0A0A0A] hover:underline inline-flex items-center">
                request memo
                <Download className="ml-1 w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
