import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, loginWithGoogle, clearError, selectAuthLoading, selectAuthError, selectIsLoggedIn } from "../auth/authSlice";
import { Loader2 } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";

// ==========================================
// 1. CUSTOM SVG ICON (Crash-proof Google Logo)
// ==========================================
function GoogleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

// ==========================================
// 2. CHILD COMPONENT: Header Text
// ==========================================
function LoginHeader() {
  return (
    <>
      <header className="text-center mb-8">
        <h1 className="font-serif text-2xl md:text-3xl text-[#1a3c28] font-bold">
          Forest At Home
        </h1>
        <span className="text-[8px] font-bold tracking-[0.2em] text-[#4a6053] uppercase mt-1.5 block">
          Botanical Precision
        </span>
      </header>

      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl md:text-3xl text-[#1a3c28] font-semibold leading-tight mb-3">
          Welcome Back to the <br /> Sanctuary
        </h2>
        <p className="text-[13px] md:text-sm text-[#4a6053] font-medium px-4">
          Access your curated herbarium and scientific rituals.
        </p>
      </div>
    </>
  );
}

// ==========================================
// 3. CHILD COMPONENT: The Login Form
// ==========================================
function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      navigate("/plants");
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-600 font-medium">
          {error}
        </div>
      )}

      {/* Email Input */}
      <div>
        <label className="block text-[9px] md:text-[10px] font-bold tracking-widest text-[#1a3c28] uppercase mb-2 ml-1">
          Email or Phone Number
        </label>
        <input
          type="text"
          placeholder="yourname@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#f4f7f5] text-[#1a3c28] placeholder-[#1a3c28]/40 border border-transparent focus:border-[#1a3c28]/20 focus:bg-white focus:outline-none rounded-xl px-4 py-3.5 text-sm transition-colors font-medium"
        />
      </div>

      {/* Password Input */}
      <div>
        <div className="flex justify-between items-center mb-2 ml-1">
          <label className="text-[9px] md:text-[10px] font-bold tracking-widest text-[#1a3c28] uppercase">
            Password
          </label>
          <a
            href="#"
            className="text-[9px] md:text-[10px] font-semibold text-[#4a6053] hover:text-[#1a3c28] transition-colors"
          >
            Forgot Password?
          </a>
        </div>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-[#f4f7f5] text-[#1a3c28] placeholder-[#1a3c28]/40 border border-transparent focus:border-[#1a3c28]/20 focus:bg-white focus:outline-none rounded-xl px-4 py-3.5 text-sm transition-colors font-medium tracking-widest"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#1a3c28] text-white rounded-xl py-4 font-medium hover:bg-[#112d20] transition-all shadow-md hover:shadow-lg active:scale-[0.98] mt-2 text-sm md:text-base flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Signing in…
          </>
        ) : (
          "Login to Your Sanctuary"
        )}
      </button>
    </form>
  );
}

// ==========================================
// 4. CHILD COMPONENT: Alternative Logins
// ==========================================
function SocialLogins() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthLoading);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // For useGoogleLogin, we usually get an access token. 
      // However, @react-oauth/google's useGoogleLogin can be configured for implicit or auth code flow.
      // If we want an ID Token (common for social login), we should use the standard GoogleLogin component 
      // or exchange the access token for user info.
      // Actually, standard practice for many MERN apps is sending the access token to backend 
      // and let backend fetch the profile.
      // But let's try the implicit flow and see what we get.
      dispatch(loginWithGoogle({ accessToken: tokenResponse.access_token }));
    },
    onError: () => console.log("Google Login Failed"),
  });

  return (
    <>
      <div className="flex items-center gap-4 my-6">
        <div className="h-[1px] flex-1 bg-[#1a3c28]/10"></div>
        <span className="text-[9px] font-bold text-[#4a6053] tracking-widest uppercase">
          Or
        </span>
        <div className="h-[1px] flex-1 bg-[#1a3c28]/10"></div>
      </div>

      <button 
        type="button"
        disabled={isLoading}
        onClick={() => handleGoogleLogin()}
        className="w-full bg-white border border-[#1a3c28]/10 text-[#1a3c28] rounded-xl py-3.5 font-semibold text-sm md:text-base flex items-center justify-center gap-3 hover:bg-[#f4f7f5] transition-colors shadow-sm active:scale-[0.98] disabled:opacity-50"
      >
        <GoogleIcon />
        Login with Google
      </button>

      <p className="text-center text-[11px] md:text-xs text-[#4a6053] mt-8 font-medium">
        New to the Forest?{" "}
        <Link
          to="/registration"
          className="font-bold text-[#1a3c28] border-b-[1.5px] border-[#1a3c28] hover:opacity-60 transition-opacity pb-0.5"
        >
          Create an Account
        </Link>
      </p>
    </>
  );
}

// ==========================================
// 5. MAIN PARENT COMPONENT
// ==========================================
function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isVisible, setIsVisible] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) navigate("/plants");
  }, [isLoggedIn, navigate]);

  // Clear any stale errors on mount
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Smooth fade-in animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-4 pt-32 pb-16 md:pt-40 selection:bg-[#c2ebd3] selection:text-[#1a3c28]">
      {/* Immersive Plant Background with Frosted Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1416879598555-eace51c5e4d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2500&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-[#eef2ef]/60 backdrop-blur-[6px]"></div>
      </div>

      {/* Main Login Card Container */}
      <div
        className={`relative z-10 w-full max-w-[440px] bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(26,60,40,0.20)] p-8 md:p-10 transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <LoginHeader />
        <LoginForm />
        <SocialLogins />
      </div>
    </main>
  );
}

export default LoginPage;
