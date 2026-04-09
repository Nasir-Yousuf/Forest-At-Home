// import React, { useState, useEffect } from "react";
// import snakePlant from "./../assets/snakePlant.jpg";
// import { Link } from "react-router-dom";

// const HeroSection = () => {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoaded(true), 50);
//     return () => clearTimeout(timer);
//   }, []);

//   const fadeUp = `transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`;
//   const fadeRight = `transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`;
//   const popIn = `transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`;

//   return (
//     <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-transparent font-sans">
//       {/* 1. SEAMLESS OVERLAY
//           Ensures text is readable regardless of background image colors
//       */}
//       <div className="absolute inset-0 bg-gradient-to-b from-[#f4f7f5]/80 via-[#f4f7f5]/40 to-transparent md:bg-gradient-to-r md:from-[#f4f7f5]/95 md:via-[#f4f7f5]/60 md:to-transparent md:w-2/3 lg:w-1/2 -z-10"></div>

//       {/* 2. THE MAIN CONTAINER
//           Changed pt-24 to pt-36 on mobile to push it just enough below the navbar
//           but removed vertical centering so it starts at the top.
//       */}
//       <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 pt-36 md:pt-0 md:flex md:items-center md:min-h-screen">
//         <div className="flex flex-col md:flex-row items-start justify-between w-full">
//           {/* LEFT COLUMN: TEXT & STATS */}
//           <div className="w-full md:w-1/2 flex flex-col">
//             {/* HERO TEXT BLOCK
//                 Removed min-h on mobile so it doesn't push the stats down.
//                 Added md:min-h-[500px] to keep the cinematic feel on desktop.
//             */}
//             <div
//               className={`${fadeRight} delay-300 flex flex-col justify-center md:min-h-[500px]`}
//             >
//               <span className="inline-block w-max bg-[#d4ebd9] text-[#1a3c28] text-[10px] font-bold px-3 py-1 tracking-[0.2em] uppercase mb-6 shadow-sm">
//                 Botanical Living
//               </span>
//               <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-[#1a3c28] leading-[1.1] mb-6 drop-shadow-sm">
//                 Bring the <br />
//                 <span className="italic">Forest</span> Home
//               </h1>
//               <p className="text-[#3b5244] text-sm md:text-base leading-relaxed mb-10 max-w-md font-medium">
//                 Turn your space into a calm, breathing sanctuary. Curated plant
//                 collections designed for clinical precision and natural
//                 serenity.
//               </p>
//               <Link to="/plants">
//                 <button className="bg-[#1a3c28] text-white px-10 py-4 rounded-lg font-medium text-sm hover:bg-[#122b1c] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#1a3c28]/20 w-max">
//                   Explore Plants
//                 </button>
//               </Link>
//             </div>

