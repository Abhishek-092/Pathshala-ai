import { router } from "../../core/router.js";
import { getStoreValue } from "../../storage/indexeddb/database.js";
import { curriculumEngine } from "../../learning/curriculum/curriculumEngine.js";

export async function lessonPage(container, params = {}) {
  const conceptId = params.conceptId || "chem-reactions";
  const pack = await getStoreValue("packs", curriculumEngine.activePackId || "class10-science");

  if (!pack || !pack.concepts) {
    container.innerHTML = `<p>Error loading lesson context.</p>`;
    return;
  }

  const concept = pack.concepts.find(c => c.id === conceptId);
  const mapping = await curriculumEngine.getCompetencyMapping(conceptId);

  container.innerHTML = `
    <div class="lesson-page">
      <div class="lesson-header">
        <span class="difficulty-lbl ${concept.difficulty.toLowerCase()}">${concept.difficulty} Level</span>
        <h2>${concept.name}</h2>
      </div>

      <!-- Learning Objectives -->
      <div class="objective-card">
        <h4>🎯 Competency & Learning Objectives</h4>
        <ul>
          ${mapping.learningOutcomes.map(out => `<li>${out}</li>`).join("")}
        </ul>
      </div>

      <!-- Content Area -->
      <div class="lesson-body-content">
        <div class="concept-definition">
          <strong>Definition:</strong> ${concept.summary}
        </div>
        
        <p style="margin-top: 15px; line-height: 1.6;">
          In this module, we explore the core structures of this concept. Our local intelligence engine recommends breaking this topic down into core experiments.
        </p>

        <!-- Dynamic Diagram SVG Mockup -->
        <div class="diagram-container">
          <svg viewBox="0 0 200 120" class="svg-diagram">
            <rect width="200" height="120" rx="12" fill="#F1F5F9" stroke="#CBD5E1"/>
            <circle cx="100" cy="60" r="30" fill="#E0E7FF" stroke="#4F46E5" stroke-width="2"/>
            <text x="100" y="65" font-size="12" font-weight="bold" fill="#4F46E5" text-anchor="middle">REACTION</text>
            <!-- Molecules diagram -->
            <circle cx="60" cy="60" r="10" fill="#06B6D4"/>
            <circle cx="140" cy="60" r="10" fill="#22C55E"/>
            <path d="M70 60 L130 60" stroke="#94A3B8" stroke-dasharray="4,4"/>
          </svg>
          <span class="caption">Figure 1.1: Core concept relationship map</span>
        </div>

        <div class="key-takeaways">
          <h4>💡 Key Takeaways</h4>
          <p>Always review prerequisites before tackling subsequent topics to ensure seamless concept mastery.</p>
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="lesson-action-footer">
        <button class="secondary-btn" id="btn-lesson-tutor">💬 Ask AI Tutor</button>
        <button class="primary-btn" id="btn-lesson-quiz">✍️ Take Checkpoint Quiz</button>
      </div>
    </div>
  `;

  container.querySelector("#btn-lesson-tutor").addEventListener("click", () => {
    router.navigate("aiTutor", { conceptId });
  });

  container.querySelector("#btn-lesson-quiz").addEventListener("click", () => {
    router.navigate("quiz", { conceptId });
  });
}
