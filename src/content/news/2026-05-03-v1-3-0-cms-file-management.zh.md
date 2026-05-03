---
date: "2026-05-03"
title:
  zh: "DoubleDuckLab 官网 v1.3.0 发布：内容文件管理后台上线"
  en: "DoubleDuckLab Website v1.3.0 Released: Content File Management CMS"
---

DoubleDuckLab 官网已发布 v1.3.0。本次更新将 `/admin/` 从新闻管理试点扩展为内容文件管理后台，让后续维护网站内容时可以通过可视化 CMS 表单提交修改，而不必直接编辑代码文件。

v1.3.0 继续保持 Astro 静态站、Decap CMS 和 GitHub Pull Request 工作流，不引入数据库、自研登录系统、Docker 后端或服务端 API。后台提交的内容改动仍会进入 GitHub 审核和 Cloudflare Pages 部署流程。

本次版本新增和调整的范围包括：

- 新闻：支持新增、编辑和删除双语新闻。
- 成员：支持新增、编辑和删除成员内容文件。
- 论文：支持新增、编辑和删除论文内容文件。
- 招生：支持编辑固定的中英文招生页面，暂不支持新增或删除页面。
- 项目：支持编辑现有项目内容文件，暂不支持新增或删除项目。

GitHub Release 已同步发布：[v1.3.0 CMS File Management](https://github.com/nightt5879/DoubleDuckLab/releases/tag/v1.3.0)。

下一阶段会优先完成线上 CMS 闭环验收，并根据实际维护需求决定是否继续扩展成员、论文、项目和招生内容的管理能力。
