import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function CTA() {
  return (
    <section
      id="cta"
      className="py-16 sm:py-24 bg-[#edf1f8] relative overflow-hidden"
      aria-label="Call to action"
    >
      {/* ── Random Ambient Mesh Gradients ── */}
      <div
        className="absolute top-0 right-10 w-[550px] h-[350px] pointer-events-none z-0 opacity-60"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(255, 185, 130, 0.45) 0%, rgba(250, 100, 160, 0.25) 40%, transparent 70%)',
          filter: 'blur(65px)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-10 w-[550px] h-[350px] pointer-events-none z-0 opacity-50"
        style={{
          background: 'radial-gradient(ellipse at 20% 80%, rgba(140, 110, 255, 0.35) 0%, rgba(90, 145, 255, 0.20) 45%, transparent 70%)',
          filter: 'blur(65px)',
        }}
        aria-hidden="true"
      />

      {/* ── Main Container ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="relative bg-white/90 backdrop-blur-md border border-black/[0.08] rounded-3xl sm:rounded-[32px] p-8 sm:p-12 lg:p-14 shadow-[0_12px_44px_rgba(0,0,0,0.04)] overflow-hidden"
        >
          {/* Subtle noise grain inside the card */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8 sm:gap-10">
            {/* Left Headline */}
            <div className="max-w-xl text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-[-0.03em] text-[#111317] leading-[1.2] mb-3">
                Ready to build something unforgettable?
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Partner with MAZTAA to design and develop a high-converting digital experience tailored for your brand.
              </p>
            </div>

            {/* Right Action Button (Matching Reference Image) */}
            <div className="flex-shrink-0 flex items-center justify-start md:justify-end">
              <a
                href="#pricing"
                className="inline-flex items-center gap-3 bg-[#111317] hover:bg-black text-white font-heading font-semibold text-sm sm:text-base pl-6 pr-2.5 py-2.5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 group"
              >
                <span>Start a project</span>
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#111317] group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight size={15} strokeWidth={2.5} />
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
