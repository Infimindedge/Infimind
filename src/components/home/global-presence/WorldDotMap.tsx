import { useMemo, memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { LocationItem } from '@/types/content';
import { generateDotMap, dotsToPath } from './dotMapData';

const VIEW_W = 1000;
const VIEW_H = 500;
// Denser grid than the perf-constrained earlier pass — safe now because all
// dots are collapsed into a single <path> (see dotsToPath), so point count
// doesn't add per-node React/DOM cost.
const BACKGROUND_DOTS_PATH = dotsToPath(generateDotMap(1.8, 2.4), VIEW_W, VIEW_H, 1.6);
/** Decorative network hub the connector line arcs from — not a real office location. */
const HUB = { x: 46, y: 40 };

/** Static background — memoized so it never re-renders on the 4.5s location-cycle tick. */
const MapBackground = memo(function MapBackground() {
  return <path d={BACKGROUND_DOTS_PATH} fill="var(--border-medium)" opacity={0.75} />;
});

interface WorldDotMapProps {
  locations: LocationItem[];
  activeIndex: number;
}

export function WorldDotMap({ locations, activeIndex }: WorldDotMapProps) {
  const reduceMotion = useReducedMotion();
  const active = locations[activeIndex];

  const connectorPath = useMemo(() => {
    if (!active) return '';
    const start = { x: (HUB.x / 100) * VIEW_W, y: (HUB.y / 100) * VIEW_H };
    const end = { x: (active.mapPosition.x / 100) * VIEW_W, y: (active.mapPosition.y / 100) * VIEW_H };
    const midX = (start.x + end.x) / 2;
    const controlY = Math.min(start.y, end.y) - 60;
    return `M ${start.x} ${start.y} Q ${midX} ${controlY} ${end.x} ${end.y}`;
  }, [active]);

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role="img"
      aria-label="Stylised world map showing Infimind's education destinations"
      className="h-full w-full"
    >
      <MapBackground />

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
          animate={{ pathLength: 1, opacity: 0.55 }}
          transition={{ duration: reduceMotion ? 0.001 : 0.9, ease: 'easeInOut' }}
        />
      ) : null}

      {locations.map((location, index) => {
        const cx = (location.mapPosition.x / 100) * VIEW_W;
        const cy = (location.mapPosition.y / 100) * VIEW_H;
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
            <circle cx={cx} cy={cy} r={isActive ? 6 : 4} fill={isActive ? 'var(--accent-blue)' : 'var(--accent-gold)'} />
          </g>
        );
      })}
    </svg>
  );
}
