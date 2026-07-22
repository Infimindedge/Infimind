import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Container } from '@/components/ui/Container';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useFocusOnOpen } from '@/hooks/useFocusOnOpen';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import legalContent from '@/data/legal-content.json';

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

type LegalKey = 'privacy' | 'terms';

interface LegalDocument {
  title: string;
  lastUpdated: string;
  markdown: string;
}

const legalDocuments = legalContent as Record<LegalKey, LegalDocument>;

const columns: FooterColumn[] = [
  {
    title: 'Programs',
    links: [
      { label: 'School Program', href: '/programs/school' },
      { label: 'SAT Program', href: '/navichi' },
    ],
  },
  {
    title: 'Our Philosophy',
    links: [
      { label: 'Our Approach', href: '/philosophy' },
      { label: 'Our Values', href: '/philosophy' },
    ],
  },
  {
    title: 'Resources',
    links: [{ label: 'Blogs', href: '/blog' }],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const [activeLegal, setActiveLegal] = useState<LegalKey | null>(null);

  const closeLegalDialog = () => setActiveLegal(null);

  return (
    <footer className="border-t border-border bg-paper-soft">
      <Container width="max" as="div" className="section-spacing">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              A premium learning partner for ambitious students and supportive families worldwide.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="eyebrow mb-4 text-ink-muted">{column.title}</h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm text-ink-soft transition-colors hover:text-navy">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-6">
            <button type="button" onClick={() => setActiveLegal('privacy')} className="transition-colors hover:text-navy">
              Privacy Policy
            </button>
            <button type="button" onClick={() => setActiveLegal('terms')} className="transition-colors hover:text-navy">
              Terms of Service
            </button>
          </div>
          <p>&copy; {year} Infimind. All rights reserved.</p>
        </div>
      </Container>

      <LegalDialog legalDocument={activeLegal ? legalDocuments[activeLegal] : null} onClose={closeLegalDialog} />
    </footer>
  );
}

interface LegalDialogProps {
  legalDocument: LegalDocument | null;
  onClose: () => void;
}

function LegalDialog({ legalDocument, onClose }: LegalDialogProps) {
  const open = Boolean(legalDocument);
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleId = legalDocument ? `${legalDocument.title.toLowerCase().replace(/\s+/g, '-')}-dialog-title` : undefined;

  useOutsideClick(dialogRef, onClose, open);
  useEscapeKey(onClose, open);
  useFocusOnOpen(dialogRef, open);

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [legalDocument?.title]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Tab' || !dialogRef.current) return;

    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <AnimatePresence>
      {legalDocument ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy/50 px-4 py-8"
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex max-h-[calc(100vh-4rem)] w-full max-w-3xl flex-col overflow-hidden rounded-container border border-border bg-paper-pure shadow-hover"
          >
            <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5 sm:px-8">
              <div>
                <p className="eyebrow text-gold">Infimind Legal</p>
                <h2 id={titleId} className="mt-1 font-display text-2xl text-ink sm:text-3xl">
                  {legalDocument.title}
                </h2>
                <p className="mt-2 text-sm text-ink-muted">
                  Last updated: {legalDocument.lastUpdated}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={`Close ${legalDocument.title}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-paper-soft hover:text-navy"
              >
                <X size={18} />
              </button>
            </div>

            <div ref={scrollRef} className="overflow-y-auto px-6 py-6 sm:px-8">
              <div className="legal-content space-y-5 text-sm leading-relaxed text-ink-soft sm:text-base">
                {renderLegalMarkdown(legalDocument.markdown)}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function renderLegalMarkdown(markdown: string) {
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  function flushParagraph() {
    if (!paragraph.length) return;
    blocks.push(
      <p key={`p-${blocks.length}`} className="text-ink-soft">
        {renderInline(paragraph.join(' '))}
      </p>,
    );
    paragraph = [];
  }

  function flushList() {
    if (!list.length) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="list-disc space-y-2 pl-5 text-ink-soft">
        {list.map((item) => (
          <li key={item}>{renderInline(item)}</li>
        ))}
      </ul>,
    );
    list = [];
  }

  markdown.split('\n').forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      return;
    }

    if (line.startsWith('# ') || line.startsWith('**Effective Date:**') || line.startsWith('**Last Updated:**')) {
      return;
    }

    if (line.startsWith('## ')) {
      flushParagraph();
      flushList();
      blocks.push(
        <h3 key={`h-${blocks.length}`} className="pt-2 font-display text-xl text-ink">
          {renderInline(line.slice(3))}
        </h3>,
      );
      return;
    }

    if (line.startsWith('- ')) {
      flushParagraph();
      list.push(line.slice(2));
      return;
    }

    flushList();
    paragraph.push(line);
  });

  flushParagraph();
  flushList();

  return blocks;
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|contact@infimind\.co\.in|https:\/\/infimind\.co\.in\/?)/g).filter(Boolean);

  return parts.map((part, index) => {
    const strong = part.match(/^\*\*([^*]+)\*\*$/);
    if (strong) {
      return (
        <strong key={`${part}-${index}`} className="font-semibold text-ink">
          {strong[1]}
        </strong>
      );
    }

    if (part === 'contact@infimind.co.in') {
      return (
        <a key={`${part}-${index}`} href="mailto:contact@infimind.co.in" className="font-medium text-navy hover:text-gold">
          {part}
        </a>
      );
    }

    if (part.startsWith('https://infimind.co.in')) {
      return (
        <a
          key={`${part}-${index}`}
          href="https://infimind.co.in/"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-navy hover:text-gold"
        >
          {part}
        </a>
      );
    }

    return part;
  });
}
