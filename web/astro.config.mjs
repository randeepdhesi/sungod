// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://sungodblinds.ca',
  output: 'static',
  trailingSlash: 'never',
  // `file` format emits about.html etc. so Cloudflare Pages serves /about without a trailing-slash redirect.
  build: { format: 'file' },
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap({ filter: (page) => !page.includes('/brand') })]
});
