import { cn } from "@/lib/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export function Card({ children, className, padding = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-bg-surface",
        padding && "p-5",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;
