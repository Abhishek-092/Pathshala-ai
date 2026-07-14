import React, { useState, useEffect } from "react";
import { analyticsTracker } from "../../learning/analytics/tracker.js";
import { curriculumEngine } from "../../learning/curriculum/curriculumEngine.js";
import { getStoreValue } from "../../storage/indexeddb/database.js";

export default function Chapters() {
  const [pack, setPack] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPack() {
      const packId = curriculumEngine.activePackId || "class10-science";
      const data = await getStoreValue("packs", packId);
      setPack(data);
      setLoading(false);
    }
    loadPack();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading Journey Map...</div>;
  }

  if (!pack || !pack.concepts) {
    return (
      <div className="text-center py-12">
        <p>No active package loaded. Please install a pack first.</p>
        <button className="primary-btn mt-4" onClick={() => window.reactNavigate("subjects")}>View Packs</button>
      </div>
    );
  }

  const concepts = pack.concepts;
  const progress = analyticsTracker.progress;
  const masteredCount = Object.keys(progress).filter(k => progress[k].status === "Mastered").length;
  const completionPct = Math.round((masteredCount / 5) * 100);

  const handleNodeClick = (conceptId, isLocked) => {
    if (isLocked) {
      alert("This topic is locked. Complete the prerequisite topics first!");
      return;
    }
    window.reactNavigate("lesson", { conceptId });
  };

  return (
    <main className="relative min-h-screen pb-32 overflow-hidden max-w-[1280px] mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white font-headline mb-2">{pack.manifest.name}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Your personalized path to mastering advanced offline concepts</p>
        
        <div className="mt-6 inline-flex items-center gap-4 px-6 py-2 bg-slate-100 dark:bg-slate-800 rounded-full">
          <div className="w-32 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${completionPct}%` }} />
          </div>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{completionPct}% Complete</span>
        </div>
      </div>

      <div className="relative flex flex-col items-center gap-20">
        {concepts.map((concept, idx) => {
          const userProg = progress[concept.id];
          const isMastered = userProg && userProg.status === "Mastered";
          
          const prereqs = concept.prerequisites || [];
          const isLocked = !prereqs.every(pId => {
            const pProg = progress[pId];
            return pProg && pProg.status === "Mastered";
          });

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

          return (
            <div key={concept.id} className={`relative flex flex-col items-center ${transClass} group`}>
              <div
                onClick={() => handleNodeClick(concept.id, isLocked)}
                className={`w-24 h-24 md:w-32 md:h-32 rounded-full bg-white dark:bg-slate-800 shadow-md border-[6px] ${nodeState} flex items-center justify-center relative z-30 transition-transform duration-300 hover:scale-105`}
              >
                <span className="material-symbols-outlined text-4xl md:text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>{badgeIcon}</span>
                {haloColor && <div className={`absolute inset-0 rounded-full ${haloColor} blur-xl -z-10`} />}
              </div>
              <div className="mt-4 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 z-30">
                <span className="font-headline font-bold text-xs text-slate-800 dark:text-white">{concept.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
