"use client";

import { cn } from "@/lib/cn";
import type { Agent } from "@/lib/types";

interface FilterBarProps {
  agents: Agent[];
  onFilterChange: (filters: { agent: string; priority: string }) => void;
  agentValue?: string;
  priorityValue?: string;
  className?: string;
}

export function FilterBar({
  agents,
  onFilterChange,
  agentValue = "all",
  priorityValue = "all",
  className,
}: FilterBarProps) {
  const selectClasses =
    "bg-bg-surface border border-border rounded-md px-3 py-2 text-sm text-text-primary font-body focus:outline-none focus:ring-1 focus:ring-accent";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <select
        value={agentValue}
        onChange={(e) =>
          onFilterChange({ agent: e.target.value, priority: priorityValue })
        }
        className={selectClasses}
        aria-label="Filter by agent"
      >
        <option value="all">All Agents</option>
        {agents.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>

      <select
        value={priorityValue}
        onChange={(e) =>
          onFilterChange({ agent: agentValue, priority: e.target.value })
        }
        className={selectClasses}
        aria-label="Filter by priority"
      >
        <option value="all">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>
    </div>
  );
}

export default FilterBar;
