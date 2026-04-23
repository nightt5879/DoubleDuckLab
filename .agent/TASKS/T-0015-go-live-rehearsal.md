# T-0015: Go-live rehearsal / real content loop

## Goal
推进真实上线闭环：保持 CMS 只覆盖 `news`，清理会误导上线验收的示例内容，补齐本地可验证的演练记录，并明确真实 CMS PR / Cloudflare Pages 预览 / 合并上线需要在线上环境完成。

## Scope
- In-scope:
  - 新增上线演练记录与内容替换清单
  - 新增一条双语 news 文件形态样本
  - 清理明显假邮箱、假地址、`example.com` 外链和虚假成果声明
  - 记录 CMS 环境变量、OAuth、Pages 预览和编辑权限的线上验收项
- Out-of-scope:
  - CMS 扩到 `news` 之外
  - 更改 URL、schema、环境变量命名
  - 伪造真实成员、论文、项目、招生或线上验收结果

## Acceptance Criteria
- [x] CMS 仍为 `news` only
- [x] 本地新增双语新闻文件，符合当前 news 内容模型
- [x] 有上线演练记录和内容替换清单
- [x] 明确真实 CMS PR / 预览 / 合并依赖线上权限
- [x] 本地验证链路通过

## Risks
- 真实 CMS 登录、PR 创建和 Pages 预览尚未在线上环境复核
- 成员、论文、项目和招生仍需真实负责人提供素材
- 若正式品牌不是 `DoubleDuckLab`，站点级文案仍需替换

## Progress Log
- 2026-04-23: 创建 T-0015，按“真实上线闭环优先，不扩 CMS 类型”执行。
- 2026-04-23: 新增 go-live rehearsal 新闻、演练记录和内容替换清单。
- 2026-04-23: 清理 fake email、fake address、`example.com` 外链与未验证成果表述。
- 2026-04-23: `npm run validate:content`、`npm run test:smoke`、`npm run test:seo` 与 `npm run verify` 均通过；构建仍有 Astro duplicate id warning，记录为后续可选清理项。
