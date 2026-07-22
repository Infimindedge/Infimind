import { CheckCircle2, Quote } from 'lucide-react';
import { BlogImage } from './BlogImage';
import { buildToc } from '@/lib/blogToc';
import type { BlogBlock } from '@/types/blog';

/**
 * Controlled renderer for every BlogBlock type — no dangerouslySetInnerHTML,
 * no arbitrary HTML. Heading blocks get the same anchor ids buildToc()
 * produces for the sidebar TOC, computed once here and consumed in order.
 */
export function BlockRenderer({ body }: { body: BlogBlock[] }) {
  const toc = buildToc(body);

  // Precomputed in a plain loop (not inside the JSX-producing .map() below)
  // so no variable gets mutated across render — each heading block's anchor
  // id is looked up by array index instead.
  const headingIds: (string | undefined)[] = [];
  let tocCursor = 0;
  for (const block of body) {
    if (block.type === 'heading2' || block.type === 'heading3') {
      headingIds.push(toc[tocCursor]?.id);
      tocCursor += 1;
    } else {
      headingIds.push(undefined);
    }
  }

  return (
    <div>
      {body.map((block, blockIndex) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={block.id} className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                {block.text}
              </p>
            );

          case 'heading2':
            return (
              <h2 key={block.id} id={headingIds[blockIndex]} className="mt-10 scroll-mt-28 text-[clamp(24px,2.4vw,32px)] text-ink">
                {block.text}
              </h2>
            );

          case 'heading3':
            return (
              <h3 key={block.id} id={headingIds[blockIndex]} className="mt-8 scroll-mt-28 text-xl font-semibold text-ink">
                {block.text}
              </h3>
            );

          case 'quote':
            return (
              <blockquote key={block.id} className="my-8 border-l-2 border-gold py-1 pl-5">
                <p className="font-display text-xl leading-snug text-ink">{block.text}</p>
                {block.attribution ? <cite className="mt-2 block text-sm not-italic text-ink-muted">— {block.attribution}</cite> : null}
              </blockquote>
            );

          case 'image':
            return (
              <figure key={block.id} className="my-8">
                <div className="aspect-[16/9] overflow-hidden rounded-container">
                  <BlogImage src={block.src} alt={block.alt} />
                </div>
                {block.caption ? <figcaption className="mt-2 text-center text-xs text-ink-muted">{block.caption}</figcaption> : null}
              </figure>
            );

          case 'list':
            return (
              <ul key={block.id} className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-ink-soft">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );

          case 'numberedList':
            return (
              <ol key={block.id} className="mt-4 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-ink-soft">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            );

          case 'callout':
            return (
              <div key={block.id} className="my-6 rounded-lg border border-gold-soft bg-gold-soft/30 px-4 py-3 text-sm font-medium text-gold-dark">
                {block.text}
              </div>
            );

          case 'researchCards':
            return (
              <div key={block.id} className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {block.cards.map((card) => (
                  <div key={card.stat + card.label} className="rounded-container border border-border bg-paper-soft p-5">
                    <p className="font-display text-3xl text-navy">{card.stat}</p>
                    <p className="mt-2 text-sm leading-snug text-ink-soft">{card.label}</p>
                    <p className="mt-3 text-xs text-ink-muted">
                      Source:{' '}
                      {card.sourceUrl ? (
                        <a href={card.sourceUrl} target="_blank" rel="noreferrer" className="underline hover:text-navy">
                          {card.sourceLabel}
                        </a>
                      ) : (
                        card.sourceLabel
                      )}
                    </p>
                  </div>
                ))}
              </div>
            );

          case 'divider':
            return <hr key={block.id} className="my-8 border-border" />;

          case 'keyTakeaways':
            return (
              <div key={block.id} className="my-8 grid grid-cols-1 gap-6 rounded-container border border-border bg-paper-soft p-6 sm:grid-cols-[1fr_200px]">
                <div>
                  <h3 className="font-display text-xl text-ink">Key Takeaways</h3>
                  <ul className="mt-4 space-y-2.5">
                    {block.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {block.imageSrc ? (
                  <div className="aspect-[4/3] overflow-hidden rounded-container">
                    <BlogImage src={block.imageSrc} alt={block.imageAlt ?? ''} />
                  </div>
                ) : null}
              </div>
            );

          case 'twoColumn':
            return (
              <div key={block.id} className="my-8 grid grid-cols-1 items-center gap-6 sm:grid-cols-2">
                <div className="aspect-[4/3] overflow-hidden rounded-container">
                  <BlogImage src={block.imageSrc} alt={block.imageAlt} />
                </div>
                <div>
                  {block.heading ? <h3 className="text-lg font-semibold text-ink">{block.heading}</h3> : null}
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{block.text}</p>
                </div>
              </div>
            );

          case 'process':
            return (
              <div key={block.id} className="my-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
                {block.steps.map((step, index) => (
                  <div key={step.title} className="text-center">
                    <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-navy text-xs font-semibold text-on-dark">
                      {index + 1}
                    </span>
                    <p className="mt-3 text-sm font-semibold text-ink">{step.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-soft">{step.description}</p>
                  </div>
                ))}
              </div>
            );

          case 'references':
            return (
              <div key={block.id} className="my-8">
                <h3 className="text-lg font-semibold text-ink">References</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
                  {block.items.map((item) => (
                    <li key={item.label}>
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noreferrer" className="underline hover:text-navy">
                          {item.label}
                        </a>
                      ) : (
                        item.label
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );

          default:
            return null;
        }
      })}
      {body.length === 0 ? (
        <p className="mt-4 flex items-center gap-2 text-sm text-ink-muted">
          <Quote size={14} aria-hidden="true" /> This article has no content yet.
        </p>
      ) : null}
    </div>
  );
}
