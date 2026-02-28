# ADR-0001: 引入 Agent 可观测工作流

- Status: Accepted
- Date: 2026-02-28

## Context
需要约束 Agent 执行过程，保证可追踪、可中断、可复盘。

## Decision
引入 `.agent/` 目录作为协作协议与执行证据的单一入口：
- CONTRACT：行为约束
- STATUS：机器可读状态
- TASKS：任务规格
- RUNS：执行证据
- WORKLOG：连续日志

## Consequences
- 初期文档开销增加
- 可显著提高可控性、可审计性、可迁移性
