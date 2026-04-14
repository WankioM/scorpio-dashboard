import type {
  Agent,
  Task,
  Message,
  Approval,
  Deliverable,
  ChatThread,
} from "./types";

// ---------------------------------------------------------------------------
// Agents
// ---------------------------------------------------------------------------
export const agents: Agent[] = [
  {
    id: "scorpio",
    name: "Scorpio",
    role: "Orchestrator",
    status: "online",
    currentTask: "task-1",
    model: "Sonnet",
    lastActive: "2026-04-13T09:15:00Z",
    stepBudgetUsed: 34,
    stepBudgetTotal: 200,
    recentDeliverables: ["del-1"],
  },
  {
    id: "anfisa",
    name: "Anfisa",
    role: "Frontend Developer",
    status: "busy",
    currentTask: "task-2",
    model: "Opus",
    lastActive: "2026-04-13T09:32:00Z",
    stepBudgetUsed: 142,
    stepBudgetTotal: 200,
    recentDeliverables: ["del-2", "del-3"],
  },
  {
    id: "lena",
    name: "Lena",
    role: "Content Writer",
    status: "online",
    currentTask: "task-4",
    model: "Sonnet",
    lastActive: "2026-04-13T08:45:00Z",
    stepBudgetUsed: 67,
    stepBudgetTotal: 150,
    recentDeliverables: ["del-4"],
    correctionsCount: 3,
  },
  {
    id: "rexpress",
    name: "Rexpress",
    role: "Backend Developer",
    status: "offline",
    currentTask: null,
    model: "Sonnet",
    lastActive: "2026-04-12T22:10:00Z",
    stepBudgetUsed: 0,
    stepBudgetTotal: 200,
    recentDeliverables: ["del-5"],
  },
  {
    id: "cloudy",
    name: "Cloudy",
    role: "DevOps Engineer",
    status: "online",
    currentTask: "task-6",
    model: "Sonnet",
    lastActive: "2026-04-13T09:28:00Z",
    stepBudgetUsed: 88,
    stepBudgetTotal: 150,
    recentDeliverables: ["del-6"],
  },
  {
    id: "nitpick",
    name: "Nitpick",
    role: "Code Reviewer",
    status: "online",
    currentTask: null,
    model: "Sonnet",
    lastActive: "2026-04-13T09:05:00Z",
    stepBudgetUsed: 21,
    stepBudgetTotal: 100,
    recentDeliverables: ["del-7", "del-8"],
  },
];

