# Summary

## Done

- 限制 locale alternates 与页脚语言切换只在对侧页面存在时输出
- 统一导航、首页入口与详情页返回链接到 canonical 尾斜杠形式
- 让 `test:seo` 与 `astro build` 共用站点 URL 解析来源
- 显式声明 `vite` 为 dev dependency
- 更新 `1.1.1` changelog 与 roadmap 记录

## Evidence

- `.agent/RUNS/2026-03-26_t0013-seo-followups/02-evidence/self-check.md`
- `verify.bat --no-pause`

## Diff

- 新增：`scripts/site-url.mjs`
- 更新：`astro.config.mjs`、`scripts/verify-seo-i18n.mjs`、`src/layouts/BaseLayout.astro`、相关页面链接与 `localeAlternates`

## Next

- 提交 `1.1.1` follow-up commit
- 打开小型 follow-up PR

## Risk

- news / projects 详情页已显式控制 alternate；若未来其他内容类型改成非对称语言发布，也应采用同样模式
