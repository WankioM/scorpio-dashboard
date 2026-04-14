import Link from "next/link";
import { cn } from "@/lib/cn";
import { Avatar } from "@/components/ui/Avatar";
import { StatusDot } from "@/components/ui/StatusDot";
import { Badge } from "@/components/ui/Badge";
import { formatRelativeTime } from "@/lib/helpers";
import type { ChatThread, Agent } from "@/lib/types";

interface ChatListItemProps {
  thread: ChatThread;
  agent: Agent;
}

export function ChatListItem({ thread, agent }: ChatListItemProps) {
  return (
    <Link
      href={`/chat/${agent.id}`}
      className={cn(
        "flex w-full items-center gap-4 rounded-xl p-4 transition hover:bg-bg-surface"
      )}
    >
      {/* Avatar with StatusDot overlay */}
      <div className="relative shrink-0">
        <Avatar name={agent.name} src={agent.avatar} size="md" />
        <StatusDot
          status={agent.status}
          className="absolute bottom-0 right-0 ring-2 ring-bg-page"
        />
      </div>

      {/* Middle: name + last message */}
      <div className="min-w-0 flex-1">
        <p className="font-heading font-medium text-text-primary">
          {agent.name}
        </p>
        <p className="truncate text-sm text-text-secondary font-body">
          {thread.lastMessage}
        </p>
      </div>

      {/* Right: time + unread badge */}
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="text-xs text-text-secondary font-body">
          {formatRelativeTime(thread.lastMessageAt)}
        </span>
        {thread.unreadCount > 0 && (
          <Badge variant="accent">{thread.unreadCount}</Badge>
        )}
      </div>
    </Link>
  );
}

export default ChatListItem;
