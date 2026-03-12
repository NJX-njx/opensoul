import crypto from "node:crypto";
import fs from "node:fs";
import type { OpenSoulConfig } from "../config/config.js";
import type {
  CommitmentRecord,
  TaskRecord,
  TaskSessionLink,
  TaskSessionRelation,
} from "./types.js";
import { listAgentIds } from "../agents/agent-scope.js";
import {
  loadSessionStore,
  resolveStorePath,
  saveSessionStore,
  type SessionEntry,
} from "../config/sessions.js";
import { parseAgentSessionKey } from "../routing/session-key.js";
import { resolveContinuityDbPath } from "./paths.js";
import { CONTINUITY_SCHEMA_VERSION } from "./schema.js";
import {
  appendTaskEvent,
  listOpenCommitments,
  updateCommitmentStatus,
  updateTaskStatus,
} from "./service.js";
import { openContinuityStore } from "./store.js";

type RecoveryLogger = {
  info?: (message: string) => void;
  warn?: (message: string) => void;
  error?: (message: string) => void;
};

export type ContinuityRecoveryReport = {
  agentId: string;
  schemaVersion: number;
  migratedSchemaFrom?: number;
  aheadOfRuntimeSchema?: boolean;
  tasksScanned: number;
  tasksUpdated: number;
  sessionsUpdated: number;
  linksUpdated: number;
  commitmentsCancelled: number;
  interruptedRuns: number;
  repairRecords: number;
  issues: Array<string>;
};

function inferSessionLinkRelation(
  sessionKey: string,
  entry: SessionEntry,
  taskId: string,
): TaskSessionRelation {
  if (entry.activeTaskId === taskId) {
    return "active";
  }
  const rawKey = parseAgentSessionKey(sessionKey)?.rest ?? sessionKey;
  if (rawKey.startsWith("subagent:")) {
    return "spawned";
  }
  if (rawKey.startsWith("cron:")) {
    return "cron";
  }
  return "linked";
}

function isClosedTask(task: TaskRecord | null | undefined): task is TaskRecord {
  return task?.status === "completed" || task?.status === "cancelled";
}

function updateTaskRecord(task: TaskRecord, patch: Partial<TaskRecord>): TaskRecord {
  return {
    ...task,
    ...patch,
    updatedAt: Math.max(Date.now(), task.updatedAt + 1),
  };
}

function describeCommitment(commitment: CommitmentRecord): string {
  return commitment.detail?.trim() || commitment.title;
}

function buildRepairDetail(kind: string, detail: string | undefined): string {
  return detail ? `${kind}: ${detail}` : kind;
}

function recordRepair(params: {
  store?: ReturnType<typeof openContinuityStore>;
  report: ContinuityRecoveryReport;
  agentId: string;
  kind: string;
  detail?: string;
  taskId?: string;
  sessionKey?: string;
  payload?: Record<string, unknown>;
}): void {
  params.report.issues.push(buildRepairDetail(params.kind, params.detail));
  if (!params.store) {
    return;
  }
  params.store.appendRepair({
    repairId: crypto.randomUUID(),
    agentId: params.agentId,
    taskId: params.taskId,
    sessionKey: params.sessionKey,
    kind: params.kind,
    detail: params.detail,
    payload: params.payload,
    createdAt: Date.now(),
  });
  params.report.repairRecords += 1;
}

function ensureTaskLink(params: {
  store: ReturnType<typeof openContinuityStore>;
  report: ContinuityRecoveryReport;
  agentId: string;
  task: TaskRecord;
  sessionKey: string;
  relation: TaskSessionRelation;
}): void {
  const existing = params.store
    .getTaskSessionLinks(params.task.taskId)
    .find((link) => link.sessionKey === params.sessionKey);
  if (existing && existing.relation === params.relation) {
    return;
  }
  const now = Date.now();
  params.store.upsertTaskSessionLink({
    taskId: params.task.taskId,
    agentId: params.agentId,
    sessionKey: params.sessionKey,
    relation: params.relation,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  });
  params.report.linksUpdated += 1;
  recordRepair({
    store: params.store,
    report: params.report,
    agentId: params.agentId,
    kind: existing ? "task-session-link-repaired" : "task-session-link-created",
    detail: `${params.task.taskId} -> ${params.sessionKey} (${params.relation})`,
    taskId: params.task.taskId,
    sessionKey: params.sessionKey,
  });
}

