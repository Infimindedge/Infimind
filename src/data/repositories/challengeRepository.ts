import type { ChallengeItem } from '@/types/content';
import { challengesSeed } from '@/data/seed/challenges.seed';

/**
 * Read-only in Phase 1 — no admin module edits challenges yet. Kept behind
 * a function (not a direct import) so a future admin module or remote
 * source can replace this without changing call sites.
 */
export function getChallenges(): ChallengeItem[] {
  return challengesSeed;
}
