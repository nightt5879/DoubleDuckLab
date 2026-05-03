# Go-live Rehearsal Log（T-0015）

更新时间：2026-05-03

## 1. 演练结论

- 本地内容闭环已推进：已新增双语上线演练新闻，并清理一批明显会误导上线验收的假邮箱、`example.com` 外链和虚假成果表述。
- `1.3.0` 已将 CMS 从 `news` 扩展到新闻、成员、论文、招生固定页与现有项目文件。
- `1.3.1` 新增 Cloudflare Worker OAuth 代理部署包，用于补齐线上 Decap CMS GitHub 登录前提。
- 线上 CMS 登录、GitHub PR 创建、Cloudflare Pages 预览与合并上线仍需要在配置好 OAuth App、Worker secrets 和 Pages 环境变量后完成。

## 2. 本地已完成证据

- 新增 news CMS 文件形态样本：
  - `src/content/news/2026-04-23-go-live-rehearsal.zh.md`
  - `src/content/news/2026-04-23-go-live-rehearsal.en.md`
- 新增 `v1.3.0` 发布公告新闻：
  - `src/content/news/2026-05-03-v1-3-0-cms-file-management.zh.md`
  - `src/content/news/2026-05-03-v1-3-0-cms-file-management.en.md`
- 新增 Cloudflare Worker OAuth 代理部署包：`ops/cms-oauth-worker/`
- 补充内容替换清单：`docs/content-replacement-inventory.md`
- 内容清理原则：没有真实素材时，不编造正式成员、论文、招生邮箱或线上验收结论。
- 本地验证：
  - `npm run validate:content` 通过
  - `npm run test:smoke` 通过
  - `npm run test:seo` 通过
  - `npm run verify` 通过
- 构建备注：Astro content sync 仍会输出少量 duplicate id warning，但本轮未导致 build、smoke 或 SEO 失败；后续可单独评估 content cache / collection sync 清理。

## 3. 线上验收清单

| 项目 | 当前状态 | 上线前动作 |
|---|---|---|
| `CMS_GITHUB_REPO` | 待线上核验 | 确认指向目标 GitHub 仓库 |
| `CMS_BRANCH` | 默认为 `main` | 如生产分支不是 `main`，在 Pages 环境变量中覆盖 |
| `CMS_OAUTH_BASE_URL` | 待线上核验 | 确认 OAuth 代理可访问，并与回调地址匹配 |
| `PUBLIC_SITE_URL` | 待线上核验 | 确认生产域名、canonical、Open Graph 与 hreflang 一致 |
| GitHub OAuth App | 待线上创建 | Homepage 指向 Worker base URL，callback 指向 `<Worker base URL>/callback` |
| Worker secrets | 待线上配置 | `GITHUB_OAUTH_ID` 与 `GITHUB_OAUTH_SECRET` 必须作为 Cloudflare Worker secrets |
| GitHub 写权限 | 待线上核验 | 确认内容编辑者能通过 Decap 创建 PR |
| Cloudflare Pages 预览 | 待线上核验 | 确认 CMS 生成 PR 后能触发预览构建 |

## 4. 手动 CMS 验收步骤

1. 使用配置完整的生产或预发环境打开 `/admin/`。
2. 登录 GitHub backend，确认 Decap 显示 `News`、`Members`、`Papers`、`Recruitment & Collaboration` 和 `Projects` collections。
3. 首次验收只微调已发布的 `2026-05-03-v1-3-0-cms-file-management` 中英文新闻。
4. 保存后确认 GitHub 出现可审阅 Pull Request，而不是直接写入 `main`。
5. 在 PR 预览中检查 `/news/2026-05-03-v1-3-0-cms-file-management/` 与 `/en/news/2026-05-03-v1-3-0-cms-file-management/`。
6. 合并后检查生产页面、canonical、Open Graph 与中英互跳。

## 5. 待解决问题

- 成员、论文、项目和招生仍缺真实素材；当前只做了误导性占位清理与替换清单。
- `/admin/` 依赖外部 Decap bundle，供应链加固仍是独立后续任务。
- OAuth Worker 已有部署包，但生产环境仍需要真实 GitHub OAuth App client ID / secret。
- 真实 PR 审核时如果发现字段不顺手，只记录问题；本轮不扩展 CMS schema。
- Astro duplicate id warning 尚未在 T-0015 范围内处理，因为当前统一验收链路仍通过。
