import { aiOrchestrator } from "../../ai/orchestrator.js";
import { sessionManager } from "../../ai/sessionManager.js";
import { accessibilityManager } from "../accessibility.js";
import { router } from "../../core/router.js";

export function aiTutorPage(container, params = {}) {
  if (params.conceptId) {
    sessionManager.setActiveConcept(params.conceptId);
  }

  const activeConcept = sessionManager.getActiveConcept();

  function render() {
    container.innerHTML = `
      <div class="ai-tutor-page">
        <!-- Tutor Top Profile -->
        <div class="tutor-header">
          <div class="tutor-avatar">🤖</div>
          <div class="tutor-info">
            <h3>Pathshala AI Tutor</h3>
            <div class="badge-row">
              <span class="status-badge green">● Running Offline</span>
              <span class="status-badge blue">Local inference</span>
            </div>
          </div>
          <!-- Mode Select -->
          <select id="tutor-explain-mode" class="mode-select-dropdown">
            <option value="ELI5" ${sessionManager.getExplainMode() === "ELI5" ? "selected" : ""}>👶 Explain Like I'm 10</option>
            <option value="Exam" ${sessionManager.getExplainMode() === "Exam" ? "selected" : ""}>📝 Exam Mode</option>
            <option value="Competitive" ${sessionManager.getExplainMode() === "Competitive" ? "selected" : ""}>⚡ Competitive Prep</option>
            <option value="Story" ${sessionManager.getExplainMode() === "Story" ? "selected" : ""}>📚 Story Mode</option>
            <option value="Analogy" ${sessionManager.getExplainMode() === "Analogy" ? "selected" : ""}>💡 Real Analogy</option>
          </select>
        </div>

        <!-- Chat History -->
        <div class="chat-history" id="chat-bubble-container">
          <div class="msg bubble assistant">
            <p>Hello! I am your local AI study companion. ${activeConcept ? `I see you are learning about **${activeConcept.replace("-", " ")}**. How can I help you today?` : "What concept would you like to explore?"}</p>
          </div>
          ${sessionManager.getHistory().map(msg => `
            <div class="msg bubble ${msg.role}">
              <p>${msg.content}</p>
            </div>
          `).join("")}
        </div>

        <!-- Suggestions -->
        <div class="suggestions-chips-container">
          <button class="chip-prompt">Explain chemically</button>
          <button class="chip-prompt">Give practical examples</button>
          <button class="chip-prompt">Generate a short quiz</button>
        </div>

        <!-- Input Bar -->
        <div class="chat-input-bar">
          <button class="attachment-btn" id="btn-camera" title="Upload diagram">📷</button>
          <input type="text" id="chat-text-input" placeholder="Ask anything about the topic..." />
          <button class="voice-btn" id="btn-voice-input" title="Voice Search">🎤</button>
          <button class="send-btn" id="btn-send-message">➔</button>
        </div>
      </div>
    `;

    // Mode Selector change
    container.querySelector("#tutor-explain-mode").addEventListener("change", (e) => {
      sessionManager.setExplainMode(e.target.value);
    });

    // Suggested Chips handlers
    container.querySelectorAll(".chip-prompt").forEach(chip => {
      chip.addEventListener("click", () => {
        const text = chip.textContent;
        sendMessage(text);
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
        // Mocking Speech recognition
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
      sendMessage("[Simulated Image Upload: Diagram of electrolysis of water] Explain this diagram.");
    });
  }

  async function sendMessage(text) {
    const bubbleContainer = container.querySelector("#chat-bubble-container");
    if (!bubbleContainer) return;

    // Append User Bubble
    const userDiv = document.createElement("div");
    userDiv.className = "msg bubble user";
    userDiv.innerHTML = `<p>${text}</p>`;
    bubbleContainer.appendChild(userDiv);
    bubbleContainer.scrollTop = bubbleContainer.scrollHeight;

    // Append Assistant Bubble
    const assistantDiv = document.createElement("div");
    assistantDiv.className = "msg bubble assistant typing";
    assistantDiv.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
    bubbleContainer.appendChild(assistantDiv);
    bubbleContainer.scrollTop = bubbleContainer.scrollHeight;

    // Call orchestrator
    let textBuffer = "";
    await aiOrchestrator.handleQuery(text, (token) => {
      if (assistantDiv.classList.contains("typing")) {
        assistantDiv.classList.remove("typing");
        assistantDiv.innerHTML = "";
      }
      textBuffer += token;
      assistantDiv.innerHTML = `<p>${textBuffer}</p>`;
      bubbleContainer.scrollTop = bubbleContainer.scrollHeight;
    });

    // Text to Speech feature
    accessibilityManager.speak(textBuffer.replace(/[#*`]/g, ""));
  }

  render();
}
