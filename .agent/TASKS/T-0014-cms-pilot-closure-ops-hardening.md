# T-0014: CMS pilot closure / ops hardening（1.2.1）

## Goal
收口 1.2.0 news CMS 试点后的文档与 agent 留痕，并在同一条 1.2.1 hardening 跟进中修正 locale 识别、内容校验与 CMS 启用前置条件，统一说明 CMS 已接入模板、仍为 news-only，且必须满足环境与回调对齐前提。

## Scope
- In-scope:
  - 更新 README、roadmap、handoff、zero-code ops playbook 的 CMS 叙事
  - 新增 T-0014 任务记录并让 `.agent/STATUS.json` 指向当前任务
  - 明确 Decap CMS + GitHub backend + `editorial_workflow` + PR review 的当前运营路径
  - 修正 `.zh/.en` news 文件在本地化聚合时的 locale 识别
  - 放宽 `news` 标题 frontmatter 校验，兼容 `zh` / `en` 键顺序与非强制引号写法
  - 将 `PUBLIC_SITE_URL` 纳入 CMS 启用前置条件，并同步 smoke / docs 说明
- Out-of-scope:
  - CMS 扩到 `news` 之外的内容类型
  - 自托管 Decap bundle、SRI / CSP 等额外供应链加固
  - 依赖升级、部署调整或配置变更

## Acceptance Criteria
- [x] 文档一致说明 news CMS 已存在，不再写成未来计划
- [x] 文档一致说明 CMS 当前只覆盖 `news`
- [x] 文档一致说明发布链路为 Decap + GitHub backend + `editorial_workflow` + PR review
- [x] 文档一致说明运行依赖 env / OAuth / Pages 对齐
- [x] agent 留痕更新到 T-0014

## Constraints
- 仅做与 1.2.1 CMS hardening 直接相关的最小修正，不扩散到 `news` 之外
- 保持 diff 小且可 review

## Risks
- 当前未实际复核线上 OAuth / Pages / env 配置是否仍与文档一致
- 若后续 CMS 入口或运营权限策略变化，需要同步更新本任务涉及文档
- `/admin/` 仍依赖外部 CDN 加载 Decap CMS bundle，供应链加固留待后续独立处理

## Progress Log
- 2026-03-28: 创建 1.2.1 收口任务，范围限定为 docs + agent traceability。
- 2026-03-28: 更新 README、roadmap、handoff、ops playbook 与 `.agent/STATUS.json`，统一到 news CMS 已接入模板且仍为 news-only 的口径。
- 2026-03-28: 首轮 review / QA 指出 `README_EN.md` 叙事漂移与部分措辞过强，已纳入同一收口 diff 继续修正。
- 2026-03-28: README_EN 已补齐；Argus 最终建议 merge，Pulse 给出 scoped QA PASS，并提示真实 env / OAuth / Pages 对齐仍未在本轮复核。
- 2026-03-28: PR review 追加指出 locale 解析、`title.zh/en` frontmatter 校验、CMS 启用前置条件与任务留痕存在漂移；本任务同步扩展为 1.2.1 hardening 跟进，并保持 `news`-only 范围不变。
