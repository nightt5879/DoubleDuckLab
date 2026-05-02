# Hand-off Summary（1.3.0 CMS file management）

更新时间：2026-05-02

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
- 已将 `/admin/` 扩展为内容文件管理后台
- 新闻、成员、论文支持新增 / 编辑 / 删除
- 招生与合作只编辑固定中英文页面，不支持新增 / 删除
- 项目只编辑现有 overview/background 四文件内容，不支持新增 / 删除项目
- 编辑流使用 GitHub backend + `editorial_workflow`，通过 Pull Request 审核后合并
- 运营依赖 `CMS_GITHUB_REPO`、`CMS_BRANCH`、`CMS_OAUTH_BASE_URL` 与 `PUBLIC_SITE_URL` 配置，以及 OAuth / Cloudflare Pages 回调地址对齐

## 二、当前版本收口了什么

- 将版本升级到 `1.3.0`，作为向后兼容的 CMS 文件管理功能版本
- 把 README、roadmap、handoff 与 ops 文档统一到 `1.3.0` 口径
- 不再把 CMS 描述为“news-only”，改为“按内容类型受控管理文件”
- 明确 CMS 运维前提是环境变量、OAuth 代理和 Cloudflare Pages 配置一致
- 保留 Decap CDN 脚本加载修复，并用 smoke check 覆盖配置完整 / 未配置两种后台状态

## 三、当前已知边界

- CMS 不是任意文件浏览器，只开放明确内容类型
- 项目第一版不支持新增 / 删除，因为现有项目由四个 Markdown 文件组成
- 运营侧仍需要维护 GitHub 权限、OAuth 代理和 Cloudflare Pages 回调地址的一致性
- 后续如要新增 / 删除项目，建议先迁移项目内容结构

## 四、下一阶段建议

1. 在线上完成一次真实 CMS 登录、PR、预览和合并闭环
2. 收集成员、论文、项目编辑体验反馈，再决定是否迁移项目结构

## 五、T-0015 上线演练补充

- 已新增 `docs/go-live-rehearsal.md`，记录本地内容闭环、线上 CMS 验收前提与待解决问题
- 已新增 `docs/content-replacement-inventory.md`，明确哪些内容仍缺真实素材
- 已新增一条双语新闻 `2026-04-23-go-live-rehearsal`，用于验证 news CMS 目标文件形态
- 已清理明显会误导上线验收的假邮箱、`example.com` 外链和虚假成果表述
- 真实 CMS 登录、GitHub PR、Cloudflare Pages 预览和合并上线仍需在线上环境完成
