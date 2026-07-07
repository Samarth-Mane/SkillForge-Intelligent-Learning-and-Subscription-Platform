import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroSection from "../components/landing/HeroSection";
import CategoriesSection from "../components/landing/CategoriesSection";
import FeaturedCoursesSection from "../components/landing/FeaturedCoursesSection";
import PricingSection from "../components/landing/PricingSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import { HiArrowRight, HiAcademicCap, HiShieldCheck, HiStar, HiTrendingUp } from "react-icons/hi";
import CourseSection from "../components/landing/CourseSection";

const trustedBy = ["Google", "Meta", "Microsoft", "Amazon", "Netflix", "Stripe", "Shopify", "Apple"];

const whyUs = [
  {
    icon: HiAcademicCap,
    title: "Expert Instructors",
    desc: "Learn from verified industry professionals with 10+ years of real-world experience.",
    color: "text-indigo-400 bg-indigo-500/10",
  },
  {
    icon: HiShieldCheck,
    title: "Verified Certificates",
    desc: "QR-coded, blockchain-verified certificates recognized by top employers globally.",
    color: "text-emerald-400 bg-emerald-500/10",
  },
  {
    icon: HiStar,
    title: "Curated Content",
    desc: "Every course undergoes rigorous quality review before it reaches learners.",
    color: "text-yellow-400 bg-yellow-500/10",
  },
  {
    icon: HiTrendingUp,
    title: "Career-Focused",
    desc: "Curriculum built around real job requirements, not academic theory.",
    color: "text-violet-400 bg-violet-500/10",
  },
];

const LandingPage = () => (
  <div>
    <HeroSection />

    {/* Trusted by */}
    <section className="py-10 border-y border-white/5 bg-navy-950/40">
      <div className="container-max px-6">
        <p className="text-center text-slate-600 text-xs uppercase tracking-widest font-semibold mb-6">
          Our graduates work at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {trustedBy.map((company) => (
            <span
              key={company}
              className="text-slate-600 hover:text-slate-400 font-semibold text-sm transition-colors cursor-default"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>

    <CategoriesSection />
    <FeaturedCoursesSection />

    {/* Why LearnFlow */}
    <section className="section-padding">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Why LearnFlow
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
            Built for Serious Learners
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            We don't just teach concepts — we build career-ready professionals.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUs.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card text-center"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mx-auto mb-5`}
              >
                <item.icon className="text-2xl" />
              </div>
              <h3 className="font-display font-semibold text-slate-200 mb-3">
                {item.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <TestimonialsSection />
    <PricingSection />

    {/* Final CTA */}
    <section className="section-padding">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 p-12 text-center"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to Transform Your Career?
            </h2>
            <p className="text-indigo-200 text-lg mb-8">
              Join 50,000+ learners already building their future on LearnFlow.
              Start free — upgrade anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors shadow-xl"
              >
                Start Learning Today <HiArrowRight />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center justify-center gap-2 border border-white/40 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
);

export default LandingPage;
