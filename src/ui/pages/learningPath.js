import { router } from "../../core/router.js";
import { analyticsTracker } from "../../learning/analytics/tracker.js";
import { curriculumEngine } from "../../learning/curriculum/curriculumEngine.js";
import { getStoreValue } from "../../storage/indexeddb/database.js";

export async function learningPathPage(container) {
  const packId = curriculumEngine.activePackId || "class10-science";
  const pack = await getStoreValue("packs", packId);
  const progress = analyticsTracker.progress;

  if (!pack || !pack.concepts) {
    container.innerHTML = `<p>Connect a knowledge pack first.</p>`;
    return;
  }

  const recommended = await curriculumEngine.getNextRecommendedTopic(progress) || pack.concepts[0];

  // Derive prerequisites
  const prereqs = await curriculumEngine.getPrerequisitesStatus(recommended.id, progress);

  container.innerHTML = `
    <div class="learning-path-page">
      <div class="page-header">
        <h2>AI Adaptive Learning Path</h2>
        <p>Your custom study trajectory derived by the local curriculum engine.</p>
      </div>

      <div class="flowchart-timeline">
        <!-- Node 1: Completed Prerequisites -->
        <div class="flow-card completed">
          <div class="flow-icon">✓</div>
          <div class="flow-body">
            <h4>Prerequisite Topics</h4>
            <p>${prereqs.length > 0 ? prereqs.map(p => `${p.name} (${p.met ? "Met" : "Pending"})`).join(", ") : "None required for current lesson"}</p>
          </div>
        </div>

        <div class="flow-arrow">↓</div>

        <!-- Node 2: Active Current Lesson -->
        <div class="flow-card active">
          <div class="flow-icon">⚡</div>
          <div class="flow-body">
            <h4>Current Active Topic</h4>
            <h3>${recommended.name}</h3>
            <p>${recommended.summary}</p>
            <button class="primary-btn" id="btn-flow-launch">Start Lesson Now</button>
          </div>
        </div>

        <div class="flow-arrow">↓</div>

        <!-- Node 3: Next Recommended -->
        <div class="flow-card upcoming">
          <div class="flow-icon">➔</div>
          <div class="flow-body">
            <h4>Next Recommended</h4>
            <p>System will auto-recommend subsequent chapters based on validation performance.</p>
          </div>
        </div>
      </div>
    </div>
  `;

  container.querySelector("#btn-flow-launch").addEventListener("click", () => {
    router.navigate("lesson", { conceptId: recommended.id });
  });
}
