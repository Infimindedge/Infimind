import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Photo } from '@/components/ui/Photo';

export function FinalCta() {
  return (
    <section id="consultation" className="section-spacing pt-0">
      <Container width="max">
        <div className="grid grid-cols-1 overflow-hidden rounded-container border border-border shadow-soft lg:grid-cols-2">
          <div className="aspect-[16/9] lg:aspect-auto">
            <Photo
              filename="consultation-lounge.jpg"
              alt="A calm, premium lounge setting for private consultations"
              ratioLabel="16:9"
              className="h-full"
            />
          </div>
          <div className="flex flex-col justify-center bg-navy px-8 py-12 sm:px-12 sm:py-16">
            <h2 className="text-[clamp(30px,3vw,42px)] leading-[1.1] text-on-dark">
              Every Great Future Begins With the Right Guidance.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-on-dark/75">
              Whether your child is striving for stronger school performance or preparing for the world&rsquo;s
              leading universities, every journey begins with understanding their unique potential.
            </p>
            <a
              href="/signin"
              className="mt-8 inline-flex w-fit min-h-[44px] items-center justify-center gap-2 rounded-btn bg-gold px-6 py-3.5 text-sm font-medium text-navy transition-colors hover:bg-gold-dark hover:text-on-dark"
            >
              Schedule a Private Consultation
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
