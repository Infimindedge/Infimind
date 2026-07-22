import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { philosophyBeliefs } from '@/data/philosophy';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function PhilosophyBeliefs() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-spacing">
      <Container width="max">
        <SectionHeading
          title="What We Believe"
          align="left"
          maxWidthClassName="max-w-xl"
          body="Five principles shape how we design every learning journey."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {philosophyBeliefs.map((belief, index) => {
            const Icon = belief.icon;
            return (
              <motion.div
                key={belief.title}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: reduceMotion ? 0 : index * 0.08 }}
                whileHover={reduceMotion ? undefined : { y: -6 }}
                className="group flex h-full flex-col items-start rounded-container border border-border bg-paper-pure px-5 py-6 text-left shadow-soft transition-colors hover:border-gold-soft"
              >
                <motion.span
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-soft bg-paper-soft text-gold-dark transition-colors group-hover:bg-gold-soft/40"
                  whileHover={reduceMotion ? undefined : { rotate: -4, scale: 1.04 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                >
                  <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                </motion.span>
                <h3 className="mt-4 text-base font-semibold text-ink">{belief.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{belief.body}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
