export const dynamic = "force-dynamic";

import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/features/PageHeader";
import { ChatListItem } from "@/components/features/ChatListItem";
import { NewChatPicker } from "@/components/features/NewChatPicker";
import { api } from "@/lib/api";
import type { IAgent, IChatThread } from "@/types/api";

export default async function ChatPage() {
  const [chatThreads, agents] = await Promise.all([
    api.getSafe<IChatThread[]>("/chat/threads", []),
    api.getSafe<IAgent[]>("/agents", []),
  ]);

  const getAgentById = (id: string) => agents.find((a) => a.id === id);
  const threadAgentIds = chatThreads.map((t) => t.agentId);

  return (
    <PageShell>
      <div className="flex items-center justify-between">
        <PageHeader title="Chat" description="Talk to any agent" />
        <NewChatPicker agents={agents} existingThreadAgentIds={threadAgentIds} />
      </div>

      <div className="mt-6 flex flex-col">
        {chatThreads.map((thread) => {
          const agent = getAgentById(thread.agentId);
          if (!agent) return null;
          return (
            <ChatListItem key={thread.agentId} thread={thread} agent={agent} />
          );
        })}
        {chatThreads.length === 0 && (
          <p className="text-center text-sm text-text-secondary font-body py-12">
            No conversations yet — start one above.
          </p>
        )}
      </div>
    </PageShell>
  );
}
