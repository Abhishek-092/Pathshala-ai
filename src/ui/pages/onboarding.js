import { router } from "../../core/router.js";

const SLIDES = [
  {
    title: "Learn Anywhere",
    description: "No Internet Required. The entire syllabus, diagrams, and quizzes run completely from your device storage.",
    icon: "📡"
  },
  {
    title: "AI Personal Teacher",
    description: "Our on-device LLM model answers questions, creates personalized lessons, and explains complex formulas step-by-step.",
    icon: "🤖"
  },
  {
    title: "Download Learning Packs",
    description: "Install modular Knowledge Packs for school classes, programming courses, or competitive exams. Study anytime.",
    icon: "📦"
  }
];

export function onboardingPage(container) {
  let activeSlide = 0;

  function render() {
    const slide = SLIDES[activeSlide];
    container.innerHTML = `
      <div class="onboarding-screen">
        <div class="header-logo">
          <span>Pathshala AI</span>
        </div>

        <div class="slide-content">
          <div class="slide-emoji">${slide.icon}</div>
          <h2>${slide.title}</h2>
          <p>${slide.description}</p>
        </div>

        <div class="indicator-row">
          ${SLIDES.map((_, i) => `
            <span class="dot ${i === activeSlide ? "active" : ""}"></span>
          `).join("")}
        </div>

        <div class="button-footer">
          <button class="primary-btn" id="next-onboarding-btn">
            ${activeSlide === SLIDES.length - 1 ? "Get Started" : "Continue"}
          </button>
        </div>
      </div>
    `;

    container.querySelector("#next-onboarding-btn").addEventListener("click", () => {
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
