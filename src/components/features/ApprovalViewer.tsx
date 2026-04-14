"use client";

import { useState, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { Badge, Button, Spinner } from "@/components/ui";
import { Avatar } from "@/components/ui/Avatar";
import type { Approval, ApprovalStatus, Deliverable } from "@/lib/types";
import { formatRelativeTime } from "@/lib/helpers";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

interface ApprovalViewerProps {
  approval: Approval;
  agentName?: string;
  onClose: () => void;
  onStatusChange: (id: string, status: ApprovalStatus) => void;
}

const statusBadge: Record<
  ApprovalStatus,
  { variant: "warning" | "success" | "error" | "info"; label: string }
> = {
  pending: { variant: "warning", label: "Pending" },
  approved: { variant: "success", label: "Approved" },
  rejected: { variant: "error", label: "Rejected" },
  resolved: { variant: "info", label: "Resolved" },
};

export function ApprovalViewer({
  approval,
  agentName,
  onClose,
  onStatusChange,
}: ApprovalViewerProps) {
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [loadingDeliverables, setLoadingDeliverables] = useState(false);
  const [selectedDeliverable, setSelectedDeliverable] = useState<Deliverable | null>(null);
  const [deliverableContent, setDeliverableContent] = useState<string | null>(null);
  const [loadingContent, setLoadingContent] = useState(false);
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [scorpioReply, setScorpioReply] = useState<string | null>(null);

  // Load linked deliverables
  useEffect(() => {
    if (approval.deliverableIds.length === 0) return;
    setLoadingDeliverables(true);
    Promise.all(
      approval.deliverableIds.map((id) =>
        fetch(`${API_BASE}/deliverables/${id}`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null)
      )
    )
      .then((results) => setDeliverables(results.filter(Boolean)))
      .finally(() => setLoadingDeliverables(false));
  }, [approval.deliverableIds]);

  // Load deliverable content when selected
  useEffect(() => {
    if (!selectedDeliverable) {
      setDeliverableContent(null);
      return;
    }
    setLoadingContent(true);
    fetch(`${API_BASE}/deliverables/${selectedDeliverable.id}/content`)
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then(setDeliverableContent)
      .catch(() => setDeliverableContent("(Could not load content)"))
      .finally(() => setLoadingContent(false));
  }, [selectedDeliverable]);

  // Escape to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedDeliverable) setSelectedDeliverable(null);
        else onClose();
      }
    },
    [onClose, selectedDeliverable]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Send comment to Scorpio via chat
  const handleSendComment = async () => {
    if (!comment.trim()) return;
    setSending(true);
    setScorpioReply(null);
    try {
      const message = `[Approval Feedback] Re: "${approval.title}"\n\n${comment}`;
      const res = await fetch(`${API_BASE}/chat/threads/scorpio/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message }),
      });
      const data = await res.json();
      setComment("");
      if (data.agentReply?.content) {
        setScorpioReply(data.agentReply.content);
      }
    } catch (err) {
      console.error("Failed to send comment:", err);
      setScorpioReply("Failed to reach Scorpio. Is the API server running?");
    } finally {
      setSending(false);
    }
  };

  const { variant, label } = statusBadge[approval.status];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-text-primary/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative mx-4 flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-bg-page shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
          <div className="min-w-0 flex-1">
            <h2 className="font-heading text-lg font-bold text-text-primary">
              {approval.title}
            </h2>
            <div className="mt-1 flex items-center gap-2 flex-wrap">
              <Badge variant={variant}>{label}</Badge>
              {agentName && (
                <span className="flex items-center gap-1.5 text-xs text-text-secondary font-body">
                  <Avatar name={agentName} size="sm" />
                  {agentName}
                </span>
              )}
              <span className="text-xs text-text-secondary font-body">
                {formatRelativeTime(approval.createdAt)}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </Button>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Description */}
          <section>
            <h3 className="font-heading text-sm font-semibold text-text-primary mb-2">
              Description
            </h3>
            <div className="prose-washi">
              <ReactMarkdown>{approval.description}</ReactMarkdown>
            </div>
          </section>

          {/* Linked deliverables */}
          {approval.deliverableIds.length > 0 && (
            <section>
              <h3 className="font-heading text-sm font-semibold text-text-primary mb-2">
                Deliverables ({approval.deliverableIds.length})
              </h3>
              {loadingDeliverables ? (
                <Spinner size="sm" />
              ) : deliverables.length === 0 ? (
                <p className="text-sm text-text-secondary font-body">
                  No deliverables found
                </p>
              ) : (
                <div className="space-y-2">
                  {deliverables.map((d) => (
                    <button
                      key={d.id}
                      onClick={() =>
                        setSelectedDeliverable(
                          selectedDeliverable?.id === d.id ? null : d
                        )
                      }
                      className="w-full text-left rounded-lg border border-border bg-bg-surface px-4 py-3 transition-colors hover:border-accent cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-body text-text-primary">
                          {d.name}
                        </span>
                        <Badge variant="accent">{d.type}</Badge>
                      </div>
                      {d.preview && (
                        <p className="mt-1 text-xs text-text-secondary font-body truncate">
                          {d.preview}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Inline deliverable content viewer */}
              {selectedDeliverable && (
                <div className="mt-3 rounded-xl border border-border bg-bg-surface overflow-hidden">
                  <div className="flex items-center justify-between border-b border-border px-4 py-2 bg-bg-depth">
                    <span className="text-xs font-heading font-semibold text-text-primary">
                      {selectedDeliverable.name}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedDeliverable(null)}
                    >
                      Close
                    </Button>
                  </div>
                  <div className="max-h-64 overflow-y-auto px-4 py-3">
                    {loadingContent ? (
                      <div className="flex justify-center py-4">
                        <Spinner size="sm" />
                      </div>
                    ) : (
                      <div className="prose-washi text-sm">
                        <ReactMarkdown>
                          {deliverableContent ?? ""}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Comment to Scorpio */}
          <section>
            <h3 className="font-heading text-sm font-semibold text-text-primary mb-2">
              Comment to Scorpio
            </h3>
            <p className="text-xs text-text-secondary font-body mb-2">
              Send feedback or request changes — Scorpio will respond below.
            </p>
            <div className="flex gap-2">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendComment();
                  }
                }}
                placeholder="e.g. &quot;Needs more detail on the API response format&quot;"
                rows={2}
                className="flex-1 resize-none rounded-xl border border-border bg-bg-surface px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={handleSendComment}
                disabled={!comment.trim() || sending}
                className="self-end"
              >
                {sending ? "Thinking..." : "Send"}
              </Button>
            </div>

            {/* Scorpio's reply */}
            {sending && (
              <div className="mt-3 flex items-center gap-2 text-sm text-text-secondary font-body">
                <Spinner size="sm" />
                <span>Scorpio is thinking...</span>
              </div>
            )}
            {scorpioReply && !sending && (
              <div className="mt-3 rounded-xl border border-border bg-bg-surface p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white text-xs font-heading font-bold">
                    S
                  </div>
                  <span className="text-xs font-heading font-semibold text-text-primary">
                    Scorpio
                  </span>
                </div>
                <div className="prose-washi text-sm">
                  <ReactMarkdown>{scorpioReply}</ReactMarkdown>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Footer — action buttons */}
        <div className="shrink-0 border-t border-border bg-bg-surface px-6 py-3">
          {approval.status === "pending" ? (
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onStatusChange(approval.id, "resolved")}
              >
                Resolve
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onStatusChange(approval.id, "rejected")}
              >
                Reject
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onStatusChange(approval.id, "approved")}
              >
                Approve
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary font-body">
                Marked as {label.toLowerCase()}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onStatusChange(approval.id, "pending")}
              >
                Undo
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApprovalViewer;
