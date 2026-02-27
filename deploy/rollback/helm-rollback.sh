#!/usr/bin/env bash
set -euo pipefail

release="${1:-}"
namespace="${2:-default}"
revision="${3:-}"

if [ -z "$release" ]; then
  echo '{"error":"missing_release"}' >&2
  exit 1
fi

if [ -z "$revision" ]; then
  revision=$(helm history "$release" -n "$namespace" --max 1 -o json | node -e "const fs=require('fs');const d=JSON.parse(fs.readFileSync(0,'utf8'));process.stdout.write(String(d[0]?.revision||''));")
fi

if [ -z "$revision" ]; then
  echo '{"error":"missing_revision"}' >&2
  exit 1
fi

helm rollback "$release" "$revision" -n "$namespace" --wait --timeout 5m
