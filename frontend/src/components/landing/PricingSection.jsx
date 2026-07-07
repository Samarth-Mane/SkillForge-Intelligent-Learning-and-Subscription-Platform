import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiCheck, HiLightningBolt, HiStar } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { subscriptionService } from "../../services/courseService";
import { toast } from "react-hot-toast";

const plans = [
  {
    name: "Free",
    badge: null,
    price: "$0",
    period: "forever",
    description: "Start your learning journey with essential courses.",
    color: "from-slate-600 to-slate-700",
    borderColor: "border-white/10",
    features: [
      "Access to FREE courses",
      "Basic completion certificate",
      "Community forum access",
      "Mobile app access",
      "Self-paced learning",
    ],
    cta: "Get Started Free",
    ctaClass: "btn-secondary w-full justify-center",
    to: "/register",
  },
  {
    name: "Plus",
    badge: "Most Popular",
    price: "$29",
    period: "per month",
    description: "Perfect for professionals looking to advance quickly.",
    color: "from-indigo-600 to-violet-700",
    borderColor: "border-indigo-500/50",
    glow: true,
    features: [
      "All FREE courses included",
      "Access to PLUS courses",
      "Professional learning certificate",
      "Priority support",
      "Downloadable resources",
      "Quiz & assessments",
      "Progress tracking",
    ],
    cta: "Start Plus Trial",
    ctaClass: "btn-primary w-full justify-center",
    to: "/register?plan=plus",
  },
  {
    name: "Premium",
    badge: null,
    price: "$59",
    period: "per month",
    description: "The complete package for career transformation.",
    color: "from-violet-600 to-purple-700",
    borderColor: "border-violet-500/30",
    features: [
      "Everything in Plus",
      "Access to PREMIUM courses",
      "Industry-ready certificates",
      "1:1 mentorship sessions",
      "Career placement support",
      "LinkedIn badge",
      "Early access to new courses",
      "Custom learning paths",
    ],
    cta: "Go Premium",
    ctaClass: "btn-outline w-full justify-center border-violet-500/50 text-violet-400 hover:bg-violet-500/10",
    to: "/register?plan=premium",
  },
];

const PricingSection = () => {

  const navigate = useNavigate();

  const handleSubscribe = async (plan) => {
    try {

      const token = localStorage.getItem("token");

      if (!token) {
        navigate(`/register?plan=${plan.toLowerCase()}`);
        return;
      }

      await subscriptionService.subscribe(plan);

      toast.success(`${plan} subscription activated!`);

      navigate("/profile");

    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Unable to update subscription."
      );
    }
  };

  return (
  <section className="section-padding" id="pricing">
    <div className="container-max">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">
          Simple Pricing
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
          Invest in Your Future
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Cancel anytime. No hidden fees. Start free and upgrade when you're ready.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={`relative glass rounded-2xl p-8 border ${plan.borderColor} ${
              plan.glow ? "shadow-glow" : ""
            } ${plan.name === "Plus" ? "scale-105 md:scale-105" : ""}`}
          >
            {/* Popular badge */}
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-glow-sm">
                  <HiStar className="text-yellow-300" />
                  {plan.badge}
                </span>
              </div>
            )}

            {/* Plan header */}
            <div className="mb-6">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4 shadow-lg`}
              >
                {plan.name === "Free" ? (
                  <HiLightningBolt className="text-white text-xl" />
                ) : plan.name === "Plus" ? (
                  <HiLightningBolt className="text-white text-xl" />
                ) : (
                  <HiStar className="text-white text-xl" />
                )}
              </div>
              <h3 className="font-display font-bold text-xl text-slate-100 mb-1">
                {plan.name}
              </h3>
              <p className="text-slate-500 text-sm">{plan.description}</p>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-end gap-1">
                <span className="font-display font-extrabold text-4xl gradient-text-indigo">
                  {plan.price}
                </span>
                <span className="text-slate-500 text-sm pb-1">/{plan.period}</span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm">
                  <HiCheck className="text-indigo-400 text-base mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>

			<button
			    onClick={() => {
			        console.log("BUTTON CLICKED");
			        handleSubscribe(plan.name.toUpperCase());
			    }}
			    className={`flex items-center justify-center ${plan.ctaClass}`}
			>
			    {plan.cta}
			</button>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-slate-600 text-sm mt-8"
      >
        All plans include a 7-day free trial. Cancel anytime.
      </motion.p>
    </div>
	  </section>
	  );
	};

export default PricingSection;
