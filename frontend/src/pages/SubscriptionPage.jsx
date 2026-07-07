import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiCheck, HiStar, HiLightningBolt, HiShieldCheck } from "react-icons/hi";
import { subscriptionService } from "../services/courseService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const PLANS = [
    {
        id: "free",
        name: "Free",
        monthlyPrice: 0,
        yearlyPrice: 0,
        description: "Start learning with no commitment.",
        icon: HiLightningBolt,
        color: "from-slate-600 to-slate-700",
        border: "border-white/10",
        features: [
            { text: "Access to 200+ FREE courses", included: true },
            { text: "Basic completion certificate", included: true },
            { text: "Community forum", included: true },
            { text: "Mobile app access", included: true },
            { text: "PLUS courses", included: false },
            { text: "Professional certificate", included: false },
            { text: "Priority support", included: false },
            { text: "PREMIUM courses", included: false },
        ],
        cta: "Get Started Free",
        ctaStyle: "btn-secondary w-full justify-center",
        to: "/register",
    },
    {
        id: "plus",
        name: "Plus",
        monthlyPrice: 29,
        yearlyPrice: 228,
        description: "For professionals who want to grow fast.",
        icon: HiLightningBolt,
        color: "from-indigo-600 to-violet-700",
        border: "border-indigo-500/40",
        popular: true,
        glow: true,
        features: [
            { text: "All FREE courses", included: true },
            { text: "800+ PLUS courses", included: true },
            { text: "Professional learning certificate", included: true },
            { text: "Priority support (24h)", included: true },
            { text: "Downloadable resources", included: true },
            { text: "Quizzes & assessments", included: true },
            { text: "Progress tracking", included: true },
            { text: "PREMIUM courses", included: false },
        ],
        cta: "Start Plus — 7 Days Free",
        ctaStyle: "btn-primary w-full justify-center",
        to: "/register?plan=plus",
    },
    {
        id: "premium",
        name: "Premium",
        monthlyPrice: 59,
        yearlyPrice: 468,
        description: "The complete career transformation package.",
        icon: HiStar,
        color: "from-violet-600 to-purple-700",
        border: "border-violet-500/30",
        features: [
            { text: "Everything in Plus", included: true },
            { text: "500+ PREMIUM courses", included: true },
            { text: "Industry-ready certificates", included: true },
            { text: "1:1 mentorship sessions", included: true },
            { text: "Career placement support", included: true },
            { text: "LinkedIn badge", included: true },
            { text: "Early access to new courses", included: true },
            { text: "Custom learning paths", included: true },
        ],
        cta: "Go Premium",
        ctaStyle: "btn-outline w-full justify-center border-violet-500/40 text-violet-400",
        to: "/register?plan=premium",
    },
];

const FAQ = [
    { q: "Can I switch plans anytime?", a: "Yes, you can upgrade or downgrade at any time. Changes take effect at the next billing cycle." },
    { q: "Is there a free trial?", a: "Plus and Premium plans include a 7-day free trial. No credit card required to start." },
    { q: "What happens to my progress if I downgrade?", a: "Your progress is always saved. You'll retain access to free courses and your earned certificates." },
    { q: "Are certificates internationally recognized?", a: "Our QR-verified certificates are recognized by 500+ partner companies globally, including Fortune 500 firms." },
    { q: "Can I cancel anytime?", a: "Absolutely. No lock-in contracts. Cancel with one click from your dashboard." },
    { q: "Do you offer team or corporate plans?", a: "Yes! Contact our sales team for custom enterprise pricing and bulk seat discounts." },
];

