import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const HeadPhone = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Split the text into characters
      const split = SplitText.create('#section1 .heading', {
        type: 'chars, words, lines',
        mask: 'lines',
      });

      // 2. Hide headphone & shadow IMMEDIATELY so they don't sit on screen
      gsap.set('#headphone', { 
        autoAlpha: 0, 
        scale: 0.6, 
        y: 40 
      });
      gsap.set('#headphone-shadow', { 
        autoAlpha: 0, 
        scale: 0.4 
      });

      // 3. Create Timeline
      const tl = gsap.timeline();

      // STEP 1: Text characters scatter & assemble first
      tl.from(split.chars, {
        yPercent: () => gsap.utils.random(-100, 100),
        rotation: () => gsap.utils.random(-30, 30),
        autoAlpha: 0,
        ease: 'back.out(1.5)',
        stagger: {
          amount: 0.5,
          from: 'random',
        },
        duration: 1.5,
      })

      // STEP 2: Headphone PNG animates in ONLY AFTER text is assembled
      .to('#headphone', {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
      }, '+=0.1') // Small 0.1s breath after text finishes

      // Ground shadow expands in sync with the headphone
      .to('#headphone-shadow', {
        autoAlpha: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
      }, '<');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      id="section1" 
      ref={containerRef}
      className="section1 min-h-screen w-full bg-[var(--color-bg)] flex flex-col relative z-30 overflow-visible selection:bg-[var(--color-primary)] selection:text-[var(--color-white)]"
    >
      <section className="relative flex-1 w-full flex items-center justify-center px-4 select-none overflow-visible">

        {/* 1. Studio Lighting Effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[350px] sm:w-[550px] md:w-[750px] h-[350px] sm:h-[550px] md:h-[750px] rounded-full bg-[var(--color-white)]/60 blur-[100px]" />
        </div>

        {/* 2. Background Typography (Targeted by SplitText) */}
     <div className="heading text-center font-bold uppercase tracking-wider text-[var(--color-dark)] leading-[0.85] flex flex-col items-center justify-center gap-3 sm:gap-5 text-[3.25rem] sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[12rem] z-10 pointer-events-none">
          <span className="whitespace-nowrap">MODERN</span>
          <span className="whitespace-nowrap">HARMONY</span>
        </div>

        {/* 3. Headphone & Realistic Studio Shadows Layer */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 overflow-visible">
          
          {/* Main Headphone Image (Increased to w-[115%] for a big mobile view) */}
          <img
            id="headphone"
            src="/images/brown.png"
            alt="Modern Harmony Brown Headphones"
            className="opacity-0 w-[115%] sm:w-[580px] md:w-[700px] lg:w-[850px] xl:w-[980px] max-w-none object-contain 
             [filter:drop-shadow(6px_15px_8px_#00000030)_drop-shadow(0_25px_20px_#00000035)]
             select-none pointer-events-none will-change-transform"
          />

          {/* Ground Contact Shadows (adjusted mobile width to w-[290px] to stay aligned) */}
          <div 
            id="headphone-shadow"
            className="opacity-0 absolute bottom-[8%] sm:bottom-[10%] md:bottom-[12%] flex justify-between w-[290px] sm:w-[400px] md:w-[520px] lg:w-[620px] pointer-events-none will-change-transform"
          >
            <div className="w-28 sm:w-36 md:w-44 h-5 sm:h-7 bg-[var(--color-shadow1)]/40 rounded-full blur-xl" />
            <div className="w-28 sm:w-36 md:w-44 h-5 sm:h-7 bg-[var(--color-shadow2)]/40 rounded-full blur-xl" />
          </div>

        </div>

      </section>
    </div>
  );
};

export default HeadPhone;