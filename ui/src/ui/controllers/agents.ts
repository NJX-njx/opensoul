import type { GatewayBrowserClient } from "../gateway.ts";
import type { AgentsListResult } from "../types.ts";

export type AgentsCreateParams = {
  name: string;
  workspace: string;
  emoji?: string;
  avatar?: string;
};

export type AgentsCreateResult = {
  ok: true;
  agentId: string;
  name: string;
  workspace: string;
};

export type AgentsState = {
  client: GatewayBrowserClient | null;
  connected: boolean;
  agentsLoading: boolean;
  agentsError: string | null;
  agentsList: AgentsListResult | null;
  agentsSelectedId: string | null;
};

export async function loadAgents(state: AgentsState) {
  if (!state.client || !state.connected) {
    return;
  }
  if (state.agentsLoading) {
    return;
  }
  state.agentsLoading = true;
  state.agentsError = null;
  try {
    const res = await state.client.request<AgentsListResult>("agents.list", {});
    if (res) {
      state.agentsList = res;
      const selected = state.agentsSelectedId;
      const known = res.agents.some((entry) => entry.id === selected);
      if (!selected || !known) {
        state.agentsSelectedId = res.defaultId ?? res.agents[0]?.id ?? null;
      }
    }
  } catch (err) {
    state.agentsError = String(err);
  } finally {
    state.agentsLoading = false;
  }
}

/**
 * 创建新 agent，调用 agents.create
 */
export async function createAgent(
  state: AgentsState,
  params: AgentsCreateParams,
): Promise<AgentsCreateResult | null> {
  if (!state.client || !state.connected) {
    return null;
  }
  try {
    const res = await state.client.request<AgentsCreateResult>("agents.create", {
      name: params.name.trim(),
      workspace: params.workspace.trim(),
      ...(params.emoji?.trim() ? { emoji: params.emoji.trim() } : {}),
      ...(params.avatar?.trim() ? { avatar: params.avatar.trim() } : {}),
    });
    return res ?? null;
  } catch {
    return null;
  }
}

export type AgentsDeleteResult = {
  ok: true;
  agentId: string;
  removedBindings?: number;
};

/**
 * 删除 agent，调用 agents.delete。默认智能体不可删除；删除后不可恢复。
 */
export async function deleteAgent(
  state: AgentsState,
  agentId: string,
  deleteFiles = true,
): Promise<AgentsDeleteResult | null> {
  if (!state.client || !state.connected) {
    return null;
  }
  try {
    const res = await state.client.request<AgentsDeleteResult>("agents.delete", {
      agentId,
      deleteFiles,
    });
    return res ?? null;
  } catch {
    return null;
  }
}
