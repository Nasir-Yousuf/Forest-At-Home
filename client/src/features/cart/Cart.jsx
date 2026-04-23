import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  updateQuantity,
  removeItem,
} from "./cartSlice";
import {
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

// ==========================================
// 2. CHILD COMPONENT: Individual Plant Row
// ==========================================
function CartItem({ item, index, onUpdateQuantity, onRemoveItem }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100 * index);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <article
      className={`flex items-center gap-4 md:gap-6 bg-[#f4f7f5] p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] transition-all duration-700 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } hover:shadow-md group`}
    >
      {/* Left Side: Image */}
      <div
        className={`w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-2xl md:rounded-[1.5rem] overflow-hidden ${item.imageBg || "bg-white"} shadow-sm relative`}
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover mix-blend-multiply hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => (e.target.style.display = "none")}
        />
      </div>

      {/* Right Side: Details & Actions */}
      <div className="flex flex-col justify-between flex-1 py-1 md:py-2 h-full">
        <header className="flex justify-between items-start w-full">
          <span className="bg-[#c2ebd3] text-[#1a3c28] text-[7px] md:text-[8px] font-bold px-2 py-1 rounded-sm uppercase tracking-widest shadow-sm">
            {item.scientific ? `Scientific: ${item.scientific}` : "Botanical"}
          </span>
          <span className="font-serif text-lg md:text-xl text-[#1a3c28] font-medium leading-none">
            ৳{item.price.toFixed(2)}
          </span>
        </header>

        <div className="flex justify-between items-center w-full mt-2">
          <h3 className="font-serif text-lg md:text-xl text-[#1a3c28] font-semibold leading-tight truncate pr-2">
            {item.name}
          </h3>

          {/* Plus/Minus Buttons */}
          <div className="flex items-center gap-3 bg-[#e4ebe6] rounded-full px-2 md:px-3 py-1.5 shadow-sm transition-colors hover:bg-[#dce4df]">
            <button
              onClick={() => onUpdateQuantity(item.id, -1)}
              className="text-[#1a3c28]/60 hover:text-[#1a3c28] transition-colors p-0.5"
              disabled={item.quantity === 1}
              aria-label="Decrease quantity"
            >
              <Minus size={14} strokeWidth={2.5} />
            </button>
            <span className="text-[13px] md:text-sm font-semibold text-[#1a3c28] w-4 text-center">
              {item.quantity < 10 ? `0${item.quantity}` : item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, 1)}
              className="text-[#1a3c28]/60 hover:text-[#1a3c28] transition-colors p-0.5"
              aria-label="Increase quantity"
            >
              <Plus size={14} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <footer className="flex justify-between items-end w-full mt-1.5 md:mt-2">
          <p className="text-[11px] md:text-xs text-[#4a6053] font-medium truncate pr-4">
            {item.subtitle || "Premium Botanical Specimen"}
          </p>
          <button
            onClick={() => onRemoveItem(item.id)}
            className="text-[#1a3c28]/40 hover:text-red-500 transition-colors p-1"
            aria-label="Remove item from cart"
          >
            <Trash2 size={18} strokeWidth={2} />
          </button>
        </footer>
      </div>
    </article>
  );
}

