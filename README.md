# lab-website-template

这个仓库已初始化为「Agent 可观测 + 工作流协议」模式。

## 目标
先固定链路：**计划 → 执行 → 证据 → 回报 → 复盘**。

## 快速开始
1. 先读 `.agent/CONTRACT.md`
2. 新任务按 `.agent/TASKS/T-xxxx.md` 创建
3. 每次执行在 `.agent/RUNS/<run_id>/` 落盘证据
4. 更新 `.agent/STATUS.json` 与 `.agent/WORKLOG.md`

## 目录
- `docs/`：架构与说明文档
- `decisions/`：ADR 决策记录
- `src/`：源码
- `tests/`：测试
- `scripts/`：自动化脚本
- `.agent/`：Agent 协作协议与执行痕迹（核心）
