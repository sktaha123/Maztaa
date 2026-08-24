import { motion } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';
import { WHOP_LINKS } from '../../data/siteContent';
import Button from '../ui/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function PricingCard({ plan, index }) {
  const handleCheckout = () => {
    const url = WHOP_LINKS[plan.whopKey];
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const themeGradient = plan.theme?.gradient || 'from-[#edf1f8] to-[#ffffff]';
  const themeBorder = plan.theme?.border || 'border-black/[0.08]';

  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      variants={fadeUp}
      transition={{ delay: index * 0.08 }}
      className={[
        'relative flex flex-col justify-between w-full h-full border rounded-3xl transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)] hover:border-black/25',
        `bg-gradient-to-b ${themeGradient}`,
        themeBorder,
      ].join(' ')}
      aria-label={`${plan.name} plan — ${plan.price}`}
    >
      {/* Most Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-heading font-semibold text-white bg-black px-4 py-1 rounded-full shadow-md">
            <Sparkles size={11} className="text-[#a5b4fc]" />
            <span>Most Popular</span>
          </div>
        </div>
      )}

      <div className="p-6 sm:p-8 flex flex-col justify-between gap-6 flex-1">
        
        {/* Plan Header */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-heading font-semibold text-neutral-500 uppercase tracking-wider">
              {plan.name}
            </span>
          </div>

          <div className="flex items-baseline gap-1 mb-2.5">
            <span className="text-3xl sm:text-4xl font-heading font-semibold tracking-tight text-[#111317]">
              {plan.price}
            </span>
            <span className="text-xs text-neutral-500 font-medium">/ project</span>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed min-h-[38px]">
            {plan.description}
          </p>
        </div>

        <div className="w-full h-px bg-black/[0.06]" aria-hidden="true" />

        {/* Feature List */}
        <div className="flex-1 flex flex-col gap-3">
          <span className="text-[11px] font-heading font-semibold text-neutral-400 uppercase tracking-wider">
            Included Scope
          </span>
          <ul className="flex flex-col gap-2.5" aria-label={`${plan.name} features`}>
            {plan.features.map((feature) => (
              <li key={feature.label} className="flex items-start gap-2.5">
                {feature.included ? (
                  <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={9} className="text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full bg-black/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X size={9} className="text-neutral-400" strokeWidth={2} />
                  </div>
                )}
                <span
                  className={[
                    'text-xs sm:text-[13px] leading-snug',
                    feature.included ? 'text-neutral-800 font-medium' : 'text-neutral-400',
                  ].join(' ')}
                >
                  {feature.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full h-px bg-black/[0.06]" aria-hidden="true" />

        {/* Milestone Payment Structure */}
        <div className="bg-white/95 rounded-2xl p-4 border border-black/[0.05] shadow-xs">
          <span className="text-[11px] font-heading font-semibold text-neutral-400 uppercase tracking-wider block mb-2.5">
            40% / 30% / 30% Milestones
          </span>
          <div className="flex flex-col gap-1.5">
            {plan.milestones.map((m) => (
              <div key={m.label} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-neutral-900 w-8">{m.percent}</span>
                  <span className="text-neutral-600">{m.label}</span>
                </div>
                <span className="text-neutral-500 font-medium">{m.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Choose Plan Working Button */}
        <Button
          onClick={handleCheckout}
          id={`pricing-cta-${plan.id}`}
          className="w-full justify-between shadow-sm"
        >
          Choose Plan
        </Button>
      </div>
    </motion.article>
  );
}
