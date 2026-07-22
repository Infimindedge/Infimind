import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { learningPhilosophySteps } from '@/data/philosophy';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function LearningPhilosophyTimeline() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-spacing bg-paper-soft">
      <Container width="max">
        <SectionHeading title="The Infimind Learning Philosophy" />

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-[22px] hidden h-px bg-border-strong lg:block"
          >
            <motion.div
              className="h-full origin-left bg-gold"
              initial={{ scaleX: reduceMotion ? 1 : 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: EASE_OUT }}
            />
          </div>

          <ol className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {learningPhilosophySteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.step}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: reduceMotion ? 0 : index * 0.08 }}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  className="group flex flex-col items-center text-center"
                >
                  <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-navy text-sm font-semibold text-on-dark shadow-soft transition-transform duration-300 group-hover:scale-105">
                    {step.step}
                  </span>
                  <span className="mt-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold-soft text-gold-dark transition-colors duration-300 group-hover:border-gold group-hover:bg-paper-pure">
                    <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 max-w-[200px] text-sm leading-relaxed text-ink-soft">{step.body}</p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
