import { putStoreValue, getStoreValue } from "../../storage/indexeddb/database.js";
import { eventBus } from "../../core/eventBus.js";

class KnowledgePackInstaller {
  async installPack(packId, progressCallback) {
    eventBus.emit("TelemetryUpdated", { status: `Installing pack: ${packId}...` });
    
    // Simulate fetching file directory manifests
    let progress = 0;
    const interval = setInterval(async () => {
      progress += 15;
      if (progressCallback) progressCallback(progress);

      if (progress >= 100) {
        clearInterval(interval);

        // Fetch mock pack files
        const packData = await this.loadPackFromDirectory(packId);
        await putStoreValue("packs", packData);
        
        eventBus.emit("PackInstalled", { packId, pack: packData });
        eventBus.emit("TelemetryUpdated", { status: `Pack ${packId} installed successfully.` });
      }
    }, 150);
  }

  async loadPackFromDirectory(packId) {
    // Dynamically loading relative local resources from directory mockup
    try {
      const manifestRes = await fetch(`./packs/${packId}/manifest.json`);
      const manifest = await manifestRes.json();

      const conceptsRes = await fetch(`./packs/${packId}/concepts.json`);
      const concepts = await conceptsRes.json();

      const quizRes = await fetch(`./packs/${packId}/quiz-bank.json`);
      const quizBank = await quizRes.json();

      const graphRes = await fetch(`./packs/${packId}/concept-graph.json`);
      const graph = await graphRes.json();

      const textRes = await fetch(`./packs/${packId}/knowledge.md`);
      const knowledgeText = await textRes.text();

      return {
        id: packId,
        manifest,
        concepts,
        quizBank,
        graph,
        knowledgeText,
        installedAt: new Date().toISOString()
      };
    } catch (e) {
      console.error("Failed to install pack from directory, loading static fallback:", e);
      return {
        id: packId,
        manifest: { name: packId, description: "Local fallback pack description" },
        concepts: [],
        quizBank: [],
        graph: { nodes: [], edges: [] },
        knowledgeText: "",
        installedAt: new Date().toISOString()
      };
    }
  }

  async isInstalled(packId) {
    const pack = await getStoreValue("packs", packId);
    return !!pack;
  }
}

export const packInstaller = new KnowledgePackInstaller();
