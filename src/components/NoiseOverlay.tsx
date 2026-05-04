import { useEffect, useRef } from 'react'

export default function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio, 2)
    const size = 512
    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    let animationId: number
    let frameCount = 0

    const draw = () => {
      frameCount++
      if (frameCount % 2 !== 0) {
        animationId = requestAnimationFrame(draw)
        return
      }

      ctx.clearRect(0, 0, size, size)

      const colors = ['#050505', '#0a0a0a', '#111111']

      for (let i = 0; i < 8000; i++) {
        const x = Math.random() * size
        const y = Math.random() * size
        const w = 1 + Math.random() * 1.5
        const h = 1 + Math.random() * 1.5
        const color = colors[Math.floor(Math.random() * colors.length)]
        const opacity = 0.015 + Math.random() * 0.025

        ctx.fillStyle = color
        ctx.globalAlpha = opacity
        ctx.fillRect(x, y, w, h)
      }

      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'overlay',
        opacity: 0.5,
      }}
    />
  )
}
