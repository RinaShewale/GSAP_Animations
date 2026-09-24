import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable Photo Card Component
 */
export const PhotoCard = ({
  src = "/images/headphone1.jpg",
  alt = "Headphones desk setup",
  className = "",
  aspectRatio = "aspect-[4/3]",
}) => {
  return (
    <div
      className={`inline-block bg-white p-2 sm:p-2.5 md:p-3 rounded-2xl sm:rounded-3xl shadow-[0_20px_40px_-10px_rgba(45,30,15,0.22),0_6px_14px_rgba(0,0,0,0.06)] border border-black/[0.03] transition-transform duration-300 ${className}`}
    >
      <div className={`overflow-hidden rounded-xl sm:rounded-2xl bg-[#e5ded6] ${aspectRatio}`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover block"
          loading="lazy"
        />
      </div>
    </div>
  );
};

const HeadphoneShowcase = ({
  images = {
    topLeft: {
      src: "/images/headphone3.jpg",
      alt: "Over-ear headphones on warm wooden desk",
    },
    bottomLeft: {
      src: "/images/headphone2.png",
      alt: "Vintage studio microphone",
    },
    right: {
      src: "/images/headphone1.jpg",
      alt: "DJ mixing on a turntable",
    },
  },
}) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const stage = section.querySelector('.max-w-5xl');
      const cards = stage ? stage.children : [];
      const topLeftCard = cards[0];
      const bottomLeftCard = cards[1];
      const rightCard = cards[2];
      const lights = section.querySelectorAll('.rounded-full');
      const cardImages = section.querySelectorAll('img');
      const isMobile = window.innerWidth < 768;

      // 1. Entrance Timeline
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      // Warm background lighting blooms
      if (lights.length > 0) {
        entranceTl.fromTo(
          lights,
          { scale: 0.6, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 1.6, stagger: 0.15, ease: 'power2.out' },
          0
        );
      }

      // Top-Left card glides in
      if (topLeftCard) {
        entranceTl.from(
          topLeftCard,
          {
            x: isMobile ? -40 : -80,
            y: isMobile ? -30 : -60,
            rotation: 16,
            scale: 0.85,
            autoAlpha: 0,
            duration: 1.4,
            ease: 'power3.out',
          },
          0.1
        );
      }

      // Bottom-Left card glides in
      if (bottomLeftCard) {
        entranceTl.from(
          bottomLeftCard,
          {
            x: isMobile ? -30 : -60,
            y: isMobile ? 45 : 90,
            rotation: -22,
            scale: 0.85,
            autoAlpha: 0,
            duration: 1.4,
            ease: 'power3.out',
          },
          0.2
        );
      }

      // Right Hero card sweeps in
      if (rightCard) {
        entranceTl.from(
          rightCard,
          {
            x: isMobile ? 50 : 100,
            y: isMobile ? 30 : 50,
            rotation: 18,
            scale: 0.88,
            autoAlpha: 0,
            duration: 1.5,
            ease: 'power3.out',
          },
          0.15
        );
      }

      // Inner photo lens scale settling
      if (cardImages.length > 0) {
        entranceTl.from(
          cardImages,
          {
            scale: 1.18,
            duration: 1.6,
            stagger: 0.08,
            ease: 'power3.out',
          },
          0.15
        );
      }

      // 2. Continuous Multi-Plane Scrubbed Parallax
      if (topLeftCard) {
        gsap.to(topLeftCard, {
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
          y: isMobile ? -20 : -45,
          x: isMobile ? -8 : -15,
          rotation: 5,
          ease: 'none',
        });
      }

      if (bottomLeftCard) {
        gsap.to(bottomLeftCard, {
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.8,
          },
          y: isMobile ? -30 : -75,
          x: isMobile ? 6 : 12,
          rotation: -13,
          ease: 'none',
        });
      }

      if (rightCard) {
        gsap.to(rightCard, {
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.4,
          },
          y: isMobile ? -25 : -55,
          x: isMobile ? 10 : 20,
          rotation: 11,
          ease: 'none',
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="section4" 
      ref={sectionRef}
      className="relative w-full min-h-[540px] sm:min-h-[660px] md:min-h-[740px] bg-[var(--color-bg,#ece5dd)] flex items-center justify-center px-4 sm:px-8 py-8 sm:py-16 md:py-20 overflow-visible select-none"
    >
      {/* 1. Studio Lighting Glow (overflow-hidden prevents mobile horizontal bleed) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <div className="w-[340px] sm:w-[560px] md:w-[780px] h-[340px] sm:h-[560px] md:h-[780px] rounded-full bg-white/70 blur-[90px] sm:blur-[150px]" />
        <div className="absolute w-[240px] sm:w-[440px] md:w-[580px] h-[240px] sm:h-[440px] md:h-[580px] rounded-full bg-[#dfd2c4]/60 blur-[70px] sm:blur-[120px]" />
      </div>

      {/* 2. Composition Stage: 3 Cards Framing the Center Headphone */}
      <div className="relative z-10 w-full max-w-5xl mx-auto h-[500px] sm:h-[560px] md:h-[620px]">

        {/* TOP-LEFT CARD */}
        <div className="absolute top-[2%] left-[1%] sm:left-[0%] lg:top-[1%] lg:left-[-7%] rotate-[7deg] lg:rotate-[8deg] z-20">
          <PhotoCard
            src={images.topLeft.src}
            alt={images.topLeft.alt}
            className="w-32 sm:w-52 md:w-64 lg:w-72"
          />
        </div>

        {/* BOTTOM-LEFT CARD */}
        <div className="absolute bottom-[3%] left-[3%] sm:left-[10%] lg:bottom-[6%] lg:left-[14%] -rotate-[7deg] lg:-rotate-[9deg] z-30">
          <PhotoCard
            src={images.bottomLeft.src}
            alt={images.bottomLeft.alt}
            className="w-36 sm:w-56 md:w-68 lg:w-80"
          />
        </div>

        {/* RIGHT HERO CARD */}
        <div className="absolute top-[10%] right-[1%] sm:right-[0%] lg:top-[10%] lg:right-[-9%] rotate-[6deg] lg:rotate-[7deg] z-10">
          <PhotoCard
            src={images.right.src}
            alt={images.right.alt}
            className="w-44 sm:w-72 md:w-96 lg:w-[440px]"
            aspectRatio="aspect-[4/3.1]"
          />
        </div>

      </div>

    </section>
  );
};

export default HeadphoneShowcase;