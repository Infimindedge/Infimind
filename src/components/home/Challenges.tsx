import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { ChallengeTabList } from './challenges/ChallengeTabList';
import { ChallengePanel } from './challenges/ChallengePanel';
import { challengeRepository, getChallenges, CHALLENGES_STORAGE_KEY } from '@/data/repositories/challengeRepository';
import { useCollection } from '@/hooks/useCollection';

export function Challenges() {
  useCollection(challengeRepository, CHALLENGES_STORAGE_KEY);
  const challenges = getChallenges();
  const [activeId, setActiveId] = useState(challenges[0]?.id ?? '');

  // Derived, not stored: if admin removes the active challenge (or on first
  // render before any selection), fall back to the first available one.
  const activeChallenge = challenges.find((challenge) => challenge.id === activeId) ?? challenges[0];

  if (challenges.length === 0) return null;

  return (
    <section className="section-spacing bg-paper-soft">
      <Container width="max">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <div>
            <h2 className="max-w-[230px] text-[clamp(28px,2.6vw,34px)] leading-[1.15] text-ink">
              Every Child Has a Different Challenge.{' '}
              <span className="text-gold">We Build a Different Solution.</span>
            </h2>
            <div className="mt-8">
              <ChallengeTabList challenges={challenges} activeId={activeChallenge?.id ?? ''} onSelect={setActiveId} />
            </div>
          </div>
          <AnimatePresence mode="wait">
            {activeChallenge ? <ChallengePanel key={activeChallenge.id} challenge={activeChallenge} /> : null}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
