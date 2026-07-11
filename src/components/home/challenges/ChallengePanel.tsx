import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { ChallengeItem } from '@/types/content';
import { Photo } from '@/components/ui/Photo';

interface ChallengePanelProps {
  challenge: ChallengeItem;
}

export function ChallengePanel({ challenge }: ChallengePanelProps) {
  const reduceMotion = useReducedMotion();
  const hasContent = Boolean(challenge.challengeDescription) || challenge.approach.length > 0;

  return (
    <motion.div
      key={challenge.id}
      role="tabpanel"
      id={`challenge-panel-${challenge.id}`}
      aria-labelledby={`challenge-tab-${challenge.id}`}
      tabIndex={0}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="min-h-[340px] rounded-container border border-border bg-paper-pure p-6 sm:p-8"
    >
      {!hasContent ? (
        <div className="flex min-h-[280px] flex-col items-center justify-center gap-2 text-center">
          <p className="font-display text-2xl text-ink">{challenge.label}</p>
          <p className="max-w-sm text-sm text-ink-muted">
            Content for this challenge is in progress and will be added soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <p className="eyebrow text-ink-muted">The Challenge</p>
            <h3 className="mt-3 font-display text-[26px] leading-tight text-ink">{challenge.challengeTitle}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{challenge.challengeDescription}</p>
            {challenge.imageFilename ? (
              <div className="mt-5 aspect-[4/3] overflow-hidden rounded-lg">
                <Photo filename={challenge.imageFilename} alt={`${challenge.challengeTitle} illustration`} ratioLabel="4:3" />
              </div>
            ) : null}
          </div>

          <div>
            <p className="eyebrow text-ink-muted">Our Approach</p>
            <ul className="mt-3 flex flex-col gap-3">
              {challenge.approach.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[15px] text-ink-soft">
                  <Check size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-ink-muted">Expected Outcome</p>
            <ul className="mt-3 flex flex-col gap-3">
              {challenge.outcomes.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[15px] text-ink-soft">
                  <Check size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </motion.div>
  );
}
