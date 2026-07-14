import { type ModelMetadata, type AIProvider } from "./types";
import { MockProvider } from "./MockProvider";

class ModelManager {
  private activeProvider: AIProvider;
  private currentModelId = "gemma-2b-local";

  constructor() {
    // Default to mock provider for local development/fallback
    this.activeProvider = new MockProvider();
  }

  getAvailableModels(): ModelMetadata[] {
    return [
      { id: "gemma-2b-local", name: "Gemma 2B (Local Edge)", ramRequired: "4GB", downloaded: true },
      { id: "llama-3-8b-webllm", name: "Llama 3 8B (WebLLM Acceleration)", ramRequired: "8GB", downloaded: true }
    ];
  }

  getActiveModel(): ModelMetadata {
    const list = this.getAvailableModels();
    return list.find(m => m.id === this.currentModelId) || list[0];
  }

  getProvider(): AIProvider {
    return this.activeProvider;
  }

  setProvider(provider: AIProvider) {
    this.activeProvider = provider;
  }
}

export const modelManager = new ModelManager();
