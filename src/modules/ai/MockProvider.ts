import { type AIProvider } from "./types";

export class MockProvider implements AIProvider {
  async initialize(): Promise<void> {
    console.log("Mock AI Provider initialized");
  }

  async loadModel(modelId: string): Promise<void> {
    console.log(`Mock AI loaded model: ${modelId}`);
  }

  async generate(prompt: string, onToken?: (token: string) => void): Promise<string> {
    const response = `This is a high-fidelity mock explanation addressing your query: "${prompt}". In a production environment, this is computed offline directly on your device via Llama-3 (WebLLM) or Gemma-2B (Transformers.js/ONNX) without requiring an internet connection.`;
    
    if (onToken) {
      const words = response.split(" ");
      for (let i = 0; i < words.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 30));
        onToken(words[i] + " ");
      }
    }
    return response;
  }

  async embed(text: string): Promise<number[]> {
    return Array.from({ length: 384 }, () => Math.random());
  }

  async dispose(): Promise<void> {
    console.log("Mock AI Provider disposed");
  }
}
