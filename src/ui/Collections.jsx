import React, { useState, useEffect } from "react";
import { Filter, Brain, BedDouble, Lightbulb } from "lucide-react";

const Collections = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const fadeUp = `transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`;
  const fadeRight = `transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`;
  const fadeLeft = `transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`;

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col justify-center bg-transparent font-sans">
      {/* Sage Green Overlays sent to back */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#a2b5a0]/40 via-transparent to-black/30 -z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#a2b5a0]/95 via-[#a2b5a0]/80 to-[#a2b5a0]/90 -z-10 backdrop-blur-[2px]"></div>

      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 pt-24 pb-20">
        <div className="flex flex-col xl:flex-row items-center gap-12 lg:gap-16 w-full">
          <div
            className={`w-full xl:w-[45%] max-w-xl bg-white/30 backdrop-blur-xl border border-white/40 p-8 md:p-12 rounded-[2rem] shadow-2xl ${fadeRight} delay-150`}
          >
            <p className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#1a3c28]/80 uppercase mb-6">
              Forest At Home — Collection 01
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#1a3c28] leading-[1.1] mb-6 drop-shadow-sm">
              The Living <br /> Laboratory.
            </h1>
            <p className="text-[#1a3c28]/90 text-sm md:text-base leading-relaxed font-medium mb-10 pr-4">
              A curated selection of premium indoor species, documented for
              their architectural beauty and biological resilience. Transforming
              modern interiors into breathable sanctuaries.
            </p>
            <button className="bg-[#122b1c] text-white px-8 py-3.5 rounded-lg font-medium text-sm hover:bg-[#1a3c28] transition-all hover:scale-105 shadow-lg shadow-[#122b1c]/20 w-max">
              Explore Specimens
            </button>
          </div>

          <div
            className={`w-full xl:w-[55%] grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 ${fadeLeft} delay-300`}
          >
            <div className="bg-[#a4b5a0]/90 backdrop-blur-md border border-white/20 p-6 md:p-8 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform duration-300">
              <Filter
                className="text-[#1a3c28] mb-5"
                size={28}
                strokeWidth={1.5}
              />
              <h3 className="text-lg md:text-xl font-serif text-[#1a3c28] mb-3 font-semibold leading-tight">
                Removes toxins
              </h3>
              <p className="text-[12px] md:text-[13px] text-[#1a3c28]/80 leading-relaxed font-medium">
                Targeting common pollutants like formaldehyde and benzene, our
                plants actively purify your indoor atmosphere.
              </p>
            </div>

            <div className="bg-[#f0eee4]/95 backdrop-blur-md border border-white/40 p-6 md:p-8 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform duration-300">
              <Brain
                className="text-[#1a3c28] mb-5"
                size={28}
                strokeWidth={1.5}
              />
              <h3 className="text-lg md:text-xl font-serif text-[#1a3c28] mb-3 font-semibold leading-tight">
                Reduces stress
              </h3>
              <p className="text-[12px] md:text-[13px] text-[#1a3c28]/80 leading-relaxed font-medium">
                The presence of foliage has been shown to lower physiological
                stress responses and promote deep relaxation.
              </p>
            </div>

            <div className="bg-[#f0eee4]/95 backdrop-blur-md border border-white/40 p-6 md:p-8 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform duration-300">
              <BedDouble
                className="text-[#1a3c28] mb-5"
                size={28}
                strokeWidth={1.5}
              />
              <h3 className="text-lg md:text-xl font-serif text-[#1a3c28] mb-3 font-semibold leading-tight">
                Improves sleep
              </h3>
              <p className="text-[12px] md:text-[13px] text-[#1a3c28]/80 leading-relaxed font-medium">
                Enhancing air quality and creating a calming environment to
                support restorative, uninterrupted sleep cycles.
              </p>
            </div>

            <div className="bg-[#a4b5a0]/90 backdrop-blur-md border border-white/20 p-6 md:p-8 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform duration-300">
              <Lightbulb
                className="text-[#1a3c28] mb-5"
                size={28}
                strokeWidth={1.5}
              />
              <h3 className="text-lg md:text-xl font-serif text-[#1a3c28] mb-3 font-semibold leading-tight">
                Boosts focus
              </h3>
              <p className="text-[12px] md:text-[13px] text-[#1a3c28]/80 leading-relaxed font-medium">
                Studies suggest that proximity to plants can sharpen attention
                and vastly improve cognitive performance.
              </p>
            </div>
          </div>
        </div>

        <div
          className={`w-full text-center mt-16 md:mt-24 ${fadeUp} delay-700`}
        >
          <p className="text-lg md:text-xl font-serif text-[#1a3c28]/90 border-t border-[#1a3c28]/20 pt-6 inline-block px-12">
            Backed by the NASA Clean Air Study
          </p>
        </div>
      </div>
    </section>
  );
};

export default Collections;
