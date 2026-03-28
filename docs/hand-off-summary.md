# Hand-off Summary（1.2.1 CMS pilot closure / ops hardening）

更新时间：2026-03-28

## 一、当前已完成

### 1. 站点与页面
- Astro 静态站点
- 中文 / 英文双路由
- 首页、成员、项目、论文、新闻、招生与合作页面

### 2. 内容模型
- 站点级文案：`src/data/site.zh.json`、`src/data/site.en.json`
- 成员：`src/content/members/*.md`
- 项目：`src/content/projects/<slug>/`
- 论文：`src/content/papers/*.md`
- 新闻：`src/content/news/<slug>.zh.md`、`src/content/news/<slug>.en.md`
- 招生与合作：`src/content/join/recruitment/`

### 3. 工程验证
- `npm run verify`
- GitHub Actions CI：PR / `main` 自动跑统一验收链路（内容校验、构建、smoke、SEO）

### 4. CMS 运营边界
- 已为 `news` 接入 Decap CMS
- 当前仅开放新闻双语内容，不扩到成员 / 项目 / 论文 / 招生
- 编辑流使用 GitHub backend + `editorial_workflow`，通过 Pull Request 审核后合并
- 运营依赖 `CMS_GITHUB_REPO`、`CMS_BRANCH`、`CMS_OAUTH_BASE_URL` 与 `PUBLIC_SITE_URL` 配置，以及 OAuth / Cloudflare Pages 回调地址对齐

## 二、当前版本收口了什么

- 把 README、roadmap、handoff 与 ops 文档统一到 `1.2.1` 口径
- 不再把 CMS 描述为“未接入”，改为“news-only 已接入模板，并采用 PR 审核流作为目标发布路径”
- 明确 CMS 运维前提是环境变量、OAuth 代理和 Cloudflare Pages 配置一致

## 三、当前已知边界

- CMS 目前只覆盖 `news`，其他内容类型仍以文件驱动为主
- 运营侧仍需要维护 GitHub 权限、OAuth 代理和 Cloudflare Pages 回调地址的一致性
- 后续如要扩到论文、成员、项目或招生，需要单独定义内容模型与审核路径

## 四、下一阶段建议

1. 保持 `news` CMS 试点稳定运行，先验证编辑与审核协作成本
2. 如需扩类型，优先单独评估 `papers` / `members` / `projects` 的内容模型与权限边界
