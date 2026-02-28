#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$REPO_DIR"

TARGET_BRANCH="${1:-feat/astro-content-model-i18n-scaffold}"

echo "[check.sh] repo: $REPO_DIR"
echo "[check.sh] target branch: $TARGET_BRANCH"

echo "[check.sh] fetch origin..."
git fetch origin

if git show-ref --verify --quiet "refs/heads/$TARGET_BRANCH"; then
  git checkout "$TARGET_BRANCH"
else
  git checkout -b "$TARGET_BRANCH" "origin/$TARGET_BRANCH"
fi

echo "[check.sh] pull latest..."
git pull --rebase origin "$TARGET_BRANCH"

# 防止 Windows CRLF 导致 /usr/bin/env: 'bash\r' 报错
if [ -f run.sh ]; then
  sed -i 's/\r$//' run.sh
  chmod +x run.sh
fi

echo "[check.sh] run local preview..."
exec bash ./run.sh
