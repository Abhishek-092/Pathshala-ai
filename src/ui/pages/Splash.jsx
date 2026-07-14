import React, { useState, useEffect } from "react";

const STATUSES = [
  "Checking WebGPU acceleration...",
  "Scanning local database...",
  "Initializing Gemma-2B-Local...",
  "Model ready! System booting..."
];

export default function Splash({ onComplete }) {
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIdx(prev => {
        if (prev < STATUSES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          onComplete();
          return prev;
        }
      });
    }, 700);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-container-max px-margin-mobile md:px-margin-desktop text-center min-h-[80vh]">
      <div className="relative mb-12 animate-float">
        <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full scale-150"></div>
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
          <div
            className="w-full h-full bg-contain bg-no-repeat bg-center"
            style={{
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFp5mFN3euV5aEHF40r9AYPbcvugSBoDP0dt09uyaxxKSuGziFfOzZTkwtP3yJrUx8ifjiIM-5CE1wHDt1nYWWG3KTCMZuY9QKPnrr0XO_Rv1VOyJtYskXCOcl3-MTOcsKe72Zoc-ghqhQERgkm2p5f5hnZbTNBdtf5BODgzIllpt6Y7aC1VYMcSt3g6dc8LgJ9vIvbdJGgrGjurhjL4PoVPfGv92vnaqUMbOvOcstsLlMN2IjdHsStQ')"
            }}
          />
          <div className="absolute top-0 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute bottom-10 right-1/4 w-4 h-4 bg-indigo-500/40 rounded-full animate-pulse opacity-40"></div>
        </div>
      </div>

      <div className="space-y-4 max-w-lg">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight font-headline">
            Pathshala <span className="font-extrabold text-slate-800 dark:text-white">AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-headline font-semibold">
            Learn Without Limits. <br />
            <span className="text-cyan-600 font-medium">Powered by On-Device AI.</span>
          </p>
        </div>

        <div className="pt-12 w-48 mx-auto">
          <div className="h-1 bg-slate-100 rounded-full overflow-hidden relative">
            <div className="h-full bg-primary absolute left-0 top-0 animate-pulse w-full"></div>
          </div>
          <p className="mt-4 text-xs text-slate-400 tracking-widest uppercase font-semibold">
            {STATUSES[statusIdx]}
          </p>
        </div>
      </div>
    </main>
  );
}
