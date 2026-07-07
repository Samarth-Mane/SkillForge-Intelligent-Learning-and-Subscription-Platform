import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { HiAcademicCap, HiMail, HiLockClosed, HiEye, HiEyeOff } from "react-icons/hi";
import { FaGoogle, FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await login(form);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-navy-800 via-indigo-900/30 to-navy-900 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-3xl" />

        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-glow">
            <HiAcademicCap className="text-white text-xl" />
          </div>
          <span className="font-display font-bold text-2xl gradient-text">LearnFlow</span>
        </Link>

        <div className="relative z-10">
          <h2 className="font-display text-4xl font-extrabold text-slate-100 mb-6 leading-tight">
            Your next career move starts here.
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Join 50,000+ professionals learning from the best instructors in the industry.
          </p>

          {/* Mini stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "1,200+", label: "Courses" },
              { value: "50K+", label: "Learners" },
              { value: "98%", label: "Satisfaction" },
            ].map(({ value, label }) => (
              <div key={label} className="glass rounded-xl p-4 text-center">
                <p className="font-display font-bold text-xl gradient-text-indigo">{value}</p>
                <p className="text-slate-500 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-slate-600 text-sm relative z-10">
          © {new Date().getFullYear()} LearnFlow. All rights reserved.
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <HiAcademicCap className="text-white" />
            </div>
            <span className="font-display font-bold text-xl gradient-text">LearnFlow</span>
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-slate-100 mb-2">
              Welcome back
            </h1>
            <p className="text-slate-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                Sign up free
              </Link>
            </p>
          </div>

          {/* Social logins */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="btn-secondary flex items-center justify-center gap-2 text-sm">
              <FaGoogle className="text-red-400" />
              Google
            </button>
            <button className="btn-secondary flex items-center justify-center gap-2 text-sm">
              <FaGithub />
              GitHub
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 glow-divider" />
            <span className="text-slate-600 text-sm">or</span>
            <div className="flex-1 glow-divider" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="input-field pl-11 pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {showPass ? <HiEyeOff /> : <HiEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-white/10 bg-navy-800 accent-indigo-500"
              />
              <label htmlFor="remember" className="text-sm text-slate-400">
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-slate-600 text-xs">
            By signing in, you agree to our{" "}
            <Link to="/" className="text-slate-400 hover:text-slate-300">Terms of Service</Link>
            {" "}and{" "}
            <Link to="/" className="text-slate-400 hover:text-slate-300">Privacy Policy</Link>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
