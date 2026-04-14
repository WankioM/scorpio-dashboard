export type AgentStatus = "online" | "busy" | "offline" | "error";
export type TaskStatus = "active" | "pending" | "completed";
export type TaskPriority = "low" | "medium" | "high" | "critical";
export type ApprovalStatus = "pending" | "approved" | "rejected" | "resolved";
export type DeliverableType = "file" | "code" | "text" | "image";

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  currentTask: string | null;
  model: string;
  avatar?: string;
  lastActive: string;
  stepBudgetUsed: number;
  stepBudgetTotal: number;
  recentDeliverables: string[];
  correctionsCount?: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string;
  createdAt: string;
  updatedAt: string;
  deliverableIds: string[];
  project?: string;
}

export interface Message {
  id: string;
  agentId: string;
  role: "user" | "agent";
  content: string;
  timestamp: string;
}

export interface Approval {
  id: string;
  taskId: string;
  title: string;
  description: string;
  requestedBy: string;
  status: ApprovalStatus;
  createdAt: string;
  deliverableIds: string[];
}

export type DeliverableStatus = "pending" | "approved" | "rejected" | "resolved";

export interface Deliverable {
  id: string;
  name: string;
  type: DeliverableType;
  agentId: string;
  taskId: string;
  project: string;
  createdAt: string;
  path?: string;
  preview?: string;
  status?: DeliverableStatus;
}

export interface ChatThread {
  agentId: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}
