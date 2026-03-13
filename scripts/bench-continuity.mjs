#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));

function readSchemaSql() {
  const schemaPath = path.join(scriptDir, "..", "src", "continuity", "schema.ts");
  const source = fs.readFileSync(schemaPath, "utf8");
  const match = source.match(/const CONTINUITY_SCHEMA_SQL = `([\s\S]*?)`;/);
  if (!match?.[1]) {
    throw new Error(`Unable to extract continuity schema SQL from ${schemaPath}`);
  }
  return match[1];
}

function parseNumberArg(argv, name, fallback, min = 1) {
  const prefix = `--${name}=`;
  const inline = argv.find((value) => value.startsWith(prefix));
  const raw =
    inline?.slice(prefix.length) ??
    (() => {
      const index = argv.indexOf(`--${name}`);
      return index >= 0 ? argv[index + 1] : undefined;
    })();
  if (raw == null) {
    return fallback;
  }
  const parsed = Number.parseInt(String(raw), 10);
  if (!Number.isFinite(parsed) || parsed < min) {
    throw new Error(`--${name} must be an integer >= ${min}`);
  }
  return parsed;
}

function resolveArgs(argv) {
  return {
    tasks: parseNumberArg(argv, "tasks", 500, 1),
    eventsPerTask: parseNumberArg(argv, "events-per-task", 120, 1),
    commitmentsPerTask: parseNumberArg(argv, "commitments-per-task", 60, 1),
    iterations: parseNumberArg(argv, "iterations", 20, 1),
  };
}

function percentile(values, ratio) {
  if (values.length === 0) {
    return 0;
  }
  const sorted = [...values].toSorted((left, right) => left - right);
  const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil(sorted.length * ratio) - 1));
  return sorted[index];
}

function summarizeDurations(label, durations, sample) {
  const total = durations.reduce((sum, value) => sum + value, 0);
  return {
    label,
    iterations: durations.length,
    avgMs: Number((total / durations.length).toFixed(2)),
    minMs: Number(Math.min(...durations).toFixed(2)),
    p50Ms: Number(percentile(durations, 0.5).toFixed(2)),
    p95Ms: Number(percentile(durations, 0.95).toFixed(2)),
    maxMs: Number(Math.max(...durations).toFixed(2)),
    sample,
  };
}

function summarizeTasksSample(result) {
  return {
    total: result.total,
    returned: result.rows.length,
    firstTaskId: result.rows[0]?.taskId ?? null,
    lastTaskId: result.rows[result.rows.length - 1]?.taskId ?? null,
  };
}

function summarizeEventsSample(rows) {
  return {
    returned: rows.length,
    newestEventId: rows[0]?.eventId ?? null,
    oldestEventId: rows[rows.length - 1]?.eventId ?? null,
  };
}

function summarizeCommitmentsSample(rows) {
  return {
    returned: rows.length,
    newestCommitmentId: rows[0]?.commitmentId ?? null,
    oldestCommitmentId: rows[rows.length - 1]?.commitmentId ?? null,
  };
}

function escapeLikePattern(value) {
  return value.replace(/[\\%_]/g, "\\$&");
}

function buildTasksOrderBy(sort) {
  switch (sort) {
    case "updated-asc":
      return "t.updated_at ASC, t.created_at ASC";
    case "created-desc":
      return "t.created_at DESC, t.updated_at DESC";
    case "created-asc":
      return "t.created_at ASC, t.updated_at ASC";
    case "updated-desc":
    default:
      return "t.updated_at DESC, t.created_at DESC";
  }
}

