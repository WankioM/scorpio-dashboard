"use client";

import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

interface ChatInputProps {
  agentName: string;
  onSend: (text: string) => void;
}

export function ChatInput({ agentName, onSend }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const lineHeight = 24; // ~text-sm line height
    const maxHeight = lineHeight * 5;
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
  }, []);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
    // Reset height after clearing
    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    });
  }, [value, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="shrink-0 border-t border-border bg-bg-page p-4">
      <div className="flex items-end gap-3">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            adjustHeight();
          }}
          onKeyDown={handleKeyDown}
          placeholder={`Message ${agentName}...`}
          rows={1}
          className={cn(
            "flex-1 resize-none rounded-xl border border-border bg-bg-surface px-4 py-3",
            "font-body text-sm text-text-primary placeholder:text-text-secondary",
            "focus:outline-none focus:ring-1 focus:ring-accent"
          )}
        />
        <Button
          variant="primary"
          size="sm"
          disabled={value.trim().length === 0}
          onClick={handleSend}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default ChatInput;
