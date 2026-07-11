import { notifyStorageUpdated, readStorage, writeStorage } from './storage';

export interface CollectionRepository<T extends { id: string }> {
  getAll(): T[];
  getById(id: string): T | undefined;
  create(item: T): T;
  update(id: string, patch: Partial<T>): T | undefined;
  remove(id: string): void;
  replaceAll(items: T[]): void;
}

/**
 * Generic localStorage-backed CRUD repository. Each entity (Testimonial,
 * LocationItem, ...) gets its own storage key and seed, but shares this
 * implementation. Behind the CollectionRepository interface so the storage
 * layer can be swapped later without touching UI code.
 */
export function createCollectionRepository<T extends { id: string }>(
  storageKey: string,
  seed: T[],
): CollectionRepository<T> {
  const load = (): T[] => readStorage<T[]>(storageKey, seed);
  const save = (items: T[]): void => {
    writeStorage(storageKey, items);
    notifyStorageUpdated(storageKey);
  };

  return {
    getAll: () => load(),
    getById: (id) => load().find((item) => item.id === id),
    create: (item) => {
      const items = load();
      const next = [...items, item];
      save(next);
      return item;
    },
    update: (id, patch) => {
      const items = load();
      let updated: T | undefined;
      const next = items.map((item) => {
        if (item.id !== id) return item;
        updated = { ...item, ...patch };
        return updated;
      });
      save(next);
      return updated;
    },
    remove: (id) => {
      const items = load();
      save(items.filter((item) => item.id !== id));
    },
    replaceAll: (items) => save(items),
  };
}
