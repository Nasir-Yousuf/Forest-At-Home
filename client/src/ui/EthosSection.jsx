import React, { useEffect, useRef, useState } from "react";
import { Leaf } from "lucide-react";

const useScrollReveal = (threshold = 0.15) => {
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

const EthosSection = () => {
  const [headerRef, headerVisible] = useScrollReveal();
  const [quote1Ref, quote1Visible] = useScrollReveal();
  const [iconRef, iconVisible] = useScrollReveal();
  const [quote2Ref, quote2Visible] = useScrollReveal();

  const getFadeClass = (isVisible, delay = "") =>
    `transition-all duration-1000 ease-out ${
      isVisible
        ? `opacity-100 translate-y-0 ${delay}`
        : "opacity-0 translate-y-12"
    }`;

  return (
    <section className="relative w-full py-32 md:py-48 overflow-hidden flex items-center justify-center font-sans bg-transparent">
      {/* IMPROVED OVERLAY (DEPTH) sent to back */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-[#f8faf9]/40 to-[#e2ebe6]/70 -z-10 backdrop-blur-[4px]"></div>

      {/* Watermarks (Original Textures) */}
      <div className="absolute top-0 left-0 w-64 md:w-96 h-64 md:h-96 opacity-[0.04] pointer-events-none -translate-x-1/4 -translate-y-1/4 mix-blend-multiply -z-10">
        <img
          src="https://images.unsplash.com/photo-1605553556942-83b6cb600219?q=80&w=800&auto=format&fit=crop"
          alt="Fern Texture"
          className="w-full h-full object-cover rotate-[-15deg] grayscale"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-80 md:w-[600px] h-80 md:h-[600px] opacity-[0.05] pointer-events-none translate-x-1/4 translate-y-1/4 mix-blend-multiply -z-10">
        <img
          src="https://images.unsplash.com/photo-1614594975525-e45190c55d40?q=80&w=800&auto=format&fit=crop"
          alt="Macro Leaf Texture"
          className="w-full h-full object-cover rotate-[20deg] grayscale"
        />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <div
          ref={headerRef}
          className={`mb-16 md:mb-24 ${getFadeClass(headerVisible)}`}
        >
          <p className="text-[9px] md:text-[10px] font-bold tracking-[0.25em] text-[#0f2418]/50 uppercase mb-4">
            Our Guiding Ethos
          </p>
          <p className="font-serif italic text-[#0f2418]/80 text-base md:text-lg">
            "We bring nature back into your everyday life."
          </p>
        </div>

        <div
          ref={quote1Ref}
          className={`flex flex-col items-center mb-16 md:mb-20 ${getFadeClass(quote1Visible)}`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#0f2418] tracking-tight leading-[1.2] md:leading-[1.15] mb-6 md:mb-8 drop-shadow-sm">
            "Adopt the pace of nature: <br className="hidden md:block" />
            her secret is patience."
          </h2>
          <div className="flex items-center gap-6">
            <span className="w-12 md:w-24 h-[1px] bg-[#1a3c28]/15"></span>
            <p className="text-[9px] md:text-[10px] font-bold tracking-[0.25em] text-[#0f2418]/50 uppercase">
              Ralph Waldo Emerson
            </p>
            <span className="w-12 md:w-24 h-[1px] bg-[#1a3c28]/15"></span>
          </div>
        </div>

        <div
          ref={iconRef}
          className={`mb-16 md:mb-20 flex items-center justify-center gap-6 w-full max-w-sm mx-auto ${getFadeClass(iconVisible)}`}
        >
          <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#1a3c28]/15"></span>
          <Leaf size={24} strokeWidth={1} className="text-[#1a3c28]/40" />
          <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#1a3c28]/15"></span>
        </div>

        <div
          ref={quote2Ref}
          className={`flex flex-col items-center ${getFadeClass(quote2Visible)}`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#0f2418] tracking-tight leading-[1.2] md:leading-[1.15] mb-6 md:mb-8 drop-shadow-sm">
            "Man suffers only <br className="hidden md:block" />
            because he takes <br className="hidden md:block" />
            seriously what the gods <br className="hidden md:block" />
            made for fun."
          </h2>
          <div className="flex items-center gap-6">
            <span className="w-12 md:w-24 h-[1px] bg-[#1a3c28]/15"></span>
            <p className="text-[9px] md:text-[10px] font-bold tracking-[0.25em] text-[#0f2418]/50 uppercase">
              Alan Watts
            </p>
            <span className="w-12 md:w-24 h-[1px] bg-[#1a3c28]/15"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EthosSection;
