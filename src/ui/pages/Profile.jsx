import React, { useState, useEffect } from "react";
import { accessibilityManager } from "../components/accessibility.js";
import { analyticsTracker } from "../../learning/analytics/tracker.js";

export default function Profile() {
  const [totalXp, setTotalXp] = useState(0);
  const [streak, setStreak] = useState(1);
  const [dyslexic, setDyslexic] = useState(false);
  const [contrast, setContrast] = useState(false);

  useEffect(() => {
    setTotalXp(analyticsTracker.totalXp);
    setStreak(analyticsTracker.streak);
    setDyslexic(accessibilityManager.dyslexiaFont);
    setContrast(accessibilityManager.highContrast);
  }, []);

  const handleDyslexicChange = (e) => {
    const val = e.target.checked;
    setDyslexic(val);
    accessibilityManager.setDyslexiaFont(val);
  };

  const handleContrastChange = (e) => {
    const val = e.target.checked;
    setContrast(val);
    accessibilityManager.setHighContrast(val);
  };

  return (
    <div className="pb-32 max-w-[1280px] mx-auto">
      
      {/* Profile Header Section */}
      <section className="mb-12 flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-primary to-cyan-500 ring-4 ring-white shadow-md relative overflow-hidden group">
            <img className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsh-m9tO71IRFyOY2I9gnG829LwpDBoXNMWIfLdSz1X946MVGzij2LLC9xohGycepoPFdxSwkNCDvDfBXawIg0V8mAzwNrfZgp6w-SNY-hUvsQE6oFWRPW0vNbF8CXsxvS215_lZiPzgt-Gs0-hf8ty99-DWLeOILH_DRuHRsgTYP5QkTb5eKrVIcp2v7iZ3ru6HqyrGd9975ahRMXL7RIfSq5TPHxoUY2rL8z4eEvRFz-L07-tgSBCw" alt="Alex portrait" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center border-4 border-white font-bold text-sm shadow-md">
            12
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white font-headline">Abhishek Thompson</h1>
            <div className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold self-center md:self-auto">
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              Pro Learner
            </div>
          </div>
          
          <div className="max-w-md mx-auto md:mx-0">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase">Experience Points (XP)</span>
              <span className="text-lg font-bold text-primary font-headline">{totalXp} <span className="text-xs text-slate-400">/ 10,000</span></span>
            </div>
            <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${(totalXp / 10000) * 100}%` }} />
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">You're in the top 5% of offline learners this month!</p>
          </div>
        </div>
      </section>

      {/* Profile Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Achievements Card */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-[24px] p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white font-headline flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">military_tech</span>
              Achievements
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center gap-2 group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600 flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="material-symbols-outlined text-2xl">workspace_premium</span>
              </div>
              <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">Fast Learner</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2 group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-950/20 text-cyan-600 flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="material-symbols-outlined text-2xl">calendar_today</span>
              </div>
              <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">{streak} Day Streak</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2 group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/20 text-primary flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="material-symbols-outlined text-2xl">school</span>
              </div>
              <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">Graduate</span>
            </div>
          </div>
        </div>

        {/* Accessibility / Settings Card */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-[24px] p-8 shadow-sm">
          <h2 class="text-lg font-bold text-slate-800 dark:text-white font-headline mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">accessibility</span>
            Accessibility Customizations
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <strong className="text-xs text-slate-800 dark:text-white">Dyslexic Font</strong>
                <p className="text-[10px] text-slate-400">Uses OpenDyslexic font-family styling</p>
              </div>
              <input type="checkbox" id="check-dyslexic" checked={dyslexic} onChange={handleDyslexicChange} className="w-4 h-4 text-primary" />
            </div>
            <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-3">
              <div>
                <strong className="text-xs text-slate-800 dark:text-white">High Contrast</strong>
                <p className="text-[10px] text-slate-400">Elevates text visibility ratio</p>
              </div>
              <input type="checkbox" id="check-contrast" checked={contrast} onChange={handleContrastChange} className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
