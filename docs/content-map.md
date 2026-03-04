# Content Map

本文件用于快速定位“改哪里会影响哪里”。
适用于当前 Astro 静态站（JSON + Content Collections）。

## 1) 站点级文案

### 1.1 左上角站点名（Brand）
- 文件：`src/data/content/site.zh.json`
- 文件：`src/data/content/site.en.json`
- 字段：`brand`
- 影响页面：全站（通过 `BaseLayout.astro`）

### 1.2 导航文案（Nav）
- 文件：`src/data/content/site.zh.json`
- 文件：`src/data/content/site.en.json`
- 字段：`nav.home / nav.members / nav.projects / nav.papers / nav.news`
- 影响页面：全站顶部导航

## 2) 首页内容

### 2.1 首页标题/简介/卡片文案
- 文件：`src/data/content/site.zh.json`
- 文件：`src/data/content/site.en.json`
- 字段：
  - `home.title`
  - `home.intro`
  - `home.highlights[]`（每项 `title` + `desc`）
  - `home.quick`
- 页面：
  - 中文：`src/pages/index.astro`
  - 英文：`src/pages/en/index.astro`

### 2.2 首页区块里的“结构性标题/说明文案”
- 文件：`src/pages/index.astro`（中文）
- 文件：`src/pages/en/index.astro`（英文）
- 说明：如 `Highlights` / `Featured Projects` 区块标题、页面说明文字属于页面结构文案，不在 JSON。

## 3) 成员（Members）

### 3.1 列表数据
- 文件：`src/data/content/members.json`
- 建议字段：
  - `id`（稳定路由 id）
  - `name`
  - `role.zh / role.en`
  - `area`
- 页面：
  - 列表：`src/pages/members.astro` / `src/pages/en/members.astro`
  - 详情：`src/pages/members/[id].astro` / `src/pages/en/members/[id].astro`

### 3.2 详情模板文案（当前为示例占位）
- 文件：
  - `src/pages/members/[id].astro`
  - `src/pages/en/members/[id].astro`
- 说明：简介段落、selected works、links 目前是模板示例，可替换为真实内容来源。

## 4) 项目（Projects）

### 4.1 列表数据
- 文件：`src/data/content/projects.json`
- 建议字段：
  - `slug`（稳定路由 slug）
  - `title`
  - `tag`
  - `status.zh / status.en`
- 页面：
  - 列表：`src/pages/projects.astro` / `src/pages/en/projects.astro`
  - 详情：`src/pages/projects/[slug].astro` / `src/pages/en/projects/[slug].astro`

### 4.2 详情模板文案（当前为示例占位）
- 文件：
  - `src/pages/projects/[slug].astro`
  - `src/pages/en/projects/[slug].astro`
- 说明：summary/background/method/progress/related 目前是模板示例，可后续接真实字段。

## 5) 新闻（News）

### 5.1 数据来源
- 目录：`src/content/news/*.md`
- frontmatter 字段：
  - `date`
  - `title.zh`
  - `title.en`
- 正文：Markdown 主体

### 5.2 页面映射
- 列表：`src/pages/news.astro` / `src/pages/en/news.astro`
- 详情：`src/pages/news/[slug].astro` / `src/pages/en/news/[slug].astro`

## 6) 论文（Papers）

### 6.1 数据来源
- 目录：`src/content/papers/*.md`
- frontmatter 字段：
  - `year`
  - `title`
  - `venue`

### 6.2 页面映射
- 列表：`src/pages/papers.astro` / `src/pages/en/papers.astro`
- 详情：`src/pages/papers/[slug].astro` / `src/pages/en/papers/[slug].astro`

## 7) 路由与布局入口

### 7.1 页面入口
- 中文首页：`src/pages/index.astro`
- 英文首页：`src/pages/en/index.astro`
- 其他页面：`src/pages/**` 与 `src/pages/en/**`

### 7.2 全站布局
- 文件：`src/layouts/BaseLayout.astro`
- 作用：
  - 注入全局样式
  - 顶部导航/底部
  - 主题切换与全局脚本挂载

## 8) 样式与交互层（改 UI 看这里）

- 设计 token：`src/styles/tokens.css`
- 基础排版：`src/styles/base.css`
- 组件样式：`src/styles/components.css`
- 特效样式：`src/styles/effects.css`
- 通用工具类：`src/styles/utilities.css`

- reveal 动效：`src/scripts/reveal.mjs`
- 导航滚动状态：`src/scripts/navbar-scroll.mjs`
- 主题切换/列表筛选：`src/scripts/ui.mjs`

## 9) 修改建议（避免踩坑）

1. 改文案优先改 `src/data/content/*.json` 与 `src/content/*.md`，少改页面模板硬编码。
2. `members.json` 的 `id`、`projects.json` 的 `slug` 不建议频繁改动，否则会改变详情页 URL。
3. 每次内容变更后执行：
   - `npm run validate:content`
   - `npm run build`
