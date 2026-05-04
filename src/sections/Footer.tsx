import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

function MagneticButton({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const el = btnRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25, duration: 0.4, ease: 'power2.out' })
    }
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [])

  return <button ref={btnRef} className={className}>{children}</button>
}

export default function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Use a single timeline triggered by the section to avoid refresh calculation bugs on animated triggers
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        }
      })

      tl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.4, ease: 'power4.inOut' }
      )

      tl.fromTo(titleRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: 'power4.out' },
        '-=1.0'
      )

      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=1.2'
      )

      // Counter animation (independent)
      gsap.to({ val: 0 }, {
        val: 500, duration: 2.5, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom-=100', toggleActions: 'play none none reset' },
        onUpdate: function () { setCount(Math.round(this.targets()[0].val)) },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={sectionRef} className="relative w-full py-24 md:py-40 px-6 md:px-12 lg:px-16 bg-deep">
      <div className="max-w-[1400px] mx-auto">
        {/* CTA */}
        <div className="text-center mb-16 md:mb-24">
          <div className="flex justify-center mb-10">
            <div ref={lineRef} className="w-20 h-px origin-center" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)', transform: 'scaleX(0)' }} />
          </div>

          <h2 ref={titleRef} className="font-display text-ivory font-light uppercase mb-6 opacity-0" style={{ fontSize: 'clamp(32px, 7vw, 90px)', letterSpacing: '-0.02em', lineHeight: 0.95 }}>
            Discover Your
            <br />
            <span className="text-gold">Signature</span>
          </h2>

          <p className="font-body text-champagne text-base md:text-lg max-w-[440px] mx-auto leading-relaxed mb-3 italic">
            Limited to <span className="font-mono text-gold font-bold not-italic">{count}</span> editions annually. Each bottle numbered and registered.
          </p>
          <span className="font-mono text-champagne/40 text-[10px] tracking-[0.15em] uppercase">
            Batch MMXXIV · Series VII
          </span>
        </div>

        {/* Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24 md:mb-32 opacity-0">
          <Link to="/contact">
            <MagneticButton className="btn-primary">
              <span>Request Invitation</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MagneticButton>
          </Link>
          <Link to="/collection" className="font-mono text-ivory/60 text-sm tracking-[0.04em] uppercase relative group">
            <span className="relative">
              Browse Collection
              <span className="absolute bottom-0 left-0 w-full h-px bg-gold/30 group-hover:bg-gold transition-colors duration-500" />
            </span>
          </Link>
        </div>

        {/* Footer grid */}
        <div className="border-t border-gold/[0.06] pt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div>
              <div className="font-display text-ivory text-sm font-medium tracking-[0.1em]">ALCHEMIE</div>
              <div className="font-display text-ivory/60 text-sm font-light mt-0.5">Nº 7</div>
              <div className="mt-3 w-6 h-px bg-gold/30" />
            </div>
            <div>
              <span className="font-mono text-champagne text-[11px] tracking-[0.04em] block">PARIS · GRASSE · LONDON</span>
              <span className="font-mono text-champagne/40 text-[10px] tracking-[0.04em] block mt-1.5">ATELIER EST. 2018</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <Link to="/story" className="font-mono text-champagne text-[11px] tracking-[0.04em] hover:text-gold transition-colors duration-300">OUR STORY</Link>
              <Link to="/collection" className="font-mono text-champagne text-[11px] tracking-[0.04em] hover:text-gold transition-colors duration-300">COLLECTION</Link>
              <Link to="/contact" className="font-mono text-champagne text-[11px] tracking-[0.04em] hover:text-gold transition-colors duration-300">CONTACT</Link>
            </div>
            <div>
              <a href="mailto:info@alchemie7.com" className="font-mono text-champagne text-[11px] tracking-[0.04em] hover:text-gold transition-colors duration-300 block">INFO@ALCHEMIE7.COM</a>
              <span className="font-mono text-champagne/40 text-[10px] tracking-[0.04em] block mt-1.5">+33 (0) 1 42 86 XX XX</span>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-gold/[0.04] flex flex-col md:flex-row items-center justify-between gap-3">
            <span className="font-mono text-champagne/30 text-[10px] tracking-[0.04em]">© 2024 ALCHEMIE Nº 7 · ALL RIGHTS RESERVED</span>
            <span className="font-mono text-champagne/20 text-[10px] tracking-[0.04em]">DESIGNED IN PARIS · COMPOSED IN GRASSE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
