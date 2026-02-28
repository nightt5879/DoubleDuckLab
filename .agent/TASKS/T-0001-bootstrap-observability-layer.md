# T-0001: Bootstrap Observability Layer

## Goal
建立最小可用的 Agent 路线跟踪协议与证据落盘结构。

## Scope
- In-scope:
  - `.agent/` 目录骨架
  - 协议文件与模板
  - 状态读取脚本
- Out-of-scope:
  - 业务功能开发
  - 复杂前端面板

## Acceptance Criteria
- [x] `.agent/CONTRACT.md` 存在并定义行为约束
- [x] `.agent/STATUS.json` 可被脚本读取
- [x] `.agent/RUNS` 有至少一次 run 证据

## Constraints
- 不做破坏性变更
- 不引入额外第三方依赖

## Risks
- 风险：团队不按流程维护状态文件
- 缓解：在 PR checklist 增加强制检查项

## Progress Log
- 2026-02-28: 初始化完成
