# Actions

- 2026-03-26: 创建 `T-0012` 任务与本次 RUN 骨架。
- 2026-03-26: 读取现有路由、布局、CI 与 agent workflow 配置，确认 1.1.0 的实现边界。
- 2026-03-26: 新增 `src/utils/seo.ts`，统一站点 URL、canonical、hreflang 与摘要逻辑。
- 2026-03-26: 更新 `astro.config.mjs`、`BaseLayout.astro` 与页面描述，补齐 canonical / OG / robots / 当前页语言互跳。
- 2026-03-26: 新增 `scripts/verify-seo-i18n.mjs`，并串到 `package.json`、CI 与 `verify.bat`。
- 2026-03-26: 更新 README、release checklist、roadmap、changelog 与 `.env.example`。
- 2026-03-26: 完成本地自验证：`verify.bat --no-pause` 通过。
