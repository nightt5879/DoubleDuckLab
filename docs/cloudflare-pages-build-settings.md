# Cloudflare Pages Build Settings

Use these settings for the `doubleducklab` Pages project when GitHub is connected directly to Cloudflare Pages.

## Build Settings

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `22.16.0`

The repository pins the Node.js version in `.node-version`, and the Pages project also has `NODE_VERSION=22.16.0` set for production builds. This keeps GitHub Actions, local release builds, manual Wrangler uploads, and Cloudflare Pages Git builds on the same runtime family.

## Required Production Variables

- `CMS_GITHUB_REPO=nightt5879/DoubleDuckLab`
- `CMS_BRANCH=main`
- `CMS_OAUTH_BASE_URL=https://doubleducklab-cms-oauth.<account>.workers.dev`
- `PUBLIC_SITE_URL=https://doubleducklab.pages.dev`

`NODE_VERSION` is a build-environment pin, not a CMS secret. It is listed with Pages secrets only because Wrangler manages Pages variables through `wrangler pages secret`.

## Verification

After merging a deployment-config change:

1. Check that Cloudflare Pages creates a production Git deployment for the merge commit.
2. Confirm the production deployment succeeds without needing a manual `wrangler pages deploy`.
3. Visit `/admin/config.yml` and confirm it is the enabled CMS config, not the setup-required fallback.
4. Visit `/news/` and `/en/news/` to confirm public routes still build normally.
