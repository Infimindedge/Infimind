import { Pencil, Trash2 } from 'lucide-react';
import type { Testimonial } from '@/types/content';
import { cn } from '@/lib/utils';

const PROGRAM_LABEL: Record<Testimonial['program'], string> = {
  school: 'School',
  sat: 'SAT',
};

interface TestimonialsListProps {
  testimonials: Testimonial[];
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (testimonial: Testimonial) => void;
  onTogglePublished: (testimonial: Testimonial) => void;
}

export function TestimonialsList({ testimonials, onEdit, onDelete, onTogglePublished }: TestimonialsListProps) {
  if (testimonials.length === 0) {
    return (
      <div className="rounded-container border border-dashed border-border-strong bg-paper-pure p-10 text-center text-sm text-ink-muted">
        No testimonials yet. Add one above.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-container border border-border">
      <table className="w-full min-w-[820px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-paper-soft text-xs uppercase tracking-wide text-ink-muted">
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Photo</th>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Location</th>
            <th className="px-4 py-3 font-medium">Program</th>
            <th className="px-4 py-3 font-medium">Quote</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((testimonial) => (
            <tr key={testimonial.id} className="border-b border-border bg-paper-pure last:border-b-0">
              <td className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => onTogglePublished(testimonial)}
                  className={cn(
                    'rounded-full px-2.5 py-1 text-xs font-medium',
                    testimonial.published ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning',
                  )}
                >
                  {testimonial.published ? 'Published' : 'Draft'}
                </button>
              </td>
              <td className="px-4 py-3">
                {testimonial.photoUrl ? (
                  <img src={testimonial.photoUrl} alt="" className="h-9 w-9 rounded-full object-cover" />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-paper-soft text-xs text-ink-muted">
                    —
                  </div>
                )}
              </td>
              <td className="px-4 py-3 text-ink">{testimonial.privacyLabel || testimonial.displayName || '—'}</td>
              <td className="px-4 py-3 text-ink-soft">{[testimonial.city, testimonial.country].filter(Boolean).join(', ') || '—'}</td>
              <td className="px-4 py-3 text-ink-soft">{PROGRAM_LABEL[testimonial.program]}</td>
              <td className="max-w-[220px] truncate px-4 py-3 text-ink-soft">{testimonial.quote}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(testimonial)}
                    aria-label={`Edit ${testimonial.displayName || 'testimonial'}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft hover:bg-paper-soft hover:text-navy"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(testimonial)}
                    aria-label={`Delete ${testimonial.displayName || 'testimonial'}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft hover:bg-error/10 hover:text-error"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
