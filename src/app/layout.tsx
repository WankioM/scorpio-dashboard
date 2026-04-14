import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Scorpio Dashboard",
  description: "AI Team command center — manage agents, tasks, and deliverables",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex h-full min-h-screen bg-bg-page text-text-primary font-body">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <main className="flex-1 ml-sidebar overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
