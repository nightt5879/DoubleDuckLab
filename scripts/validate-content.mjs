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

function collectMarkdownFilesRecursive(dir) {
  const files = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      files.push(...collectMarkdownFilesRecursive(p));
    } else if (name.endsWith('.md')) {
      files.push(p);
    }
  }
  return files;
}

try {
  // JSON-managed content (still in JSON)
  const siteZh = readJson('site.zh.json');
  const siteEn = readJson('site.en.json');
  const projects = readJson('projects.json');

  for (const [name, site] of [['zh', siteZh], ['en', siteEn]]) {
    assert(isString(site.brand), `site.${name}.brand invalid`);
    ['home','members','projects','papers','news'].forEach((k)=>assert(isString(site.nav?.[k]), `site.${name}.nav.${k} invalid`));
  }

  assert(Array.isArray(projects), 'projects.json must be array');
  projects.forEach((p, i) => {
    assert(isString(p.title), `projects[${i}].title invalid`);
    assert(isString(p.status?.zh) && isString(p.status?.en), `projects[${i}].status invalid`);
  });

  // Markdown collections
  const newsDir = path.join(contentBase, 'news');
  const papersDir = path.join(contentBase, 'papers');
  const membersDir = path.join(contentBase, 'members');
  assert(fs.existsSync(newsDir), 'Missing src/content/news');
  assert(fs.existsSync(papersDir), 'Missing src/content/papers');
  assert(fs.existsSync(membersDir), 'Missing src/content/members');

  const newsFiles = collectMarkdownFilesRecursive(newsDir);
  const paperFiles = fs.readdirSync(papersDir).filter((f) => f.endsWith('.md')).map((f) => path.join(papersDir, f));
  const memberFiles = fs.readdirSync(membersDir).filter((f) => f.endsWith('.md')).map((f) => path.join(membersDir, f));
  assert(newsFiles.length > 0, 'No markdown files in src/content/news');
  assert(paperFiles.length > 0, 'No markdown files in src/content/papers');
  assert(memberFiles.length > 0, 'No markdown files in src/content/members');

  // news: enforce *_cn.md and *_en.md pairs inside each slug directory.
  const newsLangMap = new Map();
  newsFiles.forEach((filePath) => {
    const rel = path.relative(newsDir, filePath).replaceAll('\\', '/');
    const parts = rel.split('/');
    assert(parts.length >= 2, `news file must be nested under a folder: ${rel}`);
    const filename = parts[parts.length - 1];
    const m = filename.match(/^(.*)_(cn|en)\.md$/i);
    assert(m, `news filename must end with _cn.md or _en.md: ${rel}`);
    const slug = parts.slice(0, -1).join('/');
    if (!newsLangMap.has(slug)) {
      newsLangMap.set(slug, new Set());
    }
    newsLangMap.get(slug).add(m[2].toLowerCase());

    const fm = parseFrontmatter(filePath);
    if (fm.trim()) {
      assert(/date:\s*['"]?\d{4}-\d{2}-\d{2}['"]?/.test(fm), `news frontmatter date invalid: ${rel}`);
    }
  });

  newsLangMap.forEach((langs, slug) => {
    assert(langs.has('cn') && langs.has('en'), `news cn/en pair missing in folder: ${slug}`);
  });

  paperFiles.forEach((filePath) => {
    const fm = parseFrontmatter(filePath);
    assert(/year:\s*\d{4}/.test(fm), `paper year invalid: ${path.basename(filePath)}`);
    assert(/title:\s*['"].+['"]/.test(fm), `paper title invalid: ${path.basename(filePath)}`);
    assert(/venue:\s*['"].+['"]/.test(fm), `paper venue invalid: ${path.basename(filePath)}`);
  });

  memberFiles.forEach((filePath) => {
    const fm = parseFrontmatter(filePath);
    assert(/id:\s*['"].+['"]/.test(fm), `member id invalid: ${path.basename(filePath)}`);
    assert(/name:\s*[\s\S]*zh:\s*['"].+['"][\s\S]*en:\s*['"].+['"]/.test(fm), `member name zh/en invalid: ${path.basename(filePath)}`);
    assert(/role:\s*[\s\S]*zh:\s*['"].+['"][\s\S]*en:\s*['"].+['"]/.test(fm), `member role zh/en invalid: ${path.basename(filePath)}`);
    assert(/area:\s*[\s\S]*zh:\s*['"].+['"][\s\S]*en:\s*['"].+['"]/.test(fm), `member area zh/en invalid: ${path.basename(filePath)}`);
  });

  console.log('✅ Content validation passed');
} catch (err) {
  console.error(`❌ Content validation failed: ${err.message}`);
  process.exit(1);
}
