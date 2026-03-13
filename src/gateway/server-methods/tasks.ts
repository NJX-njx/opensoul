import type { GatewayClient, GatewayRequestHandlers, RespondFn } from "./types.js";
import { resolveDefaultAgentId, resolveSessionAgentId } from "../../agents/agent-scope.js";
import { loadConfig } from "../../config/config.js";
import {
  getTask,
  listCommitments,
  listTaskEvents,
  patchCommitment,
  patchTask,
  queryTasks,
  repairMarkCommitmentOrphan,
  repairMarkTaskOrphan,
  repairMergeTasks,
  repairRelinkTaskToSession,
  type TasksListSort,
} from "../../continuity/service.js";
import {
  ErrorCodes,
  errorShape,
  formatValidationErrors,
  validateTasksCommitmentsParams,
  validateTasksCommitmentsUpdateParams,
  validateTasksEventsParams,
  validateTasksGetParams,
  validateTasksListParams,
  validateTasksRepairCommitmentOrphanParams,
  validateTasksRepairMergeParams,
  validateTasksRepairRelinkParams,
  validateTasksRepairTaskOrphanParams,
  validateTasksTaskPatchParams,
} from "../protocol/index.js";

const ADMIN_SCOPE = "operator.admin";
const EMPTY_TASKS_LIST_RESULT = { tasks: [], total: 0, nextOffset: null } as const;
const EMPTY_TASKS_EVENTS_RESULT = { events: [] } as const;
const EMPTY_TASKS_COMMITMENTS_RESULT = { commitments: [] } as const;

function resolveContinuityFeatures(cfg: ReturnType<typeof loadConfig>): {
  reads: boolean;
  writes: boolean;
  handoff: boolean;
  uiActions: boolean;
} {
  const features = cfg.gateway?.controlUi?.continuity?.features;
  return {
    reads: features?.reads !== false,
    writes: features?.writes !== false,
    handoff: features?.handoff !== false,
    uiActions: features?.uiActions !== false,
  };
}

function resolveTaskAgentId(params: {
  cfg: ReturnType<typeof loadConfig>;
  agentId?: string;
  sessionKey?: string;
}): string {
  const explicitAgentId = params.agentId?.trim();
  if (explicitAgentId) {
    return explicitAgentId;
  }
  const sessionKey = params.sessionKey?.trim();
  if (sessionKey) {
    return resolveSessionAgentId({
      sessionKey,
      config: params.cfg,
    });
  }
  return resolveDefaultAgentId(params.cfg);
}

function resolveTaskAgentIds(params: {
  cfg: ReturnType<typeof loadConfig>;
  agentId?: string;
  sessionKey?: string;
  allAgents?: boolean;
}): Array<string> {
  const explicitAgentId = params.agentId?.trim();
  if (explicitAgentId) {
    return [explicitAgentId];
  }
  const sessionKey = params.sessionKey?.trim();
  if (sessionKey) {
    return [
      resolveTaskAgentId({
        cfg: params.cfg,
        sessionKey,
      }),
    ];
  }
  if (!params.allAgents) {
    return [resolveTaskAgentId({ cfg: params.cfg })];
  }
  const agentIds = Array.from(
    new Set(
      (params.cfg.agents?.list ?? [])
        .map((entry) => entry?.id?.trim())
        .filter((value): value is string => Boolean(value)),
    ),
  );
  return agentIds.length > 0 ? agentIds : [resolveDefaultAgentId(params.cfg)];
}

function hasAdminScope(client: GatewayClient | null | undefined): boolean {
  return Boolean(client?.connect?.scopes?.includes(ADMIN_SCOPE));
}

function respondTasksPermissionError(respond: RespondFn, message: string): false {
  respond(false, undefined, errorShape(ErrorCodes.INVALID_REQUEST, message));
  return false;
}

function ensureAdminRepairAccess(
  client: GatewayClient | null | undefined,
  respond: RespondFn,
  method: string,
): boolean {
  if (hasAdminScope(client)) {
    return true;
  }
  return respondTasksPermissionError(respond, `${method} requires operator.admin`);
}

