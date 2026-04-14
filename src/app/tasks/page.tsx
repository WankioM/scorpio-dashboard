import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/features/PageHeader";
import { TaskBoard } from "@/components/features/TaskBoard";
import { tasks, agents } from "@/lib/mock-data";

export default function TasksPage() {
  return (
    <PageShell>
      <PageHeader title="Tasks" description="Kanban board" />
      <div className="mt-6">
        <TaskBoard tasks={tasks} agents={agents} />
      </div>
    </PageShell>
  );
}
