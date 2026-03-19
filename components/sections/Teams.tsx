import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import Image from 'next/image'
import { teams } from '../../content'

const ease = [0.25, 0.1, 0.25, 1] as const

export default function Teams() {
  return (
    <section id="teams" className="relative py-[clamp(5rem,12vh,10rem)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--text-muted)] mb-10"
        >
          Teams
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-[var(--text-primary)] max-w-2xl mb-16"
        >
          Teams I&apos;m
          <span className="text-[var(--accent)]"> part of</span>.
        </motion.h2>

        {/* Team list */}
        <div className="space-y-0">
          {teams.map((team, i) => (
            <motion.a
              key={team.name}
              href={team.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.6, ease }}
              className="group block border-t border-[var(--border)] py-8 sm:py-10 hover:bg-[var(--bg-card)] transition-colors duration-300 -mx-6 px-6 lg:-mx-10 lg:px-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                {/* Logo */}
                <div className="lg:col-span-1 flex items-center">
                  <div className="w-10 h-10 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] flex items-center justify-center overflow-hidden shrink-0">
                    {team.logo ? (
                      <Image
                        src={team.logo}
                        alt={team.name}
                        width={40}
                        height={40}
                        className="object-contain w-full h-full"
                      />
                    ) : (
                      <span className="text-[16px] font-bold text-[var(--text-muted)]">
                        {team.name.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Team name + arrow */}
                <div className="lg:col-span-3 flex items-center gap-3">
                  <h3 className="text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300">
                    {team.name}
                  </h3>
                  <FiArrowUpRight
                    size={16}
                    className="text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0"
                  />
                </div>

                {/* Role */}
                <div className="lg:col-span-2">
                  <span className="text-[12px] font-mono text-[var(--accent-secondary)]">
                    {team.role}
                  </span>
                </div>

                {/* Description */}
                <div className="lg:col-span-6">
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                    {team.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
          <div className="border-t border-[var(--border)]" />
        </div>
      </div>
    </section>
  )
}
