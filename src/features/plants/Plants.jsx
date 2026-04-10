import React, { useState, useEffect, useRef } from "react";
import { Plus, Minus, ShoppingBag } from "lucide-react";

const PLANTS_DATA = [
  {
    id: "MON-042",
    name: "Monstera Deliciosa",
    price: 85.0,
    description:
      "Natural air purifier. Reduces airborne toxins by 40% in residential spaces. Architectural presence for any interior.",
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d40?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "SAN-019",
    name: "Snake Plant",
    price: 64.0,
    description:
      "Highly resilient desert species. Ideal for bedroom oxygen conversion. Requires minimal water and light.",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "FIC-088",
    name: "Fiddle Leaf Fig",
    price: 120.0,
    description:
      "Premium architectural specimen. Large broad leaves optimized for photosynthesis. A focal piece for high-ceilings.",
    image:
      "https://images.unsplash.com/photo-1508209867087-b9f48f430635?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "POT-112",
    name: "Golden Pothos",
    price: 35.0,
    description:
      "Adaptable trailing plant. Rapid growth rate and exceptionally efficient at filtering formaldehyde from the air.",
    image:
      "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "ZAM-201",
    name: "ZZ Plant",
    price: 55.0,
    description:
      "Extreme resilience. Thrives on neglect with structural, glossy leaves that reflect ambient indoor lighting.",
    image:
      "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "SPA-305",
    name: "Peace Lily",
    price: 70.0,
    description:
      "Elegant white blooms that act as natural indicators of thirst. Powerful bio-filter for mold spores and VOCs.",
    image:
      "https://images.unsplash.com/photo-1593696954577-ab3d39317b97?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "STR-421",
    name: "Bird of Paradise",
    price: 150.0,
    description:
      "Stunning tropical canopy plant. Massive paddle leaves provide high transpiration rates, naturally humidifying spaces.",
    image:
      "https://images.unsplash.com/photo-1611211232932-da3113c5b960?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "ELA-503",
    name: "Rubber Tree",
    price: 95.0,
    description:
      "Deep burgundy foliage with a robust structure. Effective at removing toxins and requires minimal maintenance.",
    image:
      "https://images.unsplash.com/photo-1612363148951-15f16817648f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "NEP-617",
    name: "Boston Fern",
    price: 40.0,
    description:
      "Delicately feathery fronds. Superior at adding humidity to dry indoor environments and filtering out common toxins.",
    image:
      "https://images.unsplash.com/photo-1599598425947-33002620660b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "CAL-782",
    name: "Calathea Ornata",
    price: 60.0,
    description:
      "Intricate patterned leaves. A dynamic plant whose leaves rise and fall with the diurnal cycle. Prefers humidity.",
    image:
      "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&q=80&w=800",
  },
];

// ==========================================
//   HOOKS
// ==========================================
function useScrollReveal(threshold = 0.1) {
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
    return () => ref.current && observer.unobserve(ref.current);
  }, [threshold]);

  return [ref, isVisible];
}

