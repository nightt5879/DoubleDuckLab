#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const jsonBase = path.resolve('src/data/content');
const contentBase = path.resolve('src/content');

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function isString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

function readJson(file) {
  const p = path.join(jsonBase, file);
  assert(fs.existsSync(p), `Missing file: ${file}`);
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function parseFrontmatter(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  assert(m, `Missing frontmatter: ${filePath}`);
  return m[1];
}

try {
  // JSON-managed content (still in JSON)
  const siteZh = readJson('site.zh.json');
  const siteEn = readJson('site.en.json');
  const members = readJson('members.json');
  const projects = readJson('projects.json');

  for (const [name, site] of [['zh', siteZh], ['en', siteEn]]) {
    assert(isString(site.brand), `site.${name}.brand invalid`);
    ['home','members','projects','papers','news'].forEach((k)=>assert(isString(site.nav?.[k]), `site.${name}.nav.${k} invalid`));
  }

  assert(Array.isArray(members), 'members.json must be array');
  members.forEach((m, i) => {
    assert(isString(m.name), `members[${i}].name invalid`);
    assert(isString(m.role?.zh) && isString(m.role?.en), `members[${i}].role invalid`);
  });

  assert(Array.isArray(projects), 'projects.json must be array');
  projects.forEach((p, i) => {
    assert(isString(p.title), `projects[${i}].title invalid`);
    assert(isString(p.status?.zh) && isString(p.status?.en), `projects[${i}].status invalid`);
  });

  // Markdown collections
  const newsDir = path.join(contentBase, 'news');
  const papersDir = path.join(contentBase, 'papers');
  assert(fs.existsSync(newsDir), 'Missing src/content/news');
  assert(fs.existsSync(papersDir), 'Missing src/content/papers');

  const newsFiles = fs.readdirSync(newsDir).filter((f) => f.endsWith('.md'));
  const paperFiles = fs.readdirSync(papersDir).filter((f) => f.endsWith('.md'));
  assert(newsFiles.length > 0, 'No markdown files in src/content/news');
  assert(paperFiles.length > 0, 'No markdown files in src/content/papers');

  newsFiles.forEach((f) => {
    const fm = parseFrontmatter(path.join(newsDir, f));
    assert(/date:\s*['"]?\d{4}-\d{2}-\d{2}['"]?/.test(fm), `news frontmatter date invalid: ${f}`);
    assert(/title:\s*[\s\S]*zh:\s*['"].+['"][\s\S]*en:\s*['"].+['"]/.test(fm), `news frontmatter title zh/en invalid: ${f}`);
  });

  paperFiles.forEach((f) => {
    const fm = parseFrontmatter(path.join(papersDir, f));
    assert(/year:\s*\d{4}/.test(fm), `paper year invalid: ${f}`);
    assert(/title:\s*['"].+['"]/.test(fm), `paper title invalid: ${f}`);
    assert(/venue:\s*['"].+['"]/.test(fm), `paper venue invalid: ${f}`);
  });

  console.log('✅ Content validation passed');
} catch (err) {
  console.error(`❌ Content validation failed: ${err.message}`);
  process.exit(1);
}
