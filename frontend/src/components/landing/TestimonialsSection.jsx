import React from "react";
import { motion } from "framer-motion";
import { HiStar } from "react-icons/hi";

const testimonials = [
  {
    name: "Anika Patel",
    role: "Senior Frontend Engineer @ Stripe",
    avatar: "AP",
    color: "from-pink-500 to-rose-600",
    text: "LearnFlow's React masterclass transformed my skills within 3 months. The video quality and structured curriculum are unmatched. I landed my dream job at Stripe shortly after completing the course.",
    rating: 5,
    course: "React 18 Complete Guide",
  },
  {
    name: "Marcus Johnson",
    role: "Backend Developer @ Shopify",
    avatar: "MJ",
    color: "from-indigo-500 to-blue-600",
    text: "The Spring Boot course is the most comprehensive I've found online. Real-world projects, production-ready code patterns — exactly what enterprise employers want to see.",
    rating: 5,
    course: "Spring Boot 3 Masterclass",
  },
  {
    name: "Yuki Tanaka",
    role: "ML Engineer @ DeepMind",
    avatar: "YT",
    color: "from-violet-500 to-purple-600",
    text: "The AI/ML curriculum here is phenomenal. From Python basics to deploying neural networks — comprehensive, well-paced, and the instructors are industry professionals.",
    rating: 5,
    course: "Python for ML & AI",
  },
  {
    name: "Sofia Rodriguez",
    role: "Cloud Architect @ AWS",
    avatar: "SR",
    color: "from-cyan-500 to-teal-600",
    text: "Premium certification gave me the edge I needed. The QR-verified certificate is recognized by recruiters. Plus the content is genuinely current — updated frequently.",
    rating: 5,
    course: "AWS Solutions Architect",
  },
  {
    name: "Chen Wei",
    role: "Full Stack Dev @ Microsoft",
    avatar: "CW",
    color: "from-emerald-500 to-green-600",
    text: "The Plus plan gives incredible value. Access to all the intermediate courses at once let me transition from a junior to mid-level developer in just 6 months.",
    rating: 5,
    course: "Full Stack Development",
  },
  {
    name: "Priya Nair",
    role: "DevOps Lead @ Netflix",
    avatar: "PN",
    color: "from-orange-500 to-amber-600",
    text: "Hands-on labs and realistic scenarios made all the difference. LearnFlow isn't just theory — it's applied learning with real tools. Worth every penny of Premium.",
    rating: 5,
    course: "Cloud & DevOps Mastery",
  },
];

const TestimonialsSection = () => (
  <section className="section-padding bg-navy-950/30 overflow-hidden">
    <div className="container-max">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">
          Success Stories
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
          Loved by Learners Worldwide
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto">
          Join 50,000+ professionals who accelerated their careers with LearnFlow.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="card-hover"
          >
            {/* Stars */}
            <div className="flex items-center gap-0.5 mb-4">
              {Array(t.rating)
                .fill(0)
                .map((_, j) => (
                  <HiStar key={j} className="text-yellow-400 text-sm" />
                ))}
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-5">
              "{t.text}"
            </p>

            {/* Course tag */}
            <p className="text-indigo-400 text-xs font-medium mb-4">
              📚 {t.course}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
              >
                {t.avatar}
              </div>
              <div>
                <p className="text-slate-200 font-semibold text-sm">{t.name}</p>
                <p className="text-slate-500 text-xs">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
