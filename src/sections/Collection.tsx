import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

interface Product {
  id: string
  number: string
  name: string
  notes: string
  price: string
  image: string
  accent: string
}

export const products: Product[] = [
  { id: 'oud', number: 'Nº 01', name: 'Oud Noir', notes: 'Bergamot · Oud · Amber', price: '€ 180', image: '/archive-oud.jpg', accent: '#C9A96E' },
  { id: 'rose', number: 'Nº 02', name: 'Rose Obscura', notes: 'Damask Rose · Pepper · Musk', price: '€ 175', image: '/archive-rose.jpg', accent: '#B76E79' },
  { id: 'citrus', number: 'Nº 03', name: 'Citrus Alchemy', notes: 'Bergamot · Lemon · Vetiver', price: '€ 165', image: '/archive-citrus.jpg', accent: '#E2CFA0' },
  { id: 'amber', number: 'Nº 04', name: 'Amber Resin', notes: 'Amber · Vanilla · Sandalwood', price: '€ 190', image: '/archive-amber.jpg', accent: '#C17F59' },
  { id: 'musk', number: 'Nº 05', name: 'Musk Veil', notes: 'White Musk · Iris · Cedar', price: '€ 170', image: '/archive-musk.jpg', accent: '#9B8EC4' },
  { id: 'vetiver', number: 'Nº 06', name: 'Vetiver Root', notes: 'Vetiver · Patchouli · Oakmoss', price: '€ 185', image: '/archive-vetiver.jpg', accent: '#8A7E6B' },
  { id: 'sandalwood', number: 'Nº 07', name: 'Santal Sombre', notes: 'Sandalwood · Cardamom · Leather', price: '€ 195', image: '/archive-sandalwood.jpg', accent: '#C9A96E' },
]

function ProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const ctx = gsap.context(() => {
      // Image clip-path reveal on scroll
      gsap.fromTo(imageRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top bottom-=80',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Card fade
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top bottom-=60',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, cardRef)

    return () => ctx.revert()
  }, [])

  return (
    <Link to={`/product/${product.id}`}>
      <div
        ref={cardRef}
        className="group cursor-pointer opacity-0"
      >
        {/* Image */}
        <div ref={imageRef} className="relative overflow-hidden mb-5 rounded-sm" style={{ clipPath: 'inset(100% 0 0 0)' }}>
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </div>
          {/* Warm overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `linear-gradient(to top, ${product.accent}20 0%, transparent 50%)` }}
          />
          {/* Number watermark */}
          <span className="absolute bottom-3 right-4 font-display text-ivory/10 text-6xl md:text-7xl font-bold group-hover:text-ivory/20 transition-all duration-500">
            {product.number.replace('Nº ', '')}
          </span>
        </div>

        {/* Info */}
        <div className="px-1">
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase block mb-1" style={{ color: product.accent }}>
            {product.number}
          </span>
          <h3 className="font-display text-ivory text-lg md:text-xl font-medium tracking-tight mb-1.5 group-hover:text-gold transition-colors duration-300">
            {product.name}
          </h3>
          <p className="font-body text-champagne text-sm italic mb-3">
            {product.notes}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-mono text-ivory/70 text-sm">{product.price}</span>
            <span className="font-mono text-gold/50 text-[10px] tracking-[0.06em] uppercase group-hover:text-gold transition-colors duration-300 flex items-center gap-1.5">
              View
              <svg className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function Collection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Gold line expand
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top bottom-=80',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="relative w-full py-24 md:py-36 px-6 md:px-12 lg:px-16"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 md:mb-24 opacity-0">
          <span className="section-label block mb-5">The Specimen Archive</span>
          <h2
            className="font-display text-ivory font-light uppercase"
            style={{ fontSize: 'clamp(36px, 7vw, 80px)', letterSpacing: '-0.02em', lineHeight: 1 }}
          >
            Our Collection
          </h2>
          <div
            ref={lineRef}
            className="mt-6 w-16 h-px origin-left"
            style={{ background: 'linear-gradient(90deg, #C9A96E, transparent)', transform: 'scaleX(0)' }}
          />
          <p className="font-body text-champagne text-lg md:text-xl mt-6 max-w-[500px] leading-relaxed italic">
            Seven formulations. Seven temperaments. Each a complete olfactory narrative.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-16 md:mt-24">
          <Link
            to="/collection"
            className="btn-primary inline-flex"
          >
            <span>View Full Collection</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
