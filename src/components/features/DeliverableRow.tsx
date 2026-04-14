import { cn } from "@/lib/cn";
import { Badge, Card } from "@/components/ui";
import type { Deliverable, DeliverableType } from "@/lib/types";
import { getAgentById, formatRelativeTime } from "@/lib/helpers";

const typeIcons: Record<DeliverableType, string> = {
  file: "\u{1F4C4}",
  code: "\u{1F4BB}",
  text: "\u{1F4DD}",
  image: "\u{1F5BC}\uFE0F",
};

interface DeliverableRowProps {
  deliverable: Deliverable;
  className?: string;
}

export function DeliverableRow({ deliverable, className }: DeliverableRowProps) {
  const agent = getAgentById(deliverable.agentId);

  return (
    <Card className={cn("flex items-center gap-3 px-4 py-3", className)}>
      <span className="shrink-0 text-lg" role="img" aria-label={deliverable.type}>
        {typeIcons[deliverable.type]}
      </span>

      <div className="min-w-0 flex-1">
        <span className="font-heading text-sm font-semibold text-text-primary truncate block">
          {deliverable.name}
        </span>
        {agent && (
          <span className="text-xs text-text-secondary font-body">
            {agent.name}
          </span>
        )}
      </div>

      <Badge variant="accent" className="shrink-0">
        {deliverable.project}
      </Badge>

      <span className="shrink-0 text-xs text-text-secondary font-body">
        {formatRelativeTime(deliverable.createdAt)}
      </span>
    </Card>
  );
}

export default DeliverableRow;
