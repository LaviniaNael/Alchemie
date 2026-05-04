import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function StoryPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    
    if (!pageRef.current) return

    const ctx = gsap.context(() => {
      // Hero text entrance
      gsap.fromTo(heroTextRef.current?.children || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
      )

      // Fade up elements on scroll
      const fadeUps = pageRef.current?.querySelectorAll('.fade-up')
      if (fadeUps) {
        fadeUps.forEach(el => {
          gsap.fromTo(el,
            { opacity: 0, y: 50 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 1, 
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
              }
            }
          )
        })
      }

      // Parallax images
      const parallaxImgs = pageRef.current?.querySelectorAll('.parallax-img')
      if (parallaxImgs) {
        parallaxImgs.forEach(img => {
          gsap.to(img, {
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          })
        })
      }
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="bg-[#0F0D0B] min-h-screen">
      {/* Hero */}
      <section className="pt-40 pb-20 px-6 md:px-12 lg:px-16">
        <div ref={heroTextRef} className="max-w-[1000px] mx-auto text-center">
          <span className="font-mono text-gold/60 text-[11px] tracking-[0.2em] uppercase block mb-6">
            Maison Alchemie
          </span>
          <h1 className="font-display text-ivory text-4xl md:text-6xl lg:text-7xl font-light uppercase tracking-tight mb-8">
            The Art of <br/>
            <span className="text-gold">Olfactory Storytelling</span>
          </h1>
          <p className="font-body text-champagne text-xl md:text-2xl italic leading-relaxed max-w-2xl mx-auto">
            Established in 2018. Designed in Paris. Composed in the historic hills of Grasse.
          </p>
        </div>
      </section>

      {/* Image 1 */}
      <section className="px-6 md:px-12 lg:px-16 py-12">
        <div className="max-w-[1400px] mx-auto aspect-[21/9] overflow-hidden rounded-sm relative">
          <img 
            src="/darkroom-lab.jpg" 
            alt="The Laboratory" 
            className="parallax-img w-full h-[120%] object-cover absolute top-0 -mt-[10%]"
          />
          <div className="absolute inset-0 bg-deep/30" />
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16">
        <div className="max-w-[800px] mx-auto">
          <div className="fade-up">
            <h2 className="font-display text-ivory text-3xl md:text-4xl uppercase mb-8">
              The Philosophy
            </h2>
            <div className="space-y-6 font-body text-champagne text-lg md:text-xl leading-relaxed">
              <p>
                Alchemie Nº 7 was born from a desire to return to the roots of high perfumery—where time, raw materials, and silence are the ultimate luxuries.
              </p>
              <p>
                We believe that a fragrance is not merely an accessory, but an invisible architecture that defines a presence. Our compositions are complex, unapologetic, and designed to evolve dramatically on the skin over twelve hours.
              </p>
              <p>
                We reject mass production. We reject the rushed laboratory. We embrace the darkroom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image 2 */}
      <section className="px-6 md:px-12 lg:px-16 py-12">
        <div className="max-w-[1000px] mx-auto aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-sm relative">
          <img 
            src="/atelier-hands.jpg" 
            alt="The Atelier" 
            className="parallax-img w-full h-[120%] object-cover absolute top-0 -mt-[10%]"
          />
          <div className="absolute inset-0 bg-deep/20" />
        </div>
      </section>

      {/* The Atelier */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16">
        <div className="max-w-[800px] mx-auto">
          <div className="fade-up">
            <h2 className="font-display text-ivory text-3xl md:text-4xl uppercase mb-8">
              The Grasse Atelier
            </h2>
            <div className="space-y-6 font-body text-champagne text-lg md:text-xl leading-relaxed">
              <p>
                Located in a restored 19th-century bastide in the hills above Grasse, our atelier is where the alchemy happens. 
              </p>
              <p>
                Here, our master perfumers work in conditions resembling a photographic darkroom. Temperature, humidity, and light are strictly controlled. This ensures that the delicate absolutes and resins we source globally—from Indian Oud to Calabrian Bergamot—macerate perfectly without interference.
              </p>
              <p>
                Each batch is limited to 500 bottles. When they are gone, the vintage is complete. The next iteration will carry subtle shifts based on that year's harvest, much like a fine wine.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
