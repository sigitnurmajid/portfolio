import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { site, contact as contactData } from '../../content'

const ease = [0.25, 0.1, 0.25, 1] as const

export default function Contact() {
  return (
    <section id="contact" className="relative py-[clamp(5rem,12vh,10rem)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--text-muted)] mb-10"
        >
          Contact
        </motion.p>

        {/* Large CTA heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-16"
        >
          <h2 className="text-[var(--text-primary)]">{contactData.heading}</h2>
          <p className="mt-4 text-[14px] text-[var(--text-secondary)] max-w-lg leading-relaxed">
            {contactData.subtext}
          </p>
        </motion.div>

        {/* Email link — large */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease }}
        >
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex items-center gap-3 text-[clamp(1.2rem,3vw,2rem)] font-semibold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-300"
          >
            {site.email}
            <FiArrowUpRight
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </a>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease }}
          className="h-px bg-[var(--border)] mt-20 mb-10 origin-left"
        />

        {/* Footer row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6, ease }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
        >
          {/* Socials */}
          <div className="flex gap-8">
            {contactData.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-300"
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[11px] text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} {site.name}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
