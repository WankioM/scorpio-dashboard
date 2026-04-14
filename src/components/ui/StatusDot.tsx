import { cn } from "@/lib/cn";

const statusStyles = {
  online: "bg-success",
  busy: "bg-warning",
  offline: "bg-bg-depth",
  error: "bg-error",
} as const;

type Status = keyof typeof statusStyles;

interface StatusDotProps {
  status: Status;
  className?: string;
}

export function StatusDot({ status, className }: StatusDotProps) {
  return (
    <span
      className={cn(
        "inline-block h-2.5 w-2.5 rounded-full shrink-0",
        statusStyles[status],
        className
      )}
      role="status"
      aria-label={status}
    />
  );
}

export default StatusDot;
