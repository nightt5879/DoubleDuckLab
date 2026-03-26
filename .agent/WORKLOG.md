# WORKLOG

## 2026-02-28
- 收到需求：直接 Astro 开工，先本地预览，不碰服务器。
- 已完成：Astro 骨架 + 5 个页面 + 本地运行说明。
- 新增 T-0004：内容数据抽离 + 中英路由占位。
- 完成数据驱动改造：`src/data/content.ts`，并新增 `/en/*` 页面。
- T-0006: 内容源从 content.ts 迁移到 JSON（便于非技术同学维护）。
- T-0006: 内容源从 content.ts 迁移到 JSON（便于非技术同学维护）。
- 完成 T-0007：design tokens + content validation + content edit guide。
- 完成 T-0008：news/papers 迁移到 markdown content collections。
- 完成 T-0009：CMS 选型拍板文档（Decap 主推，Sanity 备选）。
- 完成 T-0010：内容运营 SOP 与 0代码维护清单。
- 完成 T-0011：基础收官验收包与交接文档。

## 2026-03-04
- 按要求执行流程限制学习：已阅读 `.agent/CONTRACT.md`、`STATUS.json`、`WORKLOG.md`、`PLAN.md`、`TASKS/*` 与最新 `RUNS` 样例。
- 新增开发留痕：`.agent/RUNS/2026-03-04_process-audit/`（intent/actions/evidence/summary）。
- 明确后续执行规范：每次开发继续维护 `STATUS.json`、`WORKLOG.md` 与 `RUNS/*`。

## 2026-03-26
- 新增 T-0012：1.1.0 的 SEO / i18n 基础加固。
- 创建 RUN 留痕：`.agent/RUNS/2026-03-26_t0012-seo-i18n/`。
- 开始梳理站点 URL、布局 SEO 标签、当前页语言互跳与自验证链路。
- 完成环境变量站点地址、canonical / OG / hreflang / robots、当前页语言互跳与构建后 `test:seo`。
- 本地自验证通过：`verify.bat --no-pause`。
- 新增 T-0013：1.1.1 review follow-ups，处理 alternate 可用性、内部链接尾斜杠一致性与 `test:seo` 读取 `.env` 的问题。
- 完成 1.1.1 follow-up：按对侧页面存在性输出 alternate，统一内部链接 URL 形式，并让 `test:seo` 与 build 共用站点地址解析。
- 本地自验证通过：`verify.bat --no-pause`。
