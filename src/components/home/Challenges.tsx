import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { ChallengeTabList } from './challenges/ChallengeTabList';
import { ChallengePanel } from './challenges/ChallengePanel';
import { getChallenges } from '@/data/repositories/challengeRepository';

export function Challenges() {
  const challenges = getChallenges();
  const [activeId, setActiveId] = useState(challenges[0]?.id ?? '');
  const activeChallenge = challenges.find((challenge) => challenge.id === activeId) ?? challenges[0];

  return (
    <section className="section-spacing bg-paper-soft">
      <Container width="max">
        <div className="max-w-xl">
          <h2 className="text-[clamp(32px,3vw,44px)] leading-[1.08] text-ink">
            Every Child Has a Different Challenge.
            <br />
            <span className="text-gold">We Build a Different Solution.</span>
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <ChallengeTabList challenges={challenges} activeId={activeChallenge?.id ?? ''} onSelect={setActiveId} />
          <AnimatePresence mode="wait">
            {activeChallenge ? <ChallengePanel key={activeChallenge.id} challenge={activeChallenge} /> : null}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
