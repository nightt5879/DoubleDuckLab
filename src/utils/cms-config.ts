const DEFAULT_SITE_URL = 'https://doubleducklab.com/';

type EnvSource = Record<string, string | boolean | undefined>;

export type CmsRuntimeConfig = {
  enabled: boolean;
  repo: string;
  branch: string;
  oauthBaseUrl: string;
  siteUrl: string;
  siteDomain: string;
  missing: string[];
};

function normalizeUrl(value: string | undefined, fallback = '') {
  const normalized = (value || fallback).trim();
  if (!normalized) {
    return '';
  }

  return normalized.endsWith('/') ? normalized.slice(0, -1) : normalized;
}

function getUrlHostname(value: string) {
  try {
    return new URL(`${value}/`).hostname;
  } catch {
    return '';
  }
}

function readEnv(source: EnvSource, key: string) {
  const value = source[key];
  if (typeof value === 'string' && value.trim()) {
    return value.trim();
  }

  const processEnv = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
  const processValue = processEnv?.[key];
  return typeof processValue === 'string' ? processValue.trim() : '';
}

function yamlString(value: string) {
  return JSON.stringify(value);
}

export function getCmsRuntimeConfig(
  source: EnvSource = (((import.meta as ImportMeta & { env?: EnvSource }).env || {}) as EnvSource),
): CmsRuntimeConfig {
  const repo = readEnv(source, 'CMS_GITHUB_REPO');
  const branch = readEnv(source, 'CMS_BRANCH') || 'main';
  const oauthBaseUrl = normalizeUrl(readEnv(source, 'CMS_OAUTH_BASE_URL'));
  const configuredSiteUrl = normalizeUrl(readEnv(source, 'PUBLIC_SITE_URL'));
  const siteUrl = configuredSiteUrl || normalizeUrl(DEFAULT_SITE_URL);
  const siteDomain = getUrlHostname(configuredSiteUrl);
  const missing: string[] = [];

  if (!repo) {
    missing.push('CMS_GITHUB_REPO');
  }

  if (!oauthBaseUrl) {
    missing.push('CMS_OAUTH_BASE_URL');
  }

  if (!configuredSiteUrl || !siteDomain) {
    missing.push('PUBLIC_SITE_URL');
  }

  return {
    enabled: missing.length === 0,
    repo,
    branch,
    oauthBaseUrl,
    siteUrl,
    siteDomain,
    missing,
  };
}

export function renderCmsConfigYml(config: CmsRuntimeConfig) {
  if (!config.enabled) {
    return [
      '# Decap CMS is not configured for this build.',
      '# Missing environment variables:',
      ...config.missing.map((item) => `# - ${item}`),
      '# Optional:',
      '# - CMS_BRANCH (defaults to main)',
      '',
    ].join('\n');
  }

  return [
    'backend:',
    '  name: github',
    `  repo: ${yamlString(config.repo)}`,
    `  branch: ${yamlString(config.branch)}`,
    `  base_url: ${yamlString(config.oauthBaseUrl)}`,
    '  auth_endpoint: auth',
    `  site_domain: ${yamlString(config.siteDomain)}`,
    'publish_mode: editorial_workflow',
    'i18n:',
    '  structure: multiple_files',
    '  locales: [zh, en]',
    '  default_locale: zh',
    'collections:',
    '  - name: news',
    '    label: News',
    '    label_singular: News Item',
    '    folder: src/content/news',
    '    create: true',
    '    extension: md',
    '    format: frontmatter',
    '    identifier_field: slug',
    '    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"',
    '    summary: "{{slug}} · {{date}}"',
    '    i18n: true',
    '    editor:',
    '      preview: false',
    '    fields:',
    '      - label: Slug',
    '        name: slug',
    '        widget: string',
    '        i18n: duplicate',
    '        hint: Use a short lowercase slug; Decap prefixes the selected date to build the final filename.',
    '        pattern:',
    "          - '^[a-z0-9]+(?:-[a-z0-9]+)*$'",
    "          - 'Use lowercase letters, numbers, and hyphens only.'",
    '      - label: Date',
    '        name: date',
    '        widget: string',
    '        i18n: duplicate',
    '        hint: Use YYYY-MM-DD.',
    '        pattern:',
    "          - '^\\d{4}-\\d{2}-\\d{2}$'",
    "          - 'Date must use YYYY-MM-DD.'",
    '      - label: Title',
    '        name: title',
    '        widget: object',
    '        i18n: true',
    '        fields:',
    '          - label: Chinese Title',
    '            name: zh',
    '            widget: string',
    '            i18n: duplicate',
    '          - label: English Title',
    '            name: en',
    '            widget: string',
    '            i18n: duplicate',
    '      - label: Body',
    '        name: body',
    '        widget: markdown',
    '        i18n: true',
    '',
  ].join('\n');
}
