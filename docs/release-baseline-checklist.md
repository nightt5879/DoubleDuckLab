# Release Baseline Checklist（基础收官验收清单）

> 目标：任何人拿到仓库后，都能在本地跑起来并验证当前功能。

## 0. 环境要求
- Node.js 18+
- npm 9+
- WSL/Windows/macOS/Linux 任一

## 1. 拉代码与切分支
```bash
git fetch origin
git checkout main
git pull
```

## 2. 一键检查并启动（推荐）
```bash
./check.sh
```
默认会切到 demo 分支并启动预览。

## 3. 手动启动（备用）
```bash
npm install
npm run validate:content
npm run build
./run.sh
```

## 4. 访问验证
打开：
- 中文：`http://localhost:4321/`
- 英文：`http://localhost:4321/en/`

逐页检查：
- `/` / `/en/` 首页
- `/members` / `/en/members` 成员
- `/projects` / `/en/projects` 项目
- `/papers` / `/en/papers` 论文
- `/news` / `/en/news` 新闻

## 5. 内容变更验证（最小演练）
1) 在 `src/content/news/` 新增一条 markdown 新闻
2) 运行：
```bash
npm run validate:content
npm run build
```
3) 打开 `/news` 和 `/en/news` 确认新条目可见

## 6. 失败排查
- `validate:content` 失败：检查 JSON/frontmatter 字段
- `build` 失败：检查页面 import 路径、字段拼写
- `bash\r` 错误：先 `git pull` 再 `./check.sh`

## 7. 基线通过标准
- [ ] validate:content 通过
- [ ] build 通过
- [ ] 中英文 10 个页面可访问
- [ ] 新闻新增演练通过
- [ ] 文档可指导非技术同学完成一次内容更新
