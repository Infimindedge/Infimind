import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { philosophyPromise } from '@/data/philosophy';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function PhilosophyPromise() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-spacing">
      <Container width="content">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-[clamp(28px,2.6vw,38px)] text-ink">{philosophyPromise.headline}</h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">{philosophyPromise.body1}</p>
          <p className="mt-3 text-base font-semibold leading-relaxed text-gold-dark">{philosophyPromise.body2}</p>
        </motion.div>
      </Container>
    </section>
  );
}
