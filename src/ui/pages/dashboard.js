import { router } from "../../core/router.js";
import { analyticsTracker } from "../../learning/analytics/tracker.js";
import { modelManager } from "../../ai/modelManager.js";
import { curriculumEngine } from "../../learning/curriculum/curriculumEngine.js";

export async function dashboardPage(container) {
  const activeModel = modelManager.getActiveModel();
  
  // Dynamic next recommended lesson
  const recommended = await curriculumEngine.getNextRecommendedTopic(analyticsTracker.progress) || {
    id: "chem-reactions",
    name: "Chemical Reactions and Equations",
    summary: "Introduction to chemical formulas, writing equations, and balancing chemical reactions."
  };

  const weakCount = analyticsTracker.getWeakConcepts().length;
  const masteredCount = analyticsTracker.getMasteredConcepts().length;
  const completionPct = Math.round((masteredCount / 5) * 100);

  container.innerHTML = `
    <!-- Content Section -->
    <div class="mb-8">
      <p class="text-primary font-bold uppercase tracking-widest text-xs mb-1">Welcome back</p>
      <h2 class="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white font-headline">Good Morning, Abhishek.</h2>
      <p class="text-slate-500 dark:text-slate-400 text-lg mt-2">You're on a ${analyticsTracker.streak}-day streak! Ready to expand your horizons today?</p>
    </div>

    <!-- Bento Grid Layout -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
      
      <!-- Continue Learning: Hero Card (Col 1-8) -->
      <div class="md:col-span-8 group relative overflow-hidden rounded-[32px] bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 p-8 shadow-sm hover:shadow-md transition-all duration-300">
        <div class="absolute top-0 right-0 w-64 h-64 -mr-20 -mt-20 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors"></div>
        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-6">
            <span class="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-xs font-bold">RECOMMENDED TOPIC</span>
            <span class="text-slate-400 text-xs">${masteredCount * 20}% Curriculum Mastered</span>
          </div>
          <h3 class="text-2xl font-bold text-slate-800 dark:text-white mb-4 font-headline">${recommended.name}</h3>
          <p class="text-slate-500 dark:text-slate-400 text-sm mb-8 max-w-xl">${recommended.summary}</p>
          <div class="flex items-center gap-6 mb-4">
            <div class="relative w-16 h-16">
              <svg class="w-16 h-16 transform -rotate-90">
                <circle class="text-slate-100 dark:text-slate-700" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" stroke-width="6"></circle>
                <circle class="text-indigo-600 dark:text-indigo-400" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" stroke-dasharray="176" stroke-dashoffset="${176 - (176 * completionPct) / 100}" stroke-width="6"></circle>
              </svg>
              <span class="absolute inset-0 flex items-center justify-center font-bold text-xs text-indigo-600 dark:text-indigo-400">${completionPct}%</span>
            </div>
            <button id="btn-resume-learning" class="bg-primary text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all">
              Resume Learning
              <span class="material-symbols-outlined">play_arrow</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Right Side Column (Col 9-12) -->
      <div class="md:col-span-4 flex flex-col gap-6">
        
        <!-- On-Device AI Status Widget -->
        <div class="bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-[32px] p-6 shadow-sm">
          <div class="flex justify-between items-start mb-4">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Local AI Engine</h4>
            <span class="bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full text-[10px] font-bold">ON-DEVICE</span>
          </div>
          <p class="font-bold text-slate-800 dark:text-white mb-2 font-headline">${activeModel.name}</p>
          <div class="flex justify-between text-xs text-slate-500 border-t border-slate-100 dark:border-slate-700 pt-3 mt-3">
            <span>RAM: ${activeModel.ramRequired}</span>
            <span>Speed: ~18 t/s</span>
          </div>
        </div>

        <!-- Weekly Progress Streaks -->
        <div class="bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-[32px] p-6 shadow-sm">
          <div class="flex justify-between items-start mb-4">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Weekly Streak</h4>
            <span class="text-indigo-600 font-bold text-xs">🔥 ${analyticsTracker.streak} Days</span>
          </div>
          <div class="flex justify-between gap-1">
            ${["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => `
              <div class="flex flex-col items-center gap-1.5 flex-1">
                <span class="text-[10px] text-slate-400">${day}</span>
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${idx < analyticsTracker.streak ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-400"}">
                  ${idx < analyticsTracker.streak ? "✓" : "•"}
                </div>
              </div>
            `).join("")}
          </div>
        </div>

      </div>
    </div>

    <!-- Quick Actions Row -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      <button id="btn-action-tutor" class="flex flex-col items-start p-6 bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-3xl hover:border-indigo-600/30 transition-all text-left">
        <span class="material-symbols-outlined text-indigo-600 mb-2">forum</span>
        <strong class="text-slate-800 dark:text-white text-sm">Ask AI Tutor</strong>
        <span class="text-slate-400 text-xs mt-1">Get instant local answers</span>
      </button>
      <button id="btn-action-practice" class="flex flex-col items-start p-6 bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-3xl hover:border-indigo-600/30 transition-all text-left">
        <span class="material-symbols-outlined text-emerald-600 mb-2">checklist</span>
        <strong class="text-slate-800 dark:text-white text-sm">Practice Quiz</strong>
        <span class="text-slate-400 text-xs mt-1">Strengthen recall knowledge</span>
      </button>
      <button id="btn-action-path" class="flex flex-col items-start p-6 bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-3xl hover:border-indigo-600/30 transition-all text-left">
        <span class="material-symbols-outlined text-cyan-600 mb-2">route</span>
        <strong class="text-slate-800 dark:text-white text-sm">Learning Path</strong>
        <span class="text-slate-400 text-xs mt-1">See your milestones</span>
      </button>
      <button id="btn-action-downloads" class="flex flex-col items-start p-6 bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-3xl hover:border-indigo-600/30 transition-all text-left">
        <span class="material-symbols-outlined text-amber-600 mb-2">download_for_offline</span>
        <strong class="text-slate-800 dark:text-white text-sm">Offline Storage</strong>
        <span class="text-slate-400 text-xs mt-1">Manage downloaded packs</span>
      </button>
    </div>
  `;

  // Interaction handlers
  container.querySelector("#btn-resume-learning").addEventListener("click", () => {
    router.navigate("lesson", { conceptId: recommended.id });
  });

  container.querySelector("#btn-action-tutor").addEventListener("click", () => router.navigate("aiTutor"));
  container.querySelector("#btn-action-practice").addEventListener("click", () => router.navigate("practice"));
  container.querySelector("#btn-action-path").addEventListener("click", () => router.navigate("learningPath"));
  container.querySelector("#btn-action-downloads").addEventListener("click", () => router.navigate("downloads"));
}
