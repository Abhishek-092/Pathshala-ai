import { router } from "../../core/router.js";
import { analyticsTracker } from "../../learning/analytics/tracker.js";
import { curriculumEngine } from "../../learning/curriculum/curriculumEngine.js";
import { getStoreValue } from "../../storage/indexeddb/database.js";

export async function chaptersPage(container) {
  const packId = curriculumEngine.activePackId;
  const pack = await getStoreValue("packs", packId);

  if (!pack || !pack.concepts) {
    container.innerHTML = `
      <div class="error-screen">
        <p>No active package loaded. Please install a pack first.</p>
        <button class="primary-btn" id="btn-err-install">View Packs</button>
      </div>
    `;
    container.querySelector("#btn-err-install").addEventListener("click", () => router.navigate("packSelection"));
    return;
  }

  const concepts = pack.concepts;
  const progress = analyticsTracker.progress;

  const masteredCount = Object.keys(progress).filter(k => progress[k].status === "Mastered").length;
  const completionPct = Math.round((masteredCount / 5) * 100);

  container.innerHTML = `
    <main class="relative min-h-screen pb-32 overflow-hidden max-w-[800px] mx-auto">
      
      <!-- Header Section -->
      <div class="text-center mb-16">
        <h1 class="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white font-headline mb-2">${pack.manifest.name}</h1>
        <p class="text-slate-500 dark:text-slate-400 text-sm">Your personalized path to mastering advanced offline concepts</p>
        
        <div class="mt-6 inline-flex items-center gap-4 px-6 py-2 bg-slate-100 dark:bg-slate-800 rounded-full">
          <div class="w-32 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div class="h-full bg-emerald-500" style="width: ${completionPct}%"></div>
          </div>
          <span class="text-xs font-bold text-slate-700 dark:text-slate-300">${completionPct}% Complete</span>
        </div>
      </div>

      <!-- Path Nodes -->
      <div class="relative flex flex-col items-center gap-20">
        ${concepts.map((concept, idx) => {
          const userProg = progress[concept.id];
          const isMastered = userProg && userProg.status === "Mastered";
          
          const prereqs = concept.prerequisites || [];
          const isLocked = !prereqs.every(pId => {
            const pProg = progress[pId];
            return pProg && pProg.status === "Mastered";
          });

          // Horizontal offset alternating: left, center, right, center
          const translateClasses = [
            "",
            "md:translate-x-24",
            "md:-translate-x-16",
            "md:translate-x-12"
          ];
          const transClass = translateClasses[idx % translateClasses.length];

          let nodeState = "border-slate-200 text-slate-400 opacity-60";
          let badgeIcon = "lock";
          let haloColor = "";
          
          if (isMastered) {
            nodeState = "border-emerald-500 text-emerald-500 cursor-pointer active:scale-95";
            badgeIcon = "check_circle";
            haloColor = "bg-emerald-500/10";
          } else if (!isLocked) {
            nodeState = "border-primary text-primary cursor-pointer animate-pulse active:scale-95";
            badgeIcon = "play_arrow";
            haloColor = "bg-indigo-500/10";
          }

          return `
            <div class="relative flex flex-col items-center ${transClass} group">
              <div class="node-click-trigger w-24 h-24 md:w-32 md:h-32 rounded-full bg-white dark:bg-slate-800 shadow-md border-[6px] ${nodeState} flex items-center justify-center relative z-30 transition-transform duration-300 hover:scale-105" data-id="${concept.id}" data-locked="${isLocked}">
                <span class="material-symbols-outlined text-4xl md:text-5xl" style="font-variation-settings: 'FILL' 1;">${badgeIcon}</span>
                <!-- Halo Effect -->
                ${haloColor ? `<div class="absolute inset-0 rounded-full ${haloColor} blur-xl -z-10"></div>` : ""}
              </div>
              
              <!-- Title Card -->
              <div class="mt-4 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 z-30">
                <span class="font-headline font-bold text-xs text-slate-800 dark:text-white">${concept.name}</span>
              </div>
            </div>
          `;
        }).join("")}
      </div>

    </main>
  `;

  // Attach navigation triggers
  container.querySelectorAll(".node-click-trigger").forEach(node => {
    node.addEventListener("click", (e) => {
      const isLocked = e.currentTarget.getAttribute("data-locked") === "true";
      if (isLocked) {
        // Simple scale bounce animation for locked
        e.currentTarget.classList.add("shake-animation");
        setTimeout(() => e.currentTarget.classList.remove("shake-animation"), 500);
        return;
      }
      const id = e.currentTarget.getAttribute("data-id");
      router.navigate("lesson", { conceptId: id });
    });
  });
}
