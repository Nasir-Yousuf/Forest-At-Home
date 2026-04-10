import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle the initial fade-in animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // --- THE FIX ---
  // We wrap the setter in a condition.
  // This prevents the "cascading render" error because it only updates when necessary.
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [location.pathname]);

  const fadeUp = `transition-all duration-1000 ease-out ${
    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
  }`;

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-6 px-6 md:px-16 lg:px-24 pointer-events-none bg-gradient-to-b from-[#eef2ef]/90 via-[#eef2ef]/50 to-transparent backdrop-blur-[2px]">
      <div className="w-full max-w-[1400px] mx-auto flex justify-between items-center pointer-events-auto">
        {/* Logo */}
        <Link
          to="/"
          className={`text-2xl font-serif italic font-bold text-[#1a3c28] ${fadeUp} delay-75`}
        >
          Forest At Home
        </Link>

        {/* Desktop Links */}
        <div
          className={`hidden md:flex space-x-10 text-xs font-bold tracking-widest uppercase ${fadeUp} delay-150`}
        >
          <Link
            to="/"
            className={`transition-colors ${isActive("/") ? "text-[#1a3c28] border-b-2 border-[#1a3c28] pb-1" : "text-[#1a3c28]/70 hover:text-[#1a3c28]"}`}
          >
            Home
          </Link>
          <Link
            to="/plants"
            className={`transition-colors ${isActive("/plants") ? "text-[#1a3c28] border-b-2 border-[#1a3c28] pb-1" : "text-[#1a3c28]/70 hover:text-[#1a3c28]"}`}
          >
            Collections
          </Link>
        </div>

        {/* Icons & Mobile Toggle */}
        <div
          className={`flex items-center space-x-4 md:space-x-6 text-[#1a3c28] ${fadeUp} delay-300`}
        >
          <Link
            to="/cart"
            className="hover:opacity-70 transition-opacity"
            aria-label="Cart"
          >
            <ShoppingBag size={20} />
          </Link>
          <Link
            to="/login"
            className="bg-white/80 backdrop-blur-md text-[#1a3c28] rounded-full p-1 shadow-sm hover:shadow-md transition-shadow hidden md:block"
            aria-label="Profile"
          >
            <User size={20} />
          </Link>

          <button
            className="md:hidden p-1 hover:opacity-70 transition-opacity"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#f4f7f5]/95 backdrop-blur-2xl border-b border-[#1a3c28]/10 transition-all duration-500 ease-in-out overflow-hidden pointer-events-auto ${
          isMobileMenuOpen
            ? "max-h-[80vh] opacity-100 py-12"
            : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="flex flex-col items-center space-y-8 text-sm font-bold tracking-widest uppercase">
          <Link
            to="/"
            className={isActive("/") ? "text-[#1a3c28]" : "text-[#1a3c28]/70"}
          >
            Home
          </Link>
          <Link
            to="/plants"
            className={
              isActive("/plants") ? "text-[#1a3c28]" : "text-[#1a3c28]/70"
            }
          >
            Collections
          </Link>

          {/* Into the Wild Easter Egg / Quote Placeholder */}
          <div className="pt-8 border-t border-[#1a3c28]/10 w-2/3 text-center">
            <p className="text-[10px] italic font-serif text-[#1a3c28]/40 normal-case tracking-normal">
              "Happiness is only real when shared."
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
