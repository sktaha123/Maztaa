import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '../../data/siteContent';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

function FAQItem({ item, index, isOpen, onToggle }) {
  return (
    <div className="bg-white border border-black/[0.08] rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-200 hover:border-black/20">
      <button
        onClick={() => onToggle(index)}
        className="w-full flex items-start justify-between gap-4 p-5 sm:p-6 text-left group"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span
          className={[
            'font-heading text-sm sm:text-base font-semibold transition-colors duration-200 leading-snug',
            isOpen ? 'text-black' : 'text-neutral-900 group-hover:text-black',
          ].join(' ')}
        >
          {item.question}
        </span>
        <div
          className="flex-shrink-0 mt-0.5 text-neutral-500 group-hover:text-black transition-colors"
          aria-hidden="true"
        >
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-neutral-600 leading-relaxed border-t border-black/[0.04]">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section
      id="faq"
      className="section-padding bg-[#f4f7fc] border-t border-black/[0.06] relative overflow-hidden"
      aria-label="Frequently asked questions"
    >
      {/* Corner ambient shade */}
      <div
        className="absolute bottom-0 right-0 w-[450px] h-[450px] opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 100% 100%, rgba(200,215,255,0.7) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-[380px_1fr] gap-12 lg:gap-16 items-start">

          {/* Left Column: Heading */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className="lg:sticky lg:top-28"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-[#111317] leading-tight mb-4">
              Frequently asked questions
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed mb-6">
              Got more questions about our process, payment terms, or custom developments?
            </p>
            <a
              href="mailto:CONTACT_EMAIL"
              className="inline-flex items-center text-sm font-medium text-neutral-900 hover:underline"
            >
              Get in touch with us →
            </a>
          </motion.div>

          {/* Right Column: Stacked FAQ Cards */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className="flex flex-col gap-3.5"
          >
            {FAQ_ITEMS.map((item, index) => (
              <FAQItem
                key={index}
                item={item}
                index={index}
                isOpen={openIndex === index}
                onToggle={handleToggle}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
