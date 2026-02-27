#!/usr/bin/env bash
set -euo pipefail

extension_path="${SQLITE_VEC_EXTENSION_PATH:-}"
model_dir="${MODEL_CACHE_DIR:-/var/lib/ai-models}"
md5_file="${MODEL_MD5_FILE:-$model_dir/manifest.md5}"

fail() {
  echo "{\"error\":\"$1\"}" >&2
  exit 1
}

if [ -z "$extension_path" ]; then
  fail "missing_extension_path"
fi
if [ ! -f "$extension_path" ]; then
  fail "extension_not_found"
fi

perm=""
if perm=$(stat -c "%a" "$extension_path" 2>/dev/null); then
  :
elif perm=$(stat -f "%Lp" "$extension_path" 2>/dev/null); then
  :
else
  fail "extension_perm_unavailable"
fi
if [ "$perm" != "644" ]; then
  fail "extension_bad_permissions"
fi

if [ ! -d "$model_dir" ]; then
  fail "model_cache_missing"
fi
if [ ! -f "$md5_file" ]; then
  fail "model_md5_manifest_missing"
fi

if ! (cd "$model_dir" && md5sum -c "$md5_file"); then
  fail "model_md5_mismatch"
fi

echo "{\"ok\":true}"
