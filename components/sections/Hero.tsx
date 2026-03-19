import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'
import { hero } from '../../content'

const HeroCanvas = dynamic(() => import('../three/HeroCanvas'), { ssr: false })

const ease = [0.25, 0.1, 0.25, 1] as const

export default function Hero() {
  const isMobile = useIsMobile()

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      {/* 3D Scene */}
      {!isMobile && <HeroCanvas />}

      {/* Mobile fallback */}
      {isMobile && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070d] via-[#0a0f1a] to-[#07070d]" />
      )}

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col justify-end h-full px-6 lg:px-10 pb-[clamp(3rem,8vh,6rem)] max-w-[1400px] mx-auto">
        {/* Small label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease }}
          className="text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--text-muted)] mb-6"
        >
          {hero.label}
        </motion.p>

        {/* Large display heading */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease }}
          >
            <span className="block">{hero.firstName}</span>
          </motion.h1>
        </div>
        <div className="overflow-hidden -mt-2 sm:-mt-4">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease }}
          >
            <span className="block bg-gradient-to-r from-[var(--accent)] via-[#60a5fa] to-[var(--accent-secondary)] bg-clip-text text-transparent">
              {hero.lastName}
            </span>
          </motion.h1>
        </div>

        {/* Subline + CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease }}
          className="mt-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <p className="text-[14px] sm:text-[15px] text-[var(--text-secondary)] max-w-md leading-relaxed">
            {hero.subtitle}
          </p>

          <div className="flex gap-4 shrink-0">
            <a
              href={hero.cta.primary.href}
              className="text-[12px] font-medium px-5 py-2.5 rounded-full bg-[var(--accent)] text-[var(--bg-primary)] hover:opacity-90 transition-opacity duration-300"
            >
              {hero.cta.primary.label}
            </a>
            <a
              href={hero.cta.secondary.href}
              className="text-[12px] font-medium px-5 py-2.5 rounded-full border border-[var(--border-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-all duration-300"
            >
              {hero.cta.secondary.label}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.15em] uppercase text-[var(--text-muted)]">
          Scroll
        </span>
        <motion.div
          animate={{ height: [16, 28, 16] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px bg-[var(--text-muted)]"
        />
      </motion.div>
    </section>
  )
}
