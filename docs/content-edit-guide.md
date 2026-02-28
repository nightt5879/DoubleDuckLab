# Content Edit Guide (非技术同学版)

目标：只改内容，不改业务代码。

## 1) 你需要改哪些文件

### JSON（结构化基础信息）
目录：`src/data/content/`
- `site.zh.json`：中文站点文案（导航、首页文案）
- `site.en.json`：英文站点文案
- `members.json`：成员列表
- `projects.json`：项目列表

### Markdown（更适合连续内容）
目录：`src/content/`
- `news/*.md`：新闻条目
- `papers/*.md`：论文条目

## 2) JSON 修改规则
- 使用双引号 `"..."`
- 每项之间要有逗号
- 不要改字段名（如 `title`、`status`）

## 3) Markdown 修改规则
每个文件顶部必须有 frontmatter：

### 新闻示例（`src/content/news/2026-03-01.md`）
```md
---
date: '2026-03-01'
title:
  zh: '这里写中文标题'
  en: 'English title here'
---
```

### 论文示例（`src/content/papers/2026-xxx.md`）
```md
---
year: 2026
title: 'Paper Title'
venue: 'Conference Name'
---
```

## 4) 修改后如何检查
在项目根目录执行：
```bash
npm run validate:content
npm run build
```

## 5) 如何预览
```bash
./run.sh
```
浏览器打开 `http://localhost:4321`。
