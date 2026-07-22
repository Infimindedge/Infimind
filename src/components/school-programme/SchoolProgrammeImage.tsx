import { ImageOff } from 'lucide-react';
import { useState } from 'react';

interface Props {
  filename: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function SchoolProgrammeImage({ filename, alt, className = '', priority = false }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div role="img" aria-label={alt} className={`school-programme-image-placeholder ${className}`}>
        <ImageOff aria-hidden="true" />
        {import.meta.env.DEV ? <span>{filename}</span> : <span className="sr-only">Image unavailable</span>}
      </div>
    );
  }
  return (
    <img
      src={`/assets/school-programme/${filename}`}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      width="900"
      height="700"
      onError={() => setFailed(true)}
    />
  );
}
