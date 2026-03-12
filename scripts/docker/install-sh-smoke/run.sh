#!/usr/bin/env bash
set -euo pipefail

INSTALL_URL="${OPENSOUL_INSTALL_URL:-https://opensoul-web.vercel.app/install.sh}"
FALLBACK_INSTALL_URL="${OPENSOUL_INSTALL_FALLBACK_URL:-https://opensoul.ai/install.sh}"
SMOKE_PREVIOUS_VERSION="${OPENSOUL_INSTALL_SMOKE_PREVIOUS:-}"
SKIP_PREVIOUS="${OPENSOUL_INSTALL_SMOKE_SKIP_PREVIOUS:-0}"
DEFAULT_PACKAGE="opensoul"
PACKAGE_NAME="${OPENSOUL_INSTALL_PACKAGE:-$DEFAULT_PACKAGE}"
CURL_ARGS=(--retry 5 --retry-delay 2 --retry-all-errors --connect-timeout 15 --max-time 180 -fsSL)
PROBE_CURL_ARGS=(--connect-timeout 8 --max-time 20 -sS -o /dev/null -w "%{http_code}")

probe_installer_url() {
  local url="$1"
  local label="$2"
  local http_code
  local curl_exit
  local err_file
  err_file="$(mktemp)"
  set +e
  http_code="$(curl "${PROBE_CURL_ARGS[@]}" "$url" 2>"$err_file")"
  curl_exit=$?
  set -e
  if [[ "$curl_exit" -eq 0 ]]; then
    rm -f "$err_file"
    case "$http_code" in
      2*|3*)
        return 0
        ;;
      *)
        echo "WARN: $label not usable (HTTP $http_code): $url" >&2
        return 1
        ;;
    esac
  fi
  echo "WARN: $label probe failed (curl exit $curl_exit): $url" >&2
  sed 's/^/  > /' "$err_file" >&2 || true
  rm -f "$err_file"
  return 1
}

resolve_working_installer_url() {
  if probe_installer_url "$INSTALL_URL" "primary installer URL"; then
    printf "%s" "$INSTALL_URL"
    return 0
  fi
  if [[ -n "$FALLBACK_INSTALL_URL" && "$FALLBACK_INSTALL_URL" != "$INSTALL_URL" ]]; then
    if probe_installer_url "$FALLBACK_INSTALL_URL" "fallback installer URL"; then
      printf "%s" "$FALLBACK_INSTALL_URL"
      return 0
    fi
  fi
  return 1
}

run_installer() {
  local url="$1"
  curl "${CURL_ARGS[@]}" "$url" | bash
}

echo "==> Resolve npm versions"
LATEST_VERSION="$(npm view "$PACKAGE_NAME" version)"
if [[ -n "$SMOKE_PREVIOUS_VERSION" ]]; then
  PREVIOUS_VERSION="$SMOKE_PREVIOUS_VERSION"
else
  VERSIONS_JSON="$(npm view "$PACKAGE_NAME" versions --json)"
  PREVIOUS_VERSION="$(VERSIONS_JSON="$VERSIONS_JSON" LATEST_VERSION="$LATEST_VERSION" node - <<'NODE'
const raw = process.env.VERSIONS_JSON || "[]";
const latest = process.env.LATEST_VERSION || "";
let versions;
try {
  versions = JSON.parse(raw);
} catch {
  versions = raw ? [raw] : [];
}
if (!Array.isArray(versions)) {
  versions = [versions];
}
if (versions.length === 0) {
  process.exit(1);
}
const latestIndex = latest ? versions.lastIndexOf(latest) : -1;
if (latestIndex > 0) {
  process.stdout.write(String(versions[latestIndex - 1]));
  process.exit(0);
}
process.stdout.write(String(latest || versions[versions.length - 1]));
NODE
)"
fi

echo "package=$PACKAGE_NAME latest=$LATEST_VERSION previous=$PREVIOUS_VERSION"

if [[ "$SKIP_PREVIOUS" == "1" ]]; then
  echo "==> Skip preinstall previous (OPENSOUL_INSTALL_SMOKE_SKIP_PREVIOUS=1)"
else
  echo "==> Preinstall previous (forces installer upgrade path)"
  npm install -g "${PACKAGE_NAME}@${PREVIOUS_VERSION}"
fi

echo "==> Run official installer one-liner"
WORKING_INSTALL_URL="$(resolve_working_installer_url || true)"
if [[ -z "$WORKING_INSTALL_URL" ]]; then
  echo "ERROR: No reachable installer URL for smoke test." >&2
  echo "  primary:  $INSTALL_URL" >&2
  echo "  fallback: $FALLBACK_INSTALL_URL" >&2
  echo "  hint: verify DNS/proxy/TLS reachability from inside Docker container." >&2
  exit 1
fi
if [[ "$WORKING_INSTALL_URL" != "$INSTALL_URL" ]]; then
  echo "Primary installer URL unavailable, using fallback: $WORKING_INSTALL_URL"
fi
run_installer "$WORKING_INSTALL_URL"

echo "==> Verify installed version"
CLI_NAME="$PACKAGE_NAME"
if ! command -v "$CLI_NAME" >/dev/null 2>&1; then
  echo "ERROR: $PACKAGE_NAME is not on PATH" >&2
  exit 1
fi
if [[ -n "${OPENSOUL_INSTALL_LATEST_OUT:-}" ]]; then
  printf "%s" "$LATEST_VERSION" > "${OPENSOUL_INSTALL_LATEST_OUT:-}"
fi
INSTALLED_VERSION="$("$CLI_NAME" --version 2>/dev/null | head -n 1 | tr -d '\r')"
echo "cli=$CLI_NAME installed=$INSTALLED_VERSION expected=$LATEST_VERSION"

if [[ "$INSTALLED_VERSION" != "$LATEST_VERSION" ]]; then
  echo "ERROR: expected ${CLI_NAME}@${LATEST_VERSION}, got ${CLI_NAME}@${INSTALLED_VERSION}" >&2
  exit 1
fi

echo "==> Sanity: CLI runs"
"$CLI_NAME" --help >/dev/null

echo "OK"
