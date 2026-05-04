import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    window.scrollTo(0, 0)
    
    if (!pageRef.current) return
    const elements = pageRef.current.querySelectorAll('.animate-in')
    
    gsap.fromTo(elements,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  return (
    <div ref={pageRef} className="pt-32 pb-24 px-6 md:px-12 lg:px-16 min-h-screen bg-[#0F0D0B]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16 animate-in">
          <span className="font-mono text-gold/60 text-[11px] tracking-[0.2em] uppercase block mb-4">
            Private Client Services
          </span>
          <h1 className="font-display text-ivory text-4xl md:text-6xl font-light uppercase tracking-tight">
            Contact
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Form */}
          <div className="animate-in">
            <h2 className="font-display text-ivory text-2xl uppercase mb-8">
              Request an Invitation
            </h2>
            <p className="font-body text-champagne italic mb-8">
              Our collections are released in limited batches. Please leave your details to be notified of our next allocation.
            </p>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="font-mono text-ivory/60 text-[10px] tracking-widest uppercase block mb-2">
                  Name
                </label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-gold/20 pb-3 text-ivory font-body focus:outline-none focus:border-gold transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="font-mono text-ivory/60 text-[10px] tracking-widest uppercase block mb-2">
                  Email
                </label>
                <input 
                  type="email" 
                  className="w-full bg-transparent border-b border-gold/20 pb-3 text-ivory font-body focus:outline-none focus:border-gold transition-colors"
                  placeholder="Your email address"
                />
              </div>
              <div>
                <label className="font-mono text-ivory/60 text-[10px] tracking-widest uppercase block mb-2">
                  Message (Optional)
                </label>
                <textarea 
                  className="w-full bg-transparent border-b border-gold/20 pb-3 text-ivory font-body focus:outline-none focus:border-gold transition-colors resize-none h-24"
                  placeholder="How can we assist you?"
                />
              </div>
              <button type="submit" className="btn-primary mt-4">
                Submit Request
              </button>
            </form>
          </div>

          {/* Locations */}
          <div className="animate-in lg:pl-16 lg:border-l border-gold/10 flex flex-col justify-center">
            <h2 className="font-display text-ivory text-2xl uppercase mb-12">
              Our Locations
            </h2>
            
            <div className="space-y-12">
              <div>
                <h3 className="font-mono text-gold tracking-widest uppercase mb-3">Paris Boutique</h3>
                <p className="font-body text-champagne leading-relaxed">
                  14 Rue de Castiglione<br/>
                  75001 Paris, France<br/>
                  By appointment only
                </p>
              </div>
              
              <div>
                <h3 className="font-mono text-gold tracking-widest uppercase mb-3">Grasse Atelier</h3>
                <p className="font-body text-champagne leading-relaxed">
                  Route de Cabris<br/>
                  06130 Grasse, France<br/>
                  Private tours available
                </p>
              </div>

              <div>
                <h3 className="font-mono text-gold tracking-widest uppercase mb-3">London Stockist</h3>
                <p className="font-body text-champagne leading-relaxed">
                  Harrods, 5th Floor<br/>
                  87-135 Brompton Rd<br/>
                  London SW1X 7XL, UK
                </p>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-gold/10">
              <a href="mailto:info@alchemie7.com" className="font-display text-ivory text-xl hover:text-gold transition-colors block mb-2">
                info@alchemie7.com
              </a>
              <span className="font-mono text-champagne/40 tracking-widest text-[11px] uppercase">
                Expect a response within 48 hours
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
