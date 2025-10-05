import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/authService";

const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup({ name: form.name, email: form.email, password: form.password });
      navigate("/", { replace: true });
    } catch (e) {
      setError(e?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-50 via-green-50 to-lime-100 p-4">
      {/* Farm-themed background elements - mobile optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Light organic floating elements */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-yellow-100 to-amber-200 rounded-full opacity-15 animate-float-slow"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-green-100 to-lime-200 rounded-full opacity-20 animate-float-medium"></div>
        <div className="absolute -bottom-10 left-1/3 w-44 h-44 bg-gradient-to-br from-lime-100 to-green-200 rounded-full opacity-12 animate-float-slow animation-delay-2000"></div>

        {/* Subtle light particle effect */}
        <div className="absolute top-12 left-1/4 w-2 h-2 bg-yellow-200 rounded-full opacity-20 animate-particle"></div>
        <div className="absolute bottom-28 right-1/4 w-1.5 h-1.5 bg-green-200 rounded-full opacity-25 animate-particle animation-delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-amber-200 rounded-full opacity-22 animate-particle animation-delay-3000"></div>
      </div>

      {/* Main card - mobile optimized */}
      <div className={`relative w-full max-w-sm mx-auto transition-all duration-500 transform ${
        mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        <div className="backdrop-blur-lg bg-white/85 rounded-2xl border border-white/30 shadow-xl p-6 relative overflow-hidden">
          {/* Simplified gradient overlay */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-lime-500 to-green-600"></div>
          
          {/* Compact header for mobile */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-lime-500 to-green-600 rounded-xl mb-3 transform active:scale-95 transition-transform shadow-lg relative">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 via-lime-600 to-yellow-600 bg-clip-text text-transparent mb-1">🌱 Start Your Farm Journey</h1>
            <p className="text-gray-700 text-sm font-medium">Register your agricultural business</p>
          </div>

          {/* Error message - mobile optimized */}
          {error && (
            <div className="p-3 rounded-xl bg-red-50/90 backdrop-blur-sm text-red-700 border border-red-200 mb-4 animate-shake text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Form optimized for mobile */}
          <form className="space-y-4" onSubmit={onSubmit}>
            {/* Name field - mobile friendly */}
            <div className="transform transition-all duration-300 active:scale-98">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-base">🧑‍🌾</span>
                Farm Owner Name
              </label>
              <div className="relative">
                <input
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-white/60 transition-all duration-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white outline-none text-base"
                  name="name"
                  placeholder="e.g. John Smith (Farm Owner)"
                  value={form.name}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            {/* Email field - mobile friendly */}
            <div className="transform transition-all duration-300 active:scale-98">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-base">📧</span>
                Email Address
              </label>
              <div className="relative">
                <input
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-white/60 transition-all duration-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white outline-none text-base"
                  type="email"
                  name="email"
                  placeholder="farmer@yourfarm.com"
                  value={form.email}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            {/* Password field - mobile friendly */}
            <div className="transform transition-all duration-300 active:scale-98">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-base">🔐</span>
                Secure Password
              </label>
              <div className="relative">
                <input
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 bg-white/60 transition-all duration-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white outline-none text-base"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={onChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 active:text-emerald-600 transition-colors p-2 rounded-lg active:bg-emerald-50"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile-optimized submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 px-5 py-4 bg-gradient-to-r from-lime-600 via-green-600 to-green-700 text-white font-semibold rounded-xl active:from-lime-700 active:to-green-800 disabled:opacity-60 transform transition-all duration-200 active:scale-95 focus:ring-2 focus:ring-lime-200 text-base"
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Setting up farm...
                  </>
                ) : (
                  <>
                    🌾 Register Farm Account
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Mobile-optimized footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link 
                className="text-green-600 font-semibold active:text-green-700 transition-colors" 
                to="/login"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced animations for mobile */}
      <style>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 0.2;
          }
          25% {
            transform: translate(8px, -12px) rotate(2deg) scale(1.05);
            opacity: 0.25;
          }
          50% {
            transform: translate(-6px, 8px) rotate(-1deg) scale(0.95);
            opacity: 0.15;
          }
          75% {
            transform: translate(10px, -8px) rotate(1deg) scale(1.02);
            opacity: 0.22;
          }
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }

        @keyframes float-medium {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.25;
          }
          33% {
            transform: translate(-10px, -8px) rotate(-3deg);
            opacity: 0.3;
          }
          66% {
            transform: translate(8px, 6px) rotate(2deg);
            opacity: 0.2;
          }
        }
        .animate-float-medium {
          animation: float-medium 8s ease-in-out infinite;
        }

        @keyframes particle {
          0% {
            transform: translateY(0px) scale(0.8);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) scale(1.2);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-40px) scale(0.6);
            opacity: 0.1;
          }
        }
        .animate-particle {
          animation: particle 4s ease-out infinite;
        }

        @keyframes sway {
          0%, 100% {
            transform: translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateX(2px) rotate(1deg);
          }
          75% {
            transform: translateX(-2px) rotate(-1deg);
          }
        }
        .animate-sway {
          animation: sway 6s ease-in-out infinite;
        }

        @keyframes gentle-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
        .animate-gentle-pulse {
          animation: gentle-pulse 4s ease-in-out infinite;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SignupPage;
