import { getStoreValue } from "../../storage/indexeddb/database.js";

export async function generateQuizForConcept(conceptId, packId) {
  const pack = await getStoreValue("packs", packId);
  if (!pack || !pack.quizBank) return [];

  // Filter quiz bank for questions corresponding to the concept
  const questions = pack.quizBank.filter(q => q.conceptId === conceptId);
  
  if (questions.length === 0) {
    // Generate a default question if none found
    return [
      {
        id: `gen-${conceptId}-1`,
        conceptId,
        type: "mcq",
        question: `Which of the following describes the key principle of ${conceptId.replace("-", " ")}?`,
        options: ["Core Mechanism", "External Process", "Random Transition", "Non-reactive state"],
        answer: "Core Mechanism",
        explanation: "The core mechanism represents the central function of this concept."
      }
    ];
  }

  return questions;
}
