// ---------------------------------------------------------------------------
// Type Aliases
// ---------------------------------------------------------------------------
export type AgentStatus = "online" | "busy" | "offline" | "error";
export type TaskStatus = "active" | "pending" | "completed";
export type TaskPriority = "low" | "medium" | "high" | "critical";
export type DeliverableType = "file" | "code" | "text" | "image";
export type ApprovalStatus = "pending" | "approved" | "rejected";
export type MessageRole = "user" | "agent";
export type ProjectStatus = "active" | "paused" | "idea";
export type DataSource = "local" | "cloud";

// ---------------------------------------------------------------------------
// Models
// ---------------------------------------------------------------------------
export interface IAgent {
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
  _localSource: string;
  _lastSynced: string;
}

export interface ITask {
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
  _localSource: string;
  _lastSynced: string;
}

export interface IDeliverable {
  id: string;
  name: string;
  type: DeliverableType;
  agentId: string;
  taskId: string;
  project: string;
  createdAt: string;
  path?: string;
  preview?: string;
  _localSource: string;
  _lastSynced: string;
}

export interface IApproval {
  id: string;
  taskId: string;
  title: string;
  description: string;
  requestedBy: string;
  status: ApprovalStatus;
  createdAt: string;
  deliverableIds: string[];
  reviewedAt?: string;
  reviewNote?: string;
  _lastSynced: string;
}

export interface IMessage {
  id: string;
  agentId: string;
  role: MessageRole;
  content: string;
  timestamp: string;
}

export interface IChatThread {
  agentId: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface IProject {
  id: string;
  name: string;
  status: ProjectStatus;
  type?: string;
  scope: string;
  stack?: string;
  team: string[];
  location?: string;
  parentId?: string;
  _localSource: string;
  _lastSynced: string;
}

export interface ISyncError {
  model: string;
  error: string;
  at: string;
}

export interface ISyncMeta {
  id: string;
  source: DataSource;
  lastFullSync: string;
  localRoot: string;
  cloudUrl?: string;
  syncErrors: ISyncError[];
}

// ---------------------------------------------------------------------------
// Schema introspection (from /schema endpoint)
// ---------------------------------------------------------------------------
export interface ISchemaField {
  name: string;
  type: string;
  description: string;
  required: boolean;
}

export interface ISchemaModel {
  name: string;
  fields: ISchemaField[];
}

export interface ISchemaResponse {
  models: ISchemaModel[];
}

// ---------------------------------------------------------------------------
// API Error
// ---------------------------------------------------------------------------
export interface IApiError {
  error: {
    code: string;
    message: string;
    status: number;
  };
}
