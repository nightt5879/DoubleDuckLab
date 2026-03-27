# Content Edit Guide（非技术同学版）

目标：只改内容，不改页面代码。

## 1. 你会编辑哪些文件

### 站点文案
- `src/data/site.zh.json`
- `src/data/site.en.json`

用于修改：
- 顶部导航
- 首页介绍
- 首页重点信息
- 页脚品牌名

### 成员
- `src/content/members/*.md`

每位成员一个 Markdown 文件。

### 项目
- `src/content/projects/<slug>/`

每个项目一个目录，目录里有四个文件：
- `overview_cn.md`
- `overview_en.md`
- `background_cn.md`
- `background_en.md`

### 论文
- `src/content/papers/*.md`

### 新闻
- `src/content/news/<slug>/`

每条新闻一个目录，目录里至少要有：
- `*_cn.md`
- `*_en.md`

### 招生与合作
- `src/content/join/recruitment/overview_cn.md`
- `src/content/join/recruitment/overview_en.md`

## 2. 修改规则

### JSON
- 使用双引号 `"..."`
- 保留字段名不变
- 不确定时只改文案内容，不改结构

### Markdown
- 文件头部的 frontmatter 不要删
- 路径、后缀、语言配对要保持一致
- 中文新闻必须是 `_cn.md`
- 英文新闻必须是 `_en.md`

## 3. 最常用模板

### 新增成员
```md
---
id: "new-member"
name:
  zh: "新成员"
  en: "New Member"
role:
  zh: "硕士生"
  en: "Master"
status:
  zh: "在读"
  en: "Current"
area:
  zh: "研究方向"
  en: "Research Area"
---
```

### 新增项目目录
```text
src/content/projects/my-project/
  overview_cn.md
  overview_en.md
  background_cn.md
  background_en.md
```

`overview_cn.md` 示例：
```md
---
title: "项目名"
tag: "Embodied AI"
time: "2026"
status: "进行中"
---
这里写项目概览正文。
```

### 新增新闻目录
```text
src/content/news/2026-03-25-my-news/
  中文标题_cn.md
  English_title_en.md
```

新闻文件示例：
```md
---
date: "2026-03-25"
---

这里写正文。
```

### 新增论文
```md
---
year: 2026
title: "Paper Title"
venue: "Conference Name"
---
```

## 4. 修改后怎么检查

在项目根目录执行：

```bash
npm run verify
```

## 5. 如何预览

```bash
./run.sh
```

浏览器打开：
- `http://localhost:4321/`
- `http://localhost:4321/en/`
