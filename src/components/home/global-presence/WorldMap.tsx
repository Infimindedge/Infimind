import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { LocationItem } from '@/types/content';
import { WORLD_LAND_PATH, MAP_VIEW_WIDTH, MAP_VIEW_HEIGHT, projectLonLat, percentToLonLat } from './worldGeo';

/** Static continent silhouette — memoized so it never re-renders on the 4.5s location-cycle tick. */
const MapLand = memo(function MapLand() {
  return (
    <path
      d={WORLD_LAND_PATH}
      fill="var(--accent-gold-soft)"
      stroke="var(--border-medium)"
      strokeWidth={0.75}
    />
  );
});

interface WorldMapProps {
  locations: LocationItem[];
  activeIndex: number;
}

export function WorldMap({ locations, activeIndex }: WorldMapProps) {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox={`0 0 ${MAP_VIEW_WIDTH} ${MAP_VIEW_HEIGHT}`}
      role="img"
      aria-label="World map showing Infimind's education destinations"
      className="h-full w-full"
    >
      <MapLand />

      {/* Every active location gets a blue dot — new ones added from /admin appear here immediately. */}
      {locations.map((location, index) => {
        const [lon, lat] = percentToLonLat(location.mapPosition.x, location.mapPosition.y);
        const { x: cx, y: cy } = projectLonLat(lon, lat);
        const isActive = index === activeIndex;
        return (
          <g key={location.id}>
            {isActive ? (
              <motion.circle
                cx={cx}
                cy={cy}
                r={6}
                fill="none"
                stroke="var(--accent-blue)"
                strokeWidth={1.5}
                initial={{ r: 6, opacity: 0.6 }}
                animate={reduceMotion ? { r: 12, opacity: 0.15 } : { r: [6, 18], opacity: [0.6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              />
            ) : null}
            <circle
              cx={cx}
              cy={cy}
              r={isActive ? 5.5 : 4.5}
              fill="var(--accent-blue)"
              stroke="var(--bg-pure)"
              strokeWidth={1.5}
            />
          </g>
        );
      })}
    </svg>
  );
}
