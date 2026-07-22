import { ChevronDown, ChevronUp, Copy, Plus, Trash2, X } from 'lucide-react';
import { fileToDataUrl } from '@/lib/fileToDataUrl';
import { BLOCK_TYPE_LABELS } from './blockDefaults';
import type { BlogBlock } from '@/types/blog';

interface BlockEditorCardProps {
  block: BlogBlock;
  index: number;
  total: number;
  onChange: (block: BlogBlock) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

const inputClass =
  'w-full rounded-btn border border-border-strong bg-paper-pure px-3 py-2 text-sm text-ink outline-none focus-visible:border-blue';
const smallLabel = 'mb-1 block text-xs font-medium text-ink-soft';

function StringListEditor({ items, onChange, placeholder }: { items: string[]; onChange: (items: string[]) => void; placeholder?: string }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            className={inputClass}
            value={item}
            placeholder={placeholder}
            onChange={(event) => onChange(items.map((current, i) => (i === index ? event.target.value : current)))}
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, i) => i !== index))}
            aria-label="Remove item"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-error/10 hover:text-error"
          >
            <X size={14} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ''])}
        className="flex w-fit items-center gap-1.5 text-xs font-medium text-gold-dark hover:text-navy"
      >
        <Plus size={12} /> Add item
      </button>
    </div>
  );
}