function updateTaskLatestSession(params: {
  store: ReturnType<typeof openContinuityStore>;
  report: ContinuityRecoveryReport;
  agentId: string;
  task: TaskRecord;
  latestSessionKey?: string;
  reason: string;
}): TaskRecord {
  const nextTask = updateTaskRecord(params.task, {
    latestSessionKey: params.latestSessionKey,
  });
  params.store.upsertTask(nextTask);
  params.report.tasksUpdated += 1;
  recordRepair({
    store: params.store,
    report: params.report,
    agentId: params.agentId,
    kind: "task-latest-session-repaired",
    detail: `${params.task.taskId} -> ${params.latestSessionKey ?? "cleared"} (${params.reason})`,
    taskId: params.task.taskId,
    sessionKey: params.latestSessionKey,
  });
  return nextTask;
}

function choosePreferredSessionKey(
  task: TaskRecord,
  liveLinks: Array<TaskSessionLink>,
  sessionStore: Record<string, SessionEntry>,
): string | undefined {
  if (task.latestSessionKey && sessionStore[task.latestSessionKey]) {
    return task.latestSessionKey;
  }
  const activeLink = liveLinks.find((link) => link.relation === "active");
  if (activeLink) {
    return activeLink.sessionKey;
  }
  return liveLinks[0]?.sessionKey;
}

async function recoverSessionsWithoutDb(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  sessionStore: Record<string, SessionEntry>;
  report: ContinuityRecoveryReport;
  logger?: RecoveryLogger;
}): Promise<void> {
  let changed = false;
  for (const [sessionKey, entry] of Object.entries(params.sessionStore)) {
    let entryChanged = false;
    if (entry.activeTaskId) {
      delete entry.activeTaskId;
      entryChanged = true;
      recordRepair({
        report: params.report,
        agentId: params.agentId,
        kind: "session-active-task-cleared",
        detail: `continuity db missing for ${sessionKey}`,
        sessionKey,
      });
    }
    if (entry.lastTaskId) {
      delete entry.lastTaskId;
      entryChanged = true;
      recordRepair({
        report: params.report,
        agentId: params.agentId,
        kind: "session-last-task-cleared",
        detail: `continuity db missing for ${sessionKey}`,
        sessionKey,
      });
    }
    if (entryChanged) {
      entry.updatedAt = Date.now();
      changed = true;
      params.report.sessionsUpdated += 1;
    }
  }
  if (changed) {
    const storePath = resolveStorePath(params.cfg.session?.store, { agentId: params.agentId });
    await saveSessionStore(storePath, params.sessionStore);
    params.logger?.warn?.(
      `continuity recovery: cleared dangling session task references for agent ${params.agentId} because continuity db is missing`,
    );
  }
}

