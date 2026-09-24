import React, { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import Nav from './components/Nav'
import HeadPhone from './pages/HeadPhone'
import About from './pages/About'
import HeadphoneShowcase from './pages/HeadphoneShowcase'
import TopPicks from './pages/TopPicks'
import PureEscapeSection from './pages/PureEscapeSection'
import Footer from './pages/Footer'
import BeatCraft from './pages/BeatCraft'

const App = () => {
  useEffect(() => {
    // 1. Lenis Smooth Scroll Setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const updateTicker = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    // 2. Dynamic Position Calculator
    const getPos = (element, xRatio, yRatio) => {
      if (!element) return { x: 0, y: 0 }
      const elRect = element.getBoundingClientRect()
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft

      const targetX = elRect.left + scrollLeft + element.offsetWidth * xRatio
      const targetY = elRect.top + scrollTop + element.offsetHeight * yRatio

      const startX = window.innerWidth * 0.5
      const startY = window.innerHeight * 0.5

      return {
        x: targetX - startX,
        y: targetY - startY,
      }
    }

    const mm = gsap.matchMedia()

    // ----------------------------------------------------
    // 3. DESKTOP (1025px+) — EXACT ORIGINAL CODE UNTOUCHED
    // ----------------------------------------------------
    mm.add('(min-width: 1025px)', () => {
      const headphone = document.querySelector('#headphone')
      const shadow = document.querySelector('#headphone-shadow')
      const s2 = document.querySelector('#section2')
      const s3 = document.querySelector('#section3')
      const s4 = document.querySelector('#section4')
      const s5 = document.querySelector('#section5')

      if (!headphone || !s2 || !s3 || !s4 || !s5) return

      gsap.set(headphone, { clearProps: 'all' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: s2,
          start: 'top bottom',
          endTrigger: s5,
          end: 'center center',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      })

      // STEP 1: Hero -> Section 2 (About)
      tl.to(headphone, {
        x: () => getPos(s2, 0.72, 0.38).x,
        y: () => getPos(s2, 0.72, 0.38).y,
        rotate: 90,
        scale: 1,
        ease: 'power1.inOut',
        duration: 1,
      })
      .to(shadow, {
        opacity: 0,
        duration: 0.4,
      }, 0)
      .to(headphone, { duration: 0.3 })

      // STEP 2: Section 2 -> Section 3 (MasterBeats)
      .to(headphone, {
        x: () => getPos(s3, 0.52, 0.52).x,
        y: () => getPos(s3, 0.52, 0.52).y,
        rotate: 30,
        scale: 0.95,
        ease: 'power1.inOut',
        duration: 1,
      })
      .to(headphone, { duration: 0.3 })

      // STEP 3: Section 3 -> Section 4 (HeadphoneShowcase)
      .to(headphone, {
        x: () => getPos(s4, 0.5, 0.5).x,
        y: () => getPos(s4, 0.5, 0.5).y,
        rotate: 0,
        scale: 0.95,
        ease: 'power1.inOut',
        duration: 1,
      })

      // STEP 4: Section 4 -> Section 5 (TopPicks)
      .to(headphone, {
        x: () => getPos(s5, 0.5, 0.43).x,
        y: () => getPos(s5, 0.5, 0.43).y,
        rotate: 0,
        scale: 0.45,
        ease: 'power1.inOut',
        duration: 1,
      })
    })

    // ----------------------------------------------------
    // 4. MOBILE & TABLET (<= 1024px) — GLITCH-FREE RESPONSIVE
    // ----------------------------------------------------
    mm.add('(max-width: 1024px)', () => {
      const headphone = document.querySelector('#headphone')
      const shadow = document.querySelector('#headphone-shadow')
      const s2 = document.querySelector('#section2')
      const s3 = document.querySelector('#section3')
      const s4 = document.querySelector('#section4')
      const s5 = document.querySelector('#section5')

      if (!headphone || !s2 || !s3 || !s4 || !s5) return

      gsap.set(headphone, { clearProps: 'all' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: s2,
          start: 'top bottom',
          endTrigger: s5,
          end: 'center center',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      })

      // STEP 1: Hero -> Section 2 (Centered horizontally on mobile)
      tl.to(headphone, {
        x: () => getPos(s2, 0.5, 0.38).x,
        y: () => getPos(s2, 0.5, 0.38).y,
        rotate: 90,
        scale: 0.95,
        ease: 'power1.inOut',
        duration: 1,
      })
      .to(shadow, {
        opacity: 0,
        duration: 0.4,
      }, 0)
      .to(headphone, { duration: 0.3 })

      // STEP 2: Section 2 -> Section 3 (MasterBeats)
      .to(headphone, {
        x: () => getPos(s3, 0.5, 0.5).x,
        y: () => getPos(s3, 0.5, 0.5).y,
        rotate: 30,
        scale: 0.95,
        ease: 'power1.inOut',
        duration: 1,
      })
      .to(headphone, { duration: 0.3 })

      // STEP 3: Section 3 -> Section 4 (HeadphoneShowcase)
      .to(headphone, {
        x: () => getPos(s4, 0.5, 0.5).x,
        y: () => getPos(s4, 0.5, 0.5).y,
        rotate: 0,
        scale: 0.95,
        ease: 'power1.inOut',
        duration: 1,
      })

      // STEP 4: Section 4 -> Section 5 (TopPicks: Big scale to match Audira One & Audira Max Pro)
      .to(headphone, {
        x: () => getPos(s5, 0.5, 0.5).x,
        y: () => getPos(s5, 0.5, 0.5).y,
        rotate: 0,
        scale: 0.95,
        ease: 'power1.inOut',
        duration: 1,
      })
    })

    ScrollTrigger.refresh()

    return () => {
      mm.revert()
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] overflow-x-clip">
      <Nav />
      <main className="w-full overflow-visible">
        <HeadPhone />
        <About />
        <BeatCraft />
        <HeadphoneShowcase />
        <TopPicks />
        <PureEscapeSection />
        <Footer />
      </main>
    </div>
  )
}

export default App