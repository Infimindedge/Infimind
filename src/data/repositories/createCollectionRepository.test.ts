import { describe, expect, it } from 'vitest';
import { createCollectionRepository } from './createCollectionRepository';

interface Widget {
  id: string;
  name: string;
}

const seed: Widget[] = [
  { id: 'a', name: 'Alpha' },
  { id: 'b', name: 'Beta' },
];

describe('createCollectionRepository', () => {
  it('returns the seed data before any writes', () => {
    const repo = createCollectionRepository<Widget>('test:widgets:seed', seed);
    expect(repo.getAll()).toEqual(seed);
  });

  it('creates a new item and persists it', () => {
    const repo = createCollectionRepository<Widget>('test:widgets:create', seed);
    repo.create({ id: 'c', name: 'Gamma' });
    expect(repo.getAll()).toHaveLength(3);
    expect(repo.getById('c')).toEqual({ id: 'c', name: 'Gamma' });
  });

  it('updates an existing item by id', () => {
    const repo = createCollectionRepository<Widget>('test:widgets:update', seed);
    const updated = repo.update('a', { name: 'Alpha Updated' });
    expect(updated?.name).toBe('Alpha Updated');
    expect(repo.getById('a')?.name).toBe('Alpha Updated');
  });

  it('returns undefined when updating a missing id', () => {
    const repo = createCollectionRepository<Widget>('test:widgets:update-missing', seed);
    expect(repo.update('missing', { name: 'x' })).toBeUndefined();
  });

  it('removes an item by id', () => {
    const repo = createCollectionRepository<Widget>('test:widgets:remove', seed);
    repo.remove('a');
    expect(repo.getAll().map((item) => item.id)).toEqual(['b']);
  });

  it('persists across repository instances sharing a storage key', () => {
    const repoA = createCollectionRepository<Widget>('test:widgets:shared', seed);
    repoA.create({ id: 'c', name: 'Gamma' });

    const repoB = createCollectionRepository<Widget>('test:widgets:shared', seed);
    expect(repoB.getAll()).toHaveLength(3);
  });
});
