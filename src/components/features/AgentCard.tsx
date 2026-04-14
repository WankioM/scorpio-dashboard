import Link from "next/link";
import { cn } from "@/lib/cn";
import { Avatar, Badge, Card, ProgressBar, StatusDot } from "@/components/ui";
import type { Agent } from "@/lib/types";
import { formatRelativeTime } from "@/lib/helpers";

interface AgentCardProps {
  agent: Agent;
  className?: string;
}

export function AgentCard({ agent, className }: AgentCardProps) {
  const budgetPercent =
    agent.stepBudgetTotal > 0
      ? Math.round((agent.stepBudgetUsed / agent.stepBudgetTotal) * 100)
      : 0;

  return (
    <Link href={`/team/${agent.id}`} className="block">
      <Card className={cn("flex flex-col gap-3 transition-colors hover:border-accent", className)}>
        {/* Top row: avatar + identity */}
        <div className="flex items-center gap-3">
          <Avatar name={agent.name} src={agent.avatar} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-heading text-base font-semibold text-text-primary truncate">
                {agent.name}
              </span>
              <StatusDot status={agent.status} />
            </div>
            <p className="text-sm text-text-secondary font-body truncate">
              {agent.role}
            </p>
          </div>
          <Badge variant="accent" className="shrink-0">{agent.model}</Badge>
        </div>

        {/* Current task */}
        <p className="text-sm text-text-secondary font-body truncate">
          {agent.currentTask ? `Working on: ${agent.currentTask}` : "Idle"}
        </p>

        {/* Step budget */}
        <div className="flex items-center gap-2">
          <ProgressBar
            value={budgetPercent}
            variant={budgetPercent > 80 ? "warning" : "accent"}
          />
          <span className="shrink-0 text-xs text-text-secondary font-mono">
            {agent.stepBudgetUsed}/{agent.stepBudgetTotal}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-text-secondary font-body">
          <span>Active {formatRelativeTime(agent.lastActive)}</span>
          {agent.correctionsCount !== undefined && (
            <Badge variant="warning">{agent.correctionsCount} corrections</Badge>
          )}
        </div>
      </Card>
    </Link>
  );
}

export default AgentCard;
