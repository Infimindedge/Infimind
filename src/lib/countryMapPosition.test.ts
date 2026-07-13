import { describe, expect, it } from 'vitest';
import { getMapPositionForLocation } from './countryMapPosition';

const fallback = { x: 50, y: 50 };

describe('getMapPositionForLocation', () => {
  it('uses the ISO code to place a standard country on the correct map region', () => {
    const position = getMapPositionForLocation('GB', 'United Kingdom', fallback);

    expect(position.x).toBeGreaterThan(48);
    expect(position.x).toBeLessThan(51);
    expect(position.y).toBeGreaterThan(18);
    expect(position.y).toBeLessThan(24);
  });

  it('places small countries and city regions that are absent from the coarse atlas', () => {
    const position = getMapPositionForLocation('SG', 'Singapore', fallback);

    expect(position.x).toBeGreaterThan(78);
    expect(position.x).toBeLessThan(80);
    expect(position.y).toBeGreaterThan(49);
    expect(position.y).toBeLessThan(50);
  });

  it('falls back to the existing position when a country cannot be resolved', () => {
    expect(getMapPositionForLocation('XX', 'Unknown', fallback)).toEqual(fallback);
  });
});
