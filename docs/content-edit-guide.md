# Content Edit Guide (非技术同学版)

这份文档用于“只改内容、不改代码”。

## 1) 你需要改哪些文件
都在 `src/data/content/` 目录：

- `site.zh.json`：中文站点文案（导航、首页标题）
- `site.en.json`：英文站点文案
- `members.json`：成员列表
- `projects.json`：项目列表
- `papers.json`：论文列表
- `news.json`：新闻列表

## 2) 修改规则
- 保持 JSON 语法：
  - 字符串用双引号 `"..."`
  - 每项之间用逗号
  - 最后一项后不要多余逗号
- 不要随意改字段名（例如 `title`、`date`、`status`）

## 3) 常见操作示例

### 新增一条新闻
在 `news.json` 数组末尾追加：
```json
{
  "date": "2026-03-01",
  "title": {
    "zh": "这里写中文标题",
    "en": "English title here"
  }
}
```

### 新增一个成员
在 `members.json` 里追加：
```json
{
  "name": "New Member",
  "role": { "zh": "硕士生", "en": "Master" },
  "area": "Research Area"
}
```

## 4) 修改后如何检查
在项目根目录运行：
```bash
npm run validate:content
npm run build
```

- 第一条检查内容格式与字段是否合法
- 第二条检查页面是否可构建

## 5) 如何预览
```bash
./run.sh
```
浏览器打开 `http://localhost:4321`。
