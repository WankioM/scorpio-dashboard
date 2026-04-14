import { PageShell } from "@/components/layout/PageShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { ChatConversation } from "@/components/features/ChatConversation";
import { api } from "@/lib/api";
import type { IAgent, IMessage } from "@/types/api";

export default async function ChatWithAgentPage({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  const { agentId } = await params;

  let agent: IAgent;
  try {
    agent = await api.get<IAgent>(`/agents/${agentId}`);
  } catch {
    return (
      <PageShell>
        <EmptyState title="Agent not found" />
      </PageShell>
    );
  }

  const messages = await api.getSafe<IMessage[]>(
    `/chat/threads/${agentId}/messages`, []
  );

  return <ChatConversation agent={agent} initialMessages={messages} />;
}
