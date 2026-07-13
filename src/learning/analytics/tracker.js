import { eventBus } from "../../core/eventBus.js";
import { getStoreValue, putStoreValue } from "../../storage/indexeddb/database.js";

class AnalyticsTracker {
  constructor() {
    this.progress = {};
    this.streak = 1;
    this.totalXp = 0;
    this.level = 1;
  }

  async loadProgress() {
    const data = await getStoreValue("progress", "user_profile");
    if (data) {
      this.streak = data.streak || 1;
      this.totalXp = data.totalXp || 0;
      this.level = Math.floor(this.totalXp / 100) + 1;
      this.progress = data.progress || {};
    } else {
      // Default placeholder progress
      this.progress = {
        "chem-reactions": { status: "Learning", score: 60, timeSpent: 20 },
        "life-processes": { status: "Weak", score: 40, timeSpent: 10 }
      };
      await this.saveProgress();
    }
  }

  async saveProgress() {
    await putStoreValue("progress", {
      key: "user_profile",
      streak: this.streak,
      totalXp: this.totalXp,
      progress: this.progress
    });
  }

  async handleQuizCompleted(event) {
    const { conceptId, score, xpEarned } = event;
    const current = this.progress[conceptId] || { status: "Locked", score: 0, timeSpent: 0 };
    
    current.score = Math.max(current.score, score);
    current.status = score >= 80 ? "Mastered" : score >= 50 ? "Learning" : "Weak";
    current.timeSpent += 15; // Simulated revision addition

    this.progress[conceptId] = current;
    this.totalXp += xpEarned;
    this.level = Math.floor(this.totalXp / 100) + 1;

    await this.saveProgress();
    eventBus.emit("ProgressUpdated", {
      progress: this.progress,
      totalXp: this.totalXp,
      level: this.level
    });
  }

  getWeakConcepts() {
    return Object.keys(this.progress).filter(k => this.progress[k].status === "Weak");
  }

  getMasteredConcepts() {
    return Object.keys(this.progress).filter(k => this.progress[k].status === "Mastered");
  }
}

export const analyticsTracker = new AnalyticsTracker();

// Listen to Global Events
eventBus.on("QuizFinished", (event) => {
  analyticsTracker.handleQuizCompleted(event);
});
