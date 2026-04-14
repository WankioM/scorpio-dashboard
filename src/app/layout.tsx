import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { ScorpioChat } from "@/components/features/ScorpioChat";

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
      <body suppressHydrationWarning className="flex h-full min-h-screen bg-bg-page text-text-primary font-body">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <main className="flex-1 ml-sidebar overflow-y-auto">
          {children}
        </main>

        {/* Floating Scorpio chat widget */}
        <ScorpioChat />
      </body>
    </html>
  );
}
