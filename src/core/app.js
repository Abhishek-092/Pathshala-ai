import { initDB } from "../storage/indexeddb/database.js";
import { analyticsTracker } from "../learning/analytics/tracker.js";
import { modelManager } from "../ai/modelManager.js";
import { accessibilityManager } from "../ui/components/accessibility.js";
import { router } from "./router.js";
import { initDeveloperPanel } from "../ui/components/debugger.js";
import { packInstaller } from "../knowledge/packs/installer.js";

async function bootstrap() {
  console.log("Bootstrapping Pathshala AI Operating System...");

  // 1. Initialize IndexedDB
  await initDB();

  // 2. Load User Progress & Settings
  await analyticsTracker.loadProgress();
  await modelManager.loadState();
  await accessibilityManager.loadSettings();

  // 3. Auto-install default learning packs if not present
  const isScienceInstalled = await packInstaller.isInstalled("class10-science");
  if (!isScienceInstalled) {
    console.log("Preloading Class 10 Science...");
    await packInstaller.loadPackFromDirectory("class10-science").then(async (data) => {
      const { putStoreValue } = await import("../storage/indexeddb/database.js");
      await putStoreValue("packs", data);
    }).catch(e => console.error("Auto pre-load failed for science", e));
  }

  // 4. Initialize telemetry console in document body
  const telemetryContainer = document.getElementById("dev-telemetry-container");
  if (telemetryContainer) {
    initDeveloperPanel(telemetryContainer);
  }

  // 5. Setup dynamic buttons and nav handlers
  setupAppListeners();

  // 6. Navigate to Splash Screen to start sequence
  router.navigate("splash");

  // 7. Register PWA Service Worker (only if supported and on https/localhost)
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js")
        .then(reg => console.log("ServiceWorker successfully registered", reg))
        .catch(err => console.warn("ServiceWorker registration failed", err));
    });
  }
}

function setupAppListeners() {
  // Navigation button listeners
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const route = item.getAttribute("data-route");
      if (route) {
        router.navigate(route);
      }
    });
  });

  // Logo home button listener
  const logoHome = document.getElementById("btn-logo-home");
  if (logoHome) {
    logoHome.addEventListener("click", () => {
      router.navigate("dashboard");
    });
  }

  // Simulator emulator chrome button listeners
  const themeToggle = document.getElementById("chrome-darkmode-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark-mode");
      themeToggle.textContent = document.documentElement.classList.contains("dark-mode") ? "☀️ Light" : "🌙 Dark";
    });
  }
}

// Start boot
window.addEventListener("DOMContentLoaded", bootstrap);
