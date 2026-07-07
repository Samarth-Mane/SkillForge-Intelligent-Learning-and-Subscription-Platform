import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    HiPlay, HiClock, HiStar, HiUsers, HiAcademicCap,
    HiCheck, HiLockClosed, HiChevronDown, HiChevronUp,
    HiArrowLeft, HiBadgeCheck,
} from "react-icons/hi";
import { courseService } from "../services/courseService";
import { useAuth } from "../context/AuthContext";
import { getYouTubeEmbedUrl, getYouTubeThumbnail, badgeClass } from "../utils/helpers";
import toast from "react-hot-toast";

const MOCK_COURSE = {
    id: 1,
    title: "Complete React 18 — From Zero to Hero",
    description: "Master React 18 from scratch with hooks, context, performance optimization, testing, and real-world project architecture. This course covers everything from JSX fundamentals to advanced patterns used at companies like Meta and Netflix.",
    instructor: "Sarah Chen",
    instructorBio: "Senior Frontend Engineer with 12 years of experience. Previously at Google and Stripe. Open-source contributor and conference speaker.",
    instructorAvatar: "SC",
    category: "Web Development",
    duration: "32h 45m",
    subscriptionType: "PLUS",
    difficulty: "Intermediate",
    rating: 4.9,
    studentsCount: 18420,
    updatedAt: "2024-11-15",
    language: "English",
    certificate: true,
    whatYouLearn: [
        "React 18 core concepts and advanced patterns",
        "Hooks: useState, useEffect, useReducer, useContext, and custom hooks",
        "State management with Context API and Zustand",
        "React Router DOM v6 with protected routes",
        "Performance optimization and code splitting",
        "Testing with React Testing Library and Jest",
        "TypeScript with React",
        "Real-world project: Full-stack e-commerce dashboard",
    ],
    curriculum: [
        {
            id: 1,
            title: "Getting Started with React 18",
            lessons: [
                { id: 1, title: "Welcome & Course Overview", url: "https://www.youtube.com/watch?v=dGcsHMXbSOA", duration: "5:20", free: true },
                { id: 2, title: "Setting Up the Development Environment", url: "https://www.youtube.com/watch?v=dGcsHMXbSOA", duration: "12:45", free: true },
                { id: 3, title: "Your First React Component", url: "https://www.youtube.com/watch?v=dGcsHMXbSOA", duration: "18:30", free: false },
                { id: 4, title: "JSX Deep Dive", url: "https://www.youtube.com/watch?v=dGcsHMXbSOA", duration: "22:15", free: false },
            ],
        },
        {
            id: 2,
            title: "React Hooks Mastery",
            lessons: [
                { id: 5, title: "useState and State Management", url: "https://www.youtube.com/watch?v=dGcsHMXbSOA", duration: "25:10", free: false },
                { id: 6, title: "useEffect and Side Effects", url: "https://www.youtube.com/watch?v=dGcsHMXbSOA", duration: "30:45", free: false },
                { id: 7, title: "useReducer for Complex State", url: "https://www.youtube.com/watch?v=dGcsHMXbSOA", duration: "28:20", free: false },
                { id: 8, title: "Building Custom Hooks", url: "https://www.youtube.com/watch?v=dGcsHMXbSOA", duration: "35:00", free: false },
            ],
        },
        {
            id: 3,
            title: "Advanced Patterns & Performance",
            lessons: [
                { id: 9, title: "React.memo and useMemo", url: "https://www.youtube.com/watch?v=dGcsHMXbSOA", duration: "20:30", free: false },
                { id: 10, title: "Code Splitting with Suspense", url: "https://www.youtube.com/watch?v=dGcsHMXbSOA", duration: "18:45", free: false },
                { id: 11, title: "Compound Component Pattern", url: "https://www.youtube.com/watch?v=dGcsHMXbSOA", duration: "42:10", free: false },
            ],
        },
    ],
};