const SubscriptionPage = () => {
    const [isYearly, setIsYearly] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);
    const { isAuthenticated } = useAuth();

    return (
        <div className="pt-16 min-h-screen">
            {/* Hero */}
            <section className="section-padding pb-10 text-center relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(ellipse, #6366F1, transparent)" }} />
                </div>
                <div className="container-max relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">Simple Pricing</p>
                        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-100 mb-4">
                            Invest in Your <span className="gradient-text">Future</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
                            Every plan includes a 7-day free trial. No credit card required. Cancel anytime.
                        </p>

                        {/* Billing toggle */}
                        <div className="inline-flex items-center gap-3 glass rounded-2xl p-1.5">
                            <button onClick={() => setIsYearly(false)} className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${!isYearly ? "bg-indigo-500 text-white shadow-glow-sm" : "text-slate-400"}`}>Monthly</button>
                            <button onClick={() => setIsYearly(true)} className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${isYearly ? "bg-indigo-500 text-white shadow-glow-sm" : "text-slate-400"}`}>
                                Yearly
                                <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full border border-emerald-500/30">Save 35%</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Plans */}
            <section className="section-padding pt-0">
                <div className="container-max">
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {PLANS.map((plan, i) => {
                            const Icon = plan.icon;
                            const price = isYearly ? Math.round(plan.yearlyPrice / 12) : plan.monthlyPrice;
                            return (
                                <motion.div
                                    key={plan.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`relative glass rounded-2xl p-8 border ${plan.border} ${plan.glow ? "shadow-glow" : ""} ${plan.popular ? "scale-[1.03]" : ""}`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                            <span className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-glow-sm">
                                                <HiStar className="text-yellow-300 text-xs" /> Most Popular
                                            </span>
                                        </div>
                                    )}

                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4 shadow-lg`}>
                                        <Icon className="text-white text-xl" />
                                    </div>

                                    <h3 className="font-display font-bold text-xl text-slate-100 mb-1">{plan.name}</h3>
                                    <p className="text-slate-500 text-sm mb-6">{plan.description}</p>

                                    <div className="mb-6">
                                        <div className="flex items-end gap-1">
                                            <span className="font-display font-extrabold text-4xl gradient-text-indigo">
                                                {price === 0 ? "Free" : `$${price}`}
                                            </span>
                                            {price > 0 && <span className="text-slate-500 text-sm pb-1">/mo</span>}
                                        </div>
                                        {isYearly && price > 0 && (
                                            <p className="text-emerald-400 text-xs mt-1">Billed ${plan.yearlyPrice}/year · Save ${(plan.monthlyPrice * 12) - plan.yearlyPrice}</p>
                                        )}
                                    </div>

                                    <ul className="space-y-2.5 mb-8">
                                        {plan.features.map(({ text, included }) => (
                                            <li key={text} className="flex items-center gap-2.5 text-sm">
                                                {included
                                                    ? <HiCheck className="text-indigo-400 flex-shrink-0" />
                                                    : <HiCheck className="text-slate-700 flex-shrink-0" />
                                                }
                                                <span className={included ? "text-slate-300" : "text-slate-600 line-through"}>{text}</span>
                                            </li>
                                        ))}
                                    </ul>
									<button
									    onClick={async () => {

									        if (!isAuthenticated) {
									            window.location.href = plan.to;
									            return;
									        }

									        try {

									            await subscriptionService.subscribe(plan.id.toUpperCase());

									            toast.success(`${plan.name} subscription activated!`);

									            window.location.href = "/dashboard";

									        } catch (err) {

									            toast.error(
									                err?.response?.data?.message || "Subscription failed"
									            );

									        }

									    }}
									    className={`flex items-center justify-center ${plan.ctaStyle}`}
									>
									    {plan.cta}
									</button>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Trust badges */}
                    <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
                        {[
                            { icon: HiShieldCheck, text: "256-bit SSL encryption" },
                            { icon: HiCheck, text: "7-day free trial" },
                            { icon: HiCheck, text: "Cancel anytime" },
                            { icon: HiCheck, text: "No hidden fees" },
                        ].map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-2 text-slate-500 text-sm">
                                <Icon className="text-indigo-400" />
                                <span>{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison table */}
            <section className="section-padding bg-navy-950/40">
                <div className="container-max">
                    <h2 className="font-display text-2xl font-bold text-slate-100 text-center mb-8">Full Feature Comparison</h2>
                    <div className="overflow-x-auto rounded-2xl border border-white/5">
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr className="border-b border-white/5 bg-navy-800/40">
                                    <th className="text-left p-4 text-slate-400 font-medium text-sm">Feature</th>
                                    <th className="text-center p-4 text-slate-300 font-semibold">Free</th>
                                    <th className="text-center p-4 text-indigo-400 font-semibold">Plus</th>
                                    <th className="text-center p-4 text-violet-400 font-semibold">Premium</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["Course Library", "200+", "1,000+", "1,500+"],
                                    ["Video Quality", "720p", "1080p", "4K"],
                                    ["Certificate Type", "Basic", "Professional", "Industry-Ready"],
                                    ["Quizzes & Projects", "Limited", "✓", "✓"],
                                    ["Offline Downloads", "—", "✓", "✓"],
                                    ["Priority Support", "—", "24h", "Priority"],
                                    ["Mentorship Sessions", "—", "—", "Monthly"],
                                    ["LinkedIn Badge", "—", "—", "✓"],
                                    ["Career Services", "—", "—", "✓"],
                                    ["Team Access", "—", "—", "✓"],
                                ].map(([feature, free, plus, premium], i) => (
                                    <tr key={feature} className={`border-b border-white/3 ${i % 2 === 0 ? "" : "bg-white/[0.02]"}`}>
                                        <td className="p-4 text-slate-400 text-sm">{feature}</td>
                                        <td className="p-4 text-center text-sm text-slate-500">{free}</td>
                                        <td className="p-4 text-center text-sm text-indigo-400 font-medium">{plus}</td>
                                        <td className="p-4 text-center text-sm text-violet-400 font-medium">{premium}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section-padding">
                <div className="container-max max-w-2xl">
                    <h2 className="font-display text-2xl font-bold text-slate-100 text-center mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-3">
                        {FAQ.map((item, i) => (
                            <div key={i} className="glass rounded-2xl border border-white/5 overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between p-5 text-left hover:bg-white/3 transition-colors"
                                >
                                    <span className="font-medium text-slate-200 text-sm">{item.q}</span>
                                    <span className={`text-slate-400 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}>▼</span>
                                </button>
                                {openFaq === i && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="overflow-hidden">
                                        <p className="px-5 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-3">{item.a}</p>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SubscriptionPage;