// ==========================================
// 3. CHILD COMPONENT: Order Summary Panel
// ==========================================
function OrderSummary({ subtotal, shipping, tax, total, onCheckout }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <aside
      className={`bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-32 transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <h2 className="font-serif text-2xl text-[#1a3c28] mb-6 font-medium">
        Summary
      </h2>

      {/* Cost Breakdown */}
      <div className="space-y-4 text-sm text-[#4a6053] font-medium mb-8">
        <div className="flex justify-between items-center">
          <span>Archive Subtotal</span>
          <span className="text-[#1a3c28] font-bold">
            ৳{subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Climate-Controlled Shipping</span>
          <span className="text-[#1a3c28] font-bold">
            ৳{shipping.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Environmental Tax (Estimated)</span>
          <span className="text-[#1a3c28] font-bold">৳{tax.toFixed(2)}</span>
        </div>
      </div>

      <hr className="border-[#1a3c28]/10 mb-6" />

      {/* Final Total */}
      <div className="flex justify-between items-end mb-8">
        <span className="text-[10px] md:text-xs text-[#4a6053] tracking-[0.15em] uppercase font-bold pb-1">
          Total Investment
        </span>
        <span className="font-serif text-3xl md:text-4xl text-[#1a3c28] font-medium leading-none">
          ৳{total.toFixed(2)}
        </span>
      </div>

      {/* Checkout Action */}
      <button
        onClick={onCheckout}
        className="w-full bg-[#1a3c28] text-white rounded-2xl py-4 flex items-center justify-center gap-3 font-medium text-sm md:text-base hover:bg-[#112d20] hover:shadow-lg transition-all duration-300 group active:scale-[0.98] mb-6"
      >
        Proceed to Checkout
        <ArrowRight
          size={18}
          className="transform group-hover:translate-x-1 transition-transform"
        />
      </button>

      {/* Trust Badge */}
      <div className="bg-[#f4f7f5] rounded-2xl p-4 flex items-start gap-3">
        <ShieldCheck size={20} className="text-[#2b593f] shrink-0 mt-0.5" />
        <p className="text-[11px] md:text-xs text-[#4a6053] leading-relaxed font-medium">
          Every specimen in your collection is inspected by our botanists and
          includes a 30-day health guarantee.
        </p>
      </div>
    </aside>
  );
}

// ==========================================
// 4. EMPTY CART STATE
// ==========================================
function EmptyCart() {
  return (
    <div className="text-center py-20 bg-[#f4f7f5] rounded-[2rem] flex flex-col items-center gap-6">
      <ShoppingBag size={48} strokeWidth={1} className="text-[#1a3c28]/30" />
      <div>
        <p className="text-[#1a3c28] font-serif text-2xl mb-2">
          Your collection is empty.
        </p>
        <p className="text-[#4a6053] text-sm font-medium">
          Explore our catalogue to curate your perfect botanical selection.
        </p>
      </div>
      <Link
        to="/plants"
        className="bg-[#1a3c28] text-white px-8 py-3 rounded-xl font-medium text-sm hover:bg-[#112d20] transition-colors"
      >
        Browse Plants
      </Link>
    </div>
  );
}

// ==========================================
// 5. MAIN PARENT COMPONENT: The Page Layout
// ==========================================
function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  useEffect(() => {
    setIsHeaderVisible(true);
  }, []);

  const shipping = subtotal > 0 ? 150.0 : 0;
  const tax = subtotal * 0.05;
  const grandTotal = subtotal + shipping + tax;

  function handleUpdateQuantity(id, change) {
    dispatch(updateQuantity({ id, change }));
  }

  function handleRemoveItem(id) {
    dispatch(removeItem(id));
  }

  function handleCheckout() {
    navigate("/order");
  }

  return (
    <main className="min-h-screen bg-[#F9FAF9] font-sans pt-32 pb-24 md:pt-40 md:pb-32 px-4 md:px-8 lg:px-16 selection:bg-[#c2ebd3] selection:text-[#1a3c28]">
      <div className="max-w-[1300px] mx-auto relative z-10">
        <header
          className={`mb-8 md:mb-12 transition-all duration-1000 ease-out ${
            isHeaderVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] text-[#1a3c28] tracking-tight">
            Your Collection
          </h1>
          {cart.length > 0 && (
            <p className="text-[#4a6053] text-sm font-medium mt-2">
              {cart.reduce((t, i) => t + i.quantity, 0)} specimen
              {cart.reduce((t, i) => t + i.quantity, 0) !== 1 ? "s" : ""}{" "}
              selected
            </p>
          )}
        </header>

        <section className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
          {/* Left Side: Cart Items */}
          <div className="flex-1 flex flex-col gap-4 md:gap-5">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <CartItem
                  key={item.id}
                  item={item}
                  index={index}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                />
              ))
            ) : (
              <EmptyCart />
            )}

            {cart.length > 0 && (
              <div className="hidden lg:flex mt-8">
                <Link
                  to="/plants"
                  className="flex items-center gap-2 text-sm text-[#1a3c28] font-bold hover:text-[#2b593f] transition-colors group"
                >
                  <ArrowLeft
                    size={16}
                    className="transform group-hover:-translate-x-1 transition-transform"
                  />
                  Continue Curating
                </Link>
              </div>
            )}
          </div>

          {/* Right Side: Order Summary */}
          {cart.length > 0 && (
            <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0">
              <OrderSummary
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={grandTotal}
                onCheckout={handleCheckout}
              />

              {/* Mobile Back Button */}
              <div className="flex lg:hidden justify-center mt-6">
                <Link
                  to="/plants"
                  className="flex items-center gap-2 text-sm text-[#1a3c28] font-bold hover:text-[#2b593f] transition-colors group"
                >
                  <ArrowLeft
                    size={16}
                    className="transform group-hover:-translate-x-1 transition-transform"
                  />
                  Continue Curating
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default CartPage;
