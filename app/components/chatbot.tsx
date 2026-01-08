"use client";

import { useState } from "react";

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
      <button
        onClick={() => setOpen((p) => !p)}
        className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 hover:opacity-90 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl"
      >
        💬
      </button>

      {open && (
        <div className="mt-4 w-80 h-125 bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-white px-4 py-3 font-semibold">
            AI Chatbot
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 mt-6">
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
                  className={`max-w-[80%] rounded-lg px-3 py-2 whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 rounded-lg px-3 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
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
              className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-white px-4 rounded-lg text-sm disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
