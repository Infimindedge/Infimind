import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useFocusOnOpen } from '@/hooks/useFocusOnOpen';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ open, title, description, confirmLabel = 'Delete', onConfirm, onCancel }: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dialogRef, onCancel, open);
  useEscapeKey(onCancel, open);
  useFocusOnOpen(dialogRef, open);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 px-4"
        >
          <motion.div
            ref={dialogRef}
            role="alertdialog"
            aria-modal="true"
            tabIndex={-1}
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-sm rounded-container border border-border bg-paper-pure p-6 shadow-hover"
          >
            <h2 id="confirm-dialog-title" className="font-display text-xl text-ink">
              {title}
            </h2>
            <p id="confirm-dialog-description" className="mt-2 text-sm text-ink-soft">
              {description}
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="min-h-[44px] rounded-btn border border-border-strong px-5 py-2.5 text-sm font-medium text-ink hover:border-navy"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="min-h-[44px] rounded-btn bg-error px-5 py-2.5 text-sm font-medium text-on-dark hover:opacity-90"
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
