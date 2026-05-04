import { useEffect, useRef } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { products } from '../sections/Collection'

gsap.registerPlugin(ScrollTrigger)

export default function ProductPage() {
  const { id } = useParams()
  const product = products.find(p => p.id === id)
  
  const pageRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    
    if (!pageRef.current || !product) return

    const ctx = gsap.context(() => {
      // Entrance
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' }
      )
      
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
      )

      // Parallax image
      gsap.to(imageRef.current, {
        y: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: pageRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })
    }, pageRef)

    return () => ctx.revert()
  }, [product])

  if (!product) return <Navigate to="/collection" />

  const nextProduct = products[(products.indexOf(product) + 1) % products.length]

  return (
    <div ref={pageRef} className="min-h-screen pt-24 md:pt-32 pb-24 px-6 md:px-12 lg:px-16 bg-[#0F0D0B]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Left: Image */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[#161310] lg:sticky lg:top-32">
            <img 
              ref={imageRef}
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Content */}
          <div ref={contentRef} className="flex flex-col pt-8 lg:pt-16">
            <span className="font-mono text-[11px] tracking-[0.15em] uppercase mb-4" style={{ color: product.accent }}>
              {product.number}
            </span>
            
            <h1 className="font-display text-ivory text-4xl md:text-6xl uppercase font-light tracking-tight mb-6">
              {product.name}
            </h1>
            
            <p className="font-body text-champagne text-xl italic mb-10 border-l-2 pl-6" style={{ borderColor: product.accent }}>
              {product.notes}
            </p>

            <div className="prose prose-invert prose-p:text-ivory/60 prose-p:font-body prose-p:text-lg mb-12">
              <p>
                A complex and evolving formulation that reveals its character slowly. 
                Sourced from the finest raw materials, this composition balances depth with ethereal top notes, 
                creating a signature that lingers long after departure.
              </p>
              <p>
                Macerated for 90 days in our Grasse atelier to achieve perfect harmony before bottling.
              </p>
            </div>

            <div className="flex flex-col gap-6 mb-16 pt-8 border-t border-gold/10">
              <div className="flex justify-between items-center font-mono text-sm tracking-widest text-ivory/80 uppercase">
                <span>Size</span>
                <span>100ml / 3.4 fl.oz</span>
              </div>
              <div className="flex justify-between items-center font-mono text-sm tracking-widest text-ivory/80 uppercase">
                <span>Concentration</span>
                <span>Eau de Parfum</span>
              </div>
              <div className="flex justify-between items-center font-mono text-sm tracking-widest text-ivory/80 uppercase">
                <span>Origin</span>
                <span>Composed in Grasse</span>
              </div>
              <div className="flex justify-between items-center font-mono text-lg tracking-widest text-gold mt-4">
                <span>{product.price}</span>
              </div>
            </div>

            {/* Showcase only, no add to cart */}
            <div className="p-6 border border-gold/20 bg-gold/5 text-center">
              <p className="font-mono text-[10px] tracking-widest text-gold/80 uppercase mb-4">
                Availability
              </p>
              <p className="font-body text-champagne italic mb-6">
                Currently available exclusively through our boutiques or by private invitation.
              </p>
              <Link to="/contact" className="btn-primary inline-flex">
                Enquire
              </Link>
            </div>

          </div>
        </div>

        {/* Next Product Navigation */}
        <div className="mt-32 pt-16 border-t border-gold/10 text-center">
          <span className="font-mono text-[10px] tracking-[0.15em] text-ivory/40 uppercase block mb-6">
            Next Formulation
          </span>
          <Link to={`/product/${nextProduct.id}`} className="group inline-flex flex-col items-center">
            <span className="font-display text-2xl md:text-4xl text-ivory uppercase tracking-wide group-hover:text-gold transition-colors">
              {nextProduct.name}
            </span>
            <span className="font-body text-champagne italic mt-2 group-hover:text-ivory transition-colors">
              {nextProduct.notes}
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