//             {/* STATS BLOCK
//                 Reduced spacing (pt-12 instead of pt-20) to keep it visible
//                 on smaller phone screens without scrolling.
//             */}
//             <div
//               className={`flex flex-row space-x-6 sm:space-x-12 md:space-x-16 pt-12 pb-12 md:pb-0 ${fadeUp} delay-500`}
//             >
//               <div className="flex flex-col">
//                 <p className="text-[9px] md:text-[11px] text-[#1a3c28]/60 font-bold tracking-widest uppercase mb-2">
//                   Air Purity
//                 </p>
//                 <p className="text-[#1a3c28] font-serif text-lg md:text-2xl font-semibold flex items-baseline gap-1">
//                   98.2%
//                   <span className="text-[9px] font-sans text-green-700 font-bold">
//                     +2.4
//                   </span>
//                 </p>
//               </div>
//               <div className="flex flex-col">
//                 <p className="text-[9px] md:text-[11px] text-[#1a3c28]/60 font-bold tracking-widest uppercase mb-2">
//                   Soil Health
//                 </p>
//                 <p className="text-[#1a3c28] font-serif text-lg md:text-2xl font-semibold">
//                   Optimal
//                 </p>
//               </div>
//               <div className="flex flex-col">
//                 <p className="text-[9px] md:text-[11px] text-[#1a3c28]/60 font-bold tracking-widest uppercase mb-2">
//                   Growth
//                 </p>
//                 <p className="text-[#1a3c28] font-serif text-lg md:text-2xl font-semibold">
//                   Seasonal
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT COLUMN: CARD (Desktop Only) */}
//           <div className="hidden md:flex w-full md:w-1/2 items-center justify-center lg:justify-end">
//             <div
//               className={`relative bg-white/80 backdrop-blur-2xl border border-white/50 p-8 rounded-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] w-[360px] ${popIn} delay-500`}
//             >
//               <div className="absolute -top-24 -right-6 w-40 h-64 drop-shadow-2xl z-20 overflow-hidden rounded-2xl">
//                 <img
//                   src={snakePlant}
//                   alt="Snake Plant"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="mt-8">
//                 <h3 className="text-2xl font-serif text-[#1a3c28] mb-1">
//                   Snake Plant
//                 </h3>
//                 <p className="text-[#1a3c28] italic font-serif text-sm mb-6 opacity-60">
//                   Sansevieria trifasciata
//                 </p>
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center border-b border-[#1a3c28]/10 pb-2">
//                     <span className="text-[10px] font-bold tracking-widest text-[#1a3c28]/60 uppercase">
//                       Filtration
//                     </span>
//                     <span className="text-xs font-bold text-[#1a3c28]">
//                       VOC REMOVAL
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center pb-2">
//                     <span className="text-[10px] font-bold tracking-widest text-[#1a3c28]/60 uppercase">
//                       O₂ Output
//                     </span>
//                     <span className="text-xs font-bold text-[#1a3c28]">
//                       NIGHT-ACTIVE
//                     </span>
//                   </div>
//                   <p className="text-[13px] text-[#1a3c28]/80 leading-relaxed pt-2 border-t border-[#1a3c28]/10 font-medium">
//                     Nature's air purifier, converting CO₂ to oxygen through the
//                     night.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

import React, { useState, useEffect } from "react";
import snakePlant from "./../assets/snakePlant.jpg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const fadeUp = `transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`;
  const fadeRight = `transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`;
  const popIn = `transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`;

  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-transparent font-sans">
      {/* 1. SEAMLESS OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f4f7f5]/80 via-[#f4f7f5]/40 to-transparent md:bg-gradient-to-r md:from-[#f4f7f5]/95 md:via-[#f4f7f5]/60 md:to-transparent md:w-2/3 lg:w-1/2 -z-10"></div>

      {/* 2. THE MAIN CONTAINER */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 pt-36 md:pt-0 md:flex md:items-center md:min-h-screen">
        {/* THE FIX: Added md:items-center here so both columns align vertically in the middle on desktop */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-12 lg:gap-0">
          {/* LEFT COLUMN: TEXT & STATS */}
          <div className="w-full md:w-1/2 flex flex-col">
            {/* HERO TEXT BLOCK 
                THE FIX: Removed the md:min-h-[500px] so the height wraps naturally around your text
            */}
            <div
              className={`${fadeRight} delay-300 flex flex-col justify-center`}
            >
              <span className="inline-block w-max bg-[#d4ebd9] text-[#1a3c28] text-[10px] font-bold px-3 py-1 tracking-[0.2em] uppercase mb-6 shadow-sm">
                Botanical Living
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-[#1a3c28] leading-[1.1] mb-6 drop-shadow-sm">
                Bring the <br />
                <span className="italic">Forest</span> Home
              </h1>
              <p className="text-[#3b5244] text-sm md:text-base leading-relaxed mb-10 max-w-md font-medium">
                Turn your space into a calm, breathing sanctuary. Curated plant
                collections designed for clinical precision and natural
                serenity.
              </p>
              <Link to="/plants">
                <button className="bg-[#1a3c28] text-white px-10 py-4 rounded-lg font-medium text-sm hover:bg-[#122b1c] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#1a3c28]/20 w-max">
                  Explore Plants
                </button>
              </Link>
            </div>

            {/* STATS BLOCK 
                Adjusted top padding to md:pt-16 to give it breathing room below the button 
            */}
            <div
              className={`flex flex-row space-x-6 sm:space-x-12 md:space-x-16 pt-12 md:pt-16 pb-12 md:pb-0 ${fadeUp} delay-500`}
            >
              <div className="flex flex-col">
                <p className="text-[9px] md:text-[11px] text-[#1a3c28]/60 font-bold tracking-widest uppercase mb-2">
                  Air Purity
                </p>
                <p className="text-[#1a3c28] font-serif text-lg md:text-2xl font-semibold flex items-baseline gap-1">
                  98.2%
                  <span className="text-[9px] font-sans text-green-700 font-bold">
                    +2.4
                  </span>
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-[9px] md:text-[11px] text-[#1a3c28]/60 font-bold tracking-widest uppercase mb-2">
                  Soil Health
                </p>
                <p className="text-[#1a3c28] font-serif text-lg md:text-2xl font-semibold">
                  Optimal
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-[9px] md:text-[11px] text-[#1a3c28]/60 font-bold tracking-widest uppercase mb-2">
                  Growth
                </p>
                <p className="text-[#1a3c28] font-serif text-lg md:text-2xl font-semibold">
                  Seasonal
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CARD (Desktop Only) */}
          <div className="hidden md:flex w-full md:w-1/2 items-center justify-center lg:justify-end">
            <div
              className={`relative bg-white/80 backdrop-blur-2xl border border-white/50 p-8 rounded-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] w-[360px] ${popIn} delay-500`}
            >
              <div className="absolute -top-24 -right-6 w-40 h-64 drop-shadow-2xl z-20 overflow-hidden rounded-2xl">
                <img
                  src={snakePlant}
                  alt="Snake Plant"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-serif text-[#1a3c28] mb-1">
                  Snake Plant
                </h3>
                <p className="text-[#1a3c28] italic font-serif text-sm mb-6 opacity-60">
                  Sansevieria trifasciata
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-[#1a3c28]/10 pb-2">
                    <span className="text-[10px] font-bold tracking-widest text-[#1a3c28]/60 uppercase">
                      Filtration
                    </span>
                    <span className="text-xs font-bold text-[#1a3c28]">
                      VOC REMOVAL
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-[10px] font-bold tracking-widest text-[#1a3c28]/60 uppercase">
                      O₂ Output
                    </span>
                    <span className="text-xs font-bold text-[#1a3c28]">
                      NIGHT-ACTIVE
                    </span>
                  </div>
                  <p className="text-[13px] text-[#1a3c28]/80 leading-relaxed pt-2 border-t border-[#1a3c28]/10 font-medium">
                    Nature's air purifier, converting CO₂ to oxygen through the
                    night.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
