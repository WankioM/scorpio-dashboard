import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Avatar, Badge, Button, StatusDot, EmptyState } from "@/components/ui";
import { StatCard } from "@/components/features/StatCard";
import { TaskCard } from "@/components/features/TaskCard";
import { DeliverableRow } from "@/components/features/DeliverableRow";
import { formatRelativeTime } from "@/lib/helpers";
import { api, ApiError } from "@/lib/api";
import type { IAgent, ITask, IDeliverable } from "@/types/api";

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  const { agentId } = await params;

  let agent: IAgent;
  try {
    agent = await api.get<IAgent>(`/agents/${agentId}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return (
        <PageShell>
          <EmptyState
            title="Agent not found"
            description="The agent you're looking for doesn't exist or has been removed."
          />
        </PageShell>
      );
    }
    throw err;
  }

  const [agentTasks, deliverables] = await Promise.all([
    api.get<ITask[]>(`/tasks?assigneeId=${agentId}`),
    api.get<IDeliverable[]>(`/deliverables?agentId=${agentId}`),
  ]);

  const currentTask = agent.currentTask
    ? agentTasks.find((t) => t.id === agent.currentTask)
    : undefined;

  return (
    <PageShell>
      {/* Top section — agent profile */}
      <div className="flex items-center gap-5">
        <Avatar name={agent.name} src={agent.avatar} size="lg" />
        <div className="min-w-0 flex-1">
          <h1 className="font-heading text-2xl font-bold text-text-primary">
            {agent.name}
          </h1>
          <p className="mt-0.5 text-sm text-text-secondary font-body">
            {agent.role}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-sm text-text-secondary font-body">
              <StatusDot status={agent.status} />
              {agent.status}
            </span>
            <Badge variant="accent">{agent.model}</Badge>
            <span className="text-xs text-text-secondary font-body">
              Active {formatRelativeTime(agent.lastActive)}
            </span>
          </div>
        </div>
        <Link href={`/chat/${agent.id}`}>
          <Button variant="primary" size="sm">
            Chat with {agent.name}
          </Button>
        </Link>
      </div>

      {/* Stats row */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Tasks assigned" value={agentTasks.length} />
        <StatCard
          label="Step Budget"
          value={`${agent.stepBudgetUsed}/${agent.stepBudgetTotal}`}
        />
        {agent.correctionsCount !== undefined && (
          <StatCard label="Corrections" value={agent.correctionsCount} />
        )}
      </div>

      {/* Current Task */}
      {currentTask && (
        <section className="mt-8">
          <h2 className="font-heading text-lg font-semibold text-text-primary">
            Current Task
          </h2>
          <div className="mt-3">
            <TaskCard task={currentTask} />
          </div>
        </section>
      )}

      {/* Recent Tasks */}
      {agentTasks.length > 0 && (
        <section className="mt-8">
          <h2 className="font-heading text-lg font-semibold text-text-primary">
            Recent Tasks
          </h2>
          <div className="mt-3 flex flex-col gap-3">
            {agentTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Deliverables */}
      {deliverables.length > 0 && (
        <section className="mt-8">
          <h2 className="font-heading text-lg font-semibold text-text-primary">
            Recent Deliverables
          </h2>
          <div className="mt-3 flex flex-col gap-3">
            {deliverables.map((del) => (
              <DeliverableRow key={del.id} deliverable={del} agentName={agent.name} />
            ))}
          </div>
        </section>
      )}
    </PageShell>
  );
}