export async function recoverContinuityForAgent(params: {
  cfg: OpenSoulConfig;
  agentId: string;
  logger?: RecoveryLogger;
}): Promise<ContinuityRecoveryReport> {
  const report: ContinuityRecoveryReport = {
    agentId: params.agentId,
    schemaVersion: 0,
    tasksScanned: 0,
    tasksUpdated: 0,
    sessionsUpdated: 0,
    linksUpdated: 0,
    commitmentsCancelled: 0,
    interruptedRuns: 0,
    repairRecords: 0,
    issues: [],
  };
  const storePath = resolveStorePath(params.cfg.session?.store, { agentId: params.agentId });
  const sessionStore = loadSessionStore(storePath, { skipCache: true });
  const dbPath = resolveContinuityDbPath(params.cfg, params.agentId);
  if (!fs.existsSync(dbPath)) {
    await recoverSessionsWithoutDb({
      cfg: params.cfg,
      agentId: params.agentId,
      sessionStore,
      report,
      logger: params.logger,
    });
    return report;
  }

  const store = openContinuityStore(dbPath);
  report.schemaVersion = store.schemaState.version;
  report.migratedSchemaFrom = store.schemaState.migratedFrom;
  report.aheadOfRuntimeSchema = store.schemaState.aheadOfRuntime;
  if (store.schemaState.aheadOfRuntime) {
    recordRepair({
      report,
      agentId: params.agentId,
      kind: "continuity-schema-ahead-of-runtime",
      detail: `db=${store.schemaState.version} runtime=${CONTINUITY_SCHEMA_VERSION}`,
    });
    params.logger?.warn?.(
      `continuity recovery: agent ${params.agentId} uses schema v${store.schemaState.version}, ahead of runtime v${CONTINUITY_SCHEMA_VERSION}; skipping repair`,
    );
    return report;
  }

  const integrityIssues = store
    .runIntegrityCheck()
    .filter((issue) => issue.trim().toLowerCase() !== "ok");
  for (const issue of integrityIssues) {
    recordRepair({
      store,
      report,
      agentId: params.agentId,
      kind: "continuity-integrity-check",
      detail: issue,
    });
  }
  const foreignKeyIssues = store.runForeignKeyCheck();
  for (const issue of foreignKeyIssues) {
    recordRepair({
      store,
      report,
      agentId: params.agentId,
      kind: "continuity-foreign-key-check",
      detail: `${issue.table} row=${issue.rowId} parent=${issue.parent} fkid=${issue.foreignKeyId}`,
    });
  }

  const tasks = store.listAllTasks();
  report.tasksScanned = tasks.length;
  const taskMap = new Map(tasks.map((task) => [task.taskId, task] as const));
  let sessionStoreChanged = false;

  for (const [sessionKey, entry] of Object.entries(sessionStore)) {
    let entryChanged = false;
    const activeTask = entry.activeTaskId ? (taskMap.get(entry.activeTaskId) ?? null) : null;
    const lastTask = entry.lastTaskId ? (taskMap.get(entry.lastTaskId) ?? null) : null;

    if (entry.activeTaskId && (!activeTask || isClosedTask(activeTask))) {
      recordRepair({
        store,
        report,
        agentId: params.agentId,
        kind: "session-active-task-cleared",
        detail: activeTask
          ? `${sessionKey} -> ${activeTask.taskId} (${activeTask.status})`
          : `${sessionKey} -> ${entry.activeTaskId} missing`,
        sessionKey,
        taskId: entry.activeTaskId,
      });
      delete entry.activeTaskId;
      entryChanged = true;
    }

    if (entry.lastTaskId && !lastTask) {
      recordRepair({
        store,
        report,
        agentId: params.agentId,
        kind: "session-last-task-cleared",
        detail: `${sessionKey} -> ${entry.lastTaskId} missing`,
        sessionKey,
        taskId: entry.lastTaskId,
      });
      delete entry.lastTaskId;
      entryChanged = true;
    }

    if (entry.activeTaskId && activeTask) {
      if (entry.lastTaskId !== activeTask.taskId) {
        entry.lastTaskId = activeTask.taskId;
        entryChanged = true;
      }
      ensureTaskLink({
        store,
        report,
        agentId: params.agentId,
        task: activeTask,
        sessionKey,
        relation: inferSessionLinkRelation(sessionKey, entry, activeTask.taskId),
      });
      if (activeTask.latestSessionKey !== sessionKey) {
        const nextTask = updateTaskLatestSession({
          store,
          report,
          agentId: params.agentId,
          task: activeTask,
          latestSessionKey: sessionKey,
          reason: "session-active-task",
        });
        taskMap.set(nextTask.taskId, nextTask);
      }
    }

    if (entry.lastTaskId && lastTask) {
      ensureTaskLink({
        store,
        report,
        agentId: params.agentId,
        task: lastTask,
        sessionKey,
        relation: inferSessionLinkRelation(sessionKey, entry, lastTask.taskId),
      });
      if (!lastTask.latestSessionKey) {
        const nextTask = updateTaskLatestSession({
          store,
          report,
          agentId: params.agentId,
          task: lastTask,
          latestSessionKey: sessionKey,
          reason: "session-last-task",
        });
        taskMap.set(nextTask.taskId, nextTask);
      }
    }

    if (entryChanged) {
      entry.updatedAt = Date.now();
      sessionStoreChanged = true;
      report.sessionsUpdated += 1;
    }
  }

  for (const [taskId, existingTask] of taskMap.entries()) {
    let task = store.getTask(taskId) ?? existingTask;
    const links = store.getTaskSessionLinks(task.taskId);
    for (const link of links) {
      if (sessionStore[link.sessionKey]) {
        continue;
      }
      store.deleteTaskSessionLink(link.taskId, link.sessionKey);
      report.linksUpdated += 1;
      recordRepair({
        store,
        report,
        agentId: params.agentId,
        kind: "task-session-link-removed",
        detail: `${link.taskId} -> ${link.sessionKey} missing session`,
        taskId: link.taskId,
        sessionKey: link.sessionKey,
      });
    }

    const liveLinks = store
      .getTaskSessionLinks(task.taskId)
      .filter((link) => sessionStore[link.sessionKey]);
    const preferredSessionKey = choosePreferredSessionKey(task, liveLinks, sessionStore);
    if (preferredSessionKey !== task.latestSessionKey) {
      task = updateTaskLatestSession({
        store,
        report,
        agentId: params.agentId,
        task,
        latestSessionKey: preferredSessionKey,
        reason: preferredSessionKey ? "link-repair" : "orphaned-latest-session",
      });
      taskMap.set(task.taskId, task);
    }

    if (!preferredSessionKey && !task.latestSessionKey) {
      recordRepair({
        store,
        report,
        agentId: params.agentId,
        kind: "task-without-session-link",
        detail: `${task.taskId} has no live session links`,
        taskId: task.taskId,
      });
    }

    if (task.status === "running") {
      const failedTask = updateTaskStatus({
        cfg: params.cfg,
        agentId: params.agentId,
        taskId: task.taskId,
        status: "failed",
        reason: "gateway-restart-recovery",
        sourceEvent: "recovery.restart-interrupted",
      });
      if (failedTask) {
        task = failedTask;
        taskMap.set(task.taskId, task);
        report.tasksUpdated += 1;
        report.interruptedRuns += 1;
        appendTaskEvent({
          cfg: params.cfg,
          agentId: params.agentId,
          taskId: task.taskId,
          kind: "recovery.restart-interrupted",
          sessionKey: task.latestSessionKey,
          runId: task.latestRunId,
          summary: "Marked failed after gateway restart interrupted an in-flight run",
          surface: task.currentSurface,
          payload: {
            previousStatus: "running",
            nextStatus: "failed",
          },
        });
        recordRepair({
          store,
          report,
          agentId: params.agentId,
          kind: "task-running-marked-failed",
          detail: task.taskId,
          taskId: task.taskId,
          sessionKey: task.latestSessionKey,
        });
      }
    }

    if (task.status === "completed" || task.status === "cancelled") {
      const openCommitments = listOpenCommitments({
        cfg: params.cfg,
        agentId: params.agentId,
        taskId: task.taskId,
      });
      for (const commitment of openCommitments) {
        const updated = updateCommitmentStatus({
          cfg: params.cfg,
          agentId: params.agentId,
          taskId: task.taskId,
          commitmentId: commitment.commitmentId,
          status: "cancelled",
        });
        if (!updated) {
          continue;
        }
        report.commitmentsCancelled += 1;
        appendTaskEvent({
          cfg: params.cfg,
          agentId: params.agentId,
          taskId: task.taskId,
          kind: "commitment.cancelled",
          sessionKey: task.latestSessionKey,
          runId: task.latestRunId,
          summary: `Cancelled commitment after closed task: ${updated.title}`,
          surface: task.currentSurface,
          payload: {
            commitmentId: updated.commitmentId,
            title: describeCommitment(updated),
            reason: "task-closed-recovery",
            taskStatus: task.status,
          },
        });
        recordRepair({
          store,
          report,
          agentId: params.agentId,
          kind: "closed-task-open-commitment-cancelled",
          detail: `${task.taskId} -> ${updated.commitmentId}`,
          taskId: task.taskId,
          sessionKey: task.latestSessionKey,
        });
      }
    }
  }

  if (sessionStoreChanged) {
    await saveSessionStore(storePath, sessionStore);
  }

  if (
    report.tasksUpdated > 0 ||
    report.sessionsUpdated > 0 ||
    report.linksUpdated > 0 ||
    report.commitmentsCancelled > 0 ||
    report.interruptedRuns > 0 ||
    report.repairRecords > 0
  ) {
    params.logger?.info?.(
      `continuity recovery: agent=${params.agentId} tasks=${report.tasksScanned} taskUpdates=${report.tasksUpdated} sessionUpdates=${report.sessionsUpdated} linkUpdates=${report.linksUpdated} interruptedRuns=${report.interruptedRuns} cancelledCommitments=${report.commitmentsCancelled}`,
    );
  }

  return report;
}

export async function recoverContinuityOnStartup(params: {
  cfg: OpenSoulConfig;
  logger?: RecoveryLogger;
}): Promise<Array<ContinuityRecoveryReport>> {
  const reports: Array<ContinuityRecoveryReport> = [];
  for (const agentId of listAgentIds(params.cfg)) {
    try {
      reports.push(
        await recoverContinuityForAgent({
          cfg: params.cfg,
          agentId,
          logger: params.logger,
        }),
      );
    } catch (error) {
      params.logger?.warn?.(
        `continuity recovery failed for agent ${agentId}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
  return reports;
}
