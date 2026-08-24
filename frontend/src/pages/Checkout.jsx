import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, CreditCard, Layers } from 'lucide-react';
import { PRICING_PLANS, WHOP_LINKS } from '../data/siteContent';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import whopLogoImg from '../assets/whop.png';

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

export function Checkout() {
  const [searchParams] = useSearchParams();

  const planId = searchParams.get('plan') || 'starter';
  const plan = PRICING_PLANS.find((p) => p.id === planId) || PRICING_PLANS[0];

  const [step, setStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('milestone');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Configure ${plan.name} Plan — maztaa Studio`;
  }, [planId, plan.name]);

  const handleProceedToWhop = () => {
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

  return (
    <div className="min-h-screen bg-[#edf1f8] text-[#111317] flex flex-col justify-between relative selection:bg-neutral-900 selection:text-white overflow-hidden">
      {/* ── Random Ambient Mesh Gradients (Matching Site Theme) ── */}
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

        {/* Centered Single Payment & Whop Form Card */}
        <div className="bg-white/90 backdrop-blur-md border border-black/[0.08] rounded-3xl p-7 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.03)] flex flex-col gap-6">

          <AnimatePresence mode="wait">
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
                    onClick={() => setStep(2)}
                    disabled={!selectedPayment}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-black text-white font-heading font-semibold text-sm hover:bg-neutral-800 transition-colors shadow-md shadow-black/10 cursor-pointer"
                  >
                    <span>Next: Payment & Kickoff</span>
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <h3 className="text-2xl font-heading font-semibold text-[#111317] mb-1">
                      Complete on Whop
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500">
                      Your agreement and project checkout will be processed securely.
                    </p>
                  </div>

                  {/* Whop Secure Box */}
                  <div className="bg-[#f8fafc] border border-black/[0.08] rounded-2xl p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                      <div className="flex items-center gap-3">
                        <img
                          src={whopLogoImg}
                          alt="Whop"
                          className="h-6 sm:h-7 w-auto object-contain"
                        />
                        <span className="text-[11px] font-heading font-medium text-neutral-500 bg-black/[0.04] border border-black/[0.04] px-2.5 py-0.5 rounded-full">
                          Verified Checkout
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-neutral-800 bg-white border border-black/[0.08] px-3 py-1 rounded-full shadow-xs">
                        {plan.price}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      All project documentation, onboarding kickoff, and payment handling for the{' '}
                      <strong className="text-[#111317]">{plan.name}</strong> plan (
                      {PAYMENT_OPTIONS.find((p) => p.id === selectedPayment)?.title}) will proceed directly on our verified{' '}
                      <strong className="text-[#111317]">Whop.com</strong> storefront.
                    </p>

                    <ul className="flex flex-col gap-2 pt-1">
                      {[
                        'Encrypted global payment gateway (Stripe & Apple Pay supported)',
                        'Instant project agreement and invoice generation',
                        'Direct studio access and kickoff onboarding',
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-xs text-neutral-700">
                          <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                            <Check size={9} className="text-emerald-700" strokeWidth={3} />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={handleProceedToWhop}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-black text-white font-heading font-semibold text-sm hover:bg-neutral-800 transition-colors shadow-md shadow-black/10 cursor-pointer"
                    >
                      <span>Continue to Whop Storefront</span>
                      <ArrowRight size={15} strokeWidth={2.5} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full py-2.5 text-xs font-semibold text-neutral-500 hover:text-black transition-colors cursor-pointer"
                    >
                      ← Change payment structure
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
      </main>

      <Footer />
    </div>
  );
}
