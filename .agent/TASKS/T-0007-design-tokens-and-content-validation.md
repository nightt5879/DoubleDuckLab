# T-0007: Design Tokens + Content Validation + Edit Guide

## Goal
建立基础设计 token 层，并提供内容 JSON 校验脚本与非技术编辑指南。

## Scope
- In-scope:
  - 提取全站样式变量到独立 token 文件
  - 新增 JSON 内容校验脚本（CI/本地可运行）
  - 提供内容编辑指南（非代码维护者）
- Out-of-scope:
  - 引入 CMS 后台
  - 深度视觉重构

## Acceptance Criteria
- [x] token 文件生效（页面样式正常）
- [x] `npm run validate:content` 成功
- [x] `npm run build` 成功
- [x] `docs/content-edit-guide.md` 可供非技术同学使用
- [x] RUN 证据留存
