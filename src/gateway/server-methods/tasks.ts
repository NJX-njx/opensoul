import type { GatewayRequestHandlers } from "./types.js";
import { resolveDefaultAgentId, resolveSessionAgentId } from "../../agents/agent-scope.js";
import { loadConfig } from "../../config/config.js";
import {
  getTask,
  listCommitments,
  listTaskEvents,
  listTasks,
  patchCommitment,
  patchTask,
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
    const p = params as { agentId?: string; sessionKey?: string; limit?: number };
    const agentId = resolveTaskAgentId({
      cfg,
      agentId: p.agentId,
      sessionKey: p.sessionKey,
    });
    const tasks = listTasks({
      cfg,
      agentId,
      sessionKey: p.sessionKey,
      limit: p.limit,
    });
    respond(true, { tasks }, undefined);
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
