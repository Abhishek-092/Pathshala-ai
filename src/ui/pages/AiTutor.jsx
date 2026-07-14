import React, { useState, useEffect, useRef } from "react";
import { aiOrchestrator } from "../../ai/orchestrator.js";
import { sessionManager } from "../../ai/sessionManager.js";
import { accessibilityManager } from "../components/accessibility.js";

export default function AiTutor({ params }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (params.conceptId) {
      sessionManager.setActiveConcept(params.conceptId);
    }
    setMessages(sessionManager.getHistory());
  }, [params.conceptId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    setInputText("");
    
    // Add user message
    const userMsg = { role: "user", content: text };
    sessionManager.addMessage("user", text);
    setMessages([...sessionManager.getHistory()]);

    setIsTyping(true);

    let assistantResponse = "";
    await aiOrchestrator.handleQuery(text, (token) => {
      setIsTyping(false);
      assistantResponse += token;
      
      // Update assistant response bubble dynamically
      setMessages(() => {
        const hist = [...sessionManager.getHistory()];
        // If the last message is assistant, append. Else create.
        if (hist.length > 0 && hist[hist.length - 1].role === "assistant") {
          hist[hist.length - 1].content = assistantResponse;
        } else {
          hist.push({ role: "assistant", content: assistantResponse });
        }
        return hist;
      });
    });

    sessionManager.addMessage("assistant", assistantResponse);
    accessibilityManager.speak(assistantResponse.replace(/[#*`]/g, ""));
  };

  const handleChip = (promptTitle) => {
    handleSend(`Explain chemical reactions using: ${promptTitle}`);
  };

  return (
    <div className="pb-32 max-w-[1280px] mx-auto">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center mb-12">
        <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6">
          <div className="relative z-10 w-full h-full flex items-center justify-center animate-float">
            <img className="w-40 h-40 md:w-52 md:h-52 drop-shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-NVe2-Fbop9qu1Q2GOYPczqbRRxWfLfp-9SNJ4-UUoyIhEx2wdlB3kWteUQ1aQvD4OricpuXb1fgTDecgarI9viprXCe3k1BXTaRxAB01okhP3zqCE95PyMQUA96ai3KI5CsczybVYqSpHKRX-gwXpT76S2W_jp_Rw1XrDXE8tCy9rOWC_hRSzLmsHtocbtIvjDrZSZNWEmqNlUAHiNzXm6DA5CJ5FhcpRB_2Fc0QIKRIN_OaWUxcHg" alt="AI companion" />
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-center text-slate-800 dark:text-white font-headline mb-2">Hello, Sarah. What shall we master today?</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm text-center max-w-lg">I'm your Pathshala AI Tutor. I can explain complex concepts, visualize data, or help you practice for your upcoming finals.</p>
      </section>

      {/* Suggested Prompt Chips */}
      <section className="mb-12">
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          <button onClick={() => handleChip("Explain Simply")} className="chip-prompt flex-shrink-0 w-48 p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-left hover:border-indigo-600/30 active:scale-95 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined">lightbulb</span>
            </div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-white font-headline mb-1">Explain Simply</h3>
            <p className="text-[11px] text-slate-400">Break down chemical reactions like I'm 10.</p>
          </button>
          <button onClick={() => handleChip("Visual Explanation")} className="chip-prompt flex-shrink-0 w-48 p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-left hover:border-indigo-600/30 active:scale-95 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 mb-4">
              <span className="material-symbols-outlined">insights</span>
            </div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-white font-headline mb-1">Visual Explanation</h3>
            <p className="text-[11px] text-slate-400">Create a mental map of balancing reactions.</p>
          </button>
          <button onClick={() => handleChip("Quiz Me")} className="chip-prompt flex-shrink-0 w-48 p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-left hover:border-indigo-600/30 active:scale-95 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-4">
              <span className="material-symbols-outlined">quiz</span>
            </div>
            <h3 class="font-bold text-sm text-slate-800 dark:text-white font-headline mb-1">Quiz Me</h3>
            <p className="text-[11px] text-slate-400">Test my knowledge on acids & bases.</p>
          </button>
        </div>
      </section>

      {/* Dynamic Chat Messages */}
      <section className="space-y-8 mb-32">
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-6 bg-slate-50 dark:bg-slate-800/40 py-2 rounded-xl border border-slate-200/40">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
          <span>Running Offline • Llama-3-Pathshala-8B</span>
        </div>

        {messages.map((msg, idx) => {
          if (msg.role === "user") {
            return (
              <div key={idx} className="flex justify-end animate-fade-in">
                <div className="bg-primary text-white p-5 rounded-[24px] rounded-tr-sm max-w-lg text-sm shadow-sm">
                  {msg.content}
                </div>
              </div>
            );
          } else {
            return (
              <article key={idx} className="rounded-[32px] overflow-hidden bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 shadow-sm animate-fade-in">
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">psychology</span>
                    </div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Concept Explanation</span>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2 font-headline">Summary</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{msg.content}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-2 font-headline">Detailed Explanation</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">Imagine molecules are like dancers at a party. A chemical reaction occurs when they change partners to form new bonds!</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          }
        })}

        {isTyping && (
          <article className="rounded-[32px] overflow-hidden bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 shadow-sm p-8 flex items-center gap-3">
            <div className="typing-indicator"><span></span><span></span><span></span></div>
          </article>
        )}

        <div ref={messagesEndRef} />
      </section>

      {/* Input Bar */}
      <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 w-full max-w-[900px] px-4 z-50">
        <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-full shadow-lg p-2 flex items-center gap-2">
          <button onClick={() => handleSend("[Uploaded electrolysis diagram] Explain this.")} className="w-10 h-10 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 active:scale-95">📷</button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-sm placeholder:text-slate-400 dark:text-white px-2"
            placeholder="Ask anything about the topic..."
          />
          <button onClick={() => handleSend("What is combination reaction?")} className="w-10 h-10 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 active:scale-95">🎤</button>
          <button onClick={() => handleSend()} className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center active:scale-95">➔</button>
        </div>
      </div>

    </div>
  );
}
