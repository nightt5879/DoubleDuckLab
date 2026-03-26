import { defineConfig } from 'astro/config';
import { resolveConfiguredSiteUrl } from './scripts/site-url.mjs';

export default defineConfig(({ mode }) => {
  return {
    site: resolveConfiguredSiteUrl(mode),
  };
});
