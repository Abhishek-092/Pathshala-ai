import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { initDB } from "./storage/indexeddb/database.js";
import { analyticsTracker } from "./learning/analytics/tracker.js";
import { modelManager } from "./ai/modelManager.js";
import { accessibilityManager } from "./ui/components/accessibility.js";
import { packInstaller } from "./knowledge/packs/installer.js";

async function initApp() {
  console.log("Initializing React App and IndexedDB...");
  await initDB();
  await analyticsTracker.loadProgress();
  await modelManager.loadState();
  await accessibilityManager.loadSettings();

  // Auto-preload science pack
  const isScienceInstalled = await packInstaller.isInstalled("class10-science");
  if (!isScienceInstalled) {
    try {
      const data = await packInstaller.loadPackFromDirectory("class10-science");
      const { putStoreValue } = await import("./storage/indexeddb/database.js");
      await putStoreValue("packs", data);
    } catch (e) {
      console.error("React boot pack load error", e);
    }
  }

  // Render Root
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

initApp();
