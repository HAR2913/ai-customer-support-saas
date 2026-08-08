"use client";

import { useEffect, useRef, useState } from "react";
import { chatWithAI } from "@/services/api";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function handleSend() {
    if (!message.trim() || loading) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const result = await chatWithAI(userMessage);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            result.ai_response ||
            result.response ||
            "No response received.",
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center p-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4">
          <h1 className="text-2xl font-bold">
            🤖 AI Customer Support
          </h1>
        </div>

        {/* Messages */}
        <div className="h-[550px] overflow-y-auto p-6 bg-gray-50 space-y-4">

          {messages.length === 0 && (
            <p className="text-gray-500 text-center mt-20">
              Ask anything about your uploaded documents.
            </p>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-5 py-3 ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white border text-black"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border rounded-2xl px-5 py-3 text-gray-700">
                🤖 AI is typing...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />

        </div>

        {/* Input */}
        <div className="border-t bg-white p-4 flex gap-3">

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            placeholder="Ask your AI assistant..."
            className="flex-1 rounded-xl border border-gray-300 bg-white text-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 rounded-xl transition"
          >
            {loading ? "..." : "Send"}
          </button>

        </div>

      </div>
    </main>
  );
}