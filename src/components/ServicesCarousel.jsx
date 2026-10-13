import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const getPerView = () => {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
};

/**
 * Generic carousel: shows `perView` items (1 mobile / 2 tablet / 3 desktop),
 * arrows, dots, swipe and autoplay (paused on hover).
 */
const ServicesCarousel = ({ items, renderItem, autoplayMs = 5000 }) => {
  const [perView, setPerView] = useState(getPerView);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);

  const maxIndex = Math.max(0, items.length - perView);

  useEffect(() => {
    const onResize = () => setPerView(getPerView());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (index > maxIndex) setIndex(maxIndex);
  }, [maxIndex, index]);

  const go = useCallback(
    (dir) => setIndex((i) => (i + dir > maxIndex ? 0 : i + dir < 0 ? maxIndex : i + dir)),
    [maxIndex]
  );

  useEffect(() => {
    if (paused || maxIndex === 0) return;
    timer.current = setInterval(() => go(1), autoplayMs);
    return () => clearInterval(timer.current);
  }, [paused, go, maxIndex, autoplayMs]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden py-6 -my-6">
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          animate={{ x: `-${(index * 100) / perView}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) go(1);
            else if (info.offset.x > 60) go(-1);
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-4"
              style={{ width: `${100 / perView}%` }}
            >
              {renderItem(item, i)}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Arrows */}
      <button
        id="services-carousel-prev"
        onClick={() => go(-1)}
        aria-label="Précédent"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-6 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-blue-100 text-blue-950 flex items-center justify-center hover:bg-blue-950 hover:text-white transition-all duration-300"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        id="services-carousel-next"
        onClick={() => go(1)}
        aria-label="Suivant"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-6 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-blue-100 text-blue-950 flex items-center justify-center hover:bg-blue-950 hover:text-white transition-all duration-300"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="flex justify-center items-center gap-2 mt-10">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Aller à la position ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index
                ? 'w-8 bg-gradient-to-r from-blue-950 to-cyan-400'
                : 'w-2 bg-blue-200 hover:bg-blue-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesCarousel;
