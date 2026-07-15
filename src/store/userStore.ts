import { create } from "zustand";
import { db } from "../services/storage/db";

interface UserState {
  name: string;
  xp: number;
  streak: number;
  level: number;
  pfp?: string;
  loadUserProfile: () => Promise<void>;
  addXp: (amount: number) => Promise<void>;
  incrementStreak: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  name: "Guest User",
  xp: 1200,
  streak: 1,
  level: 1,
  pfp: undefined,
  loadUserProfile: async () => {
    const nameSett = await db.settings.get("userName");
    const xpSett = await db.settings.get("userXp");
    const streakSett = await db.settings.get("userStreak");
    
    set({
      name: nameSett?.value || "Guest User",
      xp: xpSett?.value || 1200,
      streak: streakSett?.value || 1,
      level: Math.floor((xpSett?.value || 1200) / 1000) + 1
    });
  },
  addXp: async (amount) => {
    const newXp = get().xp + amount;
    await db.settings.put({ key: "userXp", value: newXp });
    set({
      xp: newXp,
      level: Math.floor(newXp / 1000) + 1
    });
  },
  incrementStreak: async () => {
    const newStreak = get().streak + 1;
    await db.settings.put({ key: "userStreak", value: newStreak });
    set({ streak: newStreak });
  }
}));
