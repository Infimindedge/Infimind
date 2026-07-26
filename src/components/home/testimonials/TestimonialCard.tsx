import { Quote } from 'lucide-react';
import type { Testimonial } from '@/types/content';

const PROGRAM_LABEL: Record<Testimonial['program'], string> = {
  school: 'School Programme',
  sat: 'SAT Programme',
};

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex h-full flex-col rounded-container border border-border bg-paper-pure p-6 shadow-soft sm:p-7">
      <Quote size={22} className="text-gold" aria-hidden="true" />
      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-soft">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        {testimonial.photoUrl ? (
          <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full">
            <img src={testimonial.photoUrl} alt="" className="h-full w-full object-cover" />
          </div>
        ) : (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper-soft text-sm font-medium text-ink-muted">
            {testimonial.privacyLabel.charAt(0) || testimonial.displayName.charAt(0)}
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-ink">{testimonial.privacyLabel || testimonial.displayName}</p>
          <p className="text-xs text-ink-muted">
            {[testimonial.city, testimonial.country].filter(Boolean).join(', ')}
            {testimonial.city || testimonial.country ? ' · ' : ''}
            {PROGRAM_LABEL[testimonial.program]}
          </p>
        </div>
      </div>
    </div>
  );
}
