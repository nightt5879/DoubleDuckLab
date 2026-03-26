# Intent

- Task: `T-0013`
- Branch: `codex/1.1.1-seo-followups`
- Goal: 修复 1.1.0 合并后 review 指出的 SEO / URL 一致性问题。

## Planned Scope
- alternate / hreflang 按实际对侧页面存在性输出
- 内部链接统一为 canonical 尾斜杠形式
- `test:seo` 与 `astro build` 共享站点 URL 解析逻辑
