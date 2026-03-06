<p align="center">
  <img src="./sources/DDLab_logo.png" width="350">
</p>

# 🦆🦆 DoubleDuckLab (DDLab)
<p align="right">
  <a href="./README.md">中文</a> | English
</p>

- [🦆🦆 DoubleDuckLab (DDLab)](#-doubleducklab-ddlab)
  - [Features](#features)
  - [Live Demo](#live-demo)
  - [Preview](#preview)
  - [Quick Start](#quick-start)
  - [Content Editing](#content-editing)
    - [Site Branding \& Name](#site-branding--name)
    - [Homepage Copy (Bilingual)](#homepage-copy-bilingual)
    - [Join / Recruitment Content (Bilingual Markdown)](#join--recruitment-content-bilingual-markdown)
    - [Members Configuration (with Avatars)](#members-configuration-with-avatars)
      - [1) Minimal Template (Required Fields)](#1-minimal-template-required-fields)
      - [2) Full Template (with Optional Fields)](#2-full-template-with-optional-fields)
      - [3) Avatar Auto-matching Rules](#3-avatar-auto-matching-rules)
      - [4) Default Member Sort Order](#4-default-member-sort-order)
    - [Projects Configuration (Bilingual Markdown)](#projects-configuration-bilingual-markdown)
      - [Project Image Recommendations](#project-image-recommendations)
      - [Adding a New Project (Minimal Steps)](#adding-a-new-project-minimal-steps)
    - [Papers Configuration](#papers-configuration)
    - [News Configuration (Bilingual Markdown)](#news-configuration-bilingual-markdown)
      - [1) Create a News Directory (Determines Detail Page URL)](#1-create-a-news-directory-determines-detail-page-url)
      - [2) Place Both Language Files Inside (Must Come in Pairs)](#2-place-both-language-files-inside-must-come-in-pairs)
      - [3) Write Body Content (Full Markdown Supported)](#3-write-body-content-full-markdown-supported)
      - [4) Place Images in public/news and Reference Them](#4-place-images-in-publicnews-and-reference-them)
      - [Common Issues with the News Module](#common-issues-with-the-news-module)
  - [Deployment](#deployment)
  - [🗺 Roadmap](#-roadmap)
  - [Contributing](#contributing)
  - [License](#license)
  - [About the Name](#about-the-name)

A modern academic lab website template built with **Astro**, designed for **research groups**.

## Features

* Built with **Astro** — statically generated, extremely fast
* **JSON / Markdown content-driven** — no backend required
* Designed specifically for **academic research group websites**
* **Responsive layout**
* **Dark / Light mode**
* Deploy directly to **Cloudflare Pages / Vercel**

## Live Demo
👉 https://doubleducklab.com

## Preview

<p align="center">
  <a href="https://doubleducklab.com" target="_blank">
    <img src="./sources/preview_light.png" alt="Preview (Light)" width="48%"/>
  </a>
  <a href="https://doubleducklab.com" target="_blank">
    <img src="./sources/preview_dark.png" alt="Preview (Dark)" width="48%"/>
  </a>
</p>

<p align="center">
  <sub>Left: Light / Right: Dark (click images to visit doubleducklab.com)</sub>
</p>

---

## Quick Start

Clone the repo:

```bash
git clone https://github.com/nightt5879/doubleducklab.git
cd doubleducklab
```

Install dependencies:

```bash
npm install
```

Build the project:

```bash
npm run build
```

Preview locally:

```bash
npm run preview
```

Visit:

```
http://localhost:4321
```

---

## Content Editing

All main website content lives under:

```
src/content/
```

For example:

```
members/*.md
papers/*.md
news/*/*_cn.md
news/*/*_en.md
project/
join/*/overview_cn.md
join/*/overview_en.md
```

Editing these files updates the website content. The sections below walk through each content area.

### Site Branding & Name

- `brand`: Used in the top-left header
- `siteName`: Used in the homepage Hero title and browser tab title (`<title>`)

Edit the following files:

```
src/data/site.zh.json
src/data/site.en.json
```

Example:

```json
{
  "brand": "DOUBLEDUCK·LAB",
  "siteName": "DoubleDuckLab"
}
```

Effect after editing:

- `brand` appears in the top-left header
- `siteName` appears as the homepage main title
- Page titles appear as `Page Name · siteName` (e.g., `News · DoubleDuckLab`)

Verify with:

```bash
npm run build
npm run preview
```

### Homepage Copy (Bilingual)

The Hero, Highlights, and Featured Projects section titles on the homepage come from:

- `src/data/site.zh.json` (Chinese)
- `src/data/site.en.json` (English)

Key fields (both files should maintain the same structure):

```json
{
  "siteName": "DoubleDuckLab",
  "home": {
    "intro": "Homepage Hero subtitle text",
    "sections": {
      "highlights": "Highlights section title",
      "featuredProjects": "Featured Projects section title"
    },
    "highlights": [
      { "title": "Research Areas", "desc": "Description of research directions" },
      { "title": "Recent Work", "desc": "Description of recent achievements" },
      { "title": "Join & Collaborate", "desc": "Openings, collaboration, and contact info" }
    ]
  }
}
```

### Join / Recruitment Content (Bilingual Markdown)

The `/join` and `/en/join` pages are Markdown-driven, located at:

```text
src/content/join/recruitment/
  overview_cn.md
  overview_en.md
```

Notes:

- The Chinese page reads `overview_cn.md`
- The English page reads `overview_en.md`
- `frontmatter.title` is optional; used as the page main heading
- Body supports full Markdown (lists, images, code blocks, etc.)

### Members Configuration (with Avatars)

Member content uses Astro Content Collections, located at:

```text
src/content/members/*.md
```

Avatar assets directory:

```text
public/member/images/
```

Default avatar (used when no matching avatar is found):

```text
public/images/avatar-default.png
```

#### 1) Minimal Template (Required Fields)

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

#### 2) Full Template (with Optional Fields)

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
---
```

Field notes:

- Required: `id`, `name.zh/en`, `role.zh/en`, `area.zh/en`
- Optional: `status`, `bio`, `avatar`, `links`
- `links` sub-fields are all optional: `scholar`, `github`, `homepage`, `email`

Display rules (omitted fields are simply not shown):

- No `bio`: the bio block is hidden on the detail page
- All four `links` omitted: the Links block is hidden on the detail page
- `links.email` provided: the detail page shows the full email with a click-to-copy option
- No `status`: no status badge appears on the member card (PI entries also have no badge by default)

#### 3) Avatar Auto-matching Rules

The system automatically looks for an avatar matching the member's **name**:

```text
public/member/images/<name>.png
public/member/images/<name>.jpg
public/member/images/<name>.svg
```

Examples:

- `name.zh: "张教授"` → `public/member/images/张教授.png`
- `name.en: "Prof. Zhang"` → `public/member/images/Prof. Zhang.jpg`

Chinese filenames are supported.

#### 4) Default Member Sort Order

The member list page displays members in the following order by default:

1. PI (Principal Investigator)
2. Current members: PhD → Master → RA
3. Alumni: PhD → Master → RA

Status badge colors:

- Blue: `Current / Active`
- Green: `Alumni / Former`

### Projects Configuration (Bilingual Markdown)

Each project uses its own directory containing two Markdown files per language (overview + background).

Directory structure:

```text
src/content/projects/<slug>/
  overview_cn.md
  overview_en.md
  background_cn.md
  background_en.md
```

Notes:

- `<slug>` becomes the project detail page path: `/projects/<slug>/` and `/en/projects/<slug>/`
- `overview_*` populates the "Project Overview" section
- `background_*` populates the "Background & Goals" section
- Body content is standard Markdown; images, lists, and code blocks are all supported

`overview` files support optional frontmatter (recommended):

```md
title: "Project Orion"
tag: "Embodied AI"
status: "In Progress"
links:
  repo: "https://github.com/xxx"
  demo: "https://example.com/demo"
  paper: "https://example.com/paper"
```

Display logic:

- The detail page always shows: Project Overview and Background & Goals
- All three `links` fields (`repo/demo/paper`) are optional
- If none are provided, the Links block is hidden
- Only the specified buttons are shown

#### Project Image Recommendations

Place project images in:

```text
public/prj/
```

Reference them in project Markdown:

```md
![Project illustration](/prj/prj_template.png)
```

You can also create a subdirectory per project for easier management.

#### Adding a New Project (Minimal Steps)

1. Create the directory: `src/content/projects/my-new-project/`
2. Add four files: `overview_cn.md`, `overview_en.md`, `background_cn.md`, `background_en.md`
3. Fill in `title/tag/status/links` (optional) at the top of `overview_cn.md` / `overview_en.md`
4. Write body content in Markdown; place images in `public/prj/` and reference with `/prj/xxx.png`
5. Run `npm run build` and `npm run preview` to verify

---

### Papers Configuration

Paper content uses Astro Content Collections, located at:

```text
src/content/papers/*.md
```

Minimal frontmatter template (required fields only):

```md
year: 2025
title: "Embodied Skill Transfer with Sparse Demo"
venue: "ICRA"
```

Full template (all optional fields shown):

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

Field notes:

- Required: `year`, `title`, `venue`
- Optional: `abstract`, `links`, `bibtex`
- All `links` sub-fields are optional: `online`, `pdf`, `project`, `code`

Detail page display rules:

- No `abstract`: the Abstract block is hidden
- All four `links` omitted: the Links block is hidden
- Only the specified link buttons are shown
- No `bibtex`: the Citation (BibTeX) block is hidden

`links.pdf` accepts two formats:

- External URL: `https://...`
- Local static path: `/papers/xxx.pdf`

If using a local path, place the PDF at:

```text
public/papers/xxx.pdf
```

---

### News Configuration (Bilingual Markdown)

Each news item uses its own directory containing one Markdown file per language. Follow the four steps below and the item will automatically appear in the news list and its detail page.

#### 1) Create a News Directory (Determines Detail Page URL)

```text
src/content/news/<slug>/
```

`<slug>` becomes the detail page path directly:

- Chinese: `/news/<slug>/`
- English: `/en/news/<slug>/`

Example:

```text
src/content/news/2026-02-20/
```

#### 2) Place Both Language Files Inside (Must Come in Pairs)

```text
src/content/news/<slug>/
  Lab_spring_recruitment_started_cn.md
  Spring_recruitment_started_en.md
```

Naming rules:

- The Chinese file must end with `_cn.md`
- The English file must end with `_en.md`
- The part of the filename before the suffix becomes the page title for that language (`_` is automatically converted to spaces)

So the example above produces:

- Chinese title: `Lab spring recruitment started`
- English title: `Spring recruitment started`

#### 3) Write Body Content (Full Markdown Supported)

The body supports standard Markdown:

- Paragraphs, headings, lists
- Images, links
- Code blocks, blockquotes, etc.

Optional frontmatter (recommended to include `date`):

```md
date: "2026-02-20"
```

Notes:

- `date` is optional; if omitted, the system will try to infer it from the directory name (e.g., `2026-02-20`)
- Chinese and English body content are independent and can be edited separately

#### 4) Place Images in public/news and Reference Them

Recommended directory:

```text
public/news/
```

Reference in Markdown:

```md
![Caption](/news/news_template.png)
```

Just like projects, you can create per-item subdirectories for easier management.

#### Common Issues with the News Module

- Only `_cn.md` or only `_en.md` is present: the news item is considered incomplete and will not be shown.
- File suffix written as `_zh.md`: not recognized — it must be `_cn.md`.
- Images not displaying: confirm the path is `/news/xxx.png` and the file actually exists at `public/news/xxx.png`.

---

## Deployment

**Cloudflare Pages** is recommended.

Build command:

```
npm run build
```

Output directory:

```
dist
```

The step complete the static build. For a step-by-step guide to setting up Cloudflare Pages from scratch, [click here](docs/cloudflare_pages_use.md).

## 🗺 Roadmap

Planned features:

* [ ] Visual editor for homepage elements
* [ ] Auto-fetch papers from Google Scholar
* [ ] More no-code visual admin panel (local-first)

---

## Contributing

Issues and Pull Requests are welcome.

## License

MIT License

## About the Name

**DoubleDuckLab** is inspired by an internet nickname for Sun Yat-sen University — "双鸭山大学" (Double Duck Mountain University).

This project aims to provide research teams with a simple, modern, and easy-to-maintain website template.