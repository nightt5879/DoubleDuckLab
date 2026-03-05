<p align="center">
  <img src="./sources/DDLab_logo.png" width="350">
</p>

# 🦆🦆 DoubleDuckLab (DDLab)
<p align="right">
  中文 | <a href="./README_EN.md">English</a>
</p>

一个基于 **Astro** 构建的现代化课题组官网模板，
为**科研团队**设计。

---

## ✨ 项目特点

* ⚡ 基于 **Astro** 构建，静态生成，速度极快
* 🧩 **JSON / Markdown 内容驱动**，无需后端
* 🧑‍🔬 专为 **科研团队官网** 场景设计
* 📱 **响应式布局**
* 🌙 **深色 / 浅色模式**
* 🚀 可直接部署到 **Cloudflare Pages / Vercel**

## 🦆 在线访问
👉 https://doubleducklab.com

## 🖼️ 项目预览

<p align="center">
  <a href="https://doubleducklab.com" target="_blank">
    <img src="./sources/preview_light.png" alt="Preview (Light)" width="48%"/>
  </a>
  <a href="https://doubleducklab.com" target="_blank">
    <img src="./sources/preview_dark.png" alt="Preview (Dark)" width="48%"/>
  </a>
</p>

<p align="center">
  <sub>左：Light / 右：Dark（点击图片可直接访问 doubleducklab.com）</sub>
</p>

---

## 🚀 快速开始

克隆项目：

```bash
git clone https://github.com/YOURNAME/doubleducklab.git
cd doubleducklab
```

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

访问：

```
http://localhost:4321
```

---

## 📝 内容编辑

网站主要内容存储在：

```
src/content/
```

例如：

```
members/*.md
papers/*.md
news/*.md
```

修改这些文件即可更新网站内容。

---

## 🏷️ 修改站点品牌与网站名称（中文）

这两个字段已经拆分：

- `brand`：用于左上角品牌（Header）
- `siteName`：用于首页 Hero 标题和浏览器标签页标题（`<title>`）

请编辑文件：

```json
src/data/site.zh.json
```

示例：

```json
{
  "brand": "DOUBLEDUCK·LAB",
  "siteName": "DoubleDuckLab"
}
```

修改后效果：

- Header 左上角显示 `brand`
- 首页主标题显示 `siteName`
- 页面标题显示为 `页面名 · siteName`（例如：`新闻 · DoubleDuckLab`）

执行验证：

```bash
npm run build
npm run preview
```

---

## 📄 Papers 内容配置

论文内容使用 Astro Content Collections，文件位置：

```text
src/content/papers/*.md
```

每篇 paper 的 frontmatter 最小模板（仅必填）：

```md
---
year: 2025
title: "Embodied Skill Transfer with Sparse Demo"
venue: "ICRA"
---
```

完整模板（可选字段全部展示）：

```md
---
year: 2025
title: "Embodied Skill Transfer with Sparse Demo"
venue: "ICRA"
abstract: |
  We study skill transfer with sparse demonstrations and propose a lightweight pipeline
  that improves generalization across tasks.
links:
  online: "https://example.com/paper"
  pdf: "/papers/embodied-skill-transfer.pdf"
  project: "https://doubleducklab.com/projects/embodied-skill-transfer"
  code: "https://github.com/nightt5879/DoubleDuckLab"
bibtex: |
  @inproceedings{demo2025,
    title={Embodied Skill Transfer with Sparse Demo},
    author={First Author and Second Author},
    booktitle={ICRA},
    year={2025}
  }
---
```

字段说明：

- 必填：`year`、`title`、`venue`
- 可选：`abstract`、`links`、`bibtex`
- `links` 子字段全部可选：`online`、`pdf`、`project`、`code`

详情页显示规则：

- 不写 `abstract`：不显示 Abstract/摘要 区块
- `links` 四项都不写：不显示 Links 区块
- `links` 只写某一项：仅显示对应按钮
- 不写 `bibtex`：不显示 Citation (BibTeX) 区块

`links.pdf` 支持两种写法：

- 外链：`https://...`
- 站内静态路径：`/papers/xxx.pdf`

如果使用站内路径，请把 PDF 文件放到：

```text
public/papers/xxx.pdf
```

---

## 👥 Members 内容配置（含头像）

成员内容使用 Astro Content Collections，文件位置：

```text
src/content/members/*.md
```

头像资源目录：

```text
public/member/images/
```

默认头像（未匹配到成员头像时使用）：

```text
public/images/avatar-default.png
```

### 1) 最小模板（必填字段）

```md
---
id: "zhang-wei"
name:
  zh: "张伟"
  en: "Wei Zhang"
role:
  zh: "博士生"
  en: "PhD"
area:
  zh: "多模态智能体"
  en: "Multimodal Agents"
---
```

### 2) 完整模板（含可选字段）

```md
---
id: "li-ming"
name:
  zh: "李明"
  en: "Ming Li"
role:
  zh: "硕士生"
  en: "Master"
status:
  zh: "在读"
  en: "Current"
area:
  zh: "机器人规划"
  en: "Robot Planning"
bio:
  zh: "研究方向聚焦于机器人规划与控制。"
  en: "Focused on robot planning and control."
avatar: "/member/images/custom-li-ming.png"
links:
  scholar: "https://scholar.google.com/"
  github: "https://github.com/yourname"
  homepage: "https://example.com"
  email: "liming@xxx.com"
---
```

字段说明：

- 必填：`id`、`name.zh/en`、`role.zh/en`、`area.zh/en`
- 可选：`status`、`bio`、`avatar`、`links`
- `links` 子字段可选：`scholar`、`github`、`homepage`、`email`

显示规则（不填即不显示）：

- 不写 `bio`：详情页不显示简介区块
- `links` 四项都不写：详情页不显示 Links 区块
- `links.email` 写了：详情页显示完整邮箱文本，可点击复制，长邮箱会自动换行
- 不写 `status`：列表卡片右上角不显示状态角标（PI 默认也不显示）

### 3) 头像自动匹配规则

如果没有写 `avatar`，系统会自动按 **name** 去找同名头像：

```text
public/member/images/<name>.png
public/member/images/<name>.jpg
public/member/images/<name>.svg
```

示例：

- `name.zh: "张教授"` -> `public/member/images/张教授.png`
- `name.en: "Prof. Zhang"` -> `public/member/images/Prof. Zhang.jpg`

支持中文文件名。

### 4) 成员排序规则（默认）

列表页默认按以下顺序展示：

1. PI（负责人）
2. 在组成员：PhD -> Master -> RA
3. 离组成员：PhD -> Master -> RA

状态角标颜色：

- 蓝色：`在读 / 在职`（`Current / Active`）
- 绿色：`已毕业 / 已离开`（`Alumni / Former`）

---

## 🌍 部署

推荐使用 **Cloudflare Pages**。

构建命令：

```
npm run build
```

输出目录：

```
dist
```

---

## 🗺 Roadmap

计划中的功能：

* [ ] Markdown 内容系统
* [ ] 可视化内容编辑
* [ ] 多语言支持
* [ ] 成员个人主页
* [ ] 自动导入论文（Google Scholar）

---

## 🤝 贡献

欢迎提交 Issue 或 Pull Request。

---

## 📜 开源协议

MIT License

---

## 🦆 关于项目名称

**DoubleDuckLab** 来源于中山大学的一个网络昵称 “双鸭山大学”。

项目旨在为科研团队提供一个简单、现代、易维护的官网模板。
