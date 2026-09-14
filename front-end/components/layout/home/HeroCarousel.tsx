'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HeroBanner } from './HeroBanner';
import { Anime } from '@/types/anime';

type HeroCarouselProps = {
  items: Anime[];
  intervalMs?: number;
};

export function HeroCarousel({ items, intervalMs = 5000 }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1) return;
    const timeoutId = setTimeout(goToNext, intervalMs);
    return () => clearTimeout(timeoutId);
  }, [activeIndex, intervalMs, goToNext, items.length]);

  const current = items[activeIndex];

  return (
    <div  className="relative h-[60vh] min-h-90 w-full overflow-hidden sm:h-[70vh] sm:min-h-105 lg:h-[80vh]">
      <AnimatePresence initial={false}>
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <HeroBanner featured={current} />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-linear-to-b from-transparent to-background sm:h-24" />

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-6">
        {items.map((item, index) => (
          <button
            key={item.id}
            aria-label={`Ke banner ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === activeIndex
                ? 'w-6 bg-orange-500'
                : 'w-1.5 bg-foreground/30 hover:bg-foreground/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}