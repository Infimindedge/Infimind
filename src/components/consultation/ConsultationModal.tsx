import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useFocusOnOpen } from '@/hooks/useFocusOnOpen';
import { ConsultationForm } from './ConsultationForm';

interface ConsultationModalProps {
  open: boolean;
  onClose: () => void;
}

export function ConsultationModal({ open, onClose }: ConsultationModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dialogRef, onClose, open);
  useEscapeKey(onClose, open);
  useFocusOnOpen(dialogRef, open);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy/50 px-4 py-10"
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full max-w-lg rounded-container border border-border bg-paper-pure p-6 shadow-hover sm:p-8"
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="eyebrow text-gold">Private Consultation</p>
                <h2 id="consultation-modal-title" className="mt-1 font-display text-2xl text-ink">
                  Schedule a Private Consultation
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-paper-soft"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4">
              <ConsultationForm />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
