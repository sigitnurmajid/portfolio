import { motion } from 'framer-motion'
import { about } from '../../content'

const ease = [0.25, 0.1, 0.25, 1] as const

export default function About() {
  return (
    <section id="about" className="relative py-[clamp(5rem,12vh,10rem)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--text-muted)] mb-10"
        >
          About
        </motion.p>

        {/* Large statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="text-[var(--text-primary)]"
            >
              {about.heading.plain}
              <span className="text-[var(--accent)]"> {about.heading.highlight1} </span>
              {about.heading.connector}
              <span className="text-[var(--accent-secondary)]"> {about.heading.highlight2}</span>.
            </motion.h2>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6, ease }}
              className="text-[14px] text-[var(--text-secondary)] leading-relaxed"
            >
              {about.bio}
            </motion.p>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease }}
          className="h-px bg-[var(--border)] mt-16 mb-12 origin-left"
        />

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {about.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.3, duration: 0.5, ease }}
            >
              <p className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-tight text-[var(--text-primary)]">
                {stat.value}
              </p>
              <p className="text-[12px] text-[var(--text-muted)] mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
