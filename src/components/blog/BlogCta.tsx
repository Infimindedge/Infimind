import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import type { BlogSettings } from '@/types/blog';

export function BlogCta({ settings }: { settings: BlogSettings }) {
  return (
    <section className="bg-navy py-10 sm:py-12">
      <Container width="max" className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-display text-xl leading-snug text-on-dark sm:text-2xl">{settings.ctaTitle}</p>
          <p className="mt-1.5 text-sm text-on-dark/75">{settings.ctaDescription}</p>
        </div>
        <a
          href={settings.ctaTarget}
          className="inline-flex min-h-[44px] w-fit shrink-0 items-center justify-center gap-2 rounded-btn bg-gold px-6 py-3.5 text-sm font-medium text-navy transition-colors hover:bg-gold-dark hover:text-on-dark"
        >
          {settings.ctaButtonLabel}
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </Container>
    </section>
  );
}