function ensureTasksListAccess(params: {
  client: GatewayClient | null;
  respond: RespondFn;
  cfg: ReturnType<typeof loadConfig>;
  sessionKey?: string;
  agentId?: string;
  allAgents?: boolean;
}): boolean {
  if (hasAdminScope(params.client)) {
    return true;
  }
  const sessionKey = params.sessionKey?.trim();
  if (!sessionKey) {
    return respondTasksPermissionError(
      params.respond,
      "tasks.list without operator.admin requires sessionKey",
    );
  }
  if (params.allAgents) {
    return respondTasksPermissionError(
      params.respond,
      "tasks.list allAgents requires operator.admin",
    );
  }
  const explicitAgentId = params.agentId?.trim();
  if (!explicitAgentId) {
    return true;
  }
  const sessionAgentId = resolveTaskAgentId({
    cfg: params.cfg,
    sessionKey,
  });
  if (explicitAgentId !== sessionAgentId) {
    return respondTasksPermissionError(
      params.respond,
      "tasks.list agentId must match sessionKey without operator.admin",
    );
  }
  return true;
}

function ensureTaskAccess(params: {
  client: GatewayClient | null;
  respond: RespondFn;
  cfg: ReturnType<typeof loadConfig>;
  agentId: string;
  taskId: string;
  sessionKey?: string;
  task: ReturnType<typeof getTask>;
}): boolean {
  if (hasAdminScope(params.client)) {
    return true;
  }
  const sessionKey = params.sessionKey?.trim();
  if (!sessionKey) {
    return respondTasksPermissionError(
      params.respond,
      "task access without operator.admin requires sessionKey",
    );
  }
  if (params.task?.latestSessionKey === sessionKey) {
    return true;
  }
  const visible = queryTasks({
    cfg: params.cfg,
    agentId: params.agentId,
    sessionKey,
  }).tasks.some((task) => task.taskId === params.taskId);
  if (!visible) {
    return respondTasksPermissionError(params.respond, "task access denied for this session");
  }
  return true;
}

function compareTaskRecords(
  left: { updatedAt: number; createdAt: number },
  right: { updatedAt: number; createdAt: number },
  sort: TasksListSort,
): number {
  switch (sort) {
    case "updated-asc":
      return left.updatedAt - right.updatedAt || left.createdAt - right.createdAt;
    case "created-desc":
      return right.createdAt - left.createdAt || right.updatedAt - left.updatedAt;
    case "created-asc":
      return left.createdAt - right.createdAt || left.updatedAt - right.updatedAt;
    case "updated-desc":
    default:
      return right.updatedAt - left.updatedAt || right.createdAt - left.createdAt;
  }
}

function hasTaskPatchFields(params: {
  status?: string;
  title?: string | null;
  summary?: string | null;
  latestSessionKey?: string | null;
}): boolean {
  return (
    Object.prototype.hasOwnProperty.call(params, "status") ||
    Object.prototype.hasOwnProperty.call(params, "title") ||
    Object.prototype.hasOwnProperty.call(params, "summary") ||
    Object.prototype.hasOwnProperty.call(params, "latestSessionKey")
  );
}

function respondContinuityWritesDisabled(respond: RespondFn): void {
  respond(
    false,
    undefined,
    errorShape(ErrorCodes.INVALID_REQUEST, "continuity writes are disabled by config"),
  );
}