// ---------------------------------------------------------------------------
// Tasks
// ---------------------------------------------------------------------------
export const tasks: Task[] = [
  {
    id: "task-1",
    title: "Coordinate Phase 3 page builds",
    description:
      "Delegate page implementation tasks to Anfisa, Lena, and other agents. Track progress and resolve blockers.",
    status: "active",
    priority: "high",
    assigneeId: "scorpio",
    createdAt: "2026-04-12T10:00:00Z",
    updatedAt: "2026-04-13T09:15:00Z",
    deliverableIds: ["del-1"],
    project: "Scorpio Dashboard",
  },
  {
    id: "task-2",
    title: "Build home & team page components",
    description:
      "Implement PageHeader, StatCard, AgentCard, TaskCard and the Overview home page.",
    status: "active",
    priority: "critical",
    assigneeId: "anfisa",
    createdAt: "2026-04-12T11:30:00Z",
    updatedAt: "2026-04-13T09:32:00Z",
    deliverableIds: ["del-2", "del-3"],
    project: "Scorpio Dashboard",
  },
  {
    id: "task-3",
    title: "Design REST API schema for agent registry",
    description:
      "Define endpoints, request/response shapes, and auth strategy for the agent registry service.",
    status: "pending",
    priority: "medium",
    assigneeId: "rexpress",
    createdAt: "2026-04-12T14:00:00Z",
    updatedAt: "2026-04-12T14:00:00Z",
    deliverableIds: [],
    project: "Scorpio Dashboard",
  },
  {
    id: "task-4",
    title: "Write onboarding copy for dashboard",
    description:
      "Draft microcopy for empty states, tooltips, and the welcome banner.",
    status: "active",
    priority: "medium",
    assigneeId: "lena",
    createdAt: "2026-04-12T15:00:00Z",
    updatedAt: "2026-04-13T08:45:00Z",
    deliverableIds: ["del-4"],
    project: "Scorpio Dashboard",
  },
  {
    id: "task-5",
    title: "Review Anfisa's component PR",
    description:
      "Code review the Phase 2 UI primitives pull request for consistency and accessibility.",
    status: "completed",
    priority: "high",
    assigneeId: "nitpick",
    createdAt: "2026-04-11T09:00:00Z",
    updatedAt: "2026-04-12T16:30:00Z",
    deliverableIds: ["del-7"],
    project: "Scorpio Dashboard",
  },
  {
    id: "task-6",
    title: "Set up CI/CD pipeline for dashboard",
    description:
      "Configure GitHub Actions for lint, type-check, build, and preview deploys on Vercel.",
    status: "active",
    priority: "high",
    assigneeId: "cloudy",
    createdAt: "2026-04-12T12:00:00Z",
    updatedAt: "2026-04-13T09:28:00Z",
    deliverableIds: ["del-6"],
    project: "Scorpio Dashboard",
  },
  {
    id: "task-7",
    title: "Write Medium article on AI team workflow",
    description:
      "Publish a behind-the-scenes article about building with an AI team orchestrator.",
    status: "pending",
    priority: "low",
    assigneeId: "lena",
    createdAt: "2026-04-13T07:00:00Z",
    updatedAt: "2026-04-13T07:00:00Z",
    deliverableIds: [],
    project: "Content",
  },
  {
    id: "task-8",
    title: "Audit accessibility of UI primitives",
    description:
      "Run axe-core and manual keyboard tests on all ui/ components. File issues for failures.",
    status: "completed",
    priority: "medium",
    assigneeId: "nitpick",
    createdAt: "2026-04-10T10:00:00Z",
    updatedAt: "2026-04-11T14:00:00Z",
    deliverableIds: ["del-8"],
    project: "Scorpio Dashboard",
  },
  {
    id: "task-9",
    title: "Implement WebSocket event bus",
    description:
      "Build real-time event streaming for agent status updates and task progress.",
    status: "pending",
    priority: "high",
    assigneeId: "rexpress",
    createdAt: "2026-04-13T08:00:00Z",
    updatedAt: "2026-04-13T08:00:00Z",
    deliverableIds: [],
    project: "Scorpio Dashboard",
  },
  {
    id: "task-10",
    title: "Create Terraform modules for staging env",
    description:
      "Provision staging infra on AWS with Terraform — VPC, ECS, RDS, and S3.",
    status: "completed",
    priority: "medium",
    assigneeId: "cloudy",
    createdAt: "2026-04-09T10:00:00Z",
    updatedAt: "2026-04-11T18:00:00Z",
    deliverableIds: [],
    project: "Infrastructure",
  },
];

// ---------------------------------------------------------------------------
// Approvals
// ---------------------------------------------------------------------------
export const approvals: Approval[] = [
  {
    id: "apr-1",
    taskId: "task-2",
    title: "Phase 3 component architecture",
    description:
      "Anfisa proposes server-component-first approach with client islands only for interactivity.",
    requestedBy: "anfisa",
    status: "pending",
    createdAt: "2026-04-13T09:00:00Z",
    deliverableIds: ["del-2"],
  },
  {
    id: "apr-2",
    taskId: "task-6",
    title: "CI pipeline config for Vercel preview deploys",
    description:
      "Cloudy requests approval for the GitHub Actions workflow that auto-deploys PRs to Vercel.",
    requestedBy: "cloudy",
    status: "pending",
    createdAt: "2026-04-13T08:30:00Z",
    deliverableIds: ["del-6"],
  },
  {
    id: "apr-3",
    taskId: "task-4",
    title: "Onboarding copy — first draft",
    description:
      "Lena's first draft of dashboard microcopy for review before integration.",
    requestedBy: "lena",
    status: "pending",
    createdAt: "2026-04-13T08:00:00Z",
    deliverableIds: ["del-4"],
  },
  {
    id: "apr-4",
    taskId: "task-5",
    title: "UI primitives PR approval",
    description:
      "Nitpick approved the Phase 2 UI component library after two rounds of review.",
    requestedBy: "nitpick",
    status: "approved",
    createdAt: "2026-04-12T15:00:00Z",
    deliverableIds: ["del-7"],
  },
  {
    id: "apr-5",
    taskId: "task-3",
    title: "API schema draft v1",
    description:
      "Initial REST API schema was rejected — needs auth strategy rework.",
    requestedBy: "rexpress",
    status: "rejected",
    createdAt: "2026-04-12T14:30:00Z",
    deliverableIds: [],
  },
];

