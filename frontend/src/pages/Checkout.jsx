import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, CreditCard, Layers, ExternalLink } from 'lucide-react';
import { WhopElements, Checkout as WhopCheckout, CheckoutElement } from '@whop/elements-react';
import { loadWhop } from '@whop/elements';
import { PRICING_PLANS, WHOP_LINKS, WHOP_PLAN_IDS } from '../data/siteContent';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import whopLogoImg from '../assets/whop.png';

// Lazy-init the Whop loader once per page lifecycle
const whopElements = loadWhop();

const PAYMENT_OPTIONS = [
  {
    id: 'full',
    icon: CreditCard,
    title: 'Full Payment',
    badge: '100% Upfront',
    desc: 'Pay the full project amount at once before kickoff. Best for rapid delivery without milestone review pauses.',
  },
  {
    id: 'milestone',
    icon: Layers,
    title: '40% / 30% / 30% Payment',
    badge: 'Milestones',
    desc: '40% deposit to start, 30% upon design & development review, and 30% upon final delivery & launch.',
  },
];

// Appearance tokens to match the maztaa site aesthetic inside the iframe
const WHOP_APPEARANCE = {
  classes: {
    'whop-Checkout': {
      fontFamily: "'Inter', system-ui, sans-serif",
      background: 'transparent',
    },
    'whop-CheckoutPayButton': {
      background: '#111317',
      borderRadius: '12px',
      fontWeight: '600',
      fontSize: '0.875rem',
      padding: '14px 0',
    },
    'whop-CardFieldInput': {
      borderRadius: '10px',
      borderColor: 'rgba(0,0,0,0.10)',
    },
    'whop-CardFieldInputFocused': {
      borderColor: '#111317',
      boxShadow: '0 0 0 2px rgba(17,19,23,0.12)',
    },
    'whop-EmailInput': {
      borderRadius: '10px',
      borderColor: 'rgba(0,0,0,0.10)',
    },
    'whop-CheckoutPromoInput': {
      borderRadius: '10px',
    },
  },
};

