"use client";

import { useState } from "react";
import type { Approval, ApprovalStatus, Agent } from "@/lib/types";
import { EmptyState } from "@/components/ui";
import { ApprovalCard } from "./ApprovalCard";

interface ApprovalQueueProps {
  initialApprovals: Approval[];
  agents: Agent[];
}

export function ApprovalQueue({ initialApprovals, agents }: ApprovalQueueProps) {
  const [approvals, setApprovals] = useState<Approval[]>(initialApprovals);

  function updateStatus(id: string, status: ApprovalStatus) {
    setApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  }

  const handleApprove = (id: string) => updateStatus(id, "approved");
  const handleReject = (id: string) => updateStatus(id, "rejected");

  const getAgentName = (id: string) => agents.find((a) => a.id === id)?.name;

  const pending = approvals.filter((a) => a.status === "pending");
  const reviewed = approvals.filter((a) => a.status !== "pending");

  return (
    <div className="space-y-8">
      {/* Pending section */}
      <section>
        <h2 className="font-heading text-lg font-medium text-text-primary mb-4">
          Pending
        </h2>
        {pending.length === 0 ? (
          <EmptyState
            title="All caught up"
            description="No pending approvals"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {pending.map((approval) => (
              <ApprovalCard
                key={approval.id}
                approval={approval}
                agentName={getAgentName(approval.requestedBy)}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        )}
      </section>

      {/* Reviewed section */}
      {reviewed.length > 0 && (
        <section className="opacity-60">
          <h2 className="font-heading text-lg font-medium text-text-primary mb-4">
            Reviewed
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {reviewed.map((approval) => (
              <ApprovalCard
                key={approval.id}
                approval={approval}
                agentName={getAgentName(approval.requestedBy)}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ApprovalQueue;
