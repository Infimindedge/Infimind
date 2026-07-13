import { useState } from 'react';
import { cn } from '@/lib/utils';

interface NavichiImageProps {
  filename: 'navichi-hero.jpg' | 'navichi-portal.png' | 'navichi-cta-student.png' | 'navichi-cta-student.jpg';
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
}

export function NavichiImage({
  filename,
  alt,
  className,
  imgClassName,
  loading = 'lazy',
  fetchPriority = 'auto',
}: NavichiImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const showDevPlaceholder = import.meta.env.DEV && (!loaded || failed);

  return (
    <div className={cn('navichi-image-shell', className)}>
      {!failed ? (
        <img
          src={`/assets/navichi/${filename}`}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn('navichi-image', !loaded && 'opacity-0', imgClassName)}
        />
      ) : null}
      {showDevPlaceholder ? (
        <div className="navichi-asset-placeholder" role="note" aria-label={`Missing asset ${filename}`}>
          <span>Expected asset</span>
          <strong>{filename}</strong>
        </div>
      ) : null}
    </div>
  );
}
