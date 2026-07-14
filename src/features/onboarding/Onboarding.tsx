import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  {
    title: "Build your future,\none deliberate step\nat a time.",
    description: "Everything you need to learn. Nothing you don't."
  },
  {
    title: "Your personal tutor,\nalways by your side,\ncompletely offline.",
    description: "Interactive on-device AI explanations built for deep understanding."
  },
  {
    title: "Curate your library,\ndownload once,\nstudy forever.",
    description: "Your courses and AI models belong to you. No internet required."
  }
];

export const Onboarding: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();
  const slide = SLIDES[activeSlide];

  const handleNext = () => {
    if (activeSlide < SLIDES.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black text-white px-8 py-10 font-headline select-none">
      <img
        src="/onboarding.gif"
        alt="Onboarding Background"
        className="absolute inset-0 h-full w-full object-cover z-0 opacity-40"
      />

      {/* Cinematic Top Navigation Header */}
      <header className="relative z-10 flex justify-between items-center w-full px-12 h-16 bg-transparent">
        <span className="text-sm font-bold tracking-widest uppercase text-white/90 cursor-pointer" onClick={() => navigate("/home")}>
          Pathshala <span className="text-cyan-400">AI</span>
        </span>
        <nav className="flex gap-8 text-[11px] font-medium tracking-widest uppercase text-white/40">
          <span className="hover:text-white/80 transition-colors cursor-pointer" onClick={() => navigate("/home")}>Courses</span>
          <span className="hover:text-white/80 transition-colors cursor-pointer" onClick={() => navigate("/tutor")}>Tutor</span>
          <span className="hover:text-white/80 transition-colors cursor-pointer" onClick={() => navigate("/practice")}>Practice</span>
          <span className="hover:text-white/80 transition-colors cursor-pointer" onClick={() => navigate("/profile")}>Profile</span>
        </nav>
      </header>

      {/* Centered Cinematic Message (Lots of space) */}
      <div className="relative z-10 my-auto max-w-4xl w-full mx-auto flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white/95 font-headline leading-tight whitespace-pre-line">
              {slide.title}
            </h1>
            <p className="text-white/40 text-sm md:text-base tracking-widest uppercase font-light mt-4">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Actions Footer */}
      <footer className="relative z-10 flex flex-col items-center gap-8 max-w-6xl w-full mx-auto">
        {/* Slides Dot Progress Indicator */}
        <div className="flex gap-3">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-1 rounded-full transition-all duration-700 ${
                idx === activeSlide ? "bg-cyan-400 w-10" : "bg-white/10 w-3"
              }`}
            />
          ))}
        </div>

        {/* Cinematic Button */}
        <button
          onClick={handleNext}
          className="bg-transparent hover:bg-white hover:text-black border border-white/20 text-white/90 px-12 py-4 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
        >
          {activeSlide === SLIDES.length - 1 ? "Begin Journey" : "Continue"}
        </button>
      </footer>
    </div>
  );
};

export default Onboarding;
