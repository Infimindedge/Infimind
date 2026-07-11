import { useEffect, type RefObject } from 'react';

/** Moves focus into a dialog/panel when it opens, so keyboard and screen reader users land inside it. */
export function useFocusOnOpen(ref: RefObject<HTMLElement | null>, open: boolean) {
  useEffect(() => {
    if (!open || !ref.current) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    ref.current.focus();
    return () => previouslyFocused?.focus();
  }, [open, ref]);
}
