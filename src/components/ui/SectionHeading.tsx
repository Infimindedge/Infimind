import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  /** Overrides the default max-w-2xl constraint. */
  maxWidthClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = 'center',
  className,
  maxWidthClassName = 'max-w-2xl',
}: SectionHeadingProps) {
  return (
    <div className={cn(maxWidthClassName, align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? <p className="eyebrow mb-3 text-gold">{eyebrow}</p> : null}
      <h2 className="text-[clamp(36px,3.4vw,52px)] leading-[1.05] text-ink">{title}</h2>
      {body ? <p className="mt-4 text-lg leading-[1.7] text-ink-soft">{body}</p> : null}
    </div>
  );
}
