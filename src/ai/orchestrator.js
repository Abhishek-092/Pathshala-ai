import { capabilities } from "./capabilities.js";
import { retriever } from "../knowledge/retriever/retriever.js";
import { sessionManager } from "./sessionManager.js";
import { curriculumEngine } from "../learning/curriculum/curriculumEngine.js";
import { eventBus } from "../core/eventBus.js";

export class AIOrchestrator {
  async handleQuery(query, onToken) {
    eventBus.emit("TelemetryUpdated", { status: "Orchestrating local AI request..." });

    // Step 1: Add user message to session
    sessionManager.addMessage("user", query);

    // Step 2: Query Router / Semantic search
    // Determine active pack
    const activePackId = curriculumEngine.activePackId || "class10-science";
    
    // Scan local textbook data for context chunks
    const chunks = await retriever.retrieve(query, activePackId, 2);
    eventBus.emit("TelemetryUpdated", { 
      retrievedChunks: chunks.map(c => c.text),
      status: "Semantic chunks retrieved. Starting inference..."
    });

    // Step 3: Check if query requires special mode triggers
    if (query.toLowerCase().includes("quiz me") || query.toLowerCase().includes("test me")) {
      const activeConcept = sessionManager.getActiveConcept() || "chem-reactions";
      eventBus.emit("CommandTriggered", { command: "startQuiz", conceptId: activeConcept });
      onToken("Generating an offline quiz for you now... Let's start!");
      return "Quiz Triggered";
    }

    // Step 4: Run Capability Layer QA
    const response = await capabilities.questionAnswering(query, chunks.map(c => c.text), onToken);

    // Step 5: Save assistant response to session
    sessionManager.addMessage("assistant", response);
    
    eventBus.emit("TelemetryUpdated", { status: "Ready" });
    return response;
  }
}

export const aiOrchestrator = new AIOrchestrator();