function CollectionHeader() {
  const [headerRef, isVisible] = useScrollReveal();

  return (
    <header
      ref={headerRef}
      className={`flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 md:gap-8 mb-6 md:mb-5 transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-2xl">
        <span className="inline-block bg-[#d4ebd9] text-[#1a3c28] text-[9px] md:text-[10px] font-bold px-4 py-1.5 rounded-full tracking-[0.2em] uppercase mb-4 md:mb-5">
          Catalogue 2026
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1a3c28] mb-4 md:mb-5 tracking-tight leading-[1.05]">
          The Specimen <br className="hidden md:block" /> Collection
        </h2>
        <p className="text-[#4A6053] text-sm md:text-base font-medium leading-relaxed max-w-xl">
          Curated for biological resilience and architectural beauty. Transform
          your living space into a functional ecosystem of curated botanical
          life.
        </p>
      </div>

      <div className="flex items-center gap-4 w-full lg:w-auto pb-1 opacity-80">
        <div className="h-[1px] w-12 md:w-24 bg-[#1a3c28]/20 hidden md:block"></div>
        <p className="text-[#4A6053] font-serif italic text-sm md:text-base whitespace-nowrap">
          Scientific excellence in home cultivation.
        </p>
      </div>
    </header>
  );
}

function QuantitySelector({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="flex items-center justify-between bg-[#f4f7f5] rounded-xl px-2 py-2.5 md:px-3 md:py-3 w-full xl:w-[110px] border border-gray-100 transition-colors duration-300 hover:border-[#1a3c28]/20">
      <button
        onClick={onDecrease}
        disabled={quantity === 1}
        className="text-[#1a3c28]/60 hover:text-[#1a3c28] hover:bg-white rounded-md transition-colors disabled:opacity-50 p-1.5"
        aria-label="Decrease quantity"
      >
        <Minus size={14} strokeWidth={2.5} />
      </button>

      <span className="text-sm font-bold text-[#1a3c28] w-6 text-center">
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        className="text-[#1a3c28]/60 hover:text-[#1a3c28] hover:bg-white rounded-md transition-colors p-1.5"
        aria-label="Increase quantity"
      >
        <Plus size={14} strokeWidth={2.5} />
      </button>
    </div>
  );
}

function PlantCard({ plant, index }) {
  const [ref, isVisible] = useScrollReveal();
  const [quantity, setQuantity] = useState(1);

  function handleDecrease() {
    setQuantity((prev) => Math.max(1, prev - 1));
  }

  function handleIncrease() {
    setQuantity((prev) => prev + 1);
  }

  function handleAddToCart() {
    console.log(`Added ${quantity} of ${plant.name} to cart.`);
  }

  return (
    <article
      ref={ref}
      // Restored comfortable padding p-4 md:p-5
      className={`group w-full max-w-[340px] mx-auto sm:max-w-none flex flex-col bg-white p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-transparent hover:border-gray-100 hover:shadow-[0_24px_50px_-12px_rgba(26,60,40,0.18)] transition-all duration-500 ease-out opacity-0 translate-y-8 ${
        isVisible ? "opacity-100 translate-y-0" : ""
      }`}
      style={{ transitionDelay: `${(index % 4) * 100}ms` }}
    >
      {/* 10% SHORTER: aspect-[10/9] creates a very subtle horizontal rectangle instead of a perfect square */}
      <div className="relative w-full aspect-[10/9] bg-[#f4f7f5] rounded-2xl md:rounded-3xl overflow-hidden mb-5 md:mb-6">
        <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10 bg-white/90 backdrop-blur-md px-2.5 py-1 md:px-3 md:py-1.5 rounded-full shadow-sm text-[8px] md:text-[9px] font-bold tracking-widest text-[#1a3c28] uppercase transition-transform duration-500 group-hover:scale-105">
          ID: {plant.id}
        </div>
        <img
          src={plant.image}
          alt={`Image of ${plant.name}`}
          className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
          onError={(e) => (e.target.style.display = "none")}
        />
      </div>

      <div className="flex flex-col flex-1 px-1">
        <header className="flex justify-between items-start mb-2 md:mb-3 gap-2 md:gap-4">
          <h3 className="text-lg md:text-xl xl:text-2xl font-serif text-[#1a3c28] font-bold leading-tight group-hover:text-[#2b593f] transition-colors duration-300">
            {plant.name}
          </h3>
          <p className="text-base md:text-lg text-[#2b593f] font-semibold tracking-tight">
            ${plant.price.toFixed(2)}
          </p>
        </header>

        {/* Restored to line-clamp-3 so text doesn't feel overly cut off */}
        <p className="text-[#4A6053] text-[11px] md:text-xs xl:text-sm leading-relaxed mb-5 md:mb-6 flex-1 line-clamp-3">
          {plant.description}
        </p>

        <footer className="flex flex-col xl:flex-row items-center gap-2 md:gap-3 w-full mt-auto">
          <QuantitySelector
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
          <button
            onClick={handleAddToCart}
            className="flex-1 w-full bg-[#1a3c28] text-white rounded-xl py-2.5 md:py-3.5 px-4 flex items-center justify-center gap-2 font-medium text-sm hover:bg-[#112d20] transition-colors active:scale-[0.98]"
          >
            <ShoppingBag size={16} strokeWidth={2} />
            Add to Cart
          </button>
        </footer>
      </div>
    </article>
  );
}

function Plants() {
  return (
    <section className="w-full min-h-screen bg-[#F9FAF9] font-sans pt-28 md:pt-28 pb-16 md:pb-20 relative z-10">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20">
        <CollectionHeader />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
          {PLANTS_DATA.map((plant, index) => (
            <PlantCard key={plant.id} plant={plant} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Plants;
