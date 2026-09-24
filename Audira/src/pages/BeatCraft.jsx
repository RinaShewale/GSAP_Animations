import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const BeatCraft = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    let headingSplit
    let textSplit

    const ctx = gsap.context(() => {
      const section = sectionRef.current
      const heading = section.querySelector('h1')
      const lightGlow = section.querySelector('.blur-\\[100px\\]')
      const videoWrapper = section.querySelector('.aspect-video')
      const video = section.querySelector('video')
      const paragraph = section.querySelector('p')
      const textContainer = paragraph?.parentElement

      // 1. SplitText setups
      if (heading) {
        headingSplit = SplitText.create(heading, {
          type: 'chars, words, lines',
          mask: 'lines',
        })
      }

      if (paragraph) {
        textSplit = SplitText.create(paragraph, {
          type: 'lines',
          mask: 'lines',
        })
      }

      // 2. Cinematic Entrance Timeline
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      // Studio light blooms in
      if (lightGlow) {
        entranceTl.fromTo(
          lightGlow,
          { scale: 0.5, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 1.6, ease: 'power2.out' },
          0
        )
      }

      // Title characters masked slide-up
      if (headingSplit?.chars) {
        entranceTl.from(
          headingSplit.chars,
          {
            yPercent: 125,
            autoAlpha: 0,
            duration: 1.2,
            stagger: 0.025,
            ease: 'power4.out',
          },
          0.1
        )
      }

      // Video card glides in with momentum from the bottom-left
      if (videoWrapper) {
        entranceTl.from(
          videoWrapper,
          {
            x: window.innerWidth < 768 ? -25 : -60,
            y: 50,
            scale: 0.92,
            autoAlpha: 0,
            duration: 1.4,
            ease: 'power3.out',
          },
          0.25
        )

        // Subtle inner lens zoom settling
        if (video) {
          entranceTl.from(
            video,
            {
              scale: 1.15,
              duration: 1.6,
              ease: 'power3.out',
            },
            0.25
          )
        }
      }

      // Paragraph lines masked reveal
      if (textSplit?.lines) {
        entranceTl.from(
          textSplit.lines,
          {
            yPercent: 120,
            autoAlpha: 0,
            duration: 1.1,
            stagger: 0.08,
            ease: 'power3.out',
          },
          0.4
        )
      }

      // 3. Multi-Layer Depth Parallax (Gentler on mobile to prevent overlap)
      const isMobile = window.innerWidth < 768

      if (heading) {
        gsap.to(heading, {
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
          y: isMobile ? -15 : -40,
          ease: 'none',
        })
      }

      if (videoWrapper) {
        gsap.to(videoWrapper, {
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.6,
          },
          y: isMobile ? -20 : -60,
          ease: 'none',
        })
      }

      if (textContainer) {
        gsap.to(textContainer, {
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
          y: isMobile ? -15 : -30,
          ease: 'none',
        })
      }

    }, sectionRef)

    return () => {
      if (headingSplit) headingSplit.revert()
      if (textSplit) textSplit.revert()
      ctx.revert()
    }
  }, [])

  return (
    <section 
      id="section3" 
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[var(--color-bg)] text-[var(--color-dark)] flex flex-col justify-between px-5 sm:px-12 md:px-16 lg:px-24 py-8 md:py-12 selection:bg-[var(--color-primary)] selection:text-[var(--color-white)] overflow-visible"
    >
      
      {/* 1. Studio Lighting Effect (overflow-hidden prevents mobile horizontal scroll) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <div className="w-[300px] sm:w-[550px] md:w-[750px] h-[300px] sm:h-[550px] md:h-[750px] rounded-full bg-[var(--color-white)]/60 blur-[80px] sm:blur-[100px]" />
      </div>

      {/* 2. Top Typography: MASTERBEATS (Single-line on all screens) */}
      <div className="relative z-10 w-full text-center select-none pt-2 sm:pt-4">
        <h1 className="font-extrabold uppercase tracking-tight text-[var(--color-dark)] leading-[0.85] text-4xl min-[380px]:text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]">
          BEATCRAFT
        </h1>
      </div>

      {/* 3. Main Asymmetrical Content Grid */}
      <div className="relative z-10 w-full flex-1 flex flex-col lg:flex-row justify-between items-center lg:items-end gap-6 sm:gap-8 my-auto py-4 sm:py-8">
        
        {/* Left: Video Card */}
        <div className="w-full max-w-[340px] sm:max-w-none sm:w-[340px] md:w-[400px] lg:w-[440px] aspect-video rounded-2xl overflow-hidden bg-black/5 shadow-2xl self-center lg:self-start mt-2 sm:mt-6 transition-transform">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src="/images/Headphone.mp4"
            poster="/images/beats-poster.jpg"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Mobile Spacer & Soft Spotlight: Gives the big tilted headphone a dedicated visual zone */}
        <div 
          id="headphone-landing-s3" 
          className="w-full h-[180px] sm:h-[220px] lg:hidden flex items-center justify-center pointer-events-none -my-2"
        >
          <div className="w-[200px] sm:w-[260px] h-[200px] sm:h-[260px] rounded-full bg-[var(--color-white)]/40 blur-[60px]" />
        </div>

        {/* Right: Editorial Text */}
        <div className="w-full max-w-[420px] sm:max-w-md lg:max-w-[480px] xl:max-w-[540px] self-center lg:self-end pb-2 text-center lg:text-left">
          <p className="text-sm sm:text-base md:text-lg text-[var(--color-para,var(--color-dark,#281b12))]/85 leading-relaxed font-normal tracking-wide">
           Every beat, carefully crafted. Hand-finished leather, brushed-gold detailing and custom-tuned 50mm acoustic drivers deliver deep, controlled bass and silky, effortless clarity at every volume level. Wrapped in plush memory-foam cushions, it keeps you comfortable and completely immersed from the first note to the last.
          </p>
        </div>

      </div>

    </section>
  )
}

export default BeatCraft