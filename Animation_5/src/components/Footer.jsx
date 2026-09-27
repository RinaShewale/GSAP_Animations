// src/components/Footer.jsx
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)
  const marqueRef = useRef(null)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  // Live clocks for 3 cities
  const [times, setTimes] = useState({ newYork: '', paris: '', tokyo: '' })

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const format = (tz) =>
        now.toLocaleTimeString('en-US', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })

      setTimes({
        newYork: format('America/New_York'),
        paris: format('Europe/Paris'),
        tokyo: format('Asia/Tokyo'),
      })
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        marqueRef.current,
        { yPercent: 30, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            end: 'bottom bottom',
            scrub: 1,
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setTimeout(() => {
      setEmail('')
      setSent(false)
    }, 4000)
  }

  return (
    <footer
      ref={footerRef}
      className="relative z-20 w-full border-t border-neutral-300/80 bg-[#fbfbfb] text-neutral-900 select-none shadow-[0_-25px_50px_rgba(0,0,0,0.04)]"
    >
      {/* City Time Bar */}
      <div className="flex w-full flex-wrap items-center justify-between gap-2 border-b border-neutral-200 px-4 sm:px-8 py-2.5 sm:py-3.5 font-mono text-[10px] sm:text-[11px] tracking-wider text-neutral-500">
        <div className="flex items-center gap-3 sm:gap-6">
          <span>NYC [{times.newYork || '--:--'}]</span>
          <span className="hidden xs:inline">PARIS [{times.paris || '--:--'}]</span>
          <span className="hidden md:inline">TOKYO [{times.tokyo || '--:--'}]</span>
        </div>
        <div className="text-neutral-400">WORLDWIDE SHIPPING</div>
      </div>

      {/* 4 Simple Columns */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:px-8 py-12 sm:py-16 sm:grid-cols-2 lg:grid-cols-4 sm:gap-10">
        {/* Column 1 */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-neutral-900 uppercase">
            Shop
          </span>
          <ul className="flex flex-col gap-2.5 text-sm text-neutral-600">
            {['Winter Jackets', 'Coats & Outerwear', 'Sweaters & Hoodies', 'New Arrivals'].map((link) => (
              <li key={link}>
                <a href="#shop" className="transition-colors hover:text-neutral-900">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-neutral-900 uppercase">
            Stores
          </span>
          <ul className="flex flex-col gap-2.5 text-sm text-neutral-600">
            {['New York Store', 'Paris Flagship', 'Tokyo Studio', 'Book a Visit'].map((link) => (
              <li key={link}>
                <a href="#stores" className="transition-colors hover:text-neutral-900">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-neutral-900 uppercase">
            About Us
          </span>
          <p className="text-sm leading-relaxed text-neutral-600">
            We make simple, high-quality silhouettes with architectural precision and premium fabrics. Designed to fit effortlessly and endure for years.
          </p>
        </div>

        {/* Column 4 */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-neutral-900 uppercase">
            Newsletter
          </span>
          <p className="text-sm text-neutral-600">
            Enter your email to receive early access to seasonal drops and private archives.
          </p>
          <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-2">
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border-b border-neutral-300 bg-transparent py-2 pr-8 text-base sm:text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-neutral-900 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-0 bottom-2 text-sm text-neutral-900 transition-transform hover:translate-x-1 cursor-pointer"
              >
                →
              </button>
            </div>
            {sent && (
              <span className="font-mono text-xs font-medium text-neutral-900">
                Thank you! You are on the list.
              </span>
            )}
          </form>
        </div>
      </div>

      {/* Big Brand Name */}
      <div className="w-full overflow-hidden border-t border-neutral-200 pt-8 sm:pt-10 pb-4 sm:pb-6 text-center">
        <h2
          ref={marqueRef}
          className="font-sans text-[clamp(2.35rem,13vw,12rem)] font-extrabold leading-none tracking-tight text-neutral-900 uppercase select-none"
        >
          Studio Black
        </h2>
      </div>

      {/* Bottom Bar */}
      <div className="flex w-full flex-col-reverse items-center justify-between gap-4 border-t border-neutral-200 px-4 sm:px-8 py-5 sm:py-6 text-[11px] sm:text-xs text-neutral-500 md:flex-row text-center md:text-left">
        <div>© 2026 STUDIO BLACK. ALL RIGHTS RESERVED.</div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] tracking-wider text-neutral-600 transition-colors hover:text-neutral-900 cursor-pointer"
        >
          <span>BACK TO TOP</span>
          <span>↑</span>
        </button>
      </div>
    </footer>
  )
}