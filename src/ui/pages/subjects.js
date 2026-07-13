import { router } from "../../core/router.js";
import { curriculumEngine } from "../../learning/curriculum/curriculumEngine.js";

const SUBJECTS_DATA = [
  {
    id: "science",
    name: "General Science",
    completion: 60,
    time: "4.5 hours",
    difficulty: "Medium",
    aiAvailable: true
  },
  {
    id: "maths",
    name: "Mathematics",
    completion: 10,
    time: "6 hours",
    difficulty: "Hard",
    aiAvailable: true
  },
  {
    id: "english",
    name: "English Literature",
    completion: 80,
    time: "2 hours",
    difficulty: "Easy",
    aiAvailable: true
  },
  {
    id: "computer-science",
    name: "Computer Science",
    completion: 40,
    time: "3.5 hours",
    difficulty: "Hard",
    aiAvailable: true
  }
];

export function subjectsPage(container) {
  container.innerHTML = `
    <div class="subjects-page">
      <div class="page-header">
        <h2>Subject Index</h2>
        <p>Offline learning modules with dedicated Local SLMs.</p>
      </div>

      <div class="subjects-grid">
        ${SUBJECTS_DATA.map(sub => `
          <div class="subject-card" id="btn-subject-${sub.id}">
            <div class="subj-badge-row">
              <span class="difficulty-lbl ${sub.difficulty.toLowerCase()}">${sub.difficulty}</span>
              ${sub.aiAvailable ? `<span class="ai-badge">🤖 Local AI</span>` : ""}
            </div>
            <h3>${sub.name}</h3>
            
            <div class="subj-progress-container">
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${sub.completion}%"></div>
              </div>
              <div class="progress-labels">
                <span>${sub.completion}% Complete</span>
                <span>${sub.time}</span>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  // Attach handlers
  SUBJECTS_DATA.forEach(sub => {
    const card = container.querySelector(`#btn-subject-${sub.id}`);
    if (card) {
      card.addEventListener("click", () => {
        // Class 10 Science & Coding maps to subjects
        if (sub.id === "computer-science") {
          curriculumEngine.setActivePack("coding-python");
        } else {
          curriculumEngine.setActivePack("class10-science");
        }
        router.navigate("chapters");
      });
    }
  });
}
