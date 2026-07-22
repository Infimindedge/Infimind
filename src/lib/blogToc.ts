import { slugify } from './slugify';
import type { BlogBlock } from '@/types/blog';

export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Derives stable, readable anchor ids from heading2/heading3 blocks (e.g.
 * "the-need-for-personalized-learning"), deduping repeated headings with a
 * numeric suffix. BlockRenderer walks blocks in the same order and consumes
 * this same list, so the ids it assigns to rendered headings always match
 * what the TOC links point to.
 */
export function buildToc(body: BlogBlock[]): TocEntry[] {
  const seen = new Map<string, number>();

  return body
    .filter((block): block is Extract<BlogBlock, { type: 'heading2' | 'heading3' }> =>
      block.type === 'heading2' || block.type === 'heading3',
    )
    .map((block) => {
      const base = slugify(block.text) || 'section';
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      return {
        id: count === 0 ? base : `${base}-${count}`,
        text: block.text,
        level: block.type === 'heading2' ? 2 : 3,
      };
    });
}
