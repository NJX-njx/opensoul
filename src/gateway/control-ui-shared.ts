const CONTROL_UI_AVATAR_PREFIX = "/avatar";

export function normalizeControlUiBasePath(basePath?: string): string {
  if (!basePath) {
    return "";
  }
  let normalized = basePath.trim();
  if (!normalized) {
    return "";
  }
  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }
  if (normalized === "/") {
    return "";
  }
  if (normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
}

export function resolveControlUiPublicBase(params: {
  publicUrl?: string;
  basePath?: string;
}): string | undefined {
  const raw = params.publicUrl?.trim();
  if (!raw) {
    return undefined;
  }
  try {
    const url = new URL(raw);
    const normalizedBasePath = normalizeControlUiBasePath(params.basePath);
    const currentPath = url.pathname === "/" ? "" : url.pathname.replace(/\/+$/, "");
    const finalPath =
      normalizedBasePath && !currentPath.endsWith(normalizedBasePath)
        ? `${currentPath}${normalizedBasePath}`
        : currentPath || normalizedBasePath;
    url.pathname = finalPath || "/";
    url.search = "";
    url.hash = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return undefined;
  }
}

export function buildControlUiSessionUrl(params: {
  publicUrl?: string;
  basePath?: string;
  sessionKey: string;
}): string | undefined {
  const base = resolveControlUiPublicBase({
    publicUrl: params.publicUrl,
    basePath: params.basePath,
  });
  if (!base) {
    return undefined;
  }
  return `${base}/chat?session=${encodeURIComponent(params.sessionKey)}`;
}

export function buildControlUiAvatarUrl(basePath: string, agentId: string): string {
  return basePath
    ? `${basePath}${CONTROL_UI_AVATAR_PREFIX}/${agentId}`
    : `${CONTROL_UI_AVATAR_PREFIX}/${agentId}`;
}

function looksLikeLocalAvatarPath(value: string): boolean {
  if (/[\\/]/.test(value)) {
    return true;
  }
  return /\.(png|jpe?g|gif|webp|svg|ico)$/i.test(value);
}

export function resolveAssistantAvatarUrl(params: {
  avatar?: string | null;
  agentId?: string | null;
  basePath?: string;
}): string | undefined {
  const avatar = params.avatar?.trim();
  if (!avatar) {
    return undefined;
  }
  if (/^https?:\/\//i.test(avatar) || /^data:image\//i.test(avatar)) {
    return avatar;
  }

  const basePath = normalizeControlUiBasePath(params.basePath);
  const baseAvatarPrefix = basePath
    ? `${basePath}${CONTROL_UI_AVATAR_PREFIX}/`
    : `${CONTROL_UI_AVATAR_PREFIX}/`;
  if (basePath && avatar.startsWith(`${CONTROL_UI_AVATAR_PREFIX}/`)) {
    return `${basePath}${avatar}`;
  }
  if (avatar.startsWith(baseAvatarPrefix)) {
    return avatar;
  }

  // Root-relative static file path (e.g. /avatar.png) — serve from control-ui root, not agent avatar API.
  if (avatar.startsWith("/") && looksLikeLocalAvatarPath(avatar)) {
    return basePath ? `${basePath}${avatar}` : avatar;
  }

  if (!params.agentId) {
    return avatar;
  }
  if (looksLikeLocalAvatarPath(avatar)) {
    return buildControlUiAvatarUrl(basePath, params.agentId);
  }
  return avatar;
}

export { CONTROL_UI_AVATAR_PREFIX };
