# Changelog

All notable changes to this project will be documented in this file.

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
