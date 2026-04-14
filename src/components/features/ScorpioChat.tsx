"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import { Spinner } from "@/components/ui";
import type { Message } from "@/lib/types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  agentId: "scorpio",
  role: "agent",
  content: "Hey — Scorpio here. What do you need?",
  timestamp: new Date().toISOString(),
};

export function ScorpioChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, thinking]);

  const handleSend = useCallback(async (text: string) => {
    const now = new Date().toISOString();
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      agentId: "scorpio",
      role: "user",
      content: text,
      timestamp: now,
    };
    setMessages((prev) => [...prev, userMsg]);
    setThinking(true);

    try {
      const res = await fetch(`${API_BASE}/chat/threads/scorpio/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });

      const data = await res.json();

      if (data.agentReply) {
        const reply: Message = {
          id: data.agentReply.id || `agent-${Date.now()}`,
          agentId: "scorpio",
          role: "agent",
          content: data.agentReply.content,
          timestamp: data.agentReply.timestamp || new Date().toISOString(),
        };
        setMessages((prev) => [...prev, reply]);
      } else if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            agentId: "scorpio",
            role: "agent",
            content: data.error,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          agentId: "scorpio",
          role: "agent",
          content: "Connection failed. Is the API server running?",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setThinking(false);
    }
  }, []);

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform hover:scale-105 hover:bg-accent-hover active:scale-95 cursor-pointer"
        aria-label={open ? "Close chat" : "Chat with Scorpio"}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[28rem] w-[22rem] flex-col overflow-hidden rounded-2xl border border-border bg-bg-page shadow-2xl">
          {/* Header */}
          <div className="shrink-0 border-b border-border bg-bg-surface px-5 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white text-xs font-heading font-bold">
                  S
                </div>
                <div>
                  <p className="text-sm font-heading font-semibold text-text-primary">
                    Scorpio
                  </p>
                  <p className="text-xs text-text-secondary font-body">
                    Orchestrator
                  </p>
                </div>
              </div>
              {/* Expand button */}
              <a
                href="/chat/scorpio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-bg-depth hover:text-text-primary"
                aria-label="Open full chat"
                title="Open full chat"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
          >
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} agentName="Scorpio" />
            ))}
            {thinking && (
              <div className="flex items-center gap-2 text-text-secondary">
                <Spinner size="sm" />
                <span className="text-xs font-body">Scorpio is thinking...</span>
              </div>
            )}
          </div>

          {/* Input */}
          <ChatInput agentName="Scorpio" onSend={handleSend} />
        </div>
      )}
    </>
  );
}
