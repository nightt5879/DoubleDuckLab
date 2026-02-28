#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const base = path.resolve('src/data/content');
const requiredFiles = [
  'site.zh.json',
  'site.en.json',
  'members.json',
  'projects.json',
  'papers.json',
  'news.json'
];

function readJson(file) {
  const p = path.join(base, file);
  if (!fs.existsSync(p)) throw new Error(`Missing file: ${file}`);
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function isString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

try {
  requiredFiles.forEach((f) => assert(fs.existsSync(path.join(base, f)), `Missing required file: ${f}`));

  const siteZh = readJson('site.zh.json');
  const siteEn = readJson('site.en.json');
  for (const [name, site] of [['zh', siteZh], ['en', siteEn]]) {
    assert(isString(site.brand), `site.${name}.brand must be non-empty string`);
    ['home','members','projects','papers','news'].forEach((k)=>assert(isString(site.nav?.[k]), `site.${name}.nav.${k} invalid`));
    assert(isString(site.home?.title), `site.${name}.home.title invalid`);
    assert(Array.isArray(site.home?.highlights), `site.${name}.home.highlights must be array`);
  }

  const members = readJson('members.json');
  assert(Array.isArray(members), 'members.json must be array');
  members.forEach((m, i) => {
    assert(isString(m.name), `members[${i}].name invalid`);
    assert(isString(m.role?.zh) && isString(m.role?.en), `members[${i}].role zh/en invalid`);
    assert(isString(m.area), `members[${i}].area invalid`);
  });

  const projects = readJson('projects.json');
  assert(Array.isArray(projects), 'projects.json must be array');
  projects.forEach((p, i) => {
    assert(isString(p.title), `projects[${i}].title invalid`);
    assert(isString(p.tag), `projects[${i}].tag invalid`);
    assert(isString(p.status?.zh) && isString(p.status?.en), `projects[${i}].status zh/en invalid`);
  });

  const papers = readJson('papers.json');
  assert(Array.isArray(papers), 'papers.json must be array');
  papers.forEach((p, i) => {
    assert(Number.isInteger(p.year), `papers[${i}].year invalid`);
    assert(isString(p.title), `papers[${i}].title invalid`);
    assert(isString(p.venue), `papers[${i}].venue invalid`);
  });

  const news = readJson('news.json');
  assert(Array.isArray(news), 'news.json must be array');
  news.forEach((n, i) => {
    assert(/^\d{4}-\d{2}-\d{2}$/.test(n.date), `news[${i}].date should be YYYY-MM-DD`);
    assert(isString(n.title?.zh) && isString(n.title?.en), `news[${i}].title zh/en invalid`);
  });

  console.log('✅ Content validation passed');
} catch (err) {
  console.error(`❌ Content validation failed: ${err.message}`);
  process.exit(1);
}
