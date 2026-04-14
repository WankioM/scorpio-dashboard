import { cn } from "@/lib/cn";
import { Badge, Card } from "@/components/ui";
import type { Deliverable, DeliverableType } from "@/lib/types";
import { formatRelativeTime } from "@/lib/helpers";
import type { DeliverableStatus } from "./DeliverableViewer";

const typeIcons: Record<DeliverableType, string> = {
  file: "\u{1F4C4}",
  code: "\u{1F4BB}",
  text: "\u{1F4DD}",
  image: "\u{1F5BC}\uFE0F",
};

const statusBadge: Record<DeliverableStatus, { variant: "default" | "success" | "error" | "info" | "warning" | "accent"; label: string }> = {
  pending: { variant: "warning", label: "Pending" },
  approved: { variant: "success", label: "Approved" },
  rejected: { variant: "error", label: "Rejected" },
  resolved: { variant: "info", label: "Resolved" },
};

interface DeliverableRowProps {
  deliverable: Deliverable;
  agentName?: string;
  status?: DeliverableStatus;
  className?: string;
  onClick?: () => void;
}

export function DeliverableRow({ deliverable, agentName, status = "pending", className, onClick }: DeliverableRowProps) {
  const { variant, label } = statusBadge[status];

  return (
    <Card
      className={cn(
        "flex items-center gap-3 px-4 py-3",
        onClick && "cursor-pointer transition-colors hover:border-accent",
        className
      )}
      onClick={onClick}
    >
      <span className="shrink-0 text-lg" role="img" aria-label={deliverable.type}>
        {typeIcons[deliverable.type]}
      </span>

      <div className="min-w-0 flex-1">
        <span className="font-heading text-sm font-semibold text-text-primary truncate block">
          {deliverable.name}
        </span>
        {agentName && (
          <span className="text-xs text-text-secondary font-body">
            {agentName}
          </span>
        )}
      </div>

      <Badge variant={variant} className="shrink-0">
        {label}
      </Badge>

      {deliverable.project && (
        <Badge variant="accent" className="shrink-0">
          {deliverable.project}
        </Badge>
      )}

      <span className="shrink-0 text-xs text-text-secondary font-body">
        {formatRelativeTime(deliverable.createdAt)}
      </span>
    </Card>
  );
}

export default DeliverableRow;
