type NewsEntry = {
  id: string;
  data: {
    date?: string;
    title?: {
      zh?: string;
      en?: string;
    };
  };
};

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
  const normalizedId = entry.id.split('\\').join('/');
  const slashIndex = normalizedId.lastIndexOf('/');
  const dirname = slashIndex >= 0 ? normalizedId.slice(0, slashIndex) : '.';
  const basename = slashIndex >= 0 ? normalizedId.slice(slashIndex + 1) : normalizedId;
  const fileBase = basename.endsWith('.md') ? basename.slice(0, -3) : basename;
  const localizedTitle = entry.data.title;
  const localeSeparatorIndex = fileBase.lastIndexOf('.');
  const localeSuffix = localeSeparatorIndex >= 0 ? fileBase.slice(localeSeparatorIndex + 1).toLowerCase() : '';
  const newStyleSlug = localeSeparatorIndex >= 0 ? fileBase.slice(0, localeSeparatorIndex).trim() : '';
  const legacyMatched = fileBase.match(/^(.*)_(cn|en)$/i);

  let slug = '';
  let lang: 'zh' | 'en' | undefined;
  let inferredTitleZh = localizedTitle?.zh || '';
  let inferredTitleEn = localizedTitle?.en || '';

  if (newStyleSlug && (localeSuffix === 'zh' || localeSuffix === 'en')) {
    slug = dirname === '.' ? newStyleSlug : `${dirname}/${newStyleSlug}`;
    lang = localeSuffix;
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
