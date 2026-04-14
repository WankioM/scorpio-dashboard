import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/features/PageHeader";
import { AgentCard } from "@/components/features/AgentCard";
import { agents } from "@/lib/mock-data";

export default function TeamPage() {
  return (
    <PageShell>
      <PageHeader title="Team" description="All agents" />

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </PageShell>
  );
}
