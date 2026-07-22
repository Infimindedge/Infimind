import { cn } from '@/lib/utils';
import type { BlogCategory } from '@/types/blog';

interface CategoryFiltersProps {
  categories: BlogCategory[];
  activeCategoryId: string | null;
  onSelect: (categoryId: string | null) => void;
}

/** `null` represents the "All" pseudo-category — not a real BlogCategory record. */
export function CategoryFilters({ categories, activeCategoryId, onSelect }: CategoryFiltersProps) {
  return (
    <div
      role="group"
      aria-label="Filter articles by category"
      className="flex min-w-0 gap-2 overflow-x-auto pb-1 sm:flex-1 sm:flex-wrap sm:overflow-visible"
    >
      <button
        type="button"
        onClick={() => onSelect(null)}
        aria-pressed={activeCategoryId === null}
        className={cn(
          'min-h-[40px] shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors',
          activeCategoryId === null ? 'bg-gold text-navy' : 'bg-paper-soft text-ink-soft hover:text-ink',
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onSelect(category.id)}
          aria-pressed={activeCategoryId === category.id}
          className={cn(
            'min-h-[40px] shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors',
            activeCategoryId === category.id ? 'bg-gold text-navy' : 'bg-paper-soft text-ink-soft hover:text-ink',
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
