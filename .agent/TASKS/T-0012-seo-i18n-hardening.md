# T-0012: SEO 与 i18n 基础加固

## Goal
让站点具备稳定的生产 SEO 基础能力，并让中英文页面支持“当前页互跳”。

## Scope
- In-scope:
  - 生产域名改为环境变量优先、正式域名兜底
  - 在布局层补 canonical、Open Graph、hreflang、robots 基础 meta
  - 实现当前页面的中英互跳
  - 增加 SEO / i18n 的构建后校验脚本
  - 更新 README、roadmap、changelog 与 agent 留痕
- Out-of-scope:
  - CMS 接入
  - 结构化数据、自动 OG 图片生成
  - 新内容类型或新页面功能

## Acceptance Criteria
- [x] `astro.config.mjs` 支持环境变量站点地址，并且构建结果不再写死 localhost
- [x] 首页、列表页、详情页产出 canonical / OG / hreflang
- [x] 语言切换可在当前页面对应的中英文地址之间跳转
- [x] 验证通过：`verify.bat --no-pause`
- [x] 文档已更新：`README.md`、`README_EN.md`、`docs/roadmap.md`、`CHANGELOG.md`

## Constraints
- 不允许破坏性改动（除非批准）
- 依赖策略：默认不新增依赖

## Risks
- SEO 标签集中到布局层后，若路径归一化有误，可能导致 canonical / hreflang 指向错误页面
- 通过构建后脚本检查首页、列表页、详情页来降低回归风险

## Progress Log
- 2026-03-26: 创建任务，准备对齐站点地址、布局 SEO 标签与双语当前页互跳。
- 2026-03-26: 完成环境变量站点地址、布局 SEO 标签、当前页语言互跳与构建后 SEO / i18n 校验。
