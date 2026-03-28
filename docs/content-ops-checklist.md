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

2. 修改内容文件
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
- 新建文件：`src/content/members/<id>.md`
- 最少包含：
  - `id`
  - `name.zh/en`
  - `role.zh/en`
  - `area.zh/en`

### 2. 新增项目
- 新建目录：`src/content/projects/<slug>/`
- 必备文件：
  - `overview_cn.md`
  - `overview_en.md`
  - `background_cn.md`
  - `background_en.md`

### 3. 新增论文
- 新建文件：`src/content/papers/<slug>.md`
- 必填字段：
  - `year`
  - `title`
  - `venue`

### 4. 新增新闻
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

## D. `news` CMS 试点启用后

- 编辑入口固定为 `/admin/`
- 只在 `news` 上启用 CMS，不扩到其他内容类型
- 内容同学保存后会生成可审阅的 GitHub Pull Request，而不是直接写入 `main`
- 编辑者需要目标仓库的写权限
- 如果发布失败，先回退对应的内容 PR，再检查 Cloudflare Pages、OAuth 回调和环境变量配置
