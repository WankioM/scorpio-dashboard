import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui";
import { TaskCard } from "./TaskCard";
import type { Task, Agent } from "@/lib/types";

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  agents?: Agent[];
  count?: number;
  className?: string;
}

export function KanbanColumn({ title, tasks, agents, count, className }: KanbanColumnProps) {
  const displayCount = count ?? tasks.length;

  const getAgent = (assigneeId: string) =>
    agents?.find((a) => a.id === assigneeId);

  return (
    <div className={cn("rounded-xl bg-bg-page p-4", className)}>
      <div className="mb-4 flex items-center gap-2">
        <h3 className="font-heading font-semibold text-text-primary">{title}</h3>
        <Badge>{displayCount}</Badge>
      </div>

      {tasks.length > 0 ? (
        <div className="flex flex-col gap-3">
          {tasks.map((task) => {
            const agent = getAgent(task.assigneeId);
            return (
              <TaskCard
                key={task.id}
                task={task}
                showAssignee
                agentName={agent?.name}
                agentAvatar={agent?.avatar}
              />
            );
          })}
        </div>
      ) : (
        <p className="py-6 text-center text-sm text-text-secondary font-body">
          No tasks
        </p>
      )}
    </div>
  );
}

export default KanbanColumn;
