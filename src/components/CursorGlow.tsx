import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return

    const onMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX
      posRef.current.y = e.clientY
    }

    let raf: number
    const update = () => {
      glow.style.transform = `translate(${posRef.current.x - 100}px, ${posRef.current.y - 100}px)`
      raf = requestAnimationFrame(update)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(update)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="cursor-glow"
    />
  )
}
