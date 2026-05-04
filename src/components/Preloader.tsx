import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)
  const wordsRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.to({ val: 0 }, {
      val: 100,
      duration: 2.4,
      ease: 'power2.inOut',
      onUpdate: function () {
        const v = Math.round(this.targets()[0].val)
        setProgress(v)
        if (percentRef.current) percentRef.current.textContent = String(v).padStart(3, '0')
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${v / 100})`
      },
    })

    tl.to(wordsRef.current, { opacity: 0, y: -15, duration: 0.3, ease: 'power2.in' }, '+=0.2')
    tl.to(containerRef.current, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 1,
      ease: 'power4.inOut',
      onComplete,
    })

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      style={{ clipPath: 'inset(0 0 0% 0)', backgroundColor: '#0F0D0B' }}
    >
      <div ref={wordsRef} className="text-center mb-14">
        <div className="font-display text-gold/40 uppercase text-sm tracking-[0.4em] mb-3">
          Alchemie Nº 7
        </div>
        <div
          className="font-display text-ivory uppercase font-light"
          style={{ fontSize: 'clamp(20px, 3.5vw, 40px)', letterSpacing: '-0.01em' }}
        >
          {progress < 30 && 'Distilling'}
          {progress >= 30 && progress < 60 && 'Composing'}
          {progress >= 60 && progress < 90 && 'Developing'}
          {progress >= 90 && 'Revealing'}
        </div>
      </div>

      <div className="w-[180px] md:w-[240px]">
        <div className="h-px bg-ivory/[0.06] w-full">
          <div ref={progressRef} className="h-full origin-left" style={{ transform: 'scaleX(0)', backgroundColor: '#C9A96E' }} />
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="font-mono text-[10px] text-champagne/40 tracking-[0.08em] uppercase">Loading</span>
          <span ref={percentRef} className="font-mono text-[10px] text-gold/60 tracking-[0.08em]">000</span>
        </div>
      </div>
    </div>
  )
}
