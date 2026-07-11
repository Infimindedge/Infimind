import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { WorldMap } from './global-presence/WorldMap';
import { StoryCard } from './global-presence/StoryCard';
import { LocationMarquee } from './global-presence/LocationMarquee';
import { locationRepository, getActiveLocations } from '@/data/repositories/locationRepository';
import { LOCATIONS_STORAGE_KEY } from '@/data/repositories/locationRepository';
import { useCollection } from '@/hooks/useCollection';

const CYCLE_MS = 4500;

export function GlobalPresence() {
  useCollection(locationRepository, LOCATIONS_STORAGE_KEY);
  const locations = getActiveLocations();
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Derived, not stored: if the admin deactivates a location while this
  // page is open, `activeIndex` may briefly point past the shrunk array.
  const safeIndex = activeIndex < locations.length ? activeIndex : 0;

  useEffect(() => {
    if (reduceMotion || locations.length < 2) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((current) => (current + 1) % locations.length);
    }, CYCLE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reduceMotion, locations.length]);

  function resetTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (reduceMotion || locations.length < 2) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((current) => (current + 1) % locations.length);
    }, CYCLE_MS);
  }

  function goPrev() {
    setActiveIndex((current) => (current - 1 + locations.length) % locations.length);
    resetTimer();
  }

  function goNext() {
    setActiveIndex((current) => (current + 1) % locations.length);
    resetTimer();
  }

  if (locations.length === 0) return null;
  const active = locations[safeIndex];

  return (
    <section className="section-spacing" aria-labelledby="global-presence-heading">
      <Container width="max">
        <div className="rounded-container border border-border bg-paper-pure p-6 shadow-soft sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.6fr_1fr] lg:items-center">
            <div>
              <h2 id="global-presence-heading" className="text-[clamp(28px,2.6vw,34px)] leading-[1.1] text-ink">
                Supporting Families Across the World&rsquo;s Leading Education Destinations
              </h2>
              <p className="mt-3 text-ink-soft">Our students call these cities home.</p>
            </div>

            <div className="aspect-[1000/520] w-full">
              <WorldMap locations={locations} activeIndex={safeIndex} />
            </div>

            <div className="h-full">
              <StoryCard location={active} index={safeIndex} total={locations.length} onPrev={goPrev} onNext={goNext} />
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <LocationMarquee locations={locations} />
          </div>
        </div>
      </Container>
    </section>
  );
}
