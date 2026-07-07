import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiCheck, HiPlay, HiChevronLeft, HiChevronRight,
  HiCheckCircle, HiMenu, HiX, HiDocumentText,
  HiAcademicCap,
} from "react-icons/hi";
import { courseService, videoService, progressService } from "../services/courseService";
import { getYouTubeEmbedUrl } from "../utils/helpers";
import toast from "react-hot-toast";

const MOCK_COURSE = {
  id: 1,
  title: "Complete React 18 — From Zero to Hero",
  curriculum: [
    {
      id: 1, title: "Getting Started",
      lessons: [
        { id: 1, title: "Welcome & Course Overview", url: "https://www.youtube.com/watch?v=dGcsHMXbSOA", duration: "5:20", completed: true },
        { id: 2, title: "Development Setup", url: "https://www.youtube.com/watch?v=dGcsHMXbSOA", duration: "12:45", completed: true },
        { id: 3, title: "Your First React Component", url: "https://www.youtube.com/watch?v=dGcsHMXbSOA", duration: "18:30", completed: false },
        { id: 4, title: "JSX Deep Dive", url: "https://www.youtube.com/watch?v=dGcsHMXbSOA", duration: "22:15", completed: false },
      ],
    },
    {
      id: 2, title: "React Hooks",
      lessons: [
        { id: 5, title: "useState and State", url: "https://www.youtube.com/watch?v=dGcsHMXbSOA", duration: "25:10", completed: false },
        { id: 6, title: "useEffect Deep Dive", url: "https://www.youtube.com/watch?v=dGcsHMXbSOA", duration: "30:45", completed: false },
        { id: 7, title: "useReducer", url: "https://www.youtube.com/watch?v=dGcsHMXbSOA", duration: "28:20", completed: false },
        { id: 8, title: "Custom Hooks", url: "https://www.youtube.com/watch?v=dGcsHMXbSOA", duration: "35:00", completed: false },
      ],
    },
    {
      id: 3, title: "Advanced Patterns",
      lessons: [
        { id: 9, title: "React.memo & useMemo", url: "https://www.youtube.com/watch?v=dGcsHMXbSOA", duration: "20:30", completed: false },
        { id: 10, title: "Code Splitting", url: "https://www.youtube.com/watch?v=dGcsHMXbSOA", duration: "18:45", completed: false },
      ],
    },
  ],
};

const LearningPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedIds, setCompletedIds] = useState(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [markingComplete, setMarkingComplete] = useState(false);

  useEffect(() => {
    Promise.all([
      courseService.getById(courseId).catch(() => ({ data: MOCK_COURSE })),
      progressService.getCourseProgress(courseId).catch(() => ({ data: { completedLessonIds: [1, 2] } })),
    ]).then(([{ data: c }, { data: progress }]) => {
      const courseData = c.data || MOCK_COURSE;
      setCourse(courseData);
      const flat = courseData.curriculum?.flatMap(s => s.lessons) || [];
      setLessons(flat);
      setCompletedIds(new Set(progress?.completedLessonIds || []));
      // Start from first incomplete
      const firstIncomplete = flat.find(l => !progress?.completedLessonIds?.includes(l.id));
      setCurrentLesson(firstIncomplete || flat[0]);
    }).finally(() => setLoading(false));
  }, [courseId]);

  const allLessons = lessons;
  const currentIndex = allLessons.findIndex(l => l.id === currentLesson?.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const progress = allLessons.length > 0 ? Math.round((completedIds.size / allLessons.length) * 100) : 0;

  const handleMarkComplete = async () => {
    if (!currentLesson || completedIds.has(currentLesson.id)) return;
    setMarkingComplete(true);
    try {
      await videoService.markComplete(currentLesson.id);
    } catch {}
    setCompletedIds(prev => new Set([...prev, currentLesson.id]));
    toast.success("Lesson marked as complete!");
    if (nextLesson) setCurrentLesson(nextLesson);
    setMarkingComplete(false);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-navy-950">
      {/* Top bar */}
      <header className="h-14 border-b border-white/5 bg-navy-900/90 backdrop-blur-xl flex items-center px-4 gap-4 flex-shrink-0 z-30 sticky top-0">
        <Link to={`/courses/${courseId}`} className="text-slate-400 hover:text-slate-200 transition-colors">
          <HiChevronLeft className="text-xl" />
        </Link>
        <div className="flex-1 min-w-0">
          <p className="text-slate-200 font-medium text-sm truncate">{course?.title}</p>
          {currentLesson && <p className="text-slate-500 text-xs truncate">{currentLesson.title}</p>}
        </div>

        {/* Progress */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="w-32 h-1.5 bg-navy-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-xs text-slate-400 whitespace-nowrap">{progress}% complete</span>
        </div>

        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="glass rounded-lg p-2 ml-2">
          {sidebarOpen ? <HiX className="text-slate-300" /> : <HiMenu className="text-slate-300" />}
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main player */}
        <main className="flex-1 overflow-y-auto">
          {/* Video */}
          <div className="bg-black aspect-video max-h-[65vh] w-full">
            {currentLesson?.url ? (
              <iframe
                key={currentLesson.id}
                src={getYouTubeEmbedUrl(currentLesson.url)}
                title={currentLesson.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <HiPlay className="text-slate-600 text-6xl mx-auto mb-3" />
                  <p className="text-slate-500">No video available</p>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="p-6 max-w-4xl">
            <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
              <div>
                <h1 className="font-display text-xl font-bold text-slate-100 mb-1">{currentLesson?.title}</h1>
                <p className="text-slate-500 text-sm">{course?.title}</p>
              </div>
              <div className="flex items-center gap-3">
                {completedIds.has(currentLesson?.id)
                  ? <span className="flex items-center gap-1.5 text-emerald-400 text-sm font-medium"><HiCheckCircle className="text-lg" /> Completed</span>
                  : <button onClick={handleMarkComplete} disabled={markingComplete} className="btn-primary flex items-center gap-2 text-sm px-4 py-2.5 disabled:opacity-60">
                      {markingComplete ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <HiCheck />}
                      Mark Complete
                    </button>
                }
              </div>
            </div>

            {/* Prev/Next */}
            <div className="flex items-center gap-3">
              <button onClick={() => prevLesson && setCurrentLesson(prevLesson)} disabled={!prevLesson} className="btn-secondary flex items-center gap-2 text-sm disabled:opacity-40">
                <HiChevronLeft /> Previous
              </button>
              <button onClick={() => nextLesson && setCurrentLesson(nextLesson)} disabled={!nextLesson} className="btn-primary flex items-center gap-2 text-sm disabled:opacity-40">
                Next <HiChevronRight />
              </button>
              {progress === 100 && (
                <Link to={`/quiz/${courseId}`} className="btn-secondary flex items-center gap-2 text-sm ml-auto border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                  <HiDocumentText /> Take Quiz
                </Link>
              )}
            </div>

            {/* Progress bar (mobile) */}
            <div className="mt-6 sm:hidden">
              <div className="flex justify-between text-xs text-slate-500 mb-2">
                <span>Course progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-navy-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Certificate CTA */}
            {progress >= 80 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 glass rounded-2xl p-5 border-emerald-500/20 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <HiAcademicCap className="text-emerald-400 text-2xl" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-200 text-sm">Almost there!</p>
                  <p className="text-slate-400 text-xs">Complete the remaining lessons to earn your certificate.</p>
                </div>
                <Link to={`/certificate/${courseId}`} className="btn-secondary text-sm border-emerald-500/30 text-emerald-400 whitespace-nowrap">
                  View Certificate
                </Link>
              </motion.div>
            )}
          </div>
        </main>

        {/* Sidebar playlist */}
        {sidebarOpen && (
          <aside className="hidden md:flex flex-col w-80 border-l border-white/5 bg-navy-900/60 overflow-y-auto flex-shrink-0">
            <div className="p-4 border-b border-white/5">
              <p className="font-semibold text-slate-200 text-sm mb-1">Course Content</p>
              <p className="text-xs text-slate-500">{completedIds.size} / {allLessons.length} lessons complete</p>
              <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="flex-1">
              {course?.curriculum?.map((section) => (
                <div key={section.id}>
                  <div className="px-4 py-3 bg-navy-800/40 border-b border-white/3">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{section.title}</p>
                  </div>
                  {section.lessons.map((lesson) => {
                    const isActive = currentLesson?.id === lesson.id;
                    const isDone = completedIds.has(lesson.id);
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setCurrentLesson(lesson)}
                        className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-all border-b border-white/3 ${isActive ? "bg-indigo-500/10 border-l-2 border-l-indigo-500" : "hover:bg-white/3"}`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${isDone ? "bg-emerald-500/20 border border-emerald-500/50" : isActive ? "bg-indigo-500/20 border border-indigo-500/50" : "bg-navy-700 border border-navy-600"}`}>
                          {isDone
                            ? <HiCheck className="text-emerald-400 text-xs" />
                            : isActive
                              ? <HiPlay className="text-indigo-400 text-xs" />
                              : <span className="text-slate-600 text-xs">{lesson.id}</span>
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs leading-snug ${isActive ? "text-slate-100 font-medium" : isDone ? "text-slate-400" : "text-slate-300"}`}>{lesson.title}</p>
                          <p className="text-slate-600 text-xs mt-0.5">{lesson.duration}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default LearningPage;
