import { router } from "../../core/router.js";
import { packInstaller } from "../../knowledge/packs/installer.js";
import { curriculumEngine } from "../../learning/curriculum/curriculumEngine.js";

const PACK_CATALOG = [
  {
    id: "class10-science",
    name: "Class 10 General Science",
    description: "Curated physics, chemistry, biology with detailed concept maps.",
    size: "14.2 MB",
    storage: "1.8 GB",
    subjects: ["Physics", "Chemistry", "Biology"],
    installed: false
  },
  {
    id: "coding-python",
    name: "Programming in Python",
    description: "Learn syntax, control flow, loops, data structures, and algorithms.",
    size: "8.5 MB",
    storage: "1.2 GB",
    subjects: ["Core Syntax", "Data Structures", "Functions"],
    installed: false
  },
  {
    id: "class12-maths",
    name: "Class 12 Calculus & Algebra",
    description: "Advanced functions, matrices, integration, and vector geometry.",
    size: "22.4 MB",
    storage: "2.1 GB",
    subjects: ["Calculus", "Probability", "Linear Algebra"],
    installed: false
  },
  {
    id: "jee-prep",
    name: "JEE Advanced Mock Prep",
    description: "Competitive physics, chemistry, maths MCQ banks with deep insights.",
    size: "45.0 MB",
    storage: "3.5 GB",
    subjects: ["Competitive Physics", "Inorganic Chem", "Mock Papers"],
    installed: false
  }
];

export async function packSelectionPage(container) {
  // Sync installation statuses
  for (const pack of PACK_CATALOG) {
    pack.installed = await packInstaller.isInstalled(pack.id);
  }

  function render() {
    container.innerHTML = `
      <div class="pack-selection-page">
        <div class="page-intro">
          <h2>Select Learning Pack</h2>
          <p>Install offline curriculum models directly into your device.</p>
        </div>

        <div class="pack-grid">
          ${PACK_CATALOG.map(pack => `
            <div class="pack-card ${pack.installed ? "installed" : ""}" id="card-${pack.id}">
              <div class="pack-header">
                <h3>${pack.name}</h3>
                <span class="offline-tag">${pack.installed ? "✓ Installed" : "Offline Available"}</span>
              </div>
              <p>${pack.description}</p>
              <div class="pack-metadata">
                <div><span>📦 Size:</span> ${pack.size}</div>
                <div><span>💾 Storage:</span> ${pack.storage}</div>
              </div>
              <div class="subjects-pill">
                ${pack.subjects.map(s => `<span>${s}</span>`).join("")}
              </div>
              <div class="pack-action" id="action-container-${pack.id}">
                ${pack.installed 
                  ? `<button class="secondary-btn launch-btn" data-id="${pack.id}">Launch Operating System</button>`
                  : `<button class="primary-btn install-btn" data-id="${pack.id}">Download & Install Pack</button>`
                }
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    // Install handlers
    container.querySelectorAll(".install-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        startDownloadSimulation(id);
      });
    });

    // Launch handlers
    container.querySelectorAll(".launch-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        curriculumEngine.setActivePack(id);
        router.navigate("dashboard");
      });
    });
  }

  function startDownloadSimulation(packId) {
    const actionContainer = container.querySelector(`#action-container-${packId}`);
    if (!actionContainer) return;

    actionContainer.innerHTML = `
      <div class="download-progress-bar">
        <div class="progress-fill" style="width: 0%"></div>
        <span class="progress-pct">0%</span>
      </div>
    `;

    const progressFill = actionContainer.querySelector(".progress-fill");
    const progressPct = actionContainer.querySelector(".progress-pct");

    packInstaller.installPack(packId, (pct) => {
      progressFill.style.width = `${pct}%`;
      progressPct.textContent = `${pct}%`;

      if (pct >= 100) {
        setTimeout(() => {
          const pack = PACK_CATALOG.find(p => p.id === packId);
          if (pack) pack.installed = true;
          render();
        }, 300);
      }
    });
  }

  render();
}
