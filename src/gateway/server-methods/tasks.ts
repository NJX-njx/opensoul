import type { GatewayRequestHandlers } from "./types.js";
import { resolveDefaultAgentId, resolveSessionAgentId } from "../../agents/agent-scope.js";
import { loadConfig } from "../../config/config.js";
import { getTask, listCommitments, listTaskEvents, listTasks } from "../../continuity/service.js";
import {
  ErrorCodes,
  errorShape,
  formatValidationErrors,
  validateTasksCommitmentsParams,
  validateTasksEventsParams,
  validateTasksGetParams,
  validateTasksListParams,
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
};
