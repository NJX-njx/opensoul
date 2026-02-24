#!/usr/bin/env bash
# OpenSoul WSL2 完整构建脚本
# 在 WSL 终端中运行: bash scripts/sync-wsl-build.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "=== 1. 安装依赖 (CI=true) ==="
CI=true pnpm install

echo "=== 2. 构建核心 (canvas:a2ui + tsdown + plugin-sdk + ...) ==="
CI=true pnpm build

echo "=== 3. 构建 Control UI ==="
pnpm ui:build

echo "=== 完成。请在 Windows PowerShell 中运行: ==="
echo "  cd apps\\windows"
echo "  dotnet build -c Release"
echo "  .\\src\\OpenSoul\\bin\\Release\\net8.0-windows10.0.19041.0\\OpenSoul.exe"
