import { db } from "../../services/storage/db";

export interface Concept {
  id: string;
  name: string;
  summary: string;
  prerequisites: string[];
}

class CurriculumEngine {
  public activePackId = "class10-science";

  setActivePack(packId: string) {
    this.activePackId = packId;
  }

  async getNextRecommendedTopic(progressMap: Record<string, any>): Promise<Concept | null> {
    const pack = await db.packs.get(this.activePackId);
    if (!pack || !pack.concepts) return null;

    for (const concept of pack.concepts) {
      const userProgress = progressMap[concept.id];
      const isCompleted = userProgress && userProgress.status === "Mastered";

      if (!isCompleted) {
        const prereqs: string[] = concept.prerequisites || [];
        const allPrereqsMet = prereqs.every((pId) => {
          const pProg = progressMap[pId];
          return pProg && pProg.status === "Mastered";
        });

        if (allPrereqsMet) {
          return concept;
        }
      }
    }

    return pack.concepts[0] || null;
  }

  async getCompetencyMapping(conceptId: string) {
    const defaultMapping = {
      conceptId,
      difficulty: "Medium",
      learningOutcomes: [
        "Recall fundamental definitions of the concept",
        "Apply the concept to solve practical quiz questions",
        "Analyze core offline systems relating to the concept"
      ]
    };
    return defaultMapping;
  }
}

export const curriculumEngine = new CurriculumEngine();
