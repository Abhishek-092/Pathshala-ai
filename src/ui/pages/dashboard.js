import { router } from "../../core/router.js";
import { analyticsTracker } from "../../learning/analytics/tracker.js";
import { modelManager } from "../../ai/modelManager.js";
import { curriculumEngine } from "../../learning/curriculum/curriculumEngine.js";

export async function dashboardPage(container) {
  const activeModel = modelManager.getActiveModel();
  
  // Calculate recommended next lesson
  const recommended = await curriculumEngine.getNextRecommendedTopic(analyticsTracker.progress) || {
    id: "chem-reactions",
    name: "Chemical Reactions"
  };

  const weakCount = analyticsTracker.getWeakConcepts().length;
  const masteredCount = analyticsTracker.getMasteredConcepts().length;

  container.innerHTML = `
    <div class="dashboard-page">
      <!-- Top Greeting -->
      <div class="dash-header">
        <div class="greeting-section">
          <h2>Good Morning, Rahul 👋</h2>
          <p class="dash-pack-indicator">Active: ${curriculumEngine.activePackId === "class10-science" ? "Class 10 Science" : "Python Programming"}</p>
        </div>
        <div class="streak-badge">
          <span>🔥</span> ${analyticsTracker.streak} Day Streak
        </div>
      </div>

      <!-- Overview Grid -->
      <div class="metrics-grid">
        <div class="metric-card progress-ring-card">
          <div class="ring-container">
            <svg class="progress-ring" width="80" height="80">
              <circle class="progress-ring-bg" stroke="#E2E8F0" stroke-width="8" fill="transparent" r="32" cx="40" cy="40"/>
              <circle class="progress-ring-bar" stroke="#4F46E5" stroke-width="8" fill="transparent" r="32" cx="40" cy="40" 
                style="stroke-dasharray: 201; stroke-dashoffset: ${201 - (201 * (masteredCount / 5))};"/>
            </svg>
            <div class="ring-label">${Math.round((masteredCount / 5) * 100)}%</div>
          </div>
          <div class="ring-text">
            <h4>Today's Goal</h4>
            <p>${masteredCount}/5 Concepts Mastered</p>
          </div>
        </div>

        <div class="metric-card status-widget-card">
          <h4>🤖 AI Status</h4>
          <span class="status-badge green">Runs On-Device</span>
          <p class="model-name">${activeModel.name}</p>
          <div class="telemetry-bar">
            <span>RAM: ${activeModel.ramRequired}</span>
            <span>Speed: ~18 t/s</span>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="dashboard-section">
        <h3>Quick Actions</h3>
        <div class="quick-actions-row">
          <button class="action-btn" id="btn-quick-ai">💬 Ask AI Tutor</button>
          <button class="action-btn" id="btn-quick-quiz">✍️ Practice Quiz</button>
          <button class="action-btn" id="btn-quick-planner">📅 Study Plan</button>
        </div>
      </div>

      <!-- Continue Learning / Recommendation -->
      <div class="dashboard-section">
        <h3>Continue Learning</h3>
        <div class="continue-card" id="btn-continue-concept">
          <div class="continue-content">
            <span class="tag">Next Recommended</span>
            <h4>${recommended.name}</h4>
            <p>Master prerequisites to unlock final assessment tests.</p>
          </div>
          <div class="continue-arrow">➔</div>
        </div>
      </div>

      <!-- Analytics Insights -->
      <div class="dashboard-section analytics-summary">
        <h3>Knowledge Growth</h3>
        <div class="insights-row">
          <div class="insight-block red">
            <span class="count">${weakCount}</span>
            <span class="lbl">Weak Concepts</span>
          </div>
          <div class="insight-block green">
            <span class="count">${masteredCount}</span>
            <span class="lbl">Mastered</span>
          </div>
          <div class="insight-block blue">
            <span class="count">${analyticsTracker.totalXp}</span>
            <span class="lbl">Total XP</span>
          </div>
        </div>
      </div>

      <!-- Achievements -->
      <div class="dashboard-section">
        <h3>Recent Achievements</h3>
        <div class="achievements-list">
          <div class="achievement-item">
            <div class="badge-icon">🛡️</div>
            <div>
              <h4>Offline Pioneer</h4>
              <p>Downloaded first curriculum pack.</p>
            </div>
          </div>
          <div class="achievement-item">
            <div class="badge-icon">🔥</div>
            <div>
              <h4>Daily Learner</h4>
              <p>Maintained a learning streak offline.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Interaction handlers
  container.querySelector("#btn-quick-ai").addEventListener("click", () => router.navigate("aiTutor"));
  container.querySelector("#btn-quick-quiz").addEventListener("click", () => router.navigate("quiz", { conceptId: recommended.id }));
  container.querySelector("#btn-quick-planner").addEventListener("click", () => router.navigate("mastery")); // Planner is in Mastery screen
  container.querySelector("#btn-continue-concept").addEventListener("click", () => router.navigate("lesson", { conceptId: recommended.id }));
}
