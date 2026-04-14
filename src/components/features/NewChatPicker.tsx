"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Button, StatusDot } from "@/components/ui";
import type { Agent } from "@/lib/types";

interface NewChatPickerProps {
  agents: Agent[];
  existingThreadAgentIds: string[];
}

export function NewChatPicker({ agents, existingThreadAgentIds }: NewChatPickerProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const available = agents.filter((a) => !existingThreadAgentIds.includes(a.id));

  if (available.length === 0 && !open) {
    return null;
  }

  return (
    <div>
      <Button variant="secondary" size="sm" onClick={() => setOpen((o) => !o)}>
        {open ? "Cancel" : "New conversation"}
      </Button>

      {open && (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {available.length === 0 ? (
            <p className="text-sm text-text-secondary font-body col-span-full">
              You&apos;ve chatted with every agent already.
            </p>
          ) : (
            available.map((agent) => (
              <button
                key={agent.id}
                onClick={() => router.push(`/chat/${agent.id}`)}
                className="flex items-center gap-3 rounded-lg border border-border bg-bg-surface px-4 py-3 text-left transition-colors hover:border-accent cursor-pointer"
              >
                <Avatar name={agent.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <span className="text-sm font-heading font-medium text-text-primary block truncate">
                    {agent.name}
                  </span>
                  <span className="text-xs text-text-secondary font-body block truncate">
                    {agent.role}
                  </span>
                </div>
                <StatusDot status={agent.status} />
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default NewChatPicker;
