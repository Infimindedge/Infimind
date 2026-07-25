import { describe, expect, it } from 'vitest';
import { countries } from './countries';
import { getCountryCallingCode } from './countryCallingCodes';

describe('country calling codes', () => {
  it('provides an international dialling prefix for every listed country', () => {
    const countriesWithoutCodes = countries
      .filter((country) => country !== 'Other')
      .filter((country) => !getCountryCallingCode(country));

    expect(countriesWithoutCodes).toEqual([]);
  });

  it('uses the expected prefixes for common Infimind locations', () => {
    expect(getCountryCallingCode('India')).toBe('+91');
    expect(getCountryCallingCode('United Kingdom')).toBe('+44');
    expect(getCountryCallingCode('United Arab Emirates')).toBe('+971');
    expect(getCountryCallingCode('United States')).toBe('+1');
  });
});
