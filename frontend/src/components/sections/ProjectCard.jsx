import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

function PlaceholderImage({ name, category }) {
  const hues = [215, 250, 190, 30];
  const index = name.length % 4;
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3 select-none p-6 text-center"
      style={{
        background: `radial-gradient(ellipse at 40% 40%, hsla(${hues[index]},50%,95%,1) 0%, #e8eef8 100%)`,
      }}
      aria-label={`${name} project placeholder`}
    >
      <span className="text-5xl font-heading font-bold text-black/10 tracking-tight">
        {name.charAt(0)}
      </span>
      <span className="text-xs font-heading font-medium text-neutral-500 bg-white/90 border border-black/[0.06] px-3 py-1 rounded-full shadow-sm">
        {category}
      </span>
    </div>
  );
}

export default function ProjectCard({ project, variant = 'secondary' }) {
  const targetUrl = project.url || '#';

  if (variant === 'featured') {
    return (
      <motion.article
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeUp}
        className="group"
      >
        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white border border-black/[0.08] rounded-2xl overflow-hidden transition-all duration-300 hover:border-black/25 hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] shadow-[0_2px_12px_rgba(0,0,0,0.03)] cursor-pointer"
          aria-label={`Open ${project.name} in new tab`}
        >
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px] overflow-hidden bg-neutral-50">
              {project.image && !project.image.includes('PROJECT_') ? (
                <img
                  src={project.image}
                  alt={`${project.name} project`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              ) : (
                <PlaceholderImage name={project.name} category={project.category} />
              )}
            </div>

            {/* Content */}
            <div className="p-8 lg:p-10 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs font-heading font-medium text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                    <ArrowUpRight size={15} />
                  </div>
                </div>
                <h3 className="text-2xl lg:text-3xl font-heading font-semibold tracking-tight text-[#111317]">
                  {project.name}
                </h3>
                <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-neutral-600 bg-neutral-100/80 border border-black/[0.04] px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </a>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      variants={fadeUp}
      className="group"
    >
      <a
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-white border border-black/[0.08] rounded-2xl overflow-hidden transition-all duration-300 hover:border-black/25 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] shadow-[0_2px_8px_rgba(0,0,0,0.02)] cursor-pointer h-full"
        aria-label={`Open ${project.name} in new tab`}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-50">
          {project.image && !project.image.includes('PROJECT_') ? (
            <img
              src={project.image}
              alt={`${project.name} project`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          ) : (
            <PlaceholderImage name={project.name} category={project.category} />
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-3.5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-heading font-medium text-neutral-500 block mb-1">{project.category}</span>
              <h3 className="text-lg font-heading font-semibold tracking-tight text-[#111317]">
                {project.name}
              </h3>
            </div>
            <div className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
              <ArrowUpRight size={13} />
            </div>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium text-neutral-600 bg-neutral-100 px-2.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    </motion.article>
  );
}
