import React, { useState, useEffect } from "react";
import Splash from "./ui/pages/Splash.jsx";
import Onboarding from "./ui/pages/Onboarding.jsx";
import Dashboard from "./ui/pages/Dashboard.jsx";
import Subjects from "./ui/pages/Subjects.jsx";
import Chapters from "./ui/pages/Chapters.jsx";
import Lesson from "./ui/pages/Lesson.jsx";
import AiTutor from "./ui/pages/AiTutor.jsx";
import Practice from "./ui/pages/Practice.jsx";
import Profile from "./ui/pages/Profile.jsx";
import Quiz from "./ui/pages/Quiz.jsx";
import { analyticsTracker } from "./learning/analytics/tracker.js";

export default function App() {
  const [currentRoute, setCurrentRoute] = useState("splash");
  const [routeParams, setRouteParams] = useState({});
  const [streak, setStreak] = useState(1);

  // Expose navigation globally for simple components routing
  useEffect(() => {
    window.reactNavigate = (route, params = {}) => {
      setCurrentRoute(route);
      setRouteParams(params);
    };
    setStreak(analyticsTracker.streak);
  }, []);

  const renderActivePage = () => {
    switch (currentRoute) {
      case "splash":
        return <Splash onComplete={() => setCurrentRoute("onboarding")} />;
      case "onboarding":
        return <Onboarding onComplete={() => setCurrentRoute("subjects")} />;
      case "dashboard":
        return <Dashboard />;
      case "subjects":
        return <Subjects />;
      case "chapters":
        return <Chapters />;
      case "lesson":
        return <Lesson params={routeParams} />;
      case "aiTutor":
        return <AiTutor params={routeParams} />;
      case "practice":
        return <Practice />;
      case "profile":
        return <Profile />;
      case "quiz":
        return <Quiz params={routeParams} />;
      default:
        return <Dashboard />;
    }
  };

  const showNavbar = currentRoute !== "splash" && currentRoute !== "onboarding";

  return (
    <div className="app-shell">
      {showNavbar && (
        <header className="app-header">
          <div className="header-left">
            <span
              className="logo-text cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setCurrentRoute("dashboard")}
            >
              Pathshala AI
            </span>
            <span className="offline-dot-badge">● Local AI Engine Active</span>
          </div>
          <div className="header-center flex gap-6">
            <div
              className={`nav-item px-3 py-1.5 rounded-lg cursor-pointer text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center ${
                currentRoute === "dashboard" ? "active" : ""
              }`}
              onClick={() => setCurrentRoute("dashboard")}
            >
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </div>
            <div
              className={`nav-item px-3 py-1.5 rounded-lg cursor-pointer text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center ${
                currentRoute === "subjects" || currentRoute === "chapters" ? "active" : ""
              }`}
              onClick={() => setCurrentRoute("subjects")}
            >
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Learn
            </div>
            <div
              className={`nav-item px-3 py-1.5 rounded-lg cursor-pointer text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center ${
                currentRoute === "aiTutor" ? "active" : ""
              }`}
              onClick={() => setCurrentRoute("aiTutor")}
            >
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              AI Tutor
            </div>
            <div
              className={`nav-item px-3 py-1.5 rounded-lg cursor-pointer text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center ${
                currentRoute === "practice" ? "active" : ""
              }`}
              onClick={() => setCurrentRoute("practice")}
            >
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Practice
            </div>
            <div
              className={`nav-item px-3 py-1.5 rounded-lg cursor-pointer text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center ${
                currentRoute === "profile" ? "active" : ""
              }`}
              onClick={() => setCurrentRoute("profile")}
            >
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </div>
          </div>
          <div class="header-right">
            <span id="streak-indicator-top">🔥 {streak} Day Streak</span>
          </div>
        </header>
      )}

      <div className="app-main-viewport-wrapper">
        <main className="app-main-canvas" id="phone-screen-container">
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
}
