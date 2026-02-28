#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

if [ ! -d node_modules ]; then
  echo "[run.sh] node_modules 不存在，先执行 npm install..."
  npm install
fi

PORT="${PORT:-4321}"
echo "[run.sh] 启动 Astro dev server: http://localhost:${PORT}"
exec npm run dev -- --host 0.0.0.0 --port "$PORT"
