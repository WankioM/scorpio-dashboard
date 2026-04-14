export const dynamic = "force-dynamic";

import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/features/PageHeader";
import { TaskBoard } from "@/components/features/TaskBoard";
import { api } from "@/lib/api";
import type { IAgent, ITask } from "@/types/api";

export default async function TasksPage() {
  const [tasks, agents] = await Promise.all([
    api.get<ITask[]>("/tasks"),
    api.get<IAgent[]>("/agents"),
  ]);

  return (
    <PageShell>
      <PageHeader title="Tasks" description="Kanban board" />
      <div className="mt-6">
        <TaskBoard tasks={tasks} agents={agents} />
      </div>
    </PageShell>
  );
}
