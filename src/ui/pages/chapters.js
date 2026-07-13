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

  // Render Duolingo-style journey map
  container.innerHTML = `
    <div class="chapters-page">
      <div class="page-intro">
        <h2>${pack.manifest.name}</h2>
        <p>Your adaptive learning journey. Complete milestones to unlock new paths.</p>
      </div>

      <!-- Duolingo Journey Path Container -->
      <div class="duo-journey-container">
        <svg class="duo-connecting-path" viewBox="0 0 200 ${concepts.length * 150}" preserveAspectRatio="none">
          <!-- Curvy connecting line -->
          <path d="${buildCurvyPath(concepts.length)}" fill="none" stroke="#E2E8F0" stroke-width="6" stroke-linecap="round"/>
          <path d="${buildCurvyPath(concepts.length)}" fill="none" stroke="var(--primary-color)" stroke-width="6" stroke-linecap="round" stroke-dasharray="1000" stroke-dashoffset="1000" id="duo-active-path-fill"/>
        </svg>

        <div class="duo-nodes-list">
          ${concepts.map((concept, idx) => {
            const userProg = progress[concept.id];
            const isMastered = userProg && userProg.status === "Mastered";
            
            const prereqs = concept.prerequisites || [];
            const isLocked = !prereqs.every(pId => {
              const pProg = progress[pId];
              return pProg && pProg.status === "Mastered";
            });

            // Alternate positioning: Left, Center, Right, Center...
            const positions = ["left", "center", "right", "center"];
            const posClass = positions[idx % positions.length];

            let nodeState = "locked"; // locked is misty
            let badgeIcon = "🔒";
            if (isMastered) {
              nodeState = "completed"; // glows green
              badgeIcon = "⭐";
            } else if (!isLocked) {
              nodeState = "active"; // pulsing softly
              badgeIcon = "⚡";
            }

            return `
              <div class="duo-node-wrapper ${posClass}" style="margin-top: ${idx === 0 ? "20px" : "60px"};">
                <div class="duo-milestone-node ${nodeState}" id="node-${concept.id}" data-id="${concept.id}">
                  <span class="node-icon">${badgeIcon}</span>
                  <div class="duo-node-tooltip">
                    <h4>${concept.name}</h4>
                    <p>${isLocked ? `Locked (Complete ${prereqs.join(", ")})` : concept.summary}</p>
                    <span class="click-hint">${isLocked ? "Prerequisites Pending" : "Start Learning"}</span>
                  </div>
                </div>
                <div class="node-label-caption">${concept.name}</div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    </div>
  `;

  // Attach navigation triggers on click of nodes
  container.querySelectorAll(".duo-milestone-node").forEach(node => {
    node.addEventListener("click", (e) => {
      const targetNode = e.currentTarget;
      if (targetNode.classList.contains("locked")) {
        // Soft shake or alert for locked node
        targetNode.classList.add("shake-animation");
        setTimeout(() => targetNode.classList.remove("shake-animation"), 500);
        return;
      }
      const id = targetNode.getAttribute("data-id");
      router.navigate("lesson", { conceptId: id });
    });
  });
}

function buildCurvyPath(count) {
  // Generate a curvy path that matches left/center/right alternating layout
  let path = "M 100 0 ";
  for (let i = 0; i < count; i++) {
    const y = i * 150 + 75;
    const nextY = (i + 1) * 150 + 75;
    const x = [40, 100, 160, 100][i % 4];
    const nextX = [40, 100, 160, 100][(i + 1) % 4];
    
    if (i < count - 1) {
      path += `Q ${x} ${y + 75}, ${nextX} ${nextY} `;
    }
  }
  return path;
}
