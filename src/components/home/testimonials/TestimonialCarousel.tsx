import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, type PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Testimonial } from '@/types/content';
import { TestimonialCard } from './TestimonialCard';
import { useVisibleCount } from '@/hooks/useVisibleCount';
import { usePageVisible } from '@/hooks/usePageVisible';
import { cn } from '@/lib/utils';

const AUTOPLAY_MS = 7000;

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const visibleCount = useVisibleCount();
  const reduceMotion = useReducedMotion();
  const pageVisible = usePageVisible();
  const total = testimonials.length;
  const infinite = total >= 4;

  const [realIndex, setRealIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(infinite ? visibleCount : 0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const extended = infinite
    ? [...testimonials.slice(-visibleCount), ...testimonials, ...testimonials.slice(0, visibleCount)]
    : testimonials;

  const maxRealIndex = Math.max(0, total - visibleCount);

  function goTo(nextReal: number) {
    if (infinite) {
      setRealIndex((nextReal + total) % total);
      setTrackIndex((current) => current + (nextReal - realIndex));
    } else {
      const clamped = Math.min(Math.max(nextReal, 0), maxRealIndex);
      setRealIndex(clamped);
      setTrackIndex(clamped);
    }
  }

  function next() {
    setTransitionEnabled(true);
    if (infinite) {
      setRealIndex((current) => (current + 1) % total);
      setTrackIndex((current) => current + 1);
    } else {
      setRealIndex((current) => {
        const nextVal = Math.min(current + 1, maxRealIndex);
        setTrackIndex(nextVal);
        return nextVal;
      });
    }
  }

  function prev() {
    setTransitionEnabled(true);
    if (infinite) {
      setRealIndex((current) => (current - 1 + total) % total);
      setTrackIndex((current) => current - 1);
    } else {
      setRealIndex((current) => {
        const nextVal = Math.max(current - 1, 0);
        setTrackIndex(nextVal);
        return nextVal;
      });
    }
  }

  // Snap back invisibly once a clone-region transition finishes, for a seamless infinite loop.
  useEffect(() => {
    if (!infinite) return;
    if (trackIndex < visibleCount) {
      const timeout = setTimeout(() => {
        setTransitionEnabled(false);
        setTrackIndex(trackIndex + total);
      }, 400);
      return () => clearTimeout(timeout);
    }
    if (trackIndex >= visibleCount + total) {
      const timeout = setTimeout(() => {
        setTransitionEnabled(false);
        setTrackIndex(trackIndex - total);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [trackIndex, infinite, total, visibleCount]);

  useEffect(() => {
    if (!transitionEnabled) {
      const raf = requestAnimationFrame(() => setTransitionEnabled(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [transitionEnabled]);

  const paused = hovered || focused || touching || !pageVisible || reduceMotion;

  useEffect(() => {
    if (paused || total <= visibleCount) return;
    timerRef.current = setInterval(next, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, total, visibleCount, infinite]);

  function handleDragEnd(_: unknown, info: PanInfo) {
    const threshold = 60;
    if (info.offset.x < -threshold) next();
    else if (info.offset.x > threshold) prev();
  }

  if (total === 0) {
    return (
      <div className="rounded-container border border-dashed border-border-strong bg-paper-pure p-12 text-center">
        <p className="text-ink-soft">Family testimonials are coming soon.</p>
      </div>
    );
  }

  const cardWidthPercent = 100 / visibleCount;

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={() => setFocused(false)}
      onTouchStart={() => setTouching(true)}
      onTouchEnd={() => setTouching(false)}
    >
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          drag={total > visibleCount ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          animate={{ x: `-${trackIndex * cardWidthPercent}%` }}
          transition={{ duration: transitionEnabled ? 0.5 : 0, ease: 'easeInOut' }}
        >
          {extended.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="shrink-0 px-2.5"
              style={{ width: `${cardWidthPercent}%` }}
              aria-hidden={index !== trackIndex}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </motion.div>
      </div>

      {total > visibleCount ? (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 hidden h-11 w-11 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-paper-pure text-ink shadow-soft transition-colors hover:border-navy sm:flex"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 translate-x-4 items-center justify-center rounded-full border border-border bg-paper-pure text-ink shadow-soft transition-colors hover:border-navy sm:flex"
          >
            <ChevronRight size={18} />
          </button>

          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === realIndex}
                className={cn(
                  'h-2.5 rounded-full transition-all',
                  index === realIndex ? 'w-6 bg-gold' : 'w-2.5 bg-border-strong',
                )}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
