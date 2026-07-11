import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Photo } from '@/components/ui/Photo';
import { useConsultationModal } from '@/context/ConsultationModalContext';

/** Natural ratio of consultation-lounge.jpg — the photo column is sized to this exactly so it never gets cropped. */
const LOUNGE_PHOTO_RATIO = '1976/717';

export function FinalCta() {
  const { openConsultation } = useConsultationModal();

  return (
    <section id="consultation" className="section-spacing pt-0">
      <Container width="max">
        {/*
          No overflow-hidden on this outer row — each child clips/rounds
          itself instead. If the navy column's text ever needs more height
          than the photo's locked aspect ratio provides, the row simply
          grows to fit it; text can never be silently clipped again.
        */}
        <div className="grid grid-cols-1 items-stretch rounded-container border border-border shadow-soft lg:grid-cols-2">
          <div
            className="w-full overflow-hidden rounded-t-container lg:rounded-l-container lg:rounded-tr-none"
            style={{ aspectRatio: LOUNGE_PHOTO_RATIO }}
          >
            <Photo
              filename="consultation-lounge.jpg"
              alt="A calm, premium lounge setting for private consultations"
              ratioLabel="16:9"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center rounded-b-container bg-navy px-8 py-8 sm:px-10 sm:py-9 lg:rounded-r-container lg:rounded-bl-none lg:px-9">
            <h2 className="text-[clamp(20px,1.7vw,26px)] leading-[1.18] text-on-dark">
              Every Great Future Begins With the Right Guidance.
            </h2>
            <p className="mt-2.5 max-w-md text-[13px] leading-relaxed text-on-dark/75">
              Whether your child is striving for stronger school performance or preparing for the world&rsquo;s
              leading universities, every journey begins with understanding their unique potential.
            </p>
            <button
              type="button"
              onClick={openConsultation}
              className="mt-4 inline-flex w-fit min-h-[40px] items-center justify-center gap-2 rounded-btn bg-gold px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-gold-dark hover:text-on-dark"
            >
              Schedule a Private Consultation
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
