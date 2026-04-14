import Link from "next/link";
import { cn } from "@/lib/cn";
import { Card } from "@/components/ui";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  href?: string;
  className?: string;
}

export function StatCard({ label, value, icon, href, className }: StatCardProps) {
  const content = (
    <Card className={cn("flex items-center gap-4", className)}>
      {icon && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-depth text-text-secondary">
          {icon}
        </div>
      )}
      <div>
        <p className="font-heading text-3xl font-bold text-text-primary">
          {value}
        </p>
        <p className="text-sm text-text-secondary font-body">{label}</p>
      </div>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block transition-opacity hover:opacity-80">
        {content}
      </Link>
    );
  }

  return content;
}

export default StatCard;