function buildTasksWhereClause(options) {
  const clauses = [];
  const values = [];

  if (options.sessionKey?.trim()) {
    clauses.push(
      `EXISTS (
         SELECT 1
         FROM task_session_links l
         WHERE l.task_id = t.task_id
           AND l.session_key = ?
       )`,
    );
    values.push(options.sessionKey.trim());
  }

  if (options.status?.trim()) {
    clauses.push("t.status = ?");
    values.push(options.status.trim());
  }

  if (typeof options.updatedAfter === "number" && Number.isFinite(options.updatedAfter)) {
    clauses.push("t.updated_at >= ?");
    values.push(Math.max(0, Math.floor(options.updatedAfter)));
  }

  if (options.surfaceKind?.trim()) {
    clauses.push(
      "(json_extract(t.current_surface_json, '$.kind') = ? OR json_extract(t.source_surface_json, '$.kind') = ?)",
    );
    values.push(options.surfaceKind.trim(), options.surfaceKind.trim());
  }

  if (options.channel?.trim()) {
    clauses.push(
      "(json_extract(t.current_surface_json, '$.channel') = ? OR json_extract(t.source_surface_json, '$.channel') = ?)",
    );
    values.push(options.channel.trim(), options.channel.trim());
  }

  if (options.query?.trim()) {
    const queryPattern = `%${escapeLikePattern(options.query.trim().toLowerCase())}%`;
    clauses.push(
      `(LOWER(t.task_id) LIKE ? ESCAPE '\\'
         OR LOWER(COALESCE(t.title, '')) LIKE ? ESCAPE '\\'
         OR LOWER(COALESCE(t.summary, '')) LIKE ? ESCAPE '\\'
         OR LOWER(COALESCE(t.latest_session_key, '')) LIKE ? ESCAPE '\\')`,
    );
    values.push(queryPattern, queryPattern, queryPattern, queryPattern);
  }

  return {
    whereClause: clauses.length > 0 ? `WHERE ${clauses.join(" AND ")}` : "",
    values,
  };
}

function queryTasks(db, options = {}) {
  const { whereClause, values } = buildTasksWhereClause(options);
  const totalRow = db
    .prepare(
      `SELECT COUNT(*) AS count
       FROM tasks t
       ${whereClause}`,
    )
    .get(...values);
  const rows = db
    .prepare(
      `SELECT
         t.task_id AS taskId,
         t.status AS status,
         t.updated_at AS updatedAt,
         t.latest_session_key AS latestSessionKey
       FROM tasks t
       ${whereClause}
       ORDER BY ${buildTasksOrderBy(options.sort)}
       LIMIT ? OFFSET ?`,
    )
    .all(...values, options.limit ?? 50, options.offset ?? 0);
  return {
    total: Number(totalRow?.count ?? 0),
    rows,
  };
}

function queryTaskEvents(db, taskId, limit) {
  return db
    .prepare(
      `SELECT event_id AS eventId, kind, created_at AS createdAt
       FROM task_events
       WHERE task_id = ?
       ORDER BY created_at DESC
       LIMIT ?`,
    )
    .all(taskId, limit);
}

function queryCommitments(db, taskId, limit) {
  return db
    .prepare(
      `SELECT commitment_id AS commitmentId, status, updated_at AS updatedAt
       FROM commitments
       WHERE task_id = ?
       ORDER BY updated_at DESC
       LIMIT ?`,
    )
    .all(taskId, limit);
}

