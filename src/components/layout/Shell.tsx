import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Brain, CheckSquare, User } from "lucide-react";
import { useUserStore } from "../../store/userStore";

interface ShellProps {
  children: React.ReactNode;
}

export const Shell: React.FC<ShellProps> = ({ children }) => {
  const { name, pfp } = useUserStore();
  const location = useLocation();

  const isNavActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="app-shell flex flex-col h-screen overflow-hidden">
      {/* Toplocked Header Navbar */}
      <header className="app-header flex-shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-50">
        <div className="max-w-[1440px] mx-auto px-10 h-16 flex items-center justify-between w-full">
          <div className="header-left flex items-center gap-3">
            <Link to="/home" className="logo-container flex items-center gap-2.5 hover:opacity-80 transition-opacity -ml-7">
              <img src="/logo-light.svg" className="h-14 w-auto translate-x-2 block dark:hidden" alt="Pathshala AI" />
              <img src="/logo-dark.svg" className="h-14 w-auto translate-x-2 hidden dark:block" alt="Pathshala AI" />
              <span className="logo-text font-bold text-lg text-indigo-600 dark:text-indigo-400 font-headline -ml-2">
                Pathshala <span className="text-slate-800 dark:text-white font-headline">AI</span>
              </span>
            </Link>
          </div>

          {/* Profile Circle Button (Right corner alignment) */}
          <div className="header-right flex items-center justify-end">
            <Link
              to="/profile"
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all overflow-hidden border border-slate-200 dark:border-slate-800 ${
                isNavActive("/profile")
                  ? "ring-2 ring-indigo-600 dark:ring-indigo-400"
                  : "hover:bg-slate-50 dark:hover:bg-slate-850"
              }`}
            >
              {pfp ? (
                <img src={pfp} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Body - Sidebar + Viewport Container */}
      <div className="flex flex-1 overflow-hidden w-full">
        {/* Left Sidebar */}
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between flex-shrink-0 z-40 p-6">
          <nav className="flex flex-col gap-2 w-full">
            <Link
              to="/home"
              className={`nav-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isNavActive("/home")
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/learn"
              className={`nav-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isNavActive("/learn")
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span>Learn</span>
            </Link>
            <Link
              to="/tutor"
              className={`nav-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isNavActive("/tutor")
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <Brain className="w-5 h-5" />
              <span>AI Tutor</span>
            </Link>
            <Link
              to="/practice"
              className={`nav-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isNavActive("/practice")
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <CheckSquare className="w-5 h-5" />
              <span>Practice</span>
            </Link>
          </nav>

          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold tracking-widest uppercase mt-auto">
            Pathshala AI
          </div>
        </aside>

        {/* Right Viewport Content Area */}
        <div className="app-main-viewport-wrapper flex-1 overflow-y-auto w-full bg-slate-50 dark:bg-slate-900">
          <main className="app-main-canvas max-w-[1440px] mx-auto px-10 py-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shell;
