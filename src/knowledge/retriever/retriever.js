import { chunkMarkdown } from "./chunker.js";
import { getStoreValue } from "../../storage/indexeddb/database.js";

class Retriever {
  async retrieve(query, packId, topK = 2) {
    const pack = await getStoreValue("packs", packId);
    if (!pack || !pack.knowledgeText) {
      console.warn(`No offline knowledge base found for pack: ${packId}`);
      return [];
    }

    const chunks = chunkMarkdown(pack.knowledgeText);
    const queryTokens = query.toLowerCase().match(/\b\w+\b/g) || [];

    const scored = chunks.map(chunk => {
      let score = 0;
      
      // Keyword matching
      chunk.keywords.forEach(kw => {
        if (query.toLowerCase().includes(kw.toLowerCase())) {
          score += 5; // Heavy weight to matches inside metadata keywords
        }
      });

      // Token overlap matching
      queryTokens.forEach(token => {
        if (chunk.text.toLowerCase().includes(token)) {
          score += 1;
        }
        if (chunk.title.toLowerCase().includes(token)) {
          score += 2;
        }
      });

      return { chunk, score };
    });

    // Sort descending by score, filter scores > 0 (or return topK fallback)
    const sorted = scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.chunk);

    if (sorted.length === 0) {
      // Fallback: return first topK items
      return chunks.slice(0, topK);
    }

    return sorted.slice(0, topK);
  }
}

export const retriever = new Retriever();
