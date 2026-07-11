import type { LocationItem } from '@/types/content';
import { locationsSeed } from '@/data/seed/locations.seed';
import { createCollectionRepository } from './createCollectionRepository';

export const LOCATIONS_STORAGE_KEY = 'infimind:locations';

export const locationRepository = createCollectionRepository<LocationItem>(
  LOCATIONS_STORAGE_KEY,
  locationsSeed,
);

export function getActiveLocations(): LocationItem[] {
  return locationRepository
    .getAll()
    .filter((location) => location.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
