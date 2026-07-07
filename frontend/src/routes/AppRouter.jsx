import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../components/common/LoadingScreen";

import MainLayout from "../layouts/MainLayout";
import NotFoundPage from "../pages/NotFoundPage";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminLayout from "../layouts/AdminLayout";

// Eager (small / above the fold)
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";

// Lazy
const CoursesPage      = lazy(() => import("../pages/CoursesPage"));
const CourseDetailPage = lazy(() => import("../pages/CourseDetailPage"));
const LearningPage     = lazy(() => import("../pages/LearningPage"));
const QuizPage         = lazy(() => import("../pages/QuizPage"));
const CertificatePage  = lazy(() => import("../pages/CertificatePage"));
const SubscriptionPage = lazy(() => import("../pages/SubscriptionPage"));
const UserDashboard    = lazy(() => import("../pages/dashboard/UserDashboard"));
const AdminDashboard   = lazy(() => import("../pages/admin/AdminDashboard"));
const AdminCourses     = lazy(() => import("../pages/admin/AdminCourses"));
const AdminUsers       = lazy(() => import("../pages/admin/AdminUsers"));
const AdminQuizzes     = lazy(() => import("../pages/admin/AdminQuizzes"));

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin()) return <Navigate to="/dashboard" replace />;
  return children;
};

const GuestRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

const AppRouter = () => (
  <Suspense fallback={<LoadingScreen />}>
    <Routes>
      {/* Public */}
      <Route element={<MainLayout />}>
        <Route path="/"             element={<LandingPage />} />
        <Route path="/courses"      element={<CoursesPage />} />
        <Route path="/courses/:id"  element={<CourseDetailPage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
      </Route>

      {/* Auth */}
      <Route path="/login"            element={<GuestRoute><LoginPage /></GuestRoute>} />
      <Route path="/register"         element={<GuestRoute><RegisterPage /></GuestRoute>} />
      <Route path="/forgot-password"  element={<ForgotPasswordPage />} />

      {/* User protected */}
      <Route element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
        <Route path="/dashboard"              element={<UserDashboard />} />
        <Route path="/learn/:courseId"        element={<LearningPage />} />
        <Route path="/quiz/:courseId"         element={<QuizPage />} />
        <Route path="/certificate/:courseId"  element={<CertificatePage />} />
      </Route>

      {/* Admin protected */}
      <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route path="/admin"          element={<AdminDashboard />} />
        <Route path="/admin/courses"  element={<AdminCourses />} />
        <Route path="/admin/users"    element={<AdminUsers />} />
        <Route path="/admin/quizzes"  element={<AdminQuizzes />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);

export default AppRouter;
