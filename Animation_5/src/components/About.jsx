// src/components/About.jsx
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    if (!textRef.current) return

    let isMounted = true
    let splitInstance = null
    let ctx = null

    // Store original plain text so cleanup/re-renders never corrupt the DOM
    const rawContent = textRef.current.textContent || ''

    const initAnimation = (words) => {
      if (!isMounted) return
      ctx = gsap.context(() => {
        // Cinematic scrubbed word reveal
        gsap.from(words, {
          yPercent: 120,
          opacity: 0,
          rotateX: -40,
          stagger: 0.02,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'center 45%',
            scrub: 1.2,
          },
        })
      }, sectionRef)
    }

    // Dynamically load SplitText or use graceful fallback
    import('gsap/SplitText')
      .then(({ SplitText }) => {
        if (!isMounted) return
        gsap.registerPlugin(SplitText)
        splitInstance = new SplitText(textRef.current, {
          type: 'lines,words',
          linesClass: 'overflow-hidden leading-tight pb-1',
        })
        initAnimation(splitInstance.words)
      })
      .catch(() => {
        if (!isMounted) return
        // Fallback: wrap words in spans
        const wordsArray = rawContent.trim().split(/\s+/)
        textRef.current.innerHTML = wordsArray
          .map(
            (w) =>
              `<span class="inline-block overflow-hidden"><span class="inline-block split-word">${w}&nbsp;</span></span>`
          )
          .join('')
        const words = textRef.current.querySelectorAll('.split-word')
        initAnimation(words)
      })

    return () => {
      isMounted = false
      if (ctx) ctx.revert()
      if (splitInstance) {
        splitInstance.revert()
      } else if (textRef.current) {
        textRef.current.textContent = rawContent
      }
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-30 flex min-h-screen w-full flex-col items-center justify-center bg-[#fbfbfb] px-6 py-32 text-neutral-900 shadow-[0_-25px_50px_rgba(0,0,0,0.06)]"
    >
      <div className="flex max-w-4xl flex-col items-center gap-8 text-center">
        <span className="rounded-full border border-neutral-300 bg-neutral-100/80 px-5 py-1.5 text-[0.7rem] font-medium tracking-[0.28em] text-neutral-600 uppercase backdrop-blur-sm">
          About
        </span>

        <p
          ref={textRef}
          style={{ perspective: '1000px' }}
          className="text-[clamp(1.85rem,4.2vw,3.4rem)] font-medium leading-[1.25] tracking-tight text-neutral-900 select-none"
        >
          Redefining contemporary silhouettes through uncompromising precision,
          atmospheric narratives, and sculptural tailoring engineered for timeless presence.
        </p>
      </div>
    </section>
  )
}