import type {
  Agent,
  Task,
  TaskStatus,
  Approval,
  Deliverable,
  ChatThread,
  Message,
} from "./types";
import {
  agents,
  tasks,
  approvals,
  deliverables,
  chatThreads,
  messages,
} from "./mock-data";

// ---------------------------------------------------------------------------
// Agent helpers
// ---------------------------------------------------------------------------
export function getAgentById(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}

// ---------------------------------------------------------------------------
// Task helpers
// ---------------------------------------------------------------------------
export function getTaskById(id: string): Task | undefined {
  return tasks.find((t) => t.id === id);
}

export function getTasksByAgent(agentId: string): Task[] {
  return tasks.filter((t) => t.assigneeId === agentId);
}

export function getTasksByStatus(status: TaskStatus): Task[] {
  return tasks.filter((t) => t.status === status);
}

export function getActiveTasks(): Task[] {
  return tasks.filter((t) => t.status === "active");
}

export function getAgentForTask(taskId: string): Agent | undefined {
  const task = getTaskById(taskId);
  if (!task) return undefined;
  return getAgentById(task.assigneeId);
}

// ---------------------------------------------------------------------------
// Deliverable helpers
// ---------------------------------------------------------------------------
export function getDeliverablesByAgent(agentId: string): Deliverable[] {
  return deliverables.filter((d) => d.agentId === agentId);
}

export function getDeliverablesByTask(taskId: string): Deliverable[] {
  return deliverables.filter((d) => d.taskId === taskId);
}

// ---------------------------------------------------------------------------
// Approval helpers
// ---------------------------------------------------------------------------
export function getPendingApprovals(): Approval[] {
  return approvals.filter((a) => a.status === "pending");
}

// ---------------------------------------------------------------------------
// Chat helpers
// ---------------------------------------------------------------------------
export function getChatThread(agentId: string): ChatThread | undefined {
  return chatThreads.find((t) => t.agentId === agentId);
}

export function getMessages(agentId: string): Message[] {
  return messages.filter((m) => m.agentId === agentId);
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------
export function formatRelativeTime(iso: string): string {
  const now = new Date();
  const then = new Date(iso);
  const diffMs = now.getTime() - then.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay === 1) return "Yesterday";
  if (diffDay < 7) return `${diffDay}d ago`;
  return then.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
