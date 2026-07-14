import { aiOrchestrator } from "../../ai/orchestrator.js";
import { sessionManager } from "../../ai/sessionManager.js";
import { accessibilityManager } from "../components/accessibility.js";
import { router } from "../../core/router.js";

export function aiTutorPage(container, params = {}) {
  if (params.conceptId) {
    sessionManager.setActiveConcept(params.conceptId);
  }

  const activeConcept = sessionManager.getActiveConcept();

  function render() {
    container.innerHTML = `
      <div class="pb-32 max-w-[1280px] mx-auto">
        
        <!-- Hero Section: AI Companion -->
        <section class="flex flex-col items-center mb-12">
          <div class="relative w-48 h-48 md:w-64 md:h-64 mb-6">
            <div class="relative z-10 w-full h-full flex items-center justify-center animate-float">
              <img class="w-40 h-40 md:w-52 md:h-52 drop-shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-NVe2-Fbop9qu1Q2GOYPczqbRRxWfLfp-9SNJ4-UUoyIhEx2wdlB3kWteUQ1aQvD4OricpuXb1fgTDecgarI9viprXCe3k1BXTaRxAB01okhP3zqCE95PyMQUA96ai3KI5CsczybVYqSpHKRX-gwXpT76S2W_jp_Rw1XrDXE8tCy9rOWC_hRSzLmsHtocbtIvjDrZSZNWEmqNlUAHiNzXm6DA5CJ5FhcpRB_2Fc0QIKRIN_OaWUxcHg" alt="AI companion">
            </div>
          </div>
          <h1 class="text-2xl md:text-3xl font-bold text-center text-slate-800 dark:text-white font-headline mb-2">Hello, Sarah. What shall we master today?</h1>
          <p class="text-slate-500 dark:text-slate-400 text-sm text-center max-w-lg">I'm your Pathshala AI Tutor. I can explain complex concepts, visualize data, or help you practice for your upcoming finals.</p>
        </section>

        <!-- Suggested Prompt Cards -->
        <section class="mb-12">
          <div class="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            <button class="chip-prompt flex-shrink-0 w-48 p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-left hover:border-indigo-600/30 active:scale-95 transition-all">
              <div class="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-primary mb-4">
                <span class="material-symbols-outlined">lightbulb</span>
              </div>
              <h3 class="font-bold text-sm text-slate-800 dark:text-white font-headline mb-1">Explain Simply</h3>
              <p class="text-[11px] text-slate-400">Break down chemical reactions like I'm 10.</p>
            </button>

            <button class="chip-prompt flex-shrink-0 w-48 p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-left hover:border-indigo-600/30 active:scale-95 transition-all">
              <div class="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 mb-4">
                <span class="material-symbols-outlined">insights</span>
              </div>
              <h3 class="font-bold text-sm text-slate-800 dark:text-white font-headline mb-1">Visual Explanation</h3>
              <p class="text-[11px] text-slate-400">Create a mental map of balancing reactions.</p>
            </button>

            <button class="chip-prompt flex-shrink-0 w-48 p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-left hover:border-indigo-600/30 active:scale-95 transition-all">
              <div class="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-4">
                <span class="material-symbols-outlined">quiz</span>
              </div>
              <h3 class="font-bold text-sm text-slate-800 dark:text-white font-headline mb-1">Quiz Me</h3>
              <p class="text-[11px] text-slate-400">Test my knowledge on acids & bases.</p>
            </button>
          </div>
        </section>

        <!-- Dynamic Chat History & Card responses -->
        <section class="space-y-8" id="chat-bubble-container">
          <!-- Active thread state -->
          <div class="flex items-center justify-center gap-2 text-xs text-slate-400 mb-6 bg-slate-50 dark:bg-slate-800/40 py-2 rounded-xl border border-slate-200/40">
            <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            <span>Running Offline • Llama-3-Pathshala-8B</span>
          </div>

          ${sessionManager.getHistory().map(msg => {
            if (msg.role === "user") {
              return `
                <div class="flex justify-end">
                  <div class="bg-primary text-white p-5 rounded-[24px] rounded-tr-sm max-w-lg text-sm shadow-sm">
                    ${msg.content}
                  </div>
                </div>
              `;
            } else {
              return `
                <article class="rounded-[32px] overflow-hidden bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
                  <div class="p-8 md:p-10">
                    <div class="flex items-center gap-3 mb-6">
                      <div class="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-primary">
                        <span class="material-symbols-outlined text-[20px]">psychology</span>
                      </div>
                      <span class="text-xs font-bold text-primary uppercase tracking-wider">Concept Explanation</span>
                    </div>
                    <div class="space-y-6">
                      <div>
                        <h4 class="text-lg font-bold text-slate-800 dark:text-white mb-2 font-headline">Summary</h4>
                        <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">${msg.content}</p>
                      </div>
                      <div class="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6">
                        <h4 class="text-sm font-bold text-slate-800 dark:text-white mb-2 font-headline">Detailed Explanation</h4>
                        <p class="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">Imagine molecules are like dancers at a party. A chemical reaction occurs when they change partners to form new bonds!</p>
                      </div>
                    </div>
                  </div>
                </article>
              `;
            }
          }).join("")}
        </section>

        <!-- Clean Interactive Input Bar -->
        <div class="fixed bottom-24 left-1/2 transform -translate-x-1/2 w-full max-w-[600px] px-4 z-50">
          <div class="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-full shadow-lg p-2 flex items-center gap-2">
            <button class="w-10 h-10 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 active:scale-95" id="btn-camera">📷</button>
            <input type="text" id="chat-text-input" class="flex-1 bg-transparent border-none outline-none focus:ring-0 text-sm placeholder:text-slate-400 dark:text-white px-2" placeholder="Ask anything about the topic..." />
            <button class="w-10 h-10 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 active:scale-95" id="btn-voice-input">🎤</button>
            <button class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center active:scale-95" id="btn-send-message">➔</button>
          </div>
        </div>

      </div>
    `;

    // Suggested Chips handlers
    container.querySelectorAll(".chip-prompt").forEach(chip => {
      chip.addEventListener("click", (e) => {
        const title = e.currentTarget.querySelector("h3").textContent;
        sendMessage(`Explain chemical reactions using: ${title}`);
      });
    });

    // Keyboard & Click Send
    container.querySelector("#btn-send-message").addEventListener("click", () => {
      const input = container.querySelector("#chat-text-input");
      if (input.value.trim()) {
        sendMessage(input.value.trim());
        input.value = "";
      }
    });

    container.querySelector("#chat-text-input").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const input = container.querySelector("#chat-text-input");
        if (input.value.trim()) {
          sendMessage(input.value.trim());
          input.value = "";
        }
      }
    });

    // Voice simulation
    const voiceBtn = container.querySelector("#btn-voice-input");
    voiceBtn.addEventListener("click", () => {
      voiceBtn.classList.toggle("recording");
      if (voiceBtn.classList.contains("recording")) {
        voiceBtn.textContent = "🛑";
        setTimeout(() => {
          if (voiceBtn.classList.contains("recording")) {
            sendMessage("What is a chemical combination reaction?");
            voiceBtn.classList.remove("recording");
            voiceBtn.textContent = "🎤";
          }
        }, 1800);
      } else {
        voiceBtn.textContent = "🎤";
      }
    });

    // Upload Diagram Simulation
    container.querySelector("#btn-camera").addEventListener("click", () => {
      sendMessage("[Uploaded Diagram of electrolysis of water] Explain this process.");
    });
  }

  async function sendMessage(text) {
    const bubbleContainer = container.querySelector("#chat-bubble-container");
    if (!bubbleContainer) return;

    // Append User Bubble
    const userDiv = document.createElement("div");
    userDiv.className = "flex justify-end";
    userDiv.innerHTML = `<div class="bg-primary text-white p-5 rounded-[24px] rounded-tr-sm max-w-lg text-sm shadow-sm">${text}</div>`;
    bubbleContainer.appendChild(userDiv);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

    // Append Assistant Bubble
    const assistantDiv = document.createElement("article");
    assistantDiv.className = "rounded-[32px] overflow-hidden bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 shadow-sm typing";
    assistantDiv.innerHTML = `
      <div class="p-8 md:p-10 flex items-center gap-3">
        <div class="typing-indicator"><span></span><span></span><span></span></div>
      </div>
    `;
    bubbleContainer.appendChild(assistantDiv);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

    // Call orchestrator
    let textBuffer = "";
    await aiOrchestrator.handleQuery(text, (token) => {
      if (assistantDiv.classList.contains("typing")) {
        assistantDiv.classList.remove("typing");
        assistantDiv.innerHTML = `
          <div class="p-8 md:p-10">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-primary">
                <span class="material-symbols-outlined text-[20px]">psychology</span>
              </div>
              <span class="text-xs font-bold text-primary uppercase tracking-wider">Concept Explanation</span>
            </div>
            <div class="space-y-6">
              <div>
                <h4 class="text-lg font-bold text-slate-800 dark:text-white mb-2 font-headline">Summary</h4>
                <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed" id="summary-buf"></p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6">
                <h4 class="text-sm font-bold text-slate-800 dark:text-white mb-2 font-headline">Detailed Explanation</h4>
                <p class="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">Imagine molecules are like dancers at a party. A chemical reaction occurs when they change partners to form new bonds!</p>
              </div>
            </div>
          </div>
        `;
      }
      textBuffer += token;
      const summaryBuf = assistantDiv.querySelector("#summary-buf");
      if (summaryBuf) summaryBuf.textContent = textBuffer;
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    });

    accessibilityManager.speak(textBuffer.replace(/[#*`]/g, ""));
  }

  render();
}
