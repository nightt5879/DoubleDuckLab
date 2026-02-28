# T-0006: Migrate Content Source to JSON

## Goal
将页面内容从 `src/data/content.ts` 迁移到可非技术编辑的 JSON 文件。

## Scope
- In-scope:
  - 新建 `src/data/content/*.json`
  - 页面改为 JSON 驱动
  - 删除旧的 TS 内容源
- Out-of-scope:
  - CMS 接入
  - 多语言路由扩展

## Acceptance Criteria
- [x] 页面不再依赖 `content.ts`
- [x] 内容文件可直接 JSON 编辑
- [x] `npm run build` 成功
- [x] RUN 证据留存
