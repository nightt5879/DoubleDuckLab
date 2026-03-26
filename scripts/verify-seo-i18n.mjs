#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_SITE_URL = 'https://doubleducklab.com/';

function normalizeSiteUrl(value) {
  const site = (value || DEFAULT_SITE_URL).trim();
  return site.endsWith('/') ? site : `${site}/`;
}

function readHtml(file) {
  const filePath = path.resolve(file);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing build output: ${file}`);
  }

  return fs.readFileSync(filePath, 'utf8');
}

function assertIncludes(html, needle, file) {
  if (!html.includes(needle)) {
    throw new Error(`Missing "${needle}" in ${file}`);
  }
}

const siteUrl = normalizeSiteUrl(process.env.PUBLIC_SITE_URL || process.env.SITE_URL);
const checks = [
  {
    file: 'dist/index.html',
    includes: [
      '<html lang="zh-CN"',
      `<link rel="canonical" href="${siteUrl}">`,
      `<link rel="alternate" hreflang="en" href="${siteUrl}en/">`,
      `<meta property="og:url" content="${siteUrl}">`,
      'href="/en/"',
    ],
  },
  {
    file: 'dist/en/index.html',
    includes: [
      '<html lang="en"',
      `<link rel="canonical" href="${siteUrl}en/">`,
      `<link rel="alternate" hreflang="zh-CN" href="${siteUrl}">`,
      `<meta property="og:url" content="${siteUrl}en/">`,
      'href="/"',
    ],
  },
  {
    file: 'dist/projects/project-orion/index.html',
    includes: [
      `<link rel="canonical" href="${siteUrl}projects/project-orion/">`,
      `<link rel="alternate" hreflang="en" href="${siteUrl}en/projects/project-orion/">`,
      'href="/en/projects/project-orion/"',
    ],
  },
  {
    file: 'dist/en/news/2026-02-28/index.html',
    includes: [
      `<link rel="canonical" href="${siteUrl}en/news/2026-02-28/">`,
      `<link rel="alternate" hreflang="zh-CN" href="${siteUrl}news/2026-02-28/">`,
      '<meta property="og:type" content="article">',
      'href="/news/2026-02-28/"',
    ],
  },
  {
    file: 'dist/404.html',
    includes: ['<meta name="robots" content="noindex, nofollow">'],
  },
];

try {
  checks.forEach(({ file, includes }) => {
    const html = readHtml(file);
    includes.forEach((needle) => assertIncludes(html, needle, file));
  });

  console.log('SEO / i18n checks passed');
} catch (error) {
  console.error(`SEO / i18n checks failed: ${error.message}`);
  process.exit(1);
}