export function BlockEditorCard({ block, index, total, onChange, onMoveUp, onMoveDown, onDuplicate, onDelete }: BlockEditorCardProps) {
  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>, field: 'src' | 'imageSrc') {
    const file = event.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    onChange({ ...block, [field]: dataUrl } as BlogBlock);
  }

  return (
    <div className="rounded-container border border-border bg-paper-pure p-4">
      <div className="flex items-center justify-between border-b border-border pb-2.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{BLOCK_TYPE_LABELS[block.type]}</span>
        <div className="flex items-center gap-1">
          <button type="button" onClick={onMoveUp} disabled={index === 0} aria-label="Move block up" className="flex h-7 w-7 items-center justify-center rounded-full text-ink-soft hover:bg-paper-soft disabled:opacity-30">
            <ChevronUp size={14} />
          </button>
          <button type="button" onClick={onMoveDown} disabled={index === total - 1} aria-label="Move block down" className="flex h-7 w-7 items-center justify-center rounded-full text-ink-soft hover:bg-paper-soft disabled:opacity-30">
            <ChevronDown size={14} />
          </button>
          <button type="button" onClick={onDuplicate} aria-label="Duplicate block" className="flex h-7 w-7 items-center justify-center rounded-full text-ink-soft hover:bg-paper-soft">
            <Copy size={13} />
          </button>
          <button type="button" onClick={onDelete} aria-label="Delete block" className="flex h-7 w-7 items-center justify-center rounded-full text-ink-soft hover:bg-error/10 hover:text-error">
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      <div className="mt-3">
        {block.type === 'paragraph' || block.type === 'heading2' || block.type === 'heading3' || block.type === 'callout' ? (
          <textarea
            rows={block.type === 'paragraph' ? 3 : 2}
            className={inputClass}
            value={block.text}
            onChange={(event) => onChange({ ...block, text: event.target.value })}
            placeholder="Text"
          />
        ) : null}

        {block.type === 'quote' ? (
          <div className="flex flex-col gap-2">
            <textarea rows={2} className={inputClass} value={block.text} onChange={(event) => onChange({ ...block, text: event.target.value })} placeholder="Quote text" />
            <input
              className={inputClass}
              value={block.attribution ?? ''}
              onChange={(event) => onChange({ ...block, attribution: event.target.value })}
              placeholder="Attribution (optional)"
            />
          </div>
        ) : null}

        {block.type === 'image' ? (
          <div className="flex flex-col gap-2">
            <div>
              <label className={smallLabel}>Image</label>
              <input type="file" accept="image/*" onChange={(event) => handleImageChange(event, 'src')} className="text-sm" />
              {block.src ? <img src={block.src} alt="" className="mt-2 h-24 w-full rounded-lg object-cover" /> : null}
            </div>
            <div>
              <label className={smallLabel}>Alt text (required before publishing)</label>
              <input className={inputClass} value={block.alt} onChange={(event) => onChange({ ...block, alt: event.target.value })} />
            </div>
            <div>
              <label className={smallLabel}>Caption (optional)</label>
              <input className={inputClass} value={block.caption ?? ''} onChange={(event) => onChange({ ...block, caption: event.target.value })} />
            </div>
          </div>
        ) : null}

        {block.type === 'list' || block.type === 'numberedList' || block.type === 'keyTakeaways' ? (
          <div className="flex flex-col gap-3">
            <StringListEditor items={block.items} onChange={(items) => onChange({ ...block, items })} placeholder="Item" />
            {block.type === 'keyTakeaways' ? (
              <div>
                <label className={smallLabel}>Side image (optional)</label>
                <input type="file" accept="image/*" onChange={(event) => handleImageChange(event, 'imageSrc')} className="text-sm" />
                {block.imageSrc ? <img src={block.imageSrc} alt="" className="mt-2 h-20 w-full rounded-lg object-cover" /> : null}
              </div>
            ) : null}
          </div>
        ) : null}

        {block.type === 'divider' ? <p className="text-sm text-ink-muted">A horizontal divider — no fields to edit.</p> : null}

        {block.type === 'twoColumn' ? (
          <div className="flex flex-col gap-2">
            <div>
              <label className={smallLabel}>Image</label>
              <input type="file" accept="image/*" onChange={(event) => handleImageChange(event, 'imageSrc')} className="text-sm" />
              {block.imageSrc ? <img src={block.imageSrc} alt="" className="mt-2 h-24 w-full rounded-lg object-cover" /> : null}
            </div>
            <input className={inputClass} value={block.imageAlt} onChange={(event) => onChange({ ...block, imageAlt: event.target.value })} placeholder="Image alt text" />
            <input className={inputClass} value={block.heading ?? ''} onChange={(event) => onChange({ ...block, heading: event.target.value })} placeholder="Heading (optional)" />
            <textarea rows={3} className={inputClass} value={block.text} onChange={(event) => onChange({ ...block, text: event.target.value })} placeholder="Text" />
          </div>
        ) : null}

        {block.type === 'researchCards' ? (
          <div className="flex flex-col gap-3">
            {block.cards.map((card, cardIndex) => (
              <div key={cardIndex} className="grid grid-cols-1 gap-2 rounded-lg border border-border p-3 sm:grid-cols-2">
                <input
                  className={inputClass}
                  placeholder="Stat (e.g. 30%)"
                  value={card.stat}
                  onChange={(event) =>
                    onChange({ ...block, cards: block.cards.map((c, i) => (i === cardIndex ? { ...c, stat: event.target.value } : c)) })
                  }
                />
                <input
                  className={inputClass}
                  placeholder="Label"
                  value={card.label}
                  onChange={(event) =>
                    onChange({ ...block, cards: block.cards.map((c, i) => (i === cardIndex ? { ...c, label: event.target.value } : c)) })
                  }
                />
                <input
                  className={inputClass}
                  placeholder="Source label (required)"
                  value={card.sourceLabel}
                  onChange={(event) =>
                    onChange({ ...block, cards: block.cards.map((c, i) => (i === cardIndex ? { ...c, sourceLabel: event.target.value } : c)) })
                  }
                />
                <div className="flex items-center gap-2">
                  <input
                    className={inputClass}
                    placeholder="Source URL (optional)"
                    value={card.sourceUrl ?? ''}
                    onChange={(event) =>
                      onChange({ ...block, cards: block.cards.map((c, i) => (i === cardIndex ? { ...c, sourceUrl: event.target.value } : c)) })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => onChange({ ...block, cards: block.cards.filter((_, i) => i !== cardIndex) })}
                    aria-label="Remove card"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-error/10 hover:text-error"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => onChange({ ...block, cards: [...block.cards, { stat: '', label: '', sourceLabel: '' }] })}
              className="flex w-fit items-center gap-1.5 text-xs font-medium text-gold-dark hover:text-navy"
            >
              <Plus size={12} /> Add card
            </button>
          </div>
        ) : null}

        {block.type === 'process' ? (
          <div className="flex flex-col gap-3">
            {block.steps.map((step, stepIndex) => (
              <div key={stepIndex} className="flex items-start gap-2 rounded-lg border border-border p-3">
                <div className="flex-1 space-y-2">
                  <input
                    className={inputClass}
                    placeholder="Step title"
                    value={step.title}
                    onChange={(event) =>
                      onChange({ ...block, steps: block.steps.map((s, i) => (i === stepIndex ? { ...s, title: event.target.value } : s)) })
                    }
                  />
                  <input
                    className={inputClass}
                    placeholder="Step description"
                    value={step.description}
                    onChange={(event) =>
                      onChange({ ...block, steps: block.steps.map((s, i) => (i === stepIndex ? { ...s, description: event.target.value } : s)) })
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={() => onChange({ ...block, steps: block.steps.filter((_, i) => i !== stepIndex) })}
                  aria-label="Remove step"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-error/10 hover:text-error"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => onChange({ ...block, steps: [...block.steps, { title: '', description: '' }] })}
              className="flex w-fit items-center gap-1.5 text-xs font-medium text-gold-dark hover:text-navy"
            >
              <Plus size={12} /> Add step
            </button>
          </div>
        ) : null}

        {block.type === 'references' ? (
          <div className="flex flex-col gap-3">
            {block.items.map((reference, refIndex) => (
              <div key={refIndex} className="flex items-center gap-2">
                <input
                  className={inputClass}
                  placeholder="Label"
                  value={reference.label}
                  onChange={(event) =>
                    onChange({ ...block, items: block.items.map((r, i) => (i === refIndex ? { ...r, label: event.target.value } : r)) })
                  }
                />
                <input
                  className={inputClass}
                  placeholder="URL (optional)"
                  value={reference.url ?? ''}
                  onChange={(event) =>
                    onChange({ ...block, items: block.items.map((r, i) => (i === refIndex ? { ...r, url: event.target.value } : r)) })
                  }
                />
                <button
                  type="button"
                  onClick={() => onChange({ ...block, items: block.items.filter((_, i) => i !== refIndex) })}
                  aria-label="Remove reference"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-error/10 hover:text-error"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => onChange({ ...block, items: [...block.items, { label: '' }] })}
              className="flex w-fit items-center gap-1.5 text-xs font-medium text-gold-dark hover:text-navy"
            >
              <Plus size={12} /> Add reference
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
