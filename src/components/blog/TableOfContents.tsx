import { useEffect, useState, type MouseEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { TocEntry } from '@/lib/blogToc';

interface TableOfContentsProps {
  entries: TocEntry[];
}

export function TableOfContents({ entries }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(entries[0]?.id ?? null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (entries.length === 0) return;
    const headingEls = entries.map((entry) => document.getElementById(entry.id)).filter((el): el is HTMLElement => Boolean(el));
    if (headingEls.length === 0) return;

    const observer = new IntersectionObserver(
      (observedEntries) => {
        const visible = observedEntries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-100px 0px -70% 0px' },
    );
    headingEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [entries]);

  function handleClick(id: string, event: MouseEvent) {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    setMobileOpen(false);
  }

  if (entries.length === 0) return null;

  return (
    <>
      <div className="mb-6 rounded-container border border-border bg-paper-soft lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((current) => !current)}
          aria-expanded={mobileOpen}
          className="flex min-h-[44px] w-full items-center justify-between px-4 py-3 text-sm font-medium text-ink"
        >
          On This Page
          <ChevronDown size={16} className={cn('transition-transform', mobileOpen && 'rotate-180')} aria-hidden="true" />
        </button>
        {mobileOpen ? (
          <nav aria-label="Table of contents" className="border-t border-border px-4 py-3">
            <TocList entries={entries} activeId={activeId} onClick={handleClick} />
          </nav>
        ) : null}
      </div>

      <nav aria-label="Table of contents" className="sticky top-24 hidden lg:block">
        <p className="eyebrow text-ink-muted">On This Page</p>
        <div className="mt-4">
          <TocList entries={entries} activeId={activeId} onClick={handleClick} />
        </div>
      </nav>
    </>
  );
}

function TocList({
  entries,
  activeId,
  onClick,
}: {
  entries: TocEntry[];
  activeId: string | null;
  onClick: (id: string, event: MouseEvent) => void;
}) {
  // Precomputed in a plain loop so no variable gets mutated inside the
  // JSX-producing .map() below — each level-2 entry's number is looked up
  // by array index instead.
  const numberLabels: (number | null)[] = [];
  let counter = 0;
  for (const entry of entries) {
    if (entry.level === 2) counter += 1;
    numberLabels.push(entry.level === 2 ? counter : null);
  }

  return (
    <ol className="flex flex-col gap-2.5">
      {entries.map((entry, index) => {
        const isActive = activeId === entry.id;
        return (
          <li key={entry.id} className={entry.level === 3 ? 'pl-4' : undefined}>
            <a
              href={`#${entry.id}`}
              onClick={(event) => onClick(entry.id, event)}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'block border-l-2 pl-3 text-sm transition-colors',
                isActive ? 'border-gold font-medium text-ink' : 'border-transparent text-ink-soft hover:text-ink',
              )}
            >
              {entry.level === 2 ? `${numberLabels[index]}. ${entry.text}` : entry.text}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
