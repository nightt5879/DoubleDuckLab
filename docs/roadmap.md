# Roadmap

更新时间：2026-03-28（1.2.1 CMS pilot closure / ops hardening）

## 1.0.1 基线修复

已完成：
- 修乱码与 UTF-8 一致性
- 收口唯一真源
- 修正文档漂移
- 补最小 CI
- 补 build 后 smoke test

## 1.1.0 SEO / i18n

已完成：
- 生产域名改为环境变量优先、正式域名兜底
- canonical / Open Graph / hreflang / robots
- 当前页面中英互跳
- build 后补 SEO / i18n 校验

## 1.1.1 SEO / URL follow-up（已完成）

计划项：
- alternate / hreflang 按对侧页面存在性输出
- 站内内部链接统一为 canonical 尾斜杠形式
- `test:seo` 与 build 共用站点 URL 解析逻辑

## 1.1.2 Stability hardening

已完成：
- 统一 `verify` 作为本地、Windows 和 CI 的验收入口
- 让构建流程默认走干净产物，避免旧 `dist/` 影响验收
- 收口发布验收与文档叙事，保持对外行为不变

## 1.2.0 CMS 试点（已完成）

已完成：
- 先接 `news`，只做双语新闻的 Decap CMS 试点
- 在模板中接入 GitHub backend + `editorial_workflow` 的编辑与 PR 审核链路
- 用环境变量驱动 repo / branch / OAuth 地址，保持模板仓库可复用
- 将新闻内容模型切到显式标题 + `.zh.md` / `.en.md` 文件配对

## 1.2.1 CMS 试点收口 / ops hardening

已完成：
- 收口 README、handoff、ops playbook 与 agent 任务留痕，统一说明 news CMS 已接入模板并可按前提启用
- 明确当前 CMS 仍然只覆盖 `news`，继续使用 Decap + GitHub backend + `editorial_workflow`
- 明确运营前提：仓库环境变量、OAuth 代理和 Cloudflare Pages 回调地址需保持一致
