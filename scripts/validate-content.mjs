#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const dataBase = path.resolve('src/data');
const contentBase = path.resolve('src/content');
const siteFiles = {
  zh: 'site.zh.json',
  en: 'site.en.json',
};

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function isString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

function readJson(file) {
  const filePath = path.join(dataBase, file);
  assert(fs.existsSync(filePath), `Missing file: src/data/${file}`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function parseMarkdown(filePath, requireFrontmatter = true) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const matched = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);

  if (!matched) {
    assert(!requireFrontmatter, `Missing frontmatter: ${filePath}`);
    return { frontmatter: '', body: raw.trim() };
  }

  return {
    frontmatter: matched[1],
    body: raw.slice(matched[0].length).trim(),
  };
}

function collectMarkdownFilesRecursive(dir) {
  const files = [];
  for (const name of fs.readdirSync(dir)) {
    const filePath = path.join(dir, name);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      files.push(...collectMarkdownFilesRecursive(filePath));
    } else if (name.endsWith('.md')) {
      files.push(filePath);
    }
  }
  return files;
}

function collectDirectories(dir) {
  return fs
    .readdirSync(dir)
    .map((name) => path.join(dir, name))
    .filter((filePath) => fs.statSync(filePath).isDirectory());
}

function assertFrontmatter(pattern, frontmatter, message) {
  assert(pattern.test(frontmatter), message);
}

function parseNewsFileInfo(relPath) {
  const normalized = relPath.replaceAll('\\', '/');
  const parts = normalized.split('/');

  if (parts.length === 1) {
    const matched = parts[0].match(/^(.+)\.(zh|en)\.md$/i);
    assert(matched, `news filename must end with .zh.md or .en.md: ${normalized}`);
    return {
      slug: matched[1],
      lang: matched[2].toLowerCase(),
      format: 'flat',
    };
  }

  if (parts.length === 2) {
    const matched = parts[1].match(/^(.*)_(cn|en)\.md$/i);
    assert(matched, `legacy news filename must end with _cn.md or _en.md: ${normalized}`);
    return {
      slug: parts[0],
      lang: matched[2].toLowerCase() === 'cn' ? 'zh' : 'en',
      format: 'legacy',
    };
  }

  throw new Error(`news path depth invalid: ${normalized}`);
}

function validateSite(site, lang) {
  assert(isString(site.brand), `site.${lang}.brand invalid`);
  assert(isString(site.siteName), `site.${lang}.siteName invalid`);
  ['home', 'members', 'projects', 'papers', 'news'].forEach((key) => {
    assert(isString(site.nav?.[key]), `site.${lang}.nav.${key} invalid`);
  });
  assert(isString(site.home?.intro), `site.${lang}.home.intro invalid`);
  assert(isString(site.home?.quick), `site.${lang}.home.quick invalid`);
  assert(isString(site.home?.sections?.highlights), `site.${lang}.home.sections.highlights invalid`);
  assert(isString(site.home?.sections?.recentProjects), `site.${lang}.home.sections.recentProjects invalid`);
  assert(Array.isArray(site.home?.highlights) && site.home.highlights.length > 0, `site.${lang}.home.highlights invalid`);
  site.home.highlights.forEach((item, index) => {
    assert(isString(item?.title), `site.${lang}.home.highlights[${index}].title invalid`);
    assert(isString(item?.desc), `site.${lang}.home.highlights[${index}].desc invalid`);
  });
}

