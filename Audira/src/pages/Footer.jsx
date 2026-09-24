import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const Footer = ({
  brandName = "AUDIRA",
  tagline = "Pure sound, sculpted for the modern listener.",
  columns = [
    {
      title: "ACOUSTICS",
      links: [
        { label: "Audira One", href: "#" },
        { label: "Series 01 Over-Ear", href: "#" },
        { label: "Spatial Immersion Pod", href: "#" },
        { label: "Titanium Diaphragms", href: "#" },
      ],
    },
    {
      title: "INNOVATION",
      links: [
        { label: "Active Noise Shield", href: "#" },
        { label: "Acoustic Tuning", href: "#" },
        { label: "Materials & Craft", href: "#" },
        { label: "Soundstage Lab", href: "#" },
      ],
    },
    {
      title: "EXPERIENCE",
      links: [
        { label: "Listening Rooms", href: "#" },
        { label: "Calibration App", href: "#" },
        { label: "Care & Warranty", href: "#" },
        { label: "Concierge Support", href: "#" },
      ],
    },
  ],
}) => {
  const footerRef = useRef(null);

  useEffect(() => {
    let brandSplit;

    const ctx = gsap.context(() => {
      const footer = footerRef.current;
      const brandHeading = footer.querySelector('h3');
      const missionText = footer.querySelector('.lg\\:col-span-5 p');
      const swissBadge = footer.querySelector('.lg\\:col-span-5 .inline-flex');
      const navColumns = footer.querySelectorAll('.lg\\:col-span-7 > div');
      const giantWordmark = footer.querySelector('h2');
      const legalRow = footer.querySelector('.pt-10 .border-t');
      const ambientGlow = footer.querySelector('#footer-ambient-glow');
      const isMobile = window.innerWidth < 768;

      // 1. SplitText for Brand Title
      if (brandHeading) {
        brandSplit = SplitText.create(brandHeading, {
          type: 'chars, words',
        });
      }

      // 2. Entrance Timeline
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      if (ambientGlow) {
        entranceTl.fromTo(
          ambientGlow,
          { scale: 0.5, autoAlpha: 0 },
          { scale: 1, autoAlpha: 0.5, duration: 1.6, ease: 'power2.out' },
          0
        );
      }

      if (brandSplit?.chars) {
        entranceTl.from(
          brandSplit.chars,
          {
            yPercent: 120,
            autoAlpha: 0,
            duration: 1.1,
            stagger: 0.03,
            ease: 'power4.out',
          },
          0.1
        );
      }

      if (missionText) {
        entranceTl.from(
          missionText,
          {
            y: 25,
            autoAlpha: 0,
            duration: 1.1,
            ease: 'power3.out',
          },
          0.25
        );
      }

      if (swissBadge) {
        entranceTl.from(
          swissBadge,
          {
            scale: 0.88,
            autoAlpha: 0,
            duration: 0.9,
            ease: 'back.out(1.4)',
          },
          0.35
        );
      }

      if (navColumns.length > 0) {
        navColumns.forEach((col, idx) => {
          const title = col.querySelector('h4');
          const links = col.querySelectorAll('li');

          if (title) {
            entranceTl.from(
              title,
              {
                y: 20,
                autoAlpha: 0,
                duration: 0.9,
                ease: 'power3.out',
              },
              0.2 + idx * 0.1
            );
          }

          if (links.length > 0) {
            entranceTl.from(
              links,
              {
                y: 16,
                autoAlpha: 0,
                duration: 0.8,
                stagger: 0.04,
                ease: 'power2.out',
              },
              0.3 + idx * 0.1
            );
          }
        });
      }

      if (giantWordmark) {
        entranceTl.from(
          giantWordmark,
          {
            yPercent: 105,
            autoAlpha: 0,
            duration: 1.4,
            ease: 'power3.out',
          },
          0.35
        );
      }

      if (legalRow) {
        entranceTl.from(
          legalRow,
          {
            y: 20,
            autoAlpha: 0,
            duration: 1,
            ease: 'power2.out',
          },
          0.5
        );
      }

      // 3. Subtle Parallax on Giant Wordmark (0.3s on mobile, 1.2s on desktop)
      if (giantWordmark) {
        gsap.to(giantWordmark, {
          scrollTrigger: {
            trigger: footer,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: isMobile ? 0.3 : 1.2,
          },
          y: -25,
          ease: 'none',
        });
      }

    }, footerRef);

    return () => {
      if (brandSplit) brandSplit.revert();
      ctx.revert();
    };
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative w-full bg-[var(--color-bg,#F7F2EB)] text-[var(--color-dark,#5A3622)] border-t border-[#E5DCD2] pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12 overflow-hidden select-none font-sans"
    >
      {/* AMBIENT STUDIO LIGHTING GLOW */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          id="footer-ambient-glow"
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[320px] sm:w-[500px] lg:w-[600px] h-[220px] sm:h-[300px] rounded-full bg-[var(--color-ambient,#EADCCB)] opacity-50 blur-[40px] md:blur-[120px]" 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-14">
        
        {/* TOP ROW: BRAND COLUMN & NAVIGATION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 pb-12 sm:pb-16 border-b border-[#E5DCD2]">
          
          {/* Brand & Editorial Mission */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <h3 className="text-3xl sm:text-4xl font-black tracking-[-0.03em] uppercase text-[var(--color-dark,#5A3622)] break-words">
              {brandName}
            </h3>
            <p className="text-base sm:text-lg text-[var(--color-para,#645A51)] leading-relaxed max-w-md font-normal">
              {tagline}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFE7DC] border border-[#E3D8C8] text-[10px] sm:text-[11px] font-semibold tracking-wide sm:tracking-wider text-[var(--color-dark,#5A3622)] uppercase max-w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C86323] shrink-0" />
              <span className="truncate sm:whitespace-normal">Engineered in Switzerland // Built for Immersion</span>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            {columns.map((col, idx) => (
              <div key={idx} className="space-y-3 sm:space-y-4">
                <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-[#C86323]">
                  {col.title}
                </h4>
                <ul className="space-y-2.5 sm:space-y-3">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href={link.href}
                        className="inline-block text-sm sm:text-base text-[var(--color-para,#645A51)] hover:text-[var(--color-dark,#5A3622)] transition-colors duration-200 break-words py-0.5"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* BOTTOM ROW: GIANT WORDMARK & LEGAL */}
        <div className="pt-10 space-y-6 sm:space-y-8">
          
          <div className="overflow-hidden">
            <h2 className="text-[14vw] lg:text-[13vw] font-black uppercase tracking-[-0.04em] leading-none text-[#5A3622]/[0.08] select-none text-center whitespace-nowrap transform-gpu">
              {brandName}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-xs sm:text-sm text-[var(--color-para,#645A51)] border-t border-[#E5DCD2]/60 pt-6 text-center sm:text-left">
            <p>© {new Date().getFullYear()} {brandName} Acoustics Inc. All rights reserved.</p>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2">
              <a href="#" className="hover:text-[var(--color-dark,#5A3622)] transition-colors duration-200 whitespace-nowrap">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[var(--color-dark,#5A3622)] transition-colors duration-200 whitespace-nowrap">
                Terms of Craft
              </a>
              <a href="#" className="hover:text-[var(--color-dark,#5A3622)] transition-colors duration-200 whitespace-nowrap">
                Acoustic Certifications
              </a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;