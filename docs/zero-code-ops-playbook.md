# Zero-Code Ops Playbook

这份文档记录“非开发同学能直接操作什么、怎么验证、后续还能扩什么”。

## 1. 当前可直接维护的内容

### 站点文案
- 位置：`src/data/site.zh.json`、`src/data/site.en.json`
- 可改：首页介绍、导航、首页重点信息
- 验证页面：`/`、`/en/`

### 成员
- 位置：`src/content/members/*.md`
- 可改：姓名、角色、状态、研究方向、简介、头像链接、外链
- 验证页面：`/members`、`/en/members`

### 项目
- 位置：`src/content/projects/<slug>/`
- 可改：项目概览、背景、状态、链接
- 验证页面：`/projects`、`/en/projects`

### 论文
- 位置：`src/content/papers/*.md`
- 可改：年份、标题、会议、摘要、链接、BibTeX
- 验证页面：`/papers`、`/en/papers`

### 新闻
- 位置：`src/content/news/<slug>/`
- 可改：日期、正文、中英文标题文件
- 验证页面：`/news`、`/en/news`

### 招生与合作
- 位置：`src/content/join/recruitment/overview_cn.md`、`overview_en.md`
- 可改：招生方向、合作方式、联系方式
- 验证页面：`/join`、`/en/join`

## 2. 每次修改后的标准验证

```bash
npm run validate:content
npm run build
npm run test:smoke
./run.sh
```

重点检查：
- 首页中英文是否正常
- 列表页筛选框是否正常显示
- 新增内容是否出现在列表和详情页
- 中文页面是否仍是正常 UTF-8 文本

## 3. 后续可扩展能力

- [TODO] 用 CMS 后台新增新闻
- [TODO] 用 CMS 后台新增论文
- [TODO] 用 CMS 后台维护成员与项目
- [TODO] 表单提交与审核发布
- [TODO] 双语缺失提醒
- [TODO] 内容变更通知

## 4. 维护原则

1. 先更新真源，再看页面。
2. 任何新增内容类型或操作方式，都要先补这份文档。
3. 不再使用 `src/data/content/*`。
