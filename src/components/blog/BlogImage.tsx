import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogImageProps {
  /** A data: URL (admin upload), a path under /assets/blog/, or empty for the branded placeholder. */
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

/**
 * Renders admin-uploaded cover/content images (data: URLs) or static assets
 * under /assets/blog/ as-is. Falls back to a stable branded placeholder when
 * no image is set or the file fails to load — never a hotlinked substitute.
 */
export function BlogImage({ src, alt, className, priority = false }: BlogImageProps) {
  const [errored, setErrored] = useState(false);
  const resolvedSrc = src && (src.startsWith('data:') || src.startsWith('/')) ? src : src ? `/assets/blog/${src}` : undefined;

  if (!resolvedSrc || errored) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          'flex flex-col items-center justify-center gap-2 bg-paper-soft text-ink-muted',
          className,
        )}
      >
        <ImageOff size={22} strokeWidth={1.5} aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={cn('h-full w-full object-cover', className)}
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setErrored(true)}
    />
  );
}
