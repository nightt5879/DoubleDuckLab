const DEFAULT_SITE_URL = 'https://doubleducklab.com/';

export type LocaleAlternates = {
  zh?: string;
  en?: string;
  xDefault?: string;
};

export function normalizeSitePath(pathname: string | undefined) {
  let value = (pathname || '/').trim();

  if (!value.startsWith('/')) {
    value = `/${value}`;
  }

  value = value.replace(/\/index\.html$/i, '/');
  value = value.replace(/\/{2,}/g, '/');

  if (value !== '/' && !value.endsWith('/')) {
    value = `${value}/`;
  }

  return value;
}

export function buildLocalePath(pathname: string, lang: 'zh' | 'en') {
  const normalized = normalizeSitePath(pathname);
  const basePath =
    normalized === '/en/' ? '/' : normalized.startsWith('/en/') ? `/${normalized.slice(4)}` : normalized;
  const zhPath = normalizeSitePath(basePath);

  if (lang === 'zh') {
    return zhPath;
  }

  if (zhPath === '/') {
    return '/en/';
  }

  return normalizeSitePath(`/en${zhPath}`);
}

export function buildDefaultLocaleAlternates(pathname: string): LocaleAlternates {
  const normalized = normalizeSitePath(pathname);
  const zh = buildLocalePath(normalized, 'zh');
  const en = buildLocalePath(normalized, 'en');

  return {
    zh,
    en,
    xDefault: zh,
  };
}

export function toAbsoluteUrl(pathname: string, site: URL | string | undefined) {
  const siteUrl = normalizeSiteUrl(site);
  return new URL(pathname, siteUrl).toString();
}

export function normalizeSiteUrl(site: URL | string | undefined) {
  if (site instanceof URL) {
    return site;
  }

  const raw = `${site || DEFAULT_SITE_URL}`.trim().replace(/^['"]|['"]$/g, '');
  const candidate = /^[a-z][a-z\d+\-.]*:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    const url = new URL(candidate);
    if (!['http:', 'https:'].includes(url.protocol)) {
      throw new Error(`Unsupported site URL protocol: ${url.protocol}`);
    }

    url.search = '';
    url.hash = '';
    return url;
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
}

export function summarizeText(value: string | undefined, maxLength = 160) {
  const plain = (value || '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[*_>#~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!plain) {
    return '';
  }

  if (plain.length <= maxLength) {
    return plain;
  }

  return `${plain.slice(0, maxLength - 1).trim()}…`;
}

export function summarizeParts(parts: Array<string | number | null | undefined>, maxLength = 160) {
  return summarizeText(
    parts
      .filter((item) => item !== null && item !== undefined && `${item}`.trim())
      .map((item) => `${item}`.trim())
      .join(' · '),
    maxLength,
  );
}
