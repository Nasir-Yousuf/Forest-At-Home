import React, { useEffect } from "react";
import { MapPin, Leaf } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  registerUser,
  clearError,
  selectAuthLoading,
  selectAuthError,
  selectIsLoggedIn,
} from "../auth/authSlice";
import { Loader2 } from "lucide-react";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  useEffect(() => {
    if (isLoggedIn) navigate("/plants");
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  async function onSubmit(data) {
    const result = await dispatch(
      registerUser({
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        address: data.address,
        city: data.city,
        zip: data.zip,
      }),
    );
    if (registerUser.fulfilled.match(result)) {
      navigate("/plants");
    }
  }

  const inputClass = (hasError) =>
    `w-full px-4 py-2.5 bg-[#f0f3f2] rounded-lg focus:bg-white focus:ring-1 outline-none transition-all text-sm ${
      hasError
        ? "border border-red-300 focus:ring-red-300"
        : "border-transparent focus:ring-[#1b3d2f] focus:border-[#1b3d2f]"
    }`;

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 py-12 font-sans selection:bg-[#1b3d2f] selection:text-white">
      {/* Background Overlay */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=2000"
          alt="background"
          className="w-full h-full object-cover blur-sm"
        />
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-3xl bg-white rounded-xl shadow-xl border border-gray-100 p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-[#1b3d2f] mb-3">
            Begin Your Collection
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Create your curated herbarium account for a personalized botanical
            experience.
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Personal Details Section */}
            <div className="space-y-4">
              <h2 className="text-[11px] font-bold tracking-widest text-[#3d5a42] uppercase">
                Personal Details
              </h2>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 ml-1">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Elias Thorne"
                  className={inputClass(errors.fullName)}
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-[10px] ml-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 ml-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className={inputClass(false)}
                  {...register("phone")}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 ml-1">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder="collector@forestathome.com"
                  className={inputClass(errors.email)}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-[10px] ml-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Shipping & Location Section */}
            <div className="space-y-4">
              <h2 className="text-[11px] font-bold tracking-widest text-[#3d5a42] uppercase">
                Shipping & Location
              </h2>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 ml-1">
                  Street Address
                </label>
                <input
                  type="text"
                  placeholder="123 Arboretum Way"
                  className={inputClass(false)}
                  {...register("address")}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700 ml-1">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Verdant Grove"
                    className={inputClass(false)}
                    {...register("city")}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700 ml-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    placeholder="90210"
                    className={inputClass(false)}
                    {...register("zip")}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 ml-1">
                  GPS Coordinates / Location Pin
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="45.523062, -122.676482"
                    className={`${inputClass(false)} pr-10`}
                    {...register("gps")}
                  />
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 cursor-pointer hover:text-[#1b3d2f]" />
                </div>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="space-y-4">
            <h2 className="text-[11px] font-bold tracking-widest text-[#3d5a42] uppercase">
              Security
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 ml-1">
                  Create Password <span className="text-red-400">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Min. 8 characters"
                  className={inputClass(errors.password)}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Minimum 8 characters" },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-[10px] ml-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 ml-1">
                  Confirm Password <span className="text-red-400">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Repeat password"
                  className={inputClass(errors.confirmPassword)}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (val) =>
                      val === password || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-[10px] ml-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1b3d2f] text-white font-semibold py-3 rounded-lg hover:bg-[#142e23] transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating Account…
                </>
              ) : (
                "Create Your Account"
              )}
            </button>

            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <span className="relative px-4 bg-white text-[10px] font-bold text-gray-400 tracking-widest">
                OR
              </span>
            </div>

            <button
              type="button"
              className="w-full bg-[#f0f3f2] text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              Register with Google
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center space-y-8">
          <p className="text-xs text-gray-600">
            Already a member?{" "}
            <Link
              to="/login"
              className="text-[#1b3d2f] font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>

          <div className="flex flex-col items-center gap-4">
            <Leaf className="w-5 h-5 text-[#3d5a42] opacity-80" />
            <blockquote className="text-gray-700 italic font-serif text-sm max-w-sm mx-auto">
              "In every walk with nature, one receives far more than he seeks."
              <span className="block mt-1 uppercase text-[10px] tracking-widest font-sans font-bold not-italic">
                — John Muir
              </span>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
