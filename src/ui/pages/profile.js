import { analyticsTracker } from "../../learning/analytics/tracker.js";
import { modelManager } from "../../ai/modelManager.js";
import { accessibilityManager } from "../components/accessibility.js";
import { router } from "../../core/router.js";

export function profilePage(container) {
  const models = modelManager.getAvailableModels();
  const activeModel = modelManager.getActiveModel();

  function render() {
    container.innerHTML = `
      <div class="profile-page">
        <!-- Profile Banner -->
        <div class="profile-banner">
          <div class="profile-avatar">👨‍🎓</div>
          <h3>Rahul Kumar</h3>
          <p>Level ${analyticsTracker.level} Scholar</p>
          <div class="xp-progress-bar-container">
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${analyticsTracker.totalXp % 100}%"></div>
            </div>
            <span>${analyticsTracker.totalXp} XP Total</span>
          </div>
        </div>

        <!-- Settings Section -->
        <div class="profile-section">
          <h3>⚙️ Operating System Settings</h3>
          
          <!-- Accessibility options -->
          <div class="setting-row">
            <div>
              <strong>Dyslexia-Friendly Font</strong>
              <p class="subtitle">Use highly readable Outfit/Dyslexia fonts.</p>
            </div>
            <input type="checkbox" id="check-dyslexic" ${accessibilityManager.dyslexiaFont ? "checked" : ""} />
          </div>

          <div class="setting-row">
            <div>
              <strong>High Contrast Mode</strong>
              <p class="subtitle">Elevates accessibility visibility ratios.</p>
            </div>
            <input type="checkbox" id="check-contrast" ${accessibilityManager.highContrast ? "checked" : ""} />
          </div>

          <div class="setting-row font-scale-control">
            <label>Text Scale: <strong id="lbl-scale">${accessibilityManager.fontSizeScale}x</strong></label>
            <input type="range" id="slider-scale" min="0.8" max="1.5" step="0.1" value="${accessibilityManager.fontSizeScale}" style="width:100%;" />
          </div>

          <!-- Model selection option -->
          <div class="setting-row select-model-row" style="flex-direction:column; align-items:flex-start;">
            <strong>Select Active Local LLM Model</strong>
            <p class="subtitle" style="margin-bottom:10px;">Select from downloaded models. Running on-device.</p>
            <select id="select-active-llm" class="text-input" style="width:100%;">
              ${models.map(m => `
                <option value="${m.id}" ${m.id === activeModel.id ? "selected" : ""}>
                  ${m.name} (${m.ramRequired} RAM required)
                </option>
              `).join("")}
            </select>
          </div>
        </div>

        <!-- Clear state button -->
        <button class="secondary-btn" id="btn-clear-database" style="margin-top:30px; border-color:#EF4444; color:#EF4444; width:100%;">⚠️ Clear Offline Storage</button>
      </div>
    `;

    // Hook listeners
    container.querySelector("#check-dyslexic").addEventListener("change", (e) => {
      accessibilityManager.setDyslexiaFont(e.target.checked);
    });

    container.querySelector("#check-contrast").addEventListener("change", (e) => {
      accessibilityManager.setHighContrast(e.target.checked);
    });

    container.querySelector("#slider-scale").addEventListener("input", (e) => {
      accessibilityManager.setFontSizeScale(e.target.value);
      container.querySelector("#lbl-scale").textContent = `${e.target.value}x`;
    });

    container.querySelector("#select-active-llm").addEventListener("change", (e) => {
      modelManager.selectModel(e.target.value);
    });

    container.querySelector("#btn-clear-database").addEventListener("click", async () => {
      const confirmClear = confirm("Are you sure you want to reset all offline learning progress, downloaded packs, and chatbot threads?");
      if (confirmClear) {
        const { initDB } = await import("../../storage/indexeddb/database.js");
        const db = await initDB();
        
        // Clear stores
        const tx = db.transaction(["packs", "chats", "progress", "settings"], "readwrite");
        tx.objectStore("packs").clear();
        tx.objectStore("chats").clear();
        tx.objectStore("progress").clear();
        tx.objectStore("settings").clear();
        
        alert("Offline storage cleared. Reloading platform...");
        window.location.reload();
      }
    });
  }

  render();
}
