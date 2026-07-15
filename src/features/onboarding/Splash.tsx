import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const STATUSES = [
  "Checking WebGPU acceleration...",
  "Scanning local database...",
  "Initializing Gemma-2B-Local...",
  "Model ready! System booting..."
];

export const Splash: React.FC = () => {
  const [statusIdx, setStatusIdx] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIdx((prev) => {
        if (prev < STATUSES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          navigate("/onboarding");
          return prev;
        }
      });
    }, 700);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-500 px-6 text-center relative overflow-hidden select-none"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.25) 1.5px, transparent 1.5px)",
        backgroundSize: "32px 32px"
      }}
    >
      {/* Soft center white radial glow texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35)_0%,transparent_65%)] pointer-events-none z-0" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-12"
      >
        <div className="absolute inset-0 bg-indigo-500/10 blur-[100px] rounded-full scale-150" />
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
          <img src="/logo-light.svg" className="w-48 h-auto block dark:hidden object-contain" alt="Pathshala AI logo" />
          <img src="/logo-dark.svg" className="w-48 h-auto hidden dark:block object-contain" alt="Pathshala AI logo" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-4 max-w-lg"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 dark:text-indigo-400 tracking-tight font-headline">
          Pathshala <span className="text-slate-800 dark:text-white font-headline">AI</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-headline font-semibold">
          Learn Without Limits. <br />
          <span className="text-cyan-600 font-medium">Powered by On-Device AI.</span>
        </p>

        <div className="pt-12 w-48 mx-auto">
          <div className="h-1 bg-slate-100 dark:bg-slate-850 rounded-full overflow-hidden relative">
            <div className="h-full bg-indigo-600 absolute left-0 top-0 animate-pulse w-full" />
          </div>
          <p className="mt-4 text-xs text-slate-400 tracking-widest uppercase font-semibold">
            {STATUSES[statusIdx]}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Splash;
