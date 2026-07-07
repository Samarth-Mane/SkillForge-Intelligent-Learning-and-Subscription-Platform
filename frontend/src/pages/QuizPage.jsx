import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiClock, HiCheck, HiX, HiRefresh, HiAcademicCap,
  HiChevronRight, HiChevronLeft, HiLightningBolt,
} from "react-icons/hi";
import { quizService } from "../services/courseService";
import { useTimer } from "../hooks";
import toast from "react-hot-toast";

const MOCK_QUIZ = {
  id: 1,
  title: "React 18 Final Assessment",
  timeLimit: 600, // 10 minutes
  passMark: 70,
  questions: [
    {
      id: 1,
      text: "Which hook would you use to run code after a component renders?",
      options: ["useState", "useEffect", "useCallback", "useMemo"],
      correct: 1,
    },
    {
      id: 2,
      text: "What is the purpose of the React.memo() function?",
      options: [
        "To create memoized selectors",
        "To memoize the return value of a function",
        "To prevent re-renders when props haven't changed",
        "To cache API responses",
      ],
      correct: 2,
    },
    {
      id: 3,
      text: "In React Router DOM v6, how do you define a route with a URL parameter?",
      options: [
        '<Route path="/user/:id" element={<User />} />',
        '<Route path="/user/{id}" element={<User />} />',
        '<Route path="/user/[id]" element={<User />} />',
        '<Route path="/user/$id" element={<User />} />',
      ],
      correct: 0,
    },
    {
      id: 4,
      text: "Which of the following correctly describes the Context API?",
      options: [
        "A replacement for local component state",
        "A way to pass data through the component tree without prop drilling",
        "A state management library for React",
        "A hook for managing side effects",
      ],
      correct: 1,
    },
    {
      id: 5,
      text: "What does the useCallback hook return?",
      options: [
        "A memoized value",
        "A memoized callback function",
        "A ref object",
        "A state updater function",
      ],
      correct: 1,
    },
    {
      id: 6,
      text: "When using useState with an object, what is the correct way to update one property?",
      options: [
        "setState({ name: 'John' })",
        "setState(prev => ({ ...prev, name: 'John' }))",
        "setState.name = 'John'",
        "setState(prev => (prev.name = 'John'))",
      ],
      correct: 1,
    },
    {
      id: 7,
      text: "What is the primary purpose of the useRef hook?",
      options: [
        "To store state that triggers re-renders",
        "To create side effects",
        "To access DOM elements or store mutable values without triggering re-renders",
        "To memoize expensive calculations",
      ],
      correct: 2,
    },
    {
      id: 8,
      text: "Which of these is NOT a valid way to share state between sibling components?",
      options: [
        "Lifting state up to a common parent",
        "Using Context API",
        "Passing props directly between siblings",
        "Using a state management library",
      ],
      correct: 2,
    },
    {
      id: 9,
      text: "What does the key prop in a list do?",
      options: [
        "Styles the list item",
        "Helps React identify which items changed, added, or removed",
        "Sets the item's ID in the DOM",
        "Makes the list item draggable",
      ],
      correct: 1,
    },
    {
      id: 10,
      text: "What is Concurrent Mode in React 18?",
      options: [
        "A way to run React on multiple threads",
        "A feature that lets React interrupt rendering to handle high-priority updates",
        "A mode for running tests concurrently",
        "A feature for parallel API calls",
      ],
      correct: 1,
    },
  ],
};

