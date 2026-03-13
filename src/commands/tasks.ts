import fs from "node:fs/promises";
import path from "node:path";
import type { RuntimeEnv } from "../runtime.js";
import { resolveDefaultAgentId } from "../agents/agent-scope.js";
import { loadConfig } from "../config/config.js";
import { resolveContinuityBackupPath } from "../continuity/paths.js";
import {
  repairMarkCommitmentOrphan,
  repairMarkTaskOrphan,
  repairMergeTasks,
  repairRelinkTaskToSession,
} from "../continuity/service.js";
import {
  getContinuityStore,
  type ContinuityImportResult,
  type ContinuityPruneResult,
  type ContinuitySnapshot,
} from "../continuity/store.js";
import { normalizeAgentId } from "../routing/session-key.js";

export type TasksExportOptions = {
  agentId?: string;
  out?: string;
  json?: boolean;
};

export type TasksImportOptions = {
  agentId?: string;
  input: string;
  replace?: boolean;
  json?: boolean;
};

export type TasksPruneOptions = {
  agentId?: string;
  closedTasksDays?: number | string;
  eventsDays?: number | string;
  commitmentsDays?: number | string;
  repairsDays?: number | string;
  out?: string;
  dryRun?: boolean;
  json?: boolean;
};

export type TasksRepairRelinkOptions = {
  agentId?: string;
  taskId: string;
  sessionKey: string;
  detail?: string;
  json?: boolean;
};

export type TasksRepairMergeOptions = {
  agentId?: string;
  sourceTaskId: string;
  targetTaskId: string;
  detail?: string;
  json?: boolean;
};

export type TasksRepairTaskOrphanOptions = {
  agentId?: string;
  taskId: string;
  detail?: string;
  json?: boolean;
};

export type TasksRepairCommitmentOrphanOptions = {
  agentId?: string;
  taskId: string;
  commitmentId: string;
  detail?: string;
  json?: boolean;
};

type TasksExportSummary = {
  agentId: string;
  outputPath: string;
  schemaVersion: number;
  exportedAt: number;
  counts: {
    tasks: number;
    taskSessionLinks: number;
    events: number;
    commitments: number;
    repairs: number;
  };
};

type TasksImportSummary = {
  agentId: string;
  inputPath: string;
  schemaVersion: number;
  replaced: boolean;
  imported: ContinuityImportResult["imported"];
};

type TasksPruneSummary = {
  agentId: string;
  dryRun: boolean;
  backupPath?: string;
  result: ContinuityPruneResult;
};

type TasksRepairRelinkSummary = {
  agentId: string;
  taskId: string;
  sessionKey: string;
  detail?: string;
  task: NonNullable<ReturnType<typeof repairRelinkTaskToSession>>;
};

type TasksRepairMergeSummary = {
  agentId: string;
  sourceTaskId: string;
  targetTaskId: string;
  detail?: string;
  result: NonNullable<ReturnType<typeof repairMergeTasks>>;
};

type TasksRepairTaskOrphanSummary = {
  agentId: string;
  taskId: string;
  detail?: string;
  task: NonNullable<ReturnType<typeof repairMarkTaskOrphan>>;
};

type TasksRepairCommitmentOrphanSummary = {
  agentId: string;
  taskId: string;
  commitmentId: string;
  detail?: string;
  commitment: NonNullable<ReturnType<typeof repairMarkCommitmentOrphan>>;
};

function resolveTasksAgentId(agentId: string | undefined): {
  cfg: ReturnType<typeof loadConfig>;
  agentId: string;
} {
  const cfg = loadConfig();
  const resolvedAgentId = agentId?.trim() ? normalizeAgentId(agentId) : resolveDefaultAgentId(cfg);
  return {
    cfg,
    agentId: resolvedAgentId,
  };
}

function emitSummary(
  runtime: RuntimeEnv,
  json: boolean | undefined,
  payload:
    | TasksExportSummary
    | TasksImportSummary
    | TasksPruneSummary
    | TasksRepairRelinkSummary
    | TasksRepairMergeSummary
    | TasksRepairTaskOrphanSummary
    | TasksRepairCommitmentOrphanSummary,
  lines: Array<string>,
): void {
  if (json) {
    runtime.log(JSON.stringify(payload, null, 2));
    return;
  }
  for (const line of lines) {
    runtime.log(line);
  }
}

