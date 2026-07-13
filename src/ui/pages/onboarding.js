import { router } from "../../core/router.js";

const SLIDES = [
  {
    title: "Learn Anywhere.",
    coloredTitle: "No Internet Required.",
    description: "Our edge AI technology processes lessons directly on your device. High-quality education even in the most remote corners of the world.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCf_3hdPUIHHyZxxFGjpZTP_TPRHcd7Aiwhyc6DNEdQG7RVj9w4-szUr-Mzu2Gi4Ma1Pt9DLbTh-2zPqE4RA90z4sjvJo-juAc4LPjLINOmzm57zq0jiUUly1fl3z21S8Ifmqs0gayTkjck8TguW1m9NHjbNC4SjIiQfO5mOkvEAPtSme16NPOOb83hTSMg8VXLYL7eVtlty-ZNf8taXZJAZrdQYUIbOj6CZVp-gp2ohy4-AnYZAAMXpQ",
    bgBlur: "bg-cyan-500/10"
  },
  {
    title: "Your Personal Teacher.",
    coloredTitle: "AI explains every concept.",
    description: "Interactive step-by-step tutoring that adapts to your pace. Pathshala AI doesn't just give answers; it builds deep understanding.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDViaHw1XS3E1A_5dKtPsZX4m8n21tAT9YQ79bI69rvHDlspl6EEZUoLj6bzVswfWQNKrsY3F6kz4wJV7irCioUPze6BHm0Oh-QDDXGWCSucYakUYaqiVZxTQb87xV4GFusNk46l_koNB-IR2PcIwUUYdfNcaT3YYjBVfj8GGcY48u_4K40WNZqSM4Yx3lvA3iVOeWkylVlz2MdCgey4nhV9ZpjTfy1uj3cPJ3o4OurCZeNQOCAWYjTtA",
    bgBlur: "bg-indigo-500/10"
  },
  {
    title: "Download Packs.",
    coloredTitle: "Study forever. Offline.",
    description: "Curate your library. Once downloaded, your courses and AI models belong to you. No subscription fatigue, just pure learning.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrPlj80GV6ZT3__n1qlbMmPdcyImpUWXY9fg0p_bj19lvHHb06VxIHo7QNp7U_oU1UhE-pz3ibwF8eEVImA1I6U1hvtDiUuW9X3e1lECi6gWSh1YQfOKnbm6OKpjaCOTdE3gQs4QNml6Rg2LYSYeknYrA0tdxHfAAS-h2bAHwwZmTnkV3yC8JTxBJ0tNqBUC-QrpYc6zZ-LNv_y84CynQHNHIxTACJW1CBtcpVC6xI3IlH95MZhD_9uw",
    bgBlur: "bg-emerald-500/10"
  }
];

export function onboardingPage(container) {
  let activeSlide = 0;

  function render() {
    const slide = SLIDES[activeSlide];
    container.innerHTML = `
      <div class="relative flex flex-col justify-center items-center py-12 min-h-[80vh]">
        
        <!-- Onboarding Slide content -->
        <div class="max-w-[1280px] w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="flex flex-col gap-6 text-center md:text-left">
            <h1 class="text-4xl md:text-6xl font-bold text-primary tracking-tight font-headline">
              ${slide.title} <br><span class="text-cyan-600 dark:text-cyan-400 font-headline">${slide.coloredTitle}</span>
            </h1>
            <p class="text-slate-500 dark:text-slate-400 text-lg max-w-xl">
              ${slide.description}
            </p>
          </div>
          <div class="flex justify-center items-center">
            <div class="relative w-full aspect-square max-w-md">
              <div class="absolute inset-0 ${slide.bgBlur} rounded-full blur-3xl"></div>
              <img class="relative z-10 w-full h-full object-contain animate-float" src="${slide.img}" alt="Onboarding illustration">
            </div>
          </div>
        </div>

        <!-- Indicators & Actions -->
        <div class="mt-16 w-full flex flex-col items-center gap-8">
          <!-- Indicators -->
          <div class="flex gap-3">
            ${SLIDES.map((_, idx) => `
              <div class="w-2.5 h-2.5 rounded-full ${idx === activeSlide ? "bg-primary w-6" : "bg-slate-200"} transition-all duration-300"></div>
            `).join("")}
          </div>
          <!-- CTA Button -->
          <button id="btn-next-slide" class="flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-full font-bold text-lg shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95">
            <span>${activeSlide === SLIDES.length - 1 ? "Begin Learning" : "Continue"}</span>
            <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>

      </div>
    `;

    container.querySelector("#btn-next-slide").addEventListener("click", () => {
      if (activeSlide < SLIDES.length - 1) {
        activeSlide++;
        render();
      } else {
        router.navigate("packSelection");
      }
    });
  }

  render();
}
