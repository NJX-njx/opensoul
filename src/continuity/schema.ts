import type { DatabaseSync } from "node:sqlite";

export const CONTINUITY_SCHEMA_VERSION = 1;

const CONTINUITY_SCHEMA_SQL = `
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS continuity_meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tasks (
  task_id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL,
  status TEXT NOT NULL,
  title TEXT,
  summary TEXT,
  source_surface_json TEXT,
  current_surface_json TEXT,
  latest_session_key TEXT,
  latest_run_id TEXT,
  metadata_json TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  closed_at INTEGER
);

CREATE TABLE IF NOT EXISTS task_session_links (
  task_id TEXT NOT NULL,
  agent_id TEXT NOT NULL,
  session_key TEXT NOT NULL,
  relation TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (task_id, session_key),
  FOREIGN KEY (task_id) REFERENCES tasks(task_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS task_events (
  event_id TEXT PRIMARY KEY,
  task_id TEXT NOT NULL,
  agent_id TEXT NOT NULL,
  kind TEXT NOT NULL,
  stream TEXT,
  phase TEXT,
  session_key TEXT,
  run_id TEXT,
  summary TEXT,
  surface_json TEXT,
  payload_json TEXT,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (task_id) REFERENCES tasks(task_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS commitments (
  commitment_id TEXT PRIMARY KEY,
  task_id TEXT NOT NULL,
  agent_id TEXT NOT NULL,
  status TEXT NOT NULL,
  kind TEXT,
  title TEXT NOT NULL,
  detail TEXT,
  due_at INTEGER,
  cron_job_id TEXT,
  metadata_json TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  closed_at INTEGER,
  FOREIGN KEY (task_id) REFERENCES tasks(task_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_tasks_agent_updated
  ON tasks(agent_id, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_task_links_session_updated
  ON task_session_links(session_key, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_task_events_task_created
  ON task_events(task_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_task_events_run_created
  ON task_events(run_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_commitments_task_status
  ON commitments(task_id, status, updated_at DESC);
`;

export function ensureContinuitySchema(db: DatabaseSync): void {
  db.exec(CONTINUITY_SCHEMA_SQL);
  db.prepare(
    `INSERT INTO continuity_meta (key, value)
     VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
  ).run("schema_version", String(CONTINUITY_SCHEMA_VERSION));
}
