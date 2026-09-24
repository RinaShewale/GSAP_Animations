import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Reusable Photo Card with uniform white frame,
 * soft rounded corners, and warm ambient drop-shadow.
 * Supports image (default) or video media.
 */
export const PhotoCard = ({
  src,
  alt = "Headphone acoustic experience",
  className = "",
  aspectRatio = "aspect-[4/3]",
  type = "image", // Default to "image" so image cards aren't treated as videos
  poster,
}) => {
  const videoRef = useRef(null);

  // Fix: Programmatically enforce muted and playsInline for autoplay policy compliance
  useEffect(() => {
    if (type === "video" && videoRef.current) {
      const video = videoRef.current;
      video.defaultMuted = true;
      video.muted = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Autoplay prevented by browser or user policy
          console.warn("Video autoplay prevented:", error);
        });
      }
    }
  }, [src, type]);

  return (
    <div
      className={`relative bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl shadow-[0_20px_45px_-12px_rgba(50,30,15,0.22),0_6px_16px_rgba(0,0,0,0.06)] border border-black/[0.04] will-change-transform ${className}`}
    >
      <div className={`overflow-hidden rounded-xl sm:rounded-2xl bg-[#ebe3d9] ${aspectRatio} relative`}>
        {type === "video" ? (
          <video
            ref={videoRef}
            poster={poster}
            aria-label={alt}
            className="w-full h-full object-cover block will-change-transform"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            {/* Using <source> tag for broader codec compatibility */}
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover block will-change-transform"
            loading="lazy"
          />
        )}
        {/* Soft studio light reflex overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20 pointer-events-none opacity-60" />
      </div>
    </div>
  );
};

const DEFAULT_IMAGES = {
  heroPod: {
    type: "video",
    src: "/images/Headphone2.mp4", // Ensure this path exists in your /public directory or use a valid URL
    poster: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=85",
    alt: "Listener immersed in warm ambient acoustic pod",
  },
  topLeft: {
    type: "image",
    src: "/images/headphone4.png",
    alt: "Over-ear luxury headphones on warm wooden desk",
  },
  bottomLeft: {
    type: "image",
    src: "/images/headphone6.jpg",
    alt: "Precision acoustic hardware and studio mixing",
  },
};

/**
 * Pure Escape Section
 */
export const PureEscapeSection = ({
  headline = ["PURE", "ESCAPE"],
  paragraph1 = "Step into a world where every note feels alive. Audira headphones are engineered to create a sound experience that surrounds you—deep, rich, and breathtaking.",
  paragraph2 = "Whether you're working, relaxing, or moving, our design blends comfort and clarity for every lifestyle. You don't just listen — you feel the moment.",
  images = DEFAULT_IMAGES,
}) => {
  const sectionRef = useRef(null);
  const heroPodRef = useRef(null);
  const topLeftRef = useRef(null);
  const bottomLeftRef = useRef(null);
  const textColumnRef = useRef(null);

  useEffect(() => {
    let headlineSplit;
    let paragraphsSplit;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const heading = section.querySelector('h2');
      const paragraphsContainer = section.querySelector('.space-y-5');
      const ambientLights = section.querySelectorAll('.rounded-full');
      const cardMedias = section.querySelectorAll('img, video');

      // Inner card elements (handles entrance transforms cleanly without conflicting with outer parallax scrub)
      const heroCardInner = heroPodRef.current?.firstElementChild;
      const topLeftCardInner = topLeftRef.current?.firstElementChild;
      const bottomLeftCardInner = bottomLeftRef.current?.firstElementChild;

      // Enable 3D hardware acceleration and perspective on card wrappers
      gsap.set([heroPodRef.current, topLeftRef.current, bottomLeftRef.current], {
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
        force3D: true,
      });

      // 1. SplitText Configurations (safely initialized)
      try {
        if (heading && SplitText) {
          headlineSplit = SplitText.create(heading, {
            type: 'chars, words, lines',
            mask: 'lines',
          });
        }

        if (paragraphsContainer && SplitText) {
          paragraphsSplit = SplitText.create(paragraphsContainer.querySelectorAll('p'), {
            type: 'lines',
            mask: 'lines',
          });
        }
      } catch (err) {
        console.warn('SplitText plugin error:', err);
      }

      // 2. Cinematic Entrance Timeline (Triggers when entering viewport)
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      });

      if (ambientLights.length > 0) {
        entranceTl.fromTo(
          ambientLights,
          { scale: 0.55, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 1.8, stagger: 0.12, ease: 'power2.out' },
          0
        );
      }

      if (headlineSplit?.chars && headlineSplit.chars.length > 0) {
        entranceTl.from(
          headlineSplit.chars,
          {
            yPercent: 125,
            autoAlpha: 0,
            duration: 1.2,
            stagger: 0.025,
            ease: 'power4.out',
          },
          0.1
        );
      } else if (heading) {
        entranceTl.from(
          heading,
          { y: 40, autoAlpha: 0, duration: 1.1, ease: 'power3.out' },
          0.1
        );
      }

      if (paragraphsSplit?.lines && paragraphsSplit.lines.length > 0) {
        entranceTl.from(
          paragraphsSplit.lines,
          {
            yPercent: 120,
            autoAlpha: 0,
            duration: 1.1,
            stagger: 0.06,
            ease: 'power3.out',
          },
          0.3
        );
      } else if (paragraphsContainer) {
        entranceTl.from(
          paragraphsContainer.querySelectorAll('p'),
          { y: 30, autoAlpha: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' },
          0.3
        );
      }

      // Cards Entrance: reveal inner card containers so outer wrapper parallax stays glitch-free
      if (heroCardInner) {
        entranceTl.from(
          heroCardInner,
          {
            y: 80,
            scale: 0.88,
            autoAlpha: 0,
            duration: 1.5,
            ease: 'power3.out',
          },
          0.2
        );
      }

      if (topLeftCardInner) {
        entranceTl.from(
          topLeftCardInner,
          {
            y: -60,
            x: -40,
            scale: 0.86,
            autoAlpha: 0,
            duration: 1.4,
            ease: 'power3.out',
          },
          0.25
        );
      }

      if (bottomLeftCardInner) {
        entranceTl.from(
          bottomLeftCardInner,
          {
            y: 70,
            x: -30,
            scale: 0.86,
            autoAlpha: 0,
            duration: 1.4,
            ease: 'power3.out',
          },
          0.3
        );
      }

      // 3. Multi-Plane 3D Parallax Scrubbing (Silky-smooth continuous scroll response)
      
      // Hero Pod Card (Centerpiece focal anchor)
      if (heroPodRef.current) {
        gsap.fromTo(
          heroPodRef.current,
          {
            y: 45,
            x: -10,
            rotationZ: 1.5,
            rotationY: 4,
            rotationX: -2,
          },
          {
            y: -75,
            x: 15,
            rotationZ: 4.5,
            rotationY: -4,
            rotationX: 3,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // Top-Left Card (Background floating layer - drifts higher and twists inwards)
      if (topLeftRef.current) {
        gsap.fromTo(
          topLeftRef.current,
          {
            y: 50,
            x: 12,
            rotationZ: -4,
            rotationY: -5,
            rotationX: 3,
          },
          {
            y: -105,
            x: -18,
            rotationZ: -12,
            rotationY: 6,
            rotationX: -4,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.6,
            },
          }
        );
      }

      // Bottom-Left Card (Foreground high-speed parallax layer - sweeps dynamically)
      if (bottomLeftRef.current) {
        gsap.fromTo(
          bottomLeftRef.current,
          {
            y: 65,
            x: -12,
            rotationZ: 5,
            rotationY: 5,
            rotationX: -3,
          },
          {
            y: -135,
            x: 16,
            rotationZ: 13,
            rotationY: -6,
            rotationX: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.9,
            },
          }
        );
      }

      // 4. Internal Lens / Window Parallax (Images and video slide inside their frames)
      if (cardMedias.length > 0) {
        cardMedias.forEach((media, idx) => {
          gsap.fromTo(
            media,
            { yPercent: -7, scale: 1.12 },
            {
              yPercent: 7,
              scale: 1.04,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.4 + idx * 0.2,
              },
            }
          );
        });
      }

      // 5. Dynamic Ambient Glow Tracking (Warm studio spotlight tracks scroll position)
      if (ambientLights.length > 0) {
        gsap.to(ambientLights, {
          y: -75,
          x: (i) => (i === 1 ? -35 : 30),
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2.0,
          },
        });
      }

      // 6. Text Column Parallax
      if (textColumnRef.current) {
        gsap.to(textColumnRef.current, {
          y: -35,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.4,
          },
        });
      }
    }, sectionRef);

    return () => {
      if (headlineSplit) headlineSplit.revert();
      if (paragraphsSplit) paragraphsSplit.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="section5"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[var(--color-bg,#F7F2EB)] flex items-center justify-center px-4 sm:px-8 lg:px-14 py-16 lg:py-24 overflow-hidden select-none font-sans"
    >
      {/* AMBIENT STUDIO LIGHTING GLOW */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[700px] lg:w-[920px] h-[480px] sm:h-[700px] lg:h-[920px] rounded-full bg-white/75 blur-[130px]" />
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] lg:w-[650px] h-[340px] sm:h-[500px] lg:h-[650px] rounded-full bg-[var(--color-ambient,#EADCCB)] opacity-60 blur-[100px]" />
        <div className="absolute top-1/3 left-1/4 w-[280px] h-[280px] rounded-full bg-[#FF7D29]/15 blur-[90px]" />
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* LEFT COLUMN: 3-IMAGE/VIDEO OVERLAPPING COMPOSITION */}
        <div className="lg:col-span-7 relative w-full h-[460px] sm:h-[540px] md:h-[600px] lg:h-[620px] flex items-center justify-center order-2 lg:order-1 [perspective:1200px]">
          {/* 1. HERO POD CARD (Video) */}
          <div
            ref={heroPodRef}
            className="absolute right-[2%] sm:right-[6%] top-[6%] sm:top-[8%] z-10 rotate-[2deg] sm:rotate-[3deg]"
          >
            <PhotoCard
              type={images.heroPod.type || "video"}
              src={images.heroPod.src}
              poster={images.heroPod.poster}
              alt={images.heroPod.alt}
              className="w-56 sm:w-72 md:w-84 lg:w-[370px] xl:w-[410px]"
              aspectRatio="aspect-[4/4.6]"
            />
          </div>

          {/* 2. TOP-LEFT CARD */}
          <div
            ref={topLeftRef}
            className="absolute left-[2%] sm:left-[5%] top-[2%] sm:top-[4%] z-20 rotate-[-6deg] sm:rotate-[-7deg]"
          >
            <PhotoCard
              type={images.topLeft.type || "image"}
              src={images.topLeft.src}
              alt={images.topLeft.alt}
              className="w-40 sm:w-52 md:w-60 lg:w-[260px]"
              aspectRatio="aspect-[4/3.2]"
            />
          </div>

          {/* 3. BOTTOM-LEFT CARD */}
          <div
            ref={bottomLeftRef}
            className="absolute left-[8%] sm:left-[12%] bottom-[2%] sm:bottom-[4%] z-30 rotate-[6deg] sm:rotate-[8deg]"
          >
            <PhotoCard
              type={images.bottomLeft.type || "image"}
              src={images.bottomLeft.src}
              alt={images.bottomLeft.alt}
              className="w-44 sm:w-56 md:w-64 lg:w-[280px]"
              aspectRatio="aspect-[4/3.1]"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: HEADLINE & PARAGRAPHS */}
        <div
          ref={textColumnRef}
          className="lg:col-span-5 flex flex-col justify-center text-left space-y-6 lg:space-y-8 pl-0 lg:pl-4 order-1 lg:order-2"
        >
          <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-[-0.03em] leading-[0.88] text-[var(--color-dark,#5A3622)] uppercase">
            <span>{headline[0]}</span>
            <br />
            <span>{headline[1]}</span>
          </h2>

          <div className="space-y-5 text-base sm:text-lg text-[var(--color-para,#645A51)] leading-relaxed max-w-xl font-normal">
            <p>{paragraph1}</p>
            <p>{paragraph2}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PureEscapeSection;