function exitWithRuntimeError(runtime: RuntimeEnv, message: string): never {
  runtime.error(message);
  runtime.exit(1);
  throw new Error(message);
}

function parsePositiveDays(
  value: number | string | undefined,
  flagName: string,
  runtime: RuntimeEnv,
): number | undefined {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }
  const parsed =
    typeof value === "number" && Number.isFinite(value)
      ? Math.floor(value)
      : Number.parseInt(String(value), 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    runtime.error(`${flagName} must be a positive integer (days)`);
    runtime.exit(1);
    return undefined;
  }
  return parsed;
}

function daysToCutoff(days: number | undefined): number | undefined {
  if (days === undefined) {
    return undefined;
  }
  return Date.now() - days * 24 * 60 * 60 * 1000;
}

function parseContinuitySnapshot(raw: string): ContinuitySnapshot {
  const parsed = JSON.parse(raw) as unknown;
  if (!parsed || typeof parsed !== "object") {
    throw new Error("continuity snapshot must be a JSON object");
  }
  const snapshot = parsed as ContinuitySnapshot;
  if (!Array.isArray(snapshot.tasks)) {
    throw new Error("continuity snapshot is missing tasks[]");
  }
  if (!Array.isArray(snapshot.taskSessionLinks)) {
    throw new Error("continuity snapshot is missing taskSessionLinks[]");
  }
  if (!Array.isArray(snapshot.events)) {
    throw new Error("continuity snapshot is missing events[]");
  }
  if (!Array.isArray(snapshot.commitments)) {
    throw new Error("continuity snapshot is missing commitments[]");
  }
  if (!Array.isArray(snapshot.repairs)) {
    throw new Error("continuity snapshot is missing repairs[]");
  }
  return snapshot;
}

function validateSnapshotAgentId(snapshot: ContinuitySnapshot, agentId: string): void {
  const mismatchedAgentId =
    snapshot.tasks.find((task) => task.agentId !== agentId)?.agentId ??
    snapshot.taskSessionLinks.find((link) => link.agentId !== agentId)?.agentId ??
    snapshot.events.find((event) => event.agentId !== agentId)?.agentId ??
    snapshot.commitments.find((commitment) => commitment.agentId !== agentId)?.agentId ??
    snapshot.repairs.find((repair) => repair.agentId !== agentId)?.agentId;
  if (mismatchedAgentId) {
    throw new Error(
      `continuity snapshot contains agent ${mismatchedAgentId}; expected only ${agentId}`,
    );
  }
}

async function writeSnapshot(outputPath: string, snapshot: ContinuitySnapshot): Promise<void> {
  const resolvedPath = path.resolve(outputPath);
  await fs.mkdir(path.dirname(resolvedPath), { recursive: true });
  await fs.writeFile(resolvedPath, JSON.stringify(snapshot, null, 2));
}

export async function tasksExportCommand(
  opts: TasksExportOptions,
  runtime: RuntimeEnv,
): Promise<TasksExportSummary> {
  const { cfg, agentId } = resolveTasksAgentId(opts.agentId);
  const store = getContinuityStore({ cfg, agentId });
  const snapshot = store.exportSnapshot();
  const outputPath = path.resolve(
    opts.out?.trim() || resolveContinuityBackupPath(cfg, agentId, snapshot.exportedAt),
  );
  await writeSnapshot(outputPath, snapshot);
  const summary: TasksExportSummary = {
    agentId,
    outputPath,
    schemaVersion: snapshot.schemaVersion,
    exportedAt: snapshot.exportedAt,
    counts: {
      tasks: snapshot.tasks.length,
      taskSessionLinks: snapshot.taskSessionLinks.length,
      events: snapshot.events.length,
      commitments: snapshot.commitments.length,
      repairs: snapshot.repairs.length,
    },
  };
  emitSummary(runtime, opts.json, summary, [
    `Exported continuity snapshot for ${agentId}.`,
    `Path: ${outputPath}`,
    `Tasks: ${summary.counts.tasks}, events: ${summary.counts.events}, commitments: ${summary.counts.commitments}`,
  ]);
  return summary;
}

