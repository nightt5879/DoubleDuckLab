# Content Map

本文件用于快速定位“改哪里会影响哪里”。
当前版本的唯一真源只有两类：

- 站点级文案：`src/data/site.zh.json`、`src/data/site.en.json`
- 内容集合：`src/content/*`

## 1. 站点级文案

### 1.1 Header / Footer / 首页结构文案
- 文件：`src/data/site.zh.json`
- 文件：`src/data/site.en.json`
- 关键字段：`brand`、`siteName`、`nav.*`、`home.intro`、`home.sections.*`、`home.highlights[]`、`home.quick`
- 影响页面：
  - `src/layouts/BaseLayout.astro`
  - `src/pages/index.astro`
  - `src/pages/en/index.astro`

## 2. 成员

### 2.1 数据来源
- 目录：`src/content/members/*.md`
- 必填字段：`id`、`name.zh/en`、`role.zh/en`、`area.zh/en`
- 可选字段：`status`、`bio`、`avatar`、`links`

### 2.2 页面映射
- 列表：`src/pages/members.astro`、`src/pages/en/members.astro`
- 详情：`src/pages/members/[id].astro`、`src/pages/en/members/[id].astro`

## 3. 项目

### 3.1 数据来源
- 目录：`src/content/projects/<slug>/`
- 必备文件：
  - `overview_cn.md`
  - `overview_en.md`
  - `background_cn.md`
  - `background_en.md`
- `overview_*` frontmatter 常用字段：`title`、`tag`、`time`、`status`、`links`

### 3.2 页面映射
- 列表：`src/pages/projects.astro`、`src/pages/en/projects.astro`
- 详情：`src/pages/projects/[slug].astro`、`src/pages/en/projects/[slug].astro`

## 4. 论文

### 4.1 数据来源
- 目录：`src/content/papers/*.md`
- 必填字段：`year`、`title`、`venue`
- 可选字段：`authors`、`abstract`、`links`、`bibtex`

### 4.2 页面映射
- 列表：`src/pages/papers.astro`、`src/pages/en/papers.astro`
- 详情：`src/pages/papers/[slug].astro`、`src/pages/en/papers/[slug].astro`

## 5. 新闻

### 5.1 数据来源
- 目录：`src/content/news/<slug>/`
- 命名规则：
  - 中文：`*_cn.md`
  - 英文：`*_en.md`
- 必填 frontmatter：`date`

### 5.2 页面映射
- 列表：`src/pages/news.astro`、`src/pages/en/news.astro`
- 详情：`src/pages/news/[slug].astro`、`src/pages/en/news/[slug].astro`

## 6. 招生与合作

### 6.1 数据来源
- 目录：`src/content/join/<topic>/`
- 当前入口：`src/content/join/recruitment/overview_cn.md`、`src/content/join/recruitment/overview_en.md`

### 6.2 页面映射
- 中文：`src/pages/join.astro`
- 英文：`src/pages/en/join.astro`

## 7. 样式与交互

- 样式：
  - `src/styles/tokens.css`
  - `src/styles/base.css`
  - `src/styles/components.css`
  - `src/styles/effects.css`
  - `src/styles/utilities.css`
- 脚本：
  - `src/scripts/reveal.mjs`
  - `src/scripts/navbar-scroll.mjs`
  - `src/scripts/ui.mjs`

## 8. 验证链路

- 推荐一键验收：`npm run verify`
- 内容校验：`npm run validate:content`
- 构建：`npm run build`
- 构建后 smoke：`npm run test:smoke`

## 9. 维护原则

1. 不再使用 `src/data/content/*`。
2. 改内容优先改 `src/data/site.*.json` 或 `src/content/*`，不要先改页面模板硬编码。
3. 改完内容后至少跑一次：
   - `npm run verify`
