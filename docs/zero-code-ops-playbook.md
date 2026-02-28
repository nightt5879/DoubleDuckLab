# Zero-Code Ops Playbook（持续测试与功能扩展）

> 目的：把“后续测试什么、怎么测、上线后用户端可操作什么”固定成一份长期文档。
> 规则：每次新增“用户端可操作功能”，都要补到本文件。

---

## 1. 当前可测试功能（基线）

## A. 内容更新（无需写业务代码）

### 1) 新闻（Markdown）
- 位置：`src/content/news/*.md`
- 能做：新增新闻、修改标题/日期（中英文）
- 验证页面：`/news`、`/en/news`

### 2) 论文（Markdown）
- 位置：`src/content/papers/*.md`
- 能做：新增论文、修改年份/题目/会议
- 验证页面：`/papers`、`/en/papers`

### 3) 成员（JSON）
- 位置：`src/data/content/members.json`
- 能做：新增/修改成员信息
- 验证页面：`/members`、`/en/members`

### 4) 项目（JSON）
- 位置：`src/data/content/projects.json`
- 能做：新增/修改项目状态
- 验证页面：`/projects`、`/en/projects`

### 5) 站点文案（JSON）
- 位置：`src/data/content/site.zh.json`、`site.en.json`
- 能做：首页文案、导航文案调整
- 验证页面：`/`、`/en/`

---

## 2. 每次内容变更的标准测试流程

1. 拉取代码并切分支（建议）
```bash
git fetch origin
git checkout main
git pull
git checkout -b content/YYYYMMDD-topic
```

2. 修改内容文件（Markdown/JSON）

3. 执行检查
```bash
npm run validate:content
npm run build
```

4. 本地预览
```bash
./run.sh
```

5. 浏览器检查
- 中文：`http://localhost:4321/`
- 英文：`http://localhost:4321/en/`

6. 提交与推送
```bash
git add .
git commit -m "content: 更新xxx"
git push origin content/YYYYMMDD-topic
```

---

## 3. 上线后“用户端可操作”功能扩展清单（持续维护）

> 这里是未来“上线后普通用户/运营同学可以直接操作”的功能池。
> 状态：TODO / DOING / DONE

- [TODO] 通过 CMS 后台新增新闻（无需改文件）
- [TODO] 通过 CMS 后台新增论文
- [TODO] 通过后台更新成员信息（头像/简介）
- [TODO] 通过后台更新项目状态
- [TODO] 用户端表单提交（联系/报名）
- [TODO] 管理端审核发布（草稿 -> 审核 -> 发布）
- [TODO] 双语内容缺失提醒（例如只填中文未填英文）
- [TODO] 内容变更通知（Feishu/邮件）

> 新增任何用户端功能时：
> 1) 在本清单新增条目
> 2) 标记状态
> 3) 写测试步骤

---

## 4. 新功能测试模板（复制用）

### 功能名
- 状态：TODO/DOING/DONE
- 用户角色：访客/运营/管理员
- 操作入口：
- 预期结果：

### 测试步骤
1. 
2. 
3. 

### 验收标准
- [ ] 功能可操作
- [ ] 错误场景有提示
- [ ] 中英文行为一致（如适用）
- [ ] 文档已更新（本文件 + 相关说明）

---

## 5. 一句话执行原则

**所有“能让非技术同学直接操作”的新能力，都必须先写进这个 Playbook，再开发，再验收。**
