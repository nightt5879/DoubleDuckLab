import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'http://localhost:4321',
  adapter: cloudflare(),
});