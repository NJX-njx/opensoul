#!/usr/bin/env bash
set -euo pipefail

matches=$(grep -R -n -E "host.*sandbox" src scripts ui packages extensions || true)
if [ -n "$matches" ]; then
  echo "$matches"
  exit 1
fi
