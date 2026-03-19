import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { projects } from '../../content'

const ease = [0.25, 0.1, 0.25, 1] as const

export default function Projects() {
  return (
    <section id="projects" className="relative py-[clamp(5rem,12vh,10rem)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--text-muted)] mb-10"
        >
          Projects
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-[var(--text-primary)] max-w-2xl mb-16"
        >
          Selected
          <span className="text-[var(--accent-secondary)]"> work</span>.
        </motion.h2>

        {/* Project list */}
        <div className="space-y-0">
          {projects.map((project, i) => (
            <motion.a
              key={project.num}
              href={project.href}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.6, ease }}
              className="group block border-t border-[var(--border)] py-8 sm:py-10 hover:bg-[var(--bg-card)] transition-colors duration-300 -mx-6 px-6 lg:-mx-10 lg:px-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
                {/* Number */}
                <div className="lg:col-span-1">
                  <span className="text-[12px] font-mono text-[var(--text-muted)]">
                    {project.num}
                  </span>
                </div>

                {/* Title + arrow */}
                <div className="lg:col-span-4 flex items-center gap-3">
                  <h3 className="text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <FiArrowUpRight
                    size={16}
                    className="text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0"
                  />
                </div>

                {/* Description */}
                <div className="lg:col-span-4">
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="lg:col-span-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 rounded-full border border-[var(--border)] text-[var(--text-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
          {/* Bottom border */}
          <div className="border-t border-[var(--border)]" />
        </div>
      </div>
    </section>
  )
}
