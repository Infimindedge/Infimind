import { describe, expect, it } from 'vitest';
import { challengeRepository, getChallenges } from './challengeRepository';

describe('challengeRepository', () => {
  it('seeds six initial challenges, ordered by sortOrder', () => {
    const challenges = getChallenges();
    expect(challenges).toHaveLength(6);
    expect(challenges[0].id).toBe('weak-fundamentals');
    for (let i = 1; i < challenges.length; i++) {
      expect(challenges[i].sortOrder).toBeGreaterThanOrEqual(challenges[i - 1].sortOrder);
    }
  });

  it('only weak-fundamentals has supplied content — the rest are empty by design', () => {
    const challenges = getChallenges();
    const withContent = challenges.filter((c) => c.challengeDescription || c.approach.length > 0);
    expect(withContent.map((c) => c.id)).toEqual(['weak-fundamentals']);
  });

  it('admin can add a new challenge and it appears immediately', () => {
    challengeRepository.create({
      id: 'test-challenge',
      label: 'Test Challenge',
      approach: ['Step one'],
      outcomes: ['Outcome one'],
      sortOrder: 99,
    });

    expect(getChallenges().some((c) => c.id === 'test-challenge')).toBe(true);
  });

  it('admin can remove a challenge', () => {
    challengeRepository.create({
      id: 'test-remove',
      label: 'Removable',
      approach: [],
      outcomes: [],
      sortOrder: 100,
    });
    challengeRepository.remove('test-remove');
    expect(getChallenges().some((c) => c.id === 'test-remove')).toBe(false);
  });
});
