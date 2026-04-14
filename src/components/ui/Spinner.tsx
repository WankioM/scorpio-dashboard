import { cn } from "@/lib/cn";

const sizeStyles = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-3",
} as const;

type SpinnerSize = keyof typeof sizeStyles;

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <span
      className={cn(
        "inline-block animate-spin rounded-full border-accent border-t-transparent",
        sizeStyles[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}

export default Spinner;
