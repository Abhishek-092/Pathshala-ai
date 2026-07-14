import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SLIDES = [
  {
    title: "Learn Anywhere.",
    coloredTitle: "No Internet Required.",
    description: "Our edge AI technology processes lessons directly on your device. High-quality education even in the most remote corners of the world."
  },
  {
    title: "Your Personal Teacher.",
    coloredTitle: "AI explains every concept.",
    description: "Interactive step-by-step tutoring that adapts to your pace. Pathshala AI doesn't just give answers; it builds deep understanding."
  },
  {
    title: "Download Packs.",
    coloredTitle: "Study forever. Offline.",
    description: "Curate your library. Once downloaded, your courses and AI models belong to you. No subscription fatigue, just pure learning."
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
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black px-6">
      {/* Fullscreen Loop Background GIF */}
      <img
        src="/onboarding.gif"
        alt="Onboarding Background"
        className="absolute inset-0 h-full w-full object-cover z-0 opacity-40 mix-blend-screen"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/35 z-5" />

      {/* Premium Apple/Linear Glass Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-2xl w-full backdrop-blur-3xl bg-white/5 dark:bg-black/30 border border-white/10 dark:border-white/5 rounded-[32px] p-10 md:p-14 shadow-[0_32px_100px_rgba(0,0,0,0.6)] flex flex-col items-center gap-8"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-headline leading-tight">
              {slide.title} <br />
              <span className="text-cyan-400 font-headline">
                {slide.coloredTitle}
              </span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg max-w-lg leading-relaxed mt-2">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="w-full flex flex-col items-center gap-8 mt-4">
          {/* Slides Progress Indicator */}
          <div className="flex gap-2.5">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === activeSlide ? "bg-cyan-400 w-8" : "bg-white/20 hover:bg-white/40 w-2"
                }`}
              />
            ))}
          </div>

          {/* Premium Glass Action Button */}
          <button
            onClick={handleNext}
            className="group flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-black px-10 py-4.5 rounded-full font-bold text-base transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_35px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{activeSlide === SLIDES.length - 1 ? "Begin Learning" : "Continue"}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Onboarding;
