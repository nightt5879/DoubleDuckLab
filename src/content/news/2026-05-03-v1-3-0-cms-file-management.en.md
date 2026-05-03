---
slug: "v1-3-0-cms-file-management"
date: "2026-05-03"
title:
  zh: "DoubleDuckLab 官网 v1.3.0 发布：内容文件管理后台上线"
  en: "DoubleDuckLab Website v1.3.0 Released: Content File Management CMS"
---

DoubleDuckLab website v1.3.0 has been released. This update expands `/admin/` from a news-only pilot into a content file management CMS, so future website updates can be submitted through visual CMS forms instead of editing source files directly.

v1.3.0 keeps the existing Astro static site, Decap CMS, and GitHub Pull Request workflow. It does not introduce a database, custom login system, Docker backend, or server-side API. CMS changes continue to flow through GitHub review and Cloudflare Pages deployment.

This release adds and updates the following content management scope:

- News: create, edit, and delete bilingual news entries.
- Members: create, edit, and delete member content files.
- Papers: create, edit, and delete paper content files.
- Join: edit fixed Chinese and English recruitment pages, without creating or deleting pages.
- Projects: edit existing project content files, without creating or deleting projects.

The GitHub Release is available here: [v1.3.0 CMS File Management](https://github.com/nightt5879/DoubleDuckLab/releases/tag/v1.3.0).

The next phase will focus on validating the live CMS workflow and deciding whether to further expand content management for members, papers, projects, and recruitment content.
