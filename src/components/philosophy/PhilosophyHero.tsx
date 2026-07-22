import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { PhilosophyImage } from './PhilosophyImage';
import { philosophyHero } from '@/data/philosophy';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Mirrors the homepage Hero's full-bleed background-photo treatment: the
 * photo sits absolutely positioned behind/beside the copy at lg+ and fades
 * from transparent into the page background, rather than sitting in a
 * boxed card — "acting like background same as in home page".
 */
export function PhilosophyHero() {
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
    <section className="relative overflow-hidden lg:min-h-[600px]">
      <div className="flex flex-col lg:block">
        <motion.div
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
          className="order-2 mt-10 aspect-[16/9] w-full px-6 sm:px-0 lg:absolute lg:inset-y-0 lg:right-0 lg:left-[32%] lg:order-none lg:m-0 lg:aspect-auto lg:w-auto lg:px-0"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 22%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 22%)',
          }}
        >
          <PhilosophyImage
            filename="philosophy-hero.jpg"
            alt="A student studying at a desk in natural daylight, surrounded by books"
            priority
            className="h-full w-full"
          />
        </motion.div>

        <div className="relative order-1 mx-auto w-full max-w-[1440px] pt-12 pb-16 md:pt-16 md:pb-20 lg:order-none lg:py-24">
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl px-6 md:px-12 lg:pl-[72px]">
            <motion.p variants={item} className="eyebrow text-gold">
              {philosophyHero.eyebrow}
            </motion.p>
            <motion.h1 variants={item} className="mt-4 text-[clamp(40px,5vw,64px)] leading-[1.05] text-ink">
              {philosophyHero.headline}
            </motion.h1>
            <motion.p variants={item} className="mt-3 font-display text-[clamp(18px,1.7vw,24px)] leading-snug text-gold-dark">
              {philosophyHero.subheadline}
            </motion.p>
            <motion.div variants={item} className="mt-6 max-w-lg space-y-4 text-[15px] leading-relaxed text-ink-soft">
              {philosophyHero.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
