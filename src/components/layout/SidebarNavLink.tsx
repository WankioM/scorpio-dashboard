"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

interface SidebarNavLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
}

export function SidebarNavLink({ href, label, icon, badge }: SidebarNavLinkProps) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-bg-depth text-text-primary"
          : "text-text-secondary hover:bg-bg-surface hover:text-text-primary"
      )}
    >
      {icon && <span className="flex-shrink-0 w-5 h-5">{icon}</span>}
      <span className="flex-1">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="flex-shrink-0 rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-white">
          {badge}
        </span>
      )}
    </Link>
  );
}
