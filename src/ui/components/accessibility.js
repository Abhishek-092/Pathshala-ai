import { putStoreValue, getStoreValue } from "../../storage/indexeddb/database.js";

class AccessibilityManager {
  constructor() {
    this.highContrast = false;
    this.dyslexiaFont = false;
    this.fontSizeScale = 1.0;
  }

  async loadSettings() {
    const contrast = await getStoreValue("settings", "highContrast");
    if (contrast) this.highContrast = contrast.value;

    const dyslexia = await getStoreValue("settings", "dyslexiaFont");
    if (dyslexia) this.dyslexiaFont = dyslexia.value;

    const scale = await getStoreValue("settings", "fontSizeScale");
    if (scale) this.fontSizeScale = parseFloat(scale.value);

    this.applyAccessibilityClasses();
  }

  setHighContrast(active) {
    this.highContrast = active;
    putStoreValue("settings", { key: "highContrast", value: active });
    this.applyAccessibilityClasses();
  }

  setDyslexiaFont(active) {
    this.dyslexiaFont = active;
    putStoreValue("settings", { key: "dyslexiaFont", value: active });
    this.applyAccessibilityClasses();
  }

  setFontSizeScale(scale) {
    this.fontSizeScale = parseFloat(scale);
    putStoreValue("settings", { key: "fontSizeScale", value: scale });
    this.applyAccessibilityClasses();
  }

  applyAccessibilityClasses() {
    const root = document.documentElement;
    
    if (this.highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }

    if (this.dyslexiaFont) {
      root.classList.add("dyslexic-font");
    } else {
      root.classList.remove("dyslexic-font");
    }

    root.style.setProperty("--font-size-scale", String(this.fontSizeScale));
  }

  speak(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // Terminate current speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  }

  stopSpeaking() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }
}

export const accessibilityManager = new AccessibilityManager();
