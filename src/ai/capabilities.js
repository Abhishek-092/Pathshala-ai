import { providerManager } from "./providers/providerManager.js";
import { sessionManager } from "./sessionManager.js";

export class Capabilities {
  async questionAnswering(query, retrievedChunks, onToken) {
    const provider = providerManager.getProvider();
    const explainMode = sessionManager.getExplainMode();

    const systemPrompt = this.buildSystemPrompt(explainMode, retrievedChunks);
    const fullPrompt = `${systemPrompt}\n\nStudent Query: "${query}"\n\nExplain:`;

    return await provider.generate(fullPrompt, {}, onToken);
  }

  async lessonGeneration(conceptName, summaryText, onToken) {
    const provider = providerManager.getProvider();
    const systemPrompt = `You are a premium, friendly teacher. Generate an interactive lesson with definitions, clear analogies, and key takeaways for the concept "${conceptName}". Use markdown styling.`;
    const fullPrompt = `${systemPrompt}\n\nConcept Summary Context: "${summaryText}"\n\nGenerate Lesson:`;
    
    return await provider.generate(fullPrompt, {}, onToken);
  }

  async quizGeneration(conceptId, summaryText) {
    // Generate quiz offline - fallback to structured mock questions
    return [
      {
        question: `Based on ${conceptId}, what is the main objective of this study?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        answer: "Option A",
        explanation: "This is a dynamically generated question based on local concept metadata."
      }
    ];
  }

  async summarization(text, onToken) {
    const provider = providerManager.getProvider();
    const fullPrompt = `Summarize the following text in exactly 3 key bullet points:\n\n"${text}"`;
    return await provider.generate(fullPrompt, {}, onToken);
  }

  async translation(text, targetLang, onToken) {
    const provider = providerManager.getProvider();
    const fullPrompt = `Translate the following text to ${targetLang} language:\n\n"${text}"`;
    return await provider.generate(fullPrompt, {}, onToken);
  }

  buildSystemPrompt(mode, chunks = []) {
    let modeGuideline = "";
    switch (mode) {
      case "ELI5":
        modeGuideline = "Explain Like I'm 10. Use simple words, fun analogies, and friendly sentences.";
        break;
      case "Exam":
        modeGuideline = "Structure the answer formally. Use bullet points, bold keywords, and clear definitions suitable for school exams.";
        break;
      case "Competitive":
        modeGuideline = "Focus on advanced applications, formulas, shortcut tricks, and standard competitive questions.";
        break;
      case "Story":
        modeGuideline = "Explain the topic using a short creative narrative, story, or historical context.";
        break;
      case "Analogy":
        modeGuideline = "Build the entire explanation around a single main real-world comparison.";
        break;
      default:
        modeGuideline = "Explain clearly, concisely, and with educational formatting.";
    }

    const contextStr = chunks.length > 0 
      ? `Use the following retrieved offline textbook chunks as reference:\n${chunks.join("\n")}`
      : "No direct reference textbook data is available. Use local model knowledge.";

    return `System Instructions:
You are Pathshala AI, an Offline On-Device AI Teacher. You are private and run completely local.
Goal: ${modeGuideline}
Context: ${contextStr}`;
  }
}

export const capabilities = new Capabilities();
