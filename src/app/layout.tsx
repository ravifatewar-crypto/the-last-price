import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'the last price. — Real Estate Investment Research Platform',
  description: 'India\'s first real estate investment research platform. Independent research notes, underwriting models, and infrastructure analysis for real estate investors in Noida, Ghaziabad, Goa, Dubai, and beyond.',
  keywords: [
    'Real Estate Investment India',
    'Noida Investment Research',
    'Ghaziabad Real Estate',
    'Raj Nagar Extension Property',
    'Goa Villa Investment',
    'Dubai Real Estate Yield',
    'The Last Price Research'
  ],
  authors: [{ name: 'the last price editorial desk' }],
  openGraph: {
    title: 'the last price. — Real Estate Investment Research',
    description: 'Researched real estate investment opportunities in NCR, Goa, and Dubai. Credible, data-forward, Bloomberg-style intelligence.',
    url: 'https://thelastprice.in',
    siteName: 'the last price.',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white text-[#0A0A0A] font-sans">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
