import { db } from "../../services/storage/db";

class AnalyticsEngine {
  async trackEvent(key: string, value: number): Promise<void> {
    await db.analytics.add({
      key,
      value,
      timestamp: new Date()
    });
  }

  async getCompletionStats() {
    const list = await db.analytics.toArray();
    return {
      totalTimeSpent: list.filter(e => e.key === "study_time").reduce((sum, e) => sum + e.value, 0),
      totalQuizzesTaken: list.filter(e => e.key === "quiz_taken").length
    };
  }
}

export const analyticsEngine = new AnalyticsEngine();
