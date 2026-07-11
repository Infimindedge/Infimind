import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { NavItem } from './navConfig';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { cn } from '@/lib/utils';

interface NavDropdownProps {
  item: NavItem;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function NavDropdown({ item, isOpen, onOpen, onClose }: NavDropdownProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useOutsideClick(containerRef, onClose, isOpen);
  useEscapeKey(onClose, isOpen);

  const toggle = () => (isOpen ? onClose() : onOpen());

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex items-center gap-1 text-sm font-medium text-ink-soft transition-colors hover:text-navy"
      >
        {item.label}
        <ChevronDown size={15} strokeWidth={2} className={cn('transition-transform', isOpen && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            role="menu"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute left-1/2 top-full z-30 mt-3 w-56 -translate-x-1/2 rounded-container border border-border bg-paper-pure p-2 shadow-hover"
          >
            {item.dropdown?.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                role="menuitem"
                onClick={onClose}
                className="block rounded-lg px-4 py-2.5 text-sm text-ink-soft transition-colors hover:bg-paper-soft hover:text-navy"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
