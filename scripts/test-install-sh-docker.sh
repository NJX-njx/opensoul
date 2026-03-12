#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SMOKE_IMAGE="${OPENSOUL_INSTALL_SMOKE_IMAGE:-${OPENCLAW_INSTALL_SMOKE_IMAGE:-opensoul-install-smoke:local}}"
NONROOT_IMAGE="${OPENSOUL_INSTALL_NONROOT_IMAGE:-${OPENCLAW_INSTALL_NONROOT_IMAGE:-opensoul-install-nonroot:local}}"
INSTALL_URL="${OPENSOUL_INSTALL_URL:-${OPENCLAW_INSTALL_URL:-https://opensoul-web.vercel.app/install.sh}}"
CLI_INSTALL_URL="${OPENSOUL_INSTALL_CLI_URL:-${OPENCLAW_INSTALL_CLI_URL:-https://opensoul-web.vercel.app/install-cli.sh}}"
FALLBACK_INSTALL_URL="${OPENSOUL_INSTALL_FALLBACK_URL:-${OPENCLAW_INSTALL_FALLBACK_URL:-https://opensoul.ai/install.sh}}"
FALLBACK_CLI_INSTALL_URL="${OPENSOUL_INSTALL_CLI_FALLBACK_URL:-${OPENCLAW_INSTALL_CLI_FALLBACK_URL:-https://opensoul.ai/install-cli.sh}}"
SKIP_NONROOT="${OPENSOUL_INSTALL_SMOKE_SKIP_NONROOT:-${OPENCLAW_INSTALL_SMOKE_SKIP_NONROOT:-0}}"
CONTAINER_HTTP_PROXY="${OPENSOUL_INSTALL_SMOKE_HTTP_PROXY:-${OPENCLAW_INSTALL_SMOKE_HTTP_PROXY:-}}"
CONTAINER_HTTPS_PROXY="${OPENSOUL_INSTALL_SMOKE_HTTPS_PROXY:-${OPENCLAW_INSTALL_SMOKE_HTTPS_PROXY:-$CONTAINER_HTTP_PROXY}}"
CONTAINER_NO_PROXY="${OPENSOUL_INSTALL_SMOKE_NO_PROXY:-${OPENCLAW_INSTALL_SMOKE_NO_PROXY:-localhost,127.0.0.1}}"
LATEST_DIR="$(mktemp -d)"
LATEST_FILE="${LATEST_DIR}/latest"

docker_build_retry() {
  local image="$1"
  local dockerfile="$2"
  local context="$3"
  for attempt in 1 2 3; do
    if docker build -t "$image" -f "$dockerfile" "$context"; then
      return 0
    fi
    echo "docker build failed (attempt $attempt/3). Retrying..."
    sleep $((attempt * 5))
  done
  return 1
}

echo "==> Build smoke image (upgrade, root): $SMOKE_IMAGE"
docker_build_retry \
  "$SMOKE_IMAGE" \
  "$ROOT_DIR/scripts/docker/install-sh-smoke/Dockerfile" \
  "$ROOT_DIR/scripts/docker/install-sh-smoke"

echo "==> Run installer smoke test (root): $INSTALL_URL"
docker run --rm -t \
  -v "${LATEST_DIR}:/out" \
  -e OPENSOUL_INSTALL_URL="$INSTALL_URL" \
  -e OPENSOUL_INSTALL_FALLBACK_URL="$FALLBACK_INSTALL_URL" \
  -e HTTP_PROXY="$CONTAINER_HTTP_PROXY" \
  -e HTTPS_PROXY="$CONTAINER_HTTPS_PROXY" \
  -e NO_PROXY="$CONTAINER_NO_PROXY" \
  -e OPENSOUL_INSTALL_LATEST_OUT="/out/latest" \
  -e OPENSOUL_INSTALL_SMOKE_PREVIOUS="${OPENSOUL_INSTALL_SMOKE_PREVIOUS:-${OPENCLAW_INSTALL_SMOKE_PREVIOUS:-}}" \
  -e OPENSOUL_INSTALL_SMOKE_SKIP_PREVIOUS="${OPENSOUL_INSTALL_SMOKE_SKIP_PREVIOUS:-${OPENCLAW_INSTALL_SMOKE_SKIP_PREVIOUS:-0}}" \
  -e OPENSOUL_NO_ONBOARD=1 \
  -e DEBIAN_FRONTEND=noninteractive \
  "$SMOKE_IMAGE"

