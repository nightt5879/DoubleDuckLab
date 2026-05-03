import fs from 'node:fs';
import path from 'node:path';

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

function stringField(label: string, name: string, options: { required?: boolean; widget?: string; indent?: number } = {}) {
  const pad = ' '.repeat(options.indent ?? 6);
  const widget = options.widget || 'string';
  const lines = [
    `${pad}- label: ${yamlString(label)}`,
    `${pad}  name: ${name}`,
    `${pad}  widget: ${widget}`,
  ];

  if (options.required === false) {
    lines.push(`${pad}  required: false`);
  }

  return lines;
}

function nestedStringField(label: string, name: string, options: { required?: boolean; indent?: number } = {}) {
  const pad = ' '.repeat(options.indent ?? 10);
  const lines = [
    `${pad}- label: ${yamlString(label)}`,
    `${pad}  name: ${name}`,
    `${pad}  widget: string`,
  ];

  if (options.required === false) {
    lines.push(`${pad}  required: false`);
  }

  return lines;
}

function localizedTextField(label: string, name: string, options: { required?: boolean } = {}) {
  const lines = [
    `      - label: ${yamlString(label)}`,
    `        name: ${name}`,
    '        widget: object',
  ];

  if (options.required === false) {
    lines.push('        required: false');
  }

  return [
    ...lines,
    '        fields:',
    ...nestedStringField('Chinese', 'zh'),
    ...nestedStringField('English', 'en'),
  ];
}

function optionalLinksField(fieldNames: Array<[string, string]>, indent = 6) {
  const pad = ' '.repeat(indent);
  const nestedIndent = indent + 4;
  return [
    `${pad}- label: "Links"`,
    `${pad}  name: links`,
    `${pad}  widget: object`,
    `${pad}  required: false`,
    `${pad}  fields:`,
    ...fieldNames.flatMap(([label, name]) => nestedStringField(label, name, { required: false, indent: nestedIndent })),
  ];
}

function bodyField(options: { required?: boolean; indent?: number } = {}) {
  const pad = ' '.repeat(options.indent ?? 6);
  const lines = [
    `${pad}- label: "Body"`,
    `${pad}  name: body`,
    `${pad}  widget: markdown`,
  ];

  if (options.required === false) {
    lines.push(`${pad}  required: false`);
  }

  return lines;
}

