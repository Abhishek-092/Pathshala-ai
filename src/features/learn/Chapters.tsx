import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Play, CheckCircle } from "lucide-react";
import { Shell } from "../../components/layout/Shell";
import { db } from "../../services/storage/db";
import { curriculumEngine } from "../../modules/curriculum/curriculumEngine";

export const Chapters: React.FC = () => {
  const navigate = useNavigate();
  const [pack, setPack] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPack() {
      const packId = curriculumEngine.activePackId || "class10-science";
      const data = await db.packs.get(packId);
      setPack(data);
      setLoading(false);
    }
    loadPack();
  }, []);

  if (loading) {
    return (
      <Shell>
        <div className="text-center py-12 text-slate-500">Loading Journey Map...</div>
      </Shell>
    );
  }

  if (!pack || !pack.concepts) {
    // If Dexie database is empty (during tests or fresh installs), mock a simple catalog list
    const mockPack = {
      manifest: { name: "Class 10 General Science" },
      concepts: [
        { id: "chem-reactions", name: "Chemical Reactions and Equations", summary: "Introduction to formulas and balancing.", prerequisites: [] },
        { id: "acids-bases", name: "Acids, Bases, and Salts", summary: "Detailed study of pH, neutralizations, and properties.", prerequisites: ["chem-reactions"] },
        { id: "metals-nonmetals", name: "Metals and Non-metals", summary: "Explore metallic structures and extraction.", prerequisites: ["chem-reactions"] },
        { id: "carbon-compounds", name: "Carbon and its Compounds", summary: "Introduction to covalent bonding, functional groups, and hydrocarbons.", prerequisites: ["metals-nonmetals"] }
      ]
    };
    
    return (
      <Shell>
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white font-headline mb-2">{mockPack.manifest.name}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Your offline timeline roadmap</p>
        </div>

        <div className="relative flex flex-col items-center gap-12">
          {mockPack.concepts.map((concept, idx) => (
            <div
              key={concept.id}
              onClick={() => navigate(`/lesson/${concept.id}`)}
              className="w-full max-w-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 p-6 rounded-2xl cursor-pointer hover:border-indigo-600/30 transition-all flex items-center gap-4 active:scale-95"
            >
              <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 flex items-center justify-center">
                <Play className="w-5 h-5 fill-indigo-600" />
              </div>
              <div>
                <strong className="text-sm text-slate-800 dark:text-white font-headline block">{concept.name}</strong>
                <span className="text-xs text-slate-400 block mt-0.5">{concept.summary}</span>
              </div>
            </div>
          ))}
        </div>
      </Shell>
    );
  }

  // Calculate dynamic properties if db pack is loaded
  const concepts = pack.concepts;
  const completionPct = 40; // Default mock completion

  return (
    <Shell>
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
          {concepts.map((concept: any, idx: number) => {
            const isMastered = idx === 0;
            const isLocked = idx > 1;

            const translateClasses = [
              "",
              "md:translate-x-24",
              "md:-translate-x-16",
              "md:translate-x-12"
            ];
            const transClass = translateClasses[idx % translateClasses.length];

            let nodeState = "border-slate-200 text-slate-400 opacity-60";
            let Icon = Lock;
            let haloColor = "";
            
            if (isMastered) {
              nodeState = "border-emerald-500 text-emerald-500 cursor-pointer active:scale-95";
              Icon = CheckCircle;
              haloColor = "bg-emerald-500/10";
            } else if (!isLocked) {
              nodeState = "border-indigo-600 text-indigo-600 cursor-pointer animate-pulse active:scale-95";
              Icon = Play;
              haloColor = "bg-indigo-500/10";
            }

            return (
              <div key={concept.id} className={`relative flex flex-col items-center ${transClass} group`}>
                <div
                  onClick={() => !isLocked && navigate(`/lesson/${concept.id}`)}
                  className={`w-24 h-24 md:w-32 md:h-32 rounded-full bg-white dark:bg-slate-800 shadow-md border-[6px] ${nodeState} flex items-center justify-center relative z-30 transition-transform duration-300 hover:scale-105`}
                >
                  <Icon className="w-8 h-8" />
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
    </Shell>
  );
};

export default Chapters;
