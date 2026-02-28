# Architecture (Initial)

## 当前阶段
- 阶段：Observability & Workflow Bootstrap
- 目标：先把 Agent 协作协议跑通，再扩展业务功能。

## 可观测层
- 人类可读：`PLAN.md`、`WORKLOG.md`、`TASKS/*.md`
- 机器可读：`STATUS.json`
- 可审计证据：`RUNS/<run_id>/`

## 原则
1. 每个最小可验收单元都必须有证据。
2. 每次动作必须可回滚（commit/patch）。
3. 破坏性操作必须先确认。
