import { useEffect, useRef, useState } from 'react';
import type { NavichiNavItem } from '@/types/navichi';
import { cn } from '@/lib/utils';

interface NavichiSectionNavProps {
  items: NavichiNavItem[];
}

export function NavichiSectionNav({ items }: NavichiSectionNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const originalTop = nav.getBoundingClientRect().top + window.scrollY;
    const handleScroll = () => setStuck(window.scrollY > originalTop);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      ref={navRef}
      aria-label="Navichi sections"
      className={cn('navichi-section-nav', stuck && 'navichi-section-nav--stuck')}
    >
      <div className="navichi-section-nav__track">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={activeId === item.id ? 'true' : undefined}
            className="navichi-section-nav__link"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