export const tasksHandlers: GatewayRequestHandlers = {
  "tasks.list": ({ params, respond, client }) => {
    if (!validateTasksListParams(params)) {
      respond(
        false,
        undefined,
        errorShape(
          ErrorCodes.INVALID_REQUEST,
          `invalid tasks.list params: ${formatValidationErrors(validateTasksListParams.errors)}`,
        ),
      );
      return;
    }
    const cfg = loadConfig();
    const continuity = resolveContinuityFeatures(cfg);
    if (!continuity.reads) {
      respond(true, EMPTY_TASKS_LIST_RESULT, undefined);
      return;
    }
    const p = params as {
      allAgents?: boolean;
      agentId?: string;
      sessionKey?: string;
      status?: "open" | "running" | "waiting-user" | "completed" | "cancelled" | "failed";
      surfaceKind?: string;
      channel?: string;
      query?: string;
      updatedAfter?: number;
      offset?: number;
      limit?: number;
      sort?: TasksListSort;
    };
    if (
      !ensureTasksListAccess({
        client,
        respond,
        cfg,
        sessionKey: p.sessionKey,
        agentId: p.agentId,
        allAgents: p.allAgents,
      })
    ) {
      return;
    }
    const sort = p.sort ?? "updated-desc";
    const agentIds = resolveTaskAgentIds({
      cfg,
      agentId: p.agentId,
      sessionKey: p.sessionKey,
      allAgents: p.allAgents,
    });
    const allTasks = agentIds
      .flatMap(
        (agentId) =>
          queryTasks({
            cfg,
            agentId,
            sessionKey: agentIds.length === 1 ? p.sessionKey : undefined,
            status: p.status,
            surfaceKind: p.surfaceKind,
            channel: p.channel,
            query: p.query,
            updatedAfter: p.updatedAfter,
            sort,
          }).tasks,
      )
      .toSorted((left, right) => compareTaskRecords(left, right, sort));
    const total = allTasks.length;
    const offset =
      typeof p.offset === "number" && Number.isFinite(p.offset)
        ? Math.max(0, Math.floor(p.offset))
        : 0;
    const limit =
      typeof p.limit === "number" && Number.isFinite(p.limit)
        ? Math.max(1, Math.floor(p.limit))
        : 50;
    const tasks = allTasks.slice(offset, offset + limit);
    const nextOffset = offset + tasks.length < total ? offset + tasks.length : null;
    respond(true, { tasks, total, nextOffset }, undefined);
  },
  "tasks.get": ({ params, respond, client }) => {
    if (!validateTasksGetParams(params)) {
      respond(
        false,
        undefined,
        errorShape(
          ErrorCodes.INVALID_REQUEST,
          `invalid tasks.get params: ${formatValidationErrors(validateTasksGetParams.errors)}`,
        ),
      );
      return;
    }
    const cfg = loadConfig();
    const continuity = resolveContinuityFeatures(cfg);
    if (!continuity.reads) {
      respond(true, { task: null }, undefined);
      return;
    }
    const p = params as { taskId: string; agentId?: string; sessionKey?: string };
    const agentId = resolveTaskAgentId({
      cfg,
      agentId: p.agentId,
      sessionKey: p.sessionKey,
    });
    const task = getTask({
      cfg,
      agentId,
      taskId: p.taskId,
    });
    if (
      !ensureTaskAccess({
        client,
        respond,
        cfg,
        agentId,
        taskId: p.taskId,
        sessionKey: p.sessionKey,
        task,
      })
    ) {
      return;
    }
    respond(true, { task }, undefined);
  },
  "tasks.events": ({ params, respond, client }) => {
    if (!validateTasksEventsParams(params)) {
      respond(
        false,
        undefined,
        errorShape(
          ErrorCodes.INVALID_REQUEST,
          `invalid tasks.events params: ${formatValidationErrors(validateTasksEventsParams.errors)}`,
        ),
      );
      return;
    }
    const cfg = loadConfig();
    const continuity = resolveContinuityFeatures(cfg);
    if (!continuity.reads) {
      respond(true, EMPTY_TASKS_EVENTS_RESULT, undefined);
      return;
    }
    const p = params as { taskId: string; agentId?: string; sessionKey?: string; limit?: number };
    const agentId = resolveTaskAgentId({
      cfg,
      agentId: p.agentId,
      sessionKey: p.sessionKey,
    });
    const task = getTask({
      cfg,
      agentId,
      taskId: p.taskId,
    });
    if (
      !ensureTaskAccess({
        client,
        respond,
        cfg,
        agentId,
        taskId: p.taskId,
        sessionKey: p.sessionKey,
        task,
      })
    ) {
      return;
    }
    const events = listTaskEvents({
      cfg,
      agentId,
      taskId: p.taskId,
      limit: p.limit,
    });
    respond(true, { events }, undefined);
  },
  "tasks.commitments": ({ params, respond, client }) => {
    if (!validateTasksCommitmentsParams(params)) {
      respond(
        false,
        undefined,
        errorShape(
          ErrorCodes.INVALID_REQUEST,
          `invalid tasks.commitments params: ${formatValidationErrors(validateTasksCommitmentsParams.errors)}`,
        ),
      );
      return;
    }
    const cfg = loadConfig();
    const continuity = resolveContinuityFeatures(cfg);
    if (!continuity.reads) {
      respond(true, EMPTY_TASKS_COMMITMENTS_RESULT, undefined);
      return;
    }
    const p = params as {
      taskId: string;
      agentId?: string;
      sessionKey?: string;
      status?: "open" | "done" | "cancelled";
      limit?: number;
    };
    const agentId = resolveTaskAgentId({
      cfg,
      agentId: p.agentId,
      sessionKey: p.sessionKey,
    });
    const task = getTask({
      cfg,
      agentId,
      taskId: p.taskId,
    });
    if (
      !ensureTaskAccess({
        client,
        respond,
        cfg,
        agentId,
        taskId: p.taskId,
        sessionKey: p.sessionKey,
        task,
      })
    ) {
      return;
    }
    const commitments = listCommitments({
      cfg,
      agentId,
      taskId: p.taskId,
      status: p.status,
      limit: p.limit,
    });
    respond(true, { commitments }, undefined);
  },
  "tasks.commitments.update": ({ params, respond, client }) => {
    if (!validateTasksCommitmentsUpdateParams(params)) {
      respond(
        false,
        undefined,
        errorShape(
          ErrorCodes.INVALID_REQUEST,
          `invalid tasks.commitments.update params: ${formatValidationErrors(validateTasksCommitmentsUpdateParams.errors)}`,
        ),
      );
      return;
    }
    const cfg = loadConfig();
    const continuity = resolveContinuityFeatures(cfg);
    if (!continuity.writes) {
      respondContinuityWritesDisabled(respond);
      return;
    }
    const p = params as {
      taskId: string;
      commitmentId: string;
      agentId?: string;
      sessionKey?: string;
      status: "open" | "done" | "cancelled";
      detail?: string | null;
    };
    const agentId = resolveTaskAgentId({
      cfg,
      agentId: p.agentId,
      sessionKey: p.sessionKey,
    });
    const task = getTask({
      cfg,
      agentId,
      taskId: p.taskId,
    });
    if (
      !ensureTaskAccess({
        client,
        respond,
        cfg,
        agentId,
        taskId: p.taskId,
        sessionKey: p.sessionKey,
        task,
      })
    ) {
      return;
    }
    const commitment = patchCommitment({
      cfg,
      agentId,
      taskId: p.taskId,
      commitmentId: p.commitmentId,
      status: p.status,
      detail: p.detail,
    });
    if (!commitment) {
      respond(
        false,
        undefined,
        errorShape(
          ErrorCodes.INVALID_REQUEST,
          `unknown task or commitment: ${p.taskId}/${p.commitmentId}`,
        ),
      );
      return;
    }
    respond(true, { commitment }, undefined);
  },
  "tasks.task.patch": ({ params, respond, client }) => {
    if (!validateTasksTaskPatchParams(params)) {
      respond(
        false,
        undefined,
        errorShape(
          ErrorCodes.INVALID_REQUEST,
          `invalid tasks.task.patch params: ${formatValidationErrors(validateTasksTaskPatchParams.errors)}`,
        ),
      );
      return;
    }
    const p = params as {
      taskId: string;
      agentId?: string;
      sessionKey?: string;
      status?: "open" | "running" | "waiting-user" | "completed" | "cancelled" | "failed";
      title?: string | null;
      summary?: string | null;
      latestSessionKey?: string | null;
    };
    if (!hasTaskPatchFields(p)) {
      respond(
        false,
        undefined,
        errorShape(ErrorCodes.INVALID_REQUEST, "invalid tasks.task.patch params: no patch fields"),
      );
      return;
    }
    const cfg = loadConfig();
    const continuity = resolveContinuityFeatures(cfg);
    if (!continuity.writes) {
      respondContinuityWritesDisabled(respond);
      return;
    }
    const agentId = resolveTaskAgentId({
      cfg,
      agentId: p.agentId,
      sessionKey: p.sessionKey,
    });
    const existingTask = getTask({
      cfg,
      agentId,
      taskId: p.taskId,
    });
    if (
      !ensureTaskAccess({
        client,
        respond,
        cfg,
        agentId,
        taskId: p.taskId,
        sessionKey: p.sessionKey,
        task: existingTask,
      })
    ) {
      return;
    }
    if (!existingTask) {
      respond(
        false,
        undefined,
        errorShape(ErrorCodes.INVALID_REQUEST, `unknown task: ${p.taskId}`),
      );
      return;
    }
    const task = patchTask({
      cfg,
      agentId,
      taskId: p.taskId,
      status: p.status,
      title: p.title,
      summary: p.summary,
      latestSessionKey: p.latestSessionKey,
    });
    if (!task) {
      respond(
        false,
        undefined,
        errorShape(
          ErrorCodes.INVALID_REQUEST,
          `illegal task status transition: ${existingTask.status} -> ${p.status ?? existingTask.status}`,
        ),
      );
      return;
    }
    respond(true, { task }, undefined);
  },
  "tasks.repair.relink": ({ params, respond, client }) => {
    if (!validateTasksRepairRelinkParams(params)) {
      respond(
        false,
        undefined,
        errorShape(
          ErrorCodes.INVALID_REQUEST,
          `invalid tasks.repair.relink params: ${formatValidationErrors(validateTasksRepairRelinkParams.errors)}`,
        ),
      );
      return;
    }
    if (!ensureAdminRepairAccess(client, respond, "tasks.repair.relink")) {
      return;
    }
    const cfg = loadConfig();
    const continuity = resolveContinuityFeatures(cfg);
    if (!continuity.writes) {
      respondContinuityWritesDisabled(respond);
      return;
    }
    const p = params as {
      taskId: string;
      agentId?: string;
      sessionKey: string;
      detail?: string | null;
    };
    const agentId = resolveTaskAgentId({
      cfg,
      agentId: p.agentId,
    });
    const task = repairRelinkTaskToSession({
      cfg,
      agentId,
      taskId: p.taskId,
      sessionKey: p.sessionKey,
      detail: p.detail,
      surface: { kind: "control-ui", label: "tasks workbench" },
    });
    if (!task) {
      respond(
        false,
        undefined,
        errorShape(ErrorCodes.INVALID_REQUEST, `unknown task or session: ${p.taskId}`),
      );
      return;
    }
    respond(true, { task }, undefined);
  },
  "tasks.repair.merge": ({ params, respond, client }) => {
    if (!validateTasksRepairMergeParams(params)) {
      respond(
        false,
        undefined,
        errorShape(
          ErrorCodes.INVALID_REQUEST,
          `invalid tasks.repair.merge params: ${formatValidationErrors(validateTasksRepairMergeParams.errors)}`,
        ),
      );
      return;
    }
    if (!ensureAdminRepairAccess(client, respond, "tasks.repair.merge")) {
      return;
    }
    const cfg = loadConfig();
    const continuity = resolveContinuityFeatures(cfg);
    if (!continuity.writes) {
      respondContinuityWritesDisabled(respond);
      return;
    }
    const p = params as {
      sourceTaskId: string;
      targetTaskId: string;
      agentId?: string;
      detail?: string | null;
    };
    if (p.sourceTaskId === p.targetTaskId) {
      respond(
        false,
        undefined,
        errorShape(
          ErrorCodes.INVALID_REQUEST,
          "tasks.repair.merge requires different sourceTaskId and targetTaskId",
        ),
      );
      return;
    }
    const agentId = resolveTaskAgentId({
      cfg,
      agentId: p.agentId,
    });
    const result = repairMergeTasks({
      cfg,
      agentId,
      sourceTaskId: p.sourceTaskId,
      targetTaskId: p.targetTaskId,
      detail: p.detail,
      surface: { kind: "control-ui", label: "tasks workbench" },
    });
    if (!result) {
      respond(
        false,
        undefined,
        errorShape(
          ErrorCodes.INVALID_REQUEST,
          `unknown tasks for merge: ${p.sourceTaskId} -> ${p.targetTaskId}`,
        ),
      );
      return;
    }
    respond(
      true,
      {
        task: result.task,
        mergedTaskId: result.mergedTaskId,
        deletedTaskId: result.deletedTaskId,
        moved: result.moved,
      },
      undefined,
    );
  },
  "tasks.repair.markTaskOrphan": ({ params, respond, client }) => {
    if (!validateTasksRepairTaskOrphanParams(params)) {
      respond(
        false,
        undefined,
        errorShape(
          ErrorCodes.INVALID_REQUEST,
          `invalid tasks.repair.markTaskOrphan params: ${formatValidationErrors(validateTasksRepairTaskOrphanParams.errors)}`,
        ),
      );
      return;
    }
    if (!ensureAdminRepairAccess(client, respond, "tasks.repair.markTaskOrphan")) {
      return;
    }
    const cfg = loadConfig();
    const continuity = resolveContinuityFeatures(cfg);
    if (!continuity.writes) {
      respondContinuityWritesDisabled(respond);
      return;
    }
    const p = params as {
      taskId: string;
      agentId?: string;
      detail?: string | null;
    };
    const agentId = resolveTaskAgentId({
      cfg,
      agentId: p.agentId,
    });
    const task = repairMarkTaskOrphan({
      cfg,
      agentId,
      taskId: p.taskId,
      detail: p.detail,
      surface: { kind: "control-ui", label: "tasks workbench" },
    });
    if (!task) {
      respond(
        false,
        undefined,
        errorShape(ErrorCodes.INVALID_REQUEST, `unknown task: ${p.taskId}`),
      );
      return;
    }
    respond(true, { task }, undefined);
  },
  "tasks.repair.markCommitmentOrphan": ({ params, respond, client }) => {
    if (!validateTasksRepairCommitmentOrphanParams(params)) {
      respond(
        false,
        undefined,
        errorShape(
          ErrorCodes.INVALID_REQUEST,
          `invalid tasks.repair.markCommitmentOrphan params: ${formatValidationErrors(validateTasksRepairCommitmentOrphanParams.errors)}`,
        ),
      );
      return;
    }
    if (!ensureAdminRepairAccess(client, respond, "tasks.repair.markCommitmentOrphan")) {
      return;
    }
    const cfg = loadConfig();
    const continuity = resolveContinuityFeatures(cfg);
    if (!continuity.writes) {
      respondContinuityWritesDisabled(respond);
      return;
    }
    const p = params as {
      taskId: string;
      commitmentId: string;
      agentId?: string;
      detail?: string | null;
    };
    const agentId = resolveTaskAgentId({
      cfg,
      agentId: p.agentId,
    });
    const commitment = repairMarkCommitmentOrphan({
      cfg,
      agentId,
      taskId: p.taskId,
      commitmentId: p.commitmentId,
      detail: p.detail,
      surface: { kind: "control-ui", label: "tasks workbench" },
    });
    if (!commitment) {
      respond(
        false,
        undefined,
        errorShape(
          ErrorCodes.INVALID_REQUEST,
          `unknown task or commitment: ${p.taskId}/${p.commitmentId}`,
        ),
      );
      return;
    }
    respond(true, { commitment }, undefined);
  },
};
