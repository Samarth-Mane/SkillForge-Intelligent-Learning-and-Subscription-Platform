import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiBookOpen, HiAcademicCap, HiChartBar,
  HiPlay, HiArrowRight, HiStar,
  HiLightningBolt, HiBadgeCheck,
} from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import { courseService, certificateService, subscriptionService } from "../../services/courseService";
import { formatDate } from "../../utils/helpers";

const MOCK_ENROLLED = [
  { id: 1, title: "Complete React 18", category: "Web Dev", progress: 75, instructor: "Sarah Chen" },
  { id: 2, title: "Spring Boot 3 Masterclass", category: "Backend", progress: 40, instructor: "James Wilson" },
  { id: 3, title: "Python for ML", category: "AI & ML", progress: 20, instructor: "Dr. Priya Sharma" },
];
const MOCK_CERTS = [
  { id: "CERT-001", courseName: "JavaScript Fundamentals", issuedAt: "2024-10-15" },
];
const MOCK_ACTIVITY = [
  { icon: "▶️", text: "Watched 'React Hooks Deep Dive'", time: "2 hours ago" },
  { icon: "✅", text: "Completed 'useEffect lesson'", time: "3 hours ago" },
  { icon: "📝", text: "Scored 92% on React Quiz", time: "Yesterday" },
  { icon: "🏆", text: "Earned JavaScript Certificate", time: "3 days ago" },
];

const UserDashboard = () => {
  const { user } = useAuth();
  const [enrolled, setEnrolled] = useState([]);
  console.log("Enrolled =", enrolled);
  console.log("Is Array =", Array.isArray(enrolled));
  const [certs, setCerts] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
	Promise.all([
	  courseService.getEnrolled().catch(() => ({ data: { data: MOCK_ENROLLED } })),
	  certificateService.getAll().catch(() => ({ data: { data: MOCK_CERTS } })),
	  subscriptionService.getCurrent().catch(() => ({ data: { data: { plan: "PLUS" } } })),
	]).then(([enrolledRes, certRes, subRes]) => {

	  setEnrolled(enrolledRes.data.data || []);
	  setCerts(certRes.data.data || []);
	  setSubscription(subRes.data.data || null);

	}).finally(() => setLoading(false));
  }, []);

  const avgProgress = enrolled.length > 0 ? Math.round(enrolled.reduce((a, c) => a + (c.progress || 0), 0) / enrolled.length) : 0;

  const stats = [
    { icon: HiBookOpen, label: "Enrolled Courses", value: loading ? "—" : enrolled.length, color: "text-indigo-400 bg-indigo-500/10" },
    { icon: HiAcademicCap, label: "Certificates", value: loading ? "—" : certs.length, color: "text-emerald-400 bg-emerald-500/10" },
    { icon: HiChartBar, label: "Avg. Progress", value: loading ? "—" : `${avgProgress}%`, color: "text-cyan-400 bg-cyan-500/10" },
    { icon: HiStar, label: "Lessons Done", value: loading ? "—" : "24", color: "text-violet-400 bg-violet-500/10" },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-100 mb-1">
              Welcome back, {user?.name?.split(" ")[0] || "Learner"} 👋
            </h1>
            <p className="text-slate-400 text-sm">Here's your learning overview for today.</p>
          </div>
          {subscription && (
            <div className={`flex items-center gap-2 glass rounded-xl px-4 py-2 border ${subscription.plan === "PREMIUM" ? "border-violet-500/30" : "border-indigo-500/30"}`}>
              <HiLightningBolt className={subscription.plan === "PREMIUM" ? "text-violet-400" : "text-indigo-400"} />
              <span className={`text-sm font-semibold ${subscription.plan === "PREMIUM" ? "text-violet-400" : "text-indigo-400"}`}>{subscription.plan} Plan</span>
            </div>
          )}
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ icon: Icon, label, value, color }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card">
            <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mb-4`}><Icon className="text-xl" /></div>
            <p className="font-display font-bold text-2xl text-slate-100 mb-1">{value}</p>
            <p className="text-slate-500 text-sm">{label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-slate-100">Continue Learning</h2>
            <Link to="/courses" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1 transition-colors">Browse more <HiArrowRight /></Link>
          </div>
          {loading
            ? Array(3).fill(0).map((_, i) => <div key={i} className="skeleton h-24 rounded-2xl mb-3" />)
            : enrolled.length === 0
              ? (
                <div className="card text-center py-10">
                  <HiBookOpen className="text-slate-600 text-5xl mx-auto mb-3" />
                  <p className="text-slate-400 text-sm mb-4">You haven't enrolled in any courses yet.</p>
                  <Link to="/courses" className="btn-primary inline-flex items-center gap-2 text-sm">Browse Courses</Link>
                </div>
              )
              : enrolled.map((course, i) => (
                <motion.div key={course.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="card-hover flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <HiPlay className="text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-200 text-sm truncate">{course.title}</p>
                    <p className="text-slate-500 text-xs mb-2">{course.category} · {course.instructor}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-navy-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" style={{ width: `${course.progress}%` }} />
                      </div>
                      <span className="text-xs text-slate-500">{course.progress}%</span>
                    </div>
                  </div>
                  <Link to={`/learn/${course.id}`} className="btn-primary text-xs px-4 py-2 whitespace-nowrap">Resume</Link>
                </motion.div>
              ))
          }
        </div>

        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-slate-100">Certificates</h2>
            </div>
            {certs.length === 0
              ? <div className="card text-center py-8"><HiAcademicCap className="text-slate-600 text-4xl mx-auto mb-2" /><p className="text-slate-500 text-xs">Complete a course to earn your first certificate.</p></div>
              : certs.map((cert) => (
                <motion.div key={cert.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card mb-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <HiBadgeCheck className="text-emerald-400 text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-200 text-xs font-medium truncate">{cert.courseName}</p>
                    <p className="text-slate-500 text-xs">{formatDate(cert.issuedAt)}</p>
                  </div>
                  <Link to={`/certificate/${cert.id}`} className="text-indigo-400 text-xs hover:text-indigo-300">View</Link>
                </motion.div>
              ))
            }
          </div>

          <div>
            <h2 className="font-display font-bold text-slate-100 mb-4">Recent Activity</h2>
            <div className="card space-y-4">
              {MOCK_ACTIVITY.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-base flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-slate-300 text-xs">{item.text}</p>
                    <p className="text-slate-600 text-xs mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {subscription?.plan !== "PREMIUM" && (
            <div className="card bg-gradient-to-br from-violet-500/10 to-purple-500/5 border-violet-500/20">
              <HiLightningBolt className="text-violet-400 text-2xl mb-3" />
              <h3 className="font-semibold text-slate-200 text-sm mb-2">Unlock Premium Content</h3>
              <p className="text-slate-500 text-xs mb-4">500+ premium courses, mentorship, and career services.</p>
              <Link to="/subscription" className="btn-primary text-xs flex items-center justify-center w-full">Upgrade to Premium</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
