import type { GatewayRequestHandlers } from "./types.js";
import { resolveDefaultAgentId, resolveSessionAgentId } from "../../agents/agent-scope.js";
import { loadConfig } from "../../config/config.js";
import {
  getTask,
  listCommitments,
  listTaskEvents,
  patchCommitment,
  patchTask,
  queryTasks,
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
  validateTasksTaskPatchParams,
} from "../protocol/index.js";

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

export const tasksHandlers: GatewayRequestHandlers = {
  "tasks.list": ({ params, respond }) => {
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
  "tasks.get": ({ params, respond }) => {
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
    respond(true, { task }, undefined);
  },
  "tasks.events": ({ params, respond }) => {
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
    const p = params as { taskId: string; agentId?: string; sessionKey?: string; limit?: number };
    const agentId = resolveTaskAgentId({
      cfg,
      agentId: p.agentId,
      sessionKey: p.sessionKey,
    });
    const events = listTaskEvents({
      cfg,
      agentId,
      taskId: p.taskId,
      limit: p.limit,
    });
    respond(true, { events }, undefined);
  },
  "tasks.commitments": ({ params, respond }) => {
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
    const p = params as {
      taskId: string;
      agentId?: string;
      sessionKey?: string;
      status?: "open" | "done" | "cancelled";
    };
    const agentId = resolveTaskAgentId({
      cfg,
      agentId: p.agentId,
      sessionKey: p.sessionKey,
    });
    const commitments = listCommitments({
      cfg,
      agentId,
      taskId: p.taskId,
      status: p.status,
    });
    respond(true, { commitments }, undefined);
  },
  "tasks.commitments.update": ({ params, respond }) => {
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
  "tasks.task.patch": ({ params, respond }) => {
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
};