LATEST_VERSION=""
if [[ -f "$LATEST_FILE" ]]; then
  LATEST_VERSION="$(cat "$LATEST_FILE")"
fi

if [[ "$SKIP_NONROOT" == "1" ]]; then
  echo "==> Skip non-root installer smoke (OPENSOUL_INSTALL_SMOKE_SKIP_NONROOT=1)"
else
  echo "==> Build non-root image: $NONROOT_IMAGE"
  docker_build_retry \
    "$NONROOT_IMAGE" \
    "$ROOT_DIR/scripts/docker/install-sh-nonroot/Dockerfile" \
    "$ROOT_DIR/scripts/docker/install-sh-nonroot"

  echo "==> Run installer non-root test: $INSTALL_URL"
  docker run --rm -t \
    -e OPENSOUL_INSTALL_URL="$INSTALL_URL" \
    -e OPENSOUL_INSTALL_FALLBACK_URL="$FALLBACK_INSTALL_URL" \
    -e HTTP_PROXY="$CONTAINER_HTTP_PROXY" \
    -e HTTPS_PROXY="$CONTAINER_HTTPS_PROXY" \
    -e NO_PROXY="$CONTAINER_NO_PROXY" \
    -e OPENSOUL_INSTALL_EXPECT_VERSION="$LATEST_VERSION" \
    -e OPENSOUL_NO_ONBOARD=1 \
    -e DEBIAN_FRONTEND=noninteractive \
    "$NONROOT_IMAGE"
fi

if [[ "${OPENSOUL_INSTALL_SMOKE_SKIP_CLI:-${OPENCLAW_INSTALL_SMOKE_SKIP_CLI:-0}}" == "1" ]]; then
  echo "==> Skip CLI installer smoke (OPENSOUL_INSTALL_SMOKE_SKIP_CLI=1)"
  exit 0
fi

if [[ "$SKIP_NONROOT" == "1" ]]; then
  echo "==> Skip CLI installer smoke (non-root image skipped)"
  exit 0
fi

echo "==> Run CLI installer non-root test (same image)"
docker run --rm -t \
  --entrypoint /bin/bash \
  -e OPENSOUL_INSTALL_URL="$INSTALL_URL" \
  -e OPENSOUL_INSTALL_FALLBACK_URL="$FALLBACK_INSTALL_URL" \
  -e OPENSOUL_INSTALL_CLI_URL="$CLI_INSTALL_URL" \
  -e OPENSOUL_INSTALL_CLI_FALLBACK_URL="$FALLBACK_CLI_INSTALL_URL" \
  -e HTTP_PROXY="$CONTAINER_HTTP_PROXY" \
  -e HTTPS_PROXY="$CONTAINER_HTTPS_PROXY" \
  -e NO_PROXY="$CONTAINER_NO_PROXY" \
  -e OPENSOUL_NO_ONBOARD=1 \
  -e DEBIAN_FRONTEND=noninteractive \
  "$NONROOT_IMAGE" -lc "if ! curl --retry 5 --retry-delay 2 --retry-all-errors --connect-timeout 15 --max-time 180 -fsSL \"$CLI_INSTALL_URL\" | bash -s -- --set-npm-prefix --no-onboard; then curl --retry 5 --retry-delay 2 --retry-all-errors --connect-timeout 15 --max-time 180 -fsSL \"${OPENSOUL_INSTALL_CLI_FALLBACK_URL:-$CLI_INSTALL_URL}\" | bash -s -- --set-npm-prefix --no-onboard; fi"
