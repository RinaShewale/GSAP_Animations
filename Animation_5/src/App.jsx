// src/App.jsx
import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

import HeroOverlay from './components/HeroOverlay'
import ImageGrid from './components/ImageGrid'
import KineticSlatAssembler from './components/KineticSlatAssembler'
import SpectralXRay from './components/SpectralXRay'
import About from './components/About'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  useEffect(() => {
    // 1. Lenis Smooth Inertia
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const updateTicker = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#121212]">
      {/* 1. Cinematic 35mm Grain Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.035] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 2. Anamorphic Lens Vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-30"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(10,10,10,0.85) 100%)',
        }}
      />

      {/* 3. Hero Perspective Opening */}
      <ImageGrid />
      <HeroOverlay />

      {/* 4. NEW: Kinetic Shutter Matrix & Interlocking Typographic Ribbon */}
      <KineticSlatAssembler />

      {/* 5. NEW: Architectural Textile Scanner & Interactive Optical Loupe */}
      <SpectralXRay />

      {/* 6. Narrative Concluding Section */}
      <About />
      <Footer />
    </div>
  )
}

export default App