// ---------------------------------------------------------------------------
// Deliverables
// ---------------------------------------------------------------------------
export const deliverables: Deliverable[] = [
  {
    id: "del-1",
    name: "phase3-task-breakdown.md",
    type: "text",
    agentId: "scorpio",
    taskId: "task-1",
    project: "Scorpio Dashboard",
    createdAt: "2026-04-12T11:00:00Z",
    preview: "Phase 3 breakdown: 10 pages, 3 sections, mock data layer...",
  },
  {
    id: "del-2",
    name: "PageHeader.tsx",
    type: "code",
    agentId: "anfisa",
    taskId: "task-2",
    project: "Scorpio Dashboard",
    createdAt: "2026-04-13T08:00:00Z",
    path: "src/components/features/PageHeader.tsx",
  },
  {
    id: "del-3",
    name: "StatCard.tsx",
    type: "code",
    agentId: "anfisa",
    taskId: "task-2",
    project: "Scorpio Dashboard",
    createdAt: "2026-04-13T08:30:00Z",
    path: "src/components/features/StatCard.tsx",
  },
  {
    id: "del-4",
    name: "onboarding-copy-v1.md",
    type: "text",
    agentId: "lena",
    taskId: "task-4",
    project: "Scorpio Dashboard",
    createdAt: "2026-04-13T07:30:00Z",
    preview: "Welcome to Scorpio — your AI team, orchestrated.",
  },
  {
    id: "del-5",
    name: "api-schema-v1.json",
    type: "file",
    agentId: "rexpress",
    taskId: "task-3",
    project: "Scorpio Dashboard",
    createdAt: "2026-04-12T16:00:00Z",
    path: "docs/api-schema-v1.json",
  },
  {
    id: "del-6",
    name: "ci-pipeline.yml",
    type: "code",
    agentId: "cloudy",
    taskId: "task-6",
    project: "Scorpio Dashboard",
    createdAt: "2026-04-13T09:00:00Z",
    path: ".github/workflows/ci-pipeline.yml",
  },
  {
    id: "del-7",
    name: "ui-review-report.md",
    type: "text",
    agentId: "nitpick",
    taskId: "task-5",
    project: "Scorpio Dashboard",
    createdAt: "2026-04-12T16:00:00Z",
    preview: "All 10 primitives pass a11y checks. Minor Badge contrast fix needed.",
  },
  {
    id: "del-8",
    name: "a11y-audit-screenshot.png",
    type: "image",
    agentId: "nitpick",
    taskId: "task-8",
    project: "Scorpio Dashboard",
    createdAt: "2026-04-11T13:00:00Z",
    path: "docs/a11y-audit-screenshot.png",
  },
];

// ---------------------------------------------------------------------------
// Chat Threads
// ---------------------------------------------------------------------------
export const chatThreads: ChatThread[] = [
  {
    agentId: "scorpio",
    lastMessage: "Phase 3 is on track. Anfisa's building pages now.",
    lastMessageAt: "2026-04-13T09:15:00Z",
    unreadCount: 0,
  },
  {
    agentId: "anfisa",
    lastMessage: "StatCard and PageHeader are done. Moving to AgentCard next.",
    lastMessageAt: "2026-04-13T09:32:00Z",
    unreadCount: 2,
  },
  {
    agentId: "lena",
    lastMessage: "Here's the first draft of onboarding copy. Let me know!",
    lastMessageAt: "2026-04-13T08:45:00Z",
    unreadCount: 1,
  },
  {
    agentId: "rexpress",
    lastMessage: "I'll rework the auth strategy tomorrow morning.",
    lastMessageAt: "2026-04-12T22:10:00Z",
    unreadCount: 0,
  },
  {
    agentId: "cloudy",
    lastMessage: "Preview deploys are live. Needs your approval on the workflow.",
    lastMessageAt: "2026-04-13T09:28:00Z",
    unreadCount: 1,
  },
  {
    agentId: "nitpick",
    lastMessage: "PR looks good after the last round of fixes. Approved.",
    lastMessageAt: "2026-04-13T09:05:00Z",
    unreadCount: 0,
  },
];

