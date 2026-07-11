/**
 * Generates an abstract, stylised dot-grid world map (open-source technique,
 * no third-party map asset). Landmasses are approximated as stacked
 * lat/long bands — decorative, not for geographic precision — matching the
 * dotted, minimal map style in the locked reference.
 */
interface LatLonBand {
  latMin: number;
  latMax: number;
  lonMin: number;
  lonMax: number;
}

const LANDMASS_BANDS: LatLonBand[] = [
  // North America
  { latMin: 55, latMax: 71, lonMin: -165, lonMax: -60 },
  { latMin: 40, latMax: 55, lonMin: -128, lonMax: -55 },
  { latMin: 25, latMax: 40, lonMin: -125, lonMax: -80 },
  { latMin: 15, latMax: 25, lonMin: -105, lonMax: -90 },
  { latMin: 8, latMax: 15, lonMin: -90, lonMax: -77 },
  // South America
  { latMin: -5, latMax: 12, lonMin: -80, lonMax: -55 },
  { latMin: -20, latMax: -5, lonMin: -80, lonMax: -35 },
  { latMin: -40, latMax: -20, lonMin: -73, lonMax: -45 },
  { latMin: -55, latMax: -40, lonMin: -75, lonMax: -63 },
  // Europe
  { latMin: 36, latMax: 60, lonMin: -10, lonMax: 40 },
  { latMin: 60, latMax: 71, lonMin: 5, lonMax: 30 },
  // Africa
  { latMin: 30, latMax: 37, lonMin: -10, lonMax: 35 },
  { latMin: 5, latMax: 30, lonMin: -18, lonMax: 45 },
  { latMin: -35, latMax: 5, lonMin: 10, lonMax: 42 },
  // Asia
  { latMin: 45, latMax: 70, lonMin: 40, lonMax: 180 },
  { latMin: 25, latMax: 45, lonMin: 40, lonMax: 140 },
  { latMin: 5, latMax: 25, lonMin: 60, lonMax: 100 },
  { latMin: -10, latMax: 5, lonMin: 95, lonMax: 140 },
  { latMin: 30, latMax: 46, lonMin: 125, lonMax: 145 },
  // Australia
  { latMin: -38, latMax: -12, lonMin: 113, lonMax: 154 },
];

function latLonToPercent(lat: number, lon: number): { x: number; y: number } {
  return {
    x: ((lon + 180) / 360) * 100,
    y: ((90 - lat) / 180) * 100,
  };
}

export interface MapDot {
  x: number;
  y: number;
}

export function generateDotMap(latStep = 5.5, lonStep = 7): MapDot[] {
  const dots: MapDot[] = [];
  const seen = new Set<string>();

  for (const band of LANDMASS_BANDS) {
    for (let lat = band.latMin; lat <= band.latMax; lat += latStep) {
      for (let lon = band.lonMin; lon <= band.lonMax; lon += lonStep) {
        const { x, y } = latLonToPercent(lat, lon);
        const key = `${x.toFixed(1)}:${y.toFixed(1)}`;
        if (seen.has(key)) continue;
        seen.add(key);
        dots.push({ x, y });
      }
    }
  }

  return dots;
}

/**
 * Renders every dot as a single SVG path (many tiny circular sub-paths)
 * instead of one <circle> element per dot. With ~500+ background dots this
 * keeps the map to a handful of DOM nodes instead of hundreds, which matters
 * because the map re-renders on every location-cycle tick.
 */
export function dotsToPath(dots: MapDot[], viewW: number, viewH: number, radius: number): string {
  return dots
    .map((dot) => {
      const cx = (dot.x / 100) * viewW;
      const cy = (dot.y / 100) * viewH;
      return `M ${cx - radius} ${cy} a ${radius} ${radius} 0 1 0 ${radius * 2} 0 a ${radius} ${radius} 0 1 0 ${-radius * 2} 0`;
    })
    .join(' ');
}
