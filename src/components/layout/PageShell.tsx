import { cn } from "@/lib/cn";

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

export function PageShell({ children, className }: PageShellProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-6 py-8", className)}>
      {children}
    </div>
  );
}
