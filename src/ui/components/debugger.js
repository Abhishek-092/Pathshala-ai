import { eventBus } from "../../core/eventBus.js";
import { providerManager } from "../../ai/providers/providerManager.js";
import { modelManager } from "../../ai/modelManager.js";

export function initDeveloperPanel(containerEl) {
  const panel = document.createElement("div");
  panel.className = "dev-telemetry-panel collapsed";
  panel.id = "dev-telemetry-panel";

  panel.innerHTML = `
    <div class="panel-header">
      <h3>🛠️ Developer Telemetry Console</h3>
      <button class="toggle-btn" id="dev-panel-toggle">▲ Expand</button>
    </div>
    <div class="panel-body">
      <div class="telemetry-grid">
        <div class="metric-card">
          <label>WebGPU Status</label>
          <span id="tel-webgpu" class="status-badge green">Detecting...</span>
        </div>
        <div class="metric-card">
          <label>Active SLM Model</label>
          <span id="tel-model">Gemma-2B-Local</span>
        </div>
        <div class="metric-card">
          <label>Speed (Tokens/s)</label>
          <span id="tel-speed">0.0 t/s</span>
        </div>
        <div class="metric-card">
          <label>Latency (Inference)</label>
          <span id="tel-latency">0ms</span>
        </div>
        <div class="metric-card">
          <label>VRAM footprint</label>
          <span id="tel-vram">1.4 GB</span>
        </div>
        <div class="metric-card">
          <label>Device Offline</label>
          <span class="status-badge green">True</span>
        </div>
      </div>
      
      <div class="retrieval-container">
        <h4>🔍 Local Vector Chunks Retrieved:</h4>
        <div class="retrieved-blocks" id="tel-chunks">
          <div class="placeholder-chunk">No query processed yet. Ask a question to trigger retrieval.</div>
        </div>
      </div>

      <div class="prompt-container">
        <h4>📝 Formatted Prompt sent to LLM:</h4>
        <pre class="prompt-preview" id="tel-prompt">N/A</pre>
      </div>
    </div>
  `;

  containerEl.appendChild(panel);

  const toggleBtn = panel.querySelector("#dev-panel-toggle");
  toggleBtn.addEventListener("click", () => {
    panel.classList.toggle("collapsed");
    toggleBtn.textContent = panel.classList.contains("collapsed") ? "▲ Expand" : "▼ Collapse";
  });

  // Real WebGPU Detection
  providerManager.checkWebGPUSupport().then(hasWebGPU => {
    const webgpuSpan = panel.querySelector("#tel-webgpu");
    if (hasWebGPU) {
      webgpuSpan.textContent = "Active (Local GPU)";
      webgpuSpan.className = "status-badge green";
    } else {
      webgpuSpan.textContent = "Fallback (CPU WASM)";
      webgpuSpan.className = "status-badge orange";
    }
  });

  // Listen to Telemetry Events
  eventBus.on("TelemetryUpdated", (telemetry) => {
    if (telemetry.tokensPerSecond) {
      panel.querySelector("#tel-speed").textContent = `${telemetry.tokensPerSecond} t/s`;
    }
    if (telemetry.inferenceLatency) {
      panel.querySelector("#tel-latency").textContent = telemetry.inferenceLatency;
    }
    if (telemetry.vramUsage) {
      panel.querySelector("#tel-vram").textContent = telemetry.vramUsage;
    }
    if (telemetry.retrievedChunks) {
      const chunksDiv = panel.querySelector("#tel-chunks");
      chunksDiv.innerHTML = telemetry.retrievedChunks.map((c, i) => `
        <div class="chunk-item">
          <strong>[Source Chunk ${i+1}]</strong>
          <p>${c}</p>
        </div>
      `).join("");
    }
    if (telemetry.promptLength) {
      panel.querySelector("#tel-prompt").textContent = `Prompt Length: ${telemetry.promptLength} chars\nContext Window: ${telemetry.contextLength || 2048} tokens\nModel Status: Active`;
    }
  });

  eventBus.on("ModelChanged", (model) => {
    panel.querySelector("#tel-model").textContent = model.name;
    panel.querySelector("#tel-vram").textContent = model.ramRequired;
  });
}
