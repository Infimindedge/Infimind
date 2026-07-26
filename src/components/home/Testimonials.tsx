import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TestimonialCarousel } from './testimonials/TestimonialCarousel';
import { testimonialRepository, getPublishedTestimonials, TESTIMONIALS_STORAGE_KEY } from '@/data/repositories/testimonialRepository';
import { useCollection } from '@/hooks/useCollection';
import { illustrativeFeedback } from '@/data/illustrativeFeedback';

export function Testimonials() {
  useCollection(testimonialRepository, TESTIMONIALS_STORAGE_KEY);
  const published = getPublishedTestimonials();
  const testimonials = published.length ? published : illustrativeFeedback;
  const showingIllustrative = published.length === 0;

  return (
    <section className="section-spacing">
      <Container width="max">
        <SectionHeading
          eyebrow={showingIllustrative ? 'The experience we are building' : undefined}
          title={showingIllustrative ? 'What Families Can Expect' : 'Voices of Our Families'}
          body={
            showingIllustrative
              ? 'Illustrative experience themes—not customer quotations. Verified family stories will replace these as permissions are received.'
              : undefined
          }
        />
        <div className="mt-12">
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </Container>
    </section>
  );
}
