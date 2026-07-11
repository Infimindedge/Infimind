import { describe, expect, it } from 'vitest';
import { enquiryRepository, getEnquiriesNewestFirst } from './enquiryRepository';
import type { ConsultationEnquiry } from '@/types/content';

function makeEnquiry(overrides: Partial<ConsultationEnquiry>): ConsultationEnquiry {
  return {
    id: crypto.randomUUID(),
    name: 'Test Parent',
    email: 'parent@example.com',
    whatsapp: '+1 555 555 5555',
    country: 'Testland',
    program: 'school',
    message: 'Looking for support with maths.',
    createdAt: new Date().toISOString(),
    contacted: false,
    ...overrides,
  };
}

describe('enquiryRepository', () => {
  it('starts empty', () => {
    expect(enquiryRepository.getAll()).toEqual([]);
  });

  it('stores a submitted enquiry', () => {
    enquiryRepository.create(makeEnquiry({ id: 'e1' }));
    expect(enquiryRepository.getById('e1')?.name).toBe('Test Parent');
  });

  it('getEnquiriesNewestFirst sorts by createdAt descending', () => {
    enquiryRepository.create(makeEnquiry({ id: 'e-old', createdAt: '2026-01-01T00:00:00.000Z' }));
    enquiryRepository.create(makeEnquiry({ id: 'e-new', createdAt: '2026-06-01T00:00:00.000Z' }));

    expect(getEnquiriesNewestFirst().map((e) => e.id)).toEqual(['e-new', 'e-old']);
  });

  it('marking an enquiry as contacted persists', () => {
    enquiryRepository.create(makeEnquiry({ id: 'e-contact', contacted: false }));
    enquiryRepository.update('e-contact', { contacted: true });
    expect(enquiryRepository.getById('e-contact')?.contacted).toBe(true);
  });
});
