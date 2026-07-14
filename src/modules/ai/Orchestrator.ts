import { modelManager } from "./ModelManager";

class AIOrchestrator {
  async handleQuery(query: string, onToken?: (token: string) => void): Promise<string> {
    const provider = modelManager.getProvider();
    
    // In future versions, we can inject offline contexts here from the Retriever
    const context = "Focus explaining step-by-step with clear analogies.";
    const fullPrompt = `[System: ${context}]\n\nUser: ${query}\n\nAssistant:`;

    return provider.generate(fullPrompt, onToken);
  }
}

export const aiOrchestrator = new AIOrchestrator();
