import { eventBus } from "../core/eventBus.js";
import { getStoreValue, putStoreValue } from "../storage/indexeddb/database.js";

const MODELS = [
  {
    id: "gemma-2b",
    name: "Gemma-2B-Local (SLM)",
    description: "Highly optimized 2 Billion Parameter model. Perfect for mobile devices and budget laptops.",
    ramRequired: "4 GB",
    size: "1.4 GB",
    compatibility: "Excellent (All devices)",
    downloaded: false
  },
  {
    id: "phi3-8b",
    name: "Phi-3-Pathshala-8B-Q4 (LLM)",
    description: "Custom fine-tuned 8 Billion Parameter quantized model for science & coding curricula.",
    ramRequired: "8 GB",
    size: "4.2 GB",
    compatibility: "High (Requires modern device)",
    downloaded: false
  }
];

export class ModelManager {
  constructor() {
    this.models = MODELS;
    this.activeModelId = "gemma-2b";
  }

  async loadState() {
    const active = await getStoreValue("settings", "activeModel");
    if (active) this.activeModelId = active.value;
    
    // Check download statuses
    for (const m of this.models) {
      const status = await getStoreValue("settings", `model_downloaded_${m.id}`);
      if (status) {
        m.downloaded = status.value;
      }
    }
  }

  getAvailableModels() {
    return this.models;
  }

  getActiveModel() {
    return this.models.find(m => m.id === this.activeModelId) || this.models[0];
  }

  async selectModel(modelId) {
    this.activeModelId = modelId;
    await putStoreValue("settings", { key: "activeModel", value: modelId });
    eventBus.emit("ModelChanged", this.getActiveModel());
  }

  async downloadModel(modelId, progressCallback) {
    const model = this.models.find(m => m.id === modelId);
    if (!model) return;

    let progress = 0;
    const interval = setInterval(async () => {
      progress += 10;
      if (progressCallback) progressCallback(progress);
      if (progress >= 100) {
        clearInterval(interval);
        model.downloaded = true;
        await putStoreValue("settings", { key: `model_downloaded_${modelId}`, value: true });
        eventBus.emit("ModelDownloaded", model);
        eventBus.emit("TelemetryUpdated", { status: `Model ${model.name} is ready.` });
      }
    }, 200);
  }

  async deleteModel(modelId) {
    const model = this.models.find(m => m.id === modelId);
    if (!model) return;
    model.downloaded = false;
    await putStoreValue("settings", { key: `model_downloaded_${modelId}`, value: false });
    eventBus.emit("ModelDeleted", model);
  }
}

export const modelManager = new ModelManager();
