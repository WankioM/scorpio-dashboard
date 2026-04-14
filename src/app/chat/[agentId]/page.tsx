import { PageShell } from "@/components/layout/PageShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { ChatConversation } from "@/components/features/ChatConversation";
import { getAgentById, getMessages } from "@/lib/helpers";

export default async function ChatWithAgentPage({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  const { agentId } = await params;
  const agent = getAgentById(agentId);

  if (!agent) {
    return (
      <PageShell>
        <EmptyState title="Agent not found" />
      </PageShell>
    );
  }

  const messages = getMessages(agentId);

  return <ChatConversation agent={agent} initialMessages={messages} />;
}
