import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Collections from "./Collections";
import EthosSection from "./EthosSection";
import WhatWeOffer from "./WhatWeOffer";
import Footer from "./Footer";
import CinematicAtmosphere from "./CinematicAtmosphere";

export default function HomePage() {
  return (
    <div className="font-sans text-[#1A3826] antialiased selection:bg-[#c5ebd4] selection:text-[#1A3826] relative bg-[#eef2ef]">
      {/* 1. THE SEAMLESS MASTER BACKGROUND - FIXED */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-[0] opacity-30 saturate-50"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1604762524889-3e2fcc145683?q=80&w=2071&auto=format&fit=crop')",
        }}
      />

      {/* 2. GLOBAL CINEMATIC ATMOSPHERE - FLOATING OVER BACKGROUND */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <CinematicAtmosphere />
      </div>

      {/* 3. PERSISTENT NAVBAR */}
      {/* <Navbar /> */}

      {/* 4. SCROLLING CONTENT - TRANSPARENT LAYERS OVER THE BG */}
      <main className="relative z-10 flex flex-col w-full">
        <HeroSection />
        <Collections />
        <EthosSection />
        <WhatWeOffer />
        <Footer />
      </main>
    </div>
  );
}
