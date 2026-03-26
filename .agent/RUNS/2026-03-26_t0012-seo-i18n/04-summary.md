# Summary

## Done

- 为站点增加环境变量优先的生产 URL 配置
- 在共享布局层补齐 canonical、Open Graph、Twitter card、hreflang 与 robots
- 把页脚语言切换改成当前页面中英互跳
- 增加构建后的 SEO / i18n 校验，并串入 `verify.bat` 与 CI
- 更新 1.1.0 文档与版本记录

## Evidence

- `.agent/RUNS/2026-03-26_t0012-seo-i18n/02-evidence/self-check.md`
- `verify.bat --no-pause`

## Diff

- 新增：`src/utils/seo.ts`、`scripts/verify-seo-i18n.mjs`、`.env.example`
- 更新：`astro.config.mjs`、`src/layouts/BaseLayout.astro`、各中英文页面、`verify.bat`、CI、README、roadmap、changelog

## Next

- 提交分支 commit
- 准备 PR 描述与自验证结果
- 交由云端 Codex 做第二层 review

## Risk

- 若生产域名后续变更但未同步 `PUBLIC_SITE_URL`，canonical / hreflang 会指向旧域名
- 当前页语言互跳基于中英文路径镜像关系；若未来新增非对称路由，需要补专用映射
