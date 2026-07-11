import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Photo } from '@/components/ui/Photo';
import { useConsultationModal } from '@/context/ConsultationModalContext';
import { WHATSAPP_URL } from '@/components/ui/WhatsAppButton';

export function FinalCta() {
  const { openConsultation } = useConsultationModal();

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
            <button
              type="button"
              onClick={openConsultation}
              className="mt-8 inline-flex w-fit min-h-[44px] items-center justify-center gap-2 rounded-btn bg-gold px-6 py-3.5 text-sm font-medium text-navy transition-colors hover:bg-gold-dark hover:text-on-dark"
            >
              Schedule a Private Consultation
              <ArrowRight size={16} aria-hidden="true" />
            </button>

            <div className="mt-10 flex flex-col gap-3 border-t border-on-dark/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-on-dark/70">Prefer a quick chat? Message us directly.</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit min-h-[44px] items-center justify-center gap-2 rounded-btn border border-on-dark/25 px-5 py-3 text-sm font-medium text-on-dark transition-colors hover:border-on-dark/50 hover:bg-on-dark/5"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
