import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/features/PageHeader";
import { DeliverablesList } from "@/components/features/DeliverablesList";
import { deliverables, agents } from "@/lib/mock-data";

export default function DeliverablesPage() {
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
