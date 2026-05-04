import { useEffect, useRef, useCallback } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })
  const isHovering = useRef(false)
  const isClicking = useRef(false)

  const lerp = useCallback((a: number, b: number, n: number) => a + (b - a) * n, [])

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }

    const onEnterInteractive = () => {
      isHovering.current = true
      ring.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) scale(2)`
      ring.style.borderColor = 'rgba(50, 224, 196, 0.5)'
      ring.style.mixBlendMode = 'difference'
      dot.style.transform = `translate(${target.current.x}px, ${target.current.y}px) scale(0.5)`
    }

    const onLeaveInteractive = () => {
      isHovering.current = false
      ring.style.borderColor = 'rgba(245, 245, 245, 0.4)'
      ring.style.mixBlendMode = 'normal'
    }

    const onDown = () => {
      isClicking.current = true
      dot.style.transform = `translate(${target.current.x}px, ${target.current.y}px) scale(2.5)`
      ring.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) scale(0.6)`
    }

    const onUp = () => {
      isClicking.current = false
    }

    let raf: number
    const update = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.12)
      pos.current.y = lerp(pos.current.y, target.current.y, 0.12)

      dot.style.transform = `translate(${target.current.x}px, ${target.current.y}px) scale(${isClicking.current ? 2.5 : isHovering.current ? 0.5 : 1})`
      ring.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) scale(${isClicking.current ? 0.6 : isHovering.current ? 2 : 1})`

      raf = requestAnimationFrame(update)
    }

    // Find all interactive elements
    const addInteractiveListeners = () => {
      const interactives = document.querySelectorAll('a, button, [data-cursor-hover]')
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onEnterInteractive)
        el.addEventListener('mouseleave', onLeaveInteractive)
      })
      return interactives
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    // Delay to let DOM render
    const timeout = setTimeout(() => {
      addInteractiveListeners()
    }, 1000)

    raf = requestAnimationFrame(update)

    // Re-scan periodically for dynamically added elements
    const interval = setInterval(() => {
      addInteractiveListeners()
    }, 3000)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [lerp])

  // Only show custom cursor on non-touch devices
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    if (mq.matches) {
      document.documentElement.classList.add('custom-cursor-active')
    }
    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
      />
      <div
        ref={ringRef}
        className="cursor-ring"
      />
    </>
  )
}
