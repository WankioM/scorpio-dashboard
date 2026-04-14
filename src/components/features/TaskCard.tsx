import Link from "next/link";
import { cn } from "@/lib/cn";
import { Avatar, Badge, Card } from "@/components/ui";
import type { Task } from "@/lib/types";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "accent";

const priorityVariant: Record<string, BadgeVariant> = {
  low: "default",
  medium: "info",
  high: "warning",
  critical: "error",
};

interface TaskCardProps {
  task: Task;
  showAssignee?: boolean;
  agentName?: string;
  agentAvatar?: string;
  className?: string;
}

export function TaskCard({ task, showAssignee = false, agentName, agentAvatar, className }: TaskCardProps) {
  return (
    <Link href={`/tasks/${task.id}`} className="block">
      <Card
        className={cn(
          "flex items-center gap-4 transition-colors hover:border-accent",
          className
        )}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-heading text-sm font-semibold text-text-primary truncate">
              {task.title}
            </span>
            <Badge variant={priorityVariant[task.priority] ?? "default"}>
              {task.priority}
            </Badge>
          </div>
          {task.project && (
            <p className="mt-0.5 text-xs text-text-secondary font-body truncate">
              {task.project}
            </p>
          )}
        </div>

        {showAssignee && agentName && (
          <div className="flex shrink-0 items-center gap-2">
            <Avatar name={agentName} src={agentAvatar} size="sm" />
            <span className="text-xs text-text-secondary font-body">
              {agentName}
            </span>
          </div>
        )}
      </Card>
    </Link>
  );
}

export default TaskCard;
