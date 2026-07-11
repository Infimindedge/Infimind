import { geoEqualEarth, geoPath, type GeoProjection } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import landTopology from 'world-atlas/land-110m.json';

export const MAP_VIEW_WIDTH = 1000;
export const MAP_VIEW_HEIGHT = 520;

const topology = landTopology as unknown as Topology;
const landGeometry = topology.objects.land as GeometryCollection;
const landFeature = feature(topology, landGeometry);

const projection: GeoProjection = geoEqualEarth().fitSize([MAP_VIEW_WIDTH, MAP_VIEW_HEIGHT], landFeature);
const pathGenerator = geoPath(projection);

/** Single SVG path covering every continent, generated once from real Natural Earth land data. */
export const WORLD_LAND_PATH = pathGenerator(landFeature) ?? '';

/** Projects [longitude, latitude] to pixel coordinates within the MAP_VIEW_WIDTH x MAP_VIEW_HEIGHT viewBox. */
export function projectLonLat(lon: number, lat: number): { x: number; y: number } {
  const point = projection([lon, lat]);
  if (!point) return { x: MAP_VIEW_WIDTH / 2, y: MAP_VIEW_HEIGHT / 2 };
  return { x: point[0], y: point[1] };
}

/** Converts the LocationItem `mapPosition` percentage system back to [lon, lat]. */
export function percentToLonLat(x: number, y: number): [number, number] {
  return [(x / 100) * 360 - 180, 90 - (y / 100) * 180];
}
