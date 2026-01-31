"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const ChatbotPage = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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
      {/* ✅ Floating Button (your design) */}
      <button
        onClick={() => setOpen((p) => !p)}
        className={[
          "relative h-14 w-14 rounded-full flex items-center justify-center",
          "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600",
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

      {open && (
        <div className="mt-4 w-80 h-125 bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-white px-4 py-3 font-semibold">
            AI Chatbot
          </div>

          {/* ✅ Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.length === 0 && !loading && (
              <div className="text-center text-white/45 mt-10">
                Message бичээд эхлээрэй 👋
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={[
                    "max-w-[82%] rounded-2xl px-3 py-2 whitespace-pre-wrap",
                    m.role === "user"
                      ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-[0_10px_26px_rgba(79,70,229,0.25)]"
                      : "bg-white/8 border border-white/10 text-white/85",
                  ].join(" ")}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/8 border border-white/10 rounded-2xl px-3 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-2 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message бич..."
              disabled={loading}
              className={[
                "flex-1 h-10 rounded-xl px-3 text-sm outline-none",
                "bg-white/5 border border-white/15 text-white placeholder:text-white/35",
                "focus:border-white/30 transition",
              ].join(" ")}
            />

            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className={[
                "h-10 px-4 rounded-xl text-sm font-semibold text-white",
                "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600",
                "shadow-[0_10px_26px_rgba(79,70,229,0.25)]",
                "hover:brightness-110 active:scale-[0.98] transition",
                "disabled:opacity-50 disabled:hover:brightness-100 disabled:active:scale-100",
                "flex items-center gap-2",
              ].join(" ")}
            >
              <Send className="h-4 w-4" />
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
