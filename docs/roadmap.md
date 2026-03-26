# Roadmap

更新时间：2026-03-26（1.1.1 follow-up）

## 1.0.1 基线修复

已完成：
- 修乱码与 UTF-8 一致性
- 收口唯一真源
- 修正文档漂移
- 补最小 CI
- 补 build 后 smoke test

## 1.1.0 SEO / i18n

已完成：
- 生产域名改为环境变量优先、正式域名兜底
- canonical / Open Graph / hreflang / robots
- 当前页面中英互跳
- build 后补 SEO / i18n 校验

## 1.1.1 SEO / URL follow-up（进行中）

计划项：
- alternate / hreflang 按对侧页面存在性输出
- 站内内部链接统一为 canonical 尾斜杠形式
- `test:seo` 与 build 共用站点 URL 解析逻辑

## 1.2.0 CMS 试点

计划项：
- 先接 `news`
- 跑通编辑、校验、发布链路
- 再评估是否扩到其他内容类型
