# Actions

- 2026-03-26: 创建 `T-0013` 任务与本次 RUN 骨架。
- 2026-03-26: 读取 merged PR review，确认 follow-up 范围限定为 3 个 SEO / URL 一致性问题。
- 2026-03-26: 新增 `scripts/site-url.mjs`，让 `astro.config.mjs` 与 `scripts/verify-seo-i18n.mjs` 共享站点 URL 解析逻辑。
- 2026-03-26: 更新 `BaseLayout.astro`，支持按显式 `localeAlternates` 输出 hreflang / 切换链接，并统一导航链接 URL 形式。
- 2026-03-26: 更新首页、详情页与返回入口，把站内内部链接统一成尾斜杠形式。
- 2026-03-26: 为 news / projects 详情页显式传入 `localeAlternates`，避免未来单语内容时生成错误 alternate。
- 2026-03-26: 显式声明 `vite` 为 dev dependency，避免直接依赖 Astro 的传递依赖。
- 2026-03-26: 自验证通过：`verify.bat --no-pause`。
