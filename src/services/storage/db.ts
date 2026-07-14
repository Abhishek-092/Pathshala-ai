import Dexie, { type Table } from "dexie";

export interface LearningPack {
  id: string;
  manifest: any;
  concepts: any[];
  quizBank: any[];
  conceptGraph: any;
  downloadedAt: Date;
}

export interface Progress {
  conceptId: string;
  status: "Locked" | "Unlocked" | "Mastered";
  score?: number;
  lastAttempted?: Date;
  confidence?: number; // 0 to 1
}

export interface QuizAttempt {
  id?: number;
  conceptId: string;
  score: number;
  xpEarned: number;
  answers: any[];
  timestamp: Date;
}

export interface Achievement {
  id: string;
  title: string;
  unlockedAt: Date;
}

export interface ChatSession {
  id: string;
  conceptId: string;
  messages: Array<{
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
  }>;
  updatedAt: Date;
}

export interface Setting {
  key: string;
  value: any;
}

export interface AnalyticMetric {
  id?: number;
  key: string;
  value: number;
  timestamp: Date;
}

export class PathshalaDatabase extends Dexie {
  packs!: Table<LearningPack, string>;
  progress!: Table<Progress, string>;
  quizHistory!: Table<QuizAttempt, number>;
  achievements!: Table<Achievement, string>;
  chatSessions!: Table<ChatSession, string>;
  settings!: Table<Setting, string>;
  analytics!: Table<AnalyticMetric, number>;

  constructor() {
    super("PathshalaDatabase");
    this.version(1).stores({
      packs: "id",
      progress: "conceptId, status",
      quizHistory: "++id, conceptId, timestamp",
      achievements: "id",
      chatSessions: "id, conceptId, updatedAt",
      settings: "key",
      analytics: "++id, key, timestamp"
    });
  }
}

export const db = new PathshalaDatabase();
