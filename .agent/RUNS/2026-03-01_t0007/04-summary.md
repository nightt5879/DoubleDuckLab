# Summary

✅ Done
- 完成设计 token 基础层抽离。
- 完成 JSON 内容校验脚本。
- 完成非技术编辑指南。

📌 Evidence
- `.agent/RUNS/2026-03-01_t0007/02-evidence/terminal.log`

🧩 Diff Summary
- `src/styles/tokens.css`
- `scripts/validate-content.mjs`
- `docs/content-edit-guide.md`
- `package.json` script updates

➡️ Next
- T-0008: 用 markdown/content collections 替代部分 JSON，提高可维护性。

⚠️ Risk
- 校验是脚本级，后续建议接入 CI 强制检查。
