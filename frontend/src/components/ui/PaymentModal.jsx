import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

const PAYMENT_OPTIONS = [
  {
    id: 'full',
    title: 'Full Payment',
    caption: '100% upfront',
    desc: 'Complete payment at once before project kickoff.',
  },
  {
    id: 'milestone',
    title: '40% / 30% / 30% Payment',
    caption: 'Milestone structure',
    desc: '40% deposit, 30% mid-review, 30% on final delivery.',
  },
];

export default function PaymentModal({ plan, onClose }) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(null);

  // Lock body scroll while modal is open & listen for Escape key
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleNext = () => {
    if (!selected) return;
    setStep(2);
  };

  const handleProceed = () => {
    const { WHOP_LINKS } = plan;
    const url = WHOP_LINKS?.[plan.whopKey];
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-sm sm:max-w-md bg-[#edf1f8] border border-black/[0.1] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-black/[0.06] bg-white/70">
          <div>
            <span className="text-[11px] font-heading font-semibold text-neutral-500 uppercase tracking-wider block">
              {plan.name} · {plan.price}
            </span>
            <h2 id="modal-title" className="text-lg font-heading font-semibold text-[#111317] mt-0.5">
              {step === 1 ? 'Select Payment' : 'Complete on Whop'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/[0.05] hover:bg-black/[0.1] flex items-center justify-center text-neutral-600 hover:text-black transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={15} />
          </button>
        </div>

        {/* Step progress line */}
        <div className="grid grid-cols-2 gap-1 px-6 pt-3 pb-1 bg-white/40">
          <div className={`h-1 rounded-full transition-colors duration-300 ${step >= 1 ? 'bg-black' : 'bg-black/10'}`} />
          <div className={`h-1 rounded-full transition-colors duration-300 ${step >= 2 ? 'bg-black' : 'bg-black/10'}`} />
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.16 }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-2.5">
                  {PAYMENT_OPTIONS.map((opt) => {
                    const isSelected = selected === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelected(opt.id)}
                        className={[
                          'w-full text-left rounded-2xl p-4 transition-all duration-150 cursor-pointer border',
                          isSelected
                            ? 'bg-white border-black shadow-sm'
                            : 'bg-white/60 hover:bg-white border-black/[0.08]',
                        ].join(' ')}
                        aria-pressed={isSelected}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-heading font-semibold text-sm text-[#111317]">
                            {opt.title}
                          </span>
                          <div
                            className={[
                              'w-4 h-4 rounded-full border flex items-center justify-center transition-colors',
                              isSelected ? 'border-black bg-black' : 'border-neutral-400 bg-transparent',
                            ].join(' ')}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </div>
                        <p className="text-xs text-neutral-500 font-normal leading-relaxed">
                          {opt.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!selected}
                  className={[
                    'w-full flex items-center justify-center gap-2 py-3 rounded-xl font-heading font-semibold text-sm transition-all duration-200 mt-1',
                    selected
                      ? 'bg-black text-white hover:bg-neutral-800 shadow-sm cursor-pointer'
                      : 'bg-black/[0.08] text-neutral-400 cursor-not-allowed',
                  ].join(' ')}
                >
                  <span>Next</span>
                  <ArrowRight size={14} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.16 }}
                className="flex flex-col gap-5"
              >
                <div className="bg-white rounded-2xl p-5 border border-black/[0.08] flex flex-col gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
                    <span className="text-xs text-neutral-500 font-medium">Selected Plan</span>
                    <span className="font-heading font-semibold text-xs text-[#111317]">
                      {plan.name} ({PAYMENT_OPTIONS.find((o) => o.id === selected)?.title})
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    All next procedures, secure checkout, and project agreements will be handled directly on our{' '}
                    <strong className="text-[#111317] font-semibold">whop.com</strong> storefront.
                  </p>

                  <div className="flex items-center justify-center pt-2">
                    <span className="font-heading font-bold text-2xl tracking-tighter text-[#111317] select-none">
                      whop<span className="text-neutral-400">.</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleProceed}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-black text-white font-heading font-semibold text-sm hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
                  >
                    <span>Continue to Whop</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-neutral-500 hover:text-black transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={12} />
                    <span>Back to payment options</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
