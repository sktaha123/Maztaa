import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HERO_CONTENT } from '../../data/siteContent';
import Button from '../ui/Button';

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [0.95, 0.3]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[85vh] sm:min-h-screen flex flex-col justify-center items-center text-center overflow-hidden pt-28 pb-16 sm:py-32 px-5 sm:px-8 bg-[#edf1f8]"
      aria-label="MAZTAA hero"
    >
      {/* Atmospheric Corner Ambient Shading */}
      <div className="absolute inset-0 z-0 pointer-events-none ambient-glow-mesh" aria-hidden="true" />

      {/* Misty Alpine Mountain Landscape Layer (Increased Visibility with reduced overlay) */}
      <motion.div
        style={{ opacity: imageOpacity }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <img
          src="/images/hero-bg.jpg"
          alt="Ethereal landscape background"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Soft subtle gradient blend letting scenery show through */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(237,241,248,0.55) 0%, rgba(240,244,251,0.2) 40%, rgba(237,241,248,0.7) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 48%, rgba(255,255,255,0.4) 0%, rgba(237,241,248,0.15) 70%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        style={{ y }}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-2xl mx-auto flex flex-col items-center"
      >
        {/* Refined, Proportional Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-heading font-semibold leading-[1.18] tracking-[-0.03em] text-[#111317] mb-5 max-w-xl"
        >
          {HERO_CONTENT.headlineLine1}{' '}
          <span className="block text-[#111317]">{HERO_CONTENT.headlineLine2}</span>
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-neutral-700 leading-relaxed mb-9 max-w-md font-normal"
        >
          {HERO_CONTENT.subheading}
        </motion.p>

        {/* Single Clean Action Button (View Our Work) */}
        <motion.div variants={itemVariants} className="flex items-center justify-center">
          <Button href={HERO_CONTENT.ctaPrimary.href} id="hero-cta-view-work">
            {HERO_CONTENT.ctaPrimary.label}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
