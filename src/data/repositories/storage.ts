/**
 * Thin persistence helpers wrapping localStorage. Repositories depend only
 * on this module, so swapping to Supabase/Firebase/a custom API later means
 * rewriting the repository implementations, not their callers.
 */
export function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

/** Fires when any repository writes, so multiple hook instances stay in sync. */
export const STORAGE_EVENT = 'infimind:storage-updated';

export function notifyStorageUpdated(key: string): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { key } }));
}
