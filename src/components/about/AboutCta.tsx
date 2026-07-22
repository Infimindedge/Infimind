import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import aboutContent from '@/data/about-content.json';

export function AboutCta() {
  return (
    <section className="bg-navy py-10 sm:py-12">
      <Container width="max" className="flex flex-col items-center justify-center gap-6 text-center">
        <a
          href={aboutContent.cta.target}
          className="inline-flex min-h-[44px] w-fit shrink-0 items-center justify-center gap-2 rounded-btn bg-gold px-6 py-3.5 text-sm font-medium text-navy transition-colors hover:bg-gold-dark hover:text-on-dark"
        >
          {aboutContent.cta.label}
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </Container>
    </section>
  );
}
