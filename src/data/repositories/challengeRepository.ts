import type { ChallengeItem } from '@/types/content';
import { challengesSeed } from '@/data/seed/challenges.seed';
import { createCollectionRepository } from './createCollectionRepository';

export const CHALLENGES_STORAGE_KEY = 'infimind:challenges';

export const challengeRepository = createCollectionRepository<ChallengeItem>(
  CHALLENGES_STORAGE_KEY,
  challengesSeed,
);

export function getChallenges(): ChallengeItem[] {
  return challengeRepository.getAll().sort((a, b) => a.sortOrder - b.sortOrder);
}
