import { cn } from "@/lib/cn";
import { Spinner } from "./Spinner";

const variantStyles = {
  primary:
    "bg-accent text-white hover:bg-accent-hover active:bg-accent-pressed disabled:opacity-50",
  secondary:
    "bg-bg-surface text-text-primary border border-border hover:bg-bg-depth disabled:opacity-50",
  ghost:
    "bg-transparent text-text-secondary hover:bg-bg-surface active:bg-bg-depth disabled:opacity-50",
  danger:
    "bg-error text-white hover:bg-error/80 active:bg-error/90 disabled:opacity-50",
} as const;

const sizeStyles = {
  sm: "h-8 px-3 text-xs rounded-md gap-1.5",
  md: "h-10 px-4 text-sm rounded-md gap-2",
  lg: "h-12 px-6 text-base rounded-lg gap-2.5",
} as const;

type ButtonVariant = keyof typeof variantStyles;
type ButtonSize = keyof typeof sizeStyles;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-body font-medium transition-colors cursor-pointer",
        variantStyles[variant],
        sizeStyles[size],
        (disabled || loading) && "pointer-events-none",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner size="sm" className="border-current border-t-transparent" />}
      {children}
    </button>
  );
}

export default Button;
