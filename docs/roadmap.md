# Roadmap

更新时间：2026-05-03（1.3.3 build-log cleanup）

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
- 补 locale 新闻文件识别、标题 frontmatter 校验与 `PUBLIC_SITE_URL` 作为 CMS 启用前提的硬化修正

## 1.3.0 CMS 文件管理后台

已完成：
- 将 `/admin/` 从 news-only 试点扩展为内容文件管理后台
- 支持新闻、成员、论文的新增、编辑、删除
- 支持招生与合作固定页面编辑，禁止新增/删除
- 支持现有项目 overview/background 文件编辑，禁止新增/删除项目以保护四文件结构
- 保持 Decap + GitHub backend + `editorial_workflow`，不引入数据库或自研后端

## 1.3.1 CMS 线上闭环启用

计划项：
- 新增 Cloudflare Worker OAuth 代理部署包，补齐 Decap CMS GitHub 登录前提
- 明确 GitHub OAuth App、Worker secrets 与 Cloudflare Pages 环境变量配置
- 使用已发布的 `v1.3.0` 新闻完成一次真实 CMS 编辑 PR、预览、合并闭环
- 不扩展 CMS 内容模型，不引入数据库或服务端内容 API

## 1.3.2 CMS 稳定性补丁

已完成：
- 为旧新闻补齐稳定 `slug` frontmatter，避免 Decap 编辑既有条目时要求手工猜 slug
- 清理首次 CMS 验收留下的测试文字，避免测试内容进入长期生产内容
- 收紧新闻 `slug` 提示、校验和 smoke 检查，要求以小写字母开头，不包含日期前缀
- 文档补充 Save -> Ready -> Publish now 的后台发布流程说明

## 1.3.3 构建日志清理

已完成：
- 构建前同步清理 `dist/` 与 `.astro`，避免 stale content cache 造成重复 news id warning
- 保持 CMS 范围、公开路由和内容模型不变

## T-0015 真实上线闭环演练

已完成：
- 保持 CMS 范围为 `news` only，不扩到其他内容类型
- 新增上线演练记录与真实素材替换清单
- 新增 `2026-04-23-go-live-rehearsal` 双语新闻，验证 news CMS 目标文件形态
- 清理明显会误导上线验收的假邮箱、假外链和虚假成果表述

待线上完成：
- 使用 `/admin/` 创建真实新闻 PR
- 检查 Cloudflare Pages 预览、OAuth 回调、环境变量与合并上线
