import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Photo } from '@/components/ui/Photo';
import { successTeamSeed } from '@/data/seed/successTeam.seed';

export function SuccessTeam() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-spacing">
      <Container width="max">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:items-start lg:gap-8">
          <div>
            <h2 className="text-[clamp(30px,2.6vw,38px)] leading-[1.1] text-ink">
              Behind Every Student Is an Entire Team.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              Every learner at Infimind is supported by specialists who work together to ensure academic progress,
              personal growth, and long-term success.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {successTeamSeed.map((member, index) => (
              <motion.div
                key={member.id}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
                className="group overflow-hidden rounded-container border border-border bg-paper-pure shadow-soft transition-all duration-300 hover:-translate-y-[3px] hover:border-gold-soft hover:shadow-hover"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Photo filename={member.imageFilename} alt={member.role} ratioLabel="4:3" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg text-ink">{member.role}</h3>
                  <ul className="mt-3 flex flex-col gap-2">
                    {member.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-ink-soft">
                        <Check size={15} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
