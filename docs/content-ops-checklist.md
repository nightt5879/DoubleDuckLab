# Content Ops Checklist（0 代码维护版）

适用对象：只做内容更新、不改页面代码的同学。

## A. 每次更新的标准流程

1. 拉最新代码并切分支
```bash
git fetch origin
git checkout main
git pull
git checkout -b content/YYYYMMDD-topic
```

2. 修改内容文件，或在 CMS 启用后通过 `/admin/` 修改受控内容
- 站点文案：`src/data/site.zh.json`、`src/data/site.en.json`
- 成员：`src/content/members/*.md`
- 项目：`src/content/projects/<slug>/`
- 论文：`src/content/papers/*.md`
- 新闻：`src/content/news/<slug>.zh.md`、`src/content/news/<slug>.en.md`
- 招生与合作：`src/content/join/recruitment/overview_cn.md`、`overview_en.md`

3. 运行检查
```bash
npm run verify
```

4. 本地预览确认
```bash
./run.sh
```

5. 提交并推送
```bash
git add .
git commit -m "content: update xxx"
git push origin content/YYYYMMDD-topic
```

## B. 常见新增操作

### 1. 新增成员
- CMS 能力：可通过 `/admin/` 新增 / 编辑 / 删除
- 新建文件：`src/content/members/<id>.md`
- 最少包含：
  - `id`
  - `name.zh/en`
  - `role.zh/en`
  - `area.zh/en`

### 2. 新增项目
- CMS 能力：当前只编辑现有项目，不新增 / 删除项目
- 新建目录：`src/content/projects/<slug>/`
- 必备文件：
  - `overview_cn.md`
  - `overview_en.md`
  - `background_cn.md`
  - `background_en.md`

### 3. 新增论文
- CMS 能力：可通过 `/admin/` 新增 / 编辑 / 删除
- 新建文件：`src/content/papers/<slug>.md`
- 必填字段：
  - `year`
  - `title`
  - `venue`

### 4. 新增新闻
- CMS 能力：可通过 `/admin/` 新增 / 编辑 / 删除
- 新建文件：
  - `src/content/news/<slug>.zh.md`
  - `src/content/news/<slug>.en.md`
- 必备文件：
  - `*.zh.md`
  - `*.en.md`
- 必填字段：
  - `date`
  - `title.zh/en`

## C. 交付前 30 秒检查

- [ ] 内容改动只落在 `src/data/site.*.json` 或 `src/content/*`
- [ ] `npm run verify` 通过
- [ ] 中英文页面都看过
- [ ] PR 描述写清楚影响范围
- [ ] 如准备上线，对照 `docs/content-replacement-inventory.md` 确认没有假邮箱、假地址或未确认成果

## D. `1.3.0` CMS 文件管理启用后

- 编辑入口固定为 `/admin/`
- 新闻、成员、论文可新增 / 编辑 / 删除
- 招生与合作只编辑固定页面，不新增 / 删除
- 项目只编辑现有 overview/background 文件，不新增 / 删除项目
- 内容同学保存后会生成可审阅的 GitHub Pull Request，而不是直接写入 `main`
- 编辑者需要目标仓库的写权限
- `1.3.1` 起，GitHub 登录依赖 `ops/cms-oauth-worker/` 中的 Cloudflare Worker OAuth 代理
- 首次线上闭环建议只微调已发布的 `v1.3.0` 新闻，验证登录、PR、预览和合并，不新增测试新闻
- 如果发布失败，先回退对应的内容 PR，再检查 Cloudflare Pages、OAuth 回调和环境变量配置
- 首次真实上线演练请同时更新 `docs/go-live-rehearsal.md`
