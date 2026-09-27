// src/components/SpectralXRay.jsx
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 3 Looks with simple, clear details
const LOOKS = [
  {
    id: '01',
    name: 'Look 01: Long Wool Coat',
    subtitle: 'Classic Black Winter Coat',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    material: '100% Pure Virgin Wool',
    fit: 'Relaxed Tailored Fit',
    madeIn: 'Tokyo, Japan',
    hotspots: [
      {
        id: 1,
        top: '22%',
        left: '52%',
        label: 'Structured Collar',
        detail: 'Reinforced collar that stands up neatly and keeps wind out.',
      },
      {
        id: 2,
        top: '48%',
        left: '56%',
        label: 'Adjustable Waist',
        detail: 'Hidden inner drawcord so you can adjust the fit to your waist.',
      },
      {
        id: 3,
        top: '78%',
        left: '42%',
        label: 'Clean Bottom Hem',
        detail: 'Durable double-stitched hem that hangs straight and clean.',
      },
    ],
  },
  {
    id: '02',
    name: 'Look 02: Street Trench',
    subtitle: 'Lightweight Autumn Jacket',
    image:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    material: 'Heavy Cotton Gabardine',
    fit: 'Loose Oversized Fit',
    madeIn: 'Kyoto, Japan',
    hotspots: [
      {
        id: 1,
        top: '28%',
        left: '46%',
        label: 'Comfort Shoulders',
        detail: 'Raglan cut gives your arms full room to move comfortably.',
      },
      {
        id: 2,
        top: '54%',
        left: '60%',
        label: 'Magnetic Pockets',
        detail: 'Hidden magnetic snaps for quick and easy pocket closure.',
      },
      {
        id: 3,
        top: '82%',
        left: '50%',
        label: 'Back Vent Fold',
        detail: 'Back split lets you walk and sit easily without pulling.',
      },
    ],
  },
  {
    id: '03',
    name: 'Look 03: Winter Parka',
    subtitle: 'Heavy Cold-Weather Jacket',
    image:
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
    material: 'Heavy Technical Canvas',
    fit: 'Boxy Warm Fit',
    madeIn: 'Milan, Italy',
    hotspots: [
      {
        id: 1,
        top: '18%',
        left: '48%',
        label: 'High Warm Neck',
        detail: 'Lined with soft brushed cotton to keep your neck warm.',
      },
      {
        id: 2,
        top: '42%',
        left: '40%',
        label: 'Deep Hand Pockets',
        detail: 'Fleece-lined pockets to keep your hands warm in the cold.',
      },
      {
        id: 3,
        top: '74%',
        left: '54%',
        label: 'Windproof Shell',
        detail: 'Durable water-resistant coating to block rain and wind.',
      },
    ],
  },
]

const LOUPE_SIZE = 170
const ZOOM_LEVEL = 2.2

