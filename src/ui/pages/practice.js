import { router } from "../../core/router.js";
import { analyticsTracker } from "../../learning/analytics/tracker.js";
import { curriculumEngine } from "../../learning/curriculum/curriculumEngine.js";

export function practicePage(container) {
  const weakConcepts = analyticsTracker.getWeakConcepts();
  const activePackId = curriculumEngine.activePackId || "class10-science";

  container.innerHTML = `
    <div class="practice-screen">
      <div class="page-intro">
        <h2>Practice Arena</h2>
        <p>Boost your retention with on-device gamified sessions.</p>
      </div>

      <!-- Gamified stats banner -->
      <div class="practice-stats-banner">
        <div class="stat-bubble">
          <span class="label">Total XP</span>
          <span class="value">${analyticsTracker.totalXp}</span>
        </div>
        <div class="stat-bubble">
          <span class="label">Streak</span>
          <span class="value">🔥 ${analyticsTracker.streak} Days</span>
        </div>
        <div class="stat-bubble">
          <span class="label">Level</span>
          <span class="value">🎓 Lvl ${analyticsTracker.level}</span>
        </div>
      </div>

      <!-- Daily Challenge Card -->
      <div class="practice-card daily-challenge-card" id="btn-start-challenge">
        <div class="card-tag">⚡ DAILY CHALLENGE</div>
        <h3>Rapid Fire Recall</h3>
        <p>Solve 5 adaptive questions on your weak concepts to earn double XP (+50 XP).</p>
        <button class="primary-btn">Start Challenge</button>
      </div>

      <!-- Weak Concepts Review -->
      <div class="practice-card weak-concepts-card">
        <h3>🎯 Focus Areas (${weakConcepts.length})</h3>
        <p class="subtitle">Concepts flagged by the Learning Engine for quick revision.</p>
        
        <div class="weak-concepts-list">
          ${weakConcepts.length > 0 
            ? weakConcepts.map(cId => `
                <div class="weak-item-row">
                  <span>${cId.replace("-", " ")}</span>
                  <button class="tutor-btn-recall" data-id="${cId}">Recall with Tutor</button>
                </div>
              `).join("")
            : `<p style="font-size:12px; color:var(--text-secondary);">Fantastic job! You have no weak concepts currently. Keep it up!</p>`
          }
        </div>
      </div>

      <!-- Interactive Flashcard Deck -->
      <div class="practice-card flashcard-deck-card">
        <h3>📦 Memory Recall Flashcards</h3>
        <p class="subtitle">Flip cards to review key definitions from your installed packs.</p>
        
        <div class="flashcard-preview-box" id="btn-flashcard-sandbox">
          <div class="flashcard-inner">
            <div class="flashcard-front">
              <strong>Question</strong>
              <p>What is a chemical reaction?</p>
              <span class="tap-hint">Tap to flip</span>
            </div>
            <div class="flashcard-back">
              <strong>Answer</strong>
              <p>A process leading to the chemical transformation of one set of chemical substances to another.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Interaction handlers
  container.querySelector("#btn-start-challenge").addEventListener("click", () => {
    // Navigate to a randomized quiz checkpoint
    const targetConcept = weakConcepts[0] || "chem-reactions";
    router.navigate("quiz", { conceptId: targetConcept });
  });

  // Tutor recall triggers
  container.querySelectorAll(".tutor-btn-recall").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      router.navigate("aiTutor", { conceptId: id });
    });
  });

  // Flashcard flip simulation
  const fc = container.querySelector("#btn-flashcard-sandbox");
  if (fc) {
    fc.addEventListener("click", () => {
      fc.classList.toggle("flipped");
    });
  }
}
