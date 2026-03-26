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

- `verify.bat` 会自动设置 `ASTRO_TELEMETRY_DISABLED=1`
- 本次 SEO / i18n 校验覆盖 canonical、Open Graph、hreflang、404 noindex 与当前页语言互跳
