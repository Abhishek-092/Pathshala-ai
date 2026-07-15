import React from "react";
import { Award, Accessibility, Volume2 } from "lucide-react";
import { Shell } from "../../components/layout/Shell";
import { useUserStore } from "../../store/userStore";
import { useSettingsStore } from "../../store/settingsStore";

export const Profile: React.FC = () => {
  const { xp, streak, name } = useUserStore();
  const { dyslexicFont, highContrast, darkMode, toggleDyslexicFont, toggleHighContrast, toggleDarkMode } = useSettingsStore();

  const initials = name ? name.split(" ").map(n => n[0]).join("").toUpperCase() : "GU";

  return (
    <Shell>
      <div className="pb-32 max-w-[1280px] mx-auto">
        
        {/* Profile Header */}
        <section className="mb-12 flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300 text-3xl font-bold font-headline shadow-md border-4 border-white dark:border-slate-800">
              {initials}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center border-4 border-white font-bold text-sm shadow-md">
              12
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <h1 className="text-3xl font-bold text-slate-800 dark:text-white font-headline">{name}</h1>
              <div className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold self-center md:self-auto">
                <span>⚡</span>
                Pro Learner
              </div>
            </div>
            
            <div className="max-w-md mx-auto md:mx-0">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase">Experience Points (XP)</span>
                <span className="text-lg font-bold text-indigo-600 font-headline">{xp} <span className="text-xs text-slate-400">/ 10,000</span></span>
              </div>
              <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full transition-all duration-1000" style={{ width: `${(xp / 10000) * 100}%` }} />
              </div>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">You're in the top 5% of offline learners this month!</p>
            </div>
          </div>
        </section>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Achievements */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-[24px] p-8 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white font-headline flex items-center gap-3 mb-8">
              <Award className="w-5 h-5 text-indigo-600" />
              Achievements
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center gap-2 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600 flex items-center justify-center transition-transform group-hover:scale-105">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">Fast Learner</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-950/20 text-cyan-600 flex items-center justify-center transition-transform group-hover:scale-105">
                  <span>📅</span>
                </div>
                <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">{streak} Day Streak</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/20 text-indigo-600 flex items-center justify-center transition-transform group-hover:scale-105">
                  <span>🎓</span>
                </div>
                <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">Graduate</span>
              </div>
            </div>
          </div>

          {/* Accessibility settings */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-[24px] p-8 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white font-headline flex items-center gap-3 mb-6">
              <Accessibility className="w-5 h-5 text-indigo-600" />
              Accessibility Customizations
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <strong className="text-xs text-slate-800 dark:text-white">Dyslexic Font</strong>
                  <p className="text-[10px] text-slate-400">Uses OpenDyslexic font-family styling</p>
                </div>
                <input type="checkbox" checked={dyslexicFont} onChange={toggleDyslexicFont} className="w-4 h-4 text-indigo-600 rounded" />
              </div>
              <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-3">
                <div>
                  <strong className="text-xs text-slate-800 dark:text-white">High Contrast</strong>
                  <p className="text-[10px] text-slate-400">Elevates text visibility ratio</p>
                </div>
                <input type="checkbox" checked={highContrast} onChange={toggleHighContrast} className="w-4 h-4 text-indigo-600 rounded" />
              </div>
              <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-3">
                <div>
                  <strong className="text-xs text-slate-800 dark:text-white">Dark Mode</strong>
                  <p className="text-[10px] text-slate-400">Low-light theme background</p>
                </div>
                <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} className="w-4 h-4 text-indigo-600 rounded" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </Shell>
  );
};

export default Profile;