const CourseDetailPage = () => {
    const { id } = useParams();
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);
    const [openSections, setOpenSections] = useState({ 0: true });
    const [previewVideo, setPreviewVideo] = useState(null);

    useEffect(() => {
        courseService.getById(id)
            .then((response) => {
                console.log("API Success:", response);
                setCourse(response.data.data);
            })
            .catch((err) => {
                console.log("API Error:", err.response);
                toast.error(err?.response?.data?.message || "Failed to load course");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const handleEnroll = async () => {
        if (!isAuthenticated) { navigate("/login"); return; }
        setEnrolling(true);
        try {
            await courseService.enroll(id);
            toast.success("Successfully enrolled!");
            navigate(`/learn/${id}`);
        } catch (err) {
            toast.error(err?.response?.data?.message || "Enrollment failed");
        } finally {
            setEnrolling(false);
        }
    };

    const toggleSection = (i) => setOpenSections(prev => ({ ...prev, [i]: !prev[i] }));

    const totalLessons = course?.curriculum?.reduce((a, s) => a + s.lessons.length, 0) || 0;
    const freeLessons = course?.curriculum?.reduce((a, s) => a + s.lessons.filter(l => l.free).length, 0) || 0;

    if (loading) return (
        <div className="pt-16 min-h-screen">
            <div className="container-max px-6 py-12">
                <div className="skeleton h-8 w-32 rounded mb-6" />
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="skeleton h-10 w-full rounded" />
                        <div className="skeleton h-6 w-2/3 rounded" />
                        <div className="skeleton aspect-video rounded-2xl" />
                    </div>
                    <div className="skeleton h-96 rounded-2xl" />
                </div>
            </div>
        </div>
    );

    const c = course || MOCK_COURSE;
    const firstFreeLesson = c.curriculum?.flatMap(s => s.lessons).find(l => l.free);

    return (
        <div className="pt-16 min-h-screen">
            {/* Hero */}
            <div className="bg-navy-950/70 border-b border-white/5 py-10">
                <div className="container-max px-6">
                    <Link to="/courses" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 text-sm mb-6 transition-colors">
                        <HiArrowLeft /> Back to Courses
                    </Link>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <span className={`${badgeClass(c.subscriptionType)} mb-3 inline-block`}>{c.subscriptionType}</span>
                            <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-100 mb-4 leading-tight">{c.title}</h1>
                            <p className="text-slate-400 mb-5 leading-relaxed">{c.description}</p>

                            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400 mb-5">
                                <span className="flex items-center gap-1.5"><HiStar className="text-yellow-400" /><span className="text-yellow-400 font-semibold">{c.rating}</span> ({c.studentsCount?.toLocaleString()} students)</span>
                                <span className="flex items-center gap-1.5"><HiClock className="text-indigo-400" /> {c.duration}</span>
                                <span className="flex items-center gap-1.5"><HiAcademicCap className="text-violet-400" /> {c.difficulty}</span>
                                <span className="flex items-center gap-1.5"><HiBadgeCheck className="text-emerald-400" /> Certificate included</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-bold text-white">{c.instructorAvatar || c.instructor?.[0]}</div>
                                <div>
                                    <p className="text-slate-200 font-medium text-sm">{c.instructor}</p>
                                    <p className="text-slate-500 text-xs">{c.instructorBio?.slice(0, 60)}…</p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar card (desktop) */}
                        <div className="hidden lg:block">
                            <EnrollCard course={c} onEnroll={handleEnroll} enrolling={enrolling} freeLessons={freeLessons} totalLessons={totalLessons} onPreview={() => setPreviewVideo(firstFreeLesson)} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-max px-6 py-10">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Preview player */}
                        {(previewVideo || firstFreeLesson) && (
                            <div>
                                <h2 className="font-display text-xl font-bold text-slate-100 mb-4">Course Preview</h2>
                                <div className="rounded-2xl overflow-hidden aspect-video bg-navy-800">
                                    <iframe
                                        src={getYouTubeEmbedUrl((previewVideo || firstFreeLesson)?.url)}
                                        title={(previewVideo || firstFreeLesson)?.title}
                                        className="w-full h-full"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                                <p className="text-slate-400 text-sm mt-2">▶ {(previewVideo || firstFreeLesson)?.title}</p>
                            </div>
                        )}

                        {/* What you'll learn */}
                        <div className="card">
                            <h2 className="font-display text-xl font-bold text-slate-100 mb-5">What You'll Learn</h2>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {c.whatYouLearn?.map((item, i) => (
                                    <div key={i} className="flex items-start gap-2.5 text-sm">
                                        <HiCheck className="text-indigo-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Curriculum */}
                        <div>
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="font-display text-xl font-bold text-slate-100">Course Curriculum</h2>
                                <span className="text-slate-400 text-sm">{totalLessons} lessons · {freeLessons} free previews</span>
                            </div>

                            <div className="space-y-3">
                                {c.curriculum?.map((section, si) => (
                                    <div key={section.id} className="glass rounded-2xl overflow-hidden border border-white/8">
                                        <button
                                            onClick={() => toggleSection(si)}
                                            className="w-full flex items-center justify-between p-4 hover:bg-white/3 transition-colors text-left"
                                        >
                                            <div>
                                                <p className="font-semibold text-slate-200 text-sm">{section.title}</p>
                                                <p className="text-slate-500 text-xs mt-0.5">{section.lessons.length} lessons</p>
                                            </div>
                                            {openSections[si] ? <HiChevronUp className="text-slate-400" /> : <HiChevronDown className="text-slate-400" />}
                                        </button>

                                        {openSections[si] && (
                                            <div className="border-t border-white/5">
                                                {section.lessons.map((lesson, li) => (
                                                    <div key={lesson.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/3 transition-colors border-b border-white/3 last:border-0">
                                                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0">
                                                            {lesson.free
                                                                ? <button onClick={() => setPreviewVideo(lesson)} className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center hover:bg-indigo-500/30 transition-colors"><HiPlay className="text-indigo-400 text-xs" /></button>
                                                                : <div className="w-7 h-7 rounded-lg bg-navy-700 flex items-center justify-center"><HiLockClosed className="text-slate-600 text-xs" /></div>
                                                            }
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className={`text-sm truncate ${lesson.free ? "text-slate-200" : "text-slate-500"}`}>{lesson.title}</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            {lesson.free && <span className="text-xs text-emerald-400 font-medium">Preview</span>}
                                                            <span className="text-xs text-slate-600">{lesson.duration}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile enroll card */}
                    <div className="lg:hidden">
                        <EnrollCard course={c} onEnroll={handleEnroll} enrolling={enrolling} freeLessons={freeLessons} totalLessons={totalLessons} onPreview={() => setPreviewVideo(firstFreeLesson)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const EnrollCard = ({ course: c, onEnroll, enrolling, freeLessons, totalLessons, onPreview }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card border border-white/10 sticky top-24">
        {c.curriculum?.[0]?.lessons?.[0]?.url && (
            <div className="relative -mx-6 -mt-6 mb-5 aspect-video bg-navy-800 overflow-hidden rounded-t-2xl cursor-pointer group" onClick={onPreview}>
                <img src={`https://img.youtube.com/vi/${c.curriculum[0].lessons[0].url.match(/[?&]v=([^&]+)/)?.[1]}/mqdefault.jpg`} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={e => e.target.style.display = "none"} />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <HiPlay className="text-white text-2xl ml-1" />
                    </div>
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white text-xs font-medium bg-black/60 px-3 py-1 rounded-full">Preview course</div>
            </div>
        )}

        <div className="mb-5">
            <div className="flex items-baseline gap-2 mb-1">
                <span className="font-display text-3xl font-extrabold gradient-text-indigo">
                    {c.subscriptionType === "FREE"
                        ? "Free Course"
                        : c.subscriptionType === "PLUS"
                            ? "Plus Plan"
                            : "Premium Plan"}
                </span>
            </div>

            <p className="text-slate-500 text-xs">
                {c.subscriptionType === "FREE"
                    ? "No subscription required"
                    : c.subscriptionType === "PLUS"
                        ? "Included in your Plus subscription"
                        : "Included in your Premium subscription"}
            </p>
        </div>

        <button
            onClick={onEnroll}
            disabled={enrolling}
            className="btn-primary w-full justify-center flex items-center gap-2 mb-4 disabled:opacity-60"
        >
            {enrolling ? (
                <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enrolling...
                </>
            ) : (
                c.subscriptionType === "FREE"
                    ? "Enroll Now — It's Free"
                    : c.subscriptionType === "PLUS"
                        ? "Enroll with Plus"
                        : "Enroll with Premium"
            )}
        </button>

        <div className="space-y-2.5 text-sm">
            {[
                { icon: HiClock, label: `${c.duration} of video content` },
                { icon: HiPlay, label: `${totalLessons} lessons (${freeLessons} free)` },
                { icon: HiAcademicCap, label: c.difficulty + " level" },
                { icon: HiBadgeCheck, label: "Verified certificate on completion" },
                { icon: HiUsers, label: `${c.studentsCount?.toLocaleString()} enrolled students` },
            ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 text-slate-400">
                    <Icon className="text-indigo-400 flex-shrink-0" />
                    <span>{label}</span>
                </div>
            ))}
        </div>
    </motion.div>
);

export default CourseDetailPage;
