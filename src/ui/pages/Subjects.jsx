import React from "react";
import { analyticsTracker } from "../../learning/analytics/tracker.js";
import { curriculumEngine } from "../../learning/curriculum/curriculumEngine.js";

const CATALOG_DATA = [
  {
    id: "class10-science",
    name: "Class 10 General Science",
    category: "STEM",
    difficulty: "Intermediate",
    time: "12h 45m",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZr12_Yd6vqgSreWa7o0p6mitHxFf51Ry2NhbhAJXv6zmFRXnkTzRzK08yj6j_T5ilW6fnx1NviHS59Kwq_7W1nwT-qqf8aeRFUYhNKFEfa4huEZoVcvltD3Q87mcoNL4Z4vjhU9f5a4SE1iTzZRGIPXltQTOEa9lC3uoVbna_6a3HNoxVt-yjSAf7llHRmtfqYwbGhmp4A8tdl4IPssmNtrYkUECu5WvZZL9izyhk78-U0MpuYs-dHQ",
    colorGrad: "from-indigo-50 to-blue-50"
  },
  {
    id: "coding-python",
    name: "Programming in Python",
    category: "Computer Science",
    difficulty: "Intermediate",
    time: "8h 20m",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKWAzHViLpIph8goZzYcj62xWD757u86rljg4gLxSbk3TAm9P7nSVNtNoDGSH9N9I-JhvqtbkNp6Ew4vr2gGg7DQWX4SaXf1bH7fqH1jHali3zXgWE80QUamr5tVrjqo6mt2WL_ezPdpKClMrgw65R-xanrWju8DSSIXOBmO-chOvufaH7OSwjrE_mwJ_quJglyb4iH9UiHceVLOSYTaIQNjVQU6EjdcJNjMyrLmLHLZl13nz0_IFZSA",
    colorGrad: "from-purple-50 to-pink-50"
  }
];

export default function Subjects() {
  const progress = analyticsTracker.progress;

  const handleLaunch = (courseId) => {
    curriculumEngine.setActivePack(courseId);
    window.reactNavigate("chapters");
  };

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4 font-headline">What will you <span className="text-primary font-headline">master</span> today?</h1>
        <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
          <button className="px-6 py-2 bg-primary text-white rounded-full font-semibold whitespace-nowrap">All Courses</button>
          <button className="px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 rounded-full font-semibold whitespace-nowrap">STEM</button>
          <button className="px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 rounded-full font-semibold whitespace-nowrap">Computer Science</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CATALOG_DATA.map(course => {
          const isPython = course.id === "coding-python";
          const masteredCount = Object.keys(progress).filter(k => isPython ? k.startsWith("py-") && progress[k].status === "Mastered" : !k.startsWith("py-") && progress[k].status === "Mastered").length;
          const completionPct = Math.round((masteredCount / 5) * 100);

          return (
            <div key={course.id} className="bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 p-8 rounded-[24px] flex flex-col group hover:shadow-md transition-all duration-300">
              <div className={`relative h-48 mb-6 flex justify-center items-center overflow-hidden rounded-2xl bg-gradient-to-br ${course.colorGrad}`}>
                <div className="bob-animation relative z-10 w-32 h-32 flex items-center justify-center">
                  <img className="w-full h-full object-contain animate-float" src={course.img} alt={`${course.name} illustration`} />
                </div>
              </div>
              <div className="flex justify-between items-start mb-2">
                <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-bold uppercase tracking-wider">{course.difficulty}</span>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span>{course.time}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 font-headline">{course.name}</h3>
              
              <div className="mt-auto flex items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                  <div className="relative w-12 h-12">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle className="text-slate-100 dark:text-slate-700" cx="18" cy="18" fill="none" r="16" strokeWidth="3" stroke="currentColor" />
                      <circle className="text-primary" cx="18" cy="18" fill="none" r="16" stroke-dasharray="100" stroke-dashoffset={100 - completionPct} strokeLinecap="round" strokeWidth="3" stroke="currentColor" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-primary">{completionPct}%</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Progress</p>
                    <p className="text-xs font-bold text-slate-800 dark:text-white">{masteredCount} of 5 Chapters</p>
                  </div>
                </div>
                <button
                  onClick={() => handleLaunch(course.id)}
                  className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all flex items-center gap-2 active:scale-95"
                >
                  Start Journey
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
