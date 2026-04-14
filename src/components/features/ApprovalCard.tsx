"use client";

import { cn } from "@/lib/cn";
import { Card, Badge, Avatar, Button } from "@/components/ui";
import type { Approval } from "@/lib/types";
import { getAgentById, formatRelativeTime } from "@/lib/helpers";

interface ApprovalCardProps {
  approval: Approval;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  className?: string;
}

export function ApprovalCard({
  approval,
  onApprove,
  onReject,
  className,
}: ApprovalCardProps) {
  const agent = getAgentById(approval.requestedBy);

  return (
    <Card className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-heading font-medium text-text-primary">
          {approval.title}
        </h3>
        {approval.status !== "pending" && (
          <Badge variant={approval.status === "approved" ? "success" : "error"}>
            {approval.status === "approved" ? "Approved" : "Rejected"}
          </Badge>
        )}
      </div>

      <p className="text-sm text-text-secondary font-body line-clamp-2">
        {approval.description}
      </p>

      <div className="flex items-center gap-2">
        {agent && (
          <>
            <Avatar name={agent.name} size="sm" />
            <span className="text-sm font-body text-text-primary">
              {agent.name}
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
        <div className="flex items-center gap-2 pt-1">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onApprove(approval.id)}
          >
            Approve
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReject(approval.id)}
          >
            Reject
          </Button>
        </div>
      )}
    </Card>
  );
}

export default ApprovalCard;
