import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { PhilosophyImage } from './PhilosophyImage';
import { beyondCoaching } from '@/data/philosophy';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function BeyondCoaching() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-spacing">
      <Container width="max">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="aspect-[16/10] w-full overflow-hidden rounded-container shadow-soft lg:max-h-[420px]"
          >
            <PhilosophyImage
              filename="beyond-coaching.jpg"
              alt="A quiet library reading room lined with bookshelves and study desks"
              className="object-[50%_46%]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
          >
            <h2 className="text-[clamp(30px,3vw,42px)] text-ink">{beyondCoaching.headline}</h2>
            <p className="mt-4 text-lg font-medium leading-snug text-ink">{beyondCoaching.lead}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{beyondCoaching.body}</p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
