import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import aboutContent from '@/data/about-content.json';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function AboutHero() {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
  };

  return (
    <section className="section-spacing pt-10 md:pt-14">
      <Container width="content">
        <motion.div variants={container} initial="hidden" animate="show" className="mx-auto max-w-2xl text-center">
          <motion.p variants={item} className="eyebrow text-gold">
            {aboutContent.title}
          </motion.p>
          <motion.h1 variants={item} className="mt-4 text-[clamp(38px,4.6vw,58px)] leading-[1.05] text-ink">
            {aboutContent.hero}
          </motion.h1>
          <motion.p variants={item} className="mt-5 text-[15px] leading-relaxed text-ink-soft">
            {aboutContent.intro}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
