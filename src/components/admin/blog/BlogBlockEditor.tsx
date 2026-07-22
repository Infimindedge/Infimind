import { useState } from 'react';
import { Plus } from 'lucide-react';
import { AdminModal } from '@/components/admin/AdminModal';
import { BlockRenderer } from '@/components/blog/BlockRenderer';
import { BlockEditorCard } from './BlockEditorCard';
import { BLOCK_TYPE_LABELS, createDefaultBlock } from './blockDefaults';
import type { BlogBlock, BlogBlockType } from '@/types/blog';

interface BlogBlockEditorProps {
  blocks: BlogBlock[];
  onChange: (blocks: BlogBlock[]) => void;
}

export function BlogBlockEditor({ blocks, onChange }: BlogBlockEditorProps) {
  const [addingType, setAddingType] = useState<BlogBlockType>('paragraph');
  const [previewOpen, setPreviewOpen] = useState(false);

  function updateBlock(index: number, next: BlogBlock) {
    onChange(blocks.map((block, i) => (i === index ? next : block)));
  }
  function moveBlock(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }
  function duplicateBlock(index: number) {
    const clone = { ...blocks[index], id: crypto.randomUUID() };
    const next = [...blocks];
    next.splice(index + 1, 0, clone);
    onChange(next);
  }
  function deleteBlock(index: number) {
    onChange(blocks.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-ink">Article body</span>
        <button
          type="button"
          onClick={() => setPreviewOpen(true)}
          disabled={blocks.length === 0}
          className="text-sm font-medium text-gold-dark hover:text-navy disabled:opacity-40"
        >
          Preview
        </button>
      </div>

      {blocks.length === 0 ? (
        <p className="mt-2 rounded-container border border-dashed border-border-strong bg-paper-soft p-6 text-center text-sm text-ink-muted">
          No content blocks yet — add one below. Publishing requires at least one block.
        </p>
      ) : (
        <div className="mt-3 flex flex-col gap-3">
          {blocks.map((block, index) => (
            <BlockEditorCard
              key={block.id}
              block={block}
              index={index}
              total={blocks.length}
              onChange={(next) => updateBlock(index, next)}
              onMoveUp={() => moveBlock(index, -1)}
              onMoveDown={() => moveBlock(index, 1)}
              onDuplicate={() => duplicateBlock(index)}
              onDelete={() => deleteBlock(index)}
            />
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center gap-2">
        <select
          aria-label="New block type"
          value={addingType}
          onChange={(event) => setAddingType(event.target.value as BlogBlockType)}
          className="rounded-btn border border-border-strong bg-paper-pure px-3 py-2 text-sm text-ink outline-none focus-visible:border-blue"
        >
          {Object.entries(BLOCK_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => onChange([...blocks, createDefaultBlock(addingType)])}
          className="inline-flex items-center gap-1.5 rounded-btn border border-border-strong px-3.5 py-2 text-sm font-medium text-ink hover:border-navy"
        >
          <Plus size={14} /> Add block
        </button>
      </div>

      <AdminModal open={previewOpen} title="Article Preview" onClose={() => setPreviewOpen(false)}>
        <div className="max-h-[70vh] overflow-y-auto">
          <BlockRenderer body={blocks} />
        </div>
      </AdminModal>
    </div>
  );
}
