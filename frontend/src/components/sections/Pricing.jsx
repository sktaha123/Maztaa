import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PRICING_PLANS } from '../../data/siteContent';
import PricingCard from './PricingCard';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function Pricing() {
  const [mobileIndex, setMobileIndex] = useState(1); // Default to popular plan on mobile

  const nextSlide = () => {
    setMobileIndex((prev) => (prev + 1) % PRICING_PLANS.length);
  };

  const prevSlide = () => {
    setMobileIndex((prev) => (prev - 1 + PRICING_PLANS.length) % PRICING_PLANS.length);
  };

  return (
    <section
      id="pricing"
      className="section-padding bg-[#edf1f8] relative overflow-hidden"
      aria-label="MAZTAA pricing"
    >
      {/* Grandparent Section Colored Linear Spectrum Gradient Borders */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] z-20"
        style={{
          background: 'linear-gradient(90deg, rgba(215,222,235,0.4) 0%, rgba(255,175,130,0.85) 25%, rgba(250,70,110,0.9) 50%, rgba(140,75,245,0.95) 75%, rgba(90,135,255,0.8) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-20"
        style={{
          background: 'linear-gradient(90deg, rgba(90,135,255,0.8) 0%, rgba(140,75,245,0.95) 25%, rgba(250,70,110,0.9) 50%, rgba(255,175,130,0.85) 75%, rgba(215,222,235,0.4) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle Ambient Background Wash */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(200,215,255,0.6) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-[#111317] mb-3">
            Choose your starting point
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Transparent pricing with 40% / 30% / 30% milestone payments.
          </p>
        </motion.div>

        {/* ────────────────────────────────────────────────────────────
            1. DESKTOP & TABLET VIEW: Strict 100% Equal-Width 4-Column Grid
            ──────────────────────────────────────────────────────────── */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch w-full">
          {PRICING_PLANS.map((plan, i) => (
            <div key={plan.id} className="w-full flex">
              <PricingCard plan={plan} index={i} />
            </div>
          ))}
        </div>

        {/* ────────────────────────────────────────────────────────────
            2. MOBILE VIEW (< md): Equal-Width Slide / Swipe Carousel
            ──────────────────────────────────────────────────────────── */}
        <div className="md:hidden flex flex-col gap-5 max-w-md mx-auto w-full">
          {/* Mobile Navigation Controls */}
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-semibold text-neutral-500">
              Plan {mobileIndex + 1} of {PRICING_PLANS.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-9 h-9 rounded-xl bg-white border border-black/[0.08] flex items-center justify-center text-neutral-700 shadow-xs active:bg-neutral-100"
                aria-label="Previous plan"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextSlide}
                className="w-9 h-9 rounded-xl bg-white border border-black/[0.08] flex items-center justify-center text-neutral-700 shadow-xs active:bg-neutral-100"
                aria-label="Next plan"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Current Mobile Slide Card (Full width of container) */}
          <div className="relative overflow-hidden w-full">
            <motion.div
              key={mobileIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <PricingCard plan={PRICING_PLANS[mobileIndex]} index={0} />
            </motion.div>
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {PRICING_PLANS.map((plan, i) => (
              <button
                key={plan.id}
                onClick={() => setMobileIndex(i)}
                className={[
                  'h-1.5 rounded-full transition-all duration-200 cursor-pointer',
                  mobileIndex === i ? 'w-6 bg-black' : 'w-1.5 bg-black/20',
                ].join(' ')}
                aria-label={`Go to ${plan.name} plan`}
              />
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-12 text-xs text-neutral-500 text-center">
          Have custom requirements or need an enterprise system? Contact us for a personalized quote.
        </p>

      </div>
    </section>
  );
}
