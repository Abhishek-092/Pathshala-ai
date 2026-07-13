import { eventBus } from "../../core/eventBus.js";

export class MockProvider {
  constructor() {
    this.name = "Mock Provider (Local Sim)";
  }

  async initialize() {
    console.log("Mock Provider initialized.");
    return true;
  }

  async loadModel(modelId) {
    console.log(`Mock model loaded: ${modelId}`);
    return true;
  }

  async generate(prompt, options = {}, onToken) {
    // Simulate generation with tokens/sec calculation
    const responseText = this.mockResponses(prompt);
    const tokens = responseText.split(" ");
    let index = 0;
    const tokensPerSec = (15 + Math.random() * 8).toFixed(1);
    const startTime = performance.now();

    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (index < tokens.length) {
          const chunk = tokens[index] + " ";
          onToken(chunk);
          
          // Emit telemetry update
          const elapsed = (performance.now() - startTime) / 1000;
          const currentTokenCount = index + 1;
          const actualSpeed = (currentTokenCount / elapsed).toFixed(1);
          eventBus.emit("TelemetryUpdated", {
            tokensPerSecond: actualSpeed,
            inferenceLatency: `${(elapsed * 1000).toFixed(0)}ms`,
            tokensGenerated: currentTokenCount,
            promptLength: prompt.length,
            contextLength: prompt.length + currentTokenCount * 4,
            vramUsage: options.vram || "1.2 GB"
          });
          
          index++;
        } else {
          clearInterval(interval);
          resolve(responseText);
        }
      }, 1000 / parseFloat(tokensPerSec));
    });
  }

  async embed(text) {
    // Simplistic word count embedding vector representation
    const vec = new Array(384).fill(0);
    const words = text.toLowerCase().split(/\s+/);
    words.forEach((w, i) => {
      const idx = Math.abs(this.hashCode(w)) % 384;
      vec[idx] = (vec[idx] || 0) + 1;
    });
    return vec;
  }

  async dispose() {
    console.log("Mock Provider disposed.");
  }

  hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  mockResponses(prompt) {
    const p = prompt.toLowerCase();
    if (p.includes("chemical") || p.includes("reaction")) {
      return "Chemical reactions involve the breaking and forming of chemical bonds to produce new substances. For example, when Hydrogen (H2) and Oxygen (O2) combine, they undergo a synthesis reaction to produce Water (H2O). The balanced equation is: 2H2 + O2 → 2H2O. Balanced equations satisfy the Law of Conservation of Mass.";
    }
    if (p.includes("acid") || p.includes("base") || p.includes("ph")) {
      return "Acids release Hydrogen ions (H+) and have a pH below 7. Bases release Hydroxide ions (OH-) and have a pH above 7. Neutral solutions, like distilled water, have a pH of exactly 7. When combined, an acid and a base neutralize each other to form a Salt and Water. Equation: HCl + NaOH → NaCl + H2O.";
    }
    if (p.includes("metal") || p.includes("ductility")) {
      return "Metals are elements with properties of high electrical conductivity, malleability, and ductility (the capability of being drawn into thin wires). Gold is the most ductile metal. The reactivity series lists metals in order of chemistry activity, which dictates how they react with acids, oxygen, and salts.";
    }
    if (p.includes("loop") || p.includes("while") || p.includes("for")) {
      return "Loops repeat blocks of code in programming. A 'while' loop executes as long as a condition remains True. A 'for' loop iterates over a list or range. Be careful with 'while' loops: if the condition never becomes False, the loop will run indefinitely (infinite loop), causing the system to freeze.";
    }
    if (p.includes("list") || p.includes("tuple")) {
      return "In Python, lists are defined with square brackets: `[1, 2, 3]`. They are mutable, meaning they can be modified. Tuples are defined with parentheses: `(1, 2, 3)` and are immutable, meaning they cannot be edited once created. Slicing with `my_list[1:3]` extracts a sublist.";
    }
    if (p.includes("function") || p.includes("def")) {
      return "Functions are reusable blocks of code defined using the `def` keyword in Python. They allow you to pass parameters and return values. For example:\n```python\ndef greet(name):\n    return f'Hello, {name}!'\n```\nThis encapsulates logic and minimizes redundancy.";
    }
    
    return "This is a local response from your on-device SLM model running on the Pathshala Offline AI Engine. Because the model is executing entirely on-device, your data is 100% private and does not rely on any active internet connection.";
  }
}
