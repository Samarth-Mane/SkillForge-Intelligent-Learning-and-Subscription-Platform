import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiAcademicCap, HiMail, HiLockClosed, HiUser,
  HiEye, HiEyeOff, HiCheck,
} from "react-icons/hi";
import { FaGoogle, FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const passwordRules = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "One number", test: (p) => /\d/.test(p) },
];

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const initialPlan = searchParams.get("plan") || "free";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    plan: initialPlan,
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      toast.success("Account created! Welcome to LearnFlow 🎉");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-violet-900/30 via-navy-800 to-navy-900 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-3xl" />

        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-glow">
            <HiAcademicCap className="text-white text-xl" />
          </div>
          <span className="font-display font-bold text-2xl gradient-text">LearnFlow</span>
        </Link>

        <div className="relative z-10">
          <h2 className="font-display text-4xl font-extrabold text-slate-100 mb-6 leading-tight">
            Start your learning journey today.
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Get access to expert-led courses, earn verified certificates, and take the next step in your career.
          </p>

          {/* Plan highlight */}
          <div className="glass rounded-2xl p-6 border-indigo-500/30">
            <div className="flex items-center gap-2 mb-3">
              <span className="badge-plus px-3 py-1 text-sm">PLUS Plan Selected</span>
            </div>
            <ul className="space-y-2">
              {[
                "Access to 800+ PLUS courses",
                "Professional certificates",
                "Priority support",
                "7-day free trial",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                  <HiCheck className="text-indigo-400 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-slate-600 text-sm relative z-10">
          © {new Date().getFullYear()} LearnFlow. All rights reserved.
        </p>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md py-8"
        >
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <HiAcademicCap className="text-white" />
            </div>
            <span className="font-display font-bold text-xl gradient-text">LearnFlow</span>
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-slate-100 mb-2">
              Create your account
            </h1>
            <p className="text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          {/* Social */}
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

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="input-field pl-11 pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showPass ? <HiEyeOff /> : <HiEye />}
                </button>
              </div>

              {/* Password strength */}
              {form.password && (
                <div className="mt-2 space-y-1">
                  {passwordRules.map(({ label, test }) => (
                    <div key={label} className="flex items-center gap-2">
                      <div
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                          test(form.password)
                            ? "bg-emerald-500/20 border border-emerald-500"
                            : "bg-navy-700 border border-navy-600"
                        }`}
                      >
                        {test(form.password) && (
                          <HiCheck className="text-emerald-400 text-xs" />
                        )}
                      </div>
                      <span
                        className={`text-xs ${
                          test(form.password) ? "text-emerald-400" : "text-slate-600"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  className={`input-field pl-11 ${
                    form.confirmPassword && form.password !== form.confirmPassword
                      ? "border-red-500/50"
                      : ""
                  }`}
                  required
                />
              </div>
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
              )}
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                required
                className="w-4 h-4 mt-0.5 rounded border-white/10 bg-navy-800 accent-indigo-500"
              />
              <label htmlFor="terms" className="text-sm text-slate-400">
                I agree to the{" "}
                <Link to="/" className="text-indigo-400 hover:text-indigo-300">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</Link>
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
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
