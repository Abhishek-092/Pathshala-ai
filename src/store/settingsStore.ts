import { create } from "zustand";
import { db } from "../services/storage/db";

interface SettingsState {
  dyslexicFont: boolean;
  highContrast: boolean;
  darkMode: boolean;
  loadSettings: () => Promise<void>;
  toggleDyslexicFont: () => Promise<void>;
  toggleHighContrast: () => Promise<void>;
  toggleDarkMode: () => void;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  dyslexicFont: false,
  highContrast: false,
  darkMode: false,
  loadSettings: async () => {
    const dys = await db.settings.get("dyslexicFont");
    const hc = await db.settings.get("highContrast");
    const dm = await db.settings.get("darkMode");

    const isDys = !!dys?.value;
    const isHc = !!hc?.value;
    const isDm = !!dm?.value;

    if (isDys) document.body.classList.add("dyslexic-font");
    if (isHc) document.body.classList.add("high-contrast");
    if (isDm) document.documentElement.classList.add("dark-mode");

    set({ dyslexicFont: isDys, highContrast: isHc, darkMode: isDm });
  },
  toggleDyslexicFont: async () => {
    const newVal = !get().dyslexicFont;
    await db.settings.put({ key: "dyslexicFont", value: newVal });
    if (newVal) {
      document.body.classList.add("dyslexic-font");
    } else {
      document.body.classList.remove("dyslexic-font");
    }
    set({ dyslexicFont: newVal });
  },
  toggleHighContrast: async () => {
    const newVal = !get().highContrast;
    await db.settings.put({ key: "highContrast", value: newVal });
    if (newVal) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
    set({ highContrast: newVal });
  },
  toggleDarkMode: () => {
    const newVal = !get().darkMode;
    db.settings.put({ key: "darkMode", value: newVal });
    document.documentElement.classList.toggle("dark-mode", newVal);
    set({ darkMode: newVal });
  }
}));
