import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { LocationItem } from '@/types/content';
import { isoToFlagEmoji } from '@/lib/flag';
import { cn } from '@/lib/utils';

interface LocationMarqueeProps {
  locations: LocationItem[];
}

function Chip({ location }: { location: LocationItem }) {
  return (
    <div className="flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border border-border bg-paper-pure px-4 py-2.5 shadow-soft">
      <span className="text-base leading-none" aria-hidden="true">
        {isoToFlagEmoji(location.isoCode)}
      </span>
      <span className="text-sm font-medium text-ink">{location.city}</span>
    </div>
  );
}

export function LocationMarquee({ locations }: LocationMarqueeProps) {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  if (reduceMotion) {
    return (
      <div className="flex gap-3 overflow-x-auto pb-2" aria-label="Cities where Infimind students live">
        {locations.map((location) => (
          <Chip key={location.id} location={location} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        className={cn('marquee-track flex w-max gap-3')}
        data-paused={paused}
        aria-label="Cities where Infimind students live"
      >
        {[...locations, ...locations].map((location, index) => (
          <Chip key={`${location.id}-${index}`} location={location} />
        ))}
      </div>
    </div>
  );
}
