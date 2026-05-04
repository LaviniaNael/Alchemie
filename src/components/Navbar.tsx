import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Collection', path: '/collection' },
  { label: 'Story', path: '/story' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Transparent → solid on scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Animate nav items on mount
  useEffect(() => {
    if (!navRef.current) return
    const items = navRef.current.querySelectorAll('.nav-item')
    gsap.fromTo(items,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out', delay: 0.3 }
    )
  }, [])

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled
            ? 'bg-deep/90 backdrop-blur-xl border-b border-gold/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="nav-item flex flex-col leading-tight group">
            <span className="font-display text-ivory text-sm md:text-base font-medium tracking-[0.15em] uppercase group-hover:text-gold transition-colors duration-300">
              Alchemie
            </span>
            <span className="font-mono text-gold/60 text-[9px] tracking-[0.2em]">
              Nº 7
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-item font-mono text-[11px] tracking-[0.1em] uppercase transition-colors duration-300 relative ${
                  isActive(link.path)
                    ? 'text-gold'
                    : 'text-ivory/50 hover:text-ivory'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-gold/40" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            to="/contact"
            className="nav-item hidden md:inline-flex font-mono text-[10px] tracking-[0.1em] uppercase text-gold border border-gold/25 px-5 py-2 hover:bg-gold/10 transition-all duration-300"
          >
            Enquire
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden nav-item flex flex-col gap-1.5 w-7 group"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-px bg-ivory transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[4px] w-5' : 'w-7'}`} />
            <span className={`block h-px bg-ivory transition-all duration-300 ${menuOpen ? 'opacity-0' : 'w-5'}`} />
            <span className={`block h-px bg-ivory transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[4px] w-5' : 'w-4'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-[999] bg-deep/98 backdrop-blur-2xl flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-display text-2xl uppercase tracking-[0.08em] transition-all duration-300 ${
                isActive(link.path)
                  ? 'text-gold'
                  : 'text-ivory/60 hover:text-ivory'
              }`}
              style={{
                transitionDelay: menuOpen ? `${i * 80}ms` : '0ms',
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: menuOpen ? 1 : 0,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-12" style={{ transitionDelay: '320ms' }}>
          <span className="font-mono text-champagne text-[10px] tracking-[0.15em] uppercase">
            Paris · Grasse · London
          </span>
        </div>
      </div>
    </>
  )
}
