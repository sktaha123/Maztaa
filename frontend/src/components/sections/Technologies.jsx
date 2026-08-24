import { motion } from 'framer-motion';
import { TECHNOLOGIES } from '../../data/siteContent';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const techTrack = [...TECHNOLOGIES, ...TECHNOLOGIES];

function TechCard({ tech, index }) {
  const isTinted = index % 4 === 1;
  return (
    <div
      className={[
        'flex-shrink-0 group flex flex-col gap-1 px-6 py-4 rounded-xl cursor-default transition-all duration-200 min-w-[210px]',
        isTinted
          ? 'bg-gradient-to-b from-[#e8ecfa] to-[#f4f6fc] border border-[#d3daf2] shadow-[0_2px_10px_rgba(90,110,180,0.06)]'
          : 'bg-white/95 border border-black/[0.07] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-black/20 hover:shadow-md',
      ].join(' ')}
    >
      <span className="font-heading text-sm font-semibold text-neutral-900 tracking-tight">
        {tech.name}
      </span>
      <span className="text-xs text-neutral-500 leading-snug">
        {tech.purpose}
      </span>
    </div>
  );
}

export default function Technologies() {
  return (
    <section className="py-16 lg:py-20 border-y border-black/[0.06] overflow-hidden bg-[#f0f4fa] relative" aria-label="Technologies we use">
      {/* Corner ambient shade */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-60 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 100% 0%, rgba(210,225,255,0.6) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-[#111317]">
              Built with modern, reliable technologies.
            </h2>
          </div>
          <p className="text-neutral-500 text-sm max-w-xs leading-relaxed">
            High performance, rock-solid security, and maintainability for every project.
          </p>
        </motion.div>
      </div>

      {/* Scrolling rail */}
      <div className="relative z-10">
        <div
          className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #f0f4fa, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #f0f4fa, transparent)' }}
        />

        <div className="flex gap-3 animate-scroll-x w-max px-4">
          {techTrack.map((tech, i) => (
            <TechCard key={`${tech.name}-${i}`} tech={tech} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
