import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TestimonialCarousel } from './testimonials/TestimonialCarousel';
import { testimonialRepository, getPublishedTestimonials, TESTIMONIALS_STORAGE_KEY } from '@/data/repositories/testimonialRepository';
import { useCollection } from '@/hooks/useCollection';

export function Testimonials() {
  useCollection(testimonialRepository, TESTIMONIALS_STORAGE_KEY);
  const published = getPublishedTestimonials();

  return (
    <section className="section-spacing">
      <Container width="max">
        <SectionHeading title="Voices of Our Families" />
        <div className="mt-12">
          <TestimonialCarousel testimonials={published} />
        </div>
      </Container>
    </section>
  );
}
