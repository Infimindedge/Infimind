import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { navItems } from './navConfig';
import { cn } from '@/lib/utils';
import { useFocusOnOpen } from '@/hooks/useFocusOnOpen';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useFocusOnOpen(closeButtonRef, open);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.001 : 0.2 }}
          className="fixed inset-0 z-50 bg-navy/40 lg:hidden"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            initial={reduceMotion ? { opacity: 0 } : { x: '100%' }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: reduceMotion ? 0.001 : 0.25, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
            className="ml-auto flex h-full w-[85%] max-w-sm flex-col gap-1 overflow-y-auto bg-paper-pure px-6 py-6 shadow-hover"
          >
            <div className="mb-4 flex items-center justify-end">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-paper-soft"
              >
                <X size={22} />
              </button>
            </div>

            {navItems.map((item) => {
              if (!item.dropdown) {
                return (
                  <Link
                    key={item.label}
                    to={item.href ?? '#'}
                    onClick={onClose}
                    className="min-h-[44px] rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-paper-soft"
                  >
                    {item.label}
                  </Link>
                );
              }
              const isExpanded = expanded === item.label;
              return (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() => setExpanded(isExpanded ? null : item.label)}
                    aria-expanded={isExpanded}
                    className="flex min-h-[44px] w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-paper-soft"
                  >
                    {item.label}
                    <ChevronDown size={18} className={cn('transition-transform', isExpanded && 'rotate-180')} />
                  </button>
                  {isExpanded ? (
                    <div className="ml-3 flex flex-col border-l border-border pl-3">
                      {item.dropdown.map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          onClick={onClose}
                          className="min-h-[44px] rounded-lg px-3 py-2.5 text-sm text-ink-soft hover:bg-paper-soft hover:text-navy"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}

            <Link
              to="/signin"
              onClick={onClose}
              className="mt-4 flex min-h-[44px] items-center justify-center rounded-btn bg-navy px-6 py-3.5 text-sm font-medium text-on-dark"
            >
              Sign In
            </Link>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
