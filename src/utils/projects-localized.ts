import path from 'node:path';
import type { CollectionEntry } from 'astro:content';

type ProjectEntry = CollectionEntry<'projects'>;

type Lang = 'zh' | 'en';
type Section = 'overview' | 'background';

type ProjectMeta = {
  title?: string;
  tag?: string;
  status?: string;
  links?: {
    repo?: string;
    demo?: string;
    paper?: string;
  };
};

export type LocalizedProjectItem = {
  slug: string;
  entry: {
    overview: Partial<Record<Lang, ProjectEntry>>;
    background: Partial<Record<Lang, ProjectEntry>>;
  };
  meta: {
    zh?: ProjectMeta;
    en?: ProjectMeta;
  };
};

function parseProjectEntry(entry: ProjectEntry): { slug: string; lang: Lang; section: Section } | null {
  const id = entry.id;
  const dirname = path.posix.dirname(id);
  const fileBase = path.posix.parse(path.posix.basename(id)).name;
  const matched = fileBase.match(/^(overview|background)_(cn|en)$/i);
  if (!matched) {
    return null;
  }

  const section = matched[1].toLowerCase() as Section;
  const lang = matched[2].toLowerCase() === 'cn' ? 'zh' : 'en';
  const slug = dirname === '.' ? fileBase : dirname;

  return { slug, lang, section };
}

function extractMeta(entry?: ProjectEntry): ProjectMeta | undefined {
  if (!entry) {
    return undefined;
  }
  const data = entry.data;
  return {
    title: data.title,
    tag: data.tag,
    status: data.status,
    links: data.links,
  };
}

export function buildLocalizedProjects(entries: ProjectEntry[]): LocalizedProjectItem[] {
  const grouped = new Map<string, LocalizedProjectItem>();

  entries.forEach((entry) => {
    const info = parseProjectEntry(entry);
    if (!info) {
      return;
    }

    if (!grouped.has(info.slug)) {
      grouped.set(info.slug, {
        slug: info.slug,
        entry: {
          overview: {},
          background: {},
        },
        meta: {},
      });
    }

    const item = grouped.get(info.slug)!;
    item.entry[info.section][info.lang] = entry;

    if (info.section === 'overview') {
      item.meta[info.lang] = extractMeta(entry);
    }
  });

  return Array.from(grouped.values()).sort((a, b) => a.slug.localeCompare(b.slug));
}

export function projectDisplayMeta(item: LocalizedProjectItem, lang: Lang) {
  const preferred = item.meta[lang];
  const fallback = item.meta[lang === 'zh' ? 'en' : 'zh'];
  const merged = preferred || fallback || {};

  return {
    title: merged.title || item.slug,
    tag: merged.tag || '',
    status: merged.status || '',
    links: merged.links || {},
  };
}
