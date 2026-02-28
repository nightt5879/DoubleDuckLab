# T-0008: Migrate key content to Astro content collections (Markdown)

## Goal
将核心内容从 JSON 升级为 Markdown content collections，便于后续接 CMS。

## Scope
- In-scope:
  - 新增 Astro content collections 配置
  - 将 news/papers 迁移为 Markdown 文件
  - 页面改为读取 collections
- Out-of-scope:
  - 全量内容迁移（members/projects 暂保留 JSON）
  - CMS 接入

## Acceptance Criteria
- [x] `src/content/config.ts` 生效
- [x] news/papers 页面读取 markdown 内容
- [x] `npm run validate:content` + `npm run build` 通过
- [x] RUN 证据留痕
