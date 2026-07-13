import { geoCentroid, type GeoPermissibleObjects } from 'd3-geo';
import { feature } from 'topojson-client';
import type { GeometryCollection, Topology } from 'topojson-specification';
import countriesTopology from 'world-atlas/countries-110m.json';

export interface MapPosition {
  x: number;
  y: number;
}

interface CountryFeature {
  id?: string | number;
  properties?: {
    name?: string;
  };
}

const topology = countriesTopology as unknown as Topology;
const countriesGeometry = topology.objects.countries as GeometryCollection;
const countryFeatures = (feature(topology, countriesGeometry) as unknown as { features: CountryFeature[] }).features;

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

const topoNameAliases: Record<string, string> = {
  Bosnia: 'Bosnia and Herz.',
  'Bosnia and Herzegovina': 'Bosnia and Herz.',
  'Central African Republic': 'Central African Rep.',
  'Czech Republic': 'Czechia',
  'Dominican Republic': 'Dominican Rep.',
  'Equatorial Guinea': 'Eq. Guinea',
  Eswatini: 'eSwatini',
  'North Macedonia': 'Macedonia',
  'South Sudan': 'S. Sudan',
  'United States': 'United States of America',
};

const smallCountryCoordinates: Record<string, [number, number]> = {
  AD: [1.52, 42.51],
  AG: [-61.8, 17.06],
  BB: [-59.54, 13.19],
  BH: [50.56, 26.07],
  BN: [114.73, 4.54],
  CV: [-23.61, 15.12],
  DM: [-61.37, 15.41],
  GD: [-61.68, 12.12],
  HK: [114.17, 22.32],
  KI: [-157.36, 1.87],
  KN: [-62.78, 17.36],
  LC: [-60.98, 13.91],
  LI: [9.55, 47.16],
  LU: [6.13, 49.82],
  MC: [7.42, 43.74],
  MV: [73.22, 3.2],
  MT: [14.38, 35.94],
  MU: [57.55, -20.35],
  NR: [166.93, -0.52],
  PS: [35.23, 31.95],
  SG: [103.82, 1.35],
  SM: [12.46, 43.94],
  ST: [6.61, 0.19],
  TO: [-175.2, -21.18],
  TV: [179.19, -8.52],
  VA: [12.45, 41.9],
  VC: [-61.2, 13.25],
};

const featureByName = new Map<string, CountryFeature>();

countryFeatures.forEach((countryFeature) => {
  const name = countryFeature.properties?.name;
  if (name) featureByName.set(normalizeCountryName(name), countryFeature);
});

export function getMapPositionForLocation(
  isoCode: string,
  countryName: string,
  fallback: MapPosition,
): MapPosition {
  const iso = isoCode.trim().toUpperCase();
  const coordinates = smallCountryCoordinates[iso] ?? getCentroidForCountry(iso, countryName);
  return coordinates ? lonLatToMapPosition(coordinates[0], coordinates[1]) : fallback;
}

function getCentroidForCountry(isoCode: string, countryName: string): [number, number] | null {
  const displayName = isoCode.length === 2 ? regionNames.of(isoCode) : undefined;
  const candidateNames = [
    displayName,
    displayName ? topoNameAliases[displayName] : undefined,
    countryName,
    topoNameAliases[countryName],
  ].filter((name): name is string => Boolean(name));

  for (const candidateName of candidateNames) {
    const countryFeature = featureByName.get(normalizeCountryName(candidateName));
    if (!countryFeature) continue;
    const [lon, lat] = geoCentroid(countryFeature as GeoPermissibleObjects);
    if (Number.isFinite(lon) && Number.isFinite(lat)) return [lon, lat];
  }

  return null;
}

function lonLatToMapPosition(lon: number, lat: number): MapPosition {
  return {
    x: clamp(((lon + 180) / 360) * 100),
    y: clamp(((90 - lat) / 180) * 100),
  };
}

function clamp(value: number) {
  return Math.min(100, Math.max(0, value));
}

function normalizeCountryName(name: string) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/gi, '')
    .toLowerCase();
}
