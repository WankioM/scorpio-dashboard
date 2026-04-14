export const dynamic = "force-dynamic";

import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/features/PageHeader";
import { DeliverablesList } from "@/components/features/DeliverablesList";
import { api } from "@/lib/api";
import type { IAgent, IDeliverable } from "@/types/api";

export default async function DeliverablesPage() {
  const [deliverables, agents] = await Promise.all([
    api.getSafe<IDeliverable[]>("/deliverables", []),
    api.getSafe<IAgent[]>("/agents", []),
  ]);

  return (
    <PageShell>
      <PageHeader
        title="Deliverables"
        description="All files and outputs across tasks"
      />
      <div className="mt-6">
        <DeliverablesList deliverables={deliverables} agents={agents} />
      </div>
    </PageShell>
  );
}
