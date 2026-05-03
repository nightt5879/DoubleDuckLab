# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [1.3.1] - 2026-05-03

### Added
- Added a Cloudflare Worker OAuth proxy package under `ops/cms-oauth-worker/` for the Decap CMS GitHub login flow.
- Documented the GitHub OAuth App, Worker secrets, and Cloudflare Pages variables required to enable the production `/admin/` CMS.

### Changed
- Bumped the package version from `1.3.0` to `1.3.1` for the CMS live enablement follow-up.
- Updated CMS operations notes to make the post-`1.3.0` online login, PR preview, and merge rehearsal explicit.
- Updated homepage copy so it no longer describes the CMS as news-only.

### Fixed
- Ensured canonical, Open Graph, and hreflang URLs honor `PUBLIC_SITE_URL` during configured CMS builds.
- Added OAuth `state` cookie validation before the CMS Worker exchanges GitHub callback codes.

## [1.3.0] - 2026-05-02

### Added
- Expanded `/admin/` into a content file management CMS for news, members, papers, recruitment pages, and existing project files.
- Added CMS collections for creating, editing, and deleting member and paper Markdown entries through the GitHub PR workflow.
- Added fixed-file CMS entries for recruitment and existing project overview/background files, with deletion disabled to protect required site structure.
- Added a T-0015 go-live rehearsal log and a content replacement inventory.
- Added a bilingual `2026-04-23-go-live-rehearsal` news entry to preserve the news-only CMS file shape.

### Changed
- Bumped the package version from `1.2.1` to `1.3.0` for the backward-compatible CMS file management feature.
- Updated CMS smoke checks and content validation to cover the expanded admin surface and member filename/id consistency.
- Reworked obvious placeholder content so fake emails, `example.com` links, and unverified research claims are not presented as real launch-ready content.

### Fixed
- Preserved the Decap CMS CDN script as an inline external script so configured `/admin/` builds load the CMS bundle directly.

## [1.2.1] - 2026-03-28

### Fixed
- Preserved `.zh` / `.en` news entries when building localized news groups so bilingual news items are not dropped by locale parsing.
- Made `news` title frontmatter validation tolerant of `zh` / `en` key order and optional quoted values.
- Required `PUBLIC_SITE_URL` alongside the GitHub repo and OAuth base URL before enabling the `news` CMS build output.

### Changed
- Updated smoke checks, README docs, roadmap, and handoff notes to reflect the `1.2.1` CMS ops-hardening follow-up.

## [1.2.0] - 2026-03-27

### Added
- A `news`-only Decap CMS pilot under `/admin/`, plus a build-generated `/admin/config.yml` driven by `CMS_GITHUB_REPO`, `CMS_BRANCH`, and `CMS_OAUTH_BASE_URL`.
- CMS-aware smoke checks that verify `/admin/` and `/admin/config.yml` in both configured and unconfigured builds.

### Changed
- Migrated `news` content from folder-paired files to explicit `<slug>.zh.md` / `<slug>.en.md` files with frontmatter titles.
- Updated `news` schema, localization logic, and content validation to require `date` plus `title.zh/en` while keeping legacy date-only slugs valid.
- Extended README and ops docs to describe the GitHub PR review workflow, Cloudflare/OAuth setup, and rollback path for the `news` CMS pilot.

## [1.1.2] - 2026-03-27

### Changed
- Unified the verification entrypoint around `npm run verify` and `verify.bat` to keep local, Windows, and CI checks aligned.
- Tightened the build flow so verification uses clean build output instead of relying on existing `dist/` artifacts.
- Updated the release and ops documentation to describe `1.1.2` as stability hardening, without adding outward site features.

## [1.1.1] - 2026-03-26

### Added
- Configurable production site URL via `PUBLIC_SITE_URL`, with `https://doubleducklab.com` as the default.
- Post-build SEO / i18n checks for canonical tags, Open Graph metadata, hreflang alternates, and locale switching.

### Changed
- Added canonical, Open Graph, Twitter card, and hreflang output in the shared layout.
- Switched the footer language control from homepage-only links to current-page locale alternates.
- Expanded `verify.bat` and CI to run SEO / i18n verification after build.

### Fixed
- Only emit locale alternates and footer language-switch links when the counterpart page is explicitly available.
- Aligned internal navigation and back links with the canonical trailing-slash URL form.
- Made `test:seo` load the same configured site URL source as `astro build`, including `.env` values.
- Declared `vite` explicitly as a dev dependency because the repo imports `loadEnv` directly.

## [1.0.1] - 2026-03-26

### Fixed
- Restored UTF-8 Chinese copy across site content, pages, and operating docs.
- Removed drift from the legacy `src/data/content/*` source path.
- Updated content validation to check the actual runtime sources in `src/data/site.*.json` and `src/content/*`.

### Added
- Minimal CI for pull requests and pushes to `main`.
- A smoke test that verifies the built `/`, `/en/`, `/members`, `/projects`, `/papers`, and `/news` routes.
- A Windows `verify.bat` entrypoint for one-click validation, build, and smoke testing.

## [1.0.0] - 2026-03-02

### Added
- Initial bilingual Astro lab site template with content collections and local preview workflow.
