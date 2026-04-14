"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { StatusDot } from "@/components/ui/StatusDot";
import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import type { Agent, Message } from "@/lib/types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

interface ChatConversationProps {
  agent: Agent;
  initialMessages: Message[];
}

export function ChatConversation({ agent, initialMessages }: ChatConversationProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(async (text: string) => {
    const userMsg: Message = {
      id: crypto.randomUUID(),
      agentId: agent.id,
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setThinking(true);

    try {
      const res = await fetch(`${API_BASE}/chat/threads/${agent.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });
      const data = await res.json();

      if (data.agentReply) {
        setMessages((prev) => [
          ...prev,
          {
            id: data.agentReply.id,
            agentId: agent.id,
            role: "agent" as const,
            content: data.agentReply.content,
            timestamp: data.agentReply.timestamp,
          },
        ]);
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setThinking(false);
    }
  }, [agent.id]);

  return (
    <div className="flex h-[calc(100vh-0px)] flex-col">
      {/* Top bar */}
      <div className="shrink-0 border-b border-border bg-bg-page px-6 py-4">
        <div className="flex items-center gap-3">
          <Avatar name={agent.name} src={agent.avatar} size="md" />
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-medium text-text-primary">
              {agent.name}
            </h1>
            <StatusDot status={agent.status} />
          </div>
          <span className="text-sm text-text-secondary font-body">
            {agent.role}
          </span>
        </div>
      </div>

      {/* Message area */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-4">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} agentName={agent.name} />
        ))}
        {thinking && (
          <div className="flex items-center gap-2 text-sm text-text-secondary font-body">
            <span className="animate-pulse">{agent.name} is thinking...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <ChatInput agentName={agent.name} onSend={handleSend} />
    </div>
  );
}

export default ChatConversation;
