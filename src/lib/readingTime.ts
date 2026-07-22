import type { BlogBlock } from '@/types/blog';

const WORDS_PER_MINUTE = 200;

function blockText(block: BlogBlock): string {
  switch (block.type) {
    case 'paragraph':
    case 'heading2':
    case 'heading3':
    case 'quote':
    case 'callout':
      return block.text;
    case 'list':
    case 'numberedList':
      return block.items.join(' ');
    case 'keyTakeaways':
      return block.items.join(' ');
    case 'researchCards':
      return block.cards.map((card) => `${card.stat} ${card.label}`).join(' ');
    case 'process':
      return block.steps.map((step) => `${step.title} ${step.description}`).join(' ');
    case 'twoColumn':
      return `${block.heading ?? ''} ${block.text}`;
    case 'references':
      return block.items.map((item) => item.label).join(' ');
    case 'image':
    case 'divider':
      return '';
  }
}

/** Estimates reading time from block content, for the editor's suggested default — admins can override it. */
export function estimateReadingTimeMinutes(body: BlogBlock[]): number {
  const wordCount = body.reduce((total, block) => total + blockText(block).split(/\s+/).filter(Boolean).length, 0);
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}