export async function tasksImportCommand(
  opts: TasksImportOptions,
  runtime: RuntimeEnv,
): Promise<TasksImportSummary> {
  const { cfg, agentId } = resolveTasksAgentId(opts.agentId);
  const inputPath = path.resolve(opts.input);
  const raw = await fs.readFile(inputPath, "utf8");
  const snapshot = parseContinuitySnapshot(raw);
  validateSnapshotAgentId(snapshot, agentId);
  const store = getContinuityStore({ cfg, agentId });
  const result = store.importSnapshot(snapshot, { replace: opts.replace === true });
  const summary: TasksImportSummary = {
    agentId,
    inputPath,
    schemaVersion: snapshot.schemaVersion,
    replaced: result.replaced,
    imported: result.imported,
  };
  emitSummary(runtime, opts.json, summary, [
    `Imported continuity snapshot for ${agentId}.`,
    `Path: ${inputPath}`,
    `Tasks: ${summary.imported.tasks}, events: ${summary.imported.events}, commitments: ${summary.imported.commitments}`,
  ]);
  return summary;
}

export async function tasksPruneCommand(
  opts: TasksPruneOptions,
  runtime: RuntimeEnv,
): Promise<TasksPruneSummary> {
  const { cfg, agentId } = resolveTasksAgentId(opts.agentId);
  const closedTasksDays = parsePositiveDays(opts.closedTasksDays, "--closed-tasks-days", runtime);
  const eventsDays = parsePositiveDays(opts.eventsDays, "--events-days", runtime);
  const commitmentsDays = parsePositiveDays(opts.commitmentsDays, "--commitments-days", runtime);
  const repairsDays = parsePositiveDays(opts.repairsDays, "--repairs-days", runtime);
  if (
    closedTasksDays === undefined &&
    eventsDays === undefined &&
    commitmentsDays === undefined &&
    repairsDays === undefined
  ) {
    runtime.error(
      "tasks prune requires at least one retention flag (--closed-tasks-days, --events-days, --commitments-days, --repairs-days)",
    );
    runtime.exit(1);
    throw new Error("unreachable");
  }

  const store = getContinuityStore({ cfg, agentId });
  let backupPath: string | undefined;
  if (!opts.dryRun) {
    const snapshot = store.exportSnapshot();
    backupPath = path.resolve(
      opts.out?.trim() || resolveContinuityBackupPath(cfg, agentId, snapshot.exportedAt),
    );
    await writeSnapshot(backupPath, snapshot);
  }

  const result = store.prune({
    taskClosedBefore: daysToCutoff(closedTasksDays),
    eventBefore: daysToCutoff(eventsDays),
    closedCommitmentBefore: daysToCutoff(commitmentsDays),
    repairBefore: daysToCutoff(repairsDays),
    dryRun: opts.dryRun === true,
  });
  const summary: TasksPruneSummary = {
    agentId,
    dryRun: opts.dryRun === true,
    backupPath,
    result,
  };
  emitSummary(runtime, opts.json, summary, [
    `${opts.dryRun ? "Dry-run prune complete" : "Pruned continuity data"} for ${agentId}.`,
    ...(backupPath ? [`Backup: ${backupPath}`] : []),
    `Deleted tasks: ${result.deleted.tasks}, events: ${result.deleted.events}, commitments: ${result.deleted.commitments}, repairs: ${result.deleted.repairs}`,
  ]);
  return summary;
}

export async function tasksRepairRelinkCommand(
  opts: TasksRepairRelinkOptions,
  runtime: RuntimeEnv,
): Promise<TasksRepairRelinkSummary> {
  const { cfg, agentId } = resolveTasksAgentId(opts.agentId);
  const taskId = opts.taskId.trim();
  const sessionKey = opts.sessionKey.trim();
  if (!taskId || !sessionKey) {
    return exitWithRuntimeError(runtime, "tasks repair relink requires --task and --session");
  }
  const task = repairRelinkTaskToSession({
    cfg,
    agentId,
    taskId,
    sessionKey,
    detail: opts.detail,
  });
  if (!task) {
    return exitWithRuntimeError(runtime, `Unable to relink task: ${taskId}`);
  }
  const summary: TasksRepairRelinkSummary = {
    agentId,
    taskId,
    sessionKey,
    detail: opts.detail?.trim() || undefined,
    task,
  };
  emitSummary(runtime, opts.json, summary, [
    `Relinked task ${taskId} to session ${sessionKey}.`,
    `Agent: ${agentId}`,
    `Status: ${task.status}`,
  ]);
  return summary;
}

