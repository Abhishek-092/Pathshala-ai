import React from "react";
import { useNavigate } from "react-router-dom";

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/home");
  };

  return (
    <div className="cinematic-theme relative min-h-screen w-full overflow-hidden flex flex-col justify-between z-10">
      {/* Background Video / Gif */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-20"
      >
        <source src="onboarding.gif" type="image/gif" />
        <img
          src="onboarding.gif"
          className="absolute inset-0 w-full h-full object-cover"
          alt="onboarding animation background"
        />
      </video>

      {/* Glassmorphic Navigation Bar */}
      <nav className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between px-8 py-6">
        <div 
          className="text-3xl tracking-tight text-white cursor-pointer"
          style={{ fontFamily: "'Instrument Serif', serif" }}
          onClick={handleStart}
        >
          Velorah<sup className="text-xs font-sans">®</sup>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <span className="text-sm font-medium text-white cursor-pointer transition-colors">Home</span>
          <span className="text-sm font-medium text-slate-400 hover:text-white cursor-pointer transition-colors">Studio</span>
          <span className="text-sm font-medium text-slate-400 hover:text-white cursor-pointer transition-colors">About</span>
          <span className="text-sm font-medium text-slate-400 hover:text-white cursor-pointer transition-colors">Journal</span>
          <span className="text-sm font-medium text-slate-400 hover:text-white cursor-pointer transition-colors">Reach Us</span>
        </div>

        <button
          onClick={handleStart}
          className="liquid-glass rounded-full px-6 py-2.5 text-sm text-white font-medium hover:scale-[1.03] transition-all duration-300"
        >
          Begin Journey
        </button>
      </nav>

      {/* Cinematic Hero Section */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40">
        <h1
          className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-white animate-fade-rise"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Where <em className="not-italic text-slate-450 text-slate-400">dreams</em> rise <br />
          <em className="not-italic text-slate-450 text-slate-400">through the silence.</em>
        </h1>

        <p className="animate-fade-rise-delay text-slate-400 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-sans">
          We're designing tools for deep thinkers, bold creators, and quiet rebels.
          Amid the chaos, we build digital spaces for sharp focus and inspired work.
        </p>

        <button
          onClick={handleStart}
          className="animate-fade-rise-delay-2 liquid-glass rounded-full px-14 py-5 text-base text-white mt-12 hover:scale-[1.03] cursor-pointer transition-all duration-300 font-semibold"
        >
          Begin Journey
        </button>
      </div>

      {/* Footer info (adds visual anchor) */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-8 py-6 flex justify-between text-[10px] text-slate-500 tracking-wider uppercase font-semibold">
        <span>© 2026 Velorah Studio</span>
        <span>All Rights Reserved</span>
      </footer>
    </div>
  );
};

export default Onboarding;
