import { loadEnv } from 'vite';

export const DEFAULT_SITE_URL = 'https://doubleducklab.com/';

export function normalizeSiteUrl(value) {
  const site = (value || DEFAULT_SITE_URL).trim();
  return site.endsWith('/') ? site : `${site}/`;
}

export function resolveConfiguredSiteUrl(mode = 'production') {
  const env = loadEnv(mode, process.cwd(), '');
  return normalizeSiteUrl(process.env.PUBLIC_SITE_URL || process.env.SITE_URL || env.PUBLIC_SITE_URL || env.SITE_URL);
}
