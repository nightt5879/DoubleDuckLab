#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const cmsRepo = (process.env.CMS_GITHUB_REPO || '').trim();
const cmsOauthBaseUrl = (process.env.CMS_OAUTH_BASE_URL || '').trim();
const cmsBranch = (process.env.CMS_BRANCH || 'main').trim() || 'main';
const cmsConfigured = Boolean(cmsRepo && cmsOauthBaseUrl);

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
        includes: ['CMS setup required', 'CMS_GITHUB_REPO', 'CMS_OAUTH_BASE_URL'],
      },
  cmsConfigured
    ? {
        file: 'dist/admin/config.yml',
        includes: [
          'name: github',
          `repo: "${cmsRepo}"`,
          `branch: "${cmsBranch}"`,
          `base_url: "${cmsOauthBaseUrl.replace(/\/$/, '')}"`,
          'publish_mode: editorial_workflow',
          'structure: multiple_files',
        ],
      }
    : {
        file: 'dist/admin/config.yml',
        includes: ['Decap CMS is not configured', 'CMS_GITHUB_REPO', 'CMS_OAUTH_BASE_URL'],
      },
];

function assert(cond, message) {
  if (!cond) {
    throw new Error(message);
  }
}

try {
  checks.forEach(({ file, includes }) => {
    const filePath = path.resolve(file);
    assert(fs.existsSync(filePath), `Missing build output: ${file}`);

    const html = fs.readFileSync(filePath, 'utf8');
    includes.forEach((needle) => {
      assert(html.includes(needle), `Missing "${needle}" in ${file}`);
    });
  });

  console.log('Smoke checks passed');
} catch (error) {
  console.error(`Smoke checks failed: ${error.message}`);
  process.exit(1);
}
