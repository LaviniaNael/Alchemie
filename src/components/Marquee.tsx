import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface MarqueeProps {
  text: string
  speed?: number
  direction?: 'left' | 'right'
  separator?: string
}

export default function Marquee({ text, speed = 1, direction = 'left', separator = '·' }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!innerRef.current || !containerRef.current) return

    const totalWidth = innerRef.current.scrollWidth / 2
    const baseX = direction === 'left' ? 0 : -totalWidth
    const endX = direction === 'left' ? -totalWidth : 0

    gsap.set(innerRef.current, { x: baseX })

    const tl = gsap.to(innerRef.current, { x: endX, duration: 28 / speed, ease: 'none', repeat: -1 })

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const mult = 1 + Math.min(Math.abs(self.getVelocity()) / 1000, 4)
        gsap.to(tl, { timeScale: mult, duration: 0.3 })
      },
    })

    return () => { tl.kill(); st.kill() }
  }, [direction, speed])

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden py-6 md:py-10"
      style={{ borderTop: '1px solid rgba(201,169,110,0.06)', borderBottom: '1px solid rgba(201,169,110,0.06)' }}
    >
      <div ref={innerRef} className="flex whitespace-nowrap will-change-transform">
        {Array(8).fill(null).map((_, i) => (
          <span
            key={i}
            className="font-display text-ivory/[0.04] uppercase font-medium mx-4 md:mx-8 select-none"
            style={{ fontSize: 'clamp(40px, 7vw, 80px)', letterSpacing: '-0.02em' }}
          >
            {text} <span className="text-gold/[0.08] mx-2">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
