"use client";

import { useState, useMemo } from "react";
import type { Task, Agent } from "@/lib/types";
import { FilterBar } from "./FilterBar";
import { KanbanColumn } from "./KanbanColumn";

interface TaskBoardProps {
  tasks: Task[];
  agents: Agent[];
}

export function TaskBoard({ tasks, agents }: TaskBoardProps) {
  const [filters, setFilters] = useState({ agent: "all", priority: "all" });

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      if (filters.agent !== "all" && t.assigneeId !== filters.agent) return false;
      if (filters.priority !== "all" && t.priority !== filters.priority) return false;
      return true;
    });
  }, [tasks, filters]);

  const active = filtered.filter((t) => t.status === "active");
  const pending = filtered.filter((t) => t.status === "pending");
  const completed = filtered.filter((t) => t.status === "completed");

  return (
    <div className="space-y-6">
      <FilterBar
        agents={agents}
        onFilterChange={setFilters}
        agentValue={filters.agent}
        priorityValue={filters.priority}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <KanbanColumn title="Active" tasks={active} agents={agents} />
        <KanbanColumn title="Pending" tasks={pending} agents={agents} />
        <KanbanColumn title="Completed" tasks={completed} agents={agents} />
      </div>
    </div>
  );
}

export default TaskBoard;
