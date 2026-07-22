import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { betterSystems } from '@/data/philosophy';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function BetterLearningSystems() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-spacing bg-paper-soft">
      <Container width="max">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-14"
        >
          <h2 className="text-[clamp(30px,3vw,42px)] leading-[1.15]">
            <span className="text-ink">{betterSystems.headlineLine1}</span>
            <br />
            <span className="text-gold">{betterSystems.headlineLine2}</span>
          </h2>

          <div aria-hidden="true" className="hidden h-32 w-px bg-gold-soft lg:block" />

          <div className="space-y-4 text-[15px] leading-relaxed text-ink-soft">
            {betterSystems.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="font-semibold text-gold-dark">{betterSystems.emphasis}</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
