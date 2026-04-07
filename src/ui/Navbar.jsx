import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left Side: Logo & Navigation */}
        <div className="flex items-center gap-10">
          <Link to="/" className="group">
            <span className="text-3xl font-serif italic font-bold text-forest-dark tracking-tight group-hover:opacity-70 transition-opacity">
              Forest at Home
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 mt-1">
            {["Plants", "Care Guides", "About", "Contact"].map((item) => (
              <NavLink
                key={item}
                to={`/${item.toLowerCase().replace(" ", "-")}`}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-forest-muted ${
                    isActive ? "text-forest-dark" : "text-gray-400"
                  }`
                }
              >
                {item}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right Side Tools */}
        <div className="flex items-center gap-6">
          <div className="relative group hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-forest-dark transition-colors" />
            <input
              type="text"
              placeholder="Search our nursery..."
              className="pl-11 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-full text-sm w-64 focus:outline-none focus:ring-4 focus:ring-forest-dark/5 focus:border-forest-dark focus:bg-white transition-all placeholder:text-gray-400"
            />
          </div>

          <Link
            to="/cart"
            className="relative p-2 text-forest-dark hover:scale-110 transition-transform"
          >
            <ShoppingCart className="w-6 h-6 stroke-[1.5px]" />
            <span className="absolute -top-0.5 -right-0.5 bg-forest-deep text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
              2
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
