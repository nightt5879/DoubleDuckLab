# T-0013: SEO / URL review follow-ups（1.1.1）

## Goal
收口 1.1.0 合并后的 review follow-ups，避免错误 alternate、统一内部链接 URL 形式，并让构建后 SEO 校验与 build 使用同一站点 URL 来源。

## Scope
- In-scope:
  - 只在对侧页面存在时输出 hreflang / 语言切换链接
  - 统一内部站内链接到带尾斜杠的 canonical 形式
  - 让 `test:seo` 与 `astro build` 共享 `PUBLIC_SITE_URL` 解析逻辑
  - 更新 changelog / roadmap / agent 留痕
- Out-of-scope:
  - 新功能开发
  - CMS 接入
  - 自动 AI review workflow

## Acceptance Criteria
- [x] 动态详情页在对侧语言页面不存在时，不再输出错误 hreflang 或页脚切换链接
- [x] 站内主要内部链接统一到 canonical 尾斜杠形式
- [x] `npm run test:seo` 能正确读取 `.env` 中的 `PUBLIC_SITE_URL`
- [x] 自验证通过：`verify.bat --no-pause`

## Constraints
- 不允许破坏性改动（除非批准）
- 依赖策略：默认不新增依赖

## Risks
- 若 alternate 逻辑在布局层做错，可能影响现有对称页面的 hreflang 输出
- 通过构建后 HTML 检查首页、详情页与 404 页面来降低回归风险

## Progress Log
- 2026-03-26: 创建 1.1.1 follow-up 任务，处理 merged PR review 提示的三个问题。
- 2026-03-26: 完成 locale alternates 可用性控制、内部链接尾斜杠统一与共享站点 URL 解析。
