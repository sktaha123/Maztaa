import { motion } from 'framer-motion';
import { CTA_CONTENT } from '../../data/siteContent';
import Button from '../ui/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function CTA() {
  return (
    <section
      id="cta"
      className="section-padding bg-[#edf1f8] border-t border-black/[0.06] relative overflow-hidden"
      aria-label="Call to action"
    >
      {/* Atmospheric corner ambient shaders */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 110%, rgba(200,215,255,0.8) 0%, rgba(237,241,248,0) 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col items-center gap-6"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-[-0.03em] text-[#111317] leading-[1.12] whitespace-pre-line max-w-2xl"
          >
            {CTA_CONTENT.headline}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-neutral-600 max-w-md leading-relaxed"
          >
            {CTA_CONTENT.subheading}
          </motion.p>

          {/* Signature Micro1 Buttons (Matching Image #2) */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mt-2"
          >
            <Button href={CTA_CONTENT.ctaPrimary.href} id="cta-primary">
              {CTA_CONTENT.ctaPrimary.label}
            </Button>

            <Button href={CTA_CONTENT.ctaSecondary.href} id="cta-secondary" variant="ghost">
              {CTA_CONTENT.ctaSecondary.label}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
