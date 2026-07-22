import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { BlogImage } from './BlogImage';
import type { BlogSettings } from '@/types/blog';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Mirrors the homepage/Philosophy hero's full-bleed background-photo
 * treatment: the photo sits absolutely positioned behind/beside the copy at
 * lg+ and fades from transparent into the page background, rather than
 * sitting in a boxed card.
 */
export function BlogHero({ settings }: { settings: BlogSettings }) {
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
          <BlogImage
            src={settings.heroImageFilename}
            alt="A stack of books on learning science, educational psychology and cognitive development, beside a cup and a plant"
            priority
            className="h-full w-full"
          />
        </motion.div>

        <div className="relative order-1 mx-auto w-full max-w-[1440px] pt-12 pb-16 md:pt-16 md:pb-20 lg:order-none lg:py-24">
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl px-6 md:px-12 lg:pl-[72px]">
            <motion.p variants={item} className="eyebrow text-gold">
              {settings.heroEyebrow}
            </motion.p>
            <motion.h1 variants={item} className="mt-4 text-[clamp(38px,4.6vw,58px)] leading-[1.05] text-ink">
              {settings.heroTitle}
            </motion.h1>
            <motion.p variants={item} className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink-soft">
              {settings.heroDescription}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
