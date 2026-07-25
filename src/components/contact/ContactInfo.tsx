import { Mail, Phone } from 'lucide-react';
import contactContent from '@/data/contact-content.json';

const phoneHref = `tel:${contactContent.phone.replace(/\s+/g, '')}`;
const emailHref = `mailto:${contactContent.email}`;

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-6">
      <a
        href={phoneHref}
        className="group flex items-center gap-4 rounded-container border border-border bg-paper-pure p-5 shadow-soft transition-colors hover:border-gold-soft"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-soft bg-paper-soft text-gold-dark">
          <Phone size={20} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span>
          <span className="block text-xs font-medium uppercase tracking-[0.08em] text-ink-muted">Call Us</span>
          <span className="mt-0.5 block text-base font-medium text-ink group-hover:text-navy">{contactContent.phone}</span>
        </span>
      </a>

      <a
        href={emailHref}
        className="group flex items-center gap-4 rounded-container border border-border bg-paper-pure p-5 shadow-soft transition-colors hover:border-gold-soft"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-soft bg-paper-soft text-gold-dark">
          <Mail size={20} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span>
          <span className="block text-xs font-medium uppercase tracking-[0.08em] text-ink-muted">Email Us</span>
          <span className="mt-0.5 block text-base font-medium text-ink group-hover:text-navy">{contactContent.email}</span>
        </span>
      </a>
    </div>
  );
}
