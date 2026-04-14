"use client";

import { SidebarNavLink } from "./SidebarNavLink";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Team" },
  { href: "/tasks", label: "Tasks" },
  { href: "/chat", label: "Chat" },
  { href: "/approvals", label: "Approvals" },
  { href: "/deliverables", label: "Deliverables" },
  { href: "/schema", label: "Schema" },
];

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-sidebar flex-col border-r border-border bg-bg-surface">
      {/* Logo / Dashboard Name */}
      <div className="flex h-16 items-center px-5">
        <span className="font-heading text-lg font-bold tracking-tight text-text-primary">
          Scorpio
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <SidebarNavLink
            key={item.href}
            href={item.href}
            label={item.label}
          />
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-border px-3 py-4">
        <SidebarNavLink href="/settings" label="Settings" />
      </div>
    </aside>
  );
}
