import type { LocationItem } from '@/types/content';

/**
 * Initial cities per the locked spec. Map positions are approximate
 * equirectangular percentages (x = longitude, y = latitude) used to place
 * pins on the abstract dot map. Quote/attribution are intentionally left
 * empty — no testimonial content is invented here; admins add real family
 * quotes per location later.
 */
export const locationsSeed: LocationItem[] = [
  {
    id: 'loc-london',
    country: 'United Kingdom',
    city: 'London',
    isoCode: 'GB',
    active: true,
    sortOrder: 1,
    mapPosition: { x: 50, y: 21 },
  },
  {
    id: 'loc-dubai',
    country: 'United Arab Emirates',
    city: 'Dubai',
    isoCode: 'AE',
    active: true,
    sortOrder: 2,
    mapPosition: { x: 65, y: 36 },
  },
  {
    id: 'loc-toronto',
    country: 'Canada',
    city: 'Toronto',
    isoCode: 'CA',
    active: true,
    sortOrder: 3,
    mapPosition: { x: 28, y: 26 },
  },
  {
    id: 'loc-singapore',
    country: 'Singapore',
    city: 'Singapore',
    isoCode: 'SG',
    active: true,
    sortOrder: 4,
    mapPosition: { x: 79, y: 49 },
  },
  {
    id: 'loc-zurich',
    country: 'Switzerland',
    city: 'Zurich',
    isoCode: 'CH',
    active: true,
    sortOrder: 5,
    mapPosition: { x: 52, y: 24 },
  },
  {
    id: 'loc-hongkong',
    country: 'Hong Kong',
    city: 'Hong Kong',
    isoCode: 'HK',
    active: true,
    sortOrder: 6,
    mapPosition: { x: 82, y: 38 },
  },
  {
    id: 'loc-melbourne',
    country: 'Australia',
    city: 'Melbourne',
    isoCode: 'AU',
    active: true,
    sortOrder: 7,
    mapPosition: { x: 90, y: 71 },
  },
  {
    id: 'loc-amsterdam',
    country: 'Netherlands',
    city: 'Amsterdam',
    isoCode: 'NL',
    active: true,
    sortOrder: 8,
    mapPosition: { x: 51, y: 21 },
  },
];
