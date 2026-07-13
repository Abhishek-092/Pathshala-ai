import { router } from "../../core/router.js";
import { analyticsTracker } from "../../learning/analytics/tracker.js";
import { curriculumEngine } from "../../learning/curriculum/curriculumEngine.js";
import { getStoreValue } from "../../storage/indexeddb/database.js";

export async function chaptersPage(container) {
  const packId = curriculumEngine.activePackId;
  const pack = await getStoreValue("packs", packId);

  if (!pack || !pack.concepts) {
    container.innerHTML = `
      <div class="error-screen">
        <p>No active package loaded. Please install a pack first.</p>
        <button class="primary-btn" id="btn-err-install">View Packs</button>
      </div>
    `;
    container.querySelector("#btn-err-install").addEventListener("click", () => router.navigate("packSelection"));
    return;
  }

  const concepts = pack.concepts;
  const progress = analyticsTracker.progress;

  container.innerHTML = `
    <div class="chapters-page">
      <div class="page-header">
        <h2>${pack.manifest.name}</h2>
        <p>Follow the learning timeline. Master concepts in sequence.</p>
      </div>

      <div class="timeline">
        ${concepts.map((concept, idx) => {
          const userProg = progress[concept.id];
          const isMastered = userProg && userProg.status === "Mastered";
          
          // Determine if locked (if any prereq is not Mastered)
          const prereqs = concept.prerequisites || [];
          const isLocked = !prereqs.every(pId => {
            const pProg = progress[pId];
            return pProg && pProg.status === "Mastered";
          });

          let statusClass = "locked";
          if (isMastered) statusClass = "completed";
          else if (!isLocked) statusClass = "current";

          return `
            <div class="timeline-item ${statusClass}" id="concept-${concept.id}">
              <div class="timeline-badge">${isMastered ? "✓" : idx + 1}</div>
              <div class="timeline-card">
                <div class="card-header">
                  <h4>${concept.name}</h4>
                  <span class="difficulty-lbl ${concept.difficulty.toLowerCase()}">${concept.difficulty}</span>
                </div>
                <p>${concept.summary}</p>
                <div class="card-footer">
                  <span>⏱️ ${concept.timeToComplete}</span>
                  ${isLocked 
                    ? `<span class="locked-lbl">🔒 Locked (Complete ${prereqs.join(", ")})</span>`
                    : isMastered 
                      ? `<span class="mastered-lbl">🎉 Mastered</span>`
                      : `<button class="primary-btn study-btn" data-id="${concept.id}">Study Concept</button>`
                  }
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;

  // Attach buttons
  container.querySelectorAll(".study-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      router.navigate("lesson", { conceptId: id });
    });
  });
}
