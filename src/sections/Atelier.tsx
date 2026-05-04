import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { number: '01', title: 'Source', desc: 'Raw materials pilgrimage across four continents. Each ingredient traced to its origin.' },
  { number: '02', title: 'Distill', desc: 'Precision extraction at controlled temperatures. Every molecule matters.' },
  { number: '03', title: 'Compose', desc: 'Layered formulation over 90 days of maceration in our Grasse atelier.' },
  { number: '04', title: 'Reveal', desc: 'The final composition is not mixed — it is revealed. Like a photograph from the darkroom.' },
]

export default function Atelier() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const imageInnerRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Image curtain reveal with clip-path
      gsap.fromTo(imageRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.6,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom-=150',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Image parallax inside the container
      gsap.fromTo(imageInnerRef.current,
        { scale: 1.2 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        }
      )

      // Text entrance
      gsap.fromTo(textRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom-=120',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Steps stagger + timeline line
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top bottom-=60',
            end: 'bottom center',
            scrub: 1.5,
          },
        }
      )

      const stepEls = stepsRef.current?.querySelectorAll('.atelier-step')
      if (stepEls) {
        gsap.fromTo(stepEls,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top bottom-=60',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-36 px-6 md:px-12 lg:px-16"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — Image with curtain reveal */}
          <div
            ref={imageRef}
            className="relative overflow-hidden rounded-sm"
            style={{ clipPath: 'inset(0 100% 0 0)' }}
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                ref={imageInnerRef}
                src="/atelier-hands.jpg"
                alt="Hands crafting perfume"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 font-mono text-ivory/30 text-[10px] tracking-[0.08em]">
              GRASSE, FRANCE
            </span>
          </div>

          {/* Right — Text & steps */}
          <div ref={textRef} className="opacity-0">
            <span className="section-label block mb-5">Atelier Notes</span>
            <h2
              className="font-display text-ivory font-light uppercase mb-6"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
            >
              The Darkroom
              <br />
              <span className="text-gold">Process</span>
            </h2>

            <p className="font-body text-champagne text-base md:text-lg leading-relaxed mb-12 max-w-[480px]">
              Our perfumes are composed like photographic negatives — in darkness, with patience. Each note is exposed in precise ratios, developed through time and temperature.
            </p>

            {/* Process timeline */}
            <div ref={stepsRef} className="relative pl-6">
              {/* Vertical line */}
              <div
                ref={lineRef}
                className="absolute left-[7px] top-2 bottom-2 w-px origin-top"
                style={{
                  background: 'linear-gradient(180deg, #C9A96E, rgba(201, 169, 110, 0.1))',
                  transform: 'scaleY(0)',
                }}
              />

              <div className="space-y-8">
                {steps.map((step) => (
                  <div key={step.number} className="atelier-step flex gap-5 group">
                    <div className="relative flex-shrink-0 mt-1.5">
                      <div className="w-[14px] h-[14px] rounded-full border border-gold/25 flex items-center justify-center group-hover:border-gold/60 transition-colors duration-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold/30 group-hover:bg-gold transition-all duration-500" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-gold/50 text-[10px] tracking-[0.12em]">
                          {step.number}
                        </span>
                        <h3 className="font-display text-ivory text-base md:text-lg font-medium uppercase tracking-wide group-hover:text-gold transition-colors duration-300">
                          {step.title}
                        </h3>
                      </div>
                      <p className="font-body text-champagne text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
