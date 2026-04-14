"use client";

import { useState, useEffect } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/features/PageHeader";
import { Card, Badge, Button } from "@/components/ui";
import { api, ApiError } from "@/lib/api";
import type { ISyncMeta, DataSource } from "@/types/api";

export default function SettingsPage() {
  const [config, setConfig] = useState<ISyncMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    api
      .get<ISyncMeta>("/config/source")
      .then(setConfig)
      .catch(() => setConfig(null))
      .finally(() => setLoading(false));
  }, []);

  const source = config?.source ?? "local";

  const handleSourceChange = async (newSource: DataSource) => {
    try {
      const updated = await api.put<ISyncMeta>("/config/source", {
        source: newSource,
      });
      setConfig(updated);
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(`Failed to update source: ${err.message}`);
      }
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      await api.post("/config/sync", {});
      const updated = await api.get<ISyncMeta>("/config/source");
      setConfig(updated);
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(`Sync failed: ${err.message}`);
      }
    } finally {
      setSyncing(false);
    }
  };

  return (
    <PageShell>
      <PageHeader title="Settings" description="Dashboard configuration" />

      <div className="mt-6 flex flex-col gap-6">
        {/* Data Source */}
        <Card>
          <h2 className="font-heading text-base font-bold text-text-primary">
            Data Source
          </h2>
          <p className="mt-1 text-xs text-text-secondary font-body">
            Choose where the dashboard reads data from. Local is always the
            source of truth — cloud syncs from local.
          </p>

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => handleSourceChange("local")}
              className={`flex-1 rounded-lg border px-4 py-3 text-left transition-colors cursor-pointer ${
                source === "local"
                  ? "border-accent bg-accent/10"
                  : "border-border bg-bg-surface hover:border-accent/50"
              }`}
            >
              <span className="font-heading text-sm font-semibold text-text-primary block">
                Local
              </span>
              <span className="text-xs text-text-secondary font-body mt-0.5 block">
                Reads directly from PKA workspace files
              </span>
            </button>

            <button
              onClick={() => handleSourceChange("cloud")}
              className={`flex-1 rounded-lg border px-4 py-3 text-left transition-colors cursor-pointer ${
                source === "cloud"
                  ? "border-accent bg-accent/10"
                  : "border-border bg-bg-surface hover:border-accent/50"
              }`}
            >
              <span className="font-heading text-sm font-semibold text-text-primary block">
                Cloud
              </span>
              <span className="text-xs text-text-secondary font-body mt-0.5 block">
                Reads from synced cloud database
              </span>
            </button>
          </div>

          {source === "cloud" && !config?.cloudUrl && (
            <div className="mt-3 rounded-md bg-warning/10 border border-warning/30 px-3 py-2">
              <p className="text-xs text-warning font-body font-medium">
                No cloud database configured. Connect one below or switch back
                to local.
              </p>
            </div>
          )}
        </Card>

        {/* Sync Status */}
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-base font-bold text-text-primary">
              Sync Status
            </h2>
            {loading ? (
              <Badge variant="default">Loading...</Badge>
            ) : (
              <Badge variant={source === "local" ? "success" : "info"}>
                {source === "local" ? "Local active" : "Cloud active"}
              </Badge>
            )}
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-bg-depth/50 px-4 py-3">
              <span className="text-xs text-text-secondary font-body">
                Source of truth
              </span>
              <span className="text-xs font-semibold text-text-primary font-body">
                Local workspace
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-bg-depth/50 px-4 py-3">
              <span className="text-xs text-text-secondary font-body">
                Local root
              </span>
              <span className="text-xs font-mono text-accent-pressed">
                {config?.localRoot ?? "—"}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-bg-depth/50 px-4 py-3">
              <span className="text-xs text-text-secondary font-body">
                Last full sync
              </span>
              <span className="text-xs text-text-primary font-body">
                {config?.lastFullSync
                  ? new Date(config.lastFullSync).toLocaleString()
                  : "—"}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-bg-depth/50 px-4 py-3">
              <span className="text-xs text-text-secondary font-body">
                Cloud database
              </span>
              <span className="text-xs text-text-secondary font-body italic">
                {config?.cloudUrl ?? "Not configured"}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-bg-depth/50 px-4 py-3">
              <span className="text-xs text-text-secondary font-body">
                Sync errors
              </span>
              {!config || config.syncErrors.length === 0 ? (
                <Badge variant="success">None</Badge>
              ) : (
                <Badge variant="error">
                  {config.syncErrors.length} errors
                </Badge>
              )}
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleSync}
              disabled={syncing}
            >
              {syncing ? "Syncing..." : "Sync now"}
            </Button>
            <Button variant="ghost" size="sm">
              View sync log
            </Button>
          </div>
        </Card>

        {/* Appearance */}
        <Card>
          <h2 className="font-heading text-base font-bold text-text-primary">
            Appearance
          </h2>
          <p className="mt-1 text-xs text-text-secondary font-body">
            Theme and display preferences.
          </p>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-bg-depth/50 px-4 py-3">
              <span className="text-xs text-text-secondary font-body">
                Theme
              </span>
              <Badge variant="accent">Washi</Badge>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-bg-depth/50 px-4 py-3">
              <span className="text-xs text-text-secondary font-body">
                Font — Headings
              </span>
              <span className="text-xs font-heading font-semibold text-text-primary">
                Satoshi
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-bg-depth/50 px-4 py-3">
              <span className="text-xs text-text-secondary font-body">
                Font — Body
              </span>
              <span className="text-xs font-body text-text-primary">Inter</span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-bg-depth/50 px-4 py-3">
              <span className="text-xs text-text-secondary font-body">
                Font — Mono
              </span>
              <span className="text-xs font-mono text-text-primary">
                ExpensifyMono
              </span>
            </div>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
