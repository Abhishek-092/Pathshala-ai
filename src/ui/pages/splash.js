import { router } from "../../core/router.js";

export function splashPage(container) {
  container.innerHTML = `
    <div class="splash-screen">
      <div class="splash-logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="80" height="80">
          <defs>
            <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#4F46E5" />
              <stop offset="100%" stop-color="#06B6D4" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="24" fill="url(#logo-grad)" />
          <path d="M30 70 L50 30 L70 70" fill="none" stroke="white" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="50" cy="50" r="8" fill="#22C55E"/>
        </svg>
        <h1>Pathshala AI</h1>
        <p class="subtitle">Offline AI Learning Operating System</p>
      </div>

      <div class="splash-illustration">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="130">
          <circle cx="100" cy="80" r="45" fill="#EEF2F6" stroke="#E2E8F0" stroke-width="2"/>
          <!-- AI Companion -->
          <rect x="75" y="55" width="50" height="40" rx="12" fill="#E0E7FF" stroke="#4F46E5" stroke-width="3"/>
          <circle cx="90" cy="75" r="4" fill="#06B6D4"/>
          <circle cx="110" cy="75" r="4" fill="#06B6D4"/>
          <path d="M92 85 Q100 90 108 85" fill="none" stroke="#4F46E5" stroke-width="2" stroke-linecap="round"/>
          <line x1="100" y1="55" x2="100" y2="45" stroke="#4F46E5" stroke-width="3"/>
          <circle cx="100" cy="42" r="5" fill="#22C55E"/>
          <!-- Orbits / Signals -->
          <circle cx="100" cy="80" r="65" fill="none" stroke="#4F46E5" stroke-dasharray="6,6" opacity="0.4"/>
        </svg>
      </div>

      <div class="splash-badge-container">
        <span class="badge offline-badge">🛡️ Runs Completely Offline</span>
        <span class="badge privacy-badge">🔒 Privacy First (On-Device)</span>
      </div>

      <div class="loading-footer">
        <div class="spinner"></div>
        <p id="boot-status">Initializing local AI weights...</p>
      </div>
    </div>
  `;

  const statuses = [
    "Checking WebGPU acceleration...",
    "Scanning IndexedDB for Knowledge Packs...",
    "Initializing local model (Gemma-2B)...",
    "Model ready! System booting..."
  ];

  let step = 0;
  const interval = setInterval(() => {
    if (step < statuses.length) {
      const statusEl = container.querySelector("#boot-status");
      if (statusEl) statusEl.textContent = statuses[step];
      step++;
    } else {
      clearInterval(interval);
      router.navigate("onboarding");
    }
  }, 700);
}
