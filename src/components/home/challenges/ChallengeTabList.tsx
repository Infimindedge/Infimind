import { useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import type { ChallengeItem } from '@/types/content';
import { cn } from '@/lib/utils';

interface ChallengeTabListProps {
  challenges: ChallengeItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function ChallengeTabList({ challenges, activeId, onSelect }: ChallengeTabListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  function handleKeyDown(event: React.KeyboardEvent, index: number) {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const nextIndex =
      event.key === 'ArrowDown' ? (index + 1) % challenges.length : (index - 1 + challenges.length) % challenges.length;
    const nextId = challenges[nextIndex].id;
    onSelect(nextId);
    const nextButton = listRef.current?.querySelector<HTMLButtonElement>(`[data-tab-id="${nextId}"]`);
    nextButton?.focus();
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-orientation="vertical"
      aria-label="Student challenges"
      className="flex flex-col gap-2 lg:max-h-[440px] lg:overflow-y-auto lg:pr-1"
    >
      {challenges.map((challenge, index) => {
        const isActive = challenge.id === activeId;
        return (
          <button
            key={challenge.id}
            data-tab-id={challenge.id}
            role="tab"
            id={`challenge-tab-${challenge.id}`}
            aria-selected={isActive}
            aria-controls={`challenge-panel-${challenge.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(challenge.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cn(
              'flex min-h-[44px] items-center justify-between rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors',
              isActive
                ? 'border-navy bg-navy text-on-dark'
                : 'border-border bg-paper-pure text-ink-soft hover:border-border-strong hover:text-ink',
            )}
          >
            {challenge.label}
            <ChevronRight size={16} className={cn('shrink-0', isActive ? 'opacity-100' : 'opacity-40')} />
          </button>
        );
      })}
    </div>
  );
}
