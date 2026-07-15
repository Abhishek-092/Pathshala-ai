import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Brain, CheckSquare, User, Cpu } from "lucide-react";
import { useUserStore } from "../../store/userStore";

interface ShellProps {
  children: React.ReactNode;
}

export const Shell: React.FC<ShellProps> = ({ children }) => {
  const streak = useUserStore((s) => s.streak);
  const location = useLocation();

  const isNavActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="app-shell flex flex-col h-screen overflow-hidden">
      <header className="app-header flex-shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-50">
        <div className="max-w-[1440px] mx-auto px-10 h-16 flex items-center justify-between w-full">
          <div className="header-left flex items-center gap-3">
            <Link to="/home" className="logo-container flex items-center gap-2.5 hover:opacity-80 transition-opacity -ml-6">
              <img src="/logo-light.svg" className="h-14 w-auto translate-x-2 block dark:hidden" alt="Pathshala AI" />
              <img src="/logo-dark.svg" className="h-14 w-auto translate-x-2 hidden dark:block" alt="Pathshala AI" />
              <span className="logo-text font-bold text-lg text-indigo-600 dark:text-indigo-400 font-headline">
                Pathshala <span className="text-slate-800 dark:text-white font-headline">AI</span>
              </span>
            </Link>
            <span className="offline-dot-badge text-xs flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Local Engine Active
            </span>
          </div>

          <nav className="header-center flex gap-4">
            <Link
              to="/home"
              className={`nav-item flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${isNavActive("/home")
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850"
                }`}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link
              to="/learn"
              className={`nav-item flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${isNavActive("/learn")
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850"
                }`}
            >
              <BookOpen className="w-4 h-4" />
              Learn
            </Link>
            <Link
              to="/tutor"
              className={`nav-item flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${isNavActive("/tutor")
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850"
                }`}
            >
              <Brain className="w-4 h-4" />
              AI Tutor
            </Link>
            <Link
              to="/practice"
              className={`nav-item flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${isNavActive("/practice")
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850"
                }`}
            >
              <CheckSquare className="w-4 h-4" />
              Practice
            </Link>
            <Link
              to="/profile"
              className={`nav-item flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${isNavActive("/profile")
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850"
                }`}
            >
              <User className="w-4 h-4" />
              Profile
            </Link>
          </nav>

          <div className="header-right flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm">
              <span>🔥</span>
              <span>{streak} Day Streak</span>
            </div>
          </div>
        </div>
      </header>

      <div className="app-main-viewport-wrapper flex-1 overflow-y-auto w-full bg-slate-50 dark:bg-slate-900">
        <main className="app-main-canvas max-w-[1440px] mx-auto px-10 py-10">
          {children}
        </main>
      </div>
    </div>
  );
};
export default Shell;
