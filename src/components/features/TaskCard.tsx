import Link from "next/link";
import { cn } from "@/lib/cn";
import { Avatar, Badge, Card } from "@/components/ui";
import type { Task } from "@/lib/types";
import { getAgentForTask } from "@/lib/helpers";

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
  className?: string;
}

export function TaskCard({ task, showAssignee = false, className }: TaskCardProps) {
  const agent = showAssignee ? getAgentForTask(task.id) : undefined;

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

        {showAssignee && agent && (
          <div className="flex shrink-0 items-center gap-2">
            <Avatar name={agent.name} src={agent.avatar} size="sm" />
            <span className="text-xs text-text-secondary font-body">
              {agent.name}
            </span>
          </div>
        )}
      </Card>
    </Link>
  );
}

export default TaskCard;
