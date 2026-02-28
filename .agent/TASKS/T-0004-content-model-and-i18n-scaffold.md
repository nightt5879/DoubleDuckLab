# T-0004: Content Model Extraction + i18n Scaffold

## Goal
将页面内容从页面文件中抽离到统一数据层，并建立中英双语路由占位。

## Scope
- In-scope:
  - 新建 `src/data/content.ts`
  - 页面改为读取数据渲染
  - 增加 `/en/*` 英文页面骨架
- Out-of-scope:
  - CMS 接入
  - 自动翻译与内容审核流

## Acceptance Criteria
- [x] 页面内容通过数据层驱动
- [x] 中英文路径均可访问
- [x] `npm run build` 通过
- [x] RUN 证据落盘
