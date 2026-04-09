import React, { useEffect, useRef, useState } from "react";
import { Leaf, Compass, Sprout, Armchair } from "lucide-react";

import ImageOne from "./../assets/Health.jpg";
import Image2 from "./../assets/Architectural.jpg";
import Image3 from "./../assets/EffortlessCare.jpg";
import Image4 from "./../assets/SpaceOpti.jpg";

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

const WhatWeOffer = () => {
  const [headerRef, headerVisible] = useScrollReveal();
  const [card1Ref, card1Visible] = useScrollReveal();
  const [card2Ref, card2Visible] = useScrollReveal();
  const [card3Ref, card3Visible] = useScrollReveal();
  const [card4Ref, card4Visible] = useScrollReveal();

  const getFadeClass = (isVisible, delay = "") =>
    `transition-all duration-1000 ease-out ${
      isVisible
        ? `opacity-100 translate-y-0 ${delay}`
        : "opacity-0 translate-y-12"
    }`;

  const offerings = [
    {
      ref: card1Ref,
      visible: card1Visible,
      delay: "delay-100",
      icon: Leaf,
      cardBg: "bg-white/5",
      title: "Health-Focused Selection",
      features: [
        "Scientifically proven air purification",
        "Reduction of indoor airborne toxins",
      ],
      image: ImageOne,
    },
    {
      ref: card2Ref,
      visible: card2Visible,
      delay: "delay-200",
      icon: Compass,
      cardBg: "bg-[#a4b5a0]/15",
      title: "Architectural Styling",
      features: [
        "Artisan-crafted ceramic vessels",
        "Modern minimalist aesthetic palette",
      ],
      image: Image2,
    },
    {
      ref: card3Ref,
      visible: card3Visible,
      delay: "delay-300",
      icon: Sprout,
      cardBg: "bg-[#f0eee4]/10",
      title: "Effortless Care",
      features: [
        "Resilient, low-light tolerant species",
        "Tailored digital care guides",
      ],
      image: Image3,
    },
    {
      ref: card4Ref,
      visible: card4Visible,
      delay: "delay-400",
      icon: Armchair,
      cardBg: "bg-[#a4b5a0]/15",
      title: "Space Optimization",
      features: [
        "Enhancing productivity & serenity",
        "Scalable solutions for any floorplan",
      ],
      image: Image4,
    },
  ];

  return (
    <section className="relative py-28 md:py-40 bg-transparent font-sans overflow-hidden">
      {/* Background glass layer pushed back */}
      <div className="absolute inset-0 bg-[#eef2ef]/10 backdrop-blur-[3px] -z-10"></div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col items-center">
        <div
          ref={headerRef}
          className={`flex flex-col items-center text-center mb-20 md:mb-28 ${getFadeClass(headerVisible)}`}
        >
          <span className="bg-[#d4ebd9] text-[#1a3c28] text-[10px] font-bold px-4 py-1.5 rounded-full tracking-[0.2em] uppercase mb-6 shadow-sm">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-[#1a3c28] mb-6 tracking-tight drop-shadow-md">
            Nature, Curated for You
          </h2>
          <p className="text-[#4A6053] text-sm md:text-base max-w-2xl font-medium leading-relaxed drop-shadow-sm font-bold">
            Elevate your environment with premium indoor plants, hand-selected
            for exceptional beauty and lasting vitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 w-full">
          {offerings.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                ref={card.ref}
                className={`relative ${card.cardBg} rounded-[2.8rem] p-10 md:p-12 backdrop-blur-3xl border border-white/30 shadow-[0_30px_60px_-15px_rgba(26,60,40,0.15)] flex flex-col h-full group hover:-translate-y-2 transition-all duration-700 ease-out overflow-hidden ${getFadeClass(card.visible, card.delay)}`}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/5 opacity-60 pointer-events-none"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-white/40 backdrop-blur-md flex items-center justify-center text-[#1a3c28] mb-8 shadow-sm group-hover:rotate-[10deg] transition-transform duration-500 border border-white/40">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif text-[#1a3c28] mb-6 tracking-tight leading-tight font-semibold drop-shadow-sm">
                    {card.title}
                  </h3>
                  <ul className="flex flex-col gap-4 mb-12">
                    {card.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1 flex justify-center text-[#1a3c28]">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="w-4 h-4 drop-shadow-sm"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </div>
                        <span className="text-[#1a3c28]/90 text-[13px] md:text-sm font-semibold leading-tight drop-shadow-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto w-full h-[240px] md:h-[280px] rounded-[1.8rem] overflow-hidden shadow-lg border border-white/20">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
