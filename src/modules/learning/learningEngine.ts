import { db } from "../../services/storage/db";
import { useUserStore } from "../../store/userStore";

class LearningEngine {
  async unlockConcept(conceptId: string): Promise<void> {
    await db.progress.put({
      conceptId,
      status: "Unlocked",
      confidence: 0
    });
  }

  async masterConcept(conceptId: string, score: number): Promise<number> {
    const xpEarned = Math.round(score * 1.5);
    
    await db.progress.put({
      conceptId,
      status: "Mastered",
      score,
      lastAttempted: new Date(),
      confidence: 1
    });

    await useUserStore.getState().addXp(xpEarned);
    return xpEarned;
  }
}

export const learningEngine = new LearningEngine();
