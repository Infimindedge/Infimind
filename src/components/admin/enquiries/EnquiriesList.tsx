import { Trash2 } from 'lucide-react';
import type { ConsultationEnquiry } from '@/types/content';
import { cn } from '@/lib/utils';

const PROGRAM_LABEL: Record<ConsultationEnquiry['program'], string> = {
  school: 'School',
  sat: 'SAT',
};

interface EnquiriesListProps {
  enquiries: ConsultationEnquiry[];
  onToggleContacted: (enquiry: ConsultationEnquiry) => void;
  onDelete: (enquiry: ConsultationEnquiry) => void;
}

export function EnquiriesList({ enquiries, onToggleContacted, onDelete }: EnquiriesListProps) {
  if (enquiries.length === 0) {
    return (
      <div className="rounded-container border border-dashed border-border-strong bg-paper-pure p-10 text-center text-sm text-ink-muted">
        No consultation requests yet. Submissions from the homepage "Schedule a Private Consultation" form will
        appear here.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {enquiries.map((enquiry) => (
        <div key={enquiry.id} className="rounded-container border border-border bg-paper-pure p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-lg text-ink">{enquiry.name}</h3>
                <span className="rounded-full bg-blue-soft px-2.5 py-0.5 text-xs font-medium text-blue">
                  {PROGRAM_LABEL[enquiry.program]}
                </span>
              </div>
              <p className="mt-1 text-xs text-ink-muted">
                {new Date(enquiry.createdAt).toLocaleString(undefined, {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}{' '}
                &middot; {enquiry.country}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleContacted(enquiry)}
                className={cn(
                  'rounded-full px-2.5 py-1 text-xs font-medium',
                  enquiry.contacted ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning',
                )}
              >
                {enquiry.contacted ? 'Contacted' : 'New'}
              </button>
              <button
                type="button"
                onClick={() => onDelete(enquiry)}
                aria-label={`Delete enquiry from ${enquiry.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft hover:bg-error/10 hover:text-error"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>

          <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
            <div className="flex gap-2">
              <dt className="text-ink-muted">Email:</dt>
              <dd className="text-ink">
                <a href={`mailto:${enquiry.email}`} className="hover:text-navy hover:underline">
                  {enquiry.email}
                </a>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-ink-muted">WhatsApp:</dt>
              <dd className="text-ink">{enquiry.whatsapp}</dd>
            </div>
          </dl>

          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{enquiry.message}</p>
        </div>
      ))}
    </div>
  );
}
