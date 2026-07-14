import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Target, Lightbulb, Compass } from "lucide-react";
import { Shell } from "../../components/layout/Shell";
import { db } from "../../services/storage/db";
import { curriculumEngine } from "../../modules/curriculum/curriculumEngine";

export const Lesson: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [concept, setConcept] = useState<any>(null);
  const [mapping, setMapping] = useState<any>({ learningOutcomes: [] });
  const [loading, setLoading] = useState(true);

  const conceptId = lessonId || "chem-reactions";

  useEffect(() => {
    async function loadLesson() {
      const packId = curriculumEngine.activePackId || "class10-science";
      const pack = await db.packs.get(packId);
      if (pack && pack.concepts) {
        const found = pack.concepts.find(c => c.id === conceptId);
        setConcept(found);
      } else {
        // Fallback mock details if offline IndexedDB store is currently empty
        setConcept({
          id: conceptId,
          name: conceptId.replace("-", " ").toUpperCase(),
          summary: "This core curriculum concept covers the fundamental molecular definitions, reactions, structures, and properties necessary to master this unit."
        });
      }
      const cm = await curriculumEngine.getCompetencyMapping(conceptId);
      setMapping(cm);
      setLoading(false);
    }
    loadLesson();
  }, [conceptId]);

  if (loading) {
    return (
      <Shell>
        <div className="text-center py-12 text-slate-500">Loading Lesson Content...</div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="pb-32 max-w-[1280px] mx-auto">
        <section className="mb-12 relative h-80 rounded-[32px] overflow-hidden group shadow-md border border-slate-200/40">
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/30 to-transparent z-10" />
          <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbqNGu3ploCa1lc-WuPcV2rTh4GJfm2Z56ovbIjVrGfjROPeJloO99b_1AhBDaC6vTA8RmSvoble9d1m1fk35sqIb6u3RUNSpQ81dqtYimg6lodbbfJ13MyyJ16UxLSqXF8POg8aTcgTMVxWpStFuV95pazCqqg2-OhoPMYWCJy9QdZRQk8dztn_On4__tLNFlYzjD-sDS4rJbUA_58QnEYHlpVXiZaUhe3v7CTKDOGNSW8ISK9_kczg" alt="Lesson banner" />
          <div className="absolute bottom-8 left-8 z-20">
            <span className="px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-bold rounded-full mb-3 inline-block uppercase tracking-wider">UNIT CONCEPT</span>
            <h1 className="text-3xl font-bold text-white font-headline drop-shadow-sm">{concept.name}</h1>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0 text-indigo-600">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white font-headline mb-2">Learning Objectives</h2>
              <ul className="text-slate-500 dark:text-slate-400 text-sm list-disc pl-5 leading-relaxed space-y-1">
                {mapping.learningOutcomes.map((out: string, idx: number) => <li key={idx}>{out}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12 p-8 bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-[24px] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2 font-headline">
            <Lightbulb className="w-5 h-5 text-indigo-600" />
            Core Concept
          </h3>
          <div className="space-y-4 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            <p className="font-semibold text-slate-700 dark:text-slate-300">{concept.summary}</p>
            <p>This biological/scientific mechanism forms the basis of curriculum mastery. Follow the interactive diagram model below to study it structurally.</p>
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-[32px] p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Interactive 3D Diagram Model</h4>
            </div>
            
            <div className="aspect-video bg-slate-900 rounded-2xl relative overflow-hidden flex items-center justify-center">
              <div className="z-20 text-center animate-float">
                <img className="w-48 h-48 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDglFyTsUKy-E_FfsW7PF1jYcAdl8RZCt8vfDVoCZzJ2SpDww3vHRmAt6n2AsOiJDZN4_EsEGC7v1f7PUvW1Q_kXGJ3Zg41J4LtwCZXiJ7eHHH_SRJIEQ0LQvp60k3rqmJ2cMlfAEF31HD6Jkvhlz3Lr-25gMAnnB3hdij4fp2UZ3RIek4FOYfqULwKCpRK0CdNKBTd06wBUCsp66bYoRiu6sJO3vY8ZHJXY8g4uFVu1FFx11Akm_vlCw" alt="Neuron structure" />
              </div>
              <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] text-white/80 uppercase font-bold tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Live Rendering
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-between items-center mt-12 gap-4">
          <button onClick={() => navigate(`/tutor?conceptId=${conceptId}`)} className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-bold rounded-2xl transition-all">💬 Ask AI Tutor</button>
          <button onClick={() => navigate(`/practice/quiz/${conceptId}`)} className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all">✍️ Start Assessment</button>
        </div>
      </div>
    </Shell>
  );
};

export default Lesson;
