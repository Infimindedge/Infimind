import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** "content" = 1280px standard width, "max" = 1440px outer bound. */
  width?: 'content' | 'max';
  as?: ElementType;
}

export function Container({ children, className, width = 'content', as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-6 md:px-12 lg:px-[72px]',
        width === 'content' ? 'max-w-[1280px]' : 'max-w-[1440px]',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
