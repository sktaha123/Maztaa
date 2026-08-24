import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

// Clean SVG Logos for modern web technologies
const Logos = {
  React: () => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" width="22" height="22">
      <circle cx="0" cy="0" r="2.05" fill="#00D8FF" />
      <g stroke="#00D8FF" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  Nextjs: () => (
    <svg viewBox="0 0 180 180" width="22" height="22" fill="none">
      <circle cx="90" cy="90" r="90" fill="#000000" />
      <path
        d="M149.508 157.52L69.142 54H54V125.97H66.2136V69.3837L139.999 164.845C143.333 162.614 146.509 160.167 149.508 157.52Z"
        fill="url(#next_paint0)"
      />
      <rect x="115" y="54" width="12" height="72" fill="url(#next_paint1)" />
      <defs>
        <linearGradient id="next_paint0" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="next_paint1" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),
  TypeScript: () => (
    <svg viewBox="0 0 128 128" width="22" height="22">
      <rect width="128" height="128" rx="18" fill="#3178C6" />
      <path
        fill="#FFFFFF"
        d="M26.8 55h41.4v10.5H53.4v42.5H41.6V65.5H26.8V55zm46.5 28.2c0-8.6 6.8-13.8 17.5-13.8 5.6 0 10.6 1.4 14.3 3.8l-3.6 9c-3.1-1.9-6.9-3-10.7-3-4.9 0-7.7 2.1-7.7 5.1 0 3.2 2.7 4.8 9.5 6.9 10.6 3.3 14.6 7.6 14.6 14.7 0 9-7.2 14.3-18.6 14.3-6.6 0-12.4-1.7-16.3-4.4l3.7-9.3c3.4 2.3 8 3.7 12.6 3.7 5.4 0 8.3-2.1 8.3-5.3 0-3.3-2.7-5-9.6-7.2-10-3.2-14-7.4-14-14.5z"
      />
    </svg>
  ),
  Tailwind: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path
        d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"
        fill="#06B6D4"
      />
    </svg>
  ),
  Supabase: () => (
    <svg viewBox="0 0 109 113" width="22" height="22" fill="none">
      <path
        d="M65.4855 110.551C62.9649 113.805 57.5796 112.036 57.5796 107.935V65.8753H9.72124C3.89299 65.8753 0.65597 59.102 4.31687 54.5678L43.8344 2.24795C46.355 -1.00645 51.7403 0.762886 51.7403 4.86377V46.9238H99.5986C105.427 46.9238 108.664 53.6971 105.003 58.2313L65.4855 110.551Z"
        fill="url(#supa_paint)"
      />
      <defs>
        <linearGradient id="supa_paint" x1="54.66" y1="0.59" x2="54.66" y2="112.2" gradientUnits="userSpaceOnUse">
          <stop stopColor="#24E489" />
          <stop offset="1" stopColor="#3ECF8E" />
        </linearGradient>
      </defs>
    </svg>
  ),
  Vite: () => (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <path
        d="M29.56 5.56l-13 23.47a1 1 0 01-1.74 0l-13-23.47a1 1 0 01.87-1.48h26a1 1 0 01.87 1.48z"
        fill="url(#vite_paint0)"
      />
      <path
        d="M20.25 2.1l-9.15 1.77a.6.6 0 00-.47.46L8.4 14.5a.6.6 0 00.75.72l4.3-1.42a.6.6 0 01.76.74l-2.4 8.24c-.2.71.74 1.15 1.15.55l10.3-15.17a.6.6 0 00-.54-.95l-4.7.12a.6.6 0 01-.58-.75l1.6-4.04a.6.6 0 00-.8-.74z"
        fill="url(#vite_paint1)"
      />
      <defs>
        <linearGradient id="vite_paint0" x1="3.2" y1="4.08" x2="16.4" y2="28.98" gradientUnits="userSpaceOnUse">
          <stop stopColor="#41D1FF" />
          <stop offset="1" stopColor="#BD34FE" />
        </linearGradient>
        <linearGradient id="vite_paint1" x1="16.2" y1="2.1" x2="16.2" y2="24.4" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFEA83" />
          <stop offset=".08" stopColor="#FFDD35" />
          <stop offset="1" stopColor="#FFA800" />
        </linearGradient>
      </defs>
    </svg>
  ),
  PostgreSQL: () => (
    <svg viewBox="0 0 256 264" width="22" height="22">
      <path
        fill="#336791"
        d="M125.074 0C55.997 0 0 55.997 0 125.074c0 30.658 11.026 58.746 29.387 80.575l.135.158 5.759 6.279 26.682-24.475-5.759-6.279c-14.733-16.077-22.955-36.963-22.955-56.258 0-48.498 39.458-87.956 87.956-87.956 48.498 0 87.956 39.458 87.956 87.956 0 46.54-36.31 84.773-82.02 87.73v33.284c64.254-3.024 115.304-56.402 115.304-121.014C242.445 55.997 186.448 0 125.074 0z"
      />
      <path
        fill="#336791"
        d="M124.78 68.21c-28.794 0-52.133 23.339-52.133 52.133 0 12.87 4.673 24.66 12.443 33.79l24.46-22.42c-2.484-3.32-3.957-7.44-3.957-11.89 0-11.127 9.02-20.147 20.147-20.147 11.127 0 20.147 9.02 20.147 20.147s-9.02 20.147-20.147 20.147c-2.73 0-5.32-.54-7.68-1.52l-23.75 21.77c9.08 6.07 19.98 9.61 31.74 9.61 31.33 0 56.73-25.4 56.73-56.73 0-31.33-25.4-56.73-56.73-56.73z"
      />
    </svg>
  ),
  Framer: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="#0055FF">
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
    </svg>
  ),
  Figma: () => (
    <svg viewBox="0 0 38 57" width="18" height="22" fill="none">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
    </svg>
  ),
  Nodejs: () => (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="#5FA04E">
      <path d="M16 2.5l12.5 7.2v14.6L16 31.5 3.5 24.3V9.7L16 2.5zm0 2.3L5.5 10.7v12.6L16 29.2l10.5-5.9V10.7L16 4.8z" />
    </svg>
  ),
};

