import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/features/PageHeader";
import { ChatListItem } from "@/components/features/ChatListItem";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAgentById } from "@/lib/helpers";
import { chatThreads } from "@/lib/mock-data";

export default function ChatPage() {
  if (chatThreads.length === 0) {
    return (
      <PageShell>
        <PageHeader title="Chat" description="Talk to any agent" />
        <EmptyState title="No conversations yet" className="mt-12" />
      </PageShell>
    );
  }

  // Sort: Scorpio first, then alphabetical by agent name
  const sorted = [...chatThreads].sort((a, b) => {
    if (a.agentId === "scorpio") return -1;
    if (b.agentId === "scorpio") return 1;
    const agentA = getAgentById(a.agentId);
    const agentB = getAgentById(b.agentId);
    return (agentA?.name ?? "").localeCompare(agentB?.name ?? "");
  });

  return (
    <PageShell>
      <PageHeader title="Chat" description="Talk to any agent" />
      <div className="mt-6 flex flex-col">
        {sorted.map((thread) => {
          const agent = getAgentById(thread.agentId);
          if (!agent) return null;
          return (
            <ChatListItem key={thread.agentId} thread={thread} agent={agent} />
          );
        })}
      </div>
    </PageShell>
  );
}
