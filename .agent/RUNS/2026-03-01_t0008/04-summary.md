# Summary

✅ Done
- 完成 markdown content collections 迁移（news/papers）。
- 保留 members/projects JSON 作为过渡。

📌 Evidence
- `.agent/RUNS/2026-03-01_t0008/02-evidence/terminal.log`

🧩 Diff Summary
- `src/content/config.ts`
- `src/content/news/*.md`
- `src/content/papers/*.md`
- `src/pages/news.astro` + `src/pages/papers.astro` (+ en)
- `scripts/validate-content.mjs`

➡️ Next
- T-0009：最小 CMS 接入方案草案（Decap/Sanity 对比）

⚠️ Risk
- 目前是混合内容源（JSON + Markdown），后续建议统一策略。