function seedContinuityData(db, options) {
  const insertTask = db.prepare(
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
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  const insertLink = db.prepare(
    `INSERT INTO task_session_links (
       task_id,
       agent_id,
       session_key,
       relation,
       created_at,
       updated_at
     ) VALUES (?, ?, ?, ?, ?, ?)`,
  );
  const insertEvent = db.prepare(
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
  );
  const insertCommitment = db.prepare(
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
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );

  db.exec("BEGIN IMMEDIATE");
  try {
    for (let taskIndex = 0; taskIndex < options.tasks; taskIndex += 1) {
      const taskId = `task-bench-${taskIndex}`;
      const sessionKey = `agent:main:telegram:dm:user-${taskIndex}`;
      const timestampBase = taskIndex * 10_000;
      insertTask.run(
        taskId,
        "main",
        taskIndex % 4 === 0 ? "waiting-user" : "running",
        `Load test task ${taskIndex}`,
        "Benchmarking continuity query performance",
        JSON.stringify({ kind: "direct-chat", channel: "telegram" }),
        JSON.stringify({ kind: "control-ui" }),
        sessionKey,
        `run-${taskIndex}`,
        null,
        timestampBase,
        timestampBase + 1,
        null,
      );
      insertLink.run(taskId, "main", sessionKey, "linked", timestampBase, timestampBase + 1);

      for (let eventIndex = 0; eventIndex < options.eventsPerTask; eventIndex += 1) {
        insertEvent.run(
          `${taskId}-event-${eventIndex}`,
          taskId,
          "main",
          eventIndex % 6 === 0 ? "handoff.control-ui" : "lifecycle.end",
          "lifecycle",
          "end",
          sessionKey,
          `run-${taskIndex}`,
          `Event ${eventIndex}`,
          JSON.stringify({ kind: "control-ui" }),
          null,
          timestampBase + 100 + eventIndex,
        );
      }

      for (
        let commitmentIndex = 0;
        commitmentIndex < options.commitmentsPerTask;
        commitmentIndex += 1
      ) {
        const isOpen = commitmentIndex % 2 === 0;
        const commitmentTimestamp = timestampBase + 200 + commitmentIndex;
        insertCommitment.run(
          `${taskId}-commitment-${commitmentIndex}`,
          taskId,
          "main",
          isOpen ? "open" : "done",
          "follow-up",
          `Commitment ${commitmentIndex}`,
          null,
          null,
          null,
          null,
          commitmentTimestamp,
          commitmentTimestamp,
          isOpen ? null : commitmentTimestamp,
        );
      }
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

function measure(label, iterations, fn) {
  const durations = [];
  let sample = null;
  for (let index = 0; index < iterations; index += 1) {
    const startedAt = performance.now();
    sample = fn();
    durations.push(performance.now() - startedAt);
  }
  return summarizeDurations(label, durations, sample);
}

function main() {
  const options = resolveArgs(process.argv.slice(2));
  const schemaSql = readSchemaSql();
  const dbPath = path.join(
    os.tmpdir(),
    `opensoul-continuity-bench-${process.pid}-${Date.now()}.sqlite`,
  );
  const db = new DatabaseSync(dbPath);

  try {
    db.exec(schemaSql);
    db.exec("PRAGMA journal_mode = WAL");
    db.exec("PRAGMA synchronous = NORMAL");

    const seedStartedAt = performance.now();
    seedContinuityData(db, options);
    const seedMs = performance.now() - seedStartedAt;
    const hottestTaskId = `task-bench-${options.tasks - 1}`;

    const results = [
      measure("tasks.list filtered", options.iterations, () =>
        summarizeTasksSample(
          queryTasks(db, {
            surfaceKind: "control-ui",
            channel: "telegram",
            query: "load test task",
            sort: "updated-desc",
            limit: 50,
            offset: 0,
          }),
        ),
      ),
      measure("tasks.events latest 40", options.iterations, () =>
        summarizeEventsSample(queryTaskEvents(db, hottestTaskId, 40)),
      ),
      measure("tasks.commitments latest 40", options.iterations, () =>
        summarizeCommitmentsSample(queryCommitments(db, hottestTaskId, 40)),
      ),
      measure("workbench refresh", options.iterations, () => ({
        tasks: summarizeTasksSample(
          queryTasks(db, {
            surfaceKind: "control-ui",
            channel: "telegram",
            query: "load test task",
            sort: "updated-desc",
            limit: 24,
            offset: 0,
          }),
        ),
        events: summarizeEventsSample(queryTaskEvents(db, hottestTaskId, 40)),
        commitments: summarizeCommitmentsSample(queryCommitments(db, hottestTaskId, 40)),
      })),
    ];

    const output = {
      seeded: {
        tasks: options.tasks,
        events: options.tasks * options.eventsPerTask,
        commitments: options.tasks * options.commitmentsPerTask,
        seedMs: Number(seedMs.toFixed(2)),
      },
      queries: results,
    };
    console.log(JSON.stringify(output, null, 2));
  } finally {
    db.close();
    fs.rmSync(dbPath, { force: true });
  }
}

main();