const QuizPage = () => {
  const { courseId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState("intro"); // intro | taking | result
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleExpire = useCallback(() => {
    toast.error("Time's up! Submitting your answers...");
    handleSubmit();
  }, []); // eslint-disable-line

  const { display, percent, start, stop } = useTimer(quiz?.timeLimit || 600, handleExpire);

  useEffect(() => {
    quizService.getByCourse(courseId)
      .then(({ data }) => setQuiz(data))
      .catch(() => setQuiz(MOCK_QUIZ))
      .finally(() => setLoading(false));
  }, [courseId]);

  const handleStart = () => { setPhase("taking"); start(); };

  const handleAnswer = (qId, optIndex) => {
    setAnswers(prev => ({ ...prev, [qId]: optIndex }));
  };

  const handleSubmit = async () => {
    stop();
    setSubmitting(true);
    try {
      const { data } = await quizService.submit(quiz.id, answers);
      setResult(data);
    } catch {
      // Mock result
      const correct = quiz.questions.filter(q => answers[q.id] === q.correct).length;
      const score = Math.round((correct / quiz.questions.length) * 100);
      setResult({ score, correct, total: quiz.questions.length, passed: score >= quiz.passMark });
    }
    setPhase("result");
    setSubmitting(false);
  };

  const handleRetry = () => {
    setAnswers({});
    setCurrentQ(0);
    setResult(null);
    setPhase("intro");
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  );

  const q = quiz?.questions?.[currentQ];
  const answered = Object.keys(answers).length;
  const total = quiz?.questions?.length || 0;

  return (
    <div className="min-h-screen py-10 px-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {/* INTRO */}
          {phase === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="card text-center py-12">
              <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-6">
                <HiLightningBolt className="text-indigo-400 text-4xl" />
              </div>
              <h1 className="font-display text-2xl font-bold text-slate-100 mb-2">{quiz?.title}</h1>
              <p className="text-slate-400 mb-8">Test your knowledge with {total} questions. You need {quiz?.passMark}% to pass.</p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Questions", value: total },
                  { label: "Time Limit", value: `${Math.floor((quiz?.timeLimit || 600) / 60)} min` },
                  { label: "Pass Mark", value: `${quiz?.passMark}%` },
                ].map(({ label, value }) => (
                  <div key={label} className="glass rounded-xl p-4">
                    <p className="font-display font-bold text-2xl gradient-text-indigo">{value}</p>
                    <p className="text-slate-500 text-xs mt-1">{label}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 justify-center">
                <Link to={`/learn/${courseId}`} className="btn-secondary flex items-center gap-2">← Back to Course</Link>
                <button onClick={handleStart} className="btn-primary flex items-center gap-2">Start Quiz <HiChevronRight /></button>
              </div>
            </motion.div>
          )}

          {/* QUIZ */}
          {phase === "taking" && q && (
            <motion.div key="taking" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Top bar */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-slate-400 text-sm">Question {currentQ + 1} of {total}</span>
                <div className={`flex items-center gap-2 glass rounded-full px-4 py-2 ${percent < 30 ? "border-red-500/40 text-red-400" : "text-slate-300"}`}>
                  <HiClock className={percent < 30 ? "text-red-400 animate-pulse" : "text-indigo-400"} />
                  <span className="font-mono font-bold text-sm">{display}</span>
                </div>
                <span className="text-slate-400 text-sm">{answered}/{total} answered</span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden mb-6">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all" style={{ width: `${((currentQ + 1) / total) * 100}%` }} />
              </div>

              {/* Question card */}
              <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card mb-5">
                <p className="font-display font-semibold text-slate-100 text-lg mb-6 leading-relaxed">{q.text}</p>

                <div className="space-y-3">
                  {q.options.map((opt, i) => {
                    const selected = answers[q.id] === i;
                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(q.id, i)}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 text-left ${
                          selected
                            ? "border-indigo-500/60 bg-indigo-500/10 text-slate-100"
                            : "border-white/8 hover:border-indigo-500/30 hover:bg-white/3 text-slate-300"
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg border flex items-center justify-center flex-shrink-0 text-sm font-semibold transition-all ${selected ? "border-indigo-500 bg-indigo-500 text-white" : "border-white/20 text-slate-500"}`}>
                          {selected ? <HiCheck /> : String.fromCharCode(65 + i)}
                        </div>
                        <span className="text-sm">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Navigation */}
              <div className="flex items-center gap-3">
                <button onClick={() => setCurrentQ(q => Math.max(0, q - 1))} disabled={currentQ === 0} className="btn-secondary flex items-center gap-2 disabled:opacity-40">
                  <HiChevronLeft /> Prev
                </button>
                <div className="flex-1 flex gap-1 overflow-x-auto">
                  {quiz.questions.map((_, i) => (
                    <button key={i} onClick={() => setCurrentQ(i)} className={`w-7 h-7 rounded flex-shrink-0 text-xs font-medium transition-all ${i === currentQ ? "bg-indigo-500 text-white" : answers[quiz.questions[i].id] !== undefined ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "glass text-slate-500"}`}>{i + 1}</button>
                  ))}
                </div>
                {currentQ < total - 1
                  ? <button onClick={() => setCurrentQ(q => Math.min(total - 1, q + 1))} className="btn-primary flex items-center gap-2">Next <HiChevronRight /></button>
                  : <button onClick={handleSubmit} disabled={submitting} className="btn-primary flex items-center gap-2 disabled:opacity-60">
                      {submitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Submit Quiz"}
                    </button>
                }
              </div>
            </motion.div>
          )}

          {/* RESULT */}
          {phase === "result" && result && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card text-center py-10">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${result.passed ? "bg-emerald-500/10 border-2 border-emerald-500/30" : "bg-red-500/10 border-2 border-red-500/30"}`}>
                {result.passed
                  ? <HiCheck className="text-emerald-400 text-5xl" />
                  : <HiX className="text-red-400 text-5xl" />
                }
              </div>

              <h2 className="font-display text-3xl font-bold mb-2" style={{ color: result.passed ? "#34d399" : "#f87171" }}>
                {result.passed ? "Congratulations!" : "Keep Practicing"}
              </h2>
              <p className="text-slate-400 mb-8">
                {result.passed ? "You passed the quiz! Your certificate is ready." : `You need ${quiz?.passMark}% to pass. Score: ${result.score}%`}
              </p>

              {/* Score ring */}
              <div className="relative w-32 h-32 mx-auto mb-8">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke={result.passed ? "#34d399" : "#f87171"} strokeWidth="2.5" strokeDasharray={`${result.score} ${100 - result.score}`} strokeLinecap="round" style={{ transition: "stroke-dasharray 1s ease" }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display font-extrabold text-3xl text-slate-100">{result.score}%</span>
                  <span className="text-slate-500 text-xs">Score</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Correct", value: result.correct, color: "text-emerald-400" },
                  { label: "Wrong", value: result.total - result.correct, color: "text-red-400" },
                  { label: "Total", value: result.total, color: "text-slate-300" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="glass rounded-xl p-3">
                    <p className={`font-bold text-2xl ${color}`}>{value}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 justify-center flex-wrap">
                <button onClick={handleRetry} className="btn-secondary flex items-center gap-2">
                  <HiRefresh /> Retry Quiz
                </button>
                <Link to={`/learn/${courseId}`} className="btn-secondary flex items-center gap-2">Back to Course</Link>
                {result.passed && (
                  <Link to={`/certificate/${courseId}`} className="btn-primary flex items-center gap-2">
                    <HiAcademicCap /> Get Certificate
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizPage;
