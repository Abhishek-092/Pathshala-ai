import { splashPage } from "../ui/pages/splash.js";
import { onboardingPage } from "../ui/pages/onboarding.js";
import { packSelectionPage } from "../ui/pages/packSelection.js";
import { dashboardPage } from "../ui/pages/dashboard.js";
import { subjectsPage } from "../ui/pages/subjects.js";
import { chaptersPage } from "../ui/pages/chapters.js";
import { aiTutorPage } from "../ui/pages/aiTutor.js";
import { lessonPage } from "../ui/pages/lesson.js";
import { quizPage } from "../ui/pages/quiz.js";
import { masteryPage } from "../ui/pages/mastery.js";
import { learningPathPage } from "../ui/pages/learningPath.js";
import { downloadsPage } from "../ui/pages/downloads.js";
import { parentPage } from "../ui/pages/parent.js";
import { teacherPage } from "../ui/pages/teacher.js";
import { profilePage } from "../ui/pages/profile.js";
import { practicePage } from "../ui/pages/practice.js";

class Router {
  constructor() {
    this.routes = {
      splash: splashPage,
      onboarding: onboardingPage,
      packSelection: packSelectionPage,
      dashboard: dashboardPage,
      subjects: subjectsPage,
      chapters: chaptersPage,
      aiTutor: aiTutorPage,
      lesson: lessonPage,
      quiz: quizPage,
      mastery: masteryPage,
      learningPath: learningPathPage,
      downloads: downloadsPage,
      parent: parentPage,
      teacher: teacherPage,
      profile: profilePage,
      practice: practicePage
    };
    this.currentPage = "splash";
  }

  async navigate(pageName, params = {}) {
    const pageRenderer = this.routes[pageName];
    if (!pageRenderer) {
      console.error(`Route "${pageName}" not found.`);
      return;
    }

    const container = document.getElementById("phone-screen-container");
    if (!container) return;

    // Apply fade-out
    container.style.opacity = 0;

    setTimeout(async () => {
      // Clear current container
      container.innerHTML = "";
      this.currentPage = pageName;
      
      // Render new page
      await pageRenderer(container, params);
      
      // Scroll to top
      container.scrollTop = 0;
      
      // Update screen header title
      const screenTitleEl = document.getElementById("header-screen-title");
      if (screenTitleEl) {
        screenTitleEl.textContent = pageName.charAt(0).toUpperCase() + pageName.slice(1).replace(/([A-Z])/g, " $1");
      }

      // Highlight active nav item
      this.updateActiveNavIcon(pageName);

      // Fade-in
      container.style.opacity = 1;
    }, 150);
  }

  updateActiveNavIcon(pageName) {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
      const route = item.getAttribute("data-route");
      if (route === pageName) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }
}

export const router = new Router();
