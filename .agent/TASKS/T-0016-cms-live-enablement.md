# T-0016: CMS live enablement / OAuth proxy

## Goal
Enable the `1.3.0` Decap CMS file management backend in a real online environment by adding the Cloudflare Worker OAuth proxy package, documenting the required Pages variables, and preparing the first real CMS PR rehearsal.

## Scope
- In-scope:
  - Add a Cloudflare Worker OAuth proxy package under `ops/cms-oauth-worker/`
  - Document the GitHub OAuth App, Worker secrets, and Pages environment variables
  - Bump the release line to `1.3.1`
  - Use the existing `v1.3.0` news entry for the first CMS edit rehearsal
- Out-of-scope:
  - Expanding CMS collections beyond `1.3.0`
  - Adding a database, custom content API, or arbitrary file browser
  - Committing OAuth client secrets

## Acceptance Criteria
- [x] Worker package includes `/`, `/auth`, and `/callback`
- [x] Required Worker secrets are documented
- [x] Cloudflare Pages CMS variables are documented with the real repo and `pages.dev` site URL
- [ ] Production Worker deployed with real GitHub OAuth App credentials
- [ ] Production `/admin/` loads Decap CMS instead of setup-required copy
- [ ] CMS creates a PR from a small edit to the existing `v1.3.0` news entry
- [ ] Cloudflare Pages preview and post-merge production pages are verified

## Progress Log
- 2026-05-03: Created T-0016 and added the initial Worker deployment package and docs for `1.3.1`.
