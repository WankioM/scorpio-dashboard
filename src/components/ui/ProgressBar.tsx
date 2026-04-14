import { cn } from "@/lib/cn";

const variantStyles = {
  accent: "bg-accent",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
} as const;

type ProgressVariant = keyof typeof variantStyles;

interface ProgressBarProps {
  value: number;
  variant?: ProgressVariant;
  className?: string;
}

export function ProgressBar({ value, variant = "accent", className }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div
      className={cn("h-2 w-full overflow-hidden rounded-sm bg-bg-depth", className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn("h-full rounded-sm transition-all duration-300 ease-out", variantStyles[variant])}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

export default ProgressBar;
