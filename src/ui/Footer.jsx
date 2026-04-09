import React, { useEffect, useRef, useState } from "react";

const GithubIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold },
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold]);

  return [ref, isVisible];
};

const Footer = () => {
  const [footerRef, footerVisible] = useScrollReveal();

  return (
    <footer
      ref={footerRef}
      className={`relative w-full pt-24 pb-8 bg-transparent font-sans z-20 overflow-hidden transition-all duration-1000 ease-out ${
        footerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {/* Soft glass overlay pushed back */}
      <div className="absolute inset-0 bg-[#eef2ef]/30 backdrop-blur-[6px] -z-10"></div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10 mb-16 md:mb-20">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#1a3c28] tracking-tight leading-none mb-4 drop-shadow-sm">
              Forest At Home.
            </h2>
            <p className="text-[#1a3c28]/80 text-sm md:text-base max-w-sm font-semibold italic drop-shadow-sm">
              "We bring nature back into your everyday life."
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/NasirYousuf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full border border-[#1a3c28]/30 bg-white/20 backdrop-blur-sm text-[#1a3c28] hover:bg-[#1a3c28] hover:text-white hover:scale-105 transition-all duration-300 shadow-sm"
              aria-label="GitHub"
            >
              <GithubIcon className="w-5 h-5 drop-shadow-sm" />
            </a>
            <a
              href="https://linkedin.com/in/NasirYousuf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full border border-[#1a3c28]/30 bg-white/20 backdrop-blur-sm text-[#1a3c28] hover:bg-[#1a3c28] hover:text-white hover:scale-105 transition-all duration-300 shadow-sm"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-5 h-5 drop-shadow-sm" />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-[#1a3c28]/20 pt-8 gap-4 md:gap-0">
          <p className="text-[11px] md:text-xs text-[#1a3c28]/80 font-bold tracking-wide uppercase drop-shadow-sm">
            © {new Date().getFullYear()} Nasir Yousuf. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[10px] md:text-xs text-[#1a3c28]/70 font-bold tracking-[0.1em] uppercase drop-shadow-sm">
            <span className="hover:text-[#1a3c28] cursor-pointer transition-colors">
              Botanical Precision
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a3c28]/50"></span>
            <span className="hover:text-[#1a3c28] cursor-pointer transition-colors">
              EST. 2026
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
