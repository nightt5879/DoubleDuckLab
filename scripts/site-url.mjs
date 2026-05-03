import { loadEnv } from 'vite';

export const DEFAULT_SITE_URL = 'https://doubleducklab.com/';

export function normalizeSiteUrl(value) {
  const raw = `${value || DEFAULT_SITE_URL}`.trim().replace(/^['"]|['"]$/g, '');
  const candidate = /^[a-z][a-z\d+\-.]*:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    const url = new URL(candidate);
    if (!['http:', 'https:'].includes(url.protocol)) {
      throw new Error(`Unsupported site URL protocol: ${url.protocol}`);
    }

    url.search = '';
    url.hash = '';
    const site = url.toString();
    return site.endsWith('/') ? site : `${site}/`;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export function resolveConfiguredSiteUrl(mode = 'production') {
  const env = loadEnv(mode, process.cwd(), '');
  return normalizeSiteUrl(process.env.PUBLIC_SITE_URL || process.env.SITE_URL || env.PUBLIC_SITE_URL || env.SITE_URL);
}
