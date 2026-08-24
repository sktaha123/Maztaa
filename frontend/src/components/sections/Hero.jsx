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

  // Subtle content parallax
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 45]
  );

  // Keep the background image highly visible
  // while allowing a subtle fade during scrolling.
  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1, 0.65]
  );

  // Very subtle image movement
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1.05, 1]
  );

  return (
    <section
      id="hero"
      ref={ref}
      className="
        relative
        min-h-[85vh]
        sm:min-h-screen
        flex
        flex-col
        justify-center
        items-center
        text-center
        overflow-hidden
        pt-28
        pb-16
        sm:py-32
        px-5
        sm:px-8
        bg-[#edf1f8]
      "
      aria-label="MAZTAA hero"
    >
      {/* =========================================================
          ATMOSPHERIC BACKGROUND
      ========================================================= */}

      <div
        className="
          absolute
          inset-0
          z-0
          pointer-events-none
          ambient-glow-mesh
        "
        aria-hidden="true"
      />

      {/* =========================================================
          HERO IMAGE
      ========================================================= */}

      <motion.div
        style={{
          opacity: imageOpacity,
          scale: imageScale,
        }}
        className="
          absolute
          inset-0
          z-0
          pointer-events-none
          overflow-hidden
        "
      >
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="
            w-full
            h-full
            object-cover
            object-center
          "
        />

        {/* =====================================================
            VERY LIGHT WHITE OVERLAY

            Kept extremely subtle so the mountain image remains
            clearly visible.
        ===================================================== */}

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(237,241,248,0.06) 0%, rgba(237,241,248,0.02) 50%, rgba(237,241,248,0.10) 100%)',
          }}
        />

        {/* =====================================================
            MINIMAL CENTER GLOW

            Just enough to improve headline readability.
        ===================================================== */}

        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 48%, rgba(255,255,255,0.06) 0%, rgba(237,241,248,0.02) 70%, transparent 100%)',
          }}
        />

        {/* =====================================================
            SUBTLE EDGE VIGNETTE
        ===================================================== */}

        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 55%, rgba(237,241,248,0.08) 100%)',
          }}
        />
      </motion.div>

      {/* =========================================================
          HERO CONTENT
      ========================================================= */}

      <motion.div
        style={{ y }}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="
          relative
          z-10
          max-w-2xl
          mx-auto
          flex
          flex-col
          items-center
        "
      >
        {/* =====================================================
            HEADLINE
        ===================================================== */}

        <motion.h1
          variants={itemVariants}
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-[50px]
            font-heading
            font-semibold
            leading-[1.18]
            tracking-[-0.03em]
            text-[#111317]
            mb-5
            max-w-xl
          "
        >
          {HERO_CONTENT.headlineLine1}{' '}

          <span className="block text-[#111317]">
            {HERO_CONTENT.headlineLine2}
          </span>
        </motion.h1>

        {/* =====================================================
            SUPPORTING COPY
        ===================================================== */}

        <motion.p
          variants={itemVariants}
          className="
            text-base
            sm:text-lg
            text-neutral-700
            leading-relaxed
            mb-9
            max-w-md
            font-normal
          "
        >
          {HERO_CONTENT.subheading}
        </motion.p>

        {/* =====================================================
            CTA
        ===================================================== */}

        <motion.div
          variants={itemVariants}
          className="
            flex
            items-center
            justify-center
          "
        >
          <Button
            href={HERO_CONTENT.ctaPrimary.href}
            id="hero-cta-view-work"
          >
            {HERO_CONTENT.ctaPrimary.label}
          </Button>
        </motion.div>
      </motion.div>

      {/* =========================================================
          BOTTOM SECTION TRANSITION
      ========================================================= */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-24
          z-[5]
          pointer-events-none
        "
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(237,241,248,0.25))',
        }}
      />
    </section>
  );
}