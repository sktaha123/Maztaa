import { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { PROCESS_STEPS } from '../../data/siteContent';

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const cardRefs = useRef([]);

  // Track which card is in view on scroll
  useEffect(() => {
    const observers = [];
    cardRefs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(index);
          }
        },
        {
          rootMargin: '-30% 0px -45% 0px',
          threshold: 0.1,
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollToCard = (index) => {
    const el = cardRefs.current[index];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="process"
      className="section-padding bg-[#edf1f8] border-t border-black/[0.06] relative"
      aria-label="How MAZTAA works"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Desktop Layout: Sticky Left Side + Smooth Natural Scrolling Cards on Right */}
        <div className="grid lg:grid-cols-[340px_1fr] gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Pinned / Sticky Steps List */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="text-4xl sm:text-5xl font-heading font-semibold tracking-tight text-[#111317] mb-10">
              How it works
            </h2>

            <nav aria-label="Process steps navigation" className="hidden lg:block">
              <ol className="flex flex-col gap-4">
                {PROCESS_STEPS.map((s, i) => {
                  const isActive = activeStep === i;
                  return (
                    <li key={s.number}>
                      <button
                        onClick={() => scrollToCard(i)}
                        className="flex items-center gap-3.5 text-left transition-colors duration-200 cursor-pointer group py-1"
                        aria-current={isActive ? 'step' : undefined}
                        aria-label={`Step ${s.number}: ${s.title}`}
                      >
                        <span
                          className={[
                            'font-heading text-sm transition-colors duration-200',
                            isActive ? 'text-black font-semibold' : 'text-neutral-400 group-hover:text-neutral-600',
                          ].join(' ')}
                        >
                          {s.number}.
                        </span>
                        <span
                          className={[
                            'text-lg tracking-tight transition-colors duration-200',
                            isActive ? 'text-black font-semibold' : 'text-neutral-400 group-hover:text-neutral-600',
                          ].join(' ')}
                        >
                          {s.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>

          {/* Right Column: Natural Scrolling Cards (Clean Static Rendering, No Jarring Pop-ins) */}
          <div className="flex flex-col gap-10 sm:gap-14">
            {PROCESS_STEPS.map((s, index) => (
              <div
                key={s.number}
                ref={(el) => (cardRefs.current[index] = el)}
                className="bg-white border border-black/[0.09] rounded-2xl p-7 sm:p-10 shadow-[0_8px_32px_rgba(15,23,42,0.05)] transition-all duration-300 hover:border-black/20 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-heading font-semibold text-neutral-400">
                    0{index + 1}.
                  </span>
                  <span className="text-xs text-neutral-500 font-medium">
                    {s.short}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-2xl sm:text-3xl font-heading font-semibold tracking-tight text-[#111317] mb-4">
                  {s.title}
                </h3>

                {/* Card Description */}
                <p className="text-neutral-600 leading-relaxed text-base sm:text-lg mb-8">
                  {s.detail}
                </p>

                {/* Key Deliverables */}
                <div className="pt-6 border-t border-black/[0.06]">
                  <p className="text-xs font-heading font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                    Key Deliverables
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {s.deliverables.map((d) => (
                      <div
                        key={d}
                        className="inline-flex items-center gap-2 bg-[#f4f7fc] border border-black/[0.06] px-3.5 py-1.5 rounded-full text-xs font-medium text-neutral-800"
                      >
                        <Check size={11} className="text-black" strokeWidth={3} />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
