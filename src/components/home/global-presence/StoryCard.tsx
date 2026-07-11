import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import type { LocationItem } from '@/types/content';
import { isoToFlagEmoji } from '@/lib/flag';

interface StoryCardProps {
  location: LocationItem;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export function StoryCard({ location, index, total, onPrev, onNext }: StoryCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex h-full flex-col justify-between rounded-container border border-border bg-paper-pure p-6 shadow-soft">
      <div className="min-h-[168px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.id}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-2xl leading-none" aria-hidden="true">
                {isoToFlagEmoji(location.isoCode)}
              </span>
              <h3 className="font-display text-2xl text-ink">{location.city}</h3>
            </div>

            {location.storyLabel ? (
              <p className="mt-2 text-sm font-medium text-ink-soft">{location.storyLabel}</p>
            ) : (
              <p className="mt-2 text-sm text-ink-muted">{location.country}</p>
            )}

            {location.quote ? (
              <div className="mt-4 flex gap-2">
                <Quote size={16} className="mt-1 shrink-0 text-gold" aria-hidden="true" />
                <div>
                  <p className="text-[15px] leading-relaxed text-ink-soft">&ldquo;{location.quote}&rdquo;</p>
                  {location.attribution ? (
                    <p className="mt-2 text-xs font-medium text-ink-muted">&mdash; {location.attribution}</p>
                  ) : null}
                </div>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous location"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-ink-soft transition-colors hover:border-navy hover:text-navy"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-xs font-medium tracking-wide text-ink-muted">
          {index + 1} / {total}
        </span>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next location"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-ink-soft transition-colors hover:border-navy hover:text-navy"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