// ---------------------------------------------------------------------------
// Messages (per agent thread)
// ---------------------------------------------------------------------------
export const messages: Message[] = [
  // Scorpio thread
  { id: "msg-1", agentId: "scorpio", role: "user", content: "How's Phase 3 looking?", timestamp: "2026-04-13T09:10:00Z" },
  { id: "msg-2", agentId: "scorpio", role: "agent", content: "All agents are assigned. Anfisa is on pages, Lena is writing copy, Cloudy has CI.", timestamp: "2026-04-13T09:11:00Z" },
  { id: "msg-3", agentId: "scorpio", role: "user", content: "Any blockers?", timestamp: "2026-04-13T09:12:00Z" },
  { id: "msg-4", agentId: "scorpio", role: "agent", content: "Rexpress is offline — the API schema task is stalled. I'll reassign if he's not back by noon.", timestamp: "2026-04-13T09:13:00Z" },
  { id: "msg-5", agentId: "scorpio", role: "agent", content: "Phase 3 is on track. Anfisa's building pages now.", timestamp: "2026-04-13T09:15:00Z" },

  // Anfisa thread
  { id: "msg-6", agentId: "anfisa", role: "user", content: "Start with the shared feature components, then the home page.", timestamp: "2026-04-13T08:00:00Z" },
  { id: "msg-7", agentId: "anfisa", role: "agent", content: "Got it. I'll build PageHeader and StatCard first.", timestamp: "2026-04-13T08:05:00Z" },
  { id: "msg-8", agentId: "anfisa", role: "agent", content: "PageHeader is done — named + default export, server component.", timestamp: "2026-04-13T08:30:00Z" },
  { id: "msg-9", agentId: "anfisa", role: "user", content: "Nice. How about StatCard?", timestamp: "2026-04-13T09:00:00Z" },
  { id: "msg-10", agentId: "anfisa", role: "agent", content: "StatCard and PageHeader are done. Moving to AgentCard next.", timestamp: "2026-04-13T09:32:00Z" },

  // Lena thread
  { id: "msg-11", agentId: "lena", role: "user", content: "Can you draft the onboarding copy for the dashboard?", timestamp: "2026-04-13T07:00:00Z" },
  { id: "msg-12", agentId: "lena", role: "agent", content: "Sure! I'll have a first pass in about an hour.", timestamp: "2026-04-13T07:05:00Z" },
  { id: "msg-13", agentId: "lena", role: "agent", content: "Draft is ready. Covers empty states, tooltips, and the welcome banner.", timestamp: "2026-04-13T07:45:00Z" },
  { id: "msg-14", agentId: "lena", role: "user", content: "Make the tone a bit more playful — we want personality.", timestamp: "2026-04-13T08:15:00Z" },
  { id: "msg-15", agentId: "lena", role: "agent", content: "Here's the first draft of onboarding copy. Let me know!", timestamp: "2026-04-13T08:45:00Z" },

  // Rexpress thread
  { id: "msg-16", agentId: "rexpress", role: "user", content: "Start on the API schema when you're free.", timestamp: "2026-04-12T14:00:00Z" },
  { id: "msg-17", agentId: "rexpress", role: "agent", content: "On it. I'll base it on the existing types.", timestamp: "2026-04-12T14:30:00Z" },
  { id: "msg-18", agentId: "rexpress", role: "agent", content: "First draft is up but the auth approach needs a rethink.", timestamp: "2026-04-12T18:00:00Z" },
  { id: "msg-19", agentId: "rexpress", role: "user", content: "Agreed — let's go with JWT + API keys. Update tomorrow?", timestamp: "2026-04-12T21:00:00Z" },
  { id: "msg-20", agentId: "rexpress", role: "agent", content: "I'll rework the auth strategy tomorrow morning.", timestamp: "2026-04-12T22:10:00Z" },

  // Cloudy thread
  { id: "msg-21", agentId: "cloudy", role: "user", content: "Set up CI for the dashboard repo.", timestamp: "2026-04-12T12:00:00Z" },
  { id: "msg-22", agentId: "cloudy", role: "agent", content: "I'll use GitHub Actions — lint, typecheck, build, and Vercel preview deploys.", timestamp: "2026-04-12T12:15:00Z" },
  { id: "msg-23", agentId: "cloudy", role: "agent", content: "Pipeline is configured. PRs will auto-deploy to Vercel.", timestamp: "2026-04-13T09:00:00Z" },
  { id: "msg-24", agentId: "cloudy", role: "user", content: "Does it run on pushes to main too?", timestamp: "2026-04-13T09:20:00Z" },
  { id: "msg-25", agentId: "cloudy", role: "agent", content: "Preview deploys are live. Needs your approval on the workflow.", timestamp: "2026-04-13T09:28:00Z" },

  // Nitpick thread
  { id: "msg-26", agentId: "nitpick", role: "user", content: "Review the UI primitives PR when you can.", timestamp: "2026-04-12T09:00:00Z" },
  { id: "msg-27", agentId: "nitpick", role: "agent", content: "Reviewing now. Found a contrast issue on Badge — will flag it.", timestamp: "2026-04-12T10:00:00Z" },
  { id: "msg-28", agentId: "nitpick", role: "agent", content: "Left comments on the PR. Badge needs a darker text in the warning variant.", timestamp: "2026-04-12T12:00:00Z" },
  { id: "msg-29", agentId: "nitpick", role: "user", content: "Anfisa pushed a fix. Take another look?", timestamp: "2026-04-12T16:00:00Z" },
  { id: "msg-30", agentId: "nitpick", role: "agent", content: "PR looks good after the last round of fixes. Approved.", timestamp: "2026-04-13T09:05:00Z" },
];
