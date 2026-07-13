import { router } from "../../core/router.js";

export function splashPage(container) {
  container.innerHTML = `
    <!-- Splash Content Canvas -->
    <main class="relative z-10 flex flex-col items-center justify-center w-full max-w-container-max px-margin-mobile md:px-margin-desktop text-center min-h-[80vh]">
      <!-- Center-Aligned Glowing Constellation Illustration -->
      <div class="relative mb-12 animate-float">
        <!-- Glow background -->
        <div class="absolute inset-0 bg-primary/10 blur-[100px] rounded-full scale-150"></div>
        <!-- Main Illustration Component -->
        <div class="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
          <div class="w-full h-full bg-contain bg-no-repeat bg-center" data-alt="Glowing constellation" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFp5mFN3euV5aEHF40r9AYPbcvugSBoDP0dt09uyaxxKSuGziFfOzZTkwtP3yJrUx8ifjiIM-5CE1wHDt1nYWWG3KTCMZuY9QKPnrr0XO_Rv1VOyJtYskXCOcl3-MTOcsKe72Zoc-ghqhQERgkm2p5f5hnZbTNBdtf5BODgzIllpt6Y7aC1VYMcSt3g6dc8LgJ9vIvbdJGgrGjurhjL4PoVPfGv92vnaqUMbOvOcstsLlMN2IjdHsStQ')">
          </div>
          <!-- Floating Particle Accents -->
          <div class="absolute top-0 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
          <div class="absolute bottom-10 right-1/4 w-4 h-4 bg-indigo-500/40 rounded-full animate-pulse opacity-40"></div>
        </div>
      </div>

      <!-- Branding Section -->
      <div class="space-y-4 max-w-lg">
        <div class="flex flex-col items-center gap-2">
          <!-- Large Pathshala AI Logo -->
          <h1 class="text-4xl md:text-6xl font-bold text-primary tracking-tight font-headline">
            Pathshala <span class="font-extrabold text-slate-800 dark:text-white">AI</span>
          </h1>
          <!-- Tagline -->
          <p class="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-headline font-semibold">
            Learn Without Limits. <br>
            <span class="text-cyan-600 font-medium">Powered by On-Device AI.</span>
          </p>
        </div>
        
        <!-- Elegant Subtle Loading Animation -->
        <div class="pt-12 w-48 mx-auto">
          <div class="h-1 bg-slate-100 rounded-full overflow-hidden relative">
            <div class="h-full bg-primary absolute left-0 top-0 animate-pulse w-full"></div>
          </div>
          <p id="boot-status" class="mt-4 text-xs text-slate-400 tracking-widest uppercase font-semibold">Initializing Intelligence</p>
        </div>
      </div>
    </main>
  `;

  const statuses = [
    "Checking WebGPU acceleration...",
    "Scanning local database...",
    "Initializing Gemma-2B-Local...",
    "Model ready! System booting..."
  ];

  let step = 0;
  const interval = setInterval(() => {
    if (step < statuses.length) {
      const statusEl = container.querySelector("#boot-status");
      if (statusEl) statusEl.textContent = statuses[step];
      step++;
    } else {
      clearInterval(interval);
      router.navigate("onboarding");
    }
  }, 700);
}
