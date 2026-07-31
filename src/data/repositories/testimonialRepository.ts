import type { Testimonial } from '@/types/content';
import { testimonialsSeed } from '@/data/seed/testimonials.seed';
import { createCollectionRepository } from './createCollectionRepository';

export const TESTIMONIALS_STORAGE_KEY = 'infimind:testimonials:v2';

export const testimonialRepository = createCollectionRepository<Testimonial>(
  TESTIMONIALS_STORAGE_KEY,
  testimonialsSeed,
);

export function getPublishedTestimonials(): Testimonial[] {
  return testimonialRepository
    .getAll()
    .filter((testimonial) => testimonial.published)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
