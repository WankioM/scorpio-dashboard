import { cn } from "@/lib/cn";

const variantStyles = {
  default: "bg-bg-depth text-text-primary",
  success: "bg-success/20 text-success",
  warning: "bg-warning/20 text-warning",
  error: "bg-error/20 text-error",
  info: "bg-info/20 text-info",
  accent: "bg-accent/20 text-accent",
} as const;

type BadgeVariant = keyof typeof variantStyles;

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium font-body",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