export function Checkout() {
  const [searchParams] = useSearchParams();

  const planId = searchParams.get('plan') || 'starter';
  const plan = PRICING_PLANS.find((p) => p.id === planId) || PRICING_PLANS[0];

  const [step, setStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('milestone');
  const [checkoutKey, setCheckoutKey] = useState(0); // bump to remount CheckoutElement

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Configure ${plan.name} Plan — maztaa Studio`;
  }, [planId, plan.name]);

  // Derive the Whop plan_XXX id for the chosen plan + payment type
  const planIds = WHOP_PLAN_IDS?.[plan.whopKey] || WHOP_PLAN_IDS?.starter;
  const whopPlanId = selectedPayment === 'full' ? planIds?.full : planIds?.milestone;

  // Fallback: if this plan still has a placeholder id, open the old Whop link in a new tab
  const handleFallbackRedirect = () => {
    const planLinks = WHOP_LINKS?.[plan.whopKey] || WHOP_LINKS?.starter;
    const targetUrl =
      typeof planLinks === 'object' && planLinks !== null
        ? selectedPayment === 'full'
          ? planLinks.full || planLinks.milestone
          : planLinks.milestone || planLinks.full
        : planLinks;
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleGoToStep2 = () => {
    // Bump key to guarantee a fresh CheckoutElement whenever user returns to step 1 & re-selects
    setCheckoutKey((k) => k + 1);
    setStep(2);
  };

  const handleBackToStep1 = () => {
    setStep(1);
  };

  const isEmbedSupported = Boolean(whopPlanId);

  return (
    <div className="min-h-screen bg-[#edf1f8] text-[#111317] flex flex-col justify-between relative selection:bg-neutral-900 selection:text-white overflow-hidden">
      {/* ── Ambient Mesh Gradients ── */}
      <div
        className="absolute top-0 right-10 w-[550px] h-[400px] pointer-events-none z-0 opacity-60"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(255, 185, 130, 0.45) 0%, rgba(250, 100, 160, 0.25) 40%, transparent 70%)',
          filter: 'blur(65px)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 left-10 w-[550px] h-[400px] pointer-events-none z-0 opacity-50"
        style={{
          background: 'radial-gradient(ellipse at 20% 80%, rgba(140, 110, 255, 0.35) 0%, rgba(90, 145, 255, 0.20) 45%, transparent 70%)',
          filter: 'blur(65px)',
        }}
        aria-hidden="true"
      />
      <div className="grain-overlay" aria-hidden="true" />

      <Navbar />

      <main className="relative z-10 flex-1 max-w-2xl mx-auto w-full px-5 sm:px-8 pt-32 pb-24">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/#pricing"
            className="inline-flex items-center gap-2 text-xs font-heading font-semibold text-neutral-500 hover:text-black transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Pricing</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-8 text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-[#111317]">
            Configure your {plan.name} plan
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-md border border-black/[0.08] rounded-3xl p-7 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.03)] flex flex-col gap-6">

          <AnimatePresence mode="wait">

            {/* ── STEP 1: Pick payment structure ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.18 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <h3 className="text-2xl font-heading font-semibold text-[#111317] mb-1">
                    Select Payment Option
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    Choose how you'd like to structure payment for the {plan.name} plan.
                  </p>
                </div>

                {/* Payment Options Grid */}
                <div className="flex flex-col gap-3.5">
                  {PAYMENT_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = selectedPayment === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedPayment(opt.id)}
                        className={[
                          'w-full text-left rounded-2xl p-5 border-2 transition-all duration-200 cursor-pointer relative',
                          isSelected
                            ? 'bg-white border-black shadow-sm'
                            : 'bg-[#f8fafc] hover:bg-white border-black/[0.06]',
                        ].join(' ')}
                      >
                        {/* Badge */}
                        <span
                          className={[
                            'absolute top-4 right-4 text-[10px] font-heading font-semibold px-2.5 py-0.5 rounded-full',
                            isSelected ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-600',
                          ].join(' ')}
                        >
                          {opt.badge}
                        </span>

                        <div className="flex items-start gap-3.5 pr-16">
                          <div
                            className={[
                              'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors',
                              isSelected ? 'border-black' : 'border-neutral-300',
                            ].join(' ')}
                          >
                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Icon size={15} className="text-neutral-700" />
                              <span className="font-heading font-semibold text-sm sm:text-base text-[#111317]">
                                {opt.title}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-500 leading-relaxed">
                              {opt.desc}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Next Step Button */}
                <button
                  type="button"
                  onClick={handleGoToStep2}
                  disabled={!selectedPayment}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-black text-white font-heading font-semibold text-sm hover:bg-neutral-800 transition-colors shadow-md shadow-black/10 cursor-pointer"
                >
                  <span>Next: Payment & Kickoff</span>
                  <ArrowRight size={15} strokeWidth={2.5} />
                </button>
              </motion.div>
            )}

            {/* ── STEP 2: Embedded Whop checkout (or fallback) ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.18 }}
                className="flex flex-col gap-6"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
                  <div className="flex items-center gap-3">
                    <img
                      src={whopLogoImg}
                      alt="Whop"
                      className="h-6 sm:h-7 w-auto object-contain"
                    />
                    <span className="text-[11px] font-heading font-medium text-neutral-500 bg-black/[0.04] border border-black/[0.04] px-2.5 py-0.5 rounded-full">
                      Secure Checkout
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-neutral-800 bg-white border border-black/[0.08] px-3 py-1 rounded-full shadow-xs">
                      {plan.price}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-medium">
                      {selectedPayment === 'milestone' ? '40% now' : 'full'}
                    </span>
                  </div>
                </div>

                {/* Trust badges */}
                <ul className="flex flex-wrap gap-x-4 gap-y-2">
                  {[
                    'Encrypted global payment gateway',
                    'Apple Pay & Google Pay supported',
                    'Instant invoice & project agreement',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-1.5 text-xs text-neutral-500">
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <Check size={8} className="text-emerald-700" strokeWidth={3} />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* ── Embedded checkout (or fallback CTA) ── */}
                {isEmbedSupported ? (
                  <div className="rounded-2xl overflow-hidden -mx-1">
                    <WhopElements
                      elements={whopElements}
                      appearance={WHOP_APPEARANCE}
                    >
                      <WhopCheckout
                        key={checkoutKey}
                        plan={whopPlanId}
                      >
                        <CheckoutElement />
                      </WhopCheckout>
                    </WhopElements>
                  </div>
                ) : (
                  /* Fallback for plans with placeholder IDs */
                  <div className="flex flex-col gap-4">
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800 leading-relaxed">
                      Online checkout coming soon for this plan. Click below to complete your purchase on our Whop storefront.
                    </div>
                    <button
                      type="button"
                      onClick={handleFallbackRedirect}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-black text-white font-heading font-semibold text-sm hover:bg-neutral-800 transition-colors shadow-md shadow-black/10 cursor-pointer"
                    >
                      <span>Continue to Whop Storefront</span>
                      <ExternalLink size={14} strokeWidth={2.5} />
                    </button>
                  </div>
                )}

                {/* Back button */}
                <button
                  type="button"
                  onClick={handleBackToStep1}
                  className="w-full py-2.5 text-xs font-semibold text-neutral-500 hover:text-black transition-colors cursor-pointer"
                >
                  ← Change payment structure
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
