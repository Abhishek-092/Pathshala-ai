import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Send, ArrowRight, Lightbulb, Compass, Award } from "lucide-react";
import { Shell } from "../../components/layout/Shell";
import { aiOrchestrator } from "../../modules/ai/Orchestrator";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const AiTutor: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conceptId = searchParams.get("conceptId") || "chem-reactions";

  useEffect(() => {
    // Add default initial greeting
    setMessages([
      { role: "assistant", content: `Hello! I am your offline AI tutor. How can I help you master ${conceptId.replace("-", " ")} today?` }
    ]);
  }, [conceptId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    setInputText("");
    
    const userMsg: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    let assistantResponse = "";
    try {
      await aiOrchestrator.handleQuery(text, (token) => {
        setIsTyping(false);
        assistantResponse += token;
        
        setMessages((prev) => {
          const next = [...prev];
          if (next.length > 0 && next[next.length - 1].role === "assistant") {
            next[next.length - 1].content = assistantResponse;
          } else {
            next.push({ role: "assistant", content: assistantResponse });
          }
          return next;
        });
      });
    } catch (e) {
      console.error(e);
      setIsTyping(false);
    }
  };

  const handleChip = (promptTitle: string) => {
    handleSend(`Explain ${conceptId.replace("-", " ")} using: ${promptTitle}`);
  };

  return (
    <Shell>
      <div className="pb-32 max-w-[1280px] mx-auto">
        <section className="flex flex-col items-center mb-12">
          <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6">
            <div className="relative z-10 w-full h-full flex items-center justify-center animate-float">
              <img className="w-40 h-40 md:w-52 md:h-52 drop-shadow-2xl object-contain" src="/tutor-avatar.svg" alt="AI companion" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-center text-slate-800 dark:text-white font-headline mb-2">Hello, Guest. What shall we master today?</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm text-center max-w-lg">I'm your Pathshala AI Tutor. I can explain complex concepts, visualize data, or help you practice for your upcoming finals.</p>
        </section>

        <section className="mb-12">
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            <button onClick={() => handleChip("Explain Simply")} className="flex-shrink-0 w-48 p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-left hover:border-indigo-600/30 active:scale-95 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 mb-4">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-white font-headline mb-1">Explain Simply</h3>
              <p className="text-[11px] text-slate-400">Break down reactions like I'm 10.</p>
            </button>
            <button onClick={() => handleChip("Visual Explanation")} className="flex-shrink-0 w-48 p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-left hover:border-indigo-600/30 active:scale-95 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-white font-headline mb-1">Visual Explanation</h3>
              <p className="text-[11px] text-slate-400">Create a mental map of concepts.</p>
            </button>
            <button onClick={() => handleChip("Quiz Me")} className="flex-shrink-0 w-48 p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-left hover:border-indigo-600/30 active:scale-95 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-white font-headline mb-1">Quiz Me</h3>
              <p className="text-[11px] text-slate-400">Test my active knowledge.</p>
            </button>
          </div>
        </section>

        <section className="space-y-8 mb-32">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-6 bg-slate-50 dark:bg-slate-800/40 py-2 rounded-xl border border-slate-200/40">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            <span>Running Offline • Llama-3-Pathshala-8B</span>
          </div>

          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
              <div className={`p-5 rounded-[24px] max-w-lg text-sm shadow-sm ${msg.role === "user" ? "bg-indigo-600 text-white rounded-tr-sm" : "bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-100 rounded-tl-sm"}`}>
                {msg.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 p-5 rounded-[24px] shadow-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-100" />
                <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </section>

        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 w-full max-w-[900px] px-4 z-50">
          <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-full shadow-lg p-2 flex items-center gap-2">
            <button onClick={() => handleSend("Explain with electrochemistry diagram.")} className="w-10 h-10 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 active:scale-95">📷</button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-sm placeholder:text-slate-400 dark:text-white px-2"
              placeholder="Ask anything about the topic..."
            />
            <button onClick={() => handleSend("Define synthesis reactions.")} className="w-10 h-10 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 active:scale-95">🎤</button>
            <button onClick={() => handleSend()} className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center active:scale-95">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
};

export default AiTutor;
