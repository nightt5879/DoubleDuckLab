# T-0014: CMS pilot closure / ops hardening（1.2.1）

## Goal
收口 1.2.0 news CMS 试点后的文档与 agent 留痕，统一说明 CMS 已接入模板、仍为 news-only，并明确启用依赖的环境与回调对齐前提。

## Scope
- In-scope:
  - 更新 README、roadmap、handoff、zero-code ops playbook 的 CMS 叙事
  - 新增 T-0014 任务记录并让 `.agent/STATUS.json` 指向当前任务
  - 明确 Decap CMS + GitHub backend + `editorial_workflow` + PR review 的当前运营路径
- Out-of-scope:
  - 代码逻辑修改
  - CMS 扩到 `news` 之外的内容类型
  - 依赖升级、部署调整或配置变更

## Acceptance Criteria
- [x] 文档一致说明 news CMS 已存在，不再写成未来计划
- [x] 文档一致说明 CMS 当前只覆盖 `news`
- [x] 文档一致说明发布链路为 Decap + GitHub backend + `editorial_workflow` + PR review
- [x] 文档一致说明运行依赖 env / OAuth / Pages 对齐
- [x] agent 留痕更新到 T-0014

## Constraints
- 仅做 docs + agent traceability 变更
- 保持 diff 小且可 review

## Risks
- 当前只做文档收口，未实际复核线上 OAuth / Pages / env 配置是否仍与文档一致
- 若后续 CMS 入口或运营权限策略变化，需要同步更新本任务涉及文档

## Progress Log
- 2026-03-28: 创建 1.2.1 收口任务，范围限定为 docs + agent traceability。
- 2026-03-28: 更新 README、roadmap、handoff、ops playbook 与 `.agent/STATUS.json`，统一到 news CMS 已接入模板且仍为 news-only 的口径。
- 2026-03-28: 首轮 review / QA 指出 `README_EN.md` 叙事漂移与部分措辞过强，已纳入同一收口 diff 继续修正。
- 2026-03-28: README_EN 已补齐；Argus 最终建议 merge，Pulse 给出 scoped QA PASS，并提示真实 env / OAuth / Pages 对齐仍未在本轮复核。
