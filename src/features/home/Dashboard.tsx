import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, CheckSquare, Compass, HardDrive } from "lucide-react";
import { Shell } from "../../components/layout/Shell";
import { useUserStore } from "../../store/userStore";
import { modelManager } from "../../modules/ai/ModelManager";
import { curriculumEngine } from "../../modules/curriculum/curriculumEngine";
import { analyticsEngine } from "../../modules/analytics/analyticsEngine";

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { xp, streak, name } = useUserStore();
  const [activeModel, setActiveModel] = useState({ name: "Loading...", ramRequired: "..." });
  const [recommended, setRecommended] = useState({ id: "chem-reactions", name: "Chemical Reactions", summary: "..." });
  const [masteredCount, setMasteredCount] = useState(0);
  const [stats, setStats] = useState({ totalTimeSpent: 0, totalQuizzesTaken: 0 });

  useEffect(() => {
    async function load() {
      setActiveModel(modelManager.getActiveModel());
      const rec = await curriculumEngine.getNextRecommendedTopic({}) || {
        id: "chem-reactions",
        name: "Chemical Reactions and Equations",
        summary: "Introduction to chemical formulas, writing equations, and balancing chemical reactions."
      };
      setRecommended(rec);
      setMasteredCount(2); // Mocked progress
      const currentStats = await analyticsEngine.getCompletionStats();
      setStats(currentStats);
    }
    load();
  }, []);

  const completionPct = Math.round((masteredCount / 5) * 100);

  return (
    <Shell>
      <div className="pb-20">
        <div className="mb-8">
          <p className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-1">Welcome back</p>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white font-headline">Good Morning, {name.split(" ")[0]}.</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg mt-2">You're on a {streak}-day streak! Ready to expand your horizons today?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Continue Learning Card */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-[32px] bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 -mr-20 -mt-20 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-xs font-bold">RECOMMENDED TOPIC</span>
                <span className="text-slate-400 text-xs">{completionPct}% Curriculum Mastered</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 font-headline">{recommended.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 max-w-xl">{recommended.summary}</p>
              <div className="flex items-center gap-6 mb-4">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle className="text-slate-100 dark:text-slate-700" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="6" />
                    <circle className="text-indigo-600 dark:text-indigo-400" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeDasharray="176" strokeDashoffset={176 - (176 * completionPct) / 100} strokeWidth="6" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-bold text-xs text-indigo-600 dark:text-indigo-400">{completionPct}%</span>
                </div>
                <button
                  onClick={() => navigate(`/lesson/${recommended.id}`)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all"
                >
                  Resume Learning
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Info */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-[32px] p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Local AI Engine</h4>
                <span className="bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full text-[10px] font-bold">ON-DEVICE</span>
              </div>
              <p className="font-bold text-slate-800 dark:text-white mb-2 font-headline">{activeModel.name}</p>
              <div className="flex justify-between text-xs text-slate-500 border-t border-slate-100 dark:border-slate-700 pt-3 mt-3">
                <span>RAM: {activeModel.ramRequired}</span>
                <span>Speed: ~18 t/s</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-[32px] p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Weekly Streak</h4>
                <span className="text-indigo-600 font-bold text-xs">🔥 {streak} Days</span>
              </div>
              <div className="flex justify-between gap-1">
                {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5 flex-1">
                    <span className="text-[10px] text-slate-400">{day}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${idx < streak ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-400"}`}>
                      {idx < streak ? "✓" : "•"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <button onClick={() => navigate("/tutor")} className="flex flex-col items-start p-6 bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-3xl hover:border-indigo-600/30 transition-all text-left">
            <MessageSquare className="w-6 h-6 text-indigo-600 mb-2" />
            <strong className="text-slate-800 dark:text-white text-sm">Ask AI Tutor</strong>
            <span className="text-slate-400 text-xs mt-1">Get instant local answers</span>
          </button>
          <button onClick={() => navigate("/practice")} className="flex flex-col items-start p-6 bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-3xl hover:border-indigo-600/30 transition-all text-left">
            <CheckSquare className="w-6 h-6 text-emerald-600 mb-2" />
            <strong className="text-slate-800 dark:text-white text-sm">Practice Quiz</strong>
            <span className="text-slate-400 text-xs mt-1">Strengthen recall knowledge</span>
          </button>
          <button onClick={() => navigate("/learn")} className="flex flex-col items-start p-6 bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-3xl hover:border-indigo-600/30 transition-all text-left">
            <Compass className="w-6 h-6 text-cyan-600 mb-2" />
            <strong className="text-slate-800 dark:text-white text-sm">Learning Path</strong>
            <span className="text-slate-400 text-xs mt-1">See your milestones</span>
          </button>
          <button onClick={() => navigate("/profile")} className="flex flex-col items-start p-6 bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-3xl hover:border-indigo-600/30 transition-all text-left">
            <HardDrive className="w-6 h-6 text-amber-600 mb-2" />
            <strong className="text-slate-800 dark:text-white text-sm">Offline Storage</strong>
            <span className="text-slate-400 text-xs mt-1">Manage downloaded packs</span>
          </button>
        </div>
      </div>
    </Shell>
  );
};

export default Dashboard;
