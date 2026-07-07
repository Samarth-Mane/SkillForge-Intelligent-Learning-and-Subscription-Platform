import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiAcademicCap, HiMail, HiArrowLeft, HiCheckCircle } from "react-icons/hi";
import toast from "react-hot-toast";
import { authService } from "../../services/authService";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch {
      toast.error("Unable to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="flex items-center gap-2 mb-10 justify-center">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-glow">
            <HiAcademicCap className="text-white text-xl" />
          </div>
          <span className="font-display font-bold text-2xl gradient-text">LearnFlow</span>
        </Link>

        <div className="card border border-white/10">
          {!sent ? (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-4">
                  <HiMail className="text-indigo-400 text-3xl" />
                </div>
                <h1 className="font-display text-2xl font-bold text-slate-100 mb-2">
                  Forgot password?
                </h1>
                <p className="text-slate-400 text-sm">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="input-field pl-11"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center flex items-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <HiCheckCircle className="text-emerald-400 text-3xl" />
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-100 mb-2">
                Check your inbox
              </h2>
              <p className="text-slate-400 text-sm mb-6">
                We've sent a password reset link to{" "}
                <span className="text-slate-200 font-medium">{email}</span>.
                Check your spam folder if it doesn't arrive.
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
              >
                Use a different email address
              </button>
            </motion.div>
          )}

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-slate-400 hover:text-slate-200 text-sm transition-colors"
            >
              <HiArrowLeft className="text-sm" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
