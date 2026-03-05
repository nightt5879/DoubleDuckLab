import path from 'node:path';
import type { CollectionEntry } from 'astro:content';

type NewsEntry = CollectionEntry<'news'>;

type LocalizedNewsItem = {
  slug: string;
  date: string;
  title: {
    zh: string;
    en: string;
  };
  entry: {
    zh?: NewsEntry;
    en?: NewsEntry;
  };
};

function parseEntryInfo(entry: NewsEntry) {
  const id = entry.id;
  const dirname = path.posix.dirname(id);
  const fileBase = path.posix.parse(path.posix.basename(id)).name;
  const matched = fileBase.match(/^(.*)_(cn|en)$/i);
  if (!matched) {
    return null;
  }

  const title = matched[1].trim().replace(/_/g, ' ');
  const lang = matched[2].toLowerCase() === 'cn' ? 'zh' : 'en';
  const slug = dirname === '.' ? fileBase : dirname;
  const folderName = slug.split('/').pop() || '';
  const inferredDate = /^\d{4}-\d{2}-\d{2}$/.test(folderName) ? folderName : '';

  return {
    slug,
    lang: lang as 'zh' | 'en',
    title,
    date: entry.data.date || inferredDate,
  };
}

export function buildLocalizedNews(entries: NewsEntry[]): LocalizedNewsItem[] {
  const grouped = new Map<string, LocalizedNewsItem>();

  entries.forEach((entry) => {
    const info = parseEntryInfo(entry);
    if (!info) {
      return;
    }

    if (!grouped.has(info.slug)) {
      grouped.set(info.slug, {
        slug: info.slug,
        date: info.date,
        title: { zh: '', en: '' },
        entry: {},
      });
    }

    const item = grouped.get(info.slug)!;
    if (!item.date && info.date) {
      item.date = info.date;
    }
    item.title[info.lang] = info.title;
    item.entry[info.lang] = entry;
  });

  return Array.from(grouped.values()).sort((a, b) => b.date.localeCompare(a.date));
}