const TECH_ITEMS = [
  { name: 'React',         sub: 'UI Architecture',      Logo: Logos.React },
  { name: 'Next.js',       sub: 'Production Framework', Logo: Logos.Nextjs },
  { name: 'TypeScript',    sub: 'Type Safety',          Logo: Logos.TypeScript },
  { name: 'Tailwind CSS',  sub: 'Design Systems',       Logo: Logos.Tailwind },
  { name: 'Supabase',      sub: 'Backend & DB',         Logo: Logos.Supabase },
  { name: 'Vite',          sub: 'Build Tooling',        Logo: Logos.Vite },
  { name: 'Figma',         sub: 'Visual & UI Design',   Logo: Logos.Figma },
  { name: 'Framer Motion', sub: 'Micro-Interactions',   Logo: Logos.Framer },
  { name: 'PostgreSQL',    sub: 'Relational Database',  Logo: Logos.PostgreSQL },
  { name: 'Node.js',       sub: 'Server Runtime',       Logo: Logos.Nodejs },
];

const marqueeTrack = [...TECH_ITEMS, ...TECH_ITEMS];

export default function Technologies() {
  return (
    <section
      className="py-14 sm:py-16 border-y border-black/[0.06] overflow-hidden bg-[#f0f4fa] relative"
      aria-label="Technologies we use"
    >
      {/* Soft Ambient Corner Gradient */}
      <div
        className="absolute top-0 right-0 w-80 h-80 opacity-50 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 100% 0%, rgba(200,220,255,0.5) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-8 sm:mb-10 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-6"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-[#111317]">
              Built with modern, reliable technologies.
            </h2>
          </div>
          <p className="text-neutral-500 text-xs sm:text-sm max-w-xs leading-relaxed">
            High performance, rock-solid security, and maintainability for every project.
          </p>
        </motion.div>
      </div>

      {/* Infinite Scrolling Track */}
      <div className="relative z-10 w-full overflow-hidden">
        {/* Left/Right Edge Gradient Fade Masks */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #f0f4fa, transparent)' }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #f0f4fa, transparent)' }}
          aria-hidden="true"
        />

        {/* Marquee Track */}
        <div className="flex gap-3 sm:gap-4 animate-scroll-x w-max px-4">
          {marqueeTrack.map((tech, i) => {
            const LogoComponent = tech.Logo;
            return (
              <div
                key={`${tech.name}-${i}`}
                className="flex-shrink-0 inline-flex items-center gap-3.5 px-4 sm:px-5 py-3 rounded-xl bg-white/90 border border-black/[0.07] shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-black/20 hover:shadow-md transition-all duration-200 cursor-default select-none"
              >
                {/* Brand Logo */}
                <div className="w-8 h-8 rounded-md  flex items-center justify-center flex-shrink-0">
                  <LogoComponent />
                </div>

                {/* Name & Subtitle */}
                <div className="flex flex-col text-left">
                  <span className="font-heading text-sm font-semibold text-[#111317] tracking-tight leading-tight">
                    {tech.name}
                  </span>
                  <span className="text-[11px] text-neutral-500 font-normal leading-tight mt-0.5">
                    {tech.sub}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
