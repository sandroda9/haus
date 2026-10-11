import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://sandroda9.github.io',
  base: '/haus',
  output: 'static',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  server: { host: true },
});
