"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, X, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const ChatbotPage = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch("/api/text-to-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat: userMessage }),
      });

      const data = await response.json();

      if (data?.err) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Error: ${data.err}` },
        ]);
      } else if (data?.text) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.text },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Error: ${err?.message || err}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className={[
            "relative h-14 w-14 rounded-full flex items-center justify-center",
            "bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600",
            "text-white",
            "shadow-[0_18px_55px_rgba(99,102,241,0.45)]",
            "border border-white/15",
            "hover:brightness-110 hover:scale-105",
            "active:scale-95 transition-all duration-200",
          ].join(" ")}
          aria-label="Open chatbot"
        >
          <Bot className="h-6 w-6" />
          <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/20" />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="absolute bottom-0 right-0 w-74 h-100 bg-black/95 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-white/10">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
                <p className="text-white/70 text-xs">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.length === 0 && !loading && (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="w-16 h-16 rounded-full bg-linear-to-r from-blue-600/20 to-violet-600/20 flex items-center justify-center mb-4">
                  <Bot className="w-8 h-8 text-blue-400" />
                </div>
                <h4 className="text-white font-medium mb-2">Сайн байна уу!</h4>
                <p className="text-white/50 text-sm">
                  Би таны AI туслах. Асуултаа бичээд эхлээрэй.
                </p>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={[
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap",
                    m.role === "user"
                      ? "bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 text-white rounded-br-md"
                      : "bg-white/10 border border-white/10 text-white/90 rounded-bl-md",
                  ].join(" ")}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 border border-white/10 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <div
                      className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10 bg-black/50">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Асуултаа бичнэ үү..."
                disabled={loading}
                className={[
                  "flex-1 h-11 rounded-xl px-4 text-sm outline-none",
                  "bg-white/5 border border-white/15 text-white placeholder:text-white/40",
                  "focus:border-blue-500/50 focus:bg-white/10 transition",
                  "disabled:opacity-50",
                ].join(" ")}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className={[
                  "h-11 w-11 rounded-xl flex items-center justify-center",
                  "bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600",
                  "hover:brightness-110 active:scale-95 transition",
                  "disabled:opacity-40 disabled:hover:brightness-100 disabled:active:scale-100",
                ].join(" ")}
              >
                <Send className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
