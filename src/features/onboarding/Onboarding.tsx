import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black text-white px-8 pb-10 font-headline select-none">
      {/* Fullscreen Loop Background GIF */}
      <img
        src="/onboarding.gif"
        alt="Onboarding Background"
        className="absolute inset-0 h-full w-full object-cover z-0 opacity-40"
      />

      {/* Cinematic Top Navigation Header (Aligned to Shell's height & px spacing) */}
      <header className="relative z-10 flex justify-between items-center w-full px-10 h-16 bg-transparent">
        <span className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/home")}>
          <img src="/logo-dark.svg" className="h-14 w-auto" alt="Pathshala AI" />
          <span className="text-sm font-bold tracking-widest uppercase text-white/90 font-headline">
            Pathshala <span className="text-cyan-400 font-headline">AI</span>
          </span>
        </span>
        <nav className="flex gap-8 text-[11px] font-medium tracking-widest uppercase text-white/40">
          <span className="hover:text-white/80 transition-colors cursor-pointer" onClick={() => navigate("/home")}>Courses</span>
          <span className="hover:text-white/80 transition-colors cursor-pointer" onClick={() => navigate("/tutor")}>Tutor</span>
          <span className="hover:text-white/80 transition-colors cursor-pointer" onClick={() => navigate("/practice")}>Practice</span>
          <span className="hover:text-white/80 transition-colors cursor-pointer" onClick={() => navigate("/profile")}>Profile</span>
        </nav>
      </header>

      {/* Centered Cinematic Message */}
      <div className="absolute top-[18vh] left-1/2 -translate-x-1/2 z-10 max-w-4xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white/95 font-headline leading-tight whitespace-pre-line">
            Curate your library. <br />
            Download once. <br />
            Learn anywhere.
          </h1>
          <p className="text-white/40 text-sm md:text-base tracking-widest uppercase font-light mt-4">
            The next chapter is always within reach.
          </p>
        </motion.div>
      </div>

      {/* Action Button */}
      <div className="absolute top-[64vh] left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => navigate("/home")}
          className="bg-transparent hover:bg-white hover:text-black border border-white/20 text-white/90 px-12 py-4 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
        >
          Begin Journey
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
