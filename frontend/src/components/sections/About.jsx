import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { ABOUT_CONTENT } from '../../data/siteContent';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
  return (
    <section
      id="about"
      className="section-padding bg-[#edf1f8] relative overflow-hidden border-t border-black/[0.06]"
      aria-label="About maztaa"
    >
      {/* Ambient corner glow — top-right warm */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[320px] pointer-events-none z-0 opacity-70"
        style={{ background: 'radial-gradient(ellipse at 90% 10%, rgba(255,185,140,0.40) 0%, rgba(200,170,255,0.20) 50%, transparent 70%)', filter: 'blur(50px)' }}
        aria-hidden="true"
      />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="flex flex-col items-center gap-6"
        >
          {/* Main Short Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-semibold tracking-[-0.03em] text-[#111317] leading-[1.18] max-w-2xl">
            {ABOUT_CONTENT.statement}
          </h2>

          {/* Short Description */}
          <p className="text-neutral-600 leading-relaxed text-base sm:text-lg max-w-xl">
            {ABOUT_CONTENT.description}
          </p>

          {/* Ticks Features Checklist */}
          <div className="w-full max-w-2xl mt-4 pt-6 border-t border-black/[0.06]">
            <ul className="grid sm:grid-cols-2 gap-3 text-left">
              {ABOUT_CONTENT.capabilities.map((cap) => (
                <li
                  key={cap}
                  className="flex items-center gap-2.5 text-sm sm:text-base text-neutral-800 font-medium bg-white/80 border border-black/[0.06] px-4 py-2.5 rounded-xl shadow-xs"
                >
                  <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                    <Check size={10} className="text-white" strokeWidth={3} />
                  </div>
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
