import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Photo } from '@/components/ui/Photo';
import { TeamOrbit } from './TeamOrbit';
import { successTeamSeed } from '@/data/seed/successTeam.seed';

export function SuccessTeam() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-spacing">
      <Container width="max">
        <SectionHeading
          title="Behind Every Student Is an Entire Team."
          body="Every learner at Infimind is supported by specialists who work together to ensure academic progress, personal growth, and long-term success."
        />

        <div className="mt-10">
          <TeamOrbit members={successTeamSeed} />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
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
      </Container>
    </section>
  );
}
