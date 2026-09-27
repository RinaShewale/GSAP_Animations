// src/components/HeroOverlay.jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroOverlay() {
  const overlayRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in smoothly at start
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'power3.out' }
      )
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, letterSpacing: '0.1em' },
        { opacity: 0.9, letterSpacing: '0.25em', duration: 1.5, delay: 0.2, ease: 'power3.out' }
      )

      // Fade out as you scroll down
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#image-grid',
          start: 'top top',
          end: '35% top',
          scrub: 1.2,
        },
      })

      tl.to(
        titleRef.current,
        { scale: 1.1, opacity: 0, y: -40, filter: 'blur(8px)', ease: 'power2.in' },
        0
      )
      tl.to(
        subtitleRef.current,
        { opacity: 0, y: -20, filter: 'blur(4px)', ease: 'power2.in' },
        0
      )
    }, overlayRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center will-change-transform md:pl-16"
    >
      <div className="pointer-events-auto flex flex-col items-center gap-4 px-6 text-center md:items-start md:text-left">
        <h1
          ref={titleRef}
          className="font-sans text-[clamp(2.8rem,9vw,5.5rem)] font-extrabold leading-none tracking-tight text-white uppercase select-none drop-shadow-2xl"
        >
          Studio Black
        </h1>
        <p
          ref={subtitleRef}
          className="max-w-md text-xs font-normal tracking-[0.25em] text-white/80 uppercase select-none md:text-sm"
        >
          Modern Clothes & Everyday Style
        </p>
      </div>
    </div>
  )
}