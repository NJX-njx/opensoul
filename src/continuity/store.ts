import type { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import type { OpenSoulConfig } from "../config/config.js";
import type {
  CommitmentRecord,
  CommitmentStatus,
  ContinuityRepairRecord,
  SurfaceRef,
  TaskEvent,
  TaskRecord,
  TaskSessionLink,
  TaskStatus,
} from "./types.js";
import { requireNodeSqlite } from "../memory/sqlite.js";
import { resolveContinuityDbPath } from "./paths.js";
import { type ContinuitySchemaState, ensureContinuitySchema } from "./schema.js";

type TaskRow = {
  task_id: string;
  agent_id: string;
  status: string;
  title: string | null;
  summary: string | null;
  source_surface_json: string | null;
  current_surface_json: string | null;
  latest_session_key: string | null;
  latest_run_id: string | null;
  metadata_json: string | null;
  created_at: number;
  updated_at: number;
  closed_at: number | null;
};

type TaskSessionLinkRow = {
  task_id: string;
  agent_id: string;
  session_key: string;
  relation: string;
  created_at: number;
  updated_at: number;
};

type TaskEventRow = {
  event_id: string;
  task_id: string;
  agent_id: string;
  kind: string;
  stream: string | null;
  phase: string | null;
  session_key: string | null;
  run_id: string | null;
  summary: string | null;
  surface_json: string | null;
  payload_json: string | null;
  created_at: number;
};

type CommitmentRow = {
  commitment_id: string;
  task_id: string;
  agent_id: string;
  status: string;
  kind: string | null;
  title: string;
  detail: string | null;
  due_at: number | null;
  cron_job_id: string | null;
  metadata_json: string | null;
  created_at: number;
  updated_at: number;
  closed_at: number | null;
};

type ContinuityRepairRow = {
  repair_id: string;
  agent_id: string;
  task_id: string | null;
  session_key: string | null;
  kind: string;
  detail: string | null;
  payload_json: string | null;
  created_at: number;
};

type ContinuityMetaRow = {
  value: string;
};

type IntegrityCheckRow = {
  integrity_check?: string;
};

type ForeignKeyCheckRow = {
  table: string;
  rowid: number;
  parent: string;
  fkid: number;
};

type ListTasksOptions = {
  limit?: number;
  status?: TaskStatus;
  sessionKey?: string;
};

type ListTaskEventsOptions = {
  taskId: string;
  limit?: number;
};

type ListCommitmentsOptions = {
  taskId: string;
  status?: CommitmentStatus;
};

const STORE_CACHE = new Map<string, ContinuityStore>();

function parseJsonValue<T>(value: unknown): T | undefined {
  if (typeof value !== "string" || !value.trim()) {
    return undefined;
  }
  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
}

function stringifyJson(value: unknown): string | null {
  if (value == null) {
    return null;
  }
  return JSON.stringify(value);
}

function readTaskRow(row: TaskRow | undefined): TaskRecord | null {
  if (!row) {
    return null;
  }
  return {
    taskId: row.task_id,
    agentId: row.agent_id,
    status: row.status as TaskStatus,
    title: row.title ?? undefined,
    summary: row.summary ?? undefined,
    sourceSurface: parseJsonValue<SurfaceRef>(row.source_surface_json),
    currentSurface: parseJsonValue<SurfaceRef>(row.current_surface_json),
    latestSessionKey: row.latest_session_key ?? undefined,
    latestRunId: row.latest_run_id ?? undefined,
    metadata: parseJsonValue<Record<string, unknown>>(row.metadata_json),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    closedAt: row.closed_at ?? undefined,
  };
}

function readTaskSessionLinkRow(row: TaskSessionLinkRow): TaskSessionLink {
  return {
    taskId: row.task_id,
    agentId: row.agent_id,
    sessionKey: row.session_key,
    relation: row.relation as TaskSessionLink["relation"],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function readTaskEventRow(row: TaskEventRow): TaskEvent {
  return {
    eventId: row.event_id,
    taskId: row.task_id,
    agentId: row.agent_id,
    kind: row.kind,
    stream: row.stream ?? undefined,
    phase: row.phase ?? undefined,
    sessionKey: row.session_key ?? undefined,
    runId: row.run_id ?? undefined,
    summary: row.summary ?? undefined,
    surface: parseJsonValue<SurfaceRef>(row.surface_json),
    createdAt: row.created_at,
    payload: parseJsonValue<Record<string, unknown>>(row.payload_json),
  };
}

function readCommitmentRow(row: CommitmentRow): CommitmentRecord {
  return {
    commitmentId: row.commitment_id,
    taskId: row.task_id,
    agentId: row.agent_id,
    status: row.status as CommitmentStatus,
    kind: row.kind ?? undefined,
    title: row.title,
    detail: row.detail ?? undefined,
    dueAt: row.due_at ?? undefined,
    cronJobId: row.cron_job_id ?? undefined,
    metadata: parseJsonValue<Record<string, unknown>>(row.metadata_json),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    closedAt: row.closed_at ?? undefined,
  };
}

function readContinuityRepairRow(row: ContinuityRepairRow): ContinuityRepairRecord {
  return {
    repairId: row.repair_id,
    agentId: row.agent_id,
    taskId: row.task_id ?? undefined,
    sessionKey: row.session_key ?? undefined,
    kind: row.kind,
    detail: row.detail ?? undefined,
    payload: parseJsonValue<Record<string, unknown>>(row.payload_json),
    createdAt: row.created_at,
  };
}

function resolveLimit(limit: number | undefined, defaultValue: number): number {
  if (typeof limit !== "number" || !Number.isFinite(limit)) {
    return defaultValue;
  }
  return Math.max(1, Math.min(500, Math.floor(limit)));
}

export class ContinuityStore {
  readonly path: string;
  readonly db: DatabaseSync;
  readonly schemaState: ContinuitySchemaState;

  constructor(dbPath: string, db: DatabaseSync, schemaState: ContinuitySchemaState) {
    this.path = dbPath;
    this.db = db;
    this.schemaState = schemaState;
  }

  transaction<T>(fn: () => T): T {
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const result = fn();
      this.db.exec("COMMIT");
      return result;
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
  }

  getTask(taskId: string): TaskRecord | null {
    const row = this.db
      .prepare(
        `SELECT
           task_id,
           agent_id,
           status,
           title,
           summary,
           source_surface_json,
           current_surface_json,
           latest_session_key,
           latest_run_id,
           metadata_json,
           created_at,
           updated_at,
           closed_at
         FROM tasks
         WHERE task_id = ?`,
      )
      .get(taskId) as TaskRow | undefined;
    return readTaskRow(row);
  }

  listTasks(options: ListTasksOptions = {}): Array<TaskRecord> {
    const limit = resolveLimit(options.limit, 50);
    if (options.sessionKey) {
      const rows = this.db
        .prepare(
          `SELECT
             t.task_id,
             t.agent_id,
             t.status,
             t.title,
             t.summary,
             t.source_surface_json,
             t.current_surface_json,
             t.latest_session_key,
             t.latest_run_id,
             t.metadata_json,
             t.created_at,
             t.updated_at,
             t.closed_at
           FROM tasks t
           INNER JOIN task_session_links l
             ON l.task_id = t.task_id
           WHERE l.session_key = ?
           ORDER BY t.updated_at DESC
           LIMIT ?`,
        )
        .all(options.sessionKey, limit) as Array<TaskRow>;
      return rows.map((row) => readTaskRow(row)).filter((row): row is TaskRecord => row != null);
    }
    if (options.status) {
      const rows = this.db
        .prepare(
          `SELECT
             task_id,
             agent_id,
             status,
             title,
             summary,
             source_surface_json,
             current_surface_json,
             latest_session_key,
             latest_run_id,
             metadata_json,
             created_at,
             updated_at,
             closed_at
           FROM tasks
           WHERE status = ?
           ORDER BY updated_at DESC
           LIMIT ?`,
        )
        .all(options.status, limit) as Array<TaskRow>;
      return rows.map((row) => readTaskRow(row)).filter((row): row is TaskRecord => row != null);
    }
    const rows = this.db
      .prepare(
        `SELECT
           task_id,
           agent_id,
           status,
           title,
           summary,
           source_surface_json,
           current_surface_json,
           latest_session_key,
           latest_run_id,
           metadata_json,
           created_at,
           updated_at,
           closed_at
         FROM tasks
         ORDER BY updated_at DESC
         LIMIT ?`,
      )
      .all(limit) as Array<TaskRow>;
    return rows.map((row) => readTaskRow(row)).filter((row): row is TaskRecord => row != null);
  }

  listAllTasks(): Array<TaskRecord> {
    const rows = this.db
      .prepare(
        `SELECT
           task_id,
           agent_id,
           status,
           title,
           summary,
           source_surface_json,
           current_surface_json,
           latest_session_key,
           latest_run_id,
           metadata_json,
           created_at,
           updated_at,
           closed_at
         FROM tasks
         ORDER BY updated_at DESC`,
      )
      .all() as Array<TaskRow>;
    return rows.map((row) => readTaskRow(row)).filter((row): row is TaskRecord => row != null);
  }

  upsertTask(task: TaskRecord): TaskRecord {
    this.db
      .prepare(
        `INSERT INTO tasks (
           task_id,
           agent_id,
           status,
           title,
           summary,
           source_surface_json,
           current_surface_json,
           latest_session_key,
           latest_run_id,
           metadata_json,
           created_at,
           updated_at,
           closed_at
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(task_id) DO UPDATE SET
           agent_id = excluded.agent_id,
           status = excluded.status,
           title = excluded.title,
           summary = excluded.summary,
           source_surface_json = excluded.source_surface_json,
           current_surface_json = excluded.current_surface_json,
           latest_session_key = excluded.latest_session_key,
           latest_run_id = excluded.latest_run_id,
           metadata_json = excluded.metadata_json,
           created_at = excluded.created_at,
           updated_at = excluded.updated_at,
           closed_at = excluded.closed_at`,
      )
      .run(
        task.taskId,
        task.agentId,
        task.status,
        task.title ?? null,
        task.summary ?? null,
        stringifyJson(task.sourceSurface),
        stringifyJson(task.currentSurface),
        task.latestSessionKey ?? null,
        task.latestRunId ?? null,
        stringifyJson(task.metadata),
        task.createdAt,
        task.updatedAt,
        task.closedAt ?? null,
      );
    return task;
  }

  upsertTaskSessionLink(link: TaskSessionLink): TaskSessionLink {
    this.db
      .prepare(
        `INSERT INTO task_session_links (
           task_id,
           agent_id,
           session_key,
           relation,
           created_at,
           updated_at
         ) VALUES (?, ?, ?, ?, ?, ?)
         ON CONFLICT(task_id, session_key) DO UPDATE SET
           agent_id = excluded.agent_id,
           relation = excluded.relation,
           updated_at = excluded.updated_at`,
      )
      .run(
        link.taskId,
        link.agentId,
        link.sessionKey,
        link.relation,
        link.createdAt,
        link.updatedAt,
      );
    return link;
  }

  getTaskSessionLinks(taskId: string): Array<TaskSessionLink> {
    const rows = this.db
      .prepare(
        `SELECT task_id, agent_id, session_key, relation, created_at, updated_at
         FROM task_session_links
         WHERE task_id = ?
         ORDER BY updated_at DESC`,
      )
      .all(taskId) as Array<TaskSessionLinkRow>;
    return rows.map(readTaskSessionLinkRow);
  }

  deleteTaskSessionLink(taskId: string, sessionKey: string): void {
    this.db
      .prepare(`DELETE FROM task_session_links WHERE task_id = ? AND session_key = ?`)
      .run(taskId, sessionKey);
  }

  getLatestLinkedTask(sessionKey: string, statuses?: Array<TaskStatus>): TaskRecord | null {
    if (statuses && statuses.length > 0) {
      const placeholders = statuses.map(() => "?").join(", ");
      const row = this.db
        .prepare(
          `SELECT
             t.task_id,
             t.agent_id,
             t.status,
             t.title,
             t.summary,
             t.source_surface_json,
             t.current_surface_json,
             t.latest_session_key,
             t.latest_run_id,
             t.metadata_json,
             t.created_at,
             t.updated_at,
             t.closed_at
           FROM tasks t
           INNER JOIN task_session_links l
             ON l.task_id = t.task_id
           WHERE l.session_key = ?
             AND t.status IN (${placeholders})
           ORDER BY l.updated_at DESC, t.updated_at DESC
           LIMIT 1`,
        )
        .get(sessionKey, ...statuses) as TaskRow | undefined;
      return readTaskRow(row);
    }
    const row = this.db
      .prepare(
        `SELECT
           t.task_id,
           t.agent_id,
           t.status,
           t.title,
           t.summary,
           t.source_surface_json,
           t.current_surface_json,
           t.latest_session_key,
           t.latest_run_id,
           t.metadata_json,
           t.created_at,
           t.updated_at,
           t.closed_at
         FROM tasks t
         INNER JOIN task_session_links l
           ON l.task_id = t.task_id
         WHERE l.session_key = ?
         ORDER BY l.updated_at DESC, t.updated_at DESC
         LIMIT 1`,
      )
      .get(sessionKey) as TaskRow | undefined;
    return readTaskRow(row);
  }

  appendTaskEvent(event: TaskEvent): TaskEvent {
    this.db
      .prepare(
        `INSERT INTO task_events (
           event_id,
           task_id,
           agent_id,
           kind,
           stream,
           phase,
           session_key,
           run_id,
           summary,
           surface_json,
           payload_json,
           created_at
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        event.eventId,
        event.taskId,
        event.agentId,
        event.kind,
        event.stream ?? null,
        event.phase ?? null,
        event.sessionKey ?? null,
        event.runId ?? null,
        event.summary ?? null,
        stringifyJson(event.surface),
        stringifyJson(event.payload),
        event.createdAt,
      );
    return event;
  }

  listTaskEvents(options: ListTaskEventsOptions): Array<TaskEvent> {
    const limit = resolveLimit(options.limit, 100);
    const rows = this.db
      .prepare(
        `SELECT
           event_id,
           task_id,
           agent_id,
           kind,
           stream,
           phase,
           session_key,
           run_id,
           summary,
           surface_json,
           payload_json,
           created_at
         FROM task_events
         WHERE task_id = ?
         ORDER BY created_at DESC
         LIMIT ?`,
      )
      .all(options.taskId, limit) as Array<TaskEventRow>;
    return rows.map(readTaskEventRow);
  }

  upsertCommitment(commitment: CommitmentRecord): CommitmentRecord {
    this.db
      .prepare(
        `INSERT INTO commitments (
           commitment_id,
           task_id,
           agent_id,
           status,
           kind,
           title,
           detail,
           due_at,
           cron_job_id,
           metadata_json,
           created_at,
           updated_at,
           closed_at
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(commitment_id) DO UPDATE SET
           task_id = excluded.task_id,
           agent_id = excluded.agent_id,
           status = excluded.status,
           kind = excluded.kind,
           title = excluded.title,
           detail = excluded.detail,
           due_at = excluded.due_at,
           cron_job_id = excluded.cron_job_id,
           metadata_json = excluded.metadata_json,
           created_at = excluded.created_at,
           updated_at = excluded.updated_at,
           closed_at = excluded.closed_at`,
      )
      .run(
        commitment.commitmentId,
        commitment.taskId,
        commitment.agentId,
        commitment.status,
        commitment.kind ?? null,
        commitment.title,
        commitment.detail ?? null,
        commitment.dueAt ?? null,
        commitment.cronJobId ?? null,
        stringifyJson(commitment.metadata),
        commitment.createdAt,
        commitment.updatedAt,
        commitment.closedAt ?? null,
      );
    return commitment;
  }

  listCommitments(options: ListCommitmentsOptions): Array<CommitmentRecord> {
    const rows = options.status
      ? (this.db
          .prepare(
            `SELECT
               commitment_id,
               task_id,
               agent_id,
               status,
               kind,
               title,
               detail,
               due_at,
               cron_job_id,
               metadata_json,
               created_at,
               updated_at,
               closed_at
             FROM commitments
             WHERE task_id = ? AND status = ?
             ORDER BY updated_at DESC`,
          )
          .all(options.taskId, options.status) as Array<CommitmentRow>)
      : (this.db
          .prepare(
            `SELECT
               commitment_id,
               task_id,
               agent_id,
               status,
               kind,
               title,
               detail,
               due_at,
               cron_job_id,
               metadata_json,
               created_at,
               updated_at,
               closed_at
             FROM commitments
             WHERE task_id = ?
             ORDER BY updated_at DESC`,
          )
          .all(options.taskId) as Array<CommitmentRow>);
    return rows.map(readCommitmentRow);
  }

  appendRepair(record: ContinuityRepairRecord): ContinuityRepairRecord {
    this.db
      .prepare(
        `INSERT INTO continuity_repairs (
           repair_id,
           agent_id,
           task_id,
           session_key,
           kind,
           detail,
           payload_json,
           created_at
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        record.repairId,
        record.agentId,
        record.taskId ?? null,
        record.sessionKey ?? null,
        record.kind,
        record.detail ?? null,
        stringifyJson(record.payload),
        record.createdAt,
      );
    return record;
  }

  listRepairs(limit = 100): Array<ContinuityRepairRecord> {
    const rows = this.db
      .prepare(
        `SELECT
           repair_id,
           agent_id,
           task_id,
           session_key,
           kind,
           detail,
           payload_json,
           created_at
         FROM continuity_repairs
         ORDER BY created_at DESC
         LIMIT ?`,
      )
      .all(resolveLimit(limit, 100)) as Array<ContinuityRepairRow>;
    return rows.map(readContinuityRepairRow);
  }

  readMeta(key: string): string | undefined {
    const row = this.db.prepare(`SELECT value FROM continuity_meta WHERE key = ?`).get(key) as
      | ContinuityMetaRow
      | undefined;
    return row?.value;
  }

  runIntegrityCheck(): Array<string> {
    const rows = this.db.prepare(`PRAGMA integrity_check`).all() as Array<IntegrityCheckRow>;
    return rows
      .map((row) => row.integrity_check)
      .filter((value): value is string => typeof value === "string" && value.trim().length > 0);
  }

  runForeignKeyCheck(): Array<{
    table: string;
    rowId: number;
    parent: string;
    foreignKeyId: number;
  }> {
    const rows = this.db.prepare(`PRAGMA foreign_key_check`).all() as Array<ForeignKeyCheckRow>;
    return rows.map((row) => ({
      table: row.table,
      rowId: row.rowid,
      parent: row.parent,
      foreignKeyId: row.fkid,
    }));
  }

  close(): void {
    STORE_CACHE.delete(this.path);
    this.db.close();
  }
}

export function openContinuityStore(dbPath: string): ContinuityStore {
  const existing = STORE_CACHE.get(dbPath);
  if (existing) {
    return existing;
  }
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const sqlite = requireNodeSqlite();
  const db = new sqlite.DatabaseSync(dbPath);
  db.exec("PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL; PRAGMA busy_timeout = 5000;");
  const schemaState = ensureContinuitySchema(db);
  const store = new ContinuityStore(dbPath, db, schemaState);
  STORE_CACHE.set(dbPath, store);
  return store;
}

export function getContinuityStore(params: {
  cfg: OpenSoulConfig;
  agentId: string;
}): ContinuityStore {
  return openContinuityStore(resolveContinuityDbPath(params.cfg, params.agentId));
}

export function resetContinuityStoreCacheForTest(): void {
  for (const store of STORE_CACHE.values()) {
    try {
      store.db.close();
    } catch {
      // ignore test cleanup failures
    }
  }
  STORE_CACHE.clear();
}
