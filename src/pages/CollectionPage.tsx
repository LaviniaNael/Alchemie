import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import { products } from '../sections/Collection'

export default function CollectionPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    
    if (!pageRef.current) return
    const cards = pageRef.current.querySelectorAll('.collection-page-card')
    
    gsap.fromTo(cards,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  return (
    <div ref={pageRef} className="pt-32 pb-24 px-6 md:px-12 lg:px-16 min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 md:mb-24 text-center">
          <h1 className="font-display text-ivory text-4xl md:text-6xl font-light uppercase tracking-tight mb-4">
            The Complete Collection
          </h1>
          <p className="font-body text-champagne text-lg italic max-w-2xl mx-auto">
            All seven formulations of the Darkroom Collection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="collection-page-card group block opacity-0">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-6 bg-[#161310]">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to top, ${product.accent}20 0%, transparent 50%)` }}
                />
              </div>
              <div className="text-center px-4">
                <span className="font-mono text-[10px] tracking-[0.12em] uppercase block mb-2" style={{ color: product.accent }}>
                  {product.number}
                </span>
                <h2 className="font-display text-ivory text-xl font-medium tracking-wide uppercase mb-2 group-hover:text-gold transition-colors">
                  {product.name}
                </h2>
                <p className="font-body text-champagne text-sm italic mb-4">
                  {product.notes}
                </p>
                <div className="font-mono text-ivory/60 text-sm tracking-wider">
                  {product.price}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
