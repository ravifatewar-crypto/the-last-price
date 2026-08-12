'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { CategoryBadge } from '@/components/ui/Badge';
import { OpportunityItem } from '@/types';

interface HeroCarouselProps {
  slides: OpportunityItem[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-advance carousel every 6 seconds if not paused
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length, nextSlide]);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  return (
    <section
      className="relative bg-[#0A0A0A] text-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto min-h-[560px] lg:min-h-[620px] flex flex-col justify-between relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12"
          >
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 z-10">
              <div className="flex items-center space-x-3">
                <CategoryBadge category={currentSlide.category} size="md" />
                <span className="text-xs text-[#A3A3A3] uppercase tracking-wider font-mono">
                  {currentSlide.city}{currentSlide.country !== 'India' ? `, ${currentSlide.country}` : ''}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] lowercase">
                {currentSlide.title}
              </h1>

              <p className="text-base sm:text-lg text-[#D4D4D4] font-normal leading-relaxed max-w-xl">
                {currentSlide.thesis}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-6 text-sm text-[#A3A3A3] border-t border-[#262626]">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#737373]">Price Band</span>
                  <span className="font-semibold text-white font-data">{currentSlide.priceBand}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#737373]">Asset Type</span>
                  <span className="font-semibold text-white uppercase">{currentSlide.propertyType}</span>
                </div>
                {currentSlide.builder && (
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-[#737373]">Developer</span>
                    <span className="font-semibold text-white">{currentSlide.builder.name}</span>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <Link
                  href={`/opportunities/${currentSlide.slug}`}
                  className="inline-flex items-center text-xs font-semibold uppercase tracking-wider bg-white text-[#0A0A0A] px-6 py-3 hover:bg-[#E5E5E5] transition-colors group"
                >
                  read full research note
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-6 relative h-[300px] sm:h-[400px] lg:h-[480px] w-full overflow-hidden border border-[#262626]">
              {currentSlide.images && currentSlide.images[0] ? (
                <Image
                  src={currentSlide.images[0]}
                  alt={currentSlide.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-[#171717] flex items-center justify-center text-[#737373] text-sm">
                  Research Opportunity Image
                </div>
              )}
              {/* Subtle Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Footer Controls */}
        <div className="border-t border-[#262626] px-6 py-4 flex items-center justify-between">
          {/* Slide Indicators */}
          <div className="flex items-center space-x-3">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 transition-all ${
                  idx === currentIndex ? 'w-8 bg-white' : 'w-3 bg-[#404040] hover:bg-[#737373]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Prev / Next Buttons */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-[#737373] font-mono mr-2">
              0{currentIndex + 1} / 0{slides.length}
            </span>
            <button
              onClick={prevSlide}
              className="p-2 border border-[#404040] text-[#D4D4D4] hover:text-white hover:border-white transition-colors"
              aria-label="Previous opportunity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 border border-[#404040] text-[#D4D4D4] hover:text-white hover:border-white transition-colors"
              aria-label="Next opportunity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
