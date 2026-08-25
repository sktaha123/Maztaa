import { motion } from 'framer-motion';
import { PRICING_PLANS } from '../../data/siteContent';
import PricingCard from './PricingCard';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="section-padding bg-[#edf1f8] relative overflow-hidden"
      aria-label="MAZTAA pricing"
    >
      {/* ── Decorative borders (in their own overflow-hidden wrapper) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Top spectrum border */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, rgba(215,222,235,0.4) 0%, rgba(255,175,130,0.85) 25%, rgba(250,70,110,0.9) 50%, rgba(140,75,245,0.95) 75%, rgba(90,135,255,0.8) 100%)',
          }}
        />
        {/* Bottom spectrum border */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, rgba(90,135,255,0.8) 0%, rgba(140,75,245,0.95) 25%, rgba(250,70,110,0.9) 50%, rgba(255,175,130,0.85) 75%, rgba(215,222,235,0.4) 100%)',
          }}
        />
        {/* Ambient glow */}
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(200,215,255,0.6) 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="text-center max-w-2xl mx-auto px-4 sm:px-8 mb-12 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-[#111317] mb-3">
            Choose your starting point
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Transparent pricing with 40% / 30% / 30% milestone payments.
          </p>
        </motion.div>

        {/* ── DESKTOP (md+): Centered flex-wrap — auto-centers any plan count ── */}
        <div className="hidden md:flex md:flex-wrap md:justify-center gap-5 lg:gap-4 px-4 sm:px-6 lg:px-8">
          {PRICING_PLANS.map((plan, i) => (
            <div
              key={plan.id}
              className="flex w-full sm:w-[calc(50%-10px)] lg:w-[calc(25%-12px)] min-w-[240px] max-w-[300px]"
            >
              <PricingCard plan={plan} index={i} />
            </div>
          ))}
        </div>

        {/* ── MOBILE (< md): Native swipe / horizontal scroll ── */}
        <div className="md:hidden w-full max-w-full overflow-hidden">
          {/* Scroll track — pt-6 to allow badge overflow above card */}
          <div
            className="flex gap-4 overflow-x-auto px-4 pt-6 pb-4 snap-x snap-mandatory w-full"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              scrollPaddingLeft: '1rem',
            }}
          >
            {PRICING_PLANS.map((plan, i) => (
              <div
                key={plan.id}
                className="flex-shrink-0 snap-center w-[85vw] max-w-[340px]"
              >
                <PricingCard plan={plan} index={i} />
              </div>
            ))}
            <div className="flex-shrink-0 w-2" aria-hidden="true" />
          </div>

          {/* Static indicator dots */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {PRICING_PLANS.map((plan) => (
              <div key={plan.id} className="w-1.5 h-1.5 rounded-full bg-black/20" />
            ))}
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-xs lg:text-sm text-neutral-500 text-center px-4">
          Have custom requirements? Contact us for a personalized quote.
        </p>

      </div>
    </section>
  );
}
