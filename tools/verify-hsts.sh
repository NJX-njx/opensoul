#!/usr/bin/env bash
set -euo pipefail

url="${1:-}"
if [ -z "$url" ]; then
  echo '{"error":"missing_url"}' >&2
  exit 1
fi

headers=$(curl -sI "$url")
echo "$headers" | grep -qi "strict-transport-security: max-age=31536000; includeSubDomains"
if [ $? -ne 0 ]; then
  echo '{"error":"hsts_header_missing"}' >&2
  exit 1
fi

echo "$headers"
