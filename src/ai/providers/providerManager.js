import { MockProvider } from "./mockProvider.js";
import { WebLLMProvider } from "./webllm.js";
import { TransformersJSProvider } from "./transformers.js";

class ProviderManager {
  constructor() {
    this.providers = {
      mock: new MockProvider(),
      webllm: new WebLLMProvider(),
      transformers: new TransformersJSProvider()
    };
    this.activeProviderName = "mock"; // Default is mock for demo stability
  }

  getProvider() {
    return this.providers[this.activeProviderName] || this.providers.mock;
  }

  setProvider(name) {
    if (this.providers[name]) {
      this.activeProviderName = name;
      console.log(`AI Provider switched to: ${name}`);
    }
  }

  async checkWebGPUSupport() {
    return !!navigator.gpu;
  }
}

export const providerManager = new ProviderManager();
