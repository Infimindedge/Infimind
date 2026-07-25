import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Photo } from '@/components/ui/Photo';
import { useConsultationModal } from '@/hooks/useConsultationModal';

const PARALLAX_RANGE = 8;
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { openConsultation } = useConsultationModal();
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
    <section className="relative overflow-hidden lg:min-h-[640px]">
      {/*
        Flex column so `order` can put the photo visually after the text on
        mobile (a plain stacked block) while staying first in the DOM — at
        lg+ the photo becomes an absolutely positioned section background,
        where DOM order instead controls paint order (photo behind, text on
        top). Fades in from its own left edge so the blend sits in the
        visual middle of the section rather than reading as a framed card.
      */}
      <div className="flex flex-col lg:block">
        <motion.div
          ref={figureRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
          className="order-2 mt-10 aspect-[16/9] w-full px-6 sm:px-0 lg:absolute lg:inset-y-0 lg:right-0 lg:left-[32%] lg:order-none lg:m-0 lg:aspect-auto lg:w-auto lg:px-0"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 22%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 22%)',
          }}
        >
          <motion.div style={{ x: translateX, y: translateY }} className="h-full w-full">
            <Photo
              filename="hero-student-study.jpg"
              alt="A student studying at a desk in natural daylight, surrounded by books"
              ratioLabel="16:10"
              priority
            />
          </motion.div>
        </motion.div>

        <div className="relative order-1 mx-auto w-full max-w-[1440px] pt-12 pb-16 md:pt-16 md:pb-20 lg:order-none lg:py-24">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-xl px-6 md:px-12 lg:pl-[72px]"
          >
            <motion.p variants={item} className="eyebrow text-gold">
              PRIVATE LEARNING PROGRAMS
            </motion.p>
            <motion.h1 variants={item} className="mt-4 text-[clamp(52px,5.6vw,84px)] leading-[0.96] text-ink">
              Where Exceptional Students Become <span className="text-gold">Extraordinary Thinkers.</span>
            </motion.h1>
            <motion.p variants={item} className="mt-6 text-lg leading-[1.7] text-ink-soft">
              Infimind partners with ambitious families to build strong academic foundations, cultivate intellectual
              confidence, and prepare students for success in school and beyond.
            </motion.p>
            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={openConsultation}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-btn bg-navy px-6 py-3.5 text-sm font-medium text-on-dark shadow-soft transition-shadow hover:shadow-hover"
              >
                Schedule a Private Consultation
                <ArrowRight size={16} aria-hidden="true" />
              </button>
              <a
                href="#programs"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-btn border border-border-strong bg-paper/80 px-6 py-3.5 text-sm font-medium text-ink backdrop-blur-sm transition-colors hover:border-navy"
              >
                Explore Programmes
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