try {
  for (const [lang, file] of Object.entries(siteFiles)) {
    validateSite(readJson(file), lang);
  }

  const newsDir = path.join(contentBase, 'news');
  const papersDir = path.join(contentBase, 'papers');
  const membersDir = path.join(contentBase, 'members');
  const projectsDir = path.join(contentBase, 'projects');
  const joinDir = path.join(contentBase, 'join');
  assert(fs.existsSync(newsDir), 'Missing src/content/news');
  assert(fs.existsSync(papersDir), 'Missing src/content/papers');
  assert(fs.existsSync(membersDir), 'Missing src/content/members');
  assert(fs.existsSync(projectsDir), 'Missing src/content/projects');
  assert(fs.existsSync(joinDir), 'Missing src/content/join');

  const newsFiles = collectMarkdownFilesRecursive(newsDir);
  const paperFiles = fs.readdirSync(papersDir).filter((name) => name.endsWith('.md')).map((name) => path.join(papersDir, name));
  const memberFiles = fs.readdirSync(membersDir).filter((name) => name.endsWith('.md')).map((name) => path.join(membersDir, name));
  const projectFolders = collectDirectories(projectsDir);
  const joinFolders = collectDirectories(joinDir);

  assert(newsFiles.length > 0, 'No markdown files in src/content/news');
  assert(paperFiles.length > 0, 'No markdown files in src/content/papers');
  assert(memberFiles.length > 0, 'No markdown files in src/content/members');
  assert(projectFolders.length > 0, 'No project folders in src/content/projects');
  assert(joinFolders.length > 0, 'No join folders in src/content/join');

  const newsLangMap = new Map();
  newsFiles.forEach((filePath) => {
    const rel = path.relative(newsDir, filePath).replaceAll('\\', '/');
    const { slug, lang } = parseNewsFileInfo(rel);
    assert(/^\d{4}-\d{2}-\d{2}(?:-[a-z0-9]+(?:-[a-z0-9]+)*)?$/.test(slug), `news slug invalid: ${rel}`);

    if (!newsLangMap.has(slug)) {
      newsLangMap.set(slug, new Set());
    }
    newsLangMap.get(slug).add(lang);

    const { frontmatter, body } = parseMarkdown(filePath);
    assertFrontmatter(/date:\s*['"]?\d{4}-\d{2}-\d{2}['"]?/, frontmatter, `news frontmatter date invalid: ${rel}`);
    assertFrontmatter(/title:\s*[\s\S]*zh:\s*['"].+['"][\s\S]*en:\s*['"].+['"]/, frontmatter, `news frontmatter title zh\/en invalid: ${rel}`);
    assert(isString(body), `news body empty: ${rel}`);
  });

  newsLangMap.forEach((langs, slug) => {
    assert(langs.has('zh') && langs.has('en'), `news zh/en pair missing for slug: ${slug}`);
  });

  paperFiles.forEach((filePath) => {
    const { frontmatter } = parseMarkdown(filePath);
    assertFrontmatter(/year:\s*\d{4}/, frontmatter, `paper year invalid: ${path.basename(filePath)}`);
    assertFrontmatter(/title:\s*['"].+['"]/, frontmatter, `paper title invalid: ${path.basename(filePath)}`);
    assertFrontmatter(/venue:\s*['"].+['"]/, frontmatter, `paper venue invalid: ${path.basename(filePath)}`);
  });

  memberFiles.forEach((filePath) => {
    const { frontmatter } = parseMarkdown(filePath);
    assertFrontmatter(/id:\s*['"].+['"]/, frontmatter, `member id invalid: ${path.basename(filePath)}`);
    assertFrontmatter(/name:\s*[\s\S]*zh:\s*['"].+['"][\s\S]*en:\s*['"].+['"]/, frontmatter, `member name zh/en invalid: ${path.basename(filePath)}`);
    assertFrontmatter(/role:\s*[\s\S]*zh:\s*['"].+['"][\s\S]*en:\s*['"].+['"]/, frontmatter, `member role zh/en invalid: ${path.basename(filePath)}`);
    assertFrontmatter(/area:\s*[\s\S]*zh:\s*['"].+['"][\s\S]*en:\s*['"].+['"]/, frontmatter, `member area zh/en invalid: ${path.basename(filePath)}`);
  });

  projectFolders.forEach((folderPath) => {
    const slug = path.basename(folderPath);
    const requiredFiles = ['overview_cn.md', 'overview_en.md', 'background_cn.md', 'background_en.md'];
    requiredFiles.forEach((fileName) => {
      assert(fs.existsSync(path.join(folderPath, fileName)), `project file missing: ${slug}/${fileName}`);
    });

    ['overview_cn.md', 'overview_en.md'].forEach((fileName) => {
      const { frontmatter, body } = parseMarkdown(path.join(folderPath, fileName));
      assertFrontmatter(/title:\s*['"].+['"]/, frontmatter, `project title invalid: ${slug}/${fileName}`);
      assertFrontmatter(/status:\s*['"].+['"]/, frontmatter, `project status invalid: ${slug}/${fileName}`);
      assert(isString(body), `project overview body empty: ${slug}/${fileName}`);
    });

    ['background_cn.md', 'background_en.md'].forEach((fileName) => {
      const { body } = parseMarkdown(path.join(folderPath, fileName), false);
      assert(isString(body), `project background body empty: ${slug}/${fileName}`);
    });
  });

  joinFolders.forEach((folderPath) => {
    const rel = path.relative(joinDir, folderPath).replaceAll('\\', '/');
    const cnPath = path.join(folderPath, 'overview_cn.md');
    const enPath = path.join(folderPath, 'overview_en.md');
    assert(fs.existsSync(cnPath), `join file missing: ${rel}/overview_cn.md`);
    assert(fs.existsSync(enPath), `join file missing: ${rel}/overview_en.md`);

    [cnPath, enPath].forEach((filePath) => {
      const { body } = parseMarkdown(filePath);
      assert(isString(body), `join body empty: ${path.relative(contentBase, filePath).replaceAll('\\', '/')}`);
    });
  });

  console.log('Content validation passed');
} catch (err) {
  console.error(`Content validation failed: ${err.message}`);
  process.exit(1);
}
