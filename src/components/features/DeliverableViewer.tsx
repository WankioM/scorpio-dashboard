"use client";

import { useEffect, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { Badge, Button, Spinner } from "@/components/ui";
import type { Deliverable, DeliverableType, DeliverableStatus } from "@/lib/types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

const typeLabels: Record<DeliverableType, string> = {
  file: "File",
  code: "Code",
  text: "Text",
  image: "Image",
};

interface DeliverableViewerProps {
  deliverable: Deliverable;
  agentName?: string;
  status: DeliverableStatus;
  onClose: () => void;
  onStatusChange: (id: string, status: DeliverableStatus) => void;
}

export function DeliverableViewer({
  deliverable,
  agentName,
  status,
  onClose,
  onStatusChange,
}: DeliverableViewerProps) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isMarkdown =
    deliverable.type === "text" || deliverable.name.endsWith(".md");

  useEffect(() => {
    if (deliverable.type === "image") {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/deliverables/${deliverable.id}/content`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load content (${res.status})`);
        return res.text();
      })
      .then(setContent)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [deliverable.id, deliverable.type]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const statusBadge: Record<DeliverableStatus, { variant: "default" | "success" | "error" | "info" | "warning" | "accent"; label: string }> = {
    pending: { variant: "warning", label: "Pending" },
    approved: { variant: "success", label: "Approved" },
    rejected: { variant: "error", label: "Rejected" },
    resolved: { variant: "info", label: "Resolved" },
  };

  const { variant: statusVariant, label: statusLabel } = statusBadge[status];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-text-primary/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative mx-4 flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-bg-page shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-heading text-base font-bold text-text-primary">
              {deliverable.name}
            </h2>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant="accent">{typeLabels[deliverable.type]}</Badge>
              <Badge variant={statusVariant}>{statusLabel}</Badge>
              {agentName && (
                <span className="text-xs text-text-secondary font-body">
                  by {agentName}
                </span>
              )}
              {deliverable.project && (
                <span className="text-xs text-text-secondary font-body">
                  &middot; {deliverable.project}
                </span>
              )}
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {loading && (
            <div className="flex items-center justify-center py-16">
              <Spinner size="lg" />
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-error/30 bg-error/10 px-4 py-3">
              <p className="text-sm text-error font-body">{error}</p>
            </div>
          )}

          {!loading && !error && deliverable.type === "image" && (
            <div className="flex items-center justify-center">
              <p className="text-sm text-text-secondary font-body italic">
                {deliverable.preview || "Image preview not available in local mode"}
              </p>
            </div>
          )}

          {!loading && !error && content !== null && isMarkdown && (
            <div className="prose-washi">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}

          {!loading && !error && content !== null && !isMarkdown && (
            <pre className="overflow-x-auto rounded-xl border border-border bg-bg-surface p-4 font-mono text-sm text-text-primary leading-relaxed whitespace-pre-wrap break-words">
              {content}
            </pre>
          )}
        </div>

        {/* Footer — action buttons */}
        {status === "pending" && (
          <div className="shrink-0 border-t border-border bg-bg-surface px-6 py-3">
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onStatusChange(deliverable.id, "resolved")}
              >
                Resolve
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onStatusChange(deliverable.id, "rejected")}
              >
                Reject
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onStatusChange(deliverable.id, "approved")}
              >
                Approve
              </Button>
            </div>
          </div>
        )}

        {status !== "pending" && (
          <div className="shrink-0 border-t border-border bg-bg-surface px-6 py-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary font-body">
                Marked as {statusLabel.toLowerCase()}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onStatusChange(deliverable.id, "pending")}
              >
                Undo
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
