import { Search, X } from 'lucide-react';

interface BlogSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function BlogSearch({ value, onChange }: BlogSearchProps) {
  return (
    <div className="relative w-full sm:w-72 sm:shrink-0">
      <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search articles..."
        aria-label="Search articles"
        className="w-full rounded-btn border border-border-strong bg-paper-pure py-2.5 pl-10 pr-9 text-sm text-ink outline-none focus-visible:border-blue"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted hover:bg-paper-soft hover:text-ink"
        >
          <X size={14} />
        </button>
      ) : null}
    </div>
  );
}
