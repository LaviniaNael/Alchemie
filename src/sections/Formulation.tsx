import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Citrus, TreePine, Flower2, Gem } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ingredients = [
  { name: 'Bergamot', origin: 'Calabria, Italy', Icon: Citrus, color: '#e63939ff' },
  { name: 'Oud', origin: 'Assam, India', Icon: TreePine, color: '#dfac4dff' },
  { name: 'Damask Rose', origin: 'Grasse, France', Icon: Flower2, color: '#fd7eb9ff' },
  { name: 'Amber Resin', origin: 'Baltic Coast', Icon: Gem, color: '#ff7728ff' },
]

export default function Formulation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const ingredientsRef = useRef<HTMLDivElement>(null)
  const [activeIngredient, setActiveIngredient] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIngredient((prev) => (prev + 1) % ingredients.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Image parallax + scale on scroll
      gsap.fromTo(imgRef.current,
        { scale: 1.15, y: 60 },
        {
          scale: 1,
          y: -40,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      )

      // Text slide in
      gsap.fromTo(textRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom-=150',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Ingredients stagger
      const items = ingredientsRef.current?.querySelectorAll('.ingredient-item')
      if (items) {
        gsap.fromTo(items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ingredientsRef.current,
              start: 'top bottom-=80',
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
      className="relative w-full py-24 md:py-36 px-6 md:px-12 lg:px-16 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Image */}
          <div className="relative overflow-hidden rounded-sm order-2 lg:order-1">
            <div ref={imgRef} className="aspect-[4/5] overflow-hidden">
              <img
                src="/darkroom-lab.jpg"
                alt="Perfume laboratory"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Warm gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-transparent opacity-50" />
            <span className="absolute bottom-4 left-4 font-mono text-ivory/30 text-[10px] tracking-[0.08em]">
              THE LABORATORY · GRASSE
            </span>
          </div>

          {/* Right — Text */}
          <div ref={textRef} className="order-1 lg:order-2 opacity-0">
            <span className="section-label block mb-5">The Process</span>
            <h2
              className="font-display text-ivory font-light uppercase mb-8"
              style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
            >
              Raw Materials,
              <br />
              <span className="text-gold">Refined</span>
            </h2>

            <p className="font-body text-champagne text-base md:text-lg leading-relaxed mb-10 max-w-[480px]">
              Each composition begins with a raw material pilgrimage. We source oud from Assam, jasmine from Grasse, amber resin from the Baltic shore. The chemistry is precise; the poetry is accidental.
            </p>

            {/* Ingredient list */}
            <div ref={ingredientsRef} className="space-y-4 mb-10">
              {ingredients.map((ing, i) => (
                <div
                  key={ing.name}
                  className={`ingredient-item flex items-center gap-4 py-3 px-4 rounded transition-all duration-500 cursor-pointer ${
                    i === activeIngredient
                      ? 'bg-gold/[0.06] border-l-2 border-gold'
                      : 'border-l-2 border-transparent hover:bg-ivory/[0.02]'
                  }`}
                  onClick={() => setActiveIngredient(i)}
                >
                  <span 
                    className={`flex-shrink-0 transition-all duration-300 ${i === activeIngredient ? 'opacity-100 drop-shadow-md' : 'opacity-40 saturate-50'}`}
                    style={{ color: ing.color }}
                  >
                    <ing.Icon className="w-5 h-5" strokeWidth={2} />
                  </span>
                  <div>
                    <span className={`font-display text-sm font-medium uppercase tracking-wide transition-colors duration-300 ${
                      i === activeIngredient ? 'text-gold' : 'text-ivory/70'
                    }`}>
                      {ing.name}
                    </span>
                    <span className="font-mono text-champagne text-[10px] tracking-[0.06em] block mt-0.5">
                      {ing.origin}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/story"
              className="font-mono text-gold text-[11px] tracking-[0.06em] uppercase inline-flex items-center gap-2 group"
            >
              <span className="relative">
                Discover the Process
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-500 ease-out group-hover:w-full" />
              </span>
              <svg className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
