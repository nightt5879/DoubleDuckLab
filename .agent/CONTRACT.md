# Agent Collaboration Contract

## 1. 开工前（必须）
- 写本次 Intent（目标、边界、非目标）
- 对齐任务文件与验收标准

## 2. 执行中（必须）
- 每完成一个可验收最小单元，就汇报一次：
  - Done
  - Evidence
  - Diff Summary
  - Next
  - Risk/Question
- 同步更新 `STATUS.json`

## 3. 变更约束（必须）
- 任何破坏性操作（删除/重构/批量替换/迁移依赖）必须先确认。
- 变更要可回滚：小步 commit 或 patch。

## 4. 落盘约束（必须）
- 每次执行必须在 `RUNS/<run_id>/` 留痕：
  - `00-intent.md`
  - `01-actions.md`
  - `02-evidence/`
  - `03-diff.patch`（可选）
  - `04-summary.md`

## 5. 汇报格式（固定）
- 进度(%):
- 已完成:
- 当前阻塞:
- 下一步:
- 证据路径:
- 风险:
