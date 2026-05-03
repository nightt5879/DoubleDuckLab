<p align="center">
  <img src="./sources/DDLab_logo.png" width="350" alt="DoubleDuckLab logo">
</p>

# DoubleDuckLab (DDLab)

<p align="right">
  <a href="./README.md">中文</a> | English
</p>

A bilingual Astro template for academic lab websites, built around a local-first, file-driven, low-maintenance content workflow.

## Preview

- Live demo: [https://doubleducklab.com](https://doubleducklab.com)

<p align="center">
  <a href="https://doubleducklab.com" target="_blank">
    <img src="./sources/preview_light.png" alt="Preview light" width="48%"/>
  </a>
  <a href="https://doubleducklab.com" target="_blank">
    <img src="./sources/preview_dark.png" alt="Preview dark" width="48%"/>
  </a>
</p>

## Quick Start

```bash
git clone https://github.com/nightt5879/doubleducklab.git
cd doubleducklab
npm install
npm run verify
npm run preview
```

One-click verification on Windows:

```bat
verify.bat
```

Default URLs:

- `http://localhost:4321/`
- `http://localhost:4321/en/`

## Production Site URL

The build falls back to `https://doubleducklab.com` by default. Override it in a local `.env` file when needed:

```bash
PUBLIC_SITE_URL=https://your-domain.example
```

This value is used to generate canonical links, Open Graph URLs, and hreflang alternates.

## `1.3.x` Content File Management CMS

The `/admin/` route now expands the original `news` pilot into a Decap CMS content file management surface. Editors can update controlled Markdown files in the CMS, then publish changes through GitHub pull requests for review and merge.

Current CMS scope:

- `news`: create, edit, and delete bilingual news entries.
- `members`: create, edit, and delete member files.
- `papers`: create, edit, and delete paper files.
- `join`: edit fixed recruitment and collaboration pages only; no create/delete.
- `projects`: edit existing project overview/background files only; no project create/delete in this version.

Constraints:

- GitHub backend plus `editorial_workflow`
- editors must have write access to the target repository
- CMS config should be environment-driven, not hard-coded to one repo, branch, or OAuth endpoint
- no arbitrary file browser, to protect bilingual pairing, routes, and content schemas

Recommended environment variables:

```bash
CMS_GITHUB_REPO=nightt5879/DoubleDuckLab
CMS_BRANCH=main
CMS_OAUTH_BASE_URL=https://doubleducklab-cms-oauth.<account>.workers.dev
PUBLIC_SITE_URL=https://doubleducklab.pages.dev
```

`PUBLIC_SITE_URL` remains the source of truth for site URLs such as canonical links, Open Graph URLs, and hreflang alternates. The CMS only enables when `CMS_GITHUB_REPO`, `CMS_OAUTH_BASE_URL`, and `PUBLIC_SITE_URL` are all set; enabling it still requires matching Cloudflare Pages and OAuth callback settings. Starting in `1.3.1`, `ops/cms-oauth-worker/` provides the Cloudflare Worker OAuth proxy deployment package.

## Single Sources of Truth

### Site-level copy
- `src/data/site.zh.json`
- `src/data/site.en.json`

### Content collections
- Members: `src/content/members/*.md`
- Projects: `src/content/projects/<slug>/`
- Papers: `src/content/papers/*.md`
- News: `src/content/news/<slug>.zh.md` and `src/content/news/<slug>.en.md`
- Join / recruitment: `src/content/join/recruitment/`

> `src/data/content/*` is deprecated and no longer used.

## Content Structure

### Members

One Markdown file per member:

```text
src/content/members/<id>.md
```

Minimal template:

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

### Projects

One directory per project:

```text
src/content/projects/<slug>/
  overview_cn.md
  overview_en.md
  background_cn.md
  background_en.md
```

Example `overview_en.md`:

```md
---
title: "Project Orion"
tag: "Embodied AI"
time: "2026"
status: "Ongoing"
---
Write the overview here.
```

### News

Each news item is stored as two Markdown files, one per locale:

```text
src/content/news/<slug>.zh.md
src/content/news/<slug>.en.md
```

Minimal body file:

```md
---
slug: "my-news"
date: "2026-03-25"
title:
  zh: "中文标题"
  en: "English Title"
---

Write the article body here.
```

### Papers

```text
src/content/papers/<slug>.md
```

Minimal template:

```md
---
year: 2026
title: "Paper Title"
venue: "Conference Name"
---
```

## Validation Pipeline

- `npm run verify`
  - Recommended one-click verification entrypoint
  - Runs `validate:content`, `build`, `test:smoke`, and `test:seo` in order
  - Keeps local, Windows, and CI verification aligned
- `npm run validate:content`
  - Validates site copy and all content collections
- `npm run build`
  - Produces the static site with a clean `dist/` and telemetry disabled by default
- `npm run test:smoke`
  - Checks the built `/`, `/en/`, `/members`, `/projects`, `/papers`, and `/news` routes
- `npm run test:seo`
  - Checks canonical tags, Open Graph metadata, hreflang alternates, 404 noindex, and current-page locale switching
- `verify.bat`
  - Windows one-click verification entrypoint kept in sync with `npm run verify`

## Docs

- Content map: [content-map.md](./content-map.md)
- Content edit guide: [docs/content-edit-guide.md](./docs/content-edit-guide.md)
- Content ops checklist: [docs/content-ops-checklist.md](./docs/content-ops-checklist.md)
- Release baseline checklist: [docs/release-baseline-checklist.md](./docs/release-baseline-checklist.md)
- Roadmap: [docs/roadmap.md](./docs/roadmap.md)

## Roadmap

- `1.0.1`: baseline hardening, encoding fix, source-of-truth cleanup, CI and smoke coverage
- `1.1.0`: production site URL, SEO metadata, current-page locale switching, and post-build SEO checks
- `1.1.1`: review follow-up for alternate availability, internal URL consistency, and `test:seo` site URL loading, completed
- `1.1.2`: stability hardening, unified verification entrypoint, and clean-build guardrails
- `1.2.0`: `news` CMS pilot implemented with a GitHub PR review flow and template-safe configuration
- `1.2.1`: CMS pilot closure / ops hardening, plus locale/news validation and CMS enablement hardening
- `1.3.0`: CMS file management for news, members, papers, recruitment pages, and existing project files
- `1.3.1`: CMS live enablement follow-up with a Cloudflare Worker OAuth proxy package and production environment validation notes
- `1.3.2`: CMS stability patch that adds stable legacy news slugs, removes CMS test residue, and tightens news slug validation
- `1.3.3`: build-log cleanup that clears Astro content cache before builds to remove duplicate news id warnings

## License

MIT
