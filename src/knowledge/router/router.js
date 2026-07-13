import { getAllStoreValues } from "../../storage/indexeddb/database.js";

class KnowledgeRouter {
  async routeQuery(query) {
    const installedPacks = await getAllStoreValues("packs");
    if (installedPacks.length === 0) return null;

    const q = query.toLowerCase();
    let bestPack = installedPacks[0]; // Fallback
    let bestScore = 0;

    for (const pack of installedPacks) {
      let score = 0;
      const manifest = pack.manifest;
      
      // Match words in pack description or name
      const targetTerms = [manifest.name, manifest.description, ...(manifest.languages || [])];
      targetTerms.forEach(term => {
        if (term && q.includes(term.toLowerCase())) {
          score += 3;
        }
      });

      // Special keywords triggers
      if (pack.id === "class10-science" && (q.includes("reaction") || q.includes("acid") || q.includes("cell") || q.includes("force") || q.includes("water"))) {
        score += 10;
      }
      if (pack.id === "coding-python" && (q.includes("python") || q.includes("loop") || q.includes("list") || q.includes("function") || q.includes("def"))) {
        score += 10;
      }

      if (score > bestScore) {
        bestScore = score;
        bestPack = pack;
      }
    }

    return bestPack.id;
  }
}

export const knowledgeRouter = new KnowledgeRouter();
