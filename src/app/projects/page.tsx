export const dynamic = "force-dynamic";

import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/features/PageHeader";
import { SyncProjectsButton } from "@/components/features/SyncProjectsButton";
import { Poller } from "@/components/ui/Poller";
import { Badge, Card, EmptyState } from "@/components/ui";
import { api } from "@/lib/api";
import type { IProject } from "@/types/api";

const statusVariant: Record<string, "success" | "warning" | "default"> = {
  active: "success",
  paused: "warning",
  idea: "default",
};

function ProjectCard({ project, isSubProject }: { project: IProject; isSubProject?: boolean }) {
  return (
    <Card className={`flex flex-col gap-3 ${isSubProject ? "border-l-2 border-l-accent/40" : ""}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className={`font-heading font-semibold text-text-primary truncate ${isSubProject ? "text-sm" : "text-base"}`}>
          {project.name}
        </h3>
        <Badge variant={statusVariant[project.status] ?? "default"} className="shrink-0 capitalize">
          {project.status}
        </Badge>
      </div>

      {/* Type */}
      {project.type && (
        <Badge variant="accent" className="self-start">{project.type}</Badge>
      )}

      {/* Scope */}
      <p className="text-sm text-text-secondary font-body line-clamp-2">
        {project.scope}
      </p>

      {/* Stack */}
      {project.stack && (
        <p className="text-xs text-text-secondary font-mono truncate">
          {project.stack}
        </p>
      )}

      {/* Team */}
      {project.team.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.team.map((member) => (
            <Badge key={member} variant="default" className="capitalize">
              {member}
            </Badge>
          ))}
        </div>
      )}

      {/* Location */}
      {project.location && (
        <p className="mt-auto text-xs text-text-secondary font-mono truncate" title={project.location}>
          {project.location}
        </p>
      )}
    </Card>
  );
}

export default async function ProjectsPage() {
  const projects = await api.getSafe<IProject[]>("/projects", []);

  const parents = projects
    .filter((p) => !p.parentId)
    .sort((a, b) => {
      // Reflex first, then alphabetical
      if (a.id === "reflex") return -1;
      if (b.id === "reflex") return 1;
      return a.name.localeCompare(b.name);
    });
  const childrenByParent = new Map<string, IProject[]>();
  for (const p of projects) {
    if (p.parentId) {
      const list = childrenByParent.get(p.parentId) || [];
      list.push(p);
      childrenByParent.set(p.parentId, list);
    }
  }

  return (
    <PageShell>
      <Poller interval={30000} />
      <div className="flex items-center justify-between">
        <PageHeader title="Projects" description="All tracked projects" />
        <SyncProjectsButton />
      </div>

      {projects.length === 0 ? (
        <EmptyState
          title="No projects found"
          description="Projects are parsed from Projects/*/PROJECT.md in the workspace"
        />
      ) : (
        <div className="mt-6 space-y-6">
          {parents.map((parent) => {
            const children = childrenByParent.get(parent.id) || [];
            return (
              <div key={parent.id}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <ProjectCard project={parent} />
                </div>

                {children.length > 0 && (
                  <div className="mt-3 ml-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {children.map((child) => (
                      <ProjectCard key={child.id} project={child} isSubProject />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}
