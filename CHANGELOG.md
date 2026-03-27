# Changelog

All notable changes to this project will be documented in this file.

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
