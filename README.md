<p align="center">
  <img src="./sources/DDLab_logo.png" width="350" alt="DoubleDuckLab logo">
</p>

# DoubleDuckLab (DDLab)

<p align="right">
  中文 | <a href="./README_EN.md">English</a>
</p>

一个基于 Astro 的双语课题组官网模板，面向“本地优先、文件驱动、可持续维护”的内容工作流。

## 预览

- 在线预览：[https://doubleducklab.com](https://doubleducklab.com)

<p align="center">
  <a href="https://doubleducklab.com" target="_blank">
    <img src="./sources/preview_light.png" alt="Preview light" width="48%"/>
  </a>
  <a href="https://doubleducklab.com" target="_blank">
    <img src="./sources/preview_dark.png" alt="Preview dark" width="48%"/>
  </a>
</p>

## 快速开始

```bash
git clone https://github.com/nightt5879/doubleducklab.git
cd doubleducklab
npm install
npm run verify
npm run preview
```

Windows 一键校验：

```bat
verify.bat
```

默认访问：

- `http://localhost:4321/`
- `http://localhost:4321/en/`

## 生产域名配置

默认生产域名兜底为 `https://doubleducklab.com`。如需替换，请在本地 `.env` 中设置：

```bash
PUBLIC_SITE_URL=https://your-domain.example
```

构建时会使用这个地址生成 canonical、Open Graph URL 与 hreflang。

## `1.3.x` 内容文件管理 CMS

当前 `/admin/` 已从 `news` 试点扩展为 Decap CMS 内容文件管理后台。内容同学可以通过后台修改受控 Markdown 文件，再走 GitHub Pull Request 审核流合并到主分支。

当前后台范围如下：

- `news`：可新增、编辑、删除双语新闻。
- `members`：可新增、编辑、删除成员文件。
- `papers`：可新增、编辑、删除论文文件。
- `join`：只编辑固定招生与合作页面，不允许新增/删除。
- `projects`：只编辑现有项目的 overview/background 四文件内容，不允许新增/删除项目。

约束如下：

- 仍使用 `GitHub backend + editorial_workflow`
- 参与编辑的人需要目标仓库的写权限
- CMS 配置通过环境变量驱动，不把仓库、分支和 OAuth 地址写死在模板里
- 不提供任意文件浏览器，避免破坏双语配对、路由和内容 schema

建议配置的环境变量如下：

```bash
CMS_GITHUB_REPO=nightt5879/DoubleDuckLab
CMS_BRANCH=main
CMS_OAUTH_BASE_URL=https://doubleducklab-cms-oauth.<account>.workers.dev
PUBLIC_SITE_URL=https://doubleducklab.pages.dev
```

`PUBLIC_SITE_URL` 继续作为站点域名来源，用于构建 canonical、Open Graph URL 和 hreflang。CMS 只有在 `CMS_GITHUB_REPO`、`CMS_OAUTH_BASE_URL` 和 `PUBLIC_SITE_URL` 都配置完成后才会启用；同时还需要在 Cloudflare Pages 和 OAuth 代理上对齐回调地址与仓库权限。`1.3.1` 起，仓库内提供 `ops/cms-oauth-worker/` 作为 Cloudflare Worker OAuth 代理部署包。

## 当前唯一真源

### 站点级文案
- `src/data/site.zh.json`
- `src/data/site.en.json`

### 内容集合
- 成员：`src/content/members/*.md`
- 项目：`src/content/projects/<slug>/`
- 论文：`src/content/papers/*.md`
- 新闻：`src/content/news/<slug>.zh.md`、`src/content/news/<slug>.en.md`
- 招生与合作：`src/content/join/recruitment/`

> `src/data/content/*` 已废弃，不再使用。

## 内容结构

### 成员

每位成员一个文件：

```text
src/content/members/<id>.md
```

最小模板：

```md
---
id: "zhang-wei"
name:
  zh: "张伟"
  en: "Wei Zhang"
role:
  zh: "博士生"
  en: "PhD"
area:
  zh: "多模态智能体"
  en: "Multimodal Agents"
---
```

### 项目

每个项目一个目录：

```text
src/content/projects/<slug>/
  overview_cn.md
  overview_en.md
  background_cn.md
  background_en.md
```

`overview_cn.md` 示例：

```md
---
title: "猎户座项目"
tag: "Embodied AI"
time: "2026"
status: "进行中"
---
这里写项目概览。
```

### 新闻

每条新闻两份 Markdown 文件（中英各一份）：

```text
src/content/news/<slug>.zh.md
src/content/news/<slug>.en.md
```

新闻正文文件最少包含：

```md
---
slug: "my-news"
date: "2026-03-25"
title:
  zh: "中文标题"
  en: "English Title"
---

这里写新闻正文。
```

### 论文

```text
src/content/papers/<slug>.md
```

最小模板：

```md
---
year: 2026
title: "Paper Title"
venue: "Conference Name"
---
```

## 验证链路

- `npm run verify`
  - 推荐的一键验收入口，依次执行 `validate:content`、`build`、`test:smoke`、`test:seo`
  - 统一本地、Windows 和 CI 的稳定性检查流程
- `npm run validate:content`
  - 校验站点文案、成员、项目、论文、新闻、招生与合作的文件结构
- `npm run build`
  - 生成静态站点，并默认清理旧 `dist/` 与关闭 Astro telemetry
- `npm run test:smoke`
  - 检查 `/`、`/en/`、`/members`、`/projects`、`/papers`、`/news` 的构建结果
- `npm run test:seo`
  - 检查 canonical、Open Graph、hreflang、404 noindex 与当前页语言互跳
- `verify.bat`
  - Windows 下的一键验收入口，与 `npm run verify` 保持一致

## 文档入口

- 内容地图：[content-map.md](./content-map.md)
- 内容编辑指南：[docs/content-edit-guide.md](./docs/content-edit-guide.md)
- 内容维护清单：[docs/content-ops-checklist.md](./docs/content-ops-checklist.md)
- 发布验收清单：[docs/release-baseline-checklist.md](./docs/release-baseline-checklist.md)
- 路线图：[docs/roadmap.md](./docs/roadmap.md)

## Roadmap

- `1.0.1`：基线修复，修乱码、收真源、补 CI / smoke
- `1.1.0`：生产域名、SEO 元信息、当前页中英互跳与构建后 SEO 校验
- `1.1.1`：review follow-up，修 alternate 可用性、内部链接 URL 一致性与 `test:seo` 站点地址读取，已完成
- `1.1.2`：稳定性硬化，统一 `verify` 入口、干净构建与发布验收流程
- `1.2.0`：`news` CMS 试点，Decap + GitHub PR 审核流已落地，保持模板化配置
- `1.2.1`：CMS 试点收口 / ops hardening，补 locale/news 校验与启用前置条件硬化
- `1.3.0`：CMS 文件管理后台，扩展到新闻、成员、论文、招生与现有项目文件
- `1.3.1`：CMS 线上启用跟进，补 Cloudflare Worker OAuth 代理部署包与生产环境变量验收说明
- `1.3.2`：CMS 稳定性补丁，补齐旧新闻 `slug`、清理后台测试残留，并收紧新闻 slug 校验
- `1.3.3`：构建日志清理，构建前清理 Astro 内容缓存，消除重复 news id warning

## License

MIT
