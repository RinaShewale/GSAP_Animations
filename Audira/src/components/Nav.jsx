import React, { useState, useEffect } from 'react';

const Nav = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // When scrolling down, nav goes up (hides). When scrolling up, nav comes back down (shows).
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a 
          href="#" 
          className="group flex items-center gap-1.5 focus:outline-none"
        >
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-button)] group-hover:text-[var(--color-primary)] transition-colors duration-200">
            Audira
          </span>
          {/* Subtle acoustic accent dot */}
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] mb-2" />
        </a>

        {/* Primary Action Button */}
        <button 
          type="button"
          className="inline-flex items-center justify-center rounded-full bg-[var(--color-button)] px-6 py-2.5 text-sm font-semibold tracking-wide text-white shadow-sm hover:shadow-md transition-all duration-300 hover:bg-[var(--color-dark)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          Buy Now
        </button>

      </div>
    </header>
  );
};

export default Nav;