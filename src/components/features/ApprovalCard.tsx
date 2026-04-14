"use client";

import { cn } from "@/lib/cn";
import { Card, Badge, Avatar, Button } from "@/components/ui";
import type { Approval, ApprovalStatus } from "@/lib/types";
import { formatRelativeTime } from "@/lib/helpers";

interface ApprovalCardProps {
  approval: Approval;
  agentName?: string;
  onStatusChange: (id: string, status: ApprovalStatus) => void;
  onClick: () => void;
  className?: string;
}

const statusBadge: Record<ApprovalStatus, { variant: "warning" | "success" | "error" | "info"; label: string }> = {
  pending: { variant: "warning", label: "Pending" },
  approved: { variant: "success", label: "Approved" },
  rejected: { variant: "error", label: "Rejected" },
  resolved: { variant: "info", label: "Resolved" },
};

export function ApprovalCard({
  approval,
  agentName,
  onStatusChange,
  onClick,
  className,
}: ApprovalCardProps) {
  const { variant, label } = statusBadge[approval.status];

  return (
    <Card
      className={cn("flex flex-col gap-3 cursor-pointer transition-colors hover:border-accent", className)}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-heading font-medium text-text-primary">
          {approval.title}
        </h3>
        <Badge variant={variant}>{label}</Badge>
      </div>

      <p className="text-sm text-text-secondary font-body line-clamp-2">
        {approval.description}
      </p>

      <div className="flex items-center gap-2">
        {agentName && (
          <>
            <Avatar name={agentName} size="sm" />
            <span className="text-sm font-body text-text-primary">
              {agentName}
            </span>
          </>
        )}
        <span className="text-xs text-text-secondary font-body ml-auto">
          {formatRelativeTime(approval.createdAt)}
        </span>
      </div>

      {approval.deliverableIds.length > 0 && (
        <Badge variant="accent">
          {approval.deliverableIds.length}{" "}
          {approval.deliverableIds.length === 1 ? "deliverable" : "deliverables"}
        </Badge>
      )}

      {approval.status === "pending" && (
        <div
          className="flex items-center gap-2 pt-1"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="primary"
            size="sm"
            onClick={() => onStatusChange(approval.id, "approved")}
          >
            Approve
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onStatusChange(approval.id, "rejected")}
          >
            Reject
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onStatusChange(approval.id, "resolved")}
          >
            Resolve
          </Button>
        </div>
      )}

      {approval.status !== "pending" && (
        <div
          className="flex items-center justify-between pt-1"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-xs text-text-secondary font-body">
            Marked as {label.toLowerCase()}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onStatusChange(approval.id, "pending")}
          >
            Undo
          </Button>
        </div>
      )}
    </Card>
  );
}

export default ApprovalCard;
