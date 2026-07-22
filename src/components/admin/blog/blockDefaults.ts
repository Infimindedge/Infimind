import type { BlogBlock, BlogBlockType } from '@/types/blog';

export const BLOCK_TYPE_LABELS: Record<BlogBlockType, string> = {
  paragraph: 'Paragraph',
  heading2: 'Heading (H2)',
  heading3: 'Subheading (H3)',
  quote: 'Pull Quote',
  image: 'Image',
  list: 'Bullet List',
  numberedList: 'Numbered List',
  callout: 'Callout',
  researchCards: 'Research / Stat Cards',
  divider: 'Divider',
  keyTakeaways: 'Key Takeaways',
  twoColumn: 'Two-Column Image + Text',
  process: 'Process Row',
  references: 'References',
};

export function createDefaultBlock(type: BlogBlockType): BlogBlock {
  const id = crypto.randomUUID();
  switch (type) {
    case 'paragraph':
      return { id, type, text: '' };
    case 'heading2':
      return { id, type, text: '' };
    case 'heading3':
      return { id, type, text: '' };
    case 'quote':
      return { id, type, text: '', attribution: '' };
    case 'image':
      return { id, type, src: '', alt: '' };
    case 'list':
      return { id, type, items: [''] };
    case 'numberedList':
      return { id, type, items: [''] };
    case 'callout':
      return { id, type, text: '' };
    case 'researchCards':
      return { id, type, cards: [{ stat: '', label: '', sourceLabel: '' }] };
    case 'divider':
      return { id, type };
    case 'keyTakeaways':
      return { id, type, items: [''] };
    case 'twoColumn':
      return { id, type, imageSrc: '', imageAlt: '', text: '' };
    case 'process':
      return { id, type, steps: [{ title: '', description: '' }] };
    case 'references':
      return { id, type, items: [{ label: '' }] };
  }
}
