export const dynamic = "force-dynamic";

import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/features/PageHeader";
import { ApprovalQueue } from "@/components/features/ApprovalQueue";
import { api } from "@/lib/api";
import type { IApproval, IAgent } from "@/types/api";

export default async function ApprovalsPage() {
  const [approvals, agents] = await Promise.all([
    api.get<IApproval[]>("/approvals"),
    api.get<IAgent[]>("/agents"),
  ]);

  return (
    <PageShell>
      <PageHeader title="Approvals" description="Review queue" />
      <ApprovalQueue initialApprovals={approvals} agents={agents} />
    </PageShell>
  );
}
