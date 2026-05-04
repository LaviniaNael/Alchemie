import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const titleLine1Ref = useRef<HTMLDivElement>(null)
  const titleLine2Ref = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // New parallax refs to separate scroll and entrance animations
  const parallaxImageRef = useRef<HTMLDivElement>(null)
  const parallaxLine1Ref = useRef<HTMLDivElement>(null)
  const parallaxLine2Ref = useRef<HTMLDivElement>(null)
  const parallaxTaglineRef = useRef<HTMLDivElement>(null)

  // Unified GSAP entrance and scroll parallax animations
  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // 1. Entrance animation timeline
      const tl = gsap.timeline({ delay: 0.4 })

      tl.fromTo(imageRef.current,
        { opacity: 0, scale: 1.1, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.8, ease: 'power3.out' }
      )

      tl.fromTo(titleLine1Ref.current,
        { clipPath: 'inset(100% 0 0 0)', y: 40 },
        { clipPath: 'inset(0% 0 0 0)', y: 0, duration: 1.2, ease: 'power4.out' },
        '-=1.2'
      )

      tl.fromTo(titleLine2Ref.current,
        { clipPath: 'inset(100% 0 0 0)', y: 40 },
        { clipPath: 'inset(0% 0 0 0)', y: 0, duration: 1.2, ease: 'power4.out' },
        '-=0.9'
      )

      tl.fromTo(badgeRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )

      tl.fromTo(taglineRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )

      tl.fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.3'
      )

      // 2. Scroll parallax animations
      gsap.fromTo(parallaxImageRef.current,
        { y: 0, scale: 1 },
        {
          y: -60,
          scale: 1.05,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      )

      gsap.fromTo(parallaxLine1Ref.current,
        { y: 0, opacity: 1 },
        {
          y: -100,
          opacity: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )

      gsap.fromTo(parallaxLine2Ref.current,
        { y: 0, opacity: 1 },
        {
          y: -60,
          opacity: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )

      gsap.fromTo(parallaxTaglineRef.current,
        { y: 0, opacity: 1 },
        {
          y: 40,
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '50% top',
            scrub: 1,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Warm gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, #1a1510 0%, #0F0D0B 70%)',
        }}
      />

      {/* Hero bottle image — centered behind text */}
      <div className="absolute inset-0 z-[1] flex items-center justify-center">
        <div ref={parallaxImageRef} className="absolute inset-0 w-full h-full">
          <img
            ref={imageRef}
            src="/hero-bottles.jpg"
            alt="Alchemie Nº 7 perfume collection"
            className="w-full h-full object-cover opacity-0"
            style={{ objectPosition: '50% 55%' }}
          />
        </div>
        {/* Warm overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0D0B]/50 via-transparent to-[#0F0D0B]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0D0B]/40 via-transparent to-[#0F0D0B]/40" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 text-center px-4 max-w-[900px]">
        {/* Edition badge */}
        <div ref={badgeRef} className="mb-6 opacity-0">
          <span className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] uppercase text-gold/80 border border-gold/20 px-5 py-2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Eau de Parfum · Limited Edition
          </span>
        </div>

        {/* Title */}
        <div ref={parallaxLine1Ref}>
          <div className="overflow-hidden">
            <div
              ref={titleLine1Ref}
              className="font-display text-ivory uppercase font-light"
              style={{
                fontSize: 'clamp(42px, 9vw, 110px)',
                letterSpacing: '-0.02em',
                lineHeight: 0.95,
              }}
            >
              The Darkroom
            </div>
          </div>
        </div>
        <div ref={parallaxLine2Ref} className="mt-1 md:mt-2">
          <div className="overflow-hidden">
            <div
              ref={titleLine2Ref}
              className="font-display text-ivory uppercase font-light"
              style={{
                fontSize: 'clamp(42px, 9vw, 110px)',
                letterSpacing: '-0.02em',
                lineHeight: 0.95,
              }}
            >
              Collection
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div ref={parallaxTaglineRef} className="mt-6 md:mt-8">
          <div ref={taglineRef} className="opacity-0">
            <p className="font-body text-ivory/50 text-lg md:text-xl italic">
              Seven fragrances. Seven stories. Composed in Grasse.
            </p>
            <div className="mt-8">
              <a href="#collection" className="btn-primary">
                <span>Explore Collection</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Corner metadata */}
      <div className="absolute top-24 left-6 md:top-28 md:left-12 z-10">
        <span className="font-mono text-gold/40 text-[10px] tracking-[0.12em]">
          EST. MMXVIII
        </span>
      </div>
      <div className="absolute top-24 right-6 md:top-28 md:right-12 z-10">
        <span className="font-mono text-ivory/25 text-[10px] tracking-[0.12em]">
          PARIS · GRASSE
        </span>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0">
        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-8 border border-gold/25 rounded-full flex justify-center pt-1.5">
            <div className="w-0.5 h-2 bg-gold rounded-full animate-scroll-dot" />
          </div>
          <span className="font-mono text-champagne text-[9px] tracking-[0.12em] uppercase">
            Scroll
          </span>
        </div>
      </div>
    </section>
  )
}
