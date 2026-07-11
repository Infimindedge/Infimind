import { useCallback, useEffect, useState } from 'react';
import { STORAGE_EVENT } from '@/data/repositories/storage';
import type { CollectionRepository } from '@/data/repositories/createCollectionRepository';

/**
 * Subscribes a component to a CollectionRepository, re-reading whenever any
 * repository writes (including from another module, e.g. the admin page
 * updating locations while the homepage map is mounted in the same tab).
 */
export function useCollection<T extends { id: string }>(
  repository: CollectionRepository<T>,
  storageKey: string,
): { items: T[]; refresh: () => void } {
  const [items, setItems] = useState<T[]>(() => repository.getAll());

  const refresh = useCallback(() => {
    setItems(repository.getAll());
  }, [repository]);

  useEffect(() => {
    const handleStorageUpdated = (event: Event) => {
      const detail = (event as CustomEvent<{ key: string }>).detail;
      if (!detail || detail.key === storageKey) {
        refresh();
      }
    };
    window.addEventListener(STORAGE_EVENT, handleStorageUpdated);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(STORAGE_EVENT, handleStorageUpdated);
      window.removeEventListener('storage', refresh);
    };
  }, [refresh, storageKey]);

  return { items, refresh };
}
