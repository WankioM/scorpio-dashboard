export const dynamic = "force-dynamic";

import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/features/PageHeader";
import { Card, Badge } from "@/components/ui";
import { api } from "@/lib/api";
import type { ISchemaResponse } from "@/types/api";

export default async function SchemaPage() {
  const schema = await api.get<ISchemaResponse>("/schema");
  const models = schema.models;

  return (
    <PageShell>
      <PageHeader
        title="Schema"
        description="Data models powering the dashboard"
      />

      {/* Summary row */}
      <div className="mt-6 flex items-center gap-3 flex-wrap">
        <Badge variant="accent">{models.length} models</Badge>
        <Badge variant="info">
          {models.reduce((sum, m) => sum + m.fields.length, 0)} total fields
        </Badge>
        <span className="text-xs text-text-secondary font-body">
          Source of truth: local workspace
        </span>
      </div>

      {/* Model cards */}
      <div className="mt-6 flex flex-col gap-5">
        {models.map((model) => (
          <Card key={model.name} padding={false}>
            {/* Card header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h2 className="font-heading text-base font-bold text-text-primary">
                  {model.name}
                </h2>
              </div>
              <Badge variant="default">{model.fields.length} fields</Badge>
            </div>

            {/* Field table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-bg-depth/50">
                    <th className="px-5 py-2.5 text-left font-heading font-semibold text-text-primary">
                      Field
                    </th>
                    <th className="px-5 py-2.5 text-left font-heading font-semibold text-text-primary">
                      Type
                    </th>
                    <th className="px-5 py-2.5 text-left font-heading font-semibold text-text-primary hidden sm:table-cell">
                      Description
                    </th>
                    <th className="px-5 py-2.5 text-center font-heading font-semibold text-text-primary w-24">
                      Required
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {model.fields.map((field, i) => (
                    <tr
                      key={field.name}
                      className={
                        i % 2 === 0
                          ? "bg-bg-surface"
                          : "bg-bg-depth/30"
                      }
                    >
                      <td className="px-5 py-2 font-mono text-xs text-accent-pressed font-semibold">
                        {field.name}
                      </td>
                      <td className="px-5 py-2 font-mono text-xs text-text-secondary">
                        {field.type}
                      </td>
                      <td className="px-5 py-2 text-xs text-text-secondary font-body hidden sm:table-cell">
                        {field.description}
                      </td>
                      <td className="px-5 py-2 text-center">
                        {field.required ? (
                          <span className="inline-block h-2 w-2 rounded-full bg-success" title="Required" />
                        ) : (
                          <span className="inline-block h-2 w-2 rounded-full bg-border" title="Optional" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
