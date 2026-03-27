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
  const localizedTitle = entry.data.title;
  const newStyleMatched = fileBase.match(/^(.*)\.(zh|en)$/i);
  const legacyMatched = fileBase.match(/^(.*)_(cn|en)$/i);

  let slug = '';
  let lang: 'zh' | 'en' | undefined;
  let inferredTitleZh = localizedTitle?.zh || '';
  let inferredTitleEn = localizedTitle?.en || '';

  if (newStyleMatched) {
    slug = dirname === '.' ? newStyleMatched[1].trim() : `${dirname}/${newStyleMatched[1].trim()}`;
    lang = newStyleMatched[2].toLowerCase() === 'zh' ? 'zh' : 'en';
  } else if (legacyMatched) {
    const legacyTitle = legacyMatched[1].trim().replace(/_/g, ' ');
    slug = dirname === '.' ? fileBase : dirname;
    lang = legacyMatched[2].toLowerCase() === 'cn' ? 'zh' : 'en';
    if (!inferredTitleZh && lang === 'zh') {
      inferredTitleZh = legacyTitle;
    }
    if (!inferredTitleEn && lang === 'en') {
      inferredTitleEn = legacyTitle;
    }
  } else {
    return null;
  }

  const slugLeaf = slug.split('/').pop() || '';
  const inferredDateMatched = slugLeaf.match(/^(\d{4}-\d{2}-\d{2})(?:-|$)/);
  const inferredDate = inferredDateMatched ? inferredDateMatched[1] : '';

  return {
    slug,
    lang,
    title: {
      zh: inferredTitleZh,
      en: inferredTitleEn,
    },
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
    if (info.title.zh) {
      item.title.zh = info.title.zh;
    }
    if (info.title.en) {
      item.title.en = info.title.en;
    }
    item.entry[info.lang] = entry;
  });

  return Array.from(grouped.values()).sort((a, b) => b.date.localeCompare(a.date));
}
