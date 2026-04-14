export interface SchemaField {
  name: string;
  type: string;
  description: string;
  required: boolean;
}

export interface SchemaModel {
  name: string;
  description: string;
  fieldCount: number;
  fields: SchemaField[];
}

export const schemaModels: SchemaModel[] = [
  {
    name: "Agent",
    description: "AI team members — parsed from .claude/commands/*.md",
    fieldCount: 14,
    fields: [
      { name: "id", type: "string", description: "Unique slug (e.g. \"anfisa\")", required: true },
      { name: "name", type: "string", description: "Display name", required: true },
      { name: "role", type: "string", description: "Job title / team role", required: true },
      { name: "status", type: "\"online\" | \"busy\" | \"offline\" | \"error\"", description: "Current availability", required: true },
      { name: "currentTask", type: "string | null", description: "ID of assigned task", required: true },
      { name: "model", type: "string", description: "AI model (e.g. \"Opus\")", required: true },
      { name: "avatar", type: "string", description: "Avatar URL/path", required: false },
      { name: "lastActive", type: "string (ISO 8601)", description: "Last activity timestamp", required: true },
      { name: "stepBudgetUsed", type: "number", description: "Steps consumed in current session", required: true },
      { name: "stepBudgetTotal", type: "number", description: "Max step budget", required: true },
      { name: "recentDeliverables", type: "string[]", description: "IDs of recent deliverables", required: true },
      { name: "correctionsCount", type: "number", description: "Correction tracking", required: false },
      { name: "_localSource", type: "string", description: "Path to source command file", required: true },
      { name: "_lastSynced", type: "string (ISO 8601)", description: "Last sync timestamp", required: true },
    ],
  },
  {
    name: "Task",
    description: "Work items assigned to agents",
    fieldCount: 12,
    fields: [
      { name: "id", type: "string", description: "Unique task ID", required: true },
      { name: "title", type: "string", description: "Short task title", required: true },
      { name: "description", type: "string", description: "Full task description", required: true },
      { name: "status", type: "\"active\" | \"pending\" | \"completed\"", description: "Current state", required: true },
      { name: "priority", type: "\"low\" | \"medium\" | \"high\" | \"critical\"", description: "Priority level", required: true },
      { name: "assigneeId", type: "string", description: "Assigned agent ID", required: true },
      { name: "createdAt", type: "string (ISO 8601)", description: "Creation timestamp", required: true },
      { name: "updatedAt", type: "string (ISO 8601)", description: "Last update timestamp", required: true },
      { name: "deliverableIds", type: "string[]", description: "Linked deliverable IDs", required: true },
      { name: "project", type: "string", description: "Project name", required: false },
      { name: "_localSource", type: "string", description: "Where task was parsed from", required: true },
      { name: "_lastSynced", type: "string (ISO 8601)", description: "Sync timestamp", required: true },
    ],
  },
  {
    name: "Deliverable",
    description: "Files and outputs produced by agents",
    fieldCount: 11,
    fields: [
      { name: "id", type: "string", description: "Unique ID", required: true },
      { name: "name", type: "string", description: "Filename or title", required: true },
      { name: "type", type: "\"file\" | \"code\" | \"text\" | \"image\"", description: "Content type", required: true },
      { name: "agentId", type: "string", description: "Who produced it", required: true },
      { name: "taskId", type: "string", description: "Parent task ID", required: true },
      { name: "project", type: "string", description: "Project name", required: true },
      { name: "createdAt", type: "string (ISO 8601)", description: "Creation timestamp", required: true },
      { name: "path", type: "string", description: "File path (code/file types)", required: false },
      { name: "preview", type: "string", description: "Content preview (text types)", required: false },
      { name: "_localSource", type: "string", description: "Absolute path in PKA workspace", required: true },
      { name: "_lastSynced", type: "string (ISO 8601)", description: "Sync timestamp", required: true },
    ],
  },
  {
    name: "Approval",
    description: "Review queue — pending, approved, or rejected items",
    fieldCount: 11,
    fields: [
      { name: "id", type: "string", description: "Unique ID", required: true },
      { name: "taskId", type: "string", description: "Related task", required: true },
      { name: "title", type: "string", description: "What's being approved", required: true },
      { name: "description", type: "string", description: "Details/context", required: true },
      { name: "requestedBy", type: "string", description: "Agent ID who requested", required: true },
      { name: "status", type: "\"pending\" | \"approved\" | \"rejected\"", description: "Current state", required: true },
      { name: "createdAt", type: "string (ISO 8601)", description: "Submission timestamp", required: true },
      { name: "deliverableIds", type: "string[]", description: "Linked deliverables", required: true },
      { name: "reviewedAt", type: "string (ISO 8601)", description: "When user reviewed", required: false },
      { name: "reviewNote", type: "string", description: "Reviewer comment", required: false },
      { name: "_lastSynced", type: "string (ISO 8601)", description: "Sync timestamp", required: true },
    ],
  },
  {
    name: "Message",
    description: "Individual chat messages within agent threads",
    fieldCount: 5,
    fields: [
      { name: "id", type: "string", description: "Unique message ID", required: true },
      { name: "agentId", type: "string", description: "Thread agent ID", required: true },
      { name: "role", type: "\"user\" | \"agent\"", description: "Who sent it", required: true },
      { name: "content", type: "string", description: "Message text", required: true },
      { name: "timestamp", type: "string (ISO 8601)", description: "When sent", required: true },
    ],
  },
  {
    name: "ChatThread",
    description: "Thread summary per agent conversation",
    fieldCount: 4,
    fields: [
      { name: "agentId", type: "string", description: "Agent this thread is with", required: true },
      { name: "lastMessage", type: "string", description: "Preview of last message", required: true },
      { name: "lastMessageAt", type: "string (ISO 8601)", description: "Last message timestamp", required: true },
      { name: "unreadCount", type: "number", description: "Unread messages", required: true },
    ],
  },
  {
    name: "Project",
    description: "Project definitions — parsed from Projects/*/PROJECT.md",
    fieldCount: 10,
    fields: [
      { name: "id", type: "string", description: "Slug (e.g. \"scorpio-dashboard\")", required: true },
      { name: "name", type: "string", description: "Display name", required: true },
      { name: "status", type: "\"active\" | \"paused\" | \"idea\"", description: "Project state", required: true },
      { name: "type", type: "string", description: "e.g. \"Web App\", \"Content\"", required: false },
      { name: "scope", type: "string", description: "What the project covers", required: true },
      { name: "stack", type: "string", description: "Tech stack", required: false },
      { name: "team", type: "string[]", description: "Assigned agent IDs", required: true },
      { name: "location", type: "string", description: "Path to project codebase", required: false },
      { name: "_localSource", type: "string", description: "Path to PROJECT.md", required: true },
      { name: "_lastSynced", type: "string (ISO 8601)", description: "Sync timestamp", required: true },
    ],
  },
  {
    name: "SyncMeta",
    description: "Internal — tracks sync state between local and cloud",
    fieldCount: 6,
    fields: [
      { name: "id", type: "string", description: "Unique ID", required: true },
      { name: "source", type: "\"local\" | \"cloud\"", description: "Active data source", required: true },
      { name: "lastFullSync", type: "string (ISO 8601)", description: "Last full sync timestamp", required: true },
      { name: "localRoot", type: "string", description: "PKA workspace path", required: true },
      { name: "cloudUrl", type: "string", description: "Cloud DB connection URL", required: false },
      { name: "syncErrors", type: "SyncError[]", description: "Recent sync failures", required: true },
    ],
  },
];
