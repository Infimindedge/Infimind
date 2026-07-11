import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { User, ClipboardList, BookOpen, CalendarCheck, TrendingUp, Trophy } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { journeySeed } from '@/data/seed/journey.seed';

const ICONS = [User, ClipboardList, BookOpen, CalendarCheck, TrendingUp, Trophy];

export function LearningJourney() {
  const reduceMotion = useReducedMotion();
  const rowRef = useRef(null);

  return (
    <section className="section-spacing">
      <Container width="max">
        <SectionHeading
          title="The Infimind Learning Journey"
          body="A proven process. A personal experience. A path to success."
        />

        <div ref={rowRef} className="relative mt-16">
          {/* Desktop: horizontal connecting line */}
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-border md:block" aria-hidden="true">
            <motion.div
              initial={{ scaleX: reduceMotion ? 1 : 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
              style={{ transformOrigin: 'left' }}
              className="h-px w-full bg-gold"
            />
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-6 md:gap-4">
            {journeySeed.map((stepItem, index) => {
              const Icon = ICONS[index] ?? User;
              return (
                <div key={stepItem.id} className="relative flex gap-4 md:flex-col md:items-start md:gap-0">
                  {/* Mobile: vertical connecting line */}
                  {index < journeySeed.length - 1 ? (
                    <div className="absolute left-6 top-12 h-full w-px bg-border md:hidden" aria-hidden="true">
                      <motion.div
                        initial={{ scaleY: reduceMotion ? 1 : 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        style={{ transformOrigin: 'top' }}
                        className="h-full w-px bg-gold"
                      />
                    </div>
                  ) : null}

                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border-strong bg-paper-pure text-navy shadow-soft">
                    <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                  </span>

                  <div className="md:mt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gold-dark">
                      {stepItem.step}. {stepItem.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{stepItem.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