function listProjectSlugs() {
  const projectsDir = path.resolve('src/content/projects');
  try {
    return fs
      .readdirSync(projectsDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

function projectFileName(slug: string, section: 'overview' | 'background', locale: 'cn' | 'en') {
  return `${slug.replace(/[^a-z0-9]+/gi, '_')}_${section}_${locale}`;
}

function projectOverviewFile(slug: string, locale: 'cn' | 'en') {
  const labelLocale = locale === 'cn' ? 'Chinese' : 'English';
  return [
    `      - label: ${yamlString(`${slug} Overview (${labelLocale})`)}`,
    `        name: ${projectFileName(slug, 'overview', locale)}`,
    `        file: ${yamlString(`src/content/projects/${slug}/overview_${locale}.md`)}`,
    '        fields:',
    ...stringField('Title', 'title', { indent: 10 }),
    ...stringField('Tag', 'tag', { required: false, indent: 10 }),
    ...stringField('Time', 'time', { required: false, indent: 10 }),
    ...stringField('Status', 'status', { indent: 10 }),
    ...optionalLinksField([
      ['Repository URL', 'repo'],
      ['Demo URL', 'demo'],
      ['Paper URL', 'paper'],
    ], 10),
    ...bodyField({ indent: 10 }),
  ];
}

function projectBackgroundFile(slug: string, locale: 'cn' | 'en') {
  const labelLocale = locale === 'cn' ? 'Chinese' : 'English';
  return [
    `      - label: ${yamlString(`${slug} Background (${labelLocale})`)}`,
    `        name: ${projectFileName(slug, 'background', locale)}`,
    `        file: ${yamlString(`src/content/projects/${slug}/background_${locale}.md`)}`,
    '        fields:',
    ...bodyField({ indent: 10 }),
  ];
}

function projectFilesCollection() {
  const projectFiles = listProjectSlugs().flatMap((slug) => [
    ...projectOverviewFile(slug, 'cn'),
    ...projectOverviewFile(slug, 'en'),
    ...projectBackgroundFile(slug, 'cn'),
    ...projectBackgroundFile(slug, 'en'),
  ]);

  return [
    '  - name: projects',
    '    label: Projects',
    '    label_singular: Project File',
    '    delete: false',
    '    editor:',
    '      preview: false',
    '    files:',
    ...projectFiles,
  ];
}

function cmsCollections() {
  return [
    '  - name: news',
    '    label: News',
    '    label_singular: News Item',
    '    folder: src/content/news',
    '    create: true',
    '    delete: true',
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
    ...bodyField(),
    '        i18n: true',
    '',
    '  - name: members',
    '    label: Members',
    '    label_singular: Member',
    '    folder: src/content/members',
    '    create: true',
    '    delete: true',
    '    extension: md',
    '    format: frontmatter',
    '    identifier_field: id',
    '    slug: "{{slug}}"',
    '    summary: "{{id}} · {{name.zh}}"',
    '    editor:',
    '      preview: false',
    '    fields:',
    ...stringField('ID', 'id'),
    '        hint: Use the same lowercase id as the generated filename, for example alice-phd.',
    '        pattern:',
    "          - '^[a-z0-9]+(?:-[a-z0-9]+)*$'",
    "          - 'Use lowercase letters, numbers, and hyphens only.'",
    ...localizedTextField('Name', 'name'),
    ...localizedTextField('Role', 'role'),
    ...localizedTextField('Status', 'status', { required: false }),
    ...localizedTextField('Research Area', 'area'),
    ...stringField('Avatar Path', 'avatar', { required: false }),
    ...localizedTextField('Bio', 'bio', { required: false }),
    ...optionalLinksField([
      ['Google Scholar URL', 'scholar'],
      ['GitHub URL', 'github'],
      ['Homepage URL', 'homepage'],
      ['Email', 'email'],
    ]),
    '',
    '  - name: papers',
    '    label: Papers',
    '    label_singular: Paper',
    '    folder: src/content/papers',
    '    create: true',
    '    delete: true',
    '    extension: md',
    '    format: frontmatter',
    '    identifier_field: title',
    '    slug: "{{year}}-{{slug}}"',
    '    summary: "{{year}} · {{title}}"',
    '    editor:',
    '      preview: false',
    '    fields:',
    '      - label: "Year"',
    '        name: year',
    '        widget: number',
    '        value_type: int',
    '        min: 1900',
    '        max: 2100',
    ...stringField('Title', 'title'),
    ...stringField('Venue', 'venue'),
    ...stringField('Authors', 'authors', { required: false }),
    ...stringField('Abstract', 'abstract', { required: false, widget: 'markdown' }),
    ...optionalLinksField([
      ['Online URL', 'online'],
      ['PDF URL', 'pdf'],
      ['Project URL', 'project'],
      ['Code URL', 'code'],
    ]),
    ...stringField('BibTeX', 'bibtex', { required: false, widget: 'text' }),
    ...bodyField({ required: false }),
    '',
    '  - name: join',
    '    label: Recruitment & Collaboration',
    '    label_singular: Recruitment Page',
    '    delete: false',
    '    editor:',
    '      preview: false',
    '    files:',
    '      - label: "Recruitment Overview (Chinese)"',
    '        name: recruitment_overview_cn',
    '        file: src/content/join/recruitment/overview_cn.md',
    '        fields:',
    ...stringField('Title', 'title', { indent: 10 }),
    ...bodyField({ indent: 10 }),
    '      - label: "Recruitment Overview (English)"',
    '        name: recruitment_overview_en',
    '        file: src/content/join/recruitment/overview_en.md',
    '        fields:',
    ...stringField('Title', 'title', { indent: 10 }),
    ...bodyField({ indent: 10 }),
    '',
    ...projectFilesCollection(),
    '',
  ];
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
    'media_folder: public/uploads',
    'public_folder: /uploads',
    'i18n:',
    '  structure: multiple_files',
    '  locales: [zh, en]',
    '  default_locale: zh',
    'collections:',
    ...cmsCollections(),
    '',
  ].join('\n');
}
