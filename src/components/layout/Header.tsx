'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Header = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'opportunities', href: '/opportunities' },
    { name: 'builders', href: '/builders' },
    { name: 'areas', href: '/areas' },
    { name: 'market intelligence', href: '/market-intelligence' },
    { name: 'calculators', href: '/calculators' },
    { name: 'blog', href: '/blog' },
  ];

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Single-Line Wordmark */}
        <Link href="/" className="flex items-center group">
          <span className="brand-wordmark text-2xl tracking-tighter text-[#0A0A0A] font-bold lowercase transition-opacity group-hover:opacity-80">
            the last price.
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors lowercase tracking-tight ${
                isActive(link.href)
                  ? 'text-[#0A0A0A] border-b-2 border-[#0A0A0A] pb-1'
                  : 'text-[#6B6B6B] hover:text-[#0A0A0A]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Admin Portal & Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link
            href="/admin"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#0A0A0A] bg-white border border-[#0A0A0A] px-4 py-2 hover:bg-[#0A0A0A] hover:text-white transition-colors"
          >
            admin portal
            <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#0A0A0A] hover:bg-[#F9F9F9] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E5E5E5] px-4 pt-4 pb-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-base font-medium lowercase ${
                isActive(link.href) ? 'text-[#0A0A0A] font-semibold' : 'text-[#6B6B6B]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-[#E5E5E5]">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#0A0A0A] bg-white border border-[#0A0A0A] px-4 py-2 hover:bg-[#0A0A0A] hover:text-white transition-colors w-full justify-center"
            >
              admin portal
              <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
