import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

function normalizeSiteUrl(value) {
  const site = (value || 'https://doubleducklab.com').trim();
  return site.endsWith('/') ? site : `${site}/`;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    site: normalizeSiteUrl(env.PUBLIC_SITE_URL || env.SITE_URL),
  };
});