export default function SpectralXRay() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const stage3DRef = useRef(null)
  const imageFrameRef = useRef(null)
  const scanLineRef = useRef(null)
  const blueprintLayerRef = useRef(null)
  const loupeRef = useRef(null)
  const loupeImgRef = useRef(null)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeHotspot, setActiveHotspot] = useState(null)
  const [isHovering, setIsHovering] = useState(false)
  const [frameDimensions, setFrameDimensions] = useState({ width: 400, height: 600 })
  const [scanPercent, setScanPercent] = useState(0)

  const isAnimating = useRef(false)
  const currentLook = LOOKS[currentIndex]

  // Pinned scroll reveals blueprint
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=140%',
          pin: pinRef.current,
          scrub: 1.2,
          onUpdate: (self) => {
            setScanPercent(Math.round(self.progress * 100))
          },
        },
      })

      tl.fromTo(scanLineRef.current, { top: '0%' }, { top: '100%', ease: 'none' }, 0)
      tl.fromTo(
        blueprintLayerRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' },
        0
      )
    }, sectionRef)

    const updateDimensions = () => {
      if (imageFrameRef.current) {
        const rect = imageFrameRef.current.getBoundingClientRect()
        setFrameDimensions({ width: rect.width, height: rect.height })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    const timer = setTimeout(() => ScrollTrigger.refresh(), 300)

    return () => {
      window.removeEventListener('resize', updateDimensions)
      clearTimeout(timer)
      ctx.revert()
    }
  }, [currentIndex])

  // 3D Flip animation when clicking <- or ->
  const handleNavigate = (direction) => {
    if (isAnimating.current || !stage3DRef.current) return
    isAnimating.current = true
    setActiveHotspot(null)

    const nextIndex =
      direction > 0
        ? (currentIndex + 1) % LOOKS.length
        : (currentIndex - 1 + LOOKS.length) % LOOKS.length

    const rotAngle = direction > 0 ? -50 : 50

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false
      },
    })

    // Tilt into 3D space
    tl.to(stage3DRef.current, {
      rotateY: rotAngle,
      scale: 0.88,
      opacity: 0.2,
      filter: 'blur(8px)',
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentIndex(nextIndex)
        gsap.set(stage3DRef.current, {
          rotateY: -rotAngle,
          scale: 0.88,
          opacity: 0.2,
          filter: 'blur(8px)',
        })
      },
    })

    // Snap back forward smoothly
    tl.to(stage3DRef.current, {
      rotateY: 0,
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.6,
      ease: 'power3.out',
    })
  }

  // Smooth mouse movement for 2x magnifying loupe
  const handleMouseMove = (e) => {
    if (!imageFrameRef.current) return
    const rect = imageFrameRef.current.getBoundingClientRect()

    const rawX = e.clientX - rect.left
    const rawY = e.clientY - rect.top

    const clampedX = Math.max(0, Math.min(rawX, rect.width))
    const clampedY = Math.max(0, Math.min(rawY, rect.height))

    if (loupeRef.current) {
      gsap.to(loupeRef.current, {
        x: clampedX,
        y: clampedY,
        duration: 0.18,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    if (loupeImgRef.current) {
      const targetLeft = LOUPE_SIZE / 2 - clampedX * ZOOM_LEVEL
      const targetTop = LOUPE_SIZE / 2 - clampedY * ZOOM_LEVEL

      gsap.to(loupeImgRef.current, {
        left: targetLeft,
        top: targetTop,
        duration: 0.18,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full bg-[#fbfbfb] text-neutral-900 select-none shadow-[0_-25px_50px_rgba(0,0,0,0.06)]"
    >
      <div
        ref={pinRef}
        className="relative flex min-h-[100dvh] h-screen w-full items-center justify-center overflow-hidden px-4 sm:px-6"
      >
        <div
          className="relative flex h-full max-h-[92vh] w-full max-w-5xl flex-col lg:flex-row items-center justify-center lg:justify-between gap-4 sm:gap-6 lg:gap-8"
          style={{ perspective: '1600px' }}
        >
          {/* Mobile / Tablet Top Header (< lg) */}
          <div className="flex w-full flex-col items-center text-center lg:hidden">
            <span className="inline-block rounded-full border border-neutral-300 bg-neutral-100/80 px-4 py-1 text-[0.65rem] font-medium tracking-[0.25em] text-neutral-600 uppercase backdrop-blur-sm">
              Product Details
            </span>
            <h3 className="mt-1.5 font-serif text-lg sm:text-xl font-normal text-neutral-900">
              {currentLook.name}
            </h3>
            <p className="text-[11px] text-neutral-500">{currentLook.subtitle}</p>
          </div>

          {/* Left Column: Editorial Information (Desktop lg+) */}
          <div className="z-20 hidden w-64 flex-col gap-5 lg:flex">
            <div>
              <span className="inline-block rounded-full border border-neutral-300 bg-neutral-100/80 px-5 py-1.5 text-[0.7rem] font-medium tracking-[0.28em] text-neutral-600 uppercase backdrop-blur-sm">
                Product Details
              </span>
              <h3 className="mt-3 font-serif text-2xl font-normal text-neutral-900">
                {currentLook.name}
              </h3>
              <p className="mt-1 text-xs text-neutral-500">{currentLook.subtitle}</p>
            </div>

            <div className="flex flex-col gap-2 border-l border-neutral-300 pl-4 text-xs text-neutral-600">
              <p><strong className="font-medium text-neutral-900">Fabric:</strong> {currentLook.material}</p>
              <p><strong className="font-medium text-neutral-900">Fit:</strong> {currentLook.fit}</p>
              <p><strong className="font-medium text-neutral-900">Made In:</strong> {currentLook.madeIn}</p>
            </div>

            <p className="text-[11px] leading-relaxed text-neutral-400">
              Scroll down to scan inside the jacket. Move your mouse to zoom in 2x.
            </p>
          </div>

          {/* Center Column: 3D Image + Navigation */}
          <div className="flex flex-col items-center justify-center">
            <div
              ref={stage3DRef}
              className="will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                ref={imageFrameRef}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onMouseMove={handleMouseMove}
                className="relative h-[48vh] xs:h-[52vh] sm:h-[56vh] lg:h-[65vh] max-h-[560px] w-[clamp(16.5rem,75vw,26rem)] cursor-crosshair overflow-hidden border border-neutral-300/80 bg-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
              >
                {/* Regular Image */}
                <img
                  src={currentLook.image}
                  alt={currentLook.name}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover grayscale contrast-110"
                />

                {/* Inside Layer (Revealed on Scroll) */}
                <div
                  ref={blueprintLayerRef}
                  className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden will-change-[clip-path]"
                  style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
                >
                  <img
                    src={currentLook.image}
                    alt="Inside View"
                    className="h-full w-full object-cover filter"
                    style={{
                      filter: 'grayscale(100%) invert(90%) contrast(150%) brightness(70%)',
                    }}
                  />
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 rounded-full border border-neutral-300/80 bg-white/90 px-2.5 sm:px-3 py-0.5 sm:py-1 font-mono text-[8px] sm:text-[9px] font-medium tracking-wider text-neutral-800 backdrop-blur-sm shadow-xs">
                    INSIDE STITCHING VIEW
                  </div>
                </div>

                {/* Minimalist Scan Line */}
                <div
                  ref={scanLineRef}
                  className="pointer-events-none absolute left-0 z-30 h-[2px] w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-neutral-900 to-transparent shadow-[0_0_12px_rgba(0,0,0,0.4)]"
                >
                  <div className="absolute right-2 sm:right-3 -top-3.5 rounded-full border border-neutral-300 bg-white/95 px-2 py-0.5 font-mono text-[8px] sm:text-[9px] font-medium tracking-wider text-neutral-900 shadow-xs">
                    SCAN {scanPercent}%
                  </div>
                </div>

                {/* Hotspot Dots */}
                {currentLook.hotspots.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveHotspot(activeHotspot?.id === spot.id ? null : spot)
                    }}
                    className="group/pin absolute z-30 -translate-x-1/2 -translate-y-1/2 p-3 -m-3 touch-manipulation cursor-pointer"
                    style={{ top: spot.top, left: spot.left }}
                    aria-label={spot.label}
                  >
                    <span className="absolute inset-1 animate-ping rounded-full bg-neutral-900 opacity-25 pointer-events-none" />
                    <span className="relative flex size-4 items-center justify-center rounded-full border border-neutral-400 bg-neutral-900 text-[9px] font-bold text-white shadow-md transition-transform duration-300 group-hover/pin:scale-125">
                      +
                    </span>
                  </button>
                ))}

                {/* 2X Zoom Loupe (Active on Hover) */}
                <div
                  ref={loupeRef}
                  className={`pointer-events-none absolute top-0 left-0 z-40 hidden sm:block -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 border-neutral-900 shadow-[0_15px_40px_rgba(0,0,0,0.25)] transition-opacity duration-300 ${
                    isHovering ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    width: `${LOUPE_SIZE}px`,
                    height: `${LOUPE_SIZE}px`,
                  }}
                >
                  <img
                    ref={loupeImgRef}
                    src={currentLook.image}
                    alt="Zoom View"
                    className="pointer-events-none absolute max-w-none object-cover grayscale contrast-125"
                    style={{
                      width: `${frameDimensions.width * ZOOM_LEVEL}px`,
                      height: `${frameDimensions.height * ZOOM_LEVEL}px`,
                    }}
                  />
                  <div className="pointer-events-none absolute bottom-2.5 left-1/2 -translate-x-1/2 rounded-full border border-neutral-300/40 bg-neutral-900/90 px-2.5 py-0.5 font-mono text-[9px] text-white backdrop-blur-xs">
                    2X ZOOM
                  </div>
                </div>
              </div>
            </div>

            {/* Previous & Next Buttons */}
            <div className="mt-3.5 sm:mt-5 flex w-full max-w-[clamp(16.5rem,75vw,26rem)] items-center justify-between px-1 font-mono text-xs">
              <button
                onClick={() => handleNavigate(-1)}
                className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-neutral-300 bg-white px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs text-neutral-700 shadow-xs hover:border-neutral-900 hover:text-neutral-900 transition-all cursor-pointer"
              >
                <span>←</span> PREV
              </button>

              <div className="flex items-center gap-1 font-medium text-neutral-500 text-xs">
                <span className="font-bold text-neutral-900">0{currentIndex + 1}</span>
                <span>/</span>
                <span>0{LOOKS.length}</span>
              </div>

              <button
                onClick={() => handleNavigate(1)}
                className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-neutral-300 bg-white px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs text-neutral-700 shadow-xs hover:border-neutral-900 hover:text-neutral-900 transition-all cursor-pointer"
              >
                NEXT <span>→</span>
              </button>
            </div>

            {/* Mobile / Tablet Hotspot & Spec Inspector (< lg) */}
            <div className="mt-2.5 w-full max-w-[clamp(16.5rem,75vw,26rem)] lg:hidden">
              {activeHotspot ? (
                <div className="relative rounded-xl border border-neutral-300/90 bg-white/95 p-3 text-xs shadow-md backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-neutral-900 text-xs">
                      {activeHotspot.label}
                    </p>
                    <button
                      onClick={() => setActiveHotspot(null)}
                      className="p-1 text-xs text-neutral-400 hover:text-neutral-900 cursor-pointer"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-neutral-600">
                    {activeHotspot.detail}
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-100/90 px-3 py-1.5 text-[10.5px] text-neutral-500">
                  <span>Tap <strong>(+)</strong> to inspect details</span>
                  <span className="font-mono text-[9.5px] text-neutral-400">{currentLook.material}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Click Details Card (Desktop lg+) */}
          <div className="z-20 hidden w-64 flex-col gap-4 lg:flex">
            <span className="inline-block w-fit rounded-full border border-neutral-300 bg-neutral-100/80 px-5 py-1.5 text-[0.7rem] font-medium tracking-[0.28em] text-neutral-600 uppercase backdrop-blur-sm">
              Detail Inspector
            </span>

            {activeHotspot ? (
              <div className="rounded-2xl border border-neutral-300/80 bg-white p-5 text-xs shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-neutral-900">
                    {activeHotspot.label}
                  </p>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="text-sm text-neutral-400 transition-colors hover:text-neutral-900 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <p className="mt-2.5 leading-relaxed text-neutral-600">
                  {activeHotspot.detail}
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-neutral-200 bg-neutral-100/80 p-5 text-xs leading-relaxed text-neutral-500">
                Click any <strong>(+)</strong> pin on the garment to inspect tailoring specifications.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}