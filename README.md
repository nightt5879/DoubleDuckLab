<p align="center">
  <img src="./sources/DDLab_logo.png" width="350">
</p>

# 🦆🦆 DoubleDuckLab (DDLab)
<p align="right">
  中文 | <a href="./README_EN.md">English</a>
</p>

- [🦆🦆 DoubleDuckLab (DDLab)](#-doubleducklab-ddlab)
  - [项目特点](#项目特点)
  - [在线访问](#在线访问)
  - [项目预览](#项目预览)
  - [快速开始](#快速开始)
  - [内容编辑](#内容编辑)
    - [修改站点品牌与网站名称](#修改站点品牌与网站名称)
    - [首页文案配置（中英文）](#首页文案配置中英文)
    - [招生与合作（Join）内容配置（双语 Markdown）](#招生与合作join内容配置双语-markdown)
    - [Members 内容配置（含头像）](#members-内容配置含头像)
      - [1) 最小模板（必填字段）](#1-最小模板必填字段)
      - [2) 完整模板（含可选字段）](#2-完整模板含可选字段)
      - [3) 头像自动匹配规则](#3-头像自动匹配规则)
      - [4) 成员排序规则（默认）](#4-成员排序规则默认)
    - [项目（project）内容配置（双语 Markdown）](#项目project内容配置双语-markdown)
      - [项目图片建议（prj）](#项目图片建议prj)
      - [新增一个项目（最短步骤）](#新增一个项目最短步骤)
    - [Papers 内容配置](#papers-内容配置)
    - [News 内容配置（双语 Markdown）](#news-内容配置双语-markdown)
      - [1) 新建新闻目录（决定详情页 URL）](#1-新建新闻目录决定详情页-url)
      - [2) 在目录内放中英文两个文件（必须成对）](#2-在目录内放中英文两个文件必须成对)
      - [3) 写正文（支持完整 Markdown）](#3-写正文支持完整-markdown)
      - [4) 图片资源放 public/news 并在正文引用](#4-图片资源放-publicnews-并在正文引用)
      - [news模块常见问题](#news模块常见问题)
  - [部署](#部署)
  - [🗺 Roadmap](#-roadmap)
  - [贡献](#贡献)
  - [开源协议](#开源协议)
  - [关于项目名称](#关于项目名称)

一个基于 **Astro** 构建的现代化课题组官网模板，
为**科研团队**设计。


##  项目特点

*  基于 **Astro** 构建，静态生成，速度极快
*  **JSON / Markdown 内容驱动**，无需后端
*  专为 **科研团队官网** 场景设计
*  **响应式布局**
*  **深色 / 浅色模式**
*  可直接部署到 **Cloudflare Pages / Vercel**

##  在线访问
👉 https://doubleducklab.com

##  项目预览

<p align="center">
  <a href="https://doubleducklab.com" target="_blank">
    <img src="./sources/preview_light.png" alt="Preview (Light)" width="48%"/>
  </a>
  <a href="https://doubleducklab.com" target="_blank">
    <img src="./sources/preview_dark.png" alt="Preview (Dark)" width="48%"/>
  </a>
</p>

<p align="center">
  <sub>左：Light / 右：Dark（点击图片可直接访问 doubleducklab.com）</sub>
</p>

---

##  快速开始

克隆项目：

```bash
git clone https://github.com/nightt5879/doubleducklab.git
cd doubleducklab
```

安装依赖：

```bash
npm install
```

构建项目：
```bash
npm run build
```

本地预览：
```bash
npm run preview
```

访问：

```
http://localhost:4321
```

---

##  内容编辑

网站主要内容存储在：

```
src/content/
```

例如：

```
members/*.md
papers/*.md
news/*/*_cn.md
news/*/*_en.md
project/
join/*/overview_cn.md
join/*/overview_en/md
```

修改这些文件即可更新网站内容。接下来将从主页开始讲解能修改的内容：
###  修改站点品牌与网站名称

- `brand`：用于左上角品牌（Header）
- `siteName`：用于首页 Hero 标题和浏览器标签页标题（`<title>`）

请编辑文件：

```json
src/data/site.zh.json
与
src/data/site.en.json
```

示例：

```json
{
  "brand": "DOUBLEDUCK·LAB",
  "siteName": "DoubleDuckLab"
}
```

修改后效果：

- Header 左上角显示 `brand`
- 首页主标题显示 `siteName`
- 页面标题显示为 `页面名 · siteName`（例如：`新闻 · DoubleDuckLab`）

执行验证：

```bash
npm run build
npm run preview
```
###  首页文案配置（中英文）

首页 Hero、Highlights、Featured Projects 标题都来自：

- `src/data/site.zh.json`（中文）
- `src/data/site.en.json`（英文）

重点字段（两份文件都建议保持同结构）：

```json
{
  "siteName": "DoubleDuckLab",
  "home": {
    "intro": "首页 Hero 副标题文案",
    "sections": {
      "highlights": "Highlights/重点信息 标题",
      "featuredProjects": "Featured Projects/精选项目 标题"
    },
    "highlights": [
      { "title": "研究方向", "desc": "研究方向描述" },
      { "title": "近期成果", "desc": "近期成果描述" },
      { "title": "招生与合作", "desc": "招生方向、合作方式、联系方式描述" }
    ]
  }
}
```


### 招生与合作（Join）内容配置（双语 Markdown）

`/join` 与 `/en/join` 采用 Markdown 内容驱动，路径如下：

```text
src/content/join/recruitment/
  overview_cn.md
  overview_en.md
```

说明：

- 中文页读取 `overview_cn.md`
- 英文页读取 `overview_en.md`
- `frontmatter.title` 可选，用于页面主标题
- 正文支持完整 Markdown（列表、图片、代码块等）

### Members 内容配置（含头像）

成员内容使用 Astro Content Collections，文件位置：

```text
src/content/members/*.md
```

头像资源目录：

```text
public/member/images/
```

默认头像（未匹配到成员头像时使用）：

```text
public/images/avatar-default.png
```

#### 1) 最小模板（必填字段）

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
```

#### 2) 完整模板（含可选字段）

```md
---
id: "li-ming"
name:
  zh: "李明"
  en: "Ming Li"
role:
  zh: "硕士生"
  en: "Master"
status:
  zh: "在读"
  en: "Current"
area:
  zh: "机器人规划"
  en: "Robot Planning"
bio:
  zh: "研究方向聚焦于机器人规划与控制。"
  en: "Focused on robot planning and control."
avatar: "/member/images/custom-li-ming.png"
links:
  scholar: "https://scholar.google.com/"
  github: "https://github.com/yourname"
  homepage: "https://example.com"
  email: "liming@xxx.com"
```

字段说明：

- 必填：`id`、`name.zh/en`、`role.zh/en`、`area.zh/en`
- 可选：`status`、`bio`、`avatar`、`links`
- `links` 子字段可选：`scholar`、`github`、`homepage`、`email`

显示规则（不填即不显示）：

- 不写 `bio`：详情页不显示简介区块
- `links` 四项都不写：详情页不显示 Links 区块
- `links.email` 写了：详情页显示完整邮箱文本，可点击复制。
- 不写 `status`：列表卡片右上角不显示状态角标（PI 默认也不显示）

#### 3) 头像自动匹配规则

系统会自动按 **name** 去找同名头像：

```text
public/member/images/<name>.png
public/member/images/<name>.jpg
public/member/images/<name>.svg
```

示例：

- `name.zh: "张教授"` -> `public/member/images/张教授.png`
- `name.en: "Prof. Zhang"` -> `public/member/images/Prof. Zhang.jpg`

支持中文文件名。

#### 4) 成员排序规则（默认）

列表页默认按以下顺序展示：

1. PI（负责人）
2. 在组成员：PhD -> Master -> RA
3. 离组成员：PhD -> Master -> RA

状态角标颜色：

- 蓝色：`在读 / 在职`（`Current / Active`）
- 绿色：`已毕业 / 已离开`（`Alumni / Former`）

### 项目（project）内容配置（双语 Markdown）

项目模块采用“每个项目一个目录 + 中英文各两篇 Markdown（概览/背景）”的结构。

目录结构：

```text
src/content/projects/<slug>/
  overview_cn.md
  overview_en.md
  background_cn.md
  background_en.md
```

说明：

- `<slug>` 会作为项目详情页路径：`/projects/<slug>/` 与 `/en/projects/<slug>/`
- `overview_*` 用于“项目概览”区块
- `background_*` 用于“背景与目标”区块
- 正文是标准 Markdown，支持图片、列表、代码块等

`overview` 文件支持可选 frontmatter（建议写）：

```md
title: "Project Orion"
tag: "Embodied AI"
status: "进行中"
links:
  repo: "https://github.com/xxx"
  demo: "https://example.com/demo"
  paper: "https://example.com/paper"
```

显示逻辑：

- 详情页固定保留：项目概览、背景与目标
- `links` 三项（`repo/demo/paper`）全部可选
- 三项都不写：`Links` 区块不显示
- 只写某几项：只显示对应按钮
- 列表卡片只显示上方 badge 状态，不再重复显示“项目状态：xxx”文案

#### 项目图片建议（prj）

将项目图片放到：

```text
public/prj/
```

在项目 markdown 里引用：

```md
![项目配图](/prj/prj_template.png)
```
或者也可以单独一个项目创建一个文件夹方便管理

#### 新增一个项目（最短步骤）

1. 新建目录：`src/content/projects/my-new-project/`
2. 放四个文件：`overview_cn.md`、`overview_en.md`、`background_cn.md`、`background_en.md`
3. 在 `overview_cn.md / overview_en.md` 顶部填 `title/tag/status/links(可选)`
4. 正文写 Markdown，图片放 `public/prj` 后用 `/prj/xxx.png` 引用
5. 运行 `npm run build` 与 `npm run preview` 验证

---

### Papers 内容配置

论文内容使用 Astro Content Collections，文件位置：

```text
src/content/papers/*.md
```

每篇 paper 的 frontmatter 最小模板（仅必填）：

```md
year: 2025
title: "Embodied Skill Transfer with Sparse Demo"
venue: "ICRA"
```

完整模板（可选字段全部展示）：

```md
---
year: 2025
title: "Embodied Skill Transfer with Sparse Demo"
venue: "ICRA"
abstract: |
  We study skill transfer with sparse demonstrations and propose a lightweight pipeline
  that improves generalization across tasks.
links:
  online: "https://example.com/paper"
  pdf: "/papers/embodied-skill-transfer.pdf"
  project: "https://doubleducklab.com/projects/embodied-skill-transfer"
  code: "https://github.com/nightt5879/DoubleDuckLab"
bibtex: |
  @inproceedings{demo2025,
    title={Embodied Skill Transfer with Sparse Demo},
    author={First Author and Second Author},
    booktitle={ICRA},
    year={2025}
  }
---
```

字段说明：

- 必填：`year`、`title`、`venue`
- 可选：`abstract`、`links`、`bibtex`
- `links` 子字段全部可选：`online`、`pdf`、`project`、`code`

详情页显示规则：

- 不写 `abstract`：不显示 Abstract/摘要 区块
- `links` 四项都不写：不显示 Links 区块
- `links` 只写某一项：仅显示对应按钮
- 不写 `bibtex`：不显示 Citation (BibTeX) 区块

`links.pdf` 支持两种写法：

- 外链：`https://...`
- 站内静态路径：`/papers/xxx.pdf`

如果使用站内路径，请把 PDF 文件放到：

```text
public/papers/xxx.pdf
```

---



### News 内容配置（双语 Markdown）

新闻模块采用“每条新闻一个目录 + 中英文各一篇 Markdown”的逻辑。  
你只要按下面 4 步操作，就会自动出现在新闻列表和详情页。

#### 1) 新建新闻目录（决定详情页 URL）

```text
src/content/news/<slug>/
```

`<slug>` 会直接作为详情页路径：

- 中文：`/news/<slug>/`
- 英文：`/en/news/<slug>/`

示例：

```text
src/content/news/2026-02-20/
```

#### 2) 在目录内放中英文两个文件（必须成对）

```text
src/content/news/<slug>/
  实验室春季招新启动_cn.md
  Spring_recruitment_started_en.md
```

命名规则：

- 中文文件必须以 `_cn.md` 结尾
- 英文文件必须以 `_en.md` 结尾
- 文件名前半部分会作为该语言标题（`_` 会自动转空格）

也就是说，上面示例最终标题会是：

- 中文标题：`实验室春季招新启动`
- 英文标题：`Spring recruitment started`

#### 3) 写正文（支持完整 Markdown）

正文可以直接使用 Markdown 语法：

- 段落、标题、列表
- 图片、链接
- 代码块、引用等

可选 frontmatter（推荐保留 `date`）：

```md
date: "2026-02-20"
```

说明：

- `date` 可选；不写时会尝试从目录名推断（如 `2026-02-20`）
- 中英文正文互相独立，可分别编辑

#### 4) 图片资源放 public/news 并在正文引用

建议目录：

```text
public/news/
```

在 Markdown 里这样写：

```md
![配图说明](/news/news_template.png)
```
与project一样，是可以分具体的小文件，方便进行管理

#### news模块常见问题

- 只放了 `_cn.md` 或只放了 `_en.md`：该新闻不完整。
- 文件名后缀写成 `_zh.md`：不会被识别，必须是 `_cn.md`。
- 图片不显示：确认路径是 `/news/xxx.png`，并且文件真实位于 `public/news/xxx.png`。


## 部署

推荐使用 **Cloudflare Pages**。

构建命令：

```
npm run build
```

输出目录：

```
dist
```
上面两行指令就完成了网站的静态编译，接下来会从0开始完成使用cloudflare pages进行配置，具体[请点这里](docs/cloudflare_pages_use.md)
## 🗺 Roadmap

计划中的功能：

* [ ] 可视化编辑主页元素
* [ ] 自动通过Google scholar抓取论文
* [ ] 更加0代码基础的可视化编辑后台（优先本地）

---

## 贡献

欢迎提交 Issue 或 Pull Request。

## 开源协议

MIT License

## 关于项目名称

**DoubleDuckLab** 来源于中山大学的一个网络昵称 “双鸭山大学”。

项目旨在为科研团队提供一个简单、现代、易维护的官网模板。
