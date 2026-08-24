import { motion } from 'framer-motion';
import { PROJECTS } from '../../data/siteContent';
import ProjectCard from './ProjectCard';
import Button from '../ui/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function Portfolio() {
  const featured = PROJECTS.find((p) => p.featured);
  const secondary = PROJECTS.filter((p) => !p.featured);

  return (
    <section
      id="work"
      className="section-padding bg-[#f4f7fc] border-t border-black/[0.06] relative overflow-hidden"
      aria-label="MAZTAA portfolio"
    >
      {/* Ambient corner wash */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 100% 0%, rgba(210,225,255,0.7) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-[#111317]">
              Featured projects
            </h2>
          </div>
          <p className="text-neutral-600 text-sm max-w-xs leading-relaxed">
            Every project is carefully designed and engineered from the ground up for our clients.
          </p>
        </motion.div>

        {/* Featured Project */}
        {featured && (
          <div className="mb-6">
            <ProjectCard project={featured} variant="featured" />
          </div>
        )}

        {/* Secondary Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondary.map((project) => (
            <ProjectCard key={project.id} project={project} variant="secondary" />
          ))}
        </div>

        {/* Bottom CTA Row */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-black/[0.06] pt-8"
        >
          <p className="text-sm font-medium text-neutral-600">
            Have a project in mind? We'd love to help you build it.
          </p>
          <Button href="#pricing" id="portfolio-cta">
            Start a Project
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
