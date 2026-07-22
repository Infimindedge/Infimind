import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PhilosophyImage } from './PhilosophyImage';
import { researchDriven } from '@/data/philosophy';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ResearchDriven() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-spacing bg-paper-soft">
      <Container width="max">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_0.75fr_1.05fr] lg:items-center lg:gap-12"
        >
          <div>
            <h2 className="text-[clamp(28px,2.8vw,38px)] text-ink">{researchDriven.headline}</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{researchDriven.body}</p>
          </div>

          <ul className="space-y-3">
            {researchDriven.points.map((point, index) => (
              <motion.li
                key={point}
                initial={{ opacity: 0, x: reduceMotion ? 0 : -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.42, ease: EASE_OUT, delay: reduceMotion ? 0 : index * 0.06 }}
                className="group flex items-center gap-3 text-sm font-medium text-ink"
              >
                <CheckCircle2
                  size={17}
                  className="shrink-0 text-gold-dark transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </motion.li>
            ))}
          </ul>

          <div className="aspect-[5/4] w-full overflow-hidden rounded-container shadow-soft lg:max-h-[360px] lg:justify-self-end">
            <PhilosophyImage
              filename="research-driven.jpg"
              alt="A mentor guiding a student through their notes in a lecture hall"
              className="object-[58%_42%]"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
