"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/cn";
import type { Deliverable, Agent, DeliverableType } from "@/lib/types";
import { EmptyState } from "@/components/ui";
import { DeliverableRow } from "./DeliverableRow";

interface DeliverablesListProps {
  deliverables: Deliverable[];
  agents: Agent[];
  className?: string;
}

const deliverableTypes: DeliverableType[] = ["file", "code", "text", "image"];

export function DeliverablesList({
  deliverables,
  agents,
  className,
}: DeliverablesListProps) {
  const [agentFilter, setAgentFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");

  const uniqueProjects = useMemo(
    () => [...new Set(deliverables.map((d) => d.project))],
    [deliverables]
  );

  const filtered = useMemo(() => {
    return deliverables.filter((d) => {
      if (agentFilter !== "all" && d.agentId !== agentFilter) return false;
      if (typeFilter !== "all" && d.type !== typeFilter) return false;
      if (projectFilter !== "all" && d.project !== projectFilter) return false;
      return true;
    });
  }, [deliverables, agentFilter, typeFilter, projectFilter]);

  const selectClasses =
    "bg-bg-surface border border-border rounded-md px-3 py-2 text-sm text-text-primary font-body focus:outline-none focus:ring-1 focus:ring-accent";

  return (
    <div className={cn("space-y-4", className)}>
      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <select
          value={agentFilter}
          onChange={(e) => setAgentFilter(e.target.value)}
          className={selectClasses}
          aria-label="Filter by agent"
        >
          <option value="all">All agents</option>
          {agents.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className={selectClasses}
          aria-label="Filter by type"
        >
          <option value="all">All types</option>
          {deliverableTypes.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
          className={selectClasses}
          aria-label="Filter by project"
        >
          <option value="all">All projects</option>
          {uniqueProjects.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No deliverables found"
          description="Try adjusting your filters"
        />
      ) : (
        <div className="space-y-2">
          {filtered.map((d) => (
            <DeliverableRow key={d.id} deliverable={d} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DeliverablesList;
