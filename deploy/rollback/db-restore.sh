#!/usr/bin/env bash
set -euo pipefail

db_type="${DB_TYPE:-sqlite}"
backup_path="${1:-}"
target_path="${2:-}"

if [ -z "$backup_path" ]; then
  echo '{"error":"missing_backup_path"}' >&2
  exit 1
fi

if [ "$db_type" = "sqlite" ]; then
  if [ -z "$target_path" ]; then
    echo '{"error":"missing_target_path"}' >&2
    exit 1
  fi
  cp "$backup_path" "$target_path"
  echo "{\"ok\":true,\"type\":\"sqlite\",\"target\":\"$target_path\"}"
  exit 0
fi

if [ "$db_type" = "postgres" ]; then
  if [ -z "${PGHOST:-}" ] || [ -z "${PGUSER:-}" ] || [ -z "${PGDATABASE:-}" ]; then
    echo '{"error":"missing_pg_env"}' >&2
    exit 1
  fi
  pg_restore --clean --if-exists --no-owner --dbname="$PGDATABASE" "$backup_path"
  echo "{\"ok\":true,\"type\":\"postgres\",\"database\":\"$PGDATABASE\"}"
  exit 0
fi

echo '{"error":"unsupported_db_type"}' >&2
exit 1
