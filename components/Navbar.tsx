import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMenuAlt4 } from 'react-icons/hi'
import { IoCloseOutline } from 'react-icons/io5'
import { site, navLinks } from '../content'

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-56 z-50 flex-col border-r border-[var(--border)] bg-[var(--bg-primary)]/80 backdrop-blur-xl">
        {/* Logo */}
        <div className="px-8 pt-10 pb-6">
          <a href="#home">
            <span className="text-[13px] font-semibold tracking-widest text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-300">
              SIGIT<span className="text-[var(--accent)]">.</span>
            </span>
          </a>
        </div>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col justify-center px-8 gap-1">
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className={`relative py-2.5 text-[13px] font-medium tracking-wide transition-colors duration-300 group ${
                  isActive
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {/* Active indicator */}
                <span
                  className={`absolute left-[-2rem] top-1/2 -translate-y-1/2 h-px transition-all duration-300 bg-[var(--accent)] ${
                    isActive ? 'w-5 opacity-100' : 'w-0 opacity-0 group-hover:w-3 group-hover:opacity-40'
                  }`}
                />
                {link.label}
              </motion.a>
            )
          })}
        </nav>

        {/* Bottom email */}
        <div className="px-8 pb-10">
          <a
            href={`mailto:${site.email}`}
            className="block text-[11px] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-300 truncate"
            style={{ writingMode: 'horizontal-tb' }}
          >
            {site.email}
          </a>
        </div>
      </aside>

      {/* Mobile: hamburger button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors bg-[var(--bg-primary)]/80 backdrop-blur-md rounded-md border border-[var(--border)]"
          aria-label="Open menu"
        >
          <HiOutlineMenuAlt4 size={20} />
        </button>
      </div>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[var(--bg-primary)] md:hidden"
          >
            <div className="flex flex-col h-full px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold tracking-wide">
                  SIGIT<span className="text-[var(--accent)]">.</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  aria-label="Close menu"
                >
                  <IoCloseOutline size={22} />
                </button>
              </div>

              <nav className="flex-1 flex flex-col justify-center">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 + 0.1, duration: 0.4 }}
                    className="block py-4 text-[clamp(2rem,6vw,3rem)] font-bold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-300"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="pb-8">
                <a
                  href={`mailto:${site.email}`}
                  className="text-[12px] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-300"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
