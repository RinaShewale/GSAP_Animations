import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let headingSplit;
    let paragraphSplit;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const heading = section.querySelector('h1');
      const paragraph = section.querySelector('p');
      const button = section.querySelector('button');
      const landingSpotlight = section.querySelector('#headphone-landing-s2 div');
      const ambientGlow = section.querySelector('.blur-\\[100px\\]');
      const featureCards = section.querySelectorAll('.feature-card');
      const featureBorder = section.querySelector('.border-t');

      // 1. SplitText Configurations
      if (heading) {
        headingSplit = SplitText.create(heading, {
          type: 'chars, words, lines',
          mask: 'lines',
        });
      }

      if (paragraph) {
        paragraphSplit = SplitText.create(paragraph, {
          type: 'lines',
          mask: 'lines',
        });
      }

      // 2. Cinematic Entrance Timeline
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Ambient lighting bloom
      if (ambientGlow) {
        entranceTl.fromTo(
          ambientGlow,
          { scale: 0.6, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 1.6, ease: 'power2.out' },
          0
        );
      }

      // Headphone landing area spotlight bloom
      if (landingSpotlight) {
        entranceTl.fromTo(
          landingSpotlight,
          { scale: 0.4, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 1.8, ease: 'power2.out' },
          0.1
        );
      }

      // Headline masked reveal
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
        );
      }

      // Paragraph lines masked reveal
      if (paragraphSplit?.lines) {
        entranceTl.from(
          paragraphSplit.lines,
          {
            yPercent: 120,
            autoAlpha: 0,
            duration: 1.1,
            stagger: 0.07,
            ease: 'power3.out',
          },
          0.3
        );
      }

      // Buy Now CTA Button pop
      if (button) {
        entranceTl.from(
          button,
          {
            scale: 0.9,
            autoAlpha: 0,
            duration: 0.9,
            ease: 'back.out(1.4)',
          },
          0.45
        );
      }

      // Feature border expand
      if (featureBorder) {
        entranceTl.from(
          featureBorder,
          {
            autoAlpha: 0,
            duration: 1,
            ease: 'power2.out',
          },
          0.4
        );
      }

      // 3 Feature Cards cascade in
      if (featureCards.length > 0) {
        entranceTl.from(
          featureCards,
          {
            y: 45,
            autoAlpha: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: 'power3.out',
          },
          0.45
        );
      }

      // 3. Multi-Plane Parallax (gentler on mobile so content doesn't collide)
      const leftCol = section.querySelector('.max-w-xl');
      const isMobile = window.innerWidth < 768;

      if (leftCol) {
        gsap.to(leftCol, {
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
          y: isMobile ? -10 : -30,
          ease: 'none',
        });
      }

      if (featureCards.length > 0) {
        gsap.to(featureCards, {
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
          y: isMobile ? -10 : -20,
          ease: 'none',
        });
      }

    }, sectionRef);

    return () => {
      if (headingSplit) headingSplit.revert();
      if (paragraphSplit) paragraphSplit.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section 
      id="section2" 
      ref={sectionRef}
      className="relative z-10 w-full min-h-screen bg-[var(--color-bg)] text-[var(--color-dark)] flex flex-col justify-between px-5 sm:px-12 md:px-16 lg:px-24 py-8 sm:py-8 lg:py-10 selection:bg-[var(--color-primary)] selection:text-[var(--color-white)] overflow-visible"
    >
      {/* Studio Lighting */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <div className="w-[300px] sm:w-[450px] md:w-[600px] h-[300px] sm:h-[450px] md:h-[600px] rounded-full bg-[var(--color-white)]/60 blur-[80px] sm:blur-[100px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-10 items-center my-auto">
        
        {/* Left Column: Heading, Paragraph, CTA */}
        <div className="flex flex-col items-start max-w-xl z-10">
          <h1 className="text-4xl min-[380px]:text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-normal uppercase tracking-[-0.02em] leading-[0.9] text-[var(--color-dark)] mb-3 sm:mb-4">
            TRUE<br />
            <span className="font-normal tracking-[-0.03em]">CLARITY</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[var(--color-dark)]/75 leading-relaxed font-normal mb-5 sm:mb-6 max-w-md">
            Engineered for clarity, comfort, and immersive sound — Audira redefines your listening experience with style and performance in perfect harmony.
          </p>

          {/* CTA Button with guaranteed brand fallback color */}
          <div className="flex items-center gap-4">
            <button className="group relative px-6 sm:px-7 py-2.5 sm:py-3 bg-[var(--color-button,#2e1a0f)] text-[var(--color-white,#faf6f0)] text-xs sm:text-sm font-medium tracking-wide rounded-xl shadow-[0_10px_25px_rgba(46,26,15,0.25)] hover:shadow-[0_15px_30px_rgba(46,26,15,0.35)] hover:bg-[#1a0f08] transition-all duration-300 transform active:scale-95 cursor-pointer overflow-hidden flex items-center gap-2.5 sm:gap-3">
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <span>Buy Now</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 stroke-current fill-none stroke-[2]" 
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Column: Headphone Landing Spotlight Slot */}
        <div 
          id="headphone-landing-s2"
          className="relative w-full h-[230px] sm:h-[300px] lg:h-[360px] flex items-center justify-center pointer-events-none my-2 sm:my-0"
        >
          <div className="w-[220px] sm:w-[320px] h-[220px] sm:h-[320px] rounded-full bg-[var(--color-white)]/50 blur-[60px] sm:blur-[70px]" />
        </div>

      </div>

      {/* Feature Cards (Compact on mobile so they don't push beyond the viewport) */}
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-4 pt-4 sm:pt-6 border-t border-[var(--color-dark)]/10">
        
        <div className="feature-card group relative backdrop-blur-md bg-[var(--color-white)]/25 border border-[var(--color-dark)]/15 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[var(--color-dark)]/40 uppercase">01 // Acoustics</span>
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]/40" />
          </div>
          <div>
            <h3 className="font-semibold text-xs sm:text-base uppercase tracking-wider text-[var(--color-dark)] mb-0.5 sm:mb-1">CRYSTAL-CLEAR AUDIO</h3>
            <p className="text-[11px] sm:text-sm text-[var(--color-dark)]/75">Hear every detail with balanced bass and studio-quality mids and highs.</p>
          </div>
        </div>

        <div className="feature-card group relative backdrop-blur-md bg-[var(--color-white)]/25 border border-[var(--color-dark)]/15 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[var(--color-dark)]/40 uppercase">02 // Ergonomics</span>
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]/40" />
          </div>
          <div>
            <h3 className="font-semibold text-xs sm:text-base uppercase tracking-wider text-[var(--color-dark)] mb-0.5 sm:mb-1">ALL-DAY COMFORT</h3>
            <p className="text-[11px] sm:text-sm text-[var(--color-dark)]/75">Lightweight build with plush ear cushions and ergonomic fit.</p>
          </div>
        </div>

        <div className="feature-card group relative backdrop-blur-md bg-[var(--color-white)]/25 border border-[var(--color-dark)]/15 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[var(--color-dark)]/40 uppercase">03 // Endurance</span>
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]/40" />
          </div>
          <div>
            <h3 className="font-semibold text-xs sm:text-base uppercase tracking-wider text-[var(--color-dark)] mb-0.5 sm:mb-1">40+ HOUR BATTERY LIFE</h3>
            <p className="text-[11px] sm:text-sm text-[var(--color-dark)]/75">Long-lasting performance, wherever you go.</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;