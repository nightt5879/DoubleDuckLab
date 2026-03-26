# Hand-off Summary（1.0.1 基线）

更新时间：2026-03-25

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
- 新闻：`src/content/news/<slug>/`
- 招生与合作：`src/content/join/recruitment/`

### 3. 工程验证
- `npm run validate:content`
- `npm run build`
- `npm run test:smoke`
- GitHub Actions CI：PR / `main` 自动跑校验、构建、smoke

## 二、1.0.1 做了什么

- 修复中文真源和页面文本中的乱码
- 删除旧的 `src/data/content/*`
- 把校验脚本切到真实内容源
- 补上最小 CI 和 smoke test
- 补上 `CHANGELOG.md` 和版本记录

## 三、当前已知边界

- 还没接 CMS，仍是文件驱动
- `astro.config.mjs` 里的生产站点地址、canonical、hreflang、OG 还没进入这一版
- 当前语言切换仍固定跳首页，详情页中英互跳留到后续版本

## 四、下一阶段建议

1. `1.1.0`：SEO 与 i18n 体验增强
2. `1.2.0`：先给 `news` 接入 CMS
