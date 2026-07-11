import { useEffect, useState } from 'react';

/** Desktop 3 cards, tablet 2, mobile 1 — per the carousel spec. */
export function useVisibleCount(): number {
  const [count, setCount] = useState(() => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) setCount(1);
      else if (window.innerWidth < 1024) setCount(2);
      else setCount(3);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return count;
}
