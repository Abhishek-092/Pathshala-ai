export class SessionManager {
  constructor() {
    this.history = [];
    this.activeChapterId = null;
    this.currentConceptId = null;
    this.explainMode = "ELI5"; // Default Explain Mode
    this.maxContextTokens = 2048;
  }

  setExplainMode(mode) {
    this.explainMode = mode;
  }

  getExplainMode() {
    return this.explainMode;
  }

  setActiveConcept(conceptId) {
    this.currentConceptId = conceptId;
  }

  getActiveConcept() {
    return this.currentConceptId;
  }

  addMessage(role, content) {
    this.history.push({ role, content, timestamp: new Date().toISOString() });
    
    // Prune history to respect maxContextTokens
    if (this.history.length > 20) {
      this.history.shift();
    }
  }

  getHistory() {
    return this.history;
  }

  clearSession() {
    this.history = [];
    this.currentConceptId = null;
    this.activeChapterId = null;
  }
}

export const sessionManager = new SessionManager();
