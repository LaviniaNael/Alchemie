import { useEffect, useRef, useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import NoiseOverlay from './components/NoiseOverlay'
import Navbar from './components/Navbar'
import Footer from './sections/Footer'

import Home from './pages/Home'
import CollectionPage from './pages/CollectionPage'
import ProductPage from './pages/ProductPage'
import StoryPage from './pages/StoryPage'
import ContactPage from './pages/ContactPage'

gsap.registerPlugin(ScrollTrigger)

// Luxury page transition wrapper
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      exit={{ opacity: 0, filter: 'blur(8px)', y: -20 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Smooth scroll wrapper that sets up Lenis
function ScrollWrapper({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenisRef.current = lenis

    lenis.on('scroll', () => {
      ScrollTrigger.update()
    })

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  // Automatically refresh ScrollTrigger when layout shifts (e.g., images loading)
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      ScrollTrigger.refresh()
    })
    observer.observe(document.body)
    return () => observer.disconnect()
  }, [])

  // Expose lenis to window so we can reset it from outside the wrapper if needed
  useEffect(() => {
    ;(window as any).lenis = lenisRef.current
  }, [])

  return <>{children}</>
}

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const location = useLocation()

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true)
  }, [])

  const handleExitComplete = () => {
    // Reset scroll position AFTER the old page finishes animating out,
    // before the new page animates in. This prevents layout jumping.
    window.scrollTo(0, 0)
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true })
    }
    ScrollTrigger.refresh()
    setTimeout(() => ScrollTrigger.refresh(), 100)
    setTimeout(() => ScrollTrigger.refresh(), 500)
  }

  return (
    <ScrollWrapper>
      <div className="relative min-h-screen bg-[#0F0D0B] overflow-hidden">
        {/* Preloader */}
        {!preloaderDone && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}

        {/* Navigation */}
        {preloaderDone && <Navbar />}

        {/* Content Routes */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <main className="flex-grow">
            <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/collection" element={<PageTransition><CollectionPage /></PageTransition>} />
                <Route path="/product/:id" element={<PageTransition><ProductPage /></PageTransition>} />
                <Route path="/story" element={<PageTransition><StoryPage /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          </main>
          
          <Footer />
        </div>

        {/* Global overlays */}
        <NoiseOverlay />
        <CustomCursor />
      </div>
    </ScrollWrapper>
  )
}
