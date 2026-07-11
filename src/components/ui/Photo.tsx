import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhotoProps {
  /** Filename expected under /public/assets/photos/, per ASSET_PLACEMENT_AND_SOURCES.md */
  filename: string;
  alt: string;
  ratioLabel: string;
  className?: string;
  priority?: boolean;
}

/**
 * Renders the real photo when present under /assets/photos/. If the file is
 * missing (Phase 1 ships without redistributed third-party photography), it
 * falls back to an elegant neutral placeholder naming the expected filename
 * and aspect ratio, per the build spec — never an AI-generated substitute.
 */
export function Photo({ filename, alt, ratioLabel, className, priority = false }: PhotoProps) {
  const [errored, setErrored] = useState(false);
  const src = `/assets/photos/${filename}`;

  if (errored) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          'flex flex-col items-center justify-center gap-2 border border-border bg-paper-soft text-ink-muted',
          className,
        )}
      >
        <ImageOff size={22} strokeWidth={1.5} aria-hidden="true" />
        <span className="text-xs font-medium">{filename}</span>
        <span className="text-[11px] uppercase tracking-[0.1em] text-ink-muted/70">{ratioLabel}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn('h-full w-full object-cover', className)}
      loading={priority ? 'eager' : 'lazy'}
      width={1200}
      height={900}
      onError={() => setErrored(true)}
    />
  );
}
