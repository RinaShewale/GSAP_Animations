import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GRID_COLS, GRID_ROWS, gridPlacements } from '../data/gridPlacements'
import GridTile from './GridTile'

gsap.registerPlugin(ScrollTrigger)

export default function ImageGrid() {
  const gridContainerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray('.grid-tile')

      tiles.forEach((tile) => {
        const img = tile.querySelector('img')

        // Random horizontal drift and variable floating speeds for 3D depth
        const xTranslate = gsap.utils.random(-90, 90)
        const yParallax = gsap.utils.random(-50, -120) // Multi-layered float speeds
        const rotZ = gsap.utils.random(-12, 12)        // Subtle organic tilt
        const rotX = gsap.utils.random(15, 30)         // 3D tilt back into space

        // 1. Initial 3D state
        gsap.set(tile, {
          transformPerspective: 1200,
          transformOrigin: `${xTranslate < 0 ? 0 : 100}% 0%`,
          willChange: 'transform, opacity, filter',
        })

        // 2. Cinematic timeline tied to scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: tile,
            // Stays crisp and full size (scale 1) until it enters the upper 40% of viewport
            start: 'top 40%',
            // Reaches vanishing point as it leaves the top of the viewport
            end: 'bottom top',
            scrub: 1.4, // Buttery smooth momentum
          },
        })

        // Outer tile: 3D tilt, float, shrink, blur, and fade
        tl.to(
          tile,
          {
            scale: 0,
            xPercent: xTranslate,
            yPercent: yParallax,
            rotateZ: rotZ,
            rotateX: rotX,
            opacity: 0,
            filter: 'blur(8px)', // Cinematic camera depth of field
            ease: 'power2.in',
          },
          0
        )

        // Inner image counter-zoom (parallax lens effect)
        if (img) {
          tl.fromTo(
            img,
            { scale: 1.25 },
            { scale: 1.0, ease: 'none' },
            0
          )
        }
      })
    }, gridContainerRef)

    // Ensure ScrollTrigger recalibrates accurately after layout settles
    const timer = setTimeout(() => ScrollTrigger.refresh(), 300)

    return () => {
      clearTimeout(timer)
      ctx.revert()
    }
  }, [])

  return (
    <div
      id="image-grid"
      ref={gridContainerRef}
      className="relative z-0 grid w-full max-w-full overflow-x-clip bg-[#141414] py-[16vh] sm:py-[22vh] md:py-[30vh]"
      style={{
        perspective: '1400px', // Enables realistic 3D perspective
        gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${GRID_ROWS}, minmax(clamp(70px, 16vw, 180px), 1fr))`,
      }}
    >
      {gridPlacements.map((tile) => (
        <GridTile
          key={`${tile.r}-${tile.c}-${tile.imageId}`}
          r={tile.r}
          c={tile.c}
          imageId={tile.imageId}
          align={tile.align}
        />
      ))}
    </div>
  )
}