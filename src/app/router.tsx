import React, { lazy, Suspense } from "react";
import { createHashRouter, Navigate } from "react-router-dom";

// Lazy-loaded features
const Onboarding = lazy(() => import("../features/onboarding/Onboarding"));
const Dashboard = lazy(() => import("../features/home/Dashboard"));
const Subjects = lazy(() => import("../features/learn/Subjects"));
const Chapters = lazy(() => import("../features/learn/Chapters"));
const Lesson = lazy(() => import("../features/lesson/Lesson"));
const AiTutor = lazy(() => import("../features/tutor/AiTutor"));
const Practice = lazy(() => import("../features/practice/Practice"));
const Quiz = lazy(() => import("../features/practice/Quiz"));
const Profile = lazy(() => import("../features/profile/Profile"));

const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center p-20 w-full min-h-[50vh]">
    <div className="w-10 h-10 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
  </div>
);

export const router = createHashRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Onboarding />
      </Suspense>
    )
  },
  {
    path: "/onboarding",
    element: <Navigate to="/" replace />
  },
  {
    path: "/home",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Dashboard />
      </Suspense>
    )
  },
  {
    path: "/learn",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Subjects />
      </Suspense>
    )
  },
  {
    path: "/learn/chapters",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Chapters />
      </Suspense>
    )
  },
  {
    path: "/lesson/:lessonId",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Lesson />
      </Suspense>
    )
  },
  {
    path: "/tutor",
    element: (
      <Suspense fallback={<PageLoader />}>
        <AiTutor />
      </Suspense>
    )
  },
  {
    path: "/practice",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Practice />
      </Suspense>
    )
  },
  {
    path: "/practice/quiz/:conceptId",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Quiz />
      </Suspense>
    )
  },
  {
    path: "/profile",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Profile />
      </Suspense>
    )
  },
  {
    path: "*",
    element: <Navigate to="/home" replace />
  }
]);
