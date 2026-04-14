"use client";

import { useState, useCallback } from "react";
import type { Approval, ApprovalStatus, Agent } from "@/lib/types";
import { EmptyState } from "@/components/ui";
import { ApprovalCard } from "./ApprovalCard";
import { ApprovalViewer } from "./ApprovalViewer";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

interface ApprovalQueueProps {
  initialApprovals: Approval[];
  agents: Agent[];
}

export function ApprovalQueue({ initialApprovals, agents }: ApprovalQueueProps) {
  const [approvals, setApprovals] = useState<Approval[]>(initialApprovals);
  const [viewing, setViewing] = useState<Approval | null>(null);

  const handleStatusChange = useCallback(
    async (id: string, status: ApprovalStatus) => {
      setApprovals((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
      // Also update the viewer if it's open
      setViewing((prev) =>
        prev?.id === id ? { ...prev, status } : prev
      );

      // Persist to backend
      try {
        await fetch(`${API_BASE}/approvals/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });
      } catch (err) {
        console.error("Failed to persist approval status:", err);
      }
    },
    []
  );

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
                onStatusChange={handleStatusChange}
                onClick={() => setViewing(approval)}
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
                onStatusChange={handleStatusChange}
                onClick={() => setViewing(approval)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Viewer modal */}
      {viewing && (
        <ApprovalViewer
          approval={viewing}
          agentName={getAgentName(viewing.requestedBy)}
          onClose={() => setViewing(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}

export default ApprovalQueue;
