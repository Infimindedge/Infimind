import { useMemo, memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { LocationItem } from '@/types/content';
import { WORLD_LAND_PATH, MAP_VIEW_WIDTH, MAP_VIEW_HEIGHT, projectLonLat, percentToLonLat } from './worldGeo';

/** Decorative network hub the connector line arcs from — not a real office location. */
const HUB_LONLAT = percentToLonLat(46, 40);

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
  const active = locations[activeIndex];

  const hub = useMemo(() => projectLonLat(HUB_LONLAT[0], HUB_LONLAT[1]), []);

  const connectorPath = useMemo(() => {
    if (!active) return '';
    const [lon, lat] = percentToLonLat(active.mapPosition.x, active.mapPosition.y);
    const end = projectLonLat(lon, lat);
    const midX = (hub.x + end.x) / 2;
    const controlY = Math.min(hub.y, end.y) - 60;
    return `M ${hub.x} ${hub.y} Q ${midX} ${controlY} ${end.x} ${end.y}`;
  }, [active, hub]);

  return (
    <svg
      viewBox={`0 0 ${MAP_VIEW_WIDTH} ${MAP_VIEW_HEIGHT}`}
      role="img"
      aria-label="World map showing Infimind's education destinations"
      className="h-full w-full"
    >
      <MapLand />

      {active && connectorPath ? (
        <motion.path
          key={active.id}
          d={connectorPath}
          fill="none"
          stroke="var(--accent-blue)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeDasharray="4 5"
          initial={{ pathLength: reduceMotion ? 1 : 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: reduceMotion ? 0.001 : 0.9, ease: 'easeInOut' }}
        />
      ) : null}

      {locations.map((location, index) => {
        const [lon, lat] = percentToLonLat(location.mapPosition.x, location.mapPosition.y);
        const { x: cx, y: cy } = projectLonLat(lon, lat);
        const isActive = index === activeIndex;
        return (
          <g key={location.id}>
            {isActive ? (
              <>
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={6}
                  fill="none"
                  stroke="var(--accent-blue)"
                  strokeWidth={1.5}
                  initial={{ r: 6, opacity: 0.6 }}
                  animate={reduceMotion ? { r: 12, opacity: 0.15 } : { r: [6, 20], opacity: [0.6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={6}
                  fill="none"
                  stroke="var(--accent-blue)"
                  strokeWidth={1.5}
                  initial={{ r: 6, opacity: 0.6 }}
                  animate={reduceMotion ? { r: 12, opacity: 0.15 } : { r: [6, 20], opacity: [0.6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
                />
              </>
            ) : null}
            <circle
              cx={cx}
              cy={cy}
              r={isActive ? 6 : 4}
              fill={isActive ? 'var(--accent-blue)' : 'var(--accent-gold-dark)'}
              stroke="var(--bg-pure)"
              strokeWidth={1.5}
            />
          </g>
        );
      })}
    </svg>
  );
}
