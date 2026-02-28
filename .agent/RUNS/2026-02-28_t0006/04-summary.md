# Summary

✅ Done
- 完成内容源迁移：`content.ts` -> `src/data/content/*.json`。
- 页面与布局均改为 JSON 驱动。

📌 Evidence
- `.agent/RUNS/2026-02-28_t0006/02-evidence/terminal.log`

🧩 Diff Summary
- 新增 `src/data/content/*.json`
- 更新 `src/layouts/BaseLayout.astro`
- 更新 `src/pages/*` 与 `src/pages/en/*`
- 删除 `src/data/content.ts`

➡️ Next
- T-0007：提取 design tokens + 全站样式统一。

⚠️ Risk
- JSON 手工编辑容易字段拼写错误，后续建议加 schema 校验。
