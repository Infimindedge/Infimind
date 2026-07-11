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

  it('all six seeded challenges have supplied content and images', () => {
    const challenges = getChallenges();
    for (const challenge of challenges) {
      expect(challenge.challengeDescription, `${challenge.id} description`).toBeTruthy();
      expect(challenge.approach.length, `${challenge.id} approach`).toBeGreaterThan(0);
      expect(challenge.outcomes.length, `${challenge.id} outcomes`).toBeGreaterThan(0);
      expect(challenge.challengeImageFilename, `${challenge.id} challenge image`).toBeTruthy();
      expect(challenge.outcomeImageFilename, `${challenge.id} outcome image`).toBeTruthy();
    }
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
