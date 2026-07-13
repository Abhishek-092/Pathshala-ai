import { getStoreValue } from "../../storage/indexeddb/database.js";

class CurriculumEngine {
  constructor() {
    this.activePackId = "class10-science";
  }

  setActivePack(packId) {
    this.activePackId = packId;
  }

  async getNextRecommendedTopic(progressMap) {
    const pack = await getStoreValue("packs", this.activePackId);
    if (!pack || !pack.concepts) return null;

    // Traverse concepts list and find first concept that:
    // 1. Is NOT completed (score < 80% or undefined)
    // 2. Has all prerequisites met
    for (const concept of pack.concepts) {
      const userProgress = progressMap[concept.id];
      const isCompleted = userProgress && userProgress.status === "Mastered";

      if (!isCompleted) {
        const prereqs = concept.prerequisites || [];
        const allPrereqsMet = prereqs.every(pId => {
          const pProg = progressMap[pId];
          return pProg && pProg.status === "Mastered";
        });

        if (allPrereqsMet) {
          return concept;
        }
      }
    }

    return null; // All concepts completed
  }

  async getPrerequisitesStatus(conceptId, progressMap) {
    const pack = await getStoreValue("packs", this.activePackId);
    if (!pack || !pack.concepts) return [];

    const concept = pack.concepts.find(c => c.id === conceptId);
    if (!concept) return [];

    const prereqs = concept.prerequisites || [];
    return prereqs.map(pId => {
      const pConcept = pack.concepts.find(c => c.id === pId);
      const pProg = progressMap[pId];
      return {
        id: pId,
        name: pConcept ? pConcept.name : pId,
        met: pProg && pProg.status === "Mastered"
      };
    });
  }

  async getCompetencyMapping(conceptId) {
    const mappings = {
      "chem-reactions": {
        learningOutcomes: ["Balancing chemical equations", "Identify oxidation and reduction reactions", "Classify combination and decomposition processes"],
        difficulty: "Medium"
      },
      "acids-bases": {
        learningOutcomes: ["Understand pH values", "Classify acids and bases", "Synthesize bleaching powder & baking soda"],
        difficulty: "Medium"
      },
      "metals-nonmetals": {
        learningOutcomes: ["Identify metallurgical properties", "Demonstrate Reactivity Series logic", "Prevent iron corrosion"],
        difficulty: "Hard"
      },
      "py-intro": {
        learningOutcomes: ["Write basic script syntax", "Manage numeric and string variables", "Perform basic input/output operations"],
        difficulty: "Easy"
      },
      "py-loops": {
        learningOutcomes: ["Deploy if-else branches", "Prevent infinite while loops", "Write loop iteration scripts"],
        difficulty: "Medium"
      }
    };

    return mappings[conceptId] || {
      learningOutcomes: ["Understand the fundamentals", "Pass assessment quiz successfully"],
      difficulty: "Medium"
    };
  }
}

export const curriculumEngine = new CurriculumEngine();
