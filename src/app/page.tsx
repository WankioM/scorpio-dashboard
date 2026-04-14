export const dynamic = "force-dynamic";

import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/features/PageHeader";
import { StatCard } from "@/components/features/StatCard";
import { TaskCard } from "@/components/features/TaskCard";
import { Poller } from "@/components/ui/Poller";
import { Avatar, Badge, Card, StatusDot } from "@/components/ui";
import { api } from "@/lib/api";
import type { IAgent, ITask, IApproval, IDeliverable } from "@/types/api";

export default async function HomePage() {
  const [agents, tasks, approvals, deliverables] = await Promise.all([
    api.getSafe<IAgent[]>("/agents", []),
    api.getSafe<ITask[]>("/tasks", []),
    api.getSafe<IApproval[]>("/approvals", []),
    api.getSafe<IDeliverable[]>("/deliverables", []),
  ]);

  const activeTasks = tasks.filter((t) => t.status === "active");
  const pendingApprovals = approvals.filter((a) => a.status === "pending");
  const onlineAgents = agents.filter(
    (a) => a.status === "online" || a.status === "busy"
  );
  const totalDeliverables = deliverables.length;

  const recentTasks = tasks
    .filter((t) => t.status === "active" || t.status === "pending")
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

  const topApprovals = pendingApprovals.slice(0, 3);

  const getAgentById = (id: string) => agents.find((a) => a.id === id);

  return (
    <PageShell>
      <Poller interval={30000} />
      <PageHeader title="Overview" description="Snapshot of active work" />

      {/* Row 1: Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Tasks" value={activeTasks.length} href="/tasks" />
        <StatCard
          label="Pending Approvals"
          value={pendingApprovals.length}
          href="/approvals"
        />
        <StatCard
          label="Team Online"
          value={onlineAgents.length}
          href="/team"
        />
        <StatCard
          label="Deliverables"
          value={totalDeliverables}
          href="/deliverables"
        />
      </div>

      {/* Row 2: Recent Tasks + Pending Approvals */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: Recent Tasks */}
        <Card>
          <h2 className="font-heading text-lg font-semibold text-text-primary mb-4">
            Recent Tasks
          </h2>
          <div className="flex flex-col gap-3">
            {recentTasks.map((task) => {
              const agent = getAgentById(task.assigneeId);
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
        </Card>

        {/* Right: Pending Approvals */}
        <Card>
          <h2 className="font-heading text-lg font-semibold text-text-primary mb-4">
            Pending Approvals
          </h2>
          <div className="flex flex-col gap-3">
            {topApprovals.map((approval) => {
              const agent = getAgentById(approval.requestedBy);
              return (
                <Link
                  key={approval.id}
                  href="/approvals"
                  className="flex items-center justify-between rounded-lg border border-border bg-bg-depth px-4 py-3 transition-colors hover:border-accent"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-text-primary font-heading truncate">
                      {approval.title}
                    </p>
                    {agent && (
                      <p className="text-xs text-text-secondary font-body mt-0.5">
                        by {agent.name}
                      </p>
                    )}
                  </div>
                  <Badge variant="warning" className="shrink-0 ml-3">
                    {approval.status}
                  </Badge>
                </Link>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Row 3: Team Status */}
      <div className="mt-8">
        <h2 className="font-heading text-lg font-semibold text-text-primary mb-4">
          Team Status
        </h2>
        <div className="flex flex-wrap gap-4">
          {agents.map((agent) => (
            <Link
              key={agent.id}
              href={`/team/${agent.id}`}
              className="flex items-center gap-2 rounded-lg border border-border bg-bg-surface px-3 py-2 transition-colors hover:border-accent"
            >
              <Avatar name={agent.name} src={agent.avatar} size="sm" />
              <span className="text-sm font-body text-text-primary">
                {agent.name}
              </span>
              <StatusDot status={agent.status} />
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
