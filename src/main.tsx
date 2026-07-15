import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { initDB } from "./services/storage/database";
import { packInstaller } from "./knowledge/packs/installer.js";

async function bootApp() {
  // Pre-load default local database settings & packs if needed
  await initDB();
  
  const isScienceInstalled = await packInstaller.isInstalled("class10-science");
  if (!isScienceInstalled) {
    try {
      const data = await packInstaller.loadPackFromDirectory("class10-science");
      const { putStoreValue } = await import("./services/storage/database");
      await putStoreValue("packs", data);
    } catch (e) {
      console.warn("Science pack auto-boot fallback", e);
    }
  }

  const rootEl = document.getElementById("root");
  if (rootEl) {
    ReactDOM.createRoot(rootEl).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}

bootApp();
