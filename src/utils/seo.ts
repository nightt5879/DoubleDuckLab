const DEFAULT_SITE_URL = 'https://doubleducklab.com/';

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

export function toAbsoluteUrl(pathname: string, site: URL | string | undefined) {
  const siteUrl = site instanceof URL ? site : new URL(site || DEFAULT_SITE_URL);
  return new URL(pathname, siteUrl).toString();
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
