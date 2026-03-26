# Release Baseline Checklist（1.0.1）

## 0. 环境要求
- Node.js 18+
- npm 9+

## 1. 安装与校验

```bash
npm install
npm run validate:content
npm run build
npm run test:smoke
```

Windows 可直接运行：

```bat
verify.bat
```

## 2. 预览

```bash
./run.sh
```

检查以下页面：
- `/`
- `/en/`
- `/members`
- `/projects`
- `/papers`
- `/news`

## 3. 通过标准

- [ ] `validate:content` 通过
- [ ] `build` 通过
- [ ] `test:smoke` 通过
- [ ] `verify.bat` 一键校验通过（Windows）
- [ ] 中文页面无乱码
- [ ] 中英文主要入口都能访问

## 4. 失败排查

- `validate:content` 失败：优先检查 frontmatter、语言配对、文件路径
- `build` 失败：检查页面 import、字段拼写、内容集合命名
- `test:smoke` 失败：优先检查页面静态文案是否被误删或再次出现乱码
- `verify.bat` 失败：先看停在哪一步，再对应上面三项逐一排查
