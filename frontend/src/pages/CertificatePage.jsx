import React, { useRef, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiDownload, HiArrowLeft, HiBadgeCheck, HiShare, HiAcademicCap } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import { certificateService } from "../services/courseService";
import { formatDate } from "../utils/helpers";

const MOCK_CERTIFICATE = {
  id: 0,
  certificateId: "",
  studentName: "",
  courseName: "",
  instructorName: "",
  issuedAt: null,
  courseHours: "",
};

const CertificatePage = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const certRef = useRef(null);
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    certificateService
      .getByCourse(courseId)
      .then(({ data }) => {
        setCert(data.data);
      })
      .catch((error) => {
        console.error(error);
        setCert(null);
      })
      .finally(() => setLoading(false));
  }, [courseId]);

  const handleDownload = async () => {
    const el = certRef.current;
    if (!el) return;

    try {
      const html2canvas = (await import("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.esm.js")).default;
      const canvas = await html2canvas(el, { scale: 2, backgroundColor: null, useCORS: true });
      const link = document.createElement("a");
	  link.download = `LearnFlow_Certificate_${cert?.certificateId || "cert"}.png`;
      link.click();
    } catch {
      // Fallback: use window.print
      window.print();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!cert) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Certificate Not Found
        </h2>
        <p className="text-slate-400 mb-6">
          You haven't earned a certificate for this course yet.
        </p>

        <Link
          to="/courses"
          className="btn-primary"
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  const c = cert;

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Actions */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <Link to={`/learn/${courseId}`} className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors text-sm">
            <HiArrowLeft /> Back to Course
          </Link>
          <div className="flex gap-3">
            <button className="btn-secondary flex items-center gap-2 text-sm">
              <HiShare /> Share
            </button>
            <button onClick={handleDownload} className="btn-primary flex items-center gap-2 text-sm">
              <HiDownload /> Download Certificate
            </button>
          </div>
        </div>

        {/* Certificate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          ref={certRef}
          className="relative rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #0F172A 100%)" }}
        >
          {/* Border glow */}
          <div className="absolute inset-0 rounded-3xl" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(139,92,246,0.2), rgba(6,182,212,0.3))", padding: "2px" }}>
            <div className="absolute inset-[2px] rounded-3xl" style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #0F172A 100%)" }} />
          </div>

          {/* Decorative background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(ellipse, #6366F1, transparent)" }} />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10" style={{ background: "radial-gradient(ellipse, #8B5CF6, transparent)" }} />

          {/* Content */}
          <div className="relative z-10 p-12 sm:p-16">
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
                  <HiAcademicCap className="text-white text-2xl" />
                </div>
                <div>
                  <p className="font-display font-bold text-xl" style={{ background: "linear-gradient(to right, #818CF8, #A78BFA, #22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>LearnFlow</p>
                  <p className="text-slate-500 text-xs">Professional Learning Platform</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-slate-500 text-xs mb-1">Certificate ID</p>
				<p className="font-mono text-indigo-400 text-sm font-semibold">
				    {c.certificateId}
				</p>
              </div>
            </div>

            {/* Main content */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-6">
                <HiBadgeCheck className="text-indigo-400 text-sm" />
                <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">Certificate of Completion</span>
              </div>

              <p className="text-slate-400 text-lg mb-4">This certifies that</p>

              <h1 className="font-display font-extrabold text-5xl sm:text-6xl mb-4 leading-tight" style={{ background: "linear-gradient(to right, #e2e8f0, #a5b4fc, #e2e8f0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {c.studentName}
              </h1>

              <p className="text-slate-400 text-lg mb-4">has successfully completed</p>

              <div className="inline-block px-8 py-4 rounded-2xl mb-6" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)" }}>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-100">{c.courseName}</h2>
                <p className="text-slate-400 text-sm mt-2">{c.courseHours} hours of expert instruction</p>
              </div>

              <p className="text-slate-500 text-sm">
                Issued on <span className="text-slate-300 font-medium">{formatDate(c.issuedAt)}</span>
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-end justify-between pt-8 border-t border-white/5">
              {/* Instructor signature */}
              <div>
                <div className="h-10 mb-2" style={{ fontFamily: "cursive", fontSize: "28px", color: "rgba(165, 180, 252, 0.8)" }}>
                  {c.instructorName}
                </div>
                <div className="h-px w-40 mb-2" style={{ background: "linear-gradient(to right, rgba(99,102,241,0.6), transparent)" }} />
                <p className="text-slate-500 text-xs">{c.instructorName}</p>
                <p className="text-slate-600 text-xs">Course Instructor</p>
              </div>

              {/* QR Code placeholder */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-xl border border-indigo-500/20 bg-navy-800 p-2 flex items-center justify-center mb-2">
                  <div className="grid grid-cols-5 gap-0.5 w-full h-full">
                    {Array(25).fill(0).map((_, i) => (
                      <div key={i} className="rounded-sm" style={{ background: Math.random() > 0.4 ? "rgba(99,102,241,0.8)" : "transparent" }} />
                    ))}
                  </div>
                </div>
                <p className="text-slate-600 text-xs">Verify certificate</p>
              </div>

              {/* LearnFlow seal */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))", border: "2px solid rgba(99,102,241,0.4)" }}>
                  <HiAcademicCap className="text-indigo-400 text-2xl" />
                </div>
                <p className="text-slate-600 text-xs">Official Seal</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Share / next steps */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 grid sm:grid-cols-3 gap-4 print:hidden"
        >
          {[
            { icon: "🔗", title: "Share on LinkedIn", desc: "Add this certificate to your LinkedIn profile" },
            { icon: "📥", title: "Download PDF", desc: "Save a high-quality PDF of your certificate", action: handleDownload },
            { icon: "🚀", title: "Next Course", desc: "Keep learning with another LearnFlow course", link: "/courses" },
          ].map(({ icon, title, desc, action, link }) => (
            <div key={title} className="card-hover text-center cursor-pointer" onClick={action}>
              <p className="text-3xl mb-3">{icon}</p>
              <p className="font-semibold text-slate-200 text-sm mb-1">{title}</p>
              <p className="text-slate-500 text-xs">{desc}</p>
              {link && <Link to={link} className="text-indigo-400 text-xs mt-2 inline-block hover:text-indigo-300">Browse courses →</Link>}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CertificatePage;
