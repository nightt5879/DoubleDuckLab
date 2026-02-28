# Content Ops Checklist（0代码维护版）

适用对象：不写代码、只做内容更新的同学。

## A. 每次更新的标准流程（SOP）

1) 拉最新代码并切分支
```bash
git fetch origin
git checkout main
git pull
git checkout -b content/YYYYMMDD-你的事项
```

2) 修改内容文件
- 新闻：`src/content/news/*.md`
- 论文：`src/content/papers/*.md`
- 成员：`src/data/content/members.json`
- 项目：`src/data/content/projects.json`
- 站点文案：`src/data/content/site.zh.json` / `site.en.json`

3) 运行检查（必须）
```bash
npm run validate:content
npm run build
```

4) 本地预览确认
```bash
./run.sh
```
浏览器打开：
- 中文：`http://localhost:4321/`
- 英文：`http://localhost:4321/en/`

5) 提交并推送
```bash
git add .
git commit -m "content: 更新xxx"
git push origin content/YYYYMMDD-你的事项
```

6) 发起 PR（由负责人审核）
- PR 标题建议：`content: 更新xxx`
- 描述包含：改了什么、影响页面、是否通过校验

---

## B. 四类内容更新模板

### 1) 新增新闻
路径：`src/content/news/2026-03-01-topic.md`
```md
---
date: '2026-03-01'
title:
  zh: '中文标题'
  en: 'English title'
---
```

### 2) 新增论文
路径：`src/content/papers/2026-venue-short-title.md`
```md
---
year: 2026
title: 'Paper Title'
venue: 'Conference/Journal'
---
```

### 3) 新增成员
在 `src/data/content/members.json` 追加：
```json
{
  "name": "New Member",
  "role": { "zh": "硕士生", "en": "Master" },
  "area": "Research Area"
}
```

### 4) 新增项目
在 `src/data/content/projects.json` 追加：
```json
{
  "title": "Project Name",
  "tag": "Embodied AI",
  "status": { "zh": "进行中", "en": "Ongoing" }
}
```

---

## C. 常见错误排查

### 1) `Content validation failed`
- 检查 JSON 是否有逗号/引号错误
- 检查 markdown frontmatter 字段是否缺失（如 `date/year/title/venue`）

### 2) `npm run build` 报路径找不到
- 文件名是否拼错
- 页面引用路径是否误改

### 3) `bash\r` 报错（WSL）
- 先跑：`git pull`
- 再跑：`./check.sh`
- 或执行：`sed -i 's/\r$//' run.sh check.sh`

---

## D. 命名规范（建议）

### 分支
- 内容更新：`content/YYYYMMDD-topic`
- 任务开发：`feat/tXXXX-topic`

### 提交
- `content: 更新新闻xx`
- `content: 新增论文xx`
- `content: 更新成员与项目`

---

## E. 提交前 30 秒最终检查

- [ ] `npm run validate:content` 通过
- [ ] `npm run build` 通过
- [ ] 本地页面显示正确
- [ ] 中文与英文都看过
- [ ] commit message 清晰

如果以上全绿，就可以推送并提 PR。
