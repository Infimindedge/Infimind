import { motion, useReducedMotion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { philosophyQuote } from '@/data/philosophy';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function PhilosophyManifesto() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-spacing pt-0">
      <Container width="max">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="relative overflow-hidden rounded-container border border-border bg-paper-soft px-8 py-14 text-center sm:px-16 sm:py-16"
        >
          <Quote
            size={32}
            strokeWidth={1.5}
            className="mx-auto text-gold-soft"
            aria-hidden="true"
          />
          <p className="mx-auto mt-4 max-w-3xl font-display text-[clamp(22px,2.6vw,34px)] leading-[1.35] text-ink">
            {philosophyQuote}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
