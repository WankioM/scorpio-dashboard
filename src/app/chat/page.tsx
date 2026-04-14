export const dynamic = "force-dynamic";

import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/features/PageHeader";
import { ChatListItem } from "@/components/features/ChatListItem";
import { EmptyState } from "@/components/ui/EmptyState";
import { api } from "@/lib/api";
import type { IAgent, IChatThread } from "@/types/api";

export default async function ChatPage() {
  const [chatThreads, agents] = await Promise.all([
    api.get<IChatThread[]>("/chat/threads"),
    api.get<IAgent[]>("/agents"),
  ]);

  if (chatThreads.length === 0) {
    return (
      <PageShell>
        <PageHeader title="Chat" description="Talk to any agent" />
        <EmptyState title="No conversations yet" className="mt-12" />
      </PageShell>
    );
  }

  const getAgentById = (id: string) => agents.find((a) => a.id === id);

  return (
    <PageShell>
      <PageHeader title="Chat" description="Talk to any agent" />
      <div className="mt-6 flex flex-col">
        {chatThreads.map((thread) => {
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
