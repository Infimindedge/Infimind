import type { ConsultationEnquiry } from '@/types/content';
import { createCollectionRepository } from './createCollectionRepository';

export const ENQUIRIES_STORAGE_KEY = 'infimind:enquiries';

export const enquiryRepository = createCollectionRepository<ConsultationEnquiry>(ENQUIRIES_STORAGE_KEY, []);

export function getEnquiriesNewestFirst(): ConsultationEnquiry[] {
  return enquiryRepository
    .getAll()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
