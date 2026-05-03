# CMS OAuth Worker

Cloudflare Worker GitHub OAuth proxy for the Decap CMS `/admin/` workflow.

This Worker is intentionally small and only supports the Decap GitHub backend routes used by this site:

- `GET /` health check
- `GET /auth` GitHub OAuth redirect
- `GET /callback` GitHub OAuth token callback for the Decap popup

The OAuth `state` value is stored in a short-lived `HttpOnly`, `Secure`, `SameSite=Lax` cookie and must match on `/callback` before the Worker exchanges the GitHub authorization code.

## Required GitHub OAuth App

Create a GitHub OAuth App from GitHub Developer settings.

- Homepage URL: the deployed Worker base URL, for example `https://doubleducklab-cms-oauth.<account>.workers.dev`
- Authorization callback URL: the same Worker URL plus `/callback`, for example `https://doubleducklab-cms-oauth.<account>.workers.dev/callback`

Save the generated client ID and client secret. They must be configured as Worker secrets, not committed to this repository.

## Deploy

```bash
cd ops/cms-oauth-worker
npx wrangler secret put GITHUB_OAUTH_ID
npx wrangler secret put GITHUB_OAUTH_SECRET
npx wrangler deploy
```

Run the local smoke checks before deploying changes:

```bash
npm run test:smoke
```

The default Worker config uses:

```text
ALLOWED_ORIGIN=https://doubleducklab.pages.dev
GITHUB_REPO_PRIVATE=0
```

If the production site moves to a custom domain, update `ALLOWED_ORIGIN` and the Pages `PUBLIC_SITE_URL` / `CMS_OAUTH_BASE_URL` variables in the same release.

## Cloudflare Pages Variables

After the Worker is deployed, set the production Pages environment variables:

```bash
PUBLIC_SITE_URL=https://doubleducklab.pages.dev
CMS_GITHUB_REPO=nightt5879/DoubleDuckLab
CMS_BRANCH=main
CMS_OAUTH_BASE_URL=https://doubleducklab-cms-oauth.<account>.workers.dev
```

Rebuild the Pages production deployment after saving the variables. `/admin/config.yml` should then render the full Decap config instead of the missing-variable notice.
