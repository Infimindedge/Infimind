import { useEffect, useState } from 'react';

export function useScrolled(threshold = 40): boolean {
  const [scrolled, setScrolled] = useState(() => (typeof window === 'undefined' ? false : window.scrollY > threshold));

  useEffect(() => {
    let ticking = false;
    function handleScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold);
        ticking = false;
      });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}
