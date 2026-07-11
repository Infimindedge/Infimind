import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  imgClassName?: string;
}

/**
 * The approved Infimind logo (/assets/brand/infimind-logo.jpg) used as-is,
 * unmodified, in both the navbar and footer per the build spec.
 */
export function Logo({ className, imgClassName }: LogoProps) {
  return (
    <Link to="/" className={cn('flex items-center gap-3 rounded-container', className)} aria-label="Infimind home">
      <img
        src="/assets/brand/infimind-logo.jpg"
        alt="Infimind — Where Vision Shapes Victory"
        className={cn('h-12 w-12 rounded-xl object-cover shadow-soft', imgClassName)}
        width={128}
        height={128}
      />
    </Link>
  );
}
