import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/features/PageHeader";
import { ApprovalQueue } from "@/components/features/ApprovalQueue";
import { approvals } from "@/lib/mock-data";

export default function ApprovalsPage() {
  return (
    <PageShell>
      <PageHeader title="Approvals" description="Review queue" />
      <ApprovalQueue initialApprovals={approvals} />
    </PageShell>
  );
}
