import { describe, expect, it } from 'vitest';
import { locationRepository, getActiveLocations } from './locationRepository';

describe('locationRepository', () => {
  it('seeds eight locations with matching testimonial stories', () => {
    const seeded = locationRepository.getAll();
    expect(seeded.map((location) => location.city)).toEqual([
      'London',
      'Dubai',
      'Toronto',
      'Singapore',
      'Melbourne',
      'New Delhi',
      'Doha',
      'California',
    ]);
    expect(seeded.every((location) => location.quote && location.attribution)).toBe(true);
  });

  it('getActiveLocations excludes inactive locations', () => {
    const [first] = locationRepository.getAll();
    locationRepository.update(first.id, { active: false });

    const active = getActiveLocations();
    expect(active.find((location) => location.id === first.id)).toBeUndefined();
    expect(active).toHaveLength(7);
  });

  it('a newly created location appears immediately in getActiveLocations', () => {
    locationRepository.create({
      id: 'loc-test',
      country: 'Testland',
      city: 'Testville',
      isoCode: 'TT',
      active: true,
      sortOrder: 99,
      mapPosition: { x: 50, y: 50 },
    });

    expect(getActiveLocations().some((location) => location.id === 'loc-test')).toBe(true);
  });
});
