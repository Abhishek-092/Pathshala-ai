import { router } from "../../core/router.js";
import { analyticsTracker } from "../../learning/analytics/tracker.js";
import { curriculumEngine } from "../../learning/curriculum/curriculumEngine.js";

export function practicePage(container) {
  const weakConcepts = analyticsTracker.getWeakConcepts();
  const activePackId = curriculumEngine.activePackId || "class10-science";

  container.innerHTML = `
    <!-- XP Progress Section -->
    <section class="mb-12">
      <div class="bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
        <div class="flex flex-col gap-2">
          <h2 class="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white font-headline">Daily Progress</h2>
          <p class="text-slate-500 dark:text-slate-400 text-sm">You're 250 XP away from today's goal!</p>
          <div class="flex items-center gap-4 mt-4">
            <span class="text-xs font-bold text-primary">🔥 ${analyticsTracker.streak} Day Streak!</span>
          </div>
        </div>
        <div class="relative w-full md:w-auto flex flex-col items-center">
          <div class="relative w-40 h-40">
            <svg class="w-full h-full transform -rotate-90">
              <circle class="text-slate-100 dark:text-slate-700" cx="80" cy="80" fill="transparent" r="64" stroke="currentColor" stroke-width="10"></circle>
              <circle class="text-primary" cx="80" cy="80" fill="transparent" r="64" stroke="currentColor" stroke-dasharray="402" stroke-dashoffset="100" stroke-linecap="round" stroke-width="10"></circle>
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="text-3xl font-bold text-primary font-headline">${analyticsTracker.totalXp}</span>
              <span class="text-[9px] uppercase tracking-widest text-slate-400 font-bold">XP Earned</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Practice Modes Bento Grid -->
    <section class="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
      
      <!-- Daily Challenge (Featured) -->
      <div id="btn-practice-challenge" class="md:col-span-8 group cursor-pointer overflow-hidden rounded-[32px] bg-primary relative p-8 text-white h-[320px] transition-transform hover:scale-[1.01] active:scale-[0.99]">
        <div class="relative z-10 h-full flex flex-col justify-between">
          <div>
            <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs mb-4 font-bold">
              <span class="material-symbols-outlined text-sm">star</span>
              FEATURED CHALLENGE
            </div>
            <h3 class="text-2xl md:text-3xl font-bold font-headline mb-2">Master Chemistry Logic</h3>
            <p class="text-slate-100/80 text-sm max-w-md">Solve today's algorithmic puzzle on chemical redox equations and earn double XP.</p>
          </div>
          <button class="w-fit bg-white text-primary font-bold px-8 py-3 rounded-2xl flex items-center gap-2 hover:bg-slate-100 transition-colors">
            Start Challenge
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
        <div class="absolute right-[-20px] bottom-[-20px] w-64 h-64 opacity-20 group-hover:opacity-30 transition-opacity">
          <img class="w-full h-full object-contain animate-float" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFfDyOIjQxCJf40n-0gr39vrBJ8u3eQmB61zHNk3cXUVpPOa0J8yZJZM8Wi6D1oLTHUnkL02NMFd28STkRwKsgejmGzeklenJt3lP-qZ6q5_KADs2vmpZ1A9O7-iD2nhNIYJY_sKuu8XSmO8oREd13QdJbCBR4NE62gCW6qtzUlf-_LXzDrt_0WgSF0gNmvvvcYXdmLIJMMLs6ifDTJiJNm7o0xdSMPfLz9gzIqz4LhlwNSjhIYx39fQ" alt="Challenge decoration">
        </div>
      </div>

      <!-- Quick Quiz -->
      <div id="btn-quick-quiz-start" class="md:col-span-4 bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 p-8 rounded-[32px] flex flex-col justify-between hover:border-primary/20 transition-all group cursor-pointer">
        <div class="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 mb-6 group-hover:scale-110 transition-transform">
          <span class="material-symbols-outlined text-[32px]">bolt</span>
        </div>
        <div>
          <h3 class="text-lg font-bold text-slate-800 dark:text-white mb-2 font-headline">Quick Quiz</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">5 questions, 2 minutes. Perfect for active recall on the go.</p>
        </div>
        <div class="mt-8 flex items-center justify-between">
          <span class="text-xs font-bold text-cyan-600">+50 XP</span>
          <span class="material-symbols-outlined text-slate-400">chevron_right</span>
        </div>
      </div>

      <!-- Flashcards -->
      <div id="btn-flashcards-deck" class="md:col-span-6 bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 p-8 rounded-[32px] flex flex-col justify-between hover:border-primary/20 transition-all group cursor-pointer min-h-[220px]">
        <div class="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
          <span class="material-symbols-outlined text-[32px]">style</span>
        </div>
        <div>
          <h3 class="text-lg font-bold text-slate-800 dark:text-white mb-2 font-headline">Concept Flashcards</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">Interactive flip cards to review key definitions offline.</p>
        </div>
        <div class="mt-8 flex items-center justify-between">
          <span class="text-xs font-bold text-emerald-600">Tap to Flip Card</span>
          <span class="material-symbols-outlined text-slate-400">chevron_right</span>
        </div>
      </div>

      <!-- Focus Areas (Col 6) -->
      <div class="md:col-span-6 bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 p-8 rounded-[32px] shadow-sm flex flex-col gap-4">
        <h3 class="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">🎯 Weak Concepts Focus Areas</h3>
        <div class="flex flex-col gap-2">
          ${weakConcepts.length > 0
            ? weakConcepts.map(cId => `
                <div class="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                  <span class="text-xs font-bold text-slate-700 dark:text-slate-300">${cId.replace("-", " ")}</span>
                  <button class="text-xs text-primary font-bold recall-tutor-trigger" data-id="${cId}">Recall with Tutor</button>
                </div>
              `).join("")
            : `<p class="text-xs text-slate-400">No weak concepts flagged. Great job!</p>`
          }
        </div>
      </div>

    </section>
  `;

  // Attach triggers
  container.querySelector("#btn-practice-challenge").addEventListener("click", () => {
    router.navigate("quiz", { conceptId: weakConcepts[0] || "chem-reactions" });
  });

  container.querySelector("#btn-quick-quiz-start").addEventListener("click", () => {
    router.navigate("quiz", { conceptId: "chem-reactions" });
  });

  // Flashcards click flips a modal or runs interactive flashcard
  container.querySelector("#btn-flashcards-deck").addEventListener("click", () => {
    alert("Flashcard flipped! 'Redox Reaction' -> 'A reaction involving transfer of electrons between species.'");
  });

  container.querySelectorAll(".recall-tutor-trigger").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.getAttribute("data-id");
      router.navigate("aiTutor", { conceptId: id });
    });
  });
}
