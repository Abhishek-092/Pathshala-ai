import { packInstaller } from "../../knowledge/packs/installer.js";
import { getStoreValue, deleteStoreValue } from "../../storage/indexeddb/database.js";
import { router } from "../../core/router.js";

export async function downloadsPage(container) {
  const isScience = await packInstaller.isInstalled("class10-science");
  const isPython = await packInstaller.isInstalled("coding-python");

  function render() {
    container.innerHTML = `
      <div class="downloads-page">
        <div class="page-header">
          <h2>Offline Download Manager</h2>
          <p>Optimize your on-device storage. Verify manifest integrity checks.</p>
        </div>

        <div class="storage-indicator-bar">
          <div class="bar-lbl">Device Storage Used:</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 35%"></div>
          </div>
          <div class="progress-labels">
            <span>2.8 GB Used</span>
            <span>32 GB Free</span>
          </div>
        </div>

        <div class="installed-list">
          <h3>Installed Knowledge Packs</h3>
          
          ${isScience ? `
            <div class="pack-item-row" id="item-science">
              <div>
                <h4>Class 10 General Science</h4>
                <p>Ver: 1.2.0 • 14.2 MB • Integrity: verified</p>
              </div>
              <button class="delete-btn red-btn" data-id="class10-science">Delete</button>
            </div>
          ` : ""}

          ${isPython ? `
            <div class="pack-item-row" id="item-python">
              <div>
                <h4>Programming in Python</h4>
                <p>Ver: 1.0.0 • 8.5 MB • Integrity: verified</p>
              </div>
              <button class="delete-btn red-btn" data-id="coding-python">Delete</button>
            </div>
          ` : ""}

          ${!isScience && !isPython ? `<p class="placeholder-text">No packs downloaded yet. Visit the Select Learning Pack catalogue.</p>` : ""}
        </div>

        <button class="primary-btn" id="btn-goto-catalog" style="margin-top:25px;">Get More Packs</button>
      </div>
    `;

    container.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.getAttribute("data-id");
        await deleteStoreValue("packs", id);
        
        // Reload screen
        router.navigate("downloads");
      });
    });

    container.querySelector("#btn-goto-catalog").addEventListener("click", () => {
      router.navigate("packSelection");
    });
  }

  render();
}
