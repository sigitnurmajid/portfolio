import { motion } from 'framer-motion'
import { experience as timeline } from '../../content'

const ease = [0.25, 0.1, 0.25, 1] as const

export default function Experience() {
  return (
    <section id="experience" className="relative py-[clamp(5rem,12vh,10rem)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--text-muted)] mb-10"
        >
          Experience
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-[var(--text-primary)] max-w-2xl mb-16"
        >
          The
          <span className="text-[var(--accent)]"> journey</span>.
        </motion.h2>

        {/* Timeline entries */}
        <div className="space-y-0">
          {timeline.map((item, i) => (
            <motion.div
              key={item.period}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.6, ease }}
              className="border-t border-[var(--border)] py-8 sm:py-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
                {/* Year */}
                <div className="lg:col-span-2">
                  <span className="text-[12px] font-mono text-[var(--accent)]">
                    {item.period}
                  </span>
                </div>

                {/* Title */}
                <div className="lg:col-span-3">
                  <h3 className="text-[var(--text-primary)]">{item.title}</h3>
                </div>

                {/* Description */}
                <div className="lg:col-span-4">
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="lg:col-span-3 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 rounded-full border border-[var(--border)] text-[var(--text-muted)] h-fit"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-[var(--border)]" />
        </div>
      </div>
    </section>
  )
}
