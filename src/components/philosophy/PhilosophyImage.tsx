import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhilosophyImageProps {
  /** Filename expected under /public/assets/philosophy/. */
  filename: 'philosophy-hero.jpg' | 'beyond-coaching.jpg' | 'research-driven.jpg';
  alt: string;
  className?: string;
  priority?: boolean;
}

/**
 * Renders the real photo when present under /assets/philosophy/. Until the
 * client supplies these three images, falls back to an elegant neutral
 * placeholder naming the expected filename — never a generated substitute.
 */
export function PhilosophyImage({ filename, alt, className, priority = false }: PhilosophyImageProps) {
  const [errored, setErrored] = useState(false);

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
      </div>
    );
  }

  return (
    <img
      src={`/assets/philosophy/${filename}`}
      alt={alt}
      className={cn('h-full w-full object-cover', className)}
      loading={priority ? 'eager' : 'lazy'}
      width={1200}
      height={900}
      onError={() => setErrored(true)}
    />
  );
}