export async function tasksRepairMergeCommand(
  opts: TasksRepairMergeOptions,
  runtime: RuntimeEnv,
): Promise<TasksRepairMergeSummary> {
  const { cfg, agentId } = resolveTasksAgentId(opts.agentId);
  const sourceTaskId = opts.sourceTaskId.trim();
  const targetTaskId = opts.targetTaskId.trim();
  if (!sourceTaskId || !targetTaskId) {
    return exitWithRuntimeError(
      runtime,
      "tasks repair merge requires --source-task and --target-task",
    );
  }
  if (sourceTaskId === targetTaskId) {
    return exitWithRuntimeError(
      runtime,
      "tasks repair merge requires different --source-task and --target-task values",
    );
  }
  const result = repairMergeTasks({
    cfg,
    agentId,
    sourceTaskId,
    targetTaskId,
    detail: opts.detail,
  });
  if (!result) {
    return exitWithRuntimeError(
      runtime,
      `Unable to merge tasks: ${sourceTaskId} -> ${targetTaskId}`,
    );
  }
  const summary: TasksRepairMergeSummary = {
    agentId,
    sourceTaskId,
    targetTaskId,
    detail: opts.detail?.trim() || undefined,
    result,
  };
  emitSummary(runtime, opts.json, summary, [
    `Merged duplicate task ${sourceTaskId} into ${targetTaskId}.`,
    `Moved links/events/commitments: ${result.moved.sessionLinks}/${result.moved.events}/${result.moved.commitments}`,
    `Deduped commitments: ${result.moved.dedupedCommitments}`,
  ]);
  return summary;
}

export async function tasksRepairTaskOrphanCommand(
  opts: TasksRepairTaskOrphanOptions,
  runtime: RuntimeEnv,
): Promise<TasksRepairTaskOrphanSummary> {
  const { cfg, agentId } = resolveTasksAgentId(opts.agentId);
  const taskId = opts.taskId.trim();
  if (!taskId) {
    return exitWithRuntimeError(runtime, "tasks repair mark-task-orphan requires --task");
  }
  const task = repairMarkTaskOrphan({
    cfg,
    agentId,
    taskId,
    detail: opts.detail,
  });
  if (!task) {
    return exitWithRuntimeError(runtime, `Unable to mark orphan task: ${taskId}`);
  }
  const summary: TasksRepairTaskOrphanSummary = {
    agentId,
    taskId,
    detail: opts.detail?.trim() || undefined,
    task,
  };
  emitSummary(runtime, opts.json, summary, [
    `Marked task ${taskId} as orphan.`,
    `Agent: ${agentId}`,
    `Repair state: ${String(task.metadata?.continuityRepairState ?? "unknown")}`,
  ]);
  return summary;
}

export async function tasksRepairCommitmentOrphanCommand(
  opts: TasksRepairCommitmentOrphanOptions,
  runtime: RuntimeEnv,
): Promise<TasksRepairCommitmentOrphanSummary> {
  const { cfg, agentId } = resolveTasksAgentId(opts.agentId);
  const taskId = opts.taskId.trim();
  const commitmentId = opts.commitmentId.trim();
  if (!taskId || !commitmentId) {
    return exitWithRuntimeError(
      runtime,
      "tasks repair mark-commitment-orphan requires --task and --commitment",
    );
  }
  const commitment = repairMarkCommitmentOrphan({
    cfg,
    agentId,
    taskId,
    commitmentId,
    detail: opts.detail,
  });
  if (!commitment) {
    return exitWithRuntimeError(
      runtime,
      `Unable to mark orphan commitment: ${taskId}/${commitmentId}`,
    );
  }
  const summary: TasksRepairCommitmentOrphanSummary = {
    agentId,
    taskId,
    commitmentId,
    detail: opts.detail?.trim() || undefined,
    commitment,
  };
  emitSummary(runtime, opts.json, summary, [
    `Marked commitment ${commitmentId} on task ${taskId} as orphan.`,
    `Agent: ${agentId}`,
    `Repair state: ${String(commitment.metadata?.continuityRepairState ?? "unknown")}`,
  ]);
  return summary;
}
