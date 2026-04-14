import { cn } from "@/lib/cn";
import { formatRelativeTime } from "@/lib/helpers";
import type { Message } from "@/lib/types";

interface ChatBubbleProps {
  message: Message;
  agentName: string;
}

export function ChatBubble({ message, agentName }: ChatBubbleProps) {
  const isAgent = message.role === "agent";

  return (
    <div
      className={cn(
        "flex flex-col max-w-[80%]",
        isAgent ? "items-start" : "items-end ml-auto"
      )}
    >
      <div
        className={cn(
          "p-4 text-sm font-body text-text-primary",
          isAgent
            ? "rounded-2xl rounded-tl-md bg-bg-surface"
            : "rounded-2xl rounded-tr-md bg-accent/10"
        )}
      >
        {message.content}
      </div>
      <span className="mt-1 text-xs text-text-secondary font-body">
        {isAgent ? agentName : "You"} &middot; {formatRelativeTime(message.timestamp)}
      </span>
    </div>
  );
}

export default ChatBubble;
