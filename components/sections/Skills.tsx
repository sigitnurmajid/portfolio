import { motion } from 'framer-motion'
import { skills } from '../../content'

const ease = [0.25, 0.1, 0.25, 1] as const

export default function Skills() {
  return (
    <section id="skills" className="relative py-[clamp(5rem,12vh,10rem)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--text-muted)] mb-10"
        >
          Tech Stack
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-[var(--text-primary)] max-w-2xl mb-16"
        >
          Tools I use to build
          <span className="text-[var(--accent)]"> systems</span>.
        </motion.h2>

        {/* Skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-[var(--border)]">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 + 0.2, duration: 0.5, ease }}
              className="bg-[var(--bg-primary)] p-6 sm:p-8 group hover:bg-[var(--bg-card-hover)] transition-colors duration-300 cursor-default"
            >
              <skill.icon
                size={24}
                className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors duration-300 mb-5"
              />
              <p className="text-[14px] font-medium text-[var(--text-primary)] mb-1">
                {skill.name}
              </p>
              <p className="text-[11px] text-[var(--text-muted)]">{skill.category}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
