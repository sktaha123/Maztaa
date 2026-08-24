import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HERO_CONTENT } from '../../data/siteContent';
import Button from '../ui/Button';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Hero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.65]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-between overflow-hidden px-5 sm:px-8 lg:px-14 pb-16 sm:pb-24 pt-6 bg-[#edf1f8]"
      aria-label="MAZTAA hero"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none ambient-glow-mesh" aria-hidden="true" />

      {/* Hero Alpine Mountain Background Image */}
      <motion.div
        style={{ opacity: imageOpacity, scale: imageScale }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
        />

        {/* Very Light Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(237,241,248,0.08) 0%, rgba(237,241,248,0.02) 50%, rgba(237,241,248,0.15) 100%)',
          }}
        />

        {/* Center Glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 35% 55%, rgba(255,255,255,0.15) 0%, rgba(237,241,248,0.04) 70%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* ────────────────────────────────────────────────────────────
          MAIN HERO HEADLINE & CTA (Matching Image 1 & 2: Left-aligned bold text)
          ──────────────────────────────────────────────────────────── */}
      <motion.div
        style={{ y }}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-2xl w-full my-auto pt-28 sm:pt-36 text-left"
      >
        {/* Large Bold Left-Aligned Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-heading font-semibold leading-[1.08] tracking-[-0.035em] text-[#111317] mb-6 max-w-xl text-left"
        >
          {HERO_CONTENT.headlineLine1}{' '}
          <span className="block text-[#111317]">
            {HERO_CONTENT.headlineLine2}
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-neutral-800 leading-relaxed mb-8 max-w-md font-normal text-left"
        >
          {HERO_CONTENT.subheading}
        </motion.p>

        {/* Signature Action Button */}
        <motion.div variants={itemVariants} className="flex items-center justify-start">
          <Button
            href={HERO_CONTENT.ctaPrimary.href}
            id="hero-cta-view-work"
          >
            {HERO_CONTENT.ctaPrimary.label}
          </Button>
        </motion.div>
      </motion.div>

      {/* Bottom Mist Fade Transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-36 z-[5] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(237,241,248,0.4) 40%, rgba(237,241,248,0.95) 100%)',
        }}
      />
    </section>
  );
}