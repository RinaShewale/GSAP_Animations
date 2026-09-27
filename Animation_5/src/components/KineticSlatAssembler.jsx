// src/components/KineticSlatAssembler.jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SLAT_COUNT = 5

export default function KineticSlatAssembler({
  image = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85',
}) {
  const containerRef = useRef(null)
  const slatsRef = useRef([])
  const ribbonRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial positions for the 5 vertical slices
      slatsRef.current.forEach((slat, index) => {
        if (!slat) return
        const isOdd = index % 2 === 1
        gsap.set(slat, {
          yPercent: isOdd ? 120 : -120,
          rotateY: isOdd ? 20 : -20,
          opacity: 0.3,
          scale: 0.95,
        })
      })

      // 2. Slices assemble together when scrolling
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'center 45%',
          scrub: 1.2,
        },
      })

      slatsRef.current.forEach((slat) => {
        if (!slat) return
        tl.to(
          slat,
          {
            yPercent: 0,
            rotateY: 0,
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
          },
          0
        )
      })

      // 3. Simple text scrolling behind
      if (ribbonRef.current) {
        gsap.to(ribbonRef.current, {
          xPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Mouse tilt on hover
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1

    slatsRef.current.forEach((slat, idx) => {
      if (!slat) return
      const factor = (idx - 2) * 0.4
      gsap.to(slat, {
        rotateY: normX * 10 + factor * 5,
        rotateX: -normY * 6,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    })
  }

  // Touch tilt for mobile devices
  const handleTouchMove = (e) => {
    if (!containerRef.current || !e.touches[0]) return
    const touch = e.touches[0]
    handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY })
  }

  const handleMouseLeave = () => {
    slatsRef.current.forEach((slat) => {
      if (!slat) return
      gsap.to(slat, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    })
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      className="relative z-10 flex min-h-[100dvh] md:min-h-[120vh] w-full flex-col justify-center overflow-hidden bg-[#fbfbfb] py-14 sm:py-18 md:py-20 text-neutral-900 select-none shadow-[0_-25px_50px_rgba(0,0,0,0.06)]"
    >
      {/* Editorial Header matching About theme */}
      <div className="mx-auto mb-6 sm:mb-8 md:mb-10 flex w-full max-w-5xl items-end justify-between px-4 sm:px-6 text-neutral-600">
        <div>
          <span className="inline-block rounded-full border border-neutral-300 bg-neutral-100/80 px-4 sm:px-5 py-1 sm:py-1.5 text-[0.65rem] sm:text-[0.7rem] font-medium tracking-[0.25em] sm:tracking-[0.28em] text-neutral-600 uppercase backdrop-blur-sm">
            New Drop
          </span>
          <h2 className="mt-2.5 sm:mt-4 text-xl sm:text-2xl font-medium tracking-tight text-neutral-900 md:text-4xl">
            Winter Collection
          </h2>
        </div>
        <div className="text-right">
          <p className="font-mono text-[10px] sm:text-xs tracking-widest text-neutral-500 uppercase">
            Limited Edition
          </p>
        </div>
      </div>

      {/* Slices Chamber */}
      <div className="relative mx-auto flex h-[48vh] sm:h-[56vh] md:h-[65vh] max-h-[640px] min-h-[310px] sm:min-h-[380px] w-full max-w-5xl items-center justify-center px-4 sm:px-6">
        {/* Subtle Background Kinetic Text */}
        <div
          ref={ribbonRef}
          className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap font-sans text-[clamp(3rem,11vw,9rem)] font-black text-neutral-900/[0.04] uppercase"
        >
          NEW COLLECTION • WINTER DROP • MODERN JACKETS • STUDIO SILHOUETTES •
        </div>

        {/* 5 Slices */}
        <div
          className="relative flex h-full w-full items-stretch justify-center gap-1 sm:gap-1.5 md:gap-2"
          style={{ perspective: '1200px' }}
        >
          {Array.from({ length: SLAT_COUNT }).map((_, index) => (
            <div
              key={index}
              ref={(el) => (slatsRef.current[index] = el)}
              className="relative h-full flex-1 overflow-hidden border border-neutral-300/80 bg-neutral-200 shadow-md transition-[flex] duration-500 hover:flex-[1.25] will-change-transform"
            >
              <img
                src={image}
                alt=""
                draggable={false}
                className="pointer-events-none absolute top-0 h-full max-w-none object-cover grayscale contrast-110"
                style={{
                  width: `${SLAT_COUNT * 100}%`,
                  left: `-${index * 100}%`,
                }}
              />
              <span className="pointer-events-none absolute bottom-2 left-1.5 sm:bottom-3 sm:left-3 rounded-full border border-neutral-300/80 bg-white/85 px-1.5 sm:px-2 py-0.5 font-mono text-[8px] sm:text-[9px] font-semibold text-neutral-800 backdrop-blur-xs">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="mx-auto mt-4 sm:mt-6 flex w-full max-w-5xl items-center justify-between px-4 sm:px-6 font-mono text-[10px] sm:text-xs text-neutral-500">
        <span>
          <span className="hidden sm:inline">[ HOVER TO EXPAND ]</span>
          <span className="sm:hidden">[ TOUCH OR DRAG ]</span>
        </span>
        <span>SCROLL TO EXPLORE MORE</span>
      </div>
    </section>
  )
}