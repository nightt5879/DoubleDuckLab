#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const cmsRepo = (process.env.CMS_GITHUB_REPO || '').trim();
const cmsOauthBaseUrl = (process.env.CMS_OAUTH_BASE_URL || '').trim();
const publicSiteUrl = (process.env.PUBLIC_SITE_URL || '').trim();
const cmsBranch = (process.env.CMS_BRANCH || 'main').trim() || 'main';

function normalizeUrl(value) {
  if (!value) {
    return '';
  }

  return value.replace(/\/$/, '');
}

function getUrlHostname(value) {
  if (!value) {
    return '';
  }

  try {
    return new URL(`${value}/`).hostname;
  } catch {
    return '';
  }
}

const normalizedPublicSiteUrl = normalizeUrl(publicSiteUrl);
const cmsSiteDomain = getUrlHostname(normalizedPublicSiteUrl);

function getExpectedMissingCmsVars() {
  const missing = [];

  if (!cmsRepo) {
    missing.push('CMS_GITHUB_REPO');
  }

  if (!cmsOauthBaseUrl) {
    missing.push('CMS_OAUTH_BASE_URL');
  }

  if (!normalizedPublicSiteUrl || !cmsSiteDomain) {
    missing.push('PUBLIC_SITE_URL');
  }

  return missing;
}

const expectedMissingCmsVars = getExpectedMissingCmsVars();
const cmsConfigured = expectedMissingCmsVars.length === 0;
const unexpectedMissingCmsVars = ['CMS_GITHUB_REPO', 'CMS_OAUTH_BASE_URL', 'PUBLIC_SITE_URL'].filter(
  (item) => !expectedMissingCmsVars.includes(item),
);

const checks = [
  {
    file: 'dist/index.html',
    includes: ['DoubleDuckLab', '重点信息', '查看论文'],
  },
  {
    file: 'dist/en/index.html',
    includes: ['DoubleDuckLab', 'Highlights', 'View Papers'],
  },
  {
    file: 'dist/members/index.html',
    includes: ['成员列表', '搜索成员'],
  },
  {
    file: 'dist/projects/index.html',
    includes: ['项目', '搜索项目'],
  },
  {
    file: 'dist/papers/index.html',
    includes: ['论文', '搜索标题'],
  },
  {
    file: 'dist/news/index.html',
    includes: ['新闻动态', '搜索新闻标题'],
  },
  cmsConfigured
    ? {
        file: 'dist/admin/index.html',
        includes: ['Loading Decap CMS', 'Decap CMS'],
      }
    : {
        file: 'dist/admin/index.html',
        includes: ['CMS setup required', ...expectedMissingCmsVars],
        excludes: unexpectedMissingCmsVars,
      },
  cmsConfigured
    ? {
        file: 'dist/admin/config.yml',
        includes: [
          'name: github',
          `repo: "${cmsRepo}"`,
          `branch: "${cmsBranch}"`,
          `base_url: "${normalizeUrl(cmsOauthBaseUrl)}"`,
          `site_domain: "${cmsSiteDomain}"`,
          'publish_mode: editorial_workflow',
          'structure: multiple_files',
        ],
      }
    : {
        file: 'dist/admin/config.yml',
        includes: ['Decap CMS is not configured', ...expectedMissingCmsVars],
        excludes: unexpectedMissingCmsVars,
      },
];

function assert(cond, message) {
  if (!cond) {
    throw new Error(message);
  }
}

try {
  checks.forEach(({ file, includes, excludes = [] }) => {
    const filePath = path.resolve(file);
    assert(fs.existsSync(filePath), `Missing build output: ${file}`);

    const html = fs.readFileSync(filePath, 'utf8');
    includes.forEach((needle) => {
      assert(html.includes(needle), `Missing "${needle}" in ${file}`);
    });
    excludes.forEach((needle) => {
      assert(!html.includes(needle), `Unexpected "${needle}" in ${file}`);
    });
  });

  console.log('Smoke checks passed');
} catch (error) {
  console.error(`Smoke checks failed: ${error.message}`);
  process.exit(1);
}
