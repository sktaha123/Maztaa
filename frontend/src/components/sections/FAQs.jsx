import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(1); // Default open second item like reference image

  const faqItems = [
    {
      id: 1,
      question: "How much does a website cost?",
      answer:
        "Pricing depends on the scope, features, and custom requirements of your project. We provide tailored, transparent proposals to match your budget and goals.",
      hasDots: true,
    },
    {
      id: 2,
      question: "How long does a project take?",
      answer:
        "Timelines vary depending on the size and complexity of the project. A standard business website can typically be completed within a few weeks.",
      hasDots: false,
    },
    {
      id: 3,
      question: "How much does a website cost?",
      answer:
        "We offer tiered packages and custom estimates based on design complexity, functionality, and integrations required for your business.",
      hasDots: false,
    },
    {
      id: 4,
      question: "How much does a website cost?",
      answer:
        "Every project is unique. Contact us today for a free consultation and detailed custom quote for your digital platform.",
      hasDots: true,
    },
    {
      id: 5,
      question: "How much does a website cost?",
      answer:
        "Our competitive pricing covers initial design, modern front-end development, responsive testing, SEO readiness, and initial deployment support.",
      hasDots: false,
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faqs"
      className="relative w-full bg-[#0a0a0a] text-white py-24 sm:py-32 px-6 sm:px-10 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            FAQs
          </h2>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="w-full max-w-3xl flex flex-col space-y-3.5">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-[#121212] border border-neutral-800/90 rounded-xl overflow-hidden transition-colors duration-200 hover:border-neutral-700"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between text-left transition-colors cursor-pointer group"
                >
                  <span className="text-base sm:text-lg font-bold text-white tracking-tight pr-4">
                    {item.question}
                  </span>

                  {/* Icon Indicator (+ / -) */}
                  <div className="flex flex-col items-center justify-center flex-shrink-0 text-neutral-400 group-hover:text-white transition-colors">
                    <span className="text-xl sm:text-2xl font-light leading-none">
                      {isOpen ? "—" : "+"}
                    </span>
                    {item.hasDots && !isOpen && (
                      <span className="text-[10px] tracking-widest leading-none text-neutral-500 font-bold -mt-1 select-none">
                        ...
                      </span>
                    )}
                  </div>
                </button>

                {/* Accordion Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{
                        duration: 0.3,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-neutral-300 text-sm sm:text-base leading-relaxed text-left border-t border-neutral-800/50 pt-4">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
