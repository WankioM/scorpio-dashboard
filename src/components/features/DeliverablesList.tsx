"use client";

import { useState, useMemo, useCallback } from "react";
import { cn } from "@/lib/cn";
import type { Deliverable, Agent, DeliverableType } from "@/lib/types";
import { EmptyState } from "@/components/ui";
import { DeliverableRow } from "./DeliverableRow";
import { DeliverableViewer } from "./DeliverableViewer";
import type { DeliverableStatus } from "@/lib/types";

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
  const [viewing, setViewing] = useState<Deliverable | null>(null);
  const [statuses, setStatuses] = useState<Map<string, DeliverableStatus>>(() => {
    const initial = new Map<string, DeliverableStatus>();
    for (const d of deliverables) {
      if (d.status) initial.set(d.id, d.status);
    }
    return initial;
  });

  const getStatus = useCallback(
    (id: string): DeliverableStatus => statuses.get(id) ?? "pending",
    [statuses]
  );

  const handleStatusChange = useCallback(
    async (id: string, status: DeliverableStatus) => {
      // Update local state immediately for responsiveness
      setStatuses((prev) => {
        const next = new Map(prev);
        next.set(id, status);
        return next;
      });

      // Persist to backend
      try {
        const API_BASE =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";
        await fetch(`${API_BASE}/deliverables/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });
      } catch (err) {
        console.error("Failed to persist deliverable status:", err);
      }
    },
    []
  );

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
            <DeliverableRow
              key={d.id}
              deliverable={d}
              agentName={agents.find((a) => a.id === d.agentId)?.name}
              status={getStatus(d.id)}
              onClick={() => setViewing(d)}
            />
          ))}
        </div>
      )}

      {/* Viewer modal */}
      {viewing && (
        <DeliverableViewer
          deliverable={viewing}
          agentName={agents.find((a) => a.id === viewing.agentId)?.name}
          status={getStatus(viewing.id)}
          onClose={() => setViewing(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}

export default DeliverablesList;
