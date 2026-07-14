import { router } from "../../core/router.js";
import { accessibilityManager } from "../components/accessibility.js";
import { analyticsTracker } from "../../learning/analytics/tracker.js";

export function profilePage(container) {
  function render() {
    container.innerHTML = `
      <div class="pb-32 max-w-[1280px] mx-auto">
        
        <!-- Profile Header Section -->
        <section class="mb-12 flex flex-col md:flex-row items-center md:items-start gap-8">
          <div class="relative">
            <div class="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-primary to-cyan-500 ring-4 ring-white shadow-md relative overflow-hidden group">
              <img class="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsh-m9tO71IRFyOY2I9gnG829LwpDBoXNMWIfLdSz1X946MVGzij2LLC9xohGycepoPFdxSwkNCDvDfBXawIg0V8mAzwNrfZgp6w-SNY-hUvsQE6oFWRPW0vNbF8CXsxvS215_lZiPzgt-Gs0-hf8ty99-DWLeOILH_DRuHRsgTYP5QkTb5eKrVIcp2v7iZ3ru6HqyrGd9975ahRMXL7RIfSq5TPHxoUY2rL8z4eEvRFz-L07-tgSBCw" alt="Alex portrait">
            </div>
            <div class="absolute -bottom-2 -right-2 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center border-4 border-white font-bold text-sm shadow-md">
              12
            </div>
          </div>
          <div class="flex-1 text-center md:text-left">
            <div class="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <h1 class="text-3xl font-bold text-slate-800 dark:text-white font-headline">Abhishek Thompson</h1>
              <div class="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold self-center md:self-auto">
                <span class="material-symbols-outlined text-[16px]">bolt</span>
                Pro Learner
              </div>
            </div>
            
            <div class="max-w-md mx-auto md:mx-0">
              <div class="flex justify-between items-end mb-2">
                <span class="text-xs font-semibold text-slate-400 uppercase">Experience Points (XP)</span>
                <span class="text-lg font-bold text-primary font-headline">${analyticsTracker.totalXp} <span class="text-xs text-slate-400">/ 10,000</span></span>
              </div>
              <div class="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div class="h-full bg-primary rounded-full transition-all duration-1000" style="width: ${(analyticsTracker.totalXp / 10000) * 100}%"></div>
              </div>
              <p class="mt-3 text-xs text-slate-500 dark:text-slate-400">You're in the top 5% of offline learners this month!</p>
            </div>
          </div>
        </section>

        <!-- Profile Bento Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- Achievements Card -->
          <div class="bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-[24px] p-8 shadow-sm">
            <div class="flex justify-between items-center mb-8">
              <h2 class="text-lg font-bold text-slate-800 dark:text-white font-headline flex items-center gap-3">
                <span class="material-symbols-outlined text-primary">military_tech</span>
                Achievements
              </h2>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div class="flex flex-col items-center text-center gap-2 group cursor-pointer">
                <div class="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600 flex items-center justify-center transition-transform group-hover:scale-105">
                  <span class="material-symbols-outlined text-2xl">workspace_premium</span>
                </div>
                <span class="text-[10px] font-bold text-slate-800 dark:text-slate-200">Fast Learner</span>
              </div>
              <div class="flex flex-col items-center text-center gap-2 group cursor-pointer">
                <div class="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-950/20 text-cyan-600 flex items-center justify-center transition-transform group-hover:scale-105">
                  <span class="material-symbols-outlined text-2xl">calendar_today</span>
                </div>
                <span class="text-[10px] font-bold text-slate-800 dark:text-slate-200">${analyticsTracker.streak} Day Streak</span>
              </div>
              <div class="flex flex-col items-center text-center gap-2 group cursor-pointer">
                <div class="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/20 text-primary flex items-center justify-center transition-transform group-hover:scale-105">
                  <span class="material-symbols-outlined text-2xl">school</span>
                </div>
                <span class="text-[10px] font-bold text-slate-800 dark:text-slate-200">Graduate</span>
              </div>
            </div>
          </div>

          <!-- Accessibility / Settings Card -->
          <div class="bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-[24px] p-8 shadow-sm">
            <h2 class="text-lg font-bold text-slate-800 dark:text-white font-headline mb-6 flex items-center gap-3">
              <span class="material-symbols-outlined text-primary">accessibility</span>
              Accessibility Customizations
            </h2>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <div>
                  <strong class="text-xs text-slate-800 dark:text-white">Dyslexic Font</strong>
                  <p class="text-[10px] text-slate-400">Uses OpenDyslexic font-family styling</p>
                </div>
                <input type="checkbox" id="check-dyslexic" class="w-4 h-4 text-primary" ${accessibilityManager.dyslexiaFont ? "checked" : ""} />
              </div>
              <div class="flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-3">
                <div>
                  <strong class="text-xs text-slate-800 dark:text-white">High Contrast</strong>
                  <p class="text-[10px] text-slate-400">Elevates text visibility ratio</p>
                </div>
                <input type="checkbox" id="check-contrast" class="w-4 h-4 text-primary" ${accessibilityManager.highContrast ? "checked" : ""} />
              </div>
            </div>
          </div>

        </div>

      </div>
    `;

    // Event listeners
    container.querySelector("#check-dyslexic").addEventListener("change", (e) => {
      accessibilityManager.setDyslexiaFont(e.target.checked);
    });

    container.querySelector("#check-contrast").addEventListener("change", (e) => {
      accessibilityManager.setHighContrast(e.target.checked);
    });
  }

  render();
}
