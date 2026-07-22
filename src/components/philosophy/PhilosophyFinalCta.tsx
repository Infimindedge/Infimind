import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { philosophyCta } from '@/data/philosophy';

export function PhilosophyFinalCta() {
  return (
    <section className="bg-navy py-10 sm:py-12">
      <Container width="max" className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <p className="max-w-lg font-display text-xl leading-snug text-on-dark sm:text-2xl">{philosophyCta.headline}</p>
        <a
          href={philosophyCta.target}
          className="inline-flex min-h-[44px] w-fit shrink-0 items-center justify-center gap-2 rounded-btn bg-gold px-6 py-3.5 text-sm font-medium text-navy transition-colors hover:bg-gold-dark hover:text-on-dark"
        >
          {philosophyCta.button}
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </Container>
    </section>
  );
}
