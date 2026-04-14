import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/features/PageHeader";
import { DeliverableRow } from "@/components/features/DeliverableRow";
import { Avatar, Badge, Card, EmptyState } from "@/components/ui";
import { formatRelativeTime } from "@/lib/helpers";
import { api, ApiError } from "@/lib/api";
import type { ITask, IAgent, IDeliverable } from "@/types/api";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "accent";

const statusVariant: Record<string, BadgeVariant> = {
  active: "accent",
  pending: "warning",
  completed: "success",
};

const priorityVariant: Record<string, BadgeVariant> = {
  low: "default",
  medium: "info",
  high: "warning",
  critical: "error",
};

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;

  let task: ITask;
  try {
    task = await api.get<ITask>(`/tasks/${taskId}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return (
        <PageShell>
          <EmptyState title="Task not found" description="This task does not exist or may have been removed." />
        </PageShell>
      );
    }
    throw err;
  }

  let assignee: IAgent | undefined;
  try {
    assignee = await api.get<IAgent>(`/agents/${task.assigneeId}`);
  } catch {
    assignee = undefined;
  }

  const deliverables = await api.get<IDeliverable[]>(
    `/deliverables?taskId=${taskId}`
  );

  return (
    <PageShell>
      <PageHeader title={task.title} description="Task Details" />

      <Card className="mt-6 space-y-5">
        {/* Status & Priority */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-body text-text-secondary">Status</span>
            <Badge variant={statusVariant[task.status] ?? "default"}>
              {task.status}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-body text-text-secondary">Priority</span>
            <Badge variant={priorityVariant[task.priority] ?? "default"}>
              {task.priority}
            </Badge>
          </div>
        </div>

        {/* Assignee */}
        {assignee && (
          <div className="flex items-center gap-3">
            <span className="text-sm font-body text-text-secondary">Assignee</span>
            <Link
              href={`/team/${assignee.id}`}
              className="flex items-center gap-2 transition-colors hover:text-accent"
            >
              <Avatar name={assignee.name} src={assignee.avatar} size="sm" />
              <span className="text-sm font-body text-text-primary">{assignee.name}</span>
            </Link>
          </div>
        )}

        {/* Project */}
        {task.project && (
          <div className="flex items-center gap-3">
            <span className="text-sm font-body text-text-secondary">Project</span>
            <span className="text-sm font-body text-text-primary">{task.project}</span>
          </div>
        )}

        {/* Dates */}
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-body text-text-secondary">Created</span>
            <span className="text-sm font-body text-text-primary">
              {formatRelativeTime(task.createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-body text-text-secondary">Updated</span>
            <span className="text-sm font-body text-text-primary">
              {formatRelativeTime(task.updatedAt)}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm font-body leading-relaxed text-text-primary">
          {task.description}
        </p>
      </Card>

      {/* Deliverables */}
      <section className="mt-8">
        <h2 className="font-heading text-lg font-semibold text-text-primary">
          Related Deliverables
        </h2>

        {deliverables.length > 0 ? (
          <div className="mt-4 space-y-3">
            {deliverables.map((d) => (
              <DeliverableRow key={d.id} deliverable={d} agentName={assignee?.name} />
            ))}
          </div>
        ) : (
          <EmptyState title="No deliverables yet" className="mt-4" />
        )}
      </section>
    </PageShell>
  );
}
