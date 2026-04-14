"use client";

import { cn } from "@/lib/cn";

const variantStyles = {
  success: "border-success/40 bg-success/10 text-success",
  warning: "border-warning/40 bg-warning/10 text-warning",
  error: "border-error/40 bg-error/10 text-error",
  info: "border-info/40 bg-info/10 text-info",
} as const;

export type ToastVariant = keyof typeof variantStyles;

export interface ToastProps {
  variant?: ToastVariant;
  title: string;
  message?: string;
  onClose?: () => void;
}

export function Toast({ variant = "info", title, message, onClose }: ToastProps) {
  return (
    <div
      className={cn(
        "pointer-events-auto w-80 rounded-lg border p-4 shadow-md",
        "animate-[slideIn_0.2s_ease-out]",
        variantStyles[variant]
      )}
      role="alert"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-heading text-sm font-medium">{title}</p>
          {message && (
            <p className="mt-0.5 font-body text-xs opacity-80">{message}</p>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="shrink-0 rounded-sm p-0.5 opacity-60 transition-opacity hover:opacity-100 cursor-pointer"
            aria-label="Dismiss"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 3l8 8M11 3l-8 8" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default Toast;
