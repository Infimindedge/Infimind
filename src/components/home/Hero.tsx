import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Photo } from '@/components/ui/Photo';

const PARALLAX_RANGE = 8;
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const figureRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 20 });
  const translateX = useTransform(springX, [-1, 1], [-PARALLAX_RANGE, PARALLAX_RANGE]);
  const translateY = useTransform(springY, [-1, 1], [-PARALLAX_RANGE, PARALLAX_RANGE]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== 'mouse' || !figureRef.current) return;
    const rect = figureRef.current.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
  };

  return (
    <section className="pt-12 pb-16 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24">
      <Container width="max">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.p variants={item} className="eyebrow text-gold">
              PRIVATE LEARNING PROGRAMS
            </motion.p>
            <motion.h1
              variants={item}
              className="mt-4 text-[clamp(52px,5.6vw,84px)] leading-[0.96] text-ink"
            >
              Where Exceptional Students Become <span className="text-gold">Extraordinary Thinkers.</span>
            </motion.h1>
            <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-[1.7] text-ink-soft">
              Infimind partners with ambitious families to build strong academic foundations, cultivate intellectual
              confidence, and prepare students for success in school and beyond.
            </motion.p>
            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#consultation"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-btn bg-navy px-6 py-3.5 text-sm font-medium text-on-dark shadow-soft transition-shadow hover:shadow-hover"
              >
                Schedule a Private Consultation
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                href="#programs"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-btn border border-border-strong px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-navy"
              >
                Explore Programs
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            ref={figureRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
            className="overflow-hidden rounded-container"
          >
            <motion.div style={{ x: translateX, y: translateY }} className="aspect-[16/10] w-full">
              <Photo
                filename="hero-student-study.jpg"
                alt="A student studying at a desk in natural daylight, surrounded by books"
                ratioLabel="16:10"
                priority
                className="rounded-container"
              />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
