# Self Check

## Commands

```bash
npm run validate:content
cmd /c verify.bat --no-pause
```

## Result

- `validate:content`：通过
- `build`：通过
- `test:smoke`：通过
- `test:seo`：通过

## Notes

- `test:seo` 已改为与 `astro build` 共用站点 URL 解析逻辑
- 站内主要内部链接已统一为 canonical 尾斜杠形